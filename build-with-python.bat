@echo off
cd /d "%~dp0"
title MERZ Security Solutions - Python EXE Builder
color 0B

echo ========================================================
echo   MERZ SECURITY SOLUTIONS AGENCY INC. - PYTHON BUILDER
echo   DOLE D.O. 150-16 Security Guard Payroll System
echo ========================================================
echo.

echo Checking Python installation...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Python was not found in your Windows command line!
    echo.
    echo Please make sure:
    echo   1. Python is installed from: https://www.python.org/downloads/
    echo   2. During installation, CHECK the box: "Add python.exe to PATH"
    echo.
    pause
    exit /b 1
)

echo Python found! Starting 1-Click Builder...
echo.
python build_with_python.py
