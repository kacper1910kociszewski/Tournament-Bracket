# Tournament Bracket Application

A React-based tournament bracket management system with Firebase authentication.

## Features

- Interactive tournament bracket visualization
- User authentication with Firebase
- Match management
- Responsive design with Material-UI

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

# 🎙️ Audio Transcription System (NEW)

An automated Polish audio transcription system with speaker diarization using WhisperX.

## Quick Links

- **[Quick Start Guide](QUICK_START.md)** - Get running in 15 minutes
- **[Full Documentation](TRANSCRIPTION_README.md)** - Complete setup guide
- **[Test Setup](test_setup.py)** - Verify your installation

## What It Does

Every day at 20:00:
1. Checks `recordings/` folder for MP3 files
2. Transcribes each file with Polish language support
3. Identifies different speakers (diarization)
4. Moves files + transcripts to dated archive folder
5. Logs everything

**Fully offline. No cloud services.**

## Quick Setup

```bash
# 1. Install dependencies
python -m venv venv
venv\Scripts\activate
pip install torch whisperx

# 2. Configure HuggingFace (for speaker diarization)
huggingface-cli login

# 3. Test it
python test_setup.py

# 4. First run
python auto_transcribe.py
```

## System Requirements

**Recommended:**
- Desktop with NVIDIA RTX 3060 (8GB VRAM)
- 16GB RAM
- 10GB+ disk space
- Windows 10/11

**Minimum:**
- Any computer with Python 3.10+
- 8GB RAM (CPU mode)

## Folder Structure

```
Tournament-Bracket/
├── recordings/          # Input: Place MP3 files here
├── archive/             # Output: Processed files by date
├── logs/                # System logs
├── auto_transcribe.py   # Main transcription script
├── test_setup.py        # Setup verification
└── requirements.txt     # Python dependencies
```

## Performance

| Hardware | 1 Hour Audio | Model |
|----------|--------------|-------|
| RTX 3060 | ~7 minutes | medium |
| Ryzen CPU | ~45 minutes | small |

## Documentation

- **[QUICK_START.md](QUICK_START.md)** - 15-minute setup guide
- **[TRANSCRIPTION_README.md](TRANSCRIPTION_README.md)** - Complete documentation with:
  - Detailed installation steps
  - Windows Task Scheduler setup
  - Troubleshooting guide
  - Configuration options
  - Performance tuning

## Automation

Use the helper script (Windows):
```bash
setup_scheduler.bat
```

Or manually set up Task Scheduler to run daily at 20:00.

## Support

For transcription system issues, see [TRANSCRIPTION_README.md](TRANSCRIPTION_README.md) troubleshooting section.

## License

MIT
