"""
Transcription System Test Script
=================================

This script verifies that all components are properly installed and configured.
Run this before setting up automation to ensure everything works.
"""

import sys
import subprocess
import os
from pathlib import Path

def print_header(text):
    """Print a formatted section header"""
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60)

def check_python_version():
    """Check if Python version is 3.10 or higher"""
    print_header("Checking Python Version")
    version = sys.version_info
    print(f"Python {version.major}.{version.minor}.{version.micro}")
    
    if version.major >= 3 and version.minor >= 10:
        print("✓ Python version is compatible")
        return True
    else:
        print("✗ Python 3.10 or higher is required")
        return False

def check_ffmpeg():
    """Check if FFmpeg is installed and accessible"""
    print_header("Checking FFmpeg")
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            # Extract version from first line
            version_line = result.stdout.split('\n')[0]
            print(version_line)
            print("✓ FFmpeg is installed and accessible")
            return True
        else:
            print("✗ FFmpeg command failed")
            return False
    except FileNotFoundError:
        print("✗ FFmpeg not found in PATH")
        print("  Install from: https://www.gyan.dev/ffmpeg/builds/")
        return False
    except Exception as e:
        print(f"✗ Error checking FFmpeg: {e}")
        return False

def check_whisperx():
    """Check if WhisperX is installed"""
    print_header("Checking WhisperX")
    try:
        result = subprocess.run(
            ["whisperx", "--help"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            print("✓ WhisperX is installed")
            return True
        else:
            print("✗ WhisperX command failed")
            return False
    except FileNotFoundError:
        print("✗ WhisperX not found")
        print("  Install with: pip install whisperx")
        return False
    except Exception as e:
        print(f"✗ Error checking WhisperX: {e}")
        return False

def check_pytorch():
    """Check if PyTorch is installed and if CUDA is available"""
    print_header("Checking PyTorch & CUDA")
    try:
        import torch
        print(f"PyTorch version: {torch.__version__}")
        
        if torch.cuda.is_available():
            print(f"✓ CUDA is available")
            print(f"  CUDA version: {torch.version.cuda}")
            print(f"  GPU: {torch.cuda.get_device_name(0)}")
            print(f"  GPU memory: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
            return True
        else:
            print("⚠ CUDA not available - will use CPU (slower)")
            print("  For GPU support, install CUDA and PyTorch with CUDA")
            return True  # Still OK, just slower
    except ImportError:
        print("✗ PyTorch not installed")
        print("  Install with: pip install torch")
        return False
    except Exception as e:
        print(f"✗ Error checking PyTorch: {e}")
        return False

def check_huggingface():
    """Check if HuggingFace CLI is configured"""
    print_header("Checking HuggingFace Authentication")
    try:
        result = subprocess.run(
            ["huggingface-cli", "whoami"],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            username = result.stdout.strip()
            print(f"✓ Logged in as: {username}")
            return True
        else:
            print("✗ Not logged in to HuggingFace")
            print("  Login with: huggingface-cli login")
            print("  Required for speaker diarization")
            return False
    except FileNotFoundError:
        print("⚠ HuggingFace CLI not found (installed with transformers)")
        print("  This is required for speaker diarization")
        return False
    except Exception as e:
        print(f"⚠ Could not verify HuggingFace auth: {e}")
        return False

def check_folders():
    """Check if required folders exist"""
    print_header("Checking Folder Structure")
    folders = ["recordings", "archive", "logs"]
    all_exist = True
    
    for folder in folders:
        if os.path.exists(folder):
            print(f"✓ {folder}/ exists")
        else:
            print(f"✗ {folder}/ missing (will be created automatically)")
            all_exist = False
    
    return all_exist

def check_script():
    """Check if main script exists"""
    print_header("Checking Main Script")
    if os.path.exists("auto_transcribe.py"):
        print("✓ auto_transcribe.py exists")
        return True
    else:
        print("✗ auto_transcribe.py not found")
        return False

def main():
    """Run all checks"""
    print("\n" + "=" * 60)
    print("  TRANSCRIPTION SYSTEM VERIFICATION")
    print("=" * 60)
    
    results = {
        "Python Version": check_python_version(),
        "FFmpeg": check_ffmpeg(),
        "WhisperX": check_whisperx(),
        "PyTorch": check_pytorch(),
        "HuggingFace": check_huggingface(),
        "Folders": check_folders(),
        "Main Script": check_script(),
    }
    
    # Summary
    print_header("SUMMARY")
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for check, status in results.items():
        status_icon = "✓" if status else "✗"
        print(f"{status_icon} {check}")
    
    print(f"\nPassed: {passed}/{total}")
    
    if passed == total:
        print("\n🎉 All checks passed! System is ready.")
        print("\nNext steps:")
        print("1. Place MP3 files in recordings/ folder")
        print("2. Run: python auto_transcribe.py")
        print("3. Set up automation (see TRANSCRIPTION_README.md)")
    else:
        print("\n⚠ Some checks failed. Please fix the issues above.")
        print("See TRANSCRIPTION_README.md for detailed setup instructions.")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
