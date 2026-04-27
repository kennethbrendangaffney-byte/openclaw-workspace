# OpenClaw Research Summary — 2026-04-27

**Research Date:** Monday, April 27, 2026
**Sources:** GitHub releases, docs.openclaw.ai, community blogs, news articles

---

## Latest Version

**Current Release:** v2026.4.25 (published April 25, 2026)
- Pre-release status as of April 26
- Rapid release cadence continuing through 2026

---

## Major 2026 Releases Timeline

| Version | Date | Key Themes |
|---------|------|------------|
| v2026.4.25 | Apr 25, 2026 | TTS overhaul, plugin registry, OpenTelemetry, browser automation |
| v2026.4.24 | Apr 24, 2026 | Full-agent voice calls, DeepSeek V4, browser automation upgrades |
| v2026.4.21 | Apr 21, 2026 | Ops-focused: command safety, install recovery, image fallback |
| v2026.3.12 | Mar 12, 2026 | UI overhaul, security advisories, Kimi fixes |
| v2026.2.6 | Feb 7, 2026 | Safety scanner, Opus 4.6, GPT-5.3-Codex |
| v2026.2.1 | Feb 2, 2026 | Foundation-governed model transition |

---

## 🎯 Key New Features (2026)

### 1. Full-Agent Voice Calls (v2026.4.24)
- Voice calls now reach the **full AI agent**, not just text-to-speech
- Real-time verbal communication beyond text interfaces
- End-to-end conversational task execution
- Reduces handoff friction for contact centers and SaaS workflows

### 2. TTS (Text-to-Speech) Overhaul (v2026.4.25)
- `/tts latest` read-aloud support with duplicate suppression
- Chat-scoped auto-TTS controls (`/tts chat on|off|default`)
- Per-agent and per-account voice overrides
- New providers:
  - **Azure Speech** (bundled, with SSML, Ogg/Opus output)
  - **Xiaomi**
  - **Local CLI**
  - **Inworld**
  - **Volcengine**
  - **ElevenLabs v3**

### 3. Safety & Security Scanner (v2026.2.6)
- Automatic scanning of installed skills for:
  - Credential theft patterns
  - Unauthorized network calls
  - Obfuscated code
- Response to security concerns with 135,000+ exposed instances

### 4. Plugin Registry Improvements (v2026.4.25)
- Plugin startup and install paths moved to **cold persisted registry**
- Eliminates broad manifest scans
- More deterministic plugin updates, repair, and provider discovery

### 5. OpenTelemetry Integration (v2026.4.25)
- Coverage expanded across:
  - Model calls and token usage
  - Tool loops and harness runs
  - Exec processes and outbound delivery
  - Context assembly and memory pressure
- Bounded low-cardinality attributes for performance

### 6. Browser Automation Upgrades (v2026.4.24-25)
- **Coordinate-based clicks** for precise interactions
- **Safer tab URLs** in agent responses
- **Iframe-aware role snapshots**
- CDP readiness tuning
- Headless one-shot launch
- `openclaw browser doctor --deep` probing for slow hosts
- Improved error recovery for unattended RPA runs

### 7. Control UI & Setup (v2026.4.25)
- **PWA/Web Push** support for Gateway chat
- **TUI setup** interface
- Context mode selection
- Shorter startup greeting
- Crestodian first-run repair

### 8. Model Support Updates
- **DeepSeek V4 Flash & Pro** (v2026.4.24) — cost-performance tuning
- **Opus 4.6** (v2026.2.6)
- **GPT-5.3 Codex** (v2026.2.6)
- Kimi-specific fixes (v2026.3.12)

---

## 📦 New Skills & Plugins

### ComfyUI Provider (from GitHub releases)
- Bundled ComfyUI workflow media plugin
- Local ComfyUI and Comfy Cloud support
- Shared `image_generate`, `video_generate`, `music_generate`
- Prompt injection, reference-image upload, live tests

### Google Meet
- Calendar-backed attendance export workflows
- Export manifests and dry-run previews

### Image Generation CLI
- Generic `--background` flag for `openclaw infer image generate/edit`
- `--openai-background` as OpenAI alias

---

## 🔧 Platform & Install Improvements

### Install/Update Hardening
- Windows, macOS, Linux, Docker improvements
- Bundled plugin runtime deps
- Node service restarts
- LaunchAgent token rotation
- Mixed-version gateway verification

### Owner-Only Command Safety (v2026.4.21)
- Tightened command safety for self-hosted operators
- Packaged-install recovery improvements
- Image-provider fallback observability

---

## 📊 Community & Ecosystem

- **250,000+ GitHub stars** reached by early March 2026
- **135,000+ exposed instances** (prompted security focus)
- Foundation-governed model sponsored by OpenAI (v2026.2.1)
- Active community documentation at clawdocs.org, openclawskillshub.org

---

## 🔄 Migration Notes

- Skill manifests should update to **version 3.0**
- Legacy tool calls → `prism.invoke()`
- New backup command for state persistence
- Legacy shim available until **June 2026**
- Typical migration: 2-3 hours per agent

---

## 📚 Documentation

- **Official docs:** https://docs.openclaw.ai/
- **LLM index:** https://docs.openclaw.ai/llms.txt
- **GitHub:** https://github.com/openclaw/openclaw
- **Community docs:** clawdocs.org, openclawskillshub.org
- **Release notes:** https://github.com/openclaw/openclaw/releases

---

## 💡 Implications for Local Setup

1. **Voice capabilities** now viable for full agent interaction
2. **Security scanner** should be run on all installed skills
3. **Browser automation** significantly more reliable for RPA tasks
4. **TTS options** expanded — Azure Speech and Local CLI particularly relevant for local deployments
5. **OpenTelemetry** useful for monitoring local agent performance
6. **Plugin registry** changes may affect custom skill installations

---

*Research compiled by Karen (local agent) on 2026-04-27*
