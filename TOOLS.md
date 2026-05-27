# TOOLS.md — Local Cheat Sheet

## Hardware
- **RAM:** 24GB (19GB usable)
- **OS:** Linux 6.17.0-20-generic (Ubuntu)
- **Arch:** x64
- **CPU:** AMD Ryzen 7 7735HS (8 cores / 16 threads)
- **GPU:** Integrated Radeon Graphics (NO discrete GPU / NO CUDA)
- **Disk:** 118GB NVMe (54GB free)

## Models Available
| Model | Location | Status | Use Case |
|-------|----------|--------|----------|
| **kimi k2p6** | Cloud (kimi) ✅ | **PRIMARY** | Best reasoning, 131K context |
| **llama3.1:8b** | Ollama local | ❌ **NOT DOWNLOADED** | 8B params, 5.7GB, quality reasoning |
| nomic-embed-text | Ollama local | ✅ Working | Embeddings for memory search |
| mxbai-embed-large | Ollama local | ✅ Working | Alternative embeddings |
| **BitNet 2B** | `~/BitNet/` | ✅ Working | 27 t/s, 1.1GB RAM, efficient local inference |
| kimi k2p5 | Cloud (kimi-coding) ✅ | Last-resort fallback | Serious processing power |

## Channels
- **Telegram:** Connected and active
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

| Model | Size | Status | Speed | Notes |
|-------|------|--------|-------|-------|
| **llama3.1:8b** | 5.7GB | ❌ **NOT DOWNLOADED** | N/A | Need to re-download |
| nomic-embed-text | 274MB | ✅ Working | - | Embeddings |
| mxbai-embed-large | 669MB | ✅ Working | - | Alternative embeddings |

**Removed models:** qwen3.5:9b, qwen2.5:3b, qwen2.5:7b, gemma4, qwen3:4b, qwen3:8b, llama3.1:8b

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

**Location:** `~/BitNet/`

### Working Model
- **Model:** Microsoft BitNet-b1.58-2B-4T (I2_S format)
- **Path:** `~/BitNet/models/BitNet-b1.58-2B-4T/ggml-model-i2_s.gguf`
- **Size:** 1.3GB download, 1.1GB RAM at runtime
- **Speed:** ~27 tokens/sec (8 threads, CPU)
- **Quantization:** 1.58-bit ternary (weights: -1, 0, +1)

### Usage
```bash
cd ~/BitNet
./build/bin/llama-cli -m models/BitNet-b1.58-2B-4T/ggml-model-i2_s.gguf \
  -p "Your prompt here" -t 8 -n 128 --temp 0.7
```

### Limitations
- **8B models:** TL1 format requires kernel rebuild; I2_S conversions have issues
- **Largest working:** 2B is the biggest reliable BitNet model currently
- **Context:** 4096 tokens (same as base Llama3.2-1B architecture)

### Key Paths
- **Binaries:** `~/BitNet/build/bin/`
- **Models:** `~/BitNet/models/`
- **Working model:** `~/BitNet/models/BitNet-b1.58-2B-4T/`

## Model Routing (Local-First Setup)

**Primary:** `kimi/k2p6` — cloud, best reasoning
**Fallback 1:** `ollama/llama3.1:8b` — ❌ NOT AVAILABLE (needs re-download)
**Fallback 2:** `kimi-coding/k2p5` — cloud, last resort

Configured in `~/.openclaw/openclaw.json`:
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "kimi/k2p6",
        "fallbacks": [
          "ollama/llama3.1:8b",
          "kimi-coding/k2p5"
        ]
      }
    }
  }
}
```

**When to escalate to KC/Maxi:**
- Complex debugging or architecture decisions
- Large code reviews (>500 lines)
- Tasks needing >16K context
- Heavy research requiring deep reasoning
- Anything that feels beyond 8B model capability

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

