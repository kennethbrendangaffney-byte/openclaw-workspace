# Local LLM Landscape — May 2026

## Our Hardware
- **CPU:** AMD Ryzen 7 7735HS (8c/16t)
- **RAM:** 24GB total, ~19GB usable (~14GB free currently)
- **GPU:** Integrated Radeon Graphics (NO CUDA, NO discrete GPU)
- **Disk:** 118GB NVMe, 56GB free
- **OS:** Ubuntu 24.04

## What Changed Since Our Last Check

### New Model Releases (2026)
| Model | Release | Key Feature |
|-------|---------|-------------|
| **Gemma 4** | April 2026 | MoE architecture, native tool calling, multimodal |
| **Llama 3.3** | Late 2025 | 70B performance at smaller size, 128K context |
| **Qwen 2.5 Coder** | 2025 | 92.7% HumanEval (32B), strong coding |
| **Qwen 3-Coder** | 2026 | MoE (30B total, 3B active), agentic coding |
| **Phi-4** | 2025 | 80.4% MATH, best reasoning per GB |
| **DeepSeek-R1** | 2025 | Chain-of-thought reasoning, distilled sizes |

### Key Trends
1. **MoE (Mixture of Experts)** is now standard — models like Gemma 4 and Qwen 3 activate only a subset of parameters per token, giving large model quality with small model speed
2. **Q4_K_M quantization** is the sweet spot — ~2-3% quality loss, 4x VRAM savings
3. **CPU inference is viable** for 7-14B models — llama.cpp optimizations closed the gap
4. **Tool calling / agents** — Gemma 4 and Qwen 3-Coder have native function calling

---

## Models That Fit Our System (19GB RAM, CPU-only)

### 🟢 Definitely Fits (< 8GB RAM needed)

| Model | Size | RAM | Speed | Best For | Ollama Pull |
|-------|------|-----|-------|----------|-------------|
| **Llama 3.3 8B** | 4.9GB | ~6GB | 10-20 t/s | General chat, light coding | `ollama pull llama3.3:8b` |
| **Mistral 7B** | 4.1GB | ~5GB | Fastest | Speed over quality | `ollama pull mistral:7b` |
| **Qwen 2.5 7B** | ~5GB | ~6GB | Medium | Coding, multilingual | `ollama pull qwen2.5:7b` |
| **Gemma 3 4B** | ~3GB | ~4GB | Fast | Instruction following | `ollama pull gemma3:4b` |
| **Phi-4 Mini 3.8B** | ~2.5GB | ~3GB | Very fast | Simple tasks | `ollama pull phi4:3.8b` |

### 🟡 Tight Fit (8-14GB RAM needed)

| Model | Size | RAM | Speed | Best For | Ollama Pull |
|-------|------|-----|-------|----------|-------------|
| **Qwen 2.5 14B** | 9GB | ~12GB | Medium | Coding, structured output | `ollama pull qwen2.5:14b` |
| **Phi-4 14B** | 9.1GB | ~12GB | Medium | Math, reasoning | `ollama pull phi4` |
| **Gemma 3 12B** | 8.1GB | ~11GB | Medium | Writing, balanced | `ollama pull gemma3:12b` |
| **DeepSeek-R1 14B** | 9GB | ~12GB | Slow | Complex reasoning | `ollama pull deepseek-r1:14b` |
| **Qwen 2.5 Coder 14B** | 9GB | ~12GB | Medium | Best local coding | `ollama pull qwen2.5-coder:14b` |

### 🔴 Too Big for Us (> 16GB RAM)

| Model | Size | RAM | Why Skip |
|-------|------|-----|----------|
| **Llama 3.3 70B** | 43GB | 45GB+ | Needs dual GPU or 64GB+ RAM |
| **Qwen 2.5 32B** | 22GB | 24GB+ | Exceeds our total RAM |
| **DeepSeek-R1 32B** | 19GB | 22GB+ | Would swap, unusable |
| **Gemma 4 26B** | ~16GB | 18GB+ | MoE but still too big |

---

## 🏆 Top Picks for Our Setup

### 1. **Llama 3.3 8B** — Best All-Rounder
- **Why:** 128K context, good instruction following, 111M+ downloads
- **RAM:** ~6GB — leaves plenty of headroom
- **Speed:** 10-20 t/s on CPU
- **Use:** General chat, summarization, light coding
- **Pull:** `ollama pull llama3.3:8b`

### 2. **Qwen 2.5 Coder 7B** — Best Coding on 8GB
- **Why:** Outperforms Llama 3.3 8B on code tasks
- **RAM:** ~6GB
- **Use:** Code completion, debugging, generation
- **Pull:** `ollama pull qwen2.5-coder:7b`

### 3. **Phi-4 14B** — Best Reasoning (if we can spare the RAM)
- **Why:** 80.4% MATH, beats 70B models on reasoning per GB
- **RAM:** ~12GB — tight but doable if we close other apps
- **Caveat:** 16K context window (small)
- **Use:** Math, logic, structured analysis
- **Pull:** `ollama pull phi4`

### 4. **Gemma 3 4B** — Fast & Light
- **Why:** Google's best small model, 128K context
- **RAM:** ~4GB — ultra comfortable
- **Use:** Quick tasks, instruction following
- **Pull:** `ollama pull gemma3:4b`

---

## Our Current Stack

| Model | Status | Size | Notes |
|-------|--------|------|-------|
| **nomic-embed-text** | ✅ Working | 274MB | Embeddings |
| **mxbai-embed-large** | ✅ Working | 669MB | Alternative embeddings |
| **llama3.1:8b** | ❌ NOT DOWNLOADED | 5.7GB | We removed it — needs re-download |
| **BitNet 2B** | ✅ Working | 1.1GB | 27 t/s, very fast but limited quality |

---

## Recommendation

**Start with Llama 3.3 8B.** It's the modern replacement for llama3.1:8b (which we had), with better instruction following and same RAM footprint.

**Then add Qwen 2.5 Coder 7B** for coding tasks — it outperforms Llama on code.

**Keep BitNet 2B** for ultra-fast, low-RAM fallback.

**Skip 14B models** unless we're doing focused reasoning work and can free up RAM.

---

## Download Strategy

Given our unreliable Ollama pull for large models:

```bash
# Option 1: Ollama pull (try first)
ollama pull llama3.3:8b

# Option 2: If pull fails, wget from HuggingFace + ollama create
# (See TOOLS.md for Modelfile template)
```

**Llama 3.3 8B is ~5GB** — should pull reliably. If not, we can wget it.

---

*Research date: 2026-05-27*
*Sources: MorphLLM, AI Tool Discovery, Lushbinary, OpenClaw memory*
