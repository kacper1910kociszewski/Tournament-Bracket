"""
Automated Polish Audio Transcription System with Speaker Diarization
=====================================================================

This script automatically transcribes Polish audio recordings using WhisperX
with speaker diarization support. Designed to run daily at 20:00.

Features:
- Polish language support
- Speaker diarization
- GPU acceleration (with CPU fallback)
- Error handling and logging
- Organized archive by date
"""

import os
import glob
import shutil
import subprocess
from datetime import datetime

# ===== CONFIGURATION =====
RECORDINGS_FOLDER = "recordings"
ARCHIVE_FOLDER = "archive"
LOG_FOLDER = "logs"
WHISPER_MODEL = "medium"  # Options: tiny, base, small, medium, large
LANGUAGE = "pl"  # Polish
# =========================

def log(message):
    """
    Log messages to both console and log file with timestamp.
    
    Args:
        message (str): The message to log
    """
    os.makedirs(LOG_FOLDER, exist_ok=True)
    log_file = os.path.join(LOG_FOLDER, "transcription_log.txt")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    log_entry = f"[{timestamp}] {message}"
    
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_entry + "\n")
    
    print(log_entry)

def check_whisperx_available():
    """
    Check if WhisperX is installed and available.
    
    Returns:
        bool: True if WhisperX is available, False otherwise
    """
    try:
        result = subprocess.run(
            ["whisperx", "--help"],
            capture_output=True,
            text=True,
            timeout=5
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False

def main():
    """
    Main workflow:
    1. Check for MP3 files in recordings folder
    2. If found, create dated archive folder
    3. Transcribe each file with WhisperX
    4. Move MP3 and transcript to archive
    5. Log all operations
    """
    log("=" * 60)
    log("Starting transcription workflow")
    
    # Check if WhisperX is available
    if not check_whisperx_available():
        log("ERROR: WhisperX is not installed or not in PATH")
        log("Please install WhisperX first. See README.md for instructions.")
        return
    
    # Find all MP3 files in recordings folder
    mp3_files = glob.glob(os.path.join(RECORDINGS_FOLDER, "*.mp3"))
    
    if not mp3_files:
        log("No recordings found. Workflow skipped.")
        log("=" * 60)
        return
    
    # Create dated folder
    today = datetime.now().strftime("%d.%m.%Y")
    date_folder = os.path.join(ARCHIVE_FOLDER, today)
    os.makedirs(date_folder, exist_ok=True)
    
    log(f"Found {len(mp3_files)} file(s) to process")
    log(f"Creating archive folder: {today}")
    
    success_count = 0
    error_count = 0
    
    # Process each MP3 file
    for mp3 in mp3_files:
        filename = os.path.basename(mp3)
        
        try:
            log(f"Processing: {filename}")
            
            # Build WhisperX command
            cmd = [
                "whisperx",
                mp3,
                "--model", WHISPER_MODEL,
                "--language", LANGUAGE,
                "--diarize",
                "--output_format", "txt",
                "--output_dir", date_folder
            ]
            
            # Run transcription
            result = subprocess.run(
                cmd,
                check=True,
                capture_output=True,
                text=True,
                timeout=3600  # 1 hour timeout per file
            )
            
            # Move original MP3 to archive
            destination = os.path.join(date_folder, filename)
            shutil.move(mp3, destination)
            
            log(f"✓ Successfully processed: {filename}")
            success_count += 1
            
        except subprocess.TimeoutExpired:
            log(f"✗ ERROR: Timeout processing {filename} (exceeded 1 hour)")
            error_count += 1
            
        except subprocess.CalledProcessError as e:
            log(f"✗ ERROR processing {filename}: {e.stderr[:200] if e.stderr else str(e)}")
            error_count += 1
            
        except Exception as e:
            log(f"✗ ERROR processing {filename}: {str(e)}")
            error_count += 1
    
    # Summary
    log(f"Workflow completed: {success_count} succeeded, {error_count} failed")
    log("=" * 60 + "\n")

if __name__ == "__main__":
    main()
