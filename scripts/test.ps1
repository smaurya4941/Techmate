# PowerShell script to run Techmate Industries test suites
Write-Host "=== Running Backend Tests (Laravel) ===" -ForegroundColor Cyan
Push-Location "$PSScriptRoot\..\backend"
php artisan test
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend tests failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

Write-Host "`n=== Running Frontend Checks (TypeScript & ESLint) ===" -ForegroundColor Cyan
Push-Location "$PSScriptRoot\..\frontend"
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "TypeScript check failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}

npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "ESLint check failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "`nAll Techmate Phase 1 checks passed successfully!" -ForegroundColor Green
Pop-Location
