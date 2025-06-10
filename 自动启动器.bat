@echo off
title IWABAYASHI Website Launcher

echo.
echo IWABAYASHI Corporation Website Launcher
echo ========================================
echo.

:: Check files
if not exist "package.json" (
    echo Error: package.json not found
    echo Please run this script in the project folder
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Error: Dependencies not installed
    echo Please run the installer first
    pause
    exit /b 1
)

:: Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js not found
    echo Please install Node.js first
    pause
    exit /b 1
)

echo Environment check passed
echo.
echo Starting IWABAYASHI website...
echo Browser will open automatically
echo Press Ctrl+C to stop the server
echo.

:: Start browser after delay
start /b powershell -Command "Start-Sleep 15; Start-Process 'http://localhost:3000'"

:: Start server
npm start

echo.
echo Website stopped
pause