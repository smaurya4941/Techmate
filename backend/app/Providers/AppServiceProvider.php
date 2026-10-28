<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Production traffic is expected to arrive over TLS (terminated at the proxy).
        if ($this->app->isProduction()) {
            URL::forceHttps();
        }

        $this->configureRateLimiting();

        // Make notification/mail failures observable without logging recipients or bodies.
        Event::listen(JobFailed::class, function (JobFailed $event) {
            Log::error('Queued job failed.', [
                'job' => $event->job->resolveName(),
                'queue' => $event->job->getQueue(),
                'attempts' => $event->job->attempts(),
                'exception' => $event->exception::class,
            ]);
        });
    }

    private function configureRateLimiting(): void
    {
        // Config is read inside the closures so limits can be tuned per environment/test.
        RateLimiter::for('public-read', fn (Request $request) => Limit::perMinute(
            (int) config('techmate.rate_limits.read_per_minute')
        )->by($request->ip()));

        // Burst limit plus a slower hourly ceiling; keyed per IP and per route
        // so one noisy form cannot lock a visitor out of the others.
        RateLimiter::for('public-submissions', function (Request $request) {
            $key = $request->ip().'|'.$request->path();

            return [
                Limit::perMinute((int) config('techmate.rate_limits.submit_per_minute'))->by($key),
                Limit::perHour((int) config('techmate.rate_limits.submit_per_hour'))->by($key),
            ];
        });
    }
}
