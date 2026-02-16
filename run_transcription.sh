#!/bin/bash
# Automated Transcription Runner for Linux/Mac
# This script activates the virtual environment and runs the transcription

echo "Starting WhisperX Transcription System..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Run transcription script
python auto_transcribe.py
