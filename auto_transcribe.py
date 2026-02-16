import os
import glob
import shutil
import subprocess
from datetime import datetime

# ===== CONFIG =====
RECORDINGS_FOLDER = "recordings"
ARCHIVE_FOLDER = "archive"
LOG_FOLDER = "logs"
WHISPER_MODEL = "medium"
LANGUAGE = "pl"
# ==================

def log(message):
    """Log message to both console and log file with timestamp."""
    os.makedirs(LOG_FOLDER, exist_ok=True)
    log_file = os.path.join(LOG_FOLDER, "transcription_log.txt")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")

    print(message)

def main():
    """Main transcription workflow."""
    mp3_files = glob.glob(os.path.join(RECORDINGS_FOLDER, "*.mp3"))

    if not mp3_files:
        log("No recordings found. Workflow skipped.")
        return

    today = datetime.now().strftime("%d.%m.%Y")
    date_folder = os.path.join(ARCHIVE_FOLDER, today)
    os.makedirs(date_folder, exist_ok=True)

    log(f"Found {len(mp3_files)} file(s). Creating folder: {today}")

    for mp3 in mp3_files:
        filename = os.path.basename(mp3)

        try:
            log(f"Transcribing: {filename}")

            cmd = [
                "whisperx",
                mp3,
                "--model", WHISPER_MODEL,
                "--language", LANGUAGE,
                "--diarize",
                "--output_format", "txt",
                "--output_dir", date_folder
            ]

            subprocess.run(cmd, check=True)

            # Move original MP3
            destination = os.path.join(date_folder, filename)
            shutil.move(mp3, destination)

            log(f"Finished: {filename}")

        except Exception as e:
            log(f"ERROR processing {filename}: {str(e)}")

    log("Workflow completed.\n")

if __name__ == "__main__":
    main()
