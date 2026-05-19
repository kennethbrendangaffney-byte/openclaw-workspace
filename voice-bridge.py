#!/usr/bin/env python3
"""
Karen Voice Bridge - Phase 1
Keyboard-triggered voice loop: Super+K → record → transcribe → respond → speak
"""

import os
import sys
import json
import tempfile
import wave
import subprocess
import numpy as np

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
AUDIO_DEVICE = None  # Default

class KarenVoice:
    def __init__(self):
        print("🦞 Karen Voice Bridge initializing...")
        
        # Load STT model
        print("Loading Whisper STT model...")
        self.whisper = WhisperModel("tiny", device="cpu", compute_type="int8")
        
        # Load TTS model
        print("Loading Piper TTS model...")
        self.tts = self._load_tts()
        
        print("✅ Voice bridge ready!")
    
    def _load_tts(self):
        """Load Piper TTS voice"""
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"TTS model not found: {MODEL_PATH}")
        
        print("Loading Piper TTS voice...")
        return PiperVoice.load(MODEL_PATH, config_path=TOKENS_PATH)
    
    def record_audio(self, duration=RECORD_SECONDS):
        """Record audio from microphone"""
        print(f"🎤 Recording for {duration} seconds...")
        
        # Record
        recording = sd.rec(
            int(duration * SAMPLE_RATE),
            samplerate=SAMPLE_RATE,
            channels=1,
            dtype=np.float32,
            device=AUDIO_DEVICE,
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
        
        print(f"✅ Audio saved: {wav_path}")
        return wav_path
    
    def transcribe(self, audio_path):
        """STT: Convert speech to text"""
        print("📝 Transcribing...")
        segments, info = self.whisper.transcribe(audio_path, beam_size=5)
        
        text = " ".join([segment.text for segment in segments])
        print(f"🎯 Heard: '{text}'")
        return text
    
    def speak(self, text):
        """TTS: Convert text to speech and play"""
        print(f"🔊 Speaking: '{text}'")
        
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
        print(f"🔈 Playing audio...")
        subprocess.run(["aplay", output_path], capture_output=True)
        
        # Cleanup
        os.unlink(output_path)
        print("✅ Done speaking")
    
    def process_voice_command(self):
        """Full loop: record → transcribe → respond → speak"""
        try:
            # Step 1: Record
            audio_path = self.record_audio()
            
            # Step 2: Transcribe
            text = self.transcribe(audio_path)
            
            # Step 3: Cleanup audio file
            os.unlink(audio_path)
            
            if not text.strip():
                self.speak("I didn't catch that. Could you say it again?")
                return
            
            # Step 4: For now, echo back (replace with OpenClaw integration later)
            response = f"You said: {text}"
            self.speak(response)
            
        except Exception as e:
            print(f"❌ Error: {e}")
            self.speak("Sorry, something went wrong.")


def main():
    """Main entry point"""
    voice = KarenVoice()
    
    print("\n🦞 Karen Voice Bridge")
    print("Press Super+K to trigger (or run with 'test' argument)")
    print("Commands:")
    print("  test  - Run one voice loop immediately")
    print("  speak <text> - Just TTS, no recording")
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "test":
            voice.process_voice_command()
        elif sys.argv[1] == "speak" and len(sys.argv) > 2:
            text = " ".join(sys.argv[2:])
            voice.speak(text)
        else:
            print(f"Unknown command: {sys.argv[1]}")
    else:
        print("\nWaiting for trigger... (Ctrl+C to exit)")
        try:
            while True:
                import time
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")


if __name__ == "__main__":
    main()
