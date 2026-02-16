@echo off
REM Windows Task Scheduler Setup Helper
REM This script creates a scheduled task for daily transcription at 20:00

echo ============================================
echo Audio Transcription Task Scheduler Setup
echo ============================================
echo.

REM Get the current directory
set SCRIPT_DIR=%~dp0
set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

echo Project Directory: %SCRIPT_DIR%
echo.

REM Check if Python virtual environment exists
if not exist "%SCRIPT_DIR%\venv\Scripts\python.exe" (
    echo ERROR: Python virtual environment not found!
    echo Please create it first:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

echo Creating scheduled task...
echo.

REM Create the scheduled task
schtasks /create /tn "AudioTranscription" /tr "\"%SCRIPT_DIR%\venv\Scripts\python.exe\" \"%SCRIPT_DIR%\auto_transcribe.py\"" /sc daily /st 20:00 /ru "%USERNAME%" /f

if %ERRORLEVEL% equ 0 (
    echo.
    echo ============================================
    echo SUCCESS! Task created successfully.
    echo ============================================
    echo.
    echo Task Details:
    echo - Name: AudioTranscription
    echo - Schedule: Daily at 20:00
    echo - Script: %SCRIPT_DIR%\auto_transcribe.py
    echo - Python: %SCRIPT_DIR%\venv\Scripts\python.exe
    echo.
    echo To test the task manually:
    echo   schtasks /run /tn AudioTranscription
    echo.
    echo To view task status:
    echo   schtasks /query /tn AudioTranscription
    echo.
    echo To delete the task:
    echo   schtasks /delete /tn AudioTranscription /f
    echo.
) else (
    echo.
    echo ERROR: Failed to create scheduled task.
    echo Please try running this script as Administrator.
    echo.
)

pause
