@echo off
setlocal
cd /d "%~dp0"
set PORT=5173

if exist node_modules (
  start "Innova-souvenir dev" cmd /k npm run dev -- --port %PORT%
) else (
  echo Primero ejecuta: npm install
  pause
  exit /b 1
)

timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:%PORT%/index.html"
