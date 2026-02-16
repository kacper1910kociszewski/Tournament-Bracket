#!/usr/bin/env python3
"""
Test script for auto_transcribe.py
Tests the workflow without requiring WhisperX installation
"""

import os
import sys
import glob
from datetime import datetime

def test_folder_structure():
    """Test that required folders exist."""
    print("Testing folder structure...")
    
    folders = ["recordings", "archive", "logs"]
    for folder in folders:
        if os.path.exists(folder):
            print(f"  ✓ {folder}/ exists")
        else:
            print(f"  ✗ {folder}/ missing")
            return False
    
    return True

def test_script_syntax():
    """Test that auto_transcribe.py has valid syntax."""
    print("\nTesting script syntax...")
    
    try:
        with open("auto_transcribe.py", "r") as f:
            compile(f.read(), "auto_transcribe.py", "exec")
        print("  ✓ auto_transcribe.py syntax is valid")
        return True
    except SyntaxError as e:
        print(f"  ✗ Syntax error: {e}")
        return False

def test_empty_recordings():
    """Test behavior with empty recordings folder."""
    print("\nTesting empty recordings folder...")
    
    # Clean up any test files
    for f in glob.glob("recordings/*.mp3"):
        if "test" in f.lower():
            os.remove(f)
    
    # Import and run the main function
    sys.path.insert(0, os.getcwd())
    from auto_transcribe import main
    
    try:
        main()
        print("  ✓ Script handles empty folder correctly")
        return True
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def test_logging():
    """Test that logging works."""
    print("\nTesting logging system...")
    
    log_file = "logs/transcription_log.txt"
    if os.path.exists(log_file):
        with open(log_file, "r") as f:
            content = f.read()
            if "No recordings found" in content or "Found" in content:
                print("  ✓ Logging system works")
                return True
    
    print("  ✗ Log file not found or empty")
    return False

def test_gitignore():
    """Test that .gitignore is properly configured."""
    print("\nTesting .gitignore configuration...")
    
    with open(".gitignore", "r") as f:
        content = f.read()
    
    checks = [
        ("venv/", "Python virtual environment"),
        ("__pycache__/", "Python cache"),
        ("recordings/*.mp3", "Recording files"),
        ("archive/*/", "Archive folders"),
        ("logs/*.txt", "Log files"),
    ]
    
    all_good = True
    for pattern, description in checks:
        if pattern in content:
            print(f"  ✓ {description} ignored")
        else:
            print(f"  ✗ {description} not ignored")
            all_good = False
    
    return all_good

def test_readme_exists():
    """Test that documentation exists."""
    print("\nTesting documentation...")
    
    if os.path.exists("TRANSCRIPTION_README.md"):
        with open("TRANSCRIPTION_README.md", "r") as f:
            content = f.read()
            if "WhisperX" in content and "Polish" in content:
                print("  ✓ Documentation is complete")
                return True
    
    print("  ✗ Documentation missing or incomplete")
    return False

def main():
    """Run all tests."""
    print("=" * 50)
    print("WhisperX Transcription System - Test Suite")
    print("=" * 50)
    
    tests = [
        test_folder_structure,
        test_script_syntax,
        test_empty_recordings,
        test_logging,
        test_gitignore,
        test_readme_exists,
    ]
    
    results = []
    for test in tests:
        try:
            results.append(test())
        except Exception as e:
            print(f"  ✗ Test failed with exception: {e}")
            results.append(False)
    
    print("\n" + "=" * 50)
    passed = sum(results)
    total = len(results)
    print(f"Results: {passed}/{total} tests passed")
    print("=" * 50)
    
    if passed == total:
        print("\n✓ All tests passed! System is ready.")
        return 0
    else:
        print("\n✗ Some tests failed. Please review.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
