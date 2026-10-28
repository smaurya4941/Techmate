# Techmate Industries — Local Setup & Development Guide (Windows / PowerShell)

This guide provides tested, step-by-step instructions for bootstrapping and running Techmate Industries locally on Windows using PowerShell and Antigravity IDE.

---

## 1. Prerequisites Verification

Verify required runtimes from PowerShell:

```powershell
node -v      # Tested: v24.21.0
npm -v       # Tested: 11.19.0
php -v       # Tested: PHP 8.2.12
composer -V  # Tested: 2.10.2
git --version
```

Verify that your MySQL service is running and note the active port (e.g., standard `3306`, or `3308` in common multi-service environments):

```powershell
# Check which port MySQL is listening on
Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
netstat -ano | Select-String "330"
```

---

## 2. Database Initialization

Log into MySQL or run a PHP one-liner to create the database `techmate_db` with `utf8mb4`:

```powershell
# Using MySQL CLI:
mysql -u root -p -P 3308 -e "CREATE DATABASE IF NOT EXISTS techmate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Or using PHP PDO:
php -r "@(new PDO('mysql:host=127.0.0.1;port=3308', 'root', 'root'))->exec('CREATE DATABASE IF NOT EXISTS techmate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');"
```

---

## 3. Backend Setup (Laravel REST API)

1. Navigate to the backend directory:
```powershell
cd D:\Techmate\backend
```

2. Copy the example environment file:
```powershell
Copy-Item .env.example .env
```

3. Ensure database and app settings match your local environment in `backend/.env`:
```ini
APP_NAME="Techmate API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3308
DB_DATABASE=techmate_db
DB_USERNAME=root
DB_PASSWORD=root
```

4. Install PHP dependencies (if not already installed):
```powershell
composer install
```

5. Generate application encryption key (if not set):
```powershell
php artisan key:generate
```

6. Run database migrations:
```powershell
php artisan migrate --status
php artisan migrate
```

7. Run automated backend test suite:
```powershell
php artisan test
```

8. Start the Laravel development server:
```powershell
php artisan serve --host=127.0.0.1 --port=8000
```
API Health Check URL: `http://127.0.0.1:8000/api/health`

---

## 4. Frontend Setup (Next.js App Router)

1. In a new PowerShell window, navigate to the frontend directory:
```powershell
cd D:\Techmate\frontend
```

2. Copy the example environment file:
```powershell
Copy-Item .env.example .env.local
```

3. Ensure `frontend/.env.local` contains:
```ini
API_BASE_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_APP_NAME="Techmate Industries"
```

4. Install Node.js dependencies:
```powershell
npm install
```

5. Run linting and TypeScript compilation checks:
```powershell
npm run lint
npx tsc --noEmit
```

6. Test production build:
```powershell
npm run build
```

7. Start the Next.js development server:
```powershell
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 5. Troubleshooting & Common Issues

### Issue 1: MySQL Connection Refused / 1045 Access Denied
- **Cause:** Default MySQL port may be `3306`, `3307`, or `3308` depending on whether standard MySQL, MariaDB, or XAMPP is installed.
- **Resolution:** Run `netstat -ano | Select-String "330"` to detect the listening port. Adjust `DB_PORT` in `backend/.env` accordingly.

### Issue 2: Next.js Turbopack Native Binaries on Windows
- **Cause:** Turbopack requires MSVC native C++ binary bindings. If native binary is unavailable, WASM fallback is loaded.
- **Resolution:** The project `package.json` specifies `"build": "next build --webpack"` and `"dev": "next dev --webpack"` ensuring 100% build reliability across all Windows environments.

### Issue 3: Backend Offline Card Displayed on Frontend
- **Cause:** Next.js Server Component could not reach `http://127.0.0.1:8000/api/health`.
- **Resolution:** Start the Laravel API using `php artisan serve --host=127.0.0.1 --port=8000`. The frontend will automatically recover upon page reload.
