@echo off
title IWABAYASHI Website Installer
setlocal enabledelayedexpansion

color 0B
cls
echo.
echo ████████████████████████████████████████████████████████████
echo █                                                          █
echo █           IWABAYASHI Corporation Website Installer       █
echo █                   (Clean Interface)                      █
echo █                                                          █
echo ████████████████████████████████████████████████████████████
echo.

:: Progress display function
goto :start

:show_progress
set "step=%1"
set "total=5"
set "desc=%2"
set /a percent=step*100/total
set "bar="
for /l %%i in (1,1,%step%) do set "bar=!bar!█"
for /l %%i in (%step%,1,%total%) do set "bar=!bar!░"
echo.
echo Progress: [!bar!] !percent!%% - %desc%
echo.
goto :eof

:start
:: Check Node.js
call :show_progress 1 "Checking Node.js"
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
    set NODE_INSTALLED=1
) else (
    set NODE_INSTALLED=0
)

if !NODE_INSTALLED! equ 0 (
    net session >nul 2>&1
    if !errorlevel! neq 0 (
        echo ❌ Administrator rights required to install Node.js
        echo Please right-click and "Run as administrator"
        pause
        exit /b 1
    )
)

powershell -Command "Write-Host 'PowerShell Test'" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PowerShell not available
    pause
    exit /b 1
)

:: User confirmation
echo This installer will set up IWABAYASHI website
echo Estimated time: 5-15 minutes
echo.
set /p confirm="Continue? (Y/N): "
if /i "!confirm!" neq "Y" (
    echo Installation cancelled
    pause
    exit /b 0
)

cls
call :show_progress 2 "Preparing installation"

:: Create silent PowerShell script
set "PS_SCRIPT=%TEMP%\iwabayashi_silent.ps1"

(
echo try {
echo     $ErrorActionPreference = 'Stop'
echo     [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
echo     
echo     # Silent progress updates
echo     function Update-Progress { param^($step, $desc^); Write-Host "PROGRESS:$step:$desc" }
echo     
echo     $nodeInstalled = !NODE_INSTALLED!
echo     
echo     # Install Node.js if needed ^(silent^)
echo     if ^($nodeInstalled -eq 0^) {
echo         Update-Progress 3 "Installing Node.js"
echo         
echo         $tempDir = Join-Path $env:TEMP 'iwabayashi_temp'
echo         if ^(^^!^(Test-Path $tempDir^)^) { New-Item -ItemType Directory -Path $tempDir -Force ^| Out-Null }
echo         
echo         $is64Bit = [Environment]::Is64BitOperatingSystem
echo         if ^($is64Bit^) {
echo             $nodeUrl = 'https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi'
echo         } else {
echo             $nodeUrl = 'https://nodejs.org/dist/v20.11.0/node-v20.11.0-x86.msi'
echo         }
echo         
echo         $nodeInstaller = Join-Path $tempDir 'nodejs.msi'
echo         Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing ^| Out-Null
echo         Start-Process msiexec.exe -ArgumentList "/i `"$nodeInstaller`" /quiet /norestart" -Wait ^| Out-Null
echo         Start-Sleep -Seconds 10
echo         $env:Path = [System.Environment]::GetEnvironmentVariable^('Path','Machine'^) + ';' + [System.Environment]::GetEnvironmentVariable^('Path','User'^)
echo     }
echo     
echo     # Download project ^(silent^)
echo     Update-Progress 3 "Downloading project"
echo     $desktopPath = [Environment]::GetFolderPath^('Desktop'^)
echo     $projectPath = Join-Path $desktopPath 'IWABAYASHI'
echo     
echo     if ^(Test-Path $projectPath^) {
echo         Remove-Item $projectPath -Recurse -Force -ErrorAction SilentlyContinue ^| Out-Null
echo     }
echo     
echo     $zipUrl = 'https://github.com/Mrcolipark/IWABAYASHI/archive/refs/heads/main.zip'
echo     $zipFile = Join-Path $env:TEMP 'iwabayashi.zip'
echo     Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile -UseBasicParsing ^| Out-Null
echo     Expand-Archive -Path $zipFile -DestinationPath $desktopPath -Force ^| Out-Null
echo     
echo     $extractedPath = Join-Path $desktopPath 'IWABAYASHI-main'
echo     if ^(Test-Path $extractedPath^) {
echo         Rename-Item $extractedPath 'IWABAYASHI' ^| Out-Null
echo     }
echo     
echo     # Install dependencies ^(silent^)
echo     Update-Progress 4 "Installing dependencies"
echo     Set-Location $projectPath
echo     ^& npm config set registry https://registry.npmmirror.com 2^>$null ^| Out-Null
echo     ^& npm install --no-audit --legacy-peer-deps --silent 2^>$null ^| Out-Null
echo     
echo     # Create launch script
echo     Update-Progress 5 "Finalizing setup"
echo     $launchScript = @'
echo @echo off
echo title IWABAYASHI Corporation Website
echo color 0A
echo cls
echo echo.
echo echo ┌─────────────────────────────────────────────────────────────────┐
echo echo │                🚀 IWABAYASHI Corporation Website 🚀              │
echo echo └─────────────────────────────────────────────────────────────────┘
echo echo.
echo echo 📍 Project: {PROJECT_PATH}
echo echo 🌐 URL: http://localhost:3000
echo echo ⏰ Time: %%date%% %%time%%
echo echo.
echo echo [████████████████████████████████████████████████████████] 100%%
echo echo.
echo echo Starting server... Browser will open in 15 seconds
echo echo Press Ctrl+C to stop
echo echo.
echo cd /d "{PROJECT_PATH}"
echo start /b timeout /t 15 /nobreak ^^^>nul ^^^& start http://localhost:3000
echo npm start --silent
echo echo.
echo echo Website stopped
echo pause
echo '@
echo     
echo     $launchScript = $launchScript.Replace^('{PROJECT_PATH}', $projectPath^)
echo     $launchScriptPath = Join-Path $projectPath 'Start Website.bat'
echo     $launchScript ^| Out-File $launchScriptPath -Encoding ASCII
echo     
echo     # Clean up
echo     Remove-Item $zipFile -ErrorAction SilentlyContinue ^| Out-Null
echo     $tempDir = Join-Path $env:TEMP 'iwabayashi_temp'
echo     if ^(Test-Path $tempDir^) { Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue ^| Out-Null }
echo     
echo     Update-Progress 5 "Installation completed"
echo     Write-Host "SUCCESS:$projectPath"
echo     
echo } catch {
echo     Write-Host "ERROR:$^($_.Exception.Message^)"
echo     exit 1
echo }
) > "%PS_SCRIPT%"

:: Execute PowerShell with progress monitoring
for /f "tokens=1,2* delims=:" %%a in ('powershell -ExecutionPolicy Bypass -File "%PS_SCRIPT%" 2^>^&1') do (
    if "%%a"=="PROGRESS" (
        call :show_progress %%b "%%c"
    ) else if "%%a"=="SUCCESS" (
        set "PROJECT_LOCATION=%%b"
        goto :success
    ) else if "%%a"=="ERROR" (
        goto :error
    )
)

:error
cls
echo.
echo ████████████████████████████████████████████████████████████
echo █                   ❌ Installation Failed                  █
echo ████████████████████████████████████████████████████████████
echo.
echo Possible solutions:
echo • Check internet connection
echo • Run as administrator
echo • Temporarily disable antivirus
echo.
del "%PS_SCRIPT%" >nul 2>&1
pause
exit /b 1

:success
del "%PS_SCRIPT%" >nul 2>&1
cls
echo.
echo ████████████████████████████████████████████████████████████
echo █                                                          █
echo █  [████████████████████████████████████████████████████]  █
echo █                   ✅ Installation Complete!              █
echo █                                                          █
echo ████████████████████████████████████████████████████████████
echo.
echo 🚀 IWABAYASHI website is ready!
echo.
echo 📁 Location: Desktop\IWABAYASHI
echo 🎯 To start: Double-click "Start Website.bat"
echo 🌐 URL: http://localhost:3000
echo.
echo Features:
echo   🌌 Dynamic particle background
echo   ⌨️  Trilingual typewriter effect  
echo   🎬 Smooth animations
echo   📱 Responsive design
echo.

set /p start_now="Launch website now? (Y/N): "
if /i "!start_now!" equ "Y" (
    echo.
    echo 🚀 Starting website...
    start "" "!PROJECT_LOCATION!\Start Website.bat"
)

echo.
echo Thank you for using IWABAYASHI Installer!
pause