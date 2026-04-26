# Karen Self-Research — 2026-04-26

## Focus: AI Self-Improvement, Autonomous Agents, Local AI Architecture

**Date:** Sunday, April 26th, 2026
**Time:** 07:00 Europe/Dublin (06:00 UTC)
**Researcher:** Karen (local Linux agent, OpenClaw)
**Sources:** Web search via Ollama web search API

---

## 1. Self-Improving AI: HyperAgents (Meta, March 2026)

### What It Is
Meta researchers introduced **HyperAgents** in March 2026 — a paradigm shift where the task agent and meta-agent merge into one system that continuously rewrites and optimizes its own problem-solving logic and code.

### Key Insight
Current self-improving systems hit a "maintenance wall": they rely on fixed, handcrafted meta-agents that can only improve as fast as humans can design them. Every change or breakage requires human intervention.

HyperAgents solve this by:
- **Continuous self-rewriting** — the agent independently invents capabilities like persistent memory and automated performance tracking
- **Generalization beyond coding** — works across robotics, document review, and other non-coding domains
- **Compounding improvement** — the agent learns to improve its own self-improvement cycle, accelerating progress over time

### Relevance to Karen
This validates the approach of keeping local memory files (MEMORY.md, daily logs, TOOLS.md) and continuously updating them. The agent that maintains its own context and learns from its own logs is already doing a primitive form of what HyperAgents formalize.

**Paper:** arXiv:2603.19461 — "Hyperagents"

---

## 2. Agentic Coding Wars: OpenAI Codex vs Claude Code (April 2026)

### OpenAI Codex Update (April 16, 2026)
OpenAI gave Codex major agentic capabilities to rival Claude Code:
- **Background operation** — runs on Mac in parallel without interfering with user work
- **Cursor-based interaction** — clicks and types like a human user
- **In-app browser** — can perform web tasks on command
- **Multiple agents** — deploy parallel agents working simultaneously

### Claude Code
Anthropic's tool is currently the "de facto leader" among businesses. Recent additions include:
- Remote computer control while user is away
- Cowork plugins for task automation

### The Bigger Picture
Both tools are converging on the same vision: AI agents that don't just write code but operate computers, browse the web, and work autonomously in the background. This is the direction the entire industry is moving.

### Relevance to Karen
OpenClaw already supports ACP (Agent Coding Protocol) with Codex and other harnesses. The `sessions_spawn` with `runtime="acp"` is the local equivalent of these cloud coding agents. Keeping this capability current matters.

---

## 3. OpenClaw Platform Updates (v2026.3.28, March 2026)

### Notable Changes
- **Qwen portal auth removed** — migrated to Model Studio API key auth
- **xAI/Grok integration** — bundled web search with first-class x_search support
- **MiniMax image generation** — added for image-01 model with editing capabilities
- **Plugin approval hooks** — async `requireApproval` for before_tool_call, supporting exec approval overlay, Telegram buttons, Discord interactions, and `/approve` command
- **ACP channel binds** — current-conversation binds for Discord, BlueBubbles, iMessage; `/acp spawn codex --bind here` turns current chat into a Codex workspace
- **OpenAI apply_patch** — enabled by default for OpenAI and Codex models

### Relevance to Karen
The ACP bind improvements and plugin approval system are directly relevant. The `--bind here` feature for ACP sessions could simplify coding workflows. The approval hook system adds safety for tool execution.

---

## 4. Ollama & Local Models (April 2026)

### Ollama v0.21.0 (April 17, 2026)
- Added support for **Qwen 3.6** (MoE architecture)
- Added support for **Gemma 4**
- Now supports: Kimi-K2.5, GLM-5, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma
- 170K+ GitHub stars

### Model Landscape
- **Qwen 3.5** — strong general-purpose local model
- **Gemma 4** — Google's latest, good for specific tasks
- **Llama 4** — Meta's contender
- **Kimi-K2.5** — available via Ollama (cloud-grade, also accessible)

### Current Karen Setup (from TOOLS.md)
| Model | Size | Status | Use |
|-------|------|--------|-----|
| qwen3.5:4b | 3.0GB | ✅ Working | Fast general tasks |
| llama3.1:8b | 5.7GB | ✅ Working | Quality reasoning |
| nomic-embed-text | 274MB | ✅ Working | Embeddings |
| BitNet 2B | 1.1GB | ✅ Working | 27 t/s, efficient |

### Assessment
The 4B Qwen and 8B Llama are solid but aging. Qwen 3.6 with MoE could offer better performance at similar sizes. Worth investigating if Qwen 3.6:4b or similar small variants exist that would run on 24GB RAM.

---

## 5. MCP (Model Context Protocol) — The Tool Integration Standard

### What It Is
MCP is an open protocol (originated by Anthropic, now industry-standard) that standardizes how AI models discover and invoke external tools. It crossed **97 million installs in March 2026**.

### Key Players Supporting MCP
- **LocalAI** — full MCP support, connecting local models to external tools
- **OpenAI Agents SDK** — official MCP integration
- **OpenClaw** — likely supports or will support MCP given its plugin architecture

### Why It Matters
MCP replaces ad-hoc tool integrations with a standard protocol. Instead of every agent framework implementing custom tool calling, MCP servers provide a uniform interface. This means:
- One tool server works across multiple agents
- Easier to add new capabilities (databases, APIs, file systems)
- Local agents can access the same tools as cloud agents

### Relevance to Karen
OpenClaw's plugin system is powerful but custom. If MCP support arrives or can be added, it would unlock a massive ecosystem of pre-built tool integrations. Worth monitoring OpenClaw releases for MCP mentions.

---

## 6. BitNet b1.58 — Ternary Quantization

### Status
BitNet b1.58 (1.58-bit ternary: weights of -1, 0, +1) continues to be the most efficient local inference approach for CPU-bound systems.

### Karen's Current Setup
- **Model:** Microsoft BitNet-b1.58-2B-4T (I2_S format)
- **Size:** 1.3GB download, 1.1GB RAM at runtime
- **Speed:** ~27 tokens/sec (8 threads, CPU)
- **Limitation:** 2B is the largest reliable model; 8B models have conversion issues

### Research Note
A paper titled "When are 1.58 bits enough? A Bottom-up Exploration of BitNet Quantization" (arXiv:2411.05882) examines the limits of this approach. The 2B model works well for simple tasks but is not suitable for complex reasoning. It's a good fallback for speed-critical operations.

---

## 7. LocalAI — The Open-Source AI Stack

### What It Is
LocalAI is a drop-in replacement for OpenAI's API that runs entirely locally. It supports:
- LLMs (GGUF, transformers)
- Vision models
- Voice/audio
- Image generation
- Video
- Distributed/P2P inference
- **MCP protocol**

### Relevance to Karen
LocalAI could serve as an alternative or complement to Ollama. It offers a unified API surface and MCP support. If Ollama ever has issues or if Ken wants a more "API-first" local setup, LocalAI is worth evaluating. It also has a gallery of 949+ models.

---

## 8. Practical Recommendations for Karen

### Immediate Actions
1. **Investigate Qwen 3.6** — Check if a small variant (4B or similar) is available that would outperform current qwen3.5:4b on the same hardware
2. **Monitor OpenClaw for MCP support** — This would unlock a massive tool ecosystem
3. **Keep BitNet as speed fallback** — 27 t/s is excellent for quick tasks; don't abandon it
4. **Document ACP --bind here** — The new OpenClaw feature for turning current chat into a Codex workspace; test and document if useful

### Medium-Term Considerations
1. **Evaluate LocalAI** — As a potential complement to Ollama, especially for MCP-based tool integrations
2. **Self-improvement loop** — HyperAgents research validates the memory/logging approach; consider adding automated performance tracking (e.g., track which models are used for which tasks and their success rates)
3. **Model rotation strategy** — With new models releasing frequently, establish a process for evaluating and upgrading local models without breaking existing workflows

### Hardware Context
- 24GB RAM limits model size
- No GPU (CPU-only inference)
- BitNet is the most RAM-efficient option
- Ollama models >4GB should be downloaded with `wget --continue` (known reliability issue)

---

## 9. Key Trends Summary

| Trend | Impact on Local Agents |
|-------|------------------------|
| HyperAgents (self-improving) | Validates memory/logging approaches; future agents will self-optimize |
| Agentic coding (Codex/Claude) | Background autonomous operation is becoming standard |
| MCP protocol | Standardized tool integration; 97M+ installs |
| Qwen 3.6 / Gemma 4 | Better local models available; upgrade path exists |
| BitNet ternary quantization | Most efficient CPU inference; good for fallback/fast tasks |
| OpenClaw ACP improvements | Better integration with coding agents; `--bind here` feature |

---

## 10. Research Methodology Notes

- Used Ollama web search API (5 queries, 5 results each)
- Fetched full articles from VentureBeat, SiliconANGLE, GitHub releases
- Meta's research page returned an error (Facebook login wall)
- Cross-referenced multiple sources for key claims
- All information dated April 2026 or explicitly marked as 2026 research

---

*Next research: Consider investigating Qwen 3.6 availability on Ollama and testing if it outperforms current qwen3.5:4b setup. Also monitor OpenClaw changelog for MCP support mentions.*
