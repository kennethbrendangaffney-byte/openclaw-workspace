# Comprehensive Local LLM Guide for Karen's Setup
*Compiled: 2026-04-22 | Hardware: 24GB RAM, CPU-only (no discrete GPU), Linux*

---

## 📋 Your Hardware Profile

| Component | Spec | Implication |
|-----------|------|-------------|
| **RAM** | 24GB | Can run 7B-8B models comfortably (Q4_K_M); 13B with swap |
| **CPU** | AMD Ryzen 7 7735HS (8C/16T) | Good for CPU inference; AVX2 support |
| **GPU** | Integrated Radeon 680M | Not useful for LLM inference |
| **Storage** | 118GB SSD (66GB free) | Can store 10-15 models |
| **OS** | Ubuntu Linux | Native performance; no Windows overhead |
| **Network** | Tailscale + Local loopback | Secure, private connectivity |

**Key constraint:** No discrete GPU means all inference is CPU-bound. Memory bandwidth (~30-50 GB/s) is the bottleneck, not compute.

---

## 🗂️ Local LLM Landscape (Complete)

### 1. MICRO Models (Under 1B Parameters)
*For IoT, ultra-low-latency, basic tasks*

| Model | Params | Size (Q4) | Speed* | Quality | Best For |
|-------|--------|-----------|--------|---------|----------|
| **SmolLM2-135M** | 135M | ~80MB | ~50 t/s | ⭐ Basic | Keyword extraction, simple classification |
| **Qwen3-0.6B** | 600M | ~400MB | ~25 t/s | ⭐⭐ Simple QA | Ultra-fast responses, basic chat |
| **TinyLlama-1.1B** | 1.1B | ~700MB | ~20 t/s | ⭐⭐ Basic | IoT, microcontrollers, simple tasks |
| **Phi-1.5** | 1.5B | ~900MB | ~18 t/s | ⭐⭐⭐ Decent | Coding basics, text completion |

**Verdict for you:** Qwen3-0.6B is interesting for speed, but too limited. Skip unless you need sub-second responses.

---

### 2. SMALL Models (1B–3B Parameters)
*The sweet spot for CPU-only setups*

| Model | Params | Size (Q4) | Speed* | Quality | Best For |
|-------|--------|-----------|--------|---------|----------|
| **Qwen3-1.7B** | 1.7B | ~1.2GB | ~20 t/s | ⭐⭐⭐ Good | Edge deployment, agents, multilingual |
| **BitNet-b1.58-2B** | 2B | ~1.3GB (I2_S) | ~27 t/s | ⭐⭐⭐ Good | Fast inference, low RAM, ternary quantization |
| **Gemma 3n E2B** | 2.3B active | ~3GB | ~15 t/s | ⭐⭐⭐⭐ Very Good | On-device, multimodal (text+image+audio) |
| **SmolLM3-3B** | 3B | ~2GB | ~12 t/s | ⭐⭐⭐⭐ Very Good | Transparent training, reasoning |
| **Qwen3-4B** | 4B | ~2.6GB | ~10 t/s | ⭐⭐⭐⭐ Very Good | Multilingual, thinking mode |
| **Phi-4 Mini** | 3.8B | ~2.5GB | ~10 t/s | ⭐⭐⭐⭐⭐ Excellent | STEM, math, reasoning, 128K context |
| **DeepSeek-R1 1.5B** | 1.5B | ~1.1GB | ~18 t/s | ⭐⭐⭐⭐ Very Good | Chain-of-thought reasoning |

**Verdict for you:** 
- **BitNet 2B** ✅ Already working well (27 t/s)
- **Phi-4 Mini** 🌟 Best quality in this tier for STEM/reasoning
- **Qwen3-4B** 🌟 Best for multilingual, thinking mode toggle
- **Gemma 3n E2B** 🌟 If you need multimodal (vision+audio)

---

### 3. MEDIUM Models (4B–8B Parameters)
*The practical limit for your 24GB RAM setup*

| Model | Params | Size (Q4) | Speed* | Quality | Best For |
|-------|--------|-----------|--------|---------|----------|
| **Llama 3.1 8B** | 8B | ~4.7GB | ~5 t/s | ⭐⭐⭐⭐ Very Good | General chat, multilingual, 128K context |
| **Mistral 7B** | 7B | ~4.1GB | ~5 t/s | ⭐⭐⭐⭐ Very Good | General purpose, fine-tuning base |
| **Qwen3-8B** | 8B | ~5.2GB | ~4 t/s | ⭐⭐⭐⭐⭐ Excellent | Best multilingual, coding, reasoning |
| **DeepSeek-R1 8B** | 8B | ~5GB | ~4 t/s | ⭐⭐⭐⭐⭐ Excellent | Advanced reasoning, math, logic |
| **Gemma 3 4B** | 4B | ~2.6GB | ~10 t/s | ⭐⭐⭐⭐ Very Good | Vision + text, Google ecosystem |
| **Gemma 3 8B** | 8B | ~5GB | ~5 t/s | ⭐⭐⭐⭐⭐ Excellent | Vision + text, better quality |
| **Phi-4 14B** | 14B | ~8.5GB | ~3 t/s | ⭐⭐⭐⭐⭐ Excellent | Advanced STEM, graduate-level reasoning |

**Verdict for you:**
- **Qwen3-8B** 🌟 Best overall 8B model for your setup
- **DeepSeek-R1 8B** 🌟 If you need deep reasoning/chain-of-thought
- **Phi-4 14B** ⚠️ Borderline for your RAM but excellent for STEM

---

### 4. LARGE Models (10B–30B Parameters)
*Requires careful memory management on your setup*

| Model | Params | Size (Q4) | Min RAM | Status for You |
|-------|--------|-----------|---------|----------------|
| **Qwen3-14B** | 14B | ~9GB | 16GB | ⚠️ Tight but possible |
| **Llama 3.3 70B** | 70B | ~40GB | 48GB+ | ❌ Too large |
| **Gemma 4 26B-A4B** | 26B total | ~16GB | 20GB | ⚠️ Possible with swap |
| **Gemma 4 31B** | 31B | ~20GB | 24GB | ⚠️ Borderline, use swap |
| **Mistral Small 4** | 119B total | ~70GB | 80GB+ | ❌ Too large |
| **GLM-5.1** | 754B total | ~400GB | 512GB+ | ❌ Enterprise only |

**Verdict for you:** 
- **Gemma 4 26B-A4B** 🌟 Best large model you *might* run (with swap)
- **Qwen3-14B** 🌟 More practical, excellent quality
- Skip 70B+ models entirely

---

### 5. SPECIALIZED / DOMAIN MODELS

| Model | Domain | Params | Size | Use Case |
|-------|--------|--------|------|----------|
| **CodeLlama-7B** | Coding | 7B | ~4GB | General code completion |
| **DeepSeek-Coder-6.7B** | Coding | 6.7B | ~4GB | Best open coding model |
| **StarCoder2-7B** | Coding | 7B | ~4GB | Multi-language coding |
| **MedLlama-7B** | Medical | 7B | ~4GB | Medical Q&A (not for diagnosis) |
| **LawLLM-7B** | Legal | 7B | ~4GB | Contract analysis, legal Q&A |
| **LlamaGuard-7B** | Safety | 7B | ~4GB | Content moderation |
| **BGE-Embedding** | Embeddings | Various | Various | Text embeddings for RAG |
| **nomic-embed-text** | Embeddings | 137M | 274MB | General embeddings (✅ you have this) |

---

## 🎯 Use Case Matrix

| Use Case | Best Model | Why | Speed |
|----------|-----------|-----|-------|
| **General chat** | Qwen3-8B | Best balance quality/speed | ~4 t/s |
| **Coding help** | DeepSeek-R1 8B | Superior code reasoning | ~4 t/s |
| **Math/STEM** | Phi-4 Mini (3.8B) | Textbook-trained, excellent logic | ~10 t/s |
| **Multilingual** | Qwen3-8B | 119 languages supported | ~4 t/s |
| **Fast responses** | BitNet 2B | 27 t/s, instant feel | ~27 t/s |
| **Research summaries** | Qwen3-8B or DeepSeek-R1 8B | Long context, good reasoning | ~4 t/s |
| **Creative writing** | Llama 3.1 8B | Natural, varied output | ~5 t/s |
| **Vision tasks** | Gemma 3 8B | Native image understanding | ~5 t/s |
| **Audio processing** | Gemma 3n E2B | Native audio, 30s clips | ~15 t/s |
| **Offline mobile** | Qwen3-1.7B | Tiny, fast, capable | ~20 t/s |
| **IoT/embedded** | TinyLlama 1.1B | Minimal resource use | ~20 t/s |

---

## ⚡ Performance Benchmarks (Your Hardware)

*Estimated based on CPU-only inference with AVX2*

| Model | Quant | RAM Used | Prompt Eval | Generation | Context |
|-------|-------|----------|-------------|------------|---------|
| BitNet 2B | I2_S | 1.1GB | ~35 t/s | ~27 t/s | 4096 |
| Qwen3-0.6B | Q4_K_M | 400MB | ~40 t/s | ~25 t/s | 32K |
| Qwen3-1.7B | Q4_K_M | 1.2GB | ~30 t/s | ~20 t/s | 32K |
| Phi-4 Mini | Q4_K_M | 2.5GB | ~15 t/s | ~10 t/s | 128K |
| Qwen3-4B | Q4_K_M | 2.6GB | ~15 t/s | ~10 t/s | 32K |
| Gemma 3n E2B | Q4_K_M | 3GB | ~20 t/s | ~15 t/s | 32K |
| Llama 3.1 8B | Q4_K_M | 4.7GB | ~8 t/s | ~5 t/s | 128K |
| Qwen3-8B | Q4_K_M | 5.2GB | ~7 t/s | ~4 t/s | 32K |
| DeepSeek-R1 8B | Q4_K_M | 5GB | ~7 t/s | ~4 t/s | 32K |
| Phi-4 14B | Q4_K_M | 8.5GB | ~5 t/s | ~3 t/s | 128K |
| Gemma 4 26B | Q4_K_M | 16GB | ~3 t/s | ~2 t/s | 128K |

*Note: Prompt eval = processing your input. Generation = creating the response. Generation is what you experience as "speed."*

---

## 🔧 Deployment Options

### Option 1: Ollama (Recommended for You)
**Pros:**
- ✅ One-command install and run
- ✅ Automatic quantization (Q4_K_M by default)
- ✅ OpenAI-compatible API (works with OpenClaw)
- ✅ Large model library
- ✅ Easy updates

**Cons:**
- ❌ Less control over quantization
- ❌ Slightly higher RAM overhead than raw llama.cpp

**Best for:** General use, quick experimentation, OpenClaw integration

### Option 2: llama.cpp (Raw)
**Pros:**
- ✅ Maximum performance
- ✅ Full quantization control
- ✅ Lowest RAM overhead
- ✅ Supports experimental formats (BitNet, etc.)

**Cons:**
- ❌ Command-line only
- ❌ Manual model conversion
- ❌ No built-in API server (need to add)

**Best for:** Power users, specific quantization needs, maximum efficiency

### Option 3: LM Studio (GUI)
**Pros:**
- ✅ Beautiful GUI
- ✅ Built-in chat interface
- ✅ Model browser and downloader
- ✅ Easy to switch models

**Cons:**
- ❌ GUI overhead
- ❌ Not headless-friendly
- ❌ Less automation-friendly

**Best for:** Exploration, testing, non-technical users

### Option 4: BitNet (Specialized)
**Pros:**
- ✅ Fastest CPU inference (integer ops)
- ✅ Extremely low RAM (1.1GB for 2B)
- ✅ Unique quantization (1.58-bit ternary)

**Cons:**
- ❌ Limited model selection (mostly Microsoft models)
- ❌ Complex build process
- ❌ Not compatible with standard GGUF

**Best for:** Maximum speed on CPU, specific use cases

---

## 🎖️ RECOMMENDATIONS FOR YOUR SETUP

### Tier 1: Essential (Download These Now)

**1. Qwen3-8B (Q4_K_M)**
```bash
ollama pull qwen3:8b
```
- **Why:** Best all-around 8B model. Thinking mode for complex tasks, fast mode for quick answers. 119 languages.
- **Use:** Primary chat model, coding help, research
- **RAM:** 5.2GB

**2. Phi-4 Mini (Q4_K_M)**
```bash
ollama pull phi4:mini
```
- **Why:** Best STEM/math model under 4B. 128K context. MIT license.
- **Use:** Math, logic, detailed analysis, long documents
- **RAM:** 2.5GB

**3. Keep BitNet 2B**
- **Why:** Already working, fastest option (27 t/s), ultra-low RAM
- **Use:** Quick queries, when speed matters most
- **RAM:** 1.1GB

### Tier 2: Recommended (Try These)

**4. DeepSeek-R1 8B (Q4_K_M)**
```bash
ollama pull deepseek-r1:8b
```
- **Why:** Chain-of-thought reasoning visible. Great for debugging and complex problem-solving.
- **Use:** Debugging, reasoning tasks, step-by-step explanations
- **RAM:** 5GB

**5. Gemma 3 8B (Q4_K_M)**
```bash
ollama pull gemma3:8b
```
- **Why:** Google's best open model. Vision capabilities (can analyze images).
- **Use:** Vision tasks, general chat, Google ecosystem integration
- **RAM:** 5GB

**6. Qwen3-4B (Q4_K_M)**
```bash
ollama pull qwen3:4b
```
- **Why:** Compact but capable. Same architecture as 8B, just smaller.
- **Use:** When 8B is too slow but you need more than BitNet
- **RAM:** 2.6GB

### Tier 3: Optional (Nice to Have)

**7. Llama 3.1 8B (Q4_K_M)**
```bash
ollama pull llama3.1:8b
```
- **Why:** Industry standard, massive ecosystem. 128K context.
- **Use:** When you need broad compatibility or fine-tuning base
- **RAM:** 4.7GB

**8. Phi-4 14B (Q4_K_M)** ⚠️
```bash
ollama pull phi4:14b
```
- **Why:** Best STEM model you can (barely) run. Graduate-level reasoning.
- **Use:** Advanced math, research-level analysis
- **RAM:** 8.5GB (tight but possible)

---

## 📊 Total Footprint

If you download all Tier 1 + Tier 2:
- **Qwen3-8B:** 5.2GB
- **Phi-4 Mini:** 2.5GB
- **BitNet 2B:** 1.3GB (already have)
- **DeepSeek-R1 8B:** 5GB
- **Gemma 3 8B:** 5GB
- **Qwen3-4B:** 2.6GB
- **Total:** ~21.6GB

**This fits comfortably in your 24GB RAM** (with some swap for safety).

Add Tier 3:
- **Llama 3.1 8B:** 4.7GB
- **Phi-4 14B:** 8.5GB
- **New total:** ~34.8GB

**Requires swap file** (you'd need to load/unload models).

---

## 🔄 Model Selection Workflow

```
Quick question?
├── Yes → BitNet 2B (fastest)
└── No → Need quality?
    ├── Yes → STEM/Math?
    │   ├── Yes → Phi-4 Mini (or 14B if critical)
    │   └── No → Multilingual?
    │       ├── Yes → Qwen3-8B
    │       └── No → General chat?
    │           ├── Yes → Qwen3-8B or Llama 3.1 8B
    │           └── No → Vision?
    │               ├── Yes → Gemma 3 8B
    │               └── No → DeepSeek-R1 8B (reasoning)
    └── No (speed > quality) → Qwen3-4B or Gemma 3n E2B
```

---

## 🚀 Quick Start Commands

```bash
# Install Ollama (if not already)
curl -fsSL https://ollama.com/install.sh | sh

# Download recommended models
ollama pull qwen3:8b
ollama pull phi4:mini
ollama pull deepseek-r1:8b
ollama pull gemma3:8b
ollama pull qwen3:4b

# Test a model
ollama run qwen3:8b

# List downloaded models
ollama list

# Remove a model
ollama rm modelname:tag
```

---

## 🔮 Future-Proofing

### If You Get a GPU (e.g., RTX 4060 8GB):
- **Immediate upgrade:** All models 5-10× faster
- **New possibilities:** Run 13B-30B models easily
- **Best GPU models:** RTX 4060 Ti 16GB, RTX 4070 Super 12GB, RTX 4090 24GB

### If You Upgrade RAM (32GB+):
- **Run multiple models simultaneously**
- **Keep 14B models loaded permanently**
- **Run 70B models with Q4_K_M quantization**

### If You Get Apple Silicon (M3/M4):
- **M3 Max:** 128GB unified memory = run 70B models
- **M4 Ultra:** 512GB unified memory = run any model
- **Metal acceleration:** 2-3× faster than your current CPU

---

## 📚 Summary Table: The Essentials

| Model | Params | RAM | Speed | Best For | Priority |
|-------|--------|-----|-------|----------|----------|
| **Qwen3-8B** | 8B | 5.2GB | ~4 t/s | General chat, coding, multilingual | 🔴 Must-have |
| **Phi-4 Mini** | 3.8B | 2.5GB | ~10 t/s | STEM, math, reasoning | 🔴 Must-have |
| **BitNet 2B** | 2B | 1.1GB | ~27 t/s | Fast queries, low RAM | 🟢 Already have |
| **DeepSeek-R1 8B** | 8B | 5GB | ~4 t/s | Chain-of-thought reasoning | 🟡 Recommended |
| **Gemma 3 8B** | 8B | 5GB | ~5 t/s | Vision, general chat | 🟡 Recommended |
| **Qwen3-4B** | 4B | 2.6GB | ~10 t/s | Speed/quality balance | 🟡 Recommended |
| **Llama 3.1 8B** | 8B | 4.7GB | ~5 t/s | Ecosystem compatibility | 🔵 Optional |
| **Phi-4 14B** | 14B | 8.5GB | ~3 t/s | Advanced STEM | 🔵 Optional |

---

*Guide compiled by Karen for Ken's local-first AI setup. Updated as of 2026-04-22.*
