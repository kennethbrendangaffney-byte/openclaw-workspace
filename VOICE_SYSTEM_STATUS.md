# Jarvis Voice System Status - May 19, 2026

## Phase 1: TTS (Text-to-Speech) ✅ COMPLETE
- **Piper TTS** built from source at `~/piper/build/piper`
- **High-quality model** loaded: `en_US-lessac-high` (much better than medium)
- **Audio output** working via `aplay`
- **GNOME hotkey** Super+K bound to voice-hotkey.py
- **Test result**: Ken confirmed audio is clear, speed good at 1.0x

## Phase 2: STT (Speech-to-Text) ✅ INSTALLED, NEEDS TESTING
- **faster-whisper** installed in `~/.venvs/voice/`
- **Tiny model** loaded (0.5s load time, ~39MB)
- **Recording** via `arecord` (16kHz, mono, 16-bit)
- **Pipeline**: Record → Transcribe → Log → Speak confirmation
- **Hotkey updated**: Super+K now triggers full STT+TTS loop

### Files
- `voice-loop-v2.py` - Interactive STT+TTS loop (manual mode)
- `voice-hotkey.py` - One-shot STT+TTS (Super+K trigger)
- `voice-log.txt` - Log of voice inputs for Karen to process

### How to Test
1. Press **Super+K**
2. Speak clearly for 5 seconds
3. Jarvis will speak back what it heard
4. Check `~/.openclaw/workspace/voice-log.txt` for transcription

### Known Limitations
- **Tiny model** is fast but less accurate than base/small
- **No VAD** (Voice Activity Detection) - records fixed 5 seconds
- **No wake word** yet - requires manual trigger (Super+K)
- **Synthetic audio test failed** - tiny model struggles with TTS-generated audio

### Next Steps
1. Ken tests with real voice
2. If accuracy is poor, upgrade to `base` or `small` model
3. Add VAD for automatic stop-on-silence
4. Integrate with Karen's reasoning (send transcription to OpenClaw)
5. Add wake word detection (Porcupine)

## System Commands
```bash
# Test TTS only
echo "Hello" | ~/piper/build/piper --model /tmp/vits-piper-en_US-lessac-high/vits-piper-en_US-lessac-high/en_US-lessac-high.onnx --output_file /tmp/test.wav && aplay /tmp/test.wav

# Test STT only
source ~/.venvs/voice/bin/activate && python3 ~/.openclaw/workspace/stt-test.py

# Interactive voice loop
source ~/.venvs/voice/bin/activate && python3 ~/.openclaw/workspace/voice-loop-v2.py

# Check voice log
cat ~/.openclaw/workspace/voice-log.txt
```
