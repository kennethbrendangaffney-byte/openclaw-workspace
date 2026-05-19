#!/usr/bin/env python3
"""STT-TTS round-trip test: speak -> transcribe -> respond -> speak."""
import subprocess
import tempfile
import os
import sys

sys.path.insert(0, os.path.expanduser('~/.venvs/voice/lib/python3.12/site-packages'))

from faster_whisper import WhisperModel

# Load model
print("Loading tiny model...")
model = WhisperModel('tiny', device='cpu', compute_type='int8')

# TTS function using Piper
def speak(text, model_path="/tmp/vits-piper-en_US-lessac-high/vits-piper-en_US-lessac-high/en_US-lessac-high.onnx"):
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    try:
        subprocess.run([
            'bash', '-c',
            f'echo "{text}" | ~/piper/build/piper --model {model_path} --output_file {wav_path}'
        ], check=True, capture_output=True)
        subprocess.run(['aplay', wav_path], check=True, capture_output=True)
    finally:
        os.unlink(wav_path)

# Record function
def record(duration=5, wav_path='/tmp/recording.wav'):
    subprocess.run([
        'arecord', '-d', str(duration), '-f', 'S16_LE', '-r', '16000', '-c', '1',
        wav_path
    ], check=True, capture_output=True)
    return wav_path

# Transcribe function
def transcribe(wav_path):
    segments, info = model.transcribe(wav_path, beam_size=5)
    text = ' '.join([seg.text for seg in segments]).strip()
    return text, info.language

print("=" * 50)
print("STT-TTS Round-Trip Test")
print("=" * 50)
print("\n1. I'll speak a test phrase...")
speak("Hello, this is a test of the Jarvis voice system.")

print("\n2. Now recording 5 seconds - say something!")
input("Press Enter to start recording...")

wav = record(5)
text, lang = transcribe(wav)
print(f"\n3. Transcribed: '{text}' (lang: {lang})")

if text:
    response = f"You said: {text}"
    print(f"\n4. Responding: {response}")
    speak(response)
else:
    print("\n4. No speech detected - try speaking louder or closer to mic")

os.unlink(wav)
print("\nTest complete!")
