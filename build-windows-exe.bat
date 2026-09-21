@echo off
cd /d "%~dp0"
title MERZ Security Solutions - 1-Click Windows EXE Builder
color 0A

echo ========================================================
echo   MERZ SECURITY SOLUTIONS AGENCY INC. - DESKTOP BUILDER
echo   DOLE D.O. 150-16 Security Guard Payroll System
echo ========================================================
echo.

REM Verify we are inside the extracted project folder
if not exist "package.json" (
    echo [ERROR] "package.json" was not found in this folder!
    echo.
    echo You cannot run this builder script by itself in your Downloads folder.
    echo To compile the .EXE:
    echo   1. In Google AI Studio, click the top-right menu -^> "Download ZIP".
    echo   2. Right-click the downloaded ZIP and choose "Extract All...".
    echo   3. Open the extracted folder and run "build-windows-exe.bat" from there.
    echo.
    pause
    exit /b 1
)

echo [1/3] Verifying Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed on this computer!
    echo Electron requires Node.js to package the application into a .EXE.
    echo.
    echo Fix:
    echo   1. Download and install Node.js (LTS version) from: https://nodejs.org/
    echo   2. Restart your computer or terminal, then run this file again.
    echo.
    echo Alternatively: If you don't want to install Node.js, install the app
    echo directly via Chrome/Edge (3 dots -^> Install MERZ Payroll) for a native desktop app!
    echo.
    pause
    exit /b 1
)

echo [2/3] Installing build dependencies (Electron & Builder)...
call npm install
call npm install --save-dev electron electron-builder electron-squirrel-startup

echo.
echo [3/3] Building Windows Setup Installer (.exe) and Portable EXE...
call npx vite build
call npx electron-builder --win nsis portable

echo.
echo ========================================================
echo   SUCCESS! Your Windows EXE files are generated!
echo   Location: Look in the 'dist' folder for:
echo.
echo   1. Windows Setup Installer:
echo      "MERZ Security Solutions Payroll System Setup 1.0.0.exe"
echo      (Installs the program, creates desktop and start menu icons)
echo.
echo   2. Portable Standalone Executable:
echo      "MERZ Security Solutions Payroll System.exe"
echo ========================================================
echo.
pause

