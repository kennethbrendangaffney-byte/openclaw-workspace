#!/usr/bin/env python3
"""Quick STT test - record 5 seconds and transcribe."""
import subprocess
import tempfile
import os
import sys

# Add venv to path
sys.path.insert(0, os.path.expanduser('~/.venvs/voice/lib/python3.12/site-packages'))

from faster_whisper import WhisperModel

# Load model
print("Loading tiny model...")
model = WhisperModel('tiny', device='cpu', compute_type='int8')
print("Ready! Recording 5 seconds...")

# Record 5 seconds of 16kHz mono WAV
with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
    wav_path = f.name

try:
    subprocess.run([
        'arecord', '-d', '5', '-f', 'S16_LE', '-r', '16000', '-c', '1',
        wav_path
    ], check=True, capture_output=True)
    print("Recording done. Transcribing...")
    
    segments, info = model.transcribe(wav_path, beam_size=5)
    print(f"Detected language: {info.language} (prob: {info.language_probability:.2f})")
    
    text = ' '.join([seg.text for seg in segments]).strip()
    if text:
        print(f"Transcription: {text}")
    else:
        print("No speech detected")
        
finally:
    os.unlink(wav_path)
