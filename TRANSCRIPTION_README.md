# 🎙️ WhisperX Automated Transcription System

## 🧠 System Overview

This system automatically transcribes Polish audio recordings with speaker diarization.

**Daily workflow at 20:00:**
1. Checks `recordings/` folder for `.mp3` files
2. If empty → stops
3. If files exist:
   - Creates dated archive folder: `archive/DD.MM.YYYY`
   - Transcribes each file (Polish + speaker diarization)
   - Moves MP3 + transcript to date folder
   - Logs all operations

**Fully offline operation** (after initial setup)

---

## 🖥 Hardware Requirements

### Recommended: Desktop with RTX 3060 (8GB)
- GPU acceleration for fast transcription
- ~5-10 minutes per 1 hour of audio
- Uses 4-6GB GPU memory

### Alternative: Laptop (CPU-only)
- Works but slower
- No GPU required

---

## 📦 Installation Guide

### 1️⃣ Install Python 3.10

Download from: https://www.python.org

**Important:** During installation, check ✔ "Add Python to PATH"

Verify installation:
```bash
python --version
```

---

### 2️⃣ Install FFmpeg

Required for audio decoding.

Download from: https://www.gyan.dev/ffmpeg/builds/

1. Download the release build
2. Extract to a folder (e.g., `C:\ffmpeg`)
3. Add `C:\ffmpeg\bin` to system PATH
4. Restart terminal

Verify installation:
```bash
ffmpeg -version
```

---

### 3️⃣ Install CUDA (GPU only - RTX 3060)

**Skip this step if using CPU-only mode**

Install CUDA Toolkit 11.8 or compatible version from:
https://developer.nvidia.com/cuda-downloads

Verify GPU:
```bash
nvidia-smi
```

---

### 4️⃣ Create Virtual Environment

In the project folder:

```bash
python -m venv venv
```

Activate the environment:

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

---

### 5️⃣ Install Python Dependencies

**For GPU (CUDA 11.8):**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install whisperx
```

**For CPU-only:**
```bash
pip install torch torchvision torchaudio
pip install whisperx
```

Or use the requirements file:
```bash
pip install -r requirements.txt
```

---

### 6️⃣ Setup HuggingFace Token (Required for Diarization)

Speaker diarization requires authentication with HuggingFace.

1. Create account at: https://huggingface.co
2. Go to Settings → Access Tokens
3. Create a new token (read access is sufficient)
4. Login via CLI:

```bash
huggingface-cli login
```

Paste your token when prompted.

**This step is mandatory** for speaker diarization to work.

---

## 📁 Folder Structure

```
Tournament-Bracket/
│
├── recordings/          # Place MP3 files here
├── archive/            # Transcribed files organized by date
│   └── 16.02.2026/    # Auto-created date folders
│       ├── lesson1.mp3
│       ├── lesson1.txt
│       ├── lesson2.mp3
│       └── lesson2.txt
├── logs/               # System logs
│   └── transcription_log.txt
├── auto_transcribe.py  # Main script
└── requirements.txt    # Python dependencies
```

---

## 🚀 Usage

### Manual Execution

1. Place `.mp3` files in `recordings/` folder
2. Activate virtual environment: `venv\Scripts\activate`
3. Run script:

```bash
python auto_transcribe.py
```

### Output

The script will:
- Create `archive/DD.MM.YYYY/` folder
- Generate `.txt` transcripts with speaker labels
- Move original MP3 files to archive
- Log all operations to `logs/transcription_log.txt`

---

## ⏰ Automated Daily Execution (Windows)

### Using Task Scheduler

1. Open **Task Scheduler** (search in Start menu)
2. Click **Create Task** (not "Create Basic Task")
3. **General tab:**
   - Name: "WhisperX Transcription"
   - Description: "Daily audio transcription at 20:00"
   - Check "Run whether user is logged on or not"
4. **Triggers tab:**
   - New → Daily
   - Start time: 20:00
   - Recur every 1 day
5. **Actions tab:**
   - New → Start a program
   - Program: `C:\path\to\Tournament-Bracket\venv\Scripts\python.exe`
   - Arguments: `auto_transcribe.py`
   - Start in: `C:\path\to\Tournament-Bracket`
6. Click **OK**

**Important:** Replace `C:\path\to\Tournament-Bracket` with your actual project path.

---

## ⚙️ Configuration

Edit `auto_transcribe.py` to customize:

```python
RECORDINGS_FOLDER = "recordings"  # Input folder
ARCHIVE_FOLDER = "archive"        # Output folder
LOG_FOLDER = "logs"               # Logs folder
WHISPER_MODEL = "medium"          # Options: tiny, base, small, medium, large
LANGUAGE = "pl"                   # Polish language
```

### Model Size vs Performance

| Model  | Speed    | Accuracy | GPU RAM |
|--------|----------|----------|---------|
| tiny   | Fastest  | Low      | ~1GB    |
| base   | Fast     | Medium   | ~1GB    |
| small  | Medium   | Good     | ~2GB    |
| medium | Slower   | Better   | ~5GB    |
| large  | Slowest  | Best     | ~10GB   |

**Recommended:** `medium` for RTX 3060

---

## ⚠️ Troubleshooting

### "No module named 'whisperx'"
- Ensure virtual environment is activated
- Run: `pip install whisperx`

### "HuggingFace token not found" / Diarization fails
- Run: `huggingface-cli login`
- Enter your HuggingFace token
- Accept terms for pyannote models at: https://huggingface.co/pyannote/speaker-diarization

### GPU not detected / Slow performance
- Verify CUDA: `nvidia-smi`
- Reinstall PyTorch with CUDA support:
  ```bash
  pip uninstall torch torchvision torchaudio
  pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
  ```

### FFmpeg error
- Verify: `ffmpeg -version`
- Ensure FFmpeg bin folder is in system PATH
- Restart terminal after PATH changes

### One file fails but others work
- This is expected behavior
- Failed file is logged but doesn't stop processing
- Check logs for specific error details

---

## 🔒 Security & Privacy

- All processing is **100% offline** (after initial model downloads)
- No data is sent to external servers
- Audio files stay on your local machine
- Only HuggingFace token authentication requires internet

---

## 📊 Performance Expectations

### RTX 3060 (8GB GPU)
- 1 hour audio → 5-10 minutes processing
- GPU memory usage: 4-6GB
- Can process multiple files sequentially

### CPU-only (Ryzen)
- 1 hour audio → 30-60 minutes processing
- Works without GPU but slower

---

## 📝 Logs

All operations are logged to: `logs/transcription_log.txt`

Example log:
```
[2026-02-16 20:00:01] Found 2 file(s). Creating folder: 16.02.2026
[2026-02-16 20:00:01] Transcribing: lesson1.mp3
[2026-02-16 20:05:23] Finished: lesson1.mp3
[2026-02-16 20:05:23] Transcribing: lesson2.mp3
[2026-02-16 20:10:45] Finished: lesson2.mp3
[2026-02-16 20:10:45] Workflow completed.
```

---

## 🎯 What You've Built

✅ Automated Polish lecture transcription system  
✅ Speaker diarization (identifies who spoke when)  
✅ Organized date-based archiving  
✅ Error handling and logging  
✅ Daily scheduling  
✅ Fully offline operation  

---

## 🚀 Future Enhancements

Possible additions:
- Automatic subject detection from transcripts
- Weekly ZIP export of archives
- Email/notification when transcription completes
- Web dashboard for browsing transcripts
- Support for other audio formats (WAV, M4A, etc.)

---

## 🐛 Support

If you encounter issues:
1. Check the logs: `logs/transcription_log.txt`
2. Verify all installation steps
3. Test with a small sample file first
4. Ensure HuggingFace token is configured

---

## 📄 License

This transcription system uses:
- **WhisperX**: https://github.com/m-bain/whisperX
- **Whisper**: OpenAI (MIT License)
- **Pyannote**: Speaker diarization models

Please review their respective licenses for commercial use.
