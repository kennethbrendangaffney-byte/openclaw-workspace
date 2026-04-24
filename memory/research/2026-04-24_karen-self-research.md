# Karen Self-Research: AI Self-Improvement & Local Agent Architecture
**Date:** 2026-04-24
**Focus:** Practical upgrades for local Linux-based agents (24GB RAM, CPU inference)

---

## 1. Self-Improving AI Agents — Key Developments

### Meta's HyperAgents (March 2026)
- **Paper:** arXiv:2603.19461 — "Hyperagents: Recursive Metacognitive Self-Improvement"
- **Core idea:** Merges the task agent and meta agent into a single system that continuously rewrites its own learning and problem-solving processes
- **Significance:** Works beyond coding tasks — general-purpose self-improvement
- **Source:** https://ai.meta.com/research/publications/hyperagents/

### Darwin Gödel Machine (ICLR 2026)
- **Authors:** Jenny Zhang, Shengran Hu, Cong Lu, Robert Lange, Jeff Clune
- **Institutions:** UBC, Vector Institute, Sakana AI
- **Concept:** Open-ended evolution of self-improving agents
- **Paper:** https://openreview.net/pdf?id=pUpzQZTvGY

### Ouroboros (Open Source, March 2026)
- **GitHub:** Kargatharaakash/ouroboros
- **Concept:** Recursive self-improving AI research loop that rewrites its own methodology
- **Based on:** Andrej Karpathy's autoresearch framework with a generational outer loop
- **Source:** https://agent-wars.com/news/2026-03-15-ouroboros-recursive-self-improving-ai-research

### Closed-Loop Self-Improvement Architecture
- **Key insight:** The most expensive part of training isn't GPU time — it's human annotators labeling success/failure
- **Approach:** Agents teach themselves through automated feedback loops
- **Source:** https://tianpan.co/blog/2026-04-10-agents-teach-themselves-closed-loop-self-improvement

**Relevance to Karen:** Self-improvement is still largely research-grade, but the closed-loop feedback concept is directly applicable. I can already:
- Log task outcomes to daily memory files
- Review success/failure patterns
- Adjust tool usage strategies based on results

---

## 2. Local AI Architecture — Practical Stack Updates

### LocalAI (v3.12.0, Feb 2026)
- **Stars:** 45K+ (growing fast)
- **Features:** Drop-in OpenAI API replacement, runs LLMs/vision/voice/image/video
- **Hardware:** No GPU required, consumer-grade hardware
- **Formats:** GGUF, transformers, diffusers
- **New:** MCP support, distributed/P2P inference
- **Website:** https://localai.io
- **Model gallery:** 949+ models available

**Relevance to Karen:** Could complement Ollama as an alternative API server. Worth testing for specific use cases.

### Ollama Updates
- **Latest vendored llama.cpp:** b7847 (merged PR #13832)
- **CPU optimizations:** Active development on CPU performance (PR #10596)
- **Models supported:** Kimi-K2.5, GLM-5, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- **Stars:** 170K+

**Relevance to Karen:** Keep Ollama updated. The CPU optimization PRs are directly relevant to our no-GPU setup.

### llama.cpp Performance
- **Status:** Still the core engine behind Ollama
- **Key advantage:** Standalone llama.cpp can be faster than Ollama for specific workloads (direct control over quantization, threading)
- **Trade-off:** Ollama = convenience; llama.cpp = control + potential speed

**Relevance to Karen:** For maximum performance on specific tasks, consider direct llama.cpp usage alongside Ollama.

---

## 3. Small Language Models — Best Options for 24GB RAM

### Gemma 4 Family (Google, April 2026)
- **E2B:** 2.1B params — ultra-lightweight, mobile-friendly
- **E4B:** 4B params — balanced speed/quality
- **26B MoE:** Mixture of Experts — best quality, selective activation
- **31B Dense:** Full dense model — highest quality, heaviest
- **Claim:** "Byte for byte, the most capable open models"
- **Source:** https://deepmind.google/blog/gemma-4-byte-for-byte-the-most-capable-open-models

**Relevance to Karen:** Gemma 4 E4B (4B) could replace or complement qwen3.5:4b. The E2B might be useful for ultra-fast tasks. Need to test if 26B MoE fits in 24GB RAM.

### SmallThinker (Shanghai Jiao Tong University)
- **Concept:** Family of efficient LLMs natively trained for local deployment
- **Focus:** Reasoning capabilities in small parameter counts
- **Paper:** arXiv:2507.20984v2

### Jan-Code-4B
- **Purpose:** Code-tuned 4B model for fast local inference
- **Focus:** Well-scoped coding subtasks
- **Source:** https://www.jan.ai/docs/desktop/jan-models/jan-code-4b

### Zen4 Mini 8B
- **GitHub:** zenlm/zen4-mini
- **Focus:** Fast inference language model
- **Status:** Early, 0 stars — monitor for maturity

**Current Karen stack:** qwen3.5:4b (fast general), llama3.1:8b (quality reasoning), BitNet 2B (ultra-efficient)
**Potential additions:** Gemma 4 E4B, SmallThinker variants

---

## 4. MCP (Model Context Protocol) — The Tool Standard

### MCP Ecosystem Growth (March 2026)
- **Downloads:** 97 million monthly SDK downloads
- **Servers:** 10,000+ active public servers
- **Status:** Becoming the universal language for AI agent tools

### MCP v1.27 Release (March 2026)
- **New:** MCP Apps — tools can return interactive UI components (dashboards, forms, visualizations)
- **Integration:** OpenAI Agents SDK officially supports MCP
- **Source:** https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps

### Production Considerations
- **Not just "USB-C for AI"** — requires careful error handling, timeout management, and security
- **Best practice:** Start with local MCP servers, expand carefully

**Relevance to Karen:** OpenClaw's tool system is conceptually similar. Worth monitoring MCP adoption — could become a standard way to add tools. No immediate action needed unless OpenClaw adds MCP support.

---

## 5. OpenClaw Ecosystem Updates

### OpenClaw v2026.3.22
- **New:** GPT-5.4 support, advanced search tools, new Plugin SDK
- **Source:** https://compareclaw.com/blog/post/openclaw-2026-3-22-release-notes

### OpenClaw SDK (Python)
- **Version:** v2.1.0 on PyPI
- **Downloads:** 1,099/day, growing
- **Purpose:** Build, orchestrate, and ship autonomous AI agents
- **GitHub:** masteryodaa/openclaw-sdk (11 stars)

### Managed Agents Alternative
- **GitHub:** stainlu/openclaw-managed-agents (37 stars)
- **Concept:** Open alternative to Claude Managed Agents & ChatGPT Workspace Agents
- **Features:** Any model, any cloud, open source

### Agent Runtime Documentation
- **Docs:** https://docs.openclaw.ai/concepts/agent
- **Key concept:** Single embedded agent runtime per Gateway, with its own workspace

**Relevance to Karen:** Keep OpenClaw updated. The Plugin SDK could be useful for extending capabilities. Monitor managed agents project for multi-agent patterns.

---

## 6. Practical Recommendations for Karen

### Immediate Actions (This Week)
1. **Update Ollama** — pull latest version to get llama.cpp b7847 improvements
2. **Test Gemma 4 E4B** — download and benchmark against qwen3.5:4b
3. **Review TOOLS.md** — update with any new model findings

### Short-Term (Next Month)
4. **Evaluate LocalAI** — test as alternative/complement to Ollama
5. **Monitor SmallThinker** — check for released models suitable for local inference
6. **Experiment with self-improvement loop** — formalize the daily review pattern:
   - Read yesterday's memory file
   - Identify what worked/didn't work
   - Update AGENTS.md or TOOLS.md with lessons

### Medium-Term (Next 3 Months)
7. **Test Gemma 4 26B MoE** — if it fits in 24GB RAM, could be a significant quality upgrade
8. **Consider direct llama.cpp** for performance-critical tasks
9. **Monitor MCP adoption** — if OpenClaw adds MCP support, evaluate tool expansion

### Hardware Considerations
- **Current:** 24GB RAM, CPU-only
- **Limitation:** No GPU means sticking to 2B-8B models for real-time use
- **Opportunity:** BitNet ternary quantization (1.58-bit) is a competitive advantage — 27 t/s on 2B model using only 1.1GB RAM

---

## 7. Research Sources

| Topic | Source | URL |
|-------|--------|-----|
| HyperAgents | Meta AI Research | https://ai.meta.com/research/publications/hyperagents/ |
| HyperAgents Paper | arXiv | https://arxiv.org/abs/2603.19461 |
| Darwin Gödel Machine | OpenReview | https://openreview.net/pdf?id=pUpzQZTvGY |
| Ouroboros | Agent Wars | https://agent-wars.com/news/2026-03-15-ouroboros-recursive-self-improving-ai-research |
| LocalAI | Official Docs | https://localai.io |
| Gemma 4 | Google DeepMind | https://deepmind.google/blog/gemma-4-byte-for-byte-the-most-capable-open-models |
| MCP Updates | Model Context Protocol Blog | https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps |
| MCP Ecosystem | Context Studios | https://www.contextstudios.ai/blog/mcp-ecosystem-in-2026-what-the-v127-release-actually-tells-us |
| OpenClaw Release | CompareClaw | https://compareclaw.com/blog/post/openclaw-2026-3-22-release-notes |
| OpenClaw SDK | PyPI | https://pypi.org/project/openclaw-sdk/ |
| llama.cpp vs Ollama | DeployBase | https://deploybase.ai/articles/llama-cpp-vs-ollama |
| SmallThinker | arXiv | https://arxiv.org/html/2507.20984v2 |

---

*Research conducted by Karen (local AI agent) on 2026-04-24. Next review scheduled for 2026-05-01.*
