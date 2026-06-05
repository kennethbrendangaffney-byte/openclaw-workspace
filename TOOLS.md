# TOOLS.md — Local Cheat Sheet

## Hardware
- **RAM:** 24GB LPDDR5 (4×6GB, soldered) — NOT upgradeable
- **OS:** Linux 6.17.0-20-generic (Ubuntu)
- **Arch:** x64
- **CPU:** AMD Ryzen 7 7735HS (8 cores / 16 threads)
- **GPU:** Integrated Radeon Graphics (NO discrete GPU / NO CUDA)
- **Disk:** 118GB NVMe (57GB free)

## Memory Configuration (Confirmed via dmidecode)
- **Type:** LPDDR5 (soldered, NOT SO-DIMM)
- **Manufacturer:** Micron Technology
- **Part Number:** MT62F1536M64D8CL-026
- **Configuration:** 4 × 6GB modules (4-channel)
- **Rated Speed:** 6000 MT/s
- **Configured Speed:** 6300 MT/s
- **Voltage:** 0.5V
- **Maximum Capacity:** 64 GB (per DMI, but soldered so not upgradeable)
- **Physical:** System Board / Motherboard (soldered)

## Models Available
| Model | Location | Status | Use Case |
|-------|----------|--------|----------|
| **kimi k2p6** | Cloud (kimi) ✅ | **PRIMARY** | Best reasoning, 131K context |
| **kimi k2p5** | Cloud (kimi-coding) ✅ | Last-resort fallback | Serious processing power |
| nomic-embed-text | Ollama local | ✅ Working | Embeddings for memory search |
| mxbai-embed-large | Ollama local | ✅ Working | Alternative embeddings |

## Channels
- **Telegram:** Configured but disabled (Discord is primary)
- **Gateway:** Local loopback ws://127.0.0.1:18789

## Capabilities
- Shell command execution
- File management (read/write/edit)
- Memory search with semantic embeddings
- Web search (via ollama_web_search)
- Local automation and scripting

## Ollama Models (Updated v0.21.0)

**Server:** Binary install at `/usr/local/bin/ollama`, no snap
**Models directory:** `~/.ollama/models/`

| Model | Size | Status | Notes |
|-------|------|--------|-------|
| nomic-embed-text | 274MB | ✅ Working | Embeddings |
| mxbai-embed-large | 669MB | ✅ Working | Alternative embeddings |

**Removed models:** qwen3.5:9b, qwen2.5:3b, qwen2.5:7b, gemma4, qwen3:4b, qwen3:8b, llama3.1:8b, BitNet-b1.58-2B-4T, llama3.1:8b (re-added Jun 3-5, re-removed Jun 5), qwen3:8b-q4_K_M (re-added Jun 3-5, re-removed Jun 5)

### Download Notes
- **Large models (>4GB):** Use `wget --continue` directly from HuggingFace, then `ollama create` from Modelfile
- **Ollama `pull` is unreliable** for large models on this system — gets interrupted
- **Gateway restarts kill active downloads** — use `wget --continue` to resume

### Creating from GGUF
```bash
cat > /tmp/Modelfile << 'EOF'
FROM /path/to/model.gguf
TEMPLATE "..."
PARAMETER stop ...
EOF
ollama create modelname:tag -f /tmp/Modelfile
```

## BitNet b1.58 (Local Ternary Quantization)

**Status:** ❌ **REMOVED** — deleted 2026-05-28 to keep only embedding models locally

**Previous location:** `~/BitNet/` (binaries still present, models folder empty)

---

## Model Routing (Cloud-Only Setup)

**Primary:** `kimi/k2p6` — cloud, best reasoning, 131K context
**Fallback:** `kimi-coding/k2p5` — cloud, last resort

Configured in `~/.openclaw/openclaw.json`:
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "kimi-coding/k2p6",
        "fallbacks": [
          "kimi-coding/k2p5"
        ]
      }
    }
  }
}
```

**Why cloud-only for chat models:**
- LPDDR5 is **soldered** (not upgradeable) — 24GB is the hard limit
- 24GB total / ~19GB usable is insufficient for 32B+ models
- Even 8B models were marginal quality vs. cloud alternatives
- Cloud models (kimi k2p6) provide far better quality at reasonable cost

**When to escalate to KC:**
- Complex debugging or architecture decisions
- Large code reviews (>500 lines)
- Tasks needing >16K context
- Heavy research requiring deep reasoning
- Anything that feels beyond current model capability

## Browser Automation (Virtual Display)
- **Chrome** (non-snap .deb): ✅ Working
- **Launch script**: `~/workspace/chrome-vnc.sh`
- **Critical flag**: `--ozone-platform=x11` (Wayland breaks Xvfb)
- **Navigation**: `Ctrl+L` → type URL → `Return`
- **Screenshots**: `screenshot.sh | base64 -d > file.png`
- **Interact**: `xdotool` directly (NOT wrapper scripts)

### Chrome Launch (Full)
```bash
/opt/google/chrome/google-chrome \
  --no-sandbox --disable-gpu --ozone-platform=x11 \
  --window-size=1200,800
```

### Failed Browsers on Virtual Display
- Firefox (snap): ❌ No window
- Chromium (snap): ❌ AppArmor/D-Bus issues
- Epiphany (apt): ❌ Renders UI but no web content

