#!/usr/bin/env python3
"""
Jarvis Voice Loop v2 - STT + TTS integration
Records audio, transcribes with faster-whisper, speaks response with Piper.
"""
import subprocess
import tempfile
import os
import sys
import time
import signal

sys.path.insert(0, os.path.expanduser('~/.venvs/voice/lib/python3.12/site-packages'))

from faster_whisper import WhisperModel

# Configuration
MODEL_PATH = "/tmp/vits-piper-en_US-lessac-high/vits-piper-en_US-lessac-high/en_US-lessac-high.onnx"
RECORD_DURATION = 5  # seconds
SAMPLE_RATE = 16000

# Load STT model
print("Loading faster-whisper tiny model...")
stt_model = WhisperModel('tiny', device='cpu', compute_type='int8')
print("Model ready.")

# State
running = True

def signal_handler(sig, frame):
    global running
    print("\nShutting down...")
    running = False

signal.signal(signal.SIGINT, signal_handler)

def speak(text):
    """Speak text using Piper TTS."""
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

def record_audio(duration=RECORD_DURATION):
    """Record audio to temporary WAV file."""
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    subprocess.run([
        'arecord', '-d', str(duration), '-f', 'S16_LE', 
        '-r', str(SAMPLE_RATE), '-c', '1', wav_path
    ], check=True, capture_output=True)
    return wav_path

def transcribe(wav_path):
    """Transcribe audio file to text."""
    segments, info = stt_model.transcribe(wav_path, beam_size=5)
    text = ' '.join([seg.text for seg in segments]).strip()
    return text, info.language, info.language_probability

def main():
    print("=" * 50)
    print("Jarvis Voice Assistant v2")
    print("STT + TTS Loop")
    print("=" * 50)
    print(f"\nCommands:")
    print(f"  r - Record and transcribe")
    print(f"  s [text] - Speak text")
    print(f"  q - Quit")
    print(f"  h - Help")
    print()
    
    while running:
        try:
            cmd = input("jarvis> ").strip()
            if not cmd:
                continue
                
            if cmd == 'q':
                break
            elif cmd == 'h':
                print("Commands: r=record, s=speak, q=quit, h=help")
            elif cmd == 'r':
                print("Recording... (speak now)")
                wav = record_audio()
                text, lang, prob = transcribe(wav)
                os.unlink(wav)
                
                if text:
                    print(f"Transcribed: '{text}' (lang={lang}, prob={prob:.2f})")
                    # Echo back for confirmation
                    speak(f"You said: {text}")
                else:
                    print("No speech detected")
                    speak("I didn't hear anything")
                    
            elif cmd.startswith('s '):
                text = cmd[2:]
                speak(text)
                print(f"Spoke: {text}")
            else:
                print("Unknown command. Type 'h' for help.")
                
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Error: {e}")
    
    print("Goodbye!")

if __name__ == '__main__':
    main()
