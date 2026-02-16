# 🚀 Quick Start Guide - Audio Transcription System

This is a condensed guide to get you up and running in 15 minutes.

## Prerequisites
- Windows PC (Desktop with RTX 3060 recommended)
- Python 3.10+ installed
- 10GB+ free disk space

## Installation (5 minutes)

### 1. Install FFmpeg
```bash
# Download from https://www.gyan.dev/ffmpeg/builds/
# Extract and add bin folder to PATH
ffmpeg -version  # Verify
```

### 2. Create Virtual Environment
```bash
cd Tournament-Bracket
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies

**With GPU (NVIDIA):**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install whisperx
```

**Without GPU:**
```bash
pip install torch whisperx
```

### 4. HuggingFace Login
```bash
# Create account at https://huggingface.co
# Get token from Settings → Access Tokens
# Accept agreement at: https://huggingface.co/pyannote/speaker-diarization

huggingface-cli login
# Paste your token
```

### 5. Verify Setup
```bash
python test_setup.py
```

All checks should pass ✓

## First Run (2 minutes)

### 1. Add Test File
```bash
# Copy an MP3 file to recordings\ folder
copy "C:\path\to\your\recording.mp3" "recordings\"
```

### 2. Run Transcription
```bash
python auto_transcribe.py
```

### 3. Check Results
```bash
# Look in archive/DD.MM.YYYY/ for:
# - original.mp3
# - original.txt (transcript with speakers)
```

## Automation Setup (3 minutes)

### Option A: Use Helper Script (Easy)
```bash
# Run as Administrator
setup_scheduler.bat
```

### Option B: Manual Setup
1. Open Task Scheduler
2. Create Task → Daily at 20:00
3. Action: Run `venv\Scripts\python.exe auto_transcribe.py`
4. Done!

## Daily Workflow

```
You record → Copy to recordings/ → Wait for 20:00 → Check archive/
```

That's it! 🎉

## Troubleshooting

| Problem | Solution |
|---------|----------|
| WhisperX not found | `pip install whisperx` |
| GPU not detected | Update NVIDIA drivers |
| Diarization fails | Accept pyannote agreement on HuggingFace |
| Slow processing | Normal for CPU mode, or use smaller model |

## Configuration

Edit `auto_transcribe.py`:
```python
WHISPER_MODEL = "medium"  # Change to "small" for faster processing
LANGUAGE = "pl"           # Polish (keep as is)
```

## Need More Help?

Read the full guide: **TRANSCRIPTION_README.md**

## Performance Reference

**RTX 3060:**
- 1 hour audio → ~7 minutes
- Model: medium

**CPU (Ryzen):**
- 1 hour audio → ~45 minutes  
- Model: small recommended

---

**Ready to scale? Check TRANSCRIPTION_README.md for advanced features.**
