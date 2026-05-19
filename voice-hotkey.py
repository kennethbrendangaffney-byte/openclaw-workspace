#!/usr/bin/env python3
"""
Jarvis Voice Hotkey - One-shot STT + TTS
Triggered by Super+K. Records 5s, transcribes, speaks confirmation.
"""
import subprocess
import tempfile
import os
import sys
import time

sys.path.insert(0, os.path.expanduser('~/.venvs/voice/lib/python3.12/site-packages'))

from faster_whisper import WhisperModel

MODEL_PATH = "/tmp/vits-piper-en_US-lessac-high/vits-piper-en_US-lessac-high/en_US-lessac-high.onnx"
RECORD_DURATION = 5
SAMPLE_RATE = 16000
LOG_FILE = os.path.expanduser("~/.openclaw/workspace/voice-log.txt")

def speak(text):
    if not text.strip():
        return
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    try:
        subprocess.run([
            'bash', '-c',
            f'echo "{text}" | ~/piper/build/piper --model {MODEL_PATH} --output_file {wav_path}'
        ], check=True, capture_output=True)
        subprocess.run(['aplay', wav_path], check=True, capture_output=True)
    finally:
        if os.path.exists(wav_path):
            os.unlink(wav_path)

def record_audio():
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    subprocess.run([
        'arecord', '-d', str(RECORD_DURATION), '-f', 'S16_LE',
        '-r', str(SAMPLE_RATE), '-c', '1', wav_path
    ], check=True, capture_output=True)
    return wav_path

def main():
    # Load model (quick - tiny loads in ~0.5s)
    stt_model = WhisperModel('tiny', device='cpu', compute_type='int8')
    
    # Record
    speak("Listening")
    wav = record_audio()
    
    # Transcribe
    segments, info = stt_model.transcribe(wav, beam_size=5)
    text = ' '.join([seg.text for seg in segments]).strip()
    os.unlink(wav)
    
    if text:
        # Log for Karen to process
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        with open(LOG_FILE, 'a') as f:
            f.write(f"[{timestamp}] {text}\n")
        
        # Confirm
        speak(f"You said: {text}")
        print(f"Voice input: {text}")
    else:
        speak("I didn't catch that")
        print("No speech detected")

if __name__ == '__main__':
    main()
