# April 20, 2026 — Ollama Update & qwen2.5:7b Install Summary

## What Happened
- Ollama updated to v0.21.0 (binary install, removed snap)
- Downloaded and installed qwen2.5:7b via HuggingFace GGUF (Q2_K quantization)
- Discovered gateway restarts were killing active downloads

## Models Installed
| Model | Size | Status | Speed |
|-------|------|--------|-------|
| qwen2.5:7b-q2 | 3.0GB | ✅ Working | 35 t/s prompt, 25 t/s eval |
| qwen2.5:3b | 1.9GB | ✅ Working | - |
| nomic-embed-text | 274MB | ✅ Working | - |
| BitNet 2B | 1.1GB | ✅ Working | 27 t/s |

## Key Learnings
1. **Ollama `pull` unreliable for >4GB models** — gets interrupted by gateway restarts
2. **Solution: `wget --continue` from HuggingFace** then `ollama create` from Modelfile
3. **Gateway restarts kill all active exec sessions** — use resume-capable downloads
4. **Q2_K single-file GGUFs** work better than split Q4_K_M files (no merge needed)

## Commands
```bash
# Download model
wget --continue "https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF/resolve/main/qwen2.5-7b-instruct-q2_k.gguf" -O model.gguf

# Create in Ollama
cat > Modelfile << 'EOF'
FROM ./model.gguf
TEMPLATE "{{- if .System }}{{ .System }}{{ end }}{{- range .Messages }}{{- if eq .Role \"user\" }}<|im_start|>user\n{{ .Content }}<|im_end|>{{ else if eq .Role \"assistant\" }}<|im_start|>assistant\n{{ .Content }}<|im_end|>{{ end }}{{- end }}<|im_start|>assistant\n"
PARAMETER stop <|im_end|>
PARAMETER stop <|im_start|>
PARAMETER temperature 0.7
EOF
ollama create qwen2.5:7b-q2 -f Modelfile
```

## System Health
- RAM: 19GB total, 13GB available
- Ollama server: running on 127.0.0.1:11434
- Gateway: stable (no restarts in last 30 min)
