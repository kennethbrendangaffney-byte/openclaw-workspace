#!/usr/bin/env python3
"""
Jarvis Wake Word Listener - Phase 3 (No pyaudio version)
Uses parec/arecord for audio capture, feeds frames to Porcupine.
"""
import pvporcupine
import struct
import subprocess
import tempfile
import os
import sys
import time
import signal
import wave

sys.path.insert(0, os.path.expanduser('~/.venvs/voice/lib/python3.12/site-packages'))

from faster_whisper import WhisperModel

# Configuration
WAKE_WORD = "jarvis"
SENSITIVITY = 0.7
ACCESS_KEY = os.environ.get('PICOVOICE_ACCESS_KEY', '')

MODEL_PATH = "/tmp/vits-piper-en_US-lessac-high/vits-piper-en_US-lessac-high/en_US-lessac-high.onnx"
RECORD_DURATION = 5
SAMPLE_RATE = 16000
FRAME_LENGTH = 512  # Porcupine frame length

# State
running = True

def signal_handler(sig, frame):
    global running
    print("\nShutting down wake word listener...")
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

def get_audio_frame(parec_process, frame_length):
    """Read one frame of audio from parec."""
    # Each frame is frame_length samples of 16-bit = frame_length * 2 bytes
    bytes_to_read = frame_length * 2
    data = parec_process.stdout.read(bytes_to_read)
    if len(data) < bytes_to_read:
        return None
    # Unpack to list of shorts
    pcm = struct.unpack(f"{frame_length}h", data)
    return pcm

def record_audio(duration=RECORD_DURATION, sample_rate=SAMPLE_RATE):
    """Record audio using arecord."""
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    subprocess.run([
        'arecord', '-d', str(duration), '-f', 'S16_LE',
        '-r', str(sample_rate), '-c', '1', wav_path
    ], check=True, capture_output=True)
    return wav_path

def transcribe(wav_path):
    """Transcribe audio file to text."""
    model = WhisperModel('tiny', device='cpu', compute_type='int8')
    segments, info = model.transcribe(wav_path, beam_size=5)
    text = ' '.join([seg.text for seg in segments]).strip()
    return text, info.language, info.language_probability

def main():
    print("=" * 50)
    print("Jarvis Wake Word Listener")
    print("=" * 50)
    print(f"Wake word: '{WAKE_WORD}'")
    print("Say 'Jarvis' to activate, then speak your command.")
    print("Press Ctrl+C to stop")
    print()
    
    # Initialize Porcupine
    try:
        if ACCESS_KEY:
            porcupine = pvporcupine.create(access_key=ACCESS_KEY, keywords=[WAKE_WORD],
                                           sensitivities=[SENSITIVITY])
        else:
            porcupine = pvporcupine.create(keywords=[WAKE_WORD], sensitivities=[SENSITIVITY])
    except Exception as e:
        print(f"Error initializing Porcupine: {e}")
        return
    
    print(f"Porcupine initialized. Sample rate: {porcupine.sample_rate}")
    print(f"Frame length: {porcupine.frame_length}")
    
    # Start parec for continuous audio capture
    # parec outputs raw 16-bit mono PCM at the sample rate
    print("Starting audio capture...")
    parec_cmd = [
        'parec', '--rate', str(porcupine.sample_rate),
        '--channels', '1', '--format', 's16le'
    ]
    
    parec_process = subprocess.Popen(
        parec_cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL
    )
    
    print("Listening...")
    
    try:
        while running:
            # Read one frame
            pcm = get_audio_frame(parec_process, porcupine.frame_length)
            if pcm is None:
                continue
            
            # Process with Porcupine
            keyword_index = porcupine.process(pcm)
            
            if keyword_index >= 0:
                print(f"\n🎙️ Wake word 'Jarvis' detected!")
                speak("Yes?")
                
                # Stop parec temporarily
                parec_process.terminate()
                parec_process.wait()
                
                # Record command
                print("Listening for command...")
                wav = record_audio()
                
                # Transcribe
                print("Transcribing...")
                text, lang, prob = transcribe(wav)
                os.unlink(wav)
                
                if text:
                    print(f"Command: '{text}'")
                    
                    # Log for Karen
                    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                    log_file = os.path.expanduser("~/.openclaw/workspace/voice-log.txt")
                    with open(log_file, 'a') as f:
                        f.write(f"[{timestamp}] {text}\n")
                    
                    # Respond
                    response = f"You said: {text}"
                    speak(response)
                else:
                    print("No speech detected")
                    speak("I didn't catch that")
                
                # Restart parec
                parec_process = subprocess.Popen(
                    parec_cmd,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.DEVNULL
                )
                print("\nListening...")
                
    except KeyboardInterrupt:
        pass
    finally:
        print("\nCleaning up...")
        parec_process.terminate()
        try:
            parec_process.wait(timeout=2)
        except:
            parec_process.kill()
        porcupine.delete()
        print("Goodbye!")

if __name__ == '__main__':
    main()
