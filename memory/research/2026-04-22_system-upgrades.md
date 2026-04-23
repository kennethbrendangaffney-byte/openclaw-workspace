# System Upgrade Research — April 22, 2026

*Compiled for Karen's local Linux setup (24GB RAM, x64, no GPU)*

---

## 1. OpenClaw Framework — Current State & What's New

**Current version:** 2026.4.21 ✅ (up to date)

**Latest major features available:**
- **ACP Protocol** — Agent Communication Protocol for inter-agent communication (Ken's dual-agent KC+Karen setup is well-positioned for this)
- **Thread-bound persistent sessions** — Long-running agent tasks without losing context
- **ClawHub skills marketplace** — One-click install for new skills
- **Enhanced memory system** — Semantic search improvements (we're already using this)
- **Cron scheduling** — Autonomous agent tasks (our 10-job pipeline is solid again)

**What we should explore:**
- Claude Code ACP harness support — Could integrate claude-code for complex coding tasks
- Session status tracking — New `session_status` tool for model usage tracking
- Canvas system — Rich UI rendering capabilities

---

## 2. Local LLM Landscape — April 2026

### Top Models for Local Deployment

**Qwen 3.5** — Most broadly recommended family right now
- Sizes: 0.8B to 397B MoE
- 262K context window across ALL sizes (even 0.8B)
- Hybrid thinking mode (toggle between fast/direct and chain-of-thought)
- Apache 2.0 license
- **Best for:** Coding (Qwen3-Coder-Next is the consensus pick), agentic work, long-context tasks

**Gemma 4** — Strong for local usability
- Released April 2, 2026
- Apache 2.0 (first time for Gemma — removes licensing restrictions)
- Sizes: E2B (~2.3B), E4B (~4.5B), 26B MoE, 31B Dense
- Trimodal support (text/image/audio on smaller models)
- 128K-256K context window
- **Best for:** Consistent output formatting, JSON/structured data, edge devices

**GLM-5 / GLM-4.7** — Rising contender
- Near top of open-model rankings
- Increasingly recommended for "best overall"

**MiniMax M2.5 / M2.7** — Agentic specialist
- Repeatedly cited for tool-heavy/agentic workloads

**DeepSeek V3.2** — Still top-tier
- Strongest open-weight general model discussions

### For Our Setup (24GB RAM, CPU-only)

| Model | Size (Q4) | Fits? | Speed | Best Use |
|-------|-----------|-------|-------|----------|
| Gemma 4 E4B | 4-6 GB | ✅ Yes | Fast | General tasks, consistent formatting |
| Qwen 3.5 4B | 4-5 GB | ✅ Yes | Fast | Coding, reasoning |
| Qwen 3.5 9B | 6-8 GB | ✅ Yes | Medium | Stronger coding, solid reasoning |
| Gemma 4 26B MoE | 16-20 GB | ✅ Tight | Medium | High quality, activates 4B/token |
| Qwen 3.5 27B | 16-20 GB | ✅ Tight | Medium | Dense high-quality |
| Gemma 4 31B | 20-24 GB | ⚠️ No | — | Needs more VRAM/RAM than we have |

**Recommendation:** Qwen 3.5 9B at Q4_K_M is the sweet spot for this machine — strong coding, good reasoning, fits comfortably in RAM.

---

## 3. System Architecture Recommendations

### Docker-First Approach
The 2026 standard for home servers is Docker-based deployment:
- Ollama in Docker container with GPU passthrough (if GPU added later)
- Each service isolated and reproducible
- Easy backup via volume snapshots

### Filesystem
- **BTRFS** for single-drive setups (Ubuntu 26.04 native)
- **ZFS** if expanding to multi-disk arrays later
- Enable Timeshift snapshots for system recovery

### Monitoring Stack
- **Beszel** — Lightweight modern dashboard (replaces heavy Grafana for home use)
- Shows CPU temps, Docker status, network throughput
- Zero config: `docker run -d -p 8090:8090 --name beszel-hub hengetech/beszel`

### Network Security
- **AdGuard Home** — Network-wide ad/tracker blocking + DNS-over-HTTPS
- Prevents IoT devices phoning home
- Change router DNS to point at server IP

---

## 4. Immediate Upgrade Opportunities

### Quick Wins (Do This Week)

1. **Install Qwen 3.5 9B** via Ollama
   ```bash
   ollama pull qwen3.5:9b
   ```
   Better coding assistant than current qwen2.5:7b

2. **Enable BTRFS snapshots** (if not already)
   ```bash
   sudo apt install timeshift
   sudo timeshift --create --comments "Pre-upgrade baseline"
   ```

3. **Install Beszel monitoring**
   ```bash
   docker run -d -p 8090:8090 --name beszel hengetech/beszel
   ```

### Medium-Term (Next Month)

4. **Test Gemma 4 E4B** — You already have E2B downloaded, try E4B for comparison
   ```bash
   ollama pull gemma4:e4b-it-q4_K_M
   ```

5. **Dockerize Ollama** — Move from binary install to Docker for easier management
   ```bash
   docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
   ```

6. **Set up AdGuard Home** — Network-level privacy
   ```bash
   docker run -d --name adguardhome -p 53:53/tcp -p 53:53/udp -p 3000:3000 adguard/adguardhome
   ```

### Strategic (When Hardware Allows)

7. **Add GPU** — Even an entry-level NVIDIA card would unlock:
   - Much faster inference (10-50x speedup)
   - Ability to run 27B+ models
   - GPU-accelerated media transcoding (Immich/Jellyfin)

8. **Expand storage + ZFS** — If building a proper NAS/media server

---

## 5. OpenClaw-Specific Improvements

### Skills to Explore
- **Claude Code ACP harness** — For complex coding tasks via `sessions_spawn` with `runtime: "acp"`
- **TaskFlow** — For multi-step detached workflows (already available)
- **healthcheck** skill — Run a full security audit

### Configuration Tweaks
- **idleTimeoutSeconds** — Currently 300s; consider increasing for long research jobs
- **plugins.allow** — Pin trust for `openclaw-web-search` to stop warnings

---

## Summary: Priority Matrix

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| 🔴 High | Pull Qwen 3.5 9B | 10 min | Better local coding/reasoning |
| 🔴 High | Enable Timeshift | 15 min | System recovery safety net |
| 🟡 Medium | Install Beszel | 5 min | System visibility |
| 🟡 Medium | Test Gemma 4 E4B | 20 min | Compare with Qwen |
| 🟢 Low | Dockerize services | 1-2 hrs | Better service management |
| 🟢 Low | AdGuard Home | 30 min | Network privacy |
| 🔵 Future | Add GPU | $200-500 | 10-50x inference speedup |

---

*Research compiled April 22, 2026. Next scheduled research: 2026-04-23 (OpenClaw updates cron @ 09:00)*
