#!/usr/bin/env python3
"""
Karen Voice Loop - Background Listener
Triggered by Super+K via GNOME keyboard shortcut
"""

import os
import sys
import tempfile
import wave
import subprocess
import numpy as np
import json
import time

# Audio
import sounddevice as sd

# STT
from faster_whisper import WhisperModel

# TTS
from piper import PiperVoice

# Config
VOICE_DIR = os.path.expanduser("~/.local/share/piper-voices")
MODEL_PATH = os.path.join(VOICE_DIR, "en_US-lessac-high.onnx")
TOKENS_PATH = os.path.join(VOICE_DIR, "en_US-lessac-high.onnx.json")
SAMPLE_RATE = 22050
RECORD_SECONDS = 5

class KarenVoiceLoop:
    def __init__(self):
        print("🦞 Karen Voice Loop initializing...", file=sys.stderr)
        
        # Load STT model
        print("Loading Whisper STT model...", file=sys.stderr)
        self.whisper = WhisperModel("tiny", device="cpu", compute_type="int8")
        
        # Load TTS model
        print("Loading Piper TTS voice...", file=sys.stderr)
        self.tts = PiperVoice.load(MODEL_PATH, config_path=TOKENS_PATH)
        
        print("✅ Voice loop ready!", file=sys.stderr)
    
    def record_audio(self, duration=RECORD_SECONDS):
        """Record audio from microphone"""
        print(f"🎤 Recording for {duration} seconds...", file=sys.stderr)
        
        # Record
        recording = sd.rec(
            int(duration * SAMPLE_RATE),
            samplerate=SAMPLE_RATE,
            channels=1,
            dtype=np.float32,
        )
        sd.wait()
        
        # Save to temp WAV
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            wav_path = f.name
        
        # Convert to int16 and save
        recording_int16 = (recording * 32767).astype(np.int16)
        with wave.open(wav_path, 'wb') as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(SAMPLE_RATE)
            wav_file.writeframes(recording_int16.tobytes())
        
        return wav_path
    
    def transcribe(self, audio_path):
        """STT: Convert speech to text"""
        print("📝 Transcribing...", file=sys.stderr)
        segments, info = self.whisper.transcribe(audio_path, beam_size=5)
        
        text = " ".join([segment.text for segment in segments])
        print(f"🎯 Heard: '{text}'", file=sys.stderr)
        return text
    
    def speak(self, text):
        """TTS: Convert text to speech and play"""
        print(f"🔊 Speaking: '{text}'", file=sys.stderr)
        
        # Generate audio using Piper
        audio_chunks = list(self.tts.synthesize(text))
        audio_bytes = b''.join([chunk.audio_int16_bytes for chunk in audio_chunks])
        
        # Save to temp file
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            output_path = f.name
        
        # Write WAV
        with wave.open(output_path, 'wb') as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(self.tts.config.sample_rate)
            wav_file.writeframes(audio_bytes)
        
        # Play audio
        subprocess.run(["aplay", output_path], capture_output=True)
        
        # Cleanup
        os.unlink(output_path)
    
    def run_once(self):
        """Run one complete voice loop"""
        try:
            # Step 1: Record
            audio_path = self.record_audio()
            
            # Step 2: Transcribe
            text = self.transcribe(audio_path)
            
            # Step 3: Cleanup audio file
            os.unlink(audio_path)
            
            if not text.strip():
                self.speak("I didn't catch that. Could you say it again?")
                return None
            
            # Return the transcribed text for processing
            return text
            
        except Exception as e:
            print(f"❌ Error: {e}", file=sys.stderr)
            self.speak("Sorry, something went wrong.")
            return None


def main():
    """Main entry point - run one voice loop"""
    voice = KarenVoiceLoop()
    
    # Play ready sound
    voice.speak("Listening")
    
    # Run the loop
    result = voice.run_once()
    
    if result:
        # For now, just echo back
        # In the future, this will send to OpenClaw and get a response
        voice.speak(f"You said: {result}")
        print(f"TRANSCRIBED: {result}")
    
    return 0 if result else 1


if __name__ == "__main__":
    sys.exit(main())
