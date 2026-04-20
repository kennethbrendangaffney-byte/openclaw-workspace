# TOOLS.md — Local Cheat Sheet

## Hardware
- **RAM:** 24GB
- **OS:** Linux 6.17.0-20-generic (Ubuntu)
- **Arch:** x64

## Models Available
| Model | Location | Status | Use Case |
|-------|----------|--------|----------|
| qwen2.5:3b | Ollama local | ✅ Available | Lightweight, too weak for serious work |
| qwen2.5:7b-q2 | Ollama local | ✅ Working | 7B params, Q2_K quant (3GB), good quality |
| nomic-embed-text | Ollama local | ✅ Working | Embeddings for memory search |
| **BitNet 2B** | `~/BitNet/` | ✅ **Working** | 27 t/s, 1.1GB RAM, efficient local inference |
| kimi k2p5 | Cloud (kimi-coding) | ✅ Current Default | Serious processing power |

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
| qwen2.5:7b-q2 | 3.0GB | ✅ Working | 35 t/s prompt, 25 t/s eval | Q2_K quant, single-file download |
| qwen2.5:3b | 1.9GB | ✅ Working | - | Lightweight |
| nomic-embed-text | 274MB | ✅ Working | - | Embeddings |

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

## Key Paths
- Workspace: `/home/karen/.openclaw/workspace`
- Memory: `/home/karen/.openclaw/workspace/memory`
- Diary: `/home/karen/.openclaw/workspace/diary`
- Config: `/home/karen/.openclaw/openclaw.json`
