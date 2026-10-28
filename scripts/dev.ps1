# PowerShell script to guide starting local Techmate dev servers
Write-Host "==============================================" -ForegroundColor Amber
Write-Host "       Techmate Industries Local Dev" -ForegroundColor Amber
Write-Host "==============================================" -ForegroundColor Amber
Write-Host ""
Write-Host "To run backend API:" -ForegroundColor Cyan
Write-Host "  cd backend"
Write-Host "  php artisan serve --host=127.0.0.1 --port=8000"
Write-Host ""
Write-Host "To run frontend Next.js:" -ForegroundColor Cyan
Write-Host "  cd frontend"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Services:" -ForegroundColor Green
Write-Host "  Backend API:   http://127.0.0.1:8000/api/health"
Write-Host "  Frontend App:  http://localhost:3000"
Write-Host "  MySQL DB:      127.0.0.1:3308 (database: techmate_db)"
Write-Host "==============================================" -ForegroundColor Amber
