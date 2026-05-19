## Voice & Desktop Control Research (May 19, 2026)

### Current State
- **Desktop environment:** GNOME (ubuntu:GNOME)
- **Whisper:** Not installed locally yet. Available via `openai-whisper` skill.
- **TTS:** `sherpa-onnx-tts` skill available — local Piper TTS, no cloud. Not installed yet.
- **Desktop control:** `computer-use` skill gives me full X11 automation (click, type, scroll, screenshot, drag) via virtual display :99. Already have xdotool on the system.
- **D-Bus:** Available — can send notifications, interact with apps.
- **No wake word / VAD / continuous listening currently set up.**

### Voice Options (from KC's research + local assessment)

| Option | Setup | Local? | Quality | Best For |
|--------|-------|--------|---------|----------|
| Telegram voice msgs | Zero | STT: yes (Whisper), TTS: cloud | Good | Works today |
| Discord voice bot | Medium | Needs GPU for local STT/TTS | Excellent | Natural conversation |
| Clawd-Voice (wake word) | Medium | Wake word: yes, TTS: ElevenLabs cloud | Excellent | "Hey Karen" experience |
| Custom stack (Porcupine + faster-whisper + Piper) | High | Fully local | Functional | Long-term privacy |

### Desktop Control What I Can Already Do
- **Shell:** Full bash access, file ops, git, package management
- **X11 automation:** Screenshot, click, type, scroll, drag (via computer-use skill / xdotool)
- **Browser:** Chrome automation (non-snap, with --ozone-platform=x11)
- **Notifications:** D-Bus notify-send
- **Cron:** Scheduled tasks, reminders
- **Dashboard:** v2 running on port 3456 with health tracking, system stats

### GNOME-Specific Automation
- `gsettings` — control GNOME settings (dark mode, wallpaper, focus mode)
- `gdbus` / `dbus-send` — interact with GNOME Shell, notifications, media keys
- `gnome-screenshot` — capture screen for OCR/awareness
- `ydotool` — Wayland-compatible automation (replacement for xdotool on native display)
- **Wayland confirmed:** Native GNOME is Wayland — xdotool only works on Xvfb virtual display :99, not native display

### What Would Make It "Flowy"
1. **Context-aware workspace switching** — "Karen, I'm studying" → opens Obsidian, closes distractions, sets focus mode
2. **Voice-triggered macros** — "Karen, start my morning routine" → opens apps, checks weather, reads calendar
3. **Ambient awareness** — Karen notices things (disk full, long-running process done, appointment soon) and notifies
4. **Clipboard integration** — "Karen, summarize what I just copied" → reads clipboard, processes, speaks back
5. **App launcher + window manager** — "Karen, open terminal on workspace 2" → wmctrl/xdotool magic

### Ken's "Flowy" Requirements
1. **Interruptibility** — Ken talks over Karen, Karen stops and listens (like Talk Mode's `interruptOnSpeech`)
2. **Context awareness** — Karen knows what's on screen, what Ken was doing, what he asked 10 minutes ago
3. **Proactive assistance** — "You're about to miss that meeting" or "That download finished"
4. **Multi-modal** — Voice when hands are busy, text when precision matters, desktop automation when repetitive

### Suggested Roadmap
| Phase | Goal | Effort |
|-------|------|--------|
| 1 | Set up local TTS (Piper or ElevenLabs) so Karen can speak responses | Low |
| 2 | Test voice input via Telegram/Discord voice messages | Low (works now) |
| 3 | Install playerctl, brightnessctl, xclip — expand desktop automation skill | Low |
| 4 | Prototype wake-word voice loop (Clawd-Voice or custom) | Medium |
| 5 | Screen awareness — screenshot + OCR skill for "what's on my screen?" | Medium |
| 6 | Full proactive layer — file watchers, notifications, system tray | Higher |

### Karen's Answers to KC's Questions
- **Desktop environment:** GNOME 46.0 (ubuntu:GNOME)
- **Display server:** Wayland (native), but computer-use skill runs on Xvfb (virtual X11 display :99)
- **Microphone:** ✅ Available (analog input detected)
- **Speakers:** ✅ Available (HDMI + analog outputs detected)
- **Skill packaging:** Yes, this could be packaged as a reusable skill once core components are working

### System Check Results
- **GNOME version:** 46.0
- **Display server:** Wayland (XDG_SESSION_TYPE=wayland) — **xdotool will NOT work for native display**, but computer-use skill uses Xvfb virtual display :99 which IS X11
- **Audio devices:** 
  - HDMI output (monitor)
  - Analog output (speakers/headphones)
  - Analog input (microphone) — **microphone available!**
- **Key insight:** Native GNOME is Wayland, but our automation runs on Xvfb (virtual X11 display :99). For native desktop control, we'd need `ydotool` or D-Bus-based approaches.

### Updated Desktop Control Assessment
- **Virtual display (Xvfb :99):** xdotool works here — used for browser automation, screenshots
- **Native GNOME (Wayland):** Need `ydotool` for keyboard/mouse, `gdbus` for app launching, `gsettings` for GNOME settings
- **Hybrid approach:** Use D-Bus + gsettings for native control, xdotool for virtual display browser automation

### Tools to Install for Full Desktop Control
| Tool | Purpose | Display |
|------|---------|---------|
| `ydotool` | Keyboard/mouse automation | Wayland (native) |
| `playerctl` | Media control (play/pause/next) | Both |
| `brightnessctl` | Screen brightness | Both |
| `xclip` / `wl-clipboard` | Clipboard read/write | Both |
| `wmctrl` | Window management (X11 only) | Xvfb |
| `rofi` / `dmenu` | App launcher | X11 |
| `gnome-screenshot` | Screen capture | Wayland |
| `tesseract-ocr` | OCR for screen awareness | Both |

### Credit Implications (for Maxi's review)
- **ElevenLabs TTS:** ~$5/month for basic tier, pay-as-you-go for Clawd-Voice
- **OpenAI Whisper API:** ~$0.006/minute of audio (very cheap)
- **Local alternatives:** Piper TTS (free), faster-whisper (free, runs on CPU/GPU)
- **Discord voice bot:** Would use local GPU for STT/TTS — no API costs but requires GPU
- **Recommendation:** Start with local Piper TTS + faster-whisper to avoid credits, upgrade to ElevenLabs for quality later

### Next Steps — Ready to Execute
1. **Install desktop automation tools:** `ydotool`, `playerctl`, `brightnessctl`, `wl-clipboard`, `tesseract-ocr`
2. **Set up local TTS:** Install `sherpa-onnx-tts` skill, test Piper voice
3. **Test voice input:** Try Telegram voice message to Karen
4. **Define macros:** Ken to specify which routines he wants (morning, study, work, shutdown)
5. **Prototype wake-word:** Evaluate Clawd-Voice vs custom stack

### Research Convergence (KC + Karen)
Both independently identified the same stack:
- **Local STT:** faster-whisper / whisper.cpp (CPU-friendly, tiny/base model)
- **Local TTS:** sherpa-onnx (Piper) — already have skill, needs install
- **Desktop control:** xdotool + wmctrl + playerctl + xclip (same toolkit)
- **Phase 1 trigger:** Keyboard hotkey (Super+K) — wake word deferred to later
- **Voice loop architecture:** Clawd-Voice / custom Python bridge + systemd service

### Key Finding: computer-use Skill Power
The `computer-use` skill gives Karen screenshot + click + type + scroll capabilities. This means she doesn't just control windows — she can **see and interact with any UI element**. More powerful than wmctrl alone.

**Ready when you are, Ken!** 🦞
