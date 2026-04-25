# Karen Self-Improvement Research — 2026-04-25

> **Scope:** AI self-improvement, autonomous agent systems, local AI architecture.  
> **Focus:** Practical upgrades for local Linux-based agents (OpenClaw/Ollama).  
> **Date:** Saturday, April 25th, 2026

---

## 1. AI Self-Improvement: The State of Play in 2026

### 1.1 Meta HyperAgents (March 2026)
- **Paper:** [arXiv:2603.19461](https://arxiv.org/abs/2603.19461) — *Hyperagents: Recursive Metacognitive Self-Improvement*
- **Core idea:** Merge the **task agent** (solves problems) and the **meta agent** (improves the task agent) into a single recursive loop.
- **Key insight:** Self-improvement works best when the system can reflect on its own learning process, not just its outputs.
- **Relevance to Karen:** The metacognitive loop concept maps directly to how OpenClaw skills work — skills are essentially meta-level improvements that the agent can create and refine.

### 1.2 Darwin Gödel Machine (ICLR 2026)
- **Paper:** [OpenReview](https://openreview.net/pdf?id=pUpzQZTvGY) — *Open-Ended Evolution of Self-Improving Agents*
- **Authors:** Jenny Zhang, Shengran Hu, Cong Lu (Sakana AI / UBC / Vector Institute)
- **Core idea:** Combines evolutionary search with Gödel-style self-reference — the agent can modify its own architecture.
- **Key insight:** Open-ended evolution requires a fitness landscape that rewards *novelty* as well as performance, preventing convergence to local optima.
- **Relevance to Karen:** The novelty-seeking aspect is important — Karen should not just optimise for speed but also explore new skill patterns.

### 1.3 Hermes Agent (Nous Research, April 2026)
- **Focus:** Persistent memory + self-improving tool-use loop.
- **Key feature:** The agent diagnoses its own blind spots and builds new skills to cover them.
- **Blog:** [hermesagents.net](https://hermesagents.net/blog/hermes-self-improving-loop)
- **Relevance to Karen:** The blind-spot diagnosis loop is directly applicable — Karen could periodically review her own tool usage patterns and suggest new skills.

---

## 2. Local AI Architecture: 2026 Developments

### 2.1 Ollama 0.8.0+ (Current Status)
- **Latest stable:** 0.14.1 (as of April 2026)
- **Key improvements for local agents:**
  - **Flash Attention 2** support via `OLLAMA_FLASH_ATTENTION=1`
  - **Vulkan** backend for AMD GPUs (more stable than ROCm)
  - **Context window expansion** up to 32,768 tokens with proper tuning
  - **Dockerised deployment** now production-ready

### 2.2 TurboQuant: 3-Bit Quantization (Experimental)
- **Repo:** [Lucien2468/Ollama-TurboQuant-Integration](https://github.com/Lucien2468/Ollama-TurboQuant-Integration)
- **What it is:** Native 3-bit (TURBO) quantization integrated into Ollama/GGML
- **Benefits:**
  - ~25-28% better compression than Q4_0
  - Llama 3.2 (3B): 2.1GB → **1.6GB** VRAM
  - Llama 3.1 (8B): 5.5GB → **4.2GB** VRAM
  - Custom AVX2 CPU kernels + CUDA dp4a acceleration
- **Status:** Pre-release, experimental — not production-safe yet
- **Relevance to Karen:** With only 24GB RAM and no discrete GPU, 3-bit quant could let us run larger models (e.g., 8B comfortably, maybe 13B at a push). Worth monitoring.

### 2.3 Unsloth 2.0 GGUF Models
- **Focus:** Optimised GGUF exports with faster inference and lower memory than standard quantizations
- **Relevance to Karen:** If we ever need to fine-tune or convert models for specific tasks, Unsloth 2.0 is the path of least resistance.

### 2.4 Architecture Recommendations for Local Deployment
- **Decoder-only models** (Llama, Mistral, Qwen) dominate — best balance of capability and resource efficiency
- **Grouped-Query Attention (GQA)** or **Multi-Query Attention (MQA)** — cache fewer KV pairs, enabling larger context windows on limited hardware
- **RoPE (Rotary Position Embedding)** — enables dynamic context extension without retraining
- **Memory scaling is linear with context length** — doubling 4K→8K tokens roughly doubles KV cache requirements

---

## 3. OpenClaw & Agentic Systems: Self-Modification Patterns

### 3.1 The OpenClaw Self-Improvement Loop (April 2026)
- **Article:** [Medium — OpenClaw’s Self-Improvement Loop](https://medium.com/@chatinfo/openclaws-self-improvement-loop-letting-an-ai-change-its-own-code-under-supervision-0cf5ef76a94a)
- **Core mechanism:** Adversarial — one agent **proposes** changes, another **evaluates** them
- **Key rule:** The agent that writes the change **cannot approve it**
- **Inspiration:** Andrej Karpathy’s autoresearch concept
- **Practical workflow:**
  1. Generator analyses codebase/behaviour
  2. Generator produces proposed modification
  3. Evaluator reviews against predefined criteria
  4. System accepts or rejects
- **Relevance to Karen:** This is exactly how we should structure any self-modification — Karen proposes, KC (or Ken) evaluates. Never both in one turn.

### 3.2 OpenClaw Foundry (GitHub)
- **Repo:** [lekt9/openclaw-foundry](https://github.com/lekt9/openclaw-foundry) — 325 stars
- **Tagline:** *"The forge that forges itself. Self-writing meta-extension for OpenClaw.ai"*
- **Relevance to Karen:** Could be a source of patterns for skill auto-generation.

### 3.3 NVIDIA OpenShell (March 2026)
- **Article:** [NVIDIA Technical Blog](https://developer.nvidia.com/blog/run-autonomous-self-evolving-agents-more-safely-with-nvidia-openshell/)
- **Focus:** Safe runtime for autonomous, self-evolving agents with enterprise privacy/security
- **Relevance to Karen:** Not directly applicable (no NVIDIA GPU), but the security model (sandboxed self-modification) is worth studying.

---

## 4. Practical Upgrades for Karen (Actionable)

### Immediate (This Week)
1. **Enable Flash Attention** in Ollama:
   ```bash
   export OLLAMA_FLASH_ATTENTION=1
   ```
   This should improve context window performance without any model changes.

2. **Review current model lineup** against 2026 best practices:
   - We have qwen3.5:4b (3GB) and llama3.1:8b (5.7GB)
   - Consider whether Qwen3.5 4B is still the best lightweight option — Qwen3 series may have newer variants
   - Check if llama3.2:3b-instruct-q4_K_M would be a better balance than current qwen3.5:4b

3. **Document the adversarial self-modification rule** in AGENTS.md:
   - Karen can propose changes to her own skills/configs
   - But Ken or KC must approve before they go live
   - This prevents drift and maintains system stability

### Short-Term (Next Month)
4. **Monitor TurboQuant progress** — if it stabilises, 3-bit quant could unlock larger models on our 24GB RAM.

5. **Experiment with context window tuning** — test how far we can push Ollama context with `OLLAMA_NUM_GPU` and flash attention on our CPU-only setup.

6. **Review skill system** against OpenClaw Foundry patterns — are there auto-generation patterns we could adopt?

### Medium-Term (Next Quarter)
7. **Consider a periodic self-review cron** — Karen analyses her own memory files, tool usage patterns, and skill effectiveness, then proposes improvements.

8. **Evaluate Unsloth 2.0** if we ever need custom model conversion or fine-tuning for specific tasks.

---

## 5. Key Takeaways

| Area | 2026 Development | Karen Action |
|------|------------------|--------------|
| Self-improvement | HyperAgents, Darwin Gödel Machine, Hermes | Adopt adversarial evaluation loop |
| Local inference | Ollama 0.14.1, Flash Attention, Vulkan | Enable Flash Attention, review model lineup |
| Quantization | TurboQuant 3-bit (experimental) | Monitor for stability |
| Agent frameworks | OpenClaw self-modification patterns | Document approval rules, study Foundry |
| Memory efficiency | GQA/MQA, RoPE, decoder-only dominance | Ensure all models use modern architectures |

---

## Sources

- Meta HyperAgents: [arXiv:2603.19461](https://arxiv.org/abs/2603.19461)
- Darwin Gödel Machine: [OpenReview ICLR 2026](https://openreview.net/pdf?id=pUpzQZTvGY)
- Hermes Agent: [hermesagents.net](https://hermesagents.net/blog/hermes-self-improving-loop)
- Ollama 2026 Guide: [dasroot.net](https://dasroot.net/posts/2026/04/ollama-complete-guide-installation-management-optimization/)
- TurboQuant: [GitHub](https://github.com/Lucien2468/Ollama-TurboQuant-Integration)
- LLM Architectures for Local AI: [localaiops.com](https://localaiops.com/posts/complete-guide-to-llm-architectures-for-ollama-and-local-ai-in-2026/)
- OpenClaw Self-Improvement Loop: [Medium](https://medium.com/@chatinfo/openclaws-self-improvement-loop-letting-an-ai-change-its-own-code-under-supervision-0cf5ef76a94a)
- OpenClaw Foundry: [GitHub](https://github.com/lekt9/openclaw-foundry)
- NVIDIA OpenShell: [NVIDIA Blog](https://developer.nvidia.com/blog/run-autonomous-self-evolving-agents-more-safely-with-nvidia-openshell/)

---

*Research compiled by Karen (local agent) on 2026-04-25. Next review: 2026-05-09.*
