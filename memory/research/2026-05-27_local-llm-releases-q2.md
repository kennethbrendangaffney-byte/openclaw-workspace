# Local LLM Releases — Last 3 Months (March-May 2026)

## Models That Fit Our System (19GB RAM, CPU-only)

### 🟢 **Qwen 3:8B** — Downloading Now ⭐
- **Released:** April 2026
- **Size:** 5.2GB disk, ~6GB RAM
- **Context:** 128K tokens
- **Key Feature:** Switchable thinking mode (/think, /no_think)
- **Best For:** General chat, reasoning, tool calling, coding
- **Ollama:** `ollama run qwen3:8b`
- **Status:** Downloading — ~18 min remaining

### 🟢 **Qwen 3.5:9B** — Next Gen Architecture
- **Released:** March 2026
- **Size:** ~5GB disk, ~6GB RAM
- **Context:** 256K tokens
- **Key Feature:** Gated DeltaNet — 40% less KV-cache memory at long contexts
- **Best For:** Long context tasks, coding, multilingual
- **Ollama:** `ollama run qwen3.5:9b`
- **Note:** Native multimodal (text + images + video)

### 🟢 **Gemma 3:4B** — Vision on CPU
- **Released:** February 2026
- **Size:** 3.3GB disk, ~4GB RAM
- **Context:** 128K tokens
- **Key Feature:** Vision capabilities on ALL sizes
- **Best For:** Image understanding, instruction following, low RAM
- **Ollama:** `ollama run gemma3:4b`

### 🟢 **Phi-4 Mini 3.8B** — Microsoft Compact
- **Released:** January 2026
- **Size:** 2.5GB disk, ~3GB RAM
- **Context:** 128K tokens
- **Key Feature:** 70% HumanEval — strong coding for size
- **Best For:** Coding, fast responses, very low RAM
- **Ollama:** `ollama run phi4-mini`

### 🟢 **Mistral Small 3.2** — EU Apache 2.0
- **Released:** April 2026
- **Size:** ~4GB disk, ~5GB RAM
- **Context:** 32K tokens
- **Key Feature:** Improved instruction following over 3.1
- **Best For:** GDPR compliance, European deployments
- **Ollama:** `ollama run mistral-small3.2`

---

## 🟡 Tight Fit (12-16GB RAM)

### **Qwen 3:14B**
- **Size:** ~9GB disk, ~12GB RAM
- **Best For:** Better reasoning than 8B, coding
- **Ollama:** `ollama run qwen3:14b`

### **Phi-4 14B**
- **Released:** December 2025
- **Size:** ~9GB disk, ~12GB RAM
- **Key Feature:** 84% MMLU — best reasoning per GB
- **Caveat:** 16K context (small)
- **Ollama:** `ollama run phi4`

---

## 🔴 Too Big for Us (>20GB RAM)

| Model | RAM Needed | Why Skip |
|-------|-----------|----------|
| Qwen 3:32B | ~24GB | Exceeds total RAM |
| Qwen 3.5:27B | ~20GB | Tight, no headroom |
| Gemma 3:27B | ~24GB | Exceeds total RAM |
| Llama 3.3:70B | ~40GB | Needs dual GPU |
| DeepSeek-R1:32B | ~22GB | Would swap |

---

## 🏆 Top Picks for Our Setup

| Rank | Model | Why |
|------|-------|-----|
| 1 | **Qwen 3:8B** | Thinking mode, tool calling, newest |
| 2 | **Qwen 3.5:9B** | Better architecture, 256K context |
| 3 | **Gemma 3:4B** | Vision, ultra low RAM |
| 4 | **Phi-4 Mini** | Fastest, best coding per GB |
| 5 | **Mistral Small 3.2** | EU compliance, Apache 2.0 |

---

## Key Trends (March-May 2026)

1. **Thinking mode is standard** — Qwen 3, DeepSeek V3.2, GLM-5 all have switchable reasoning
2. **MoE everywhere** — Mixture-of-Experts gives large model quality with small model speed
3. **Multimodal by default** — Qwen 3.5, Gemma 3, Mistral Small 4 all handle text + images natively
4. **Context windows growing** — 128K minimum, 256K common, 1M+ on flagship models
5. **Apache 2.0 dominant** — Qwen, Mistral, Grok all permissive; only Llama has restrictions

---

## Our Current Stack

| Model | Status | Size | Role |
|-------|--------|------|------|
| **Qwen 3:8B** | ⏳ Downloading | 5.2GB | Primary local |
| **Llama 3.2:3B** | ✅ Installed | 2GB | Ultra-fast fallback |
| **nomic-embed-text** | ✅ Working | 274MB | Embeddings |
| **mxbai-embed-large** | ✅ Working | 669MB | Embeddings |
| **BitNet 2B** | ✅ Working | 1.1GB | Emergency fallback |

---

## Recommended Next Downloads

After Qwen 3:8B finishes:
1. **Qwen 3.5:9B** — Better architecture, 256K context
2. **Gemma 3:4B** — Vision capabilities
3. **Phi-4 Mini** — Fast coding tasks

---

*Research date: 2026-05-27*
*Sources: PromptQuorum, ComputingForGeeks, Ollama library, InsiderLLM*
