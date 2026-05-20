#!/usr/bin/env python3
"""
Karen Wake Word Listener - Phase 3 (Open Source)
Uses openWakeWord + faster-whisper + Piper TTS
"""
import os
import sys
import time
import signal
import tempfile
import subprocess
import struct

sys.path.insert(0, os.path.expanduser('~/.venvs/voice/lib/python3.12/site-packages'))

from openwakeword.model import Model
from faster_whisper import WhisperModel

# Configuration
WAKE_WORD = "hey_jarvis"  # openWakeWord pre-trained model
THRESHOLD = 0.5  # Detection threshold (0-1)
RECORD_DURATION = 5
SAMPLE_RATE = 16000
FRAME_LENGTH = 1280  # 80ms at 16kHz (openWakeWord default)

# Paths
MODEL_PATH = "/tmp/vits-piper-en_US-lessac-high/vits-piper-en_US-lessac-high/en_US-lessac-high.onnx"
LOG_FILE = os.path.expanduser("~/.openclaw/workspace/voice-log.txt")

# State
running = True

def signal_handler(sig, frame):
    global running
    print("\n👋 Shutting down wake word listener...")
    running = False

signal.signal(signal.SIGINT, signal_handler)

def process_command(text):
    """Process voice command and return response."""
    text_lower = text.lower().strip()
    
    # Greetings
    if any(word in text_lower for word in ['hello', 'hi', 'hey']):
        return "Hello! I'm Karen, your local voice assistant. How can I help?"
    
    # Time
    if 'time' in text_lower:
        current_time = time.strftime("%I:%M %p")
        return f"The current time is {current_time}."
    
    # Date
    if 'date' in text_lower or 'day' in text_lower:
        current_date = time.strftime("%A, %B %d, %Y")
        return f"Today is {current_date}."
    
    # Weather (placeholder - would need weather API)
    if 'weather' in text_lower:
        return "I don't have weather data yet, but I can help with other things."
    
    # Status
    if 'status' in text_lower or 'how are you' in text_lower:
        return "I'm running locally on your machine, listening for your commands. All systems operational."
    
    # Help
    if 'help' in text_lower or 'what can you do' in text_lower:
        return "I can tell you the time, date, respond to greetings, or just chat. I'm still learning more skills."
    
    # Name
    if 'your name' in text_lower:
        return "My name is Karen. I'm your local AI assistant, running entirely on your machine."
    
    # Thanks
    if 'thank' in text_lower:
        return "You're welcome! I'm here whenever you need me."
    
    # Goodbye
    if any(word in text_lower for word in ['goodbye', 'bye', 'see you']):
        return "Goodbye! I'll be here when you need me."
    
    # Default response - just echo back for now
    return f"You said: {text}"

def speak(text):
    """Speak text using Piper TTS."""
    if not text.strip():
        return
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    try:
        subprocess.run([
            'bash', '-c',
            f'export ESPEAK_DATA_PATH=/usr/lib/x86_64-linux-gnu/espeak-ng-data; echo "{text}" | ~/piper/build/piper --model {MODEL_PATH} --output_file {wav_path}'
        ], check=True, capture_output=True)
        subprocess.run(['aplay', wav_path], check=True, capture_output=True)
    finally:
        if os.path.exists(wav_path):
            os.unlink(wav_path)

def record_audio(duration=RECORD_DURATION):
    """Record audio using arecord."""
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        wav_path = f.name
    subprocess.run([
        'arecord', '-d', str(duration), '-f', 'S16_LE',
        '-r', str(SAMPLE_RATE), '-c', '1', wav_path
    ], check=True, capture_output=True)
    return wav_path

def transcribe(wav_path):
    """Transcribe audio file to text."""
    model = WhisperModel('tiny', device='cpu', compute_type='int8')
    segments, info = model.transcribe(wav_path, beam_size=5)
    text = ' '.join([seg.text for seg in segments]).strip()
    return text, info.language, info.language_probability

def get_audio_frame(parec_process, frame_length):
    """Read one frame of audio from parec."""
    bytes_to_read = frame_length * 2  # 16-bit = 2 bytes per sample
    data = parec_process.stdout.read(bytes_to_read)
    if len(data) < bytes_to_read:
        return None
    # Convert bytes to list of ints
    pcm = struct.unpack(f"<{frame_length}h", data)
    return list(pcm)

def main():
    print("=" * 50)
    print("🦞 Karen Wake Word Listener (Open Source)")
    print("=" * 50)
    print(f"Wake word: '{WAKE_WORD}'")
    print("Say 'Hey Jarvis' to activate, then speak your command.")
    print("Press Ctrl+C to stop")
    print()
    
    # Initialize openWakeWord
    print("Loading wake word model...")
    model_path = os.path.expanduser(f"~/.venvs/voice/lib/python3.12/site-packages/openwakeword/resources/models/{WAKE_WORD}_v0.1.onnx")
    oww = Model(wakeword_model_paths=[model_path])
    print(f"✅ Model loaded. Detecting: {WAKE_WORD}")
    
    # Start parec for continuous audio capture
    print("Starting audio capture...")
    parec_cmd = [
        'parec', '--rate', str(SAMPLE_RATE),
        '--channels', '1', '--format', 's16le'
    ]
    
    parec_process = subprocess.Popen(
        parec_cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Check if parec started successfully
    time.sleep(0.5)
    if parec_process.poll() is not None:
        stderr = parec_process.stderr.read().decode('utf-8', errors='replace')
        print(f"❌ parec failed to start: {stderr}")
        return
    
    print(f"parec started (pid: {parec_process.pid})")
    print("👂 Listening for 'Hey Jarvis'...")
    print("(Say 'Hey Jarvis' to activate, then speak your command)")
    print()
    
    frame_count = 0
    last_status = time.time()
    
    try:
        while running:
            try:
                # Read one frame
                pcm = get_audio_frame(parec_process, FRAME_LENGTH)
                if pcm is None:
                    frame_count += 1
                    if frame_count % 100 == 0:
                        print(f"  ...{frame_count} frames read")
                    continue
                
                frame_count += 1
                if frame_count % 500 == 0:
                    elapsed = time.time() - last_status
                    print(f"  ✓ Still listening... ({frame_count} frames, {elapsed:.0f}s)")
                    last_status = time.time()
                
                # Process with openWakeWord
                prediction = oww.predict(pcm)
                
                # Check if wake word detected
                score = prediction.get('hey_jarvis_v0.1', 0)
                if score > THRESHOLD:
                    print(f"\n🎙️ Wake word 'Hey Jarvis' detected! (confidence: {score:.2f})")
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
                        with open(LOG_FILE, 'a') as f:
                            f.write(f"[{timestamp}] {text}\n")
                        
                        # Process the command and respond
                        response = process_command(text)
                        speak(response)
                    else:
                        print("No speech detected")
                        speak("I didn't catch that")
                    
                    # Restart parec
                    parec_process = subprocess.Popen(
                        parec_cmd,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE
                    )
                    print("\n👂 Listening for 'Hey Jarvis'...")
            except Exception as e:
                print(f"  Error in loop: {e}")
                import traceback
                traceback.print_exc()
                
    except KeyboardInterrupt:
        pass
    finally:
        print("\nCleaning up...")
        parec_process.terminate()
        try:
            parec_process.wait(timeout=2)
        except:
            parec_process.kill()
        print("👋 Goodbye!")

if __name__ == '__main__':
    main()
    main()
    main()
