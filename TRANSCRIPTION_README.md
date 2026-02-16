# 🎙️ Automated Polish Audio Transcription System

## Overview

This system automatically transcribes Polish audio recordings using WhisperX with speaker diarization. It's designed to run daily at 20:00, processing any new recordings and archiving them with transcripts.

### Key Features

- ✅ **Polish Language Support** - Optimized for Polish audio
- ✅ **Speaker Diarization** - Identifies different speakers in recordings
- ✅ **GPU Acceleration** - Fast processing with NVIDIA GPUs (RTX 3060)
- ✅ **CPU Fallback** - Works without GPU (slower)
- ✅ **Error Handling** - Continues processing even if one file fails
- ✅ **Comprehensive Logging** - Track all operations
- ✅ **Fully Offline** - No internet required after setup

---

## 🖥️ Hardware Recommendations

### Desktop with RTX 3060 (8GB VRAM)
**Best option** - GPU acceleration makes transcription 5-10x faster
- 1 hour of audio → 5-10 minutes processing
- GPU memory usage: ~4-6GB

### Laptop with Ryzen CPU
**Works but slower** - CPU-only processing
- 1 hour of audio → 30-60 minutes processing

---

## 📦 Installation

### Step 1: Install Python 3.10+

Download from: https://www.python.org

**Important:** During installation, check "Add Python to PATH"

Verify installation:
```bash
python --version
```

### Step 2: Install FFmpeg

FFmpeg is required for audio decoding.

**Windows:**
1. Download from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to your PATH environment variable

**Verify:**
```bash
ffmpeg -version
```

### Step 3: Install CUDA (GPU Only)

**Skip this if you're using CPU only**

For NVIDIA GPU acceleration:
1. Install CUDA Toolkit 11.8 or compatible version
2. Download from: https://developer.nvidia.com/cuda-downloads

**Verify GPU:**
```bash
nvidia-smi
```

### Step 4: Create Virtual Environment

Navigate to the project folder:
```bash
cd Tournament-Bracket
python -m venv venv
```

**Activate virtual environment:**

Windows:
```bash
venv\Scripts\activate
```

Linux/Mac:
```bash
source venv/bin/activate
```

### Step 5: Install WhisperX

**With GPU (CUDA 11.8):**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install whisperx
```

**Without GPU (CPU only):**
```bash
pip install torch torchvision torchaudio
pip install whisperx
```

Or use the requirements file:
```bash
pip install -r requirements.txt
```

### Step 6: HuggingFace Authentication

**Required for speaker diarization**

1. Create account at: https://huggingface.co
2. Go to Settings → Access Tokens
3. Create a new token (read permissions are sufficient)
4. Accept the user agreement for pyannote models:
   - Visit: https://huggingface.co/pyannote/speaker-diarization
   - Click "Agree and access repository"

5. Login via CLI:
```bash
huggingface-cli login
```

Paste your token when prompted.

---

## 📁 Folder Structure

The system uses the following structure:

```
Tournament-Bracket/
│
├── recordings/          ← Place your MP3 files here
├── archive/             ← Processed files go here
│   └── DD.MM.YYYY/     ← Date-based folders
│       ├── file1.mp3
│       ├── file1.txt
│       ├── file2.mp3
│       └── file2.txt
│
├── logs/                ← System logs
│   └── transcription_log.txt
│
├── auto_transcribe.py   ← Main script
├── requirements.txt     ← Python dependencies
└── venv/               ← Virtual environment (created by you)
```

---

## 🚀 Usage

### Manual Execution

1. Place MP3 files in `recordings/` folder
2. Activate virtual environment:
   ```bash
   venv\Scripts\activate
   ```
3. Run the script:
   ```bash
   python auto_transcribe.py
   ```

### What Happens

1. Script checks `recordings/` for MP3 files
2. If empty → exits gracefully
3. If files found:
   - Creates `archive/16.02.2026/` (today's date)
   - Transcribes each file with WhisperX
   - Saves transcript as `.txt` file
   - Moves MP3 and transcript to archive folder
   - Logs everything to `logs/transcription_log.txt`

---

## ⏰ Automated Daily Execution (20:00)

### Windows Task Scheduler

1. Open **Task Scheduler** (search in Start menu)
2. Click **Create Task** (not "Create Basic Task")
3. **General Tab:**
   - Name: `Audio Transcription`
   - Description: `Daily automated transcription at 20:00`
   - Run whether user is logged on or not (optional)

4. **Triggers Tab:**
   - Click **New**
   - Begin the task: `On a schedule`
   - Settings: `Daily`
   - Start: Select today's date
   - Start time: `20:00:00`
   - Click **OK**

5. **Actions Tab:**
   - Click **New**
   - Action: `Start a program`
   - Program/script: `C:\path\to\Tournament-Bracket\venv\Scripts\python.exe`
   - Add arguments: `C:\path\to\Tournament-Bracket\auto_transcribe.py`
   - Start in: `C:\path\to\Tournament-Bracket`
   - Click **OK**

6. **Conditions Tab:**
   - Uncheck "Start only if computer is on AC power" (optional)

7. Click **OK** to save

**Test it:**
- Right-click the task → Run
- Check `logs/transcription_log.txt` for results

### Linux/Mac (cron)

Add to crontab:
```bash
crontab -e
```

Add this line:
```
0 20 * * * cd /path/to/Tournament-Bracket && ./venv/bin/python auto_transcribe.py
```

---

## ⚙️ Configuration

Edit `auto_transcribe.py` to customize:

```python
# ===== CONFIGURATION =====
RECORDINGS_FOLDER = "recordings"  # Change input folder
ARCHIVE_FOLDER = "archive"        # Change output folder
LOG_FOLDER = "logs"               # Change log location
WHISPER_MODEL = "medium"          # tiny, base, small, medium, large
LANGUAGE = "pl"                   # Change language code
# =========================
```

### Model Sizes

| Model  | Size   | Memory | Speed      | Accuracy |
|--------|--------|--------|------------|----------|
| tiny   | ~75MB  | ~1GB   | Fastest    | Lower    |
| base   | ~150MB | ~1GB   | Fast       | Good     |
| small  | ~500MB | ~2GB   | Medium     | Better   |
| medium | ~1.5GB | ~5GB   | Slower     | Best     |
| large  | ~3GB   | ~10GB  | Slowest    | Maximum  |

**Recommendation:** Use `medium` for best balance of speed and accuracy.

---

## 📊 Example Workflow

### Day 1: Record Lessons
You record 3 lessons on your phone:
- `math_lesson.mp3` (45 minutes)
- `physics_lecture.mp3` (60 minutes)  
- `chemistry_lab.mp3` (30 minutes)

### Day 2: Copy to Computer
Copy all 3 files to `recordings/` folder

### Day 2 at 20:00: Automatic Processing
Script runs automatically:

```
[2026-02-16 20:00:01] Starting transcription workflow
[2026-02-16 20:00:01] Found 3 file(s) to process
[2026-02-16 20:00:01] Creating archive folder: 16.02.2026
[2026-02-16 20:00:01] Processing: math_lesson.mp3
[2026-02-16 20:08:23] ✓ Successfully processed: math_lesson.mp3
[2026-02-16 20:08:24] Processing: physics_lecture.mp3
[2026-02-16 20:19:15] ✓ Successfully processed: physics_lecture.mp3
[2026-02-16 20:19:16] Processing: chemistry_lab.mp3
[2026-02-16 20:25:03] ✓ Successfully processed: chemistry_lab.mp3
[2026-02-16 20:25:03] Workflow completed: 3 succeeded, 0 failed
```

### Result Structure
```
archive/
└── 16.02.2026/
    ├── math_lesson.mp3
    ├── math_lesson.txt
    ├── physics_lecture.mp3
    ├── physics_lecture.txt
    ├── chemistry_lab.mp3
    └── chemistry_lab.txt
```

---

## ⚠️ Troubleshooting

### Issue: "WhisperX is not installed"
**Solution:**
```bash
venv\Scripts\activate
pip install whisperx
```

### Issue: "HuggingFace token not found"
**Solution:**
```bash
huggingface-cli login
```
Then paste your token.

### Issue: Speaker diarization not working
**Solution:**
1. Make sure you accepted the pyannote model agreement
2. Visit: https://huggingface.co/pyannote/speaker-diarization
3. Click "Agree and access repository"
4. Re-run script

### Issue: GPU not being used
**Check:**
```bash
python -c "import torch; print(torch.cuda.is_available())"
```

If `False`, reinstall PyTorch with CUDA:
```bash
pip uninstall torch torchvision torchaudio
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### Issue: "CUDA out of memory"
**Solutions:**
1. Use smaller model: Change `WHISPER_MODEL = "small"` or `"base"`
2. Process files one at a time (already default behavior)
3. Close other GPU applications

### Issue: Transcription is slow
**If you have GPU:**
- Verify CUDA is installed: `nvidia-smi`
- Verify PyTorch sees GPU: `python -c "import torch; print(torch.cuda.is_available())"`

**If CPU only:**
- This is expected - CPU processing is slower
- Consider using smaller model for speed
- Process overnight

### Issue: File-specific errors
The script continues processing other files even if one fails. Check `logs/transcription_log.txt` for specific error details.

---

## 🔒 Security & Privacy

- **Fully Offline:** After installation, no internet connection required
- **Local Processing:** All data stays on your computer
- **No Cloud Services:** No audio is sent to external servers
- **Private Logs:** All logs stored locally in `logs/` folder

---

## 📈 Performance Expectations

### RTX 3060 (8GB VRAM)
- 1 hour audio: ~5-10 minutes
- 2 hour audio: ~10-20 minutes
- GPU usage: ~4-6GB VRAM
- Model: medium recommended

### Ryzen CPU (16GB RAM)
- 1 hour audio: ~30-60 minutes
- 2 hour audio: ~60-120 minutes
- CPU usage: ~80-100%
- Model: small or base recommended

---

## 🎯 What Can Break (and How to Fix)

### 1. HuggingFace Token Issues
**Problem:** Diarization fails  
**Fix:** Re-run `huggingface-cli login` and accept model agreements

### 2. GPU Driver Mismatch
**Problem:** Falls back to CPU despite having GPU  
**Fix:** Update NVIDIA drivers and reinstall PyTorch with matching CUDA version

### 3. Corrupted Recording
**Problem:** One file fails to process  
**Fix:** Script automatically continues with other files. Check logs for details.

### 4. Disk Space
**Problem:** Archive folder growing too large  
**Fix:** Periodically move old archives to external storage

### 5. FFmpeg Not Found
**Problem:** "FFmpeg not found" error  
**Fix:** Ensure FFmpeg is in PATH and restart terminal

---

## 🚀 Future Enhancements

Potential upgrades to consider:

- [ ] Automatic subject detection from transcript
- [ ] Weekly ZIP export of archives
- [ ] Email/notification when processing completes
- [ ] Web dashboard for viewing transcripts
- [ ] Multiple language support
- [ ] Custom vocabulary for technical terms
- [ ] Integration with n8n for workflow automation

---

## 📝 Support

For issues related to:
- **WhisperX:** https://github.com/m-bain/whisperX
- **PyTorch:** https://pytorch.org/
- **HuggingFace:** https://huggingface.co/docs

---

## ✅ Quick Start Checklist

- [ ] Python 3.10+ installed
- [ ] FFmpeg installed and in PATH
- [ ] Virtual environment created
- [ ] WhisperX installed
- [ ] HuggingFace token configured
- [ ] Folder structure created (recordings/, archive/, logs/)
- [ ] Test run completed successfully
- [ ] Windows Task Scheduler configured (for automation)

---

**You now have a production-ready automated transcription system! 🎉**
