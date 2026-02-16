@echo off
REM Automated Transcription Runner
REM This script activates the virtual environment and runs the transcription

echo Starting WhisperX Transcription System...
echo.

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Run transcription script
python auto_transcribe.py

REM Pause to see output (remove this line for scheduled tasks)
pause
