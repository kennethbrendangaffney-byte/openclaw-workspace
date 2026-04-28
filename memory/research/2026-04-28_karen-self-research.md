# Karen Self-Research: AI Self-Improvement & Local Agent Architecture

**Date:** 2026-04-28
**Researcher:** Karen (local agent on EVO-X2)
**Focus:** Practical upgrades for local Linux-based agents

---

## Executive Summary

The AI agent landscape in 2026 has matured significantly. Three major trends directly impact local Linux-based agents like myself:

1. **Self-improving agent architectures** are now practical, not theoretical — Reflexion, LATS, and prompt evolution (GEPA/DSPy) are production-ready patterns
2. **MCP (Model Context Protocol)** has become the de facto standard for tool integration, replacing ad-hoc approaches
3. **Local model efficiency** has improved dramatically — MoE architectures and better quantization mean more capability per GB of RAM

For my specific setup (24GB RAM, Ubuntu, Ollama, OpenClaw), there are concrete, actionable upgrades available.

---

## 1. Self-Improving AI Systems — What's Actually Working

### The Self-Improvement Loop (Now Practical)

A self-improving system needs three components:
- **Evaluation function** — scores its own output
- **Feedback mechanism** — diagnoses what went wrong
- **Update procedure** — modifies itself to perform better next time

This is no longer research fiction. The key implementations:

### Reflexion (Princeton, 2023) — Verbal Self-Critique
- After failing a task, the agent generates a natural language critique and stores it in memory
- On subsequent attempts, reads prior reflections before acting
- Improved pass rates on code generation and multi-hop QA without any parameter updates
- **For Karen:** I already have memory files. Adding a reflection step after failed tool calls or incorrect outputs is straightforward.

### LATS — Language Agent Tree Search (ICML 2024)
- Combines Monte Carlo Tree Search with LLM evaluation
- Explores multiple action paths, backtracks when paths fail
- Achieved 94.4% pass@1 on HumanEval (vs ~67% base model)
- **For Karen:** When a complex multi-step task fails, I could explore alternative tool sequences instead of giving up.

### GEPA — Reflective Prompt Evolution (ICLR 2026 Oral)
- Treats prompts as organisms that evolve through natural selection
- Samples execution trajectories, reflects on failures, proposes targeted mutations
- Outperforms reinforcement learning by 6% average, up to 20% on specific tasks
- Uses up to 35x fewer rollouts than RL approaches
- **For Karen:** My system prompts and tool descriptions could be evolved based on success/failure patterns.

### Darwin Gödel Machine (Sakana AI, 2025) — Self-Modifying Code
- Agent edits its own source code to improve performance
- Improved SWE-bench score from 20% to 50%
- **For Karen:** Too risky for now, but the concept of self-modifying skill libraries is relevant.

---

## 2. Local AI Architecture — Tools & Frameworks

### OpenClaw 2026 Updates (Directly Relevant)

OpenClaw has had significant releases through early 2026:

**v2026.3.7-beta.1** (March 2026) — Major architectural upgrade:
- **ContextEngine** — Pluggable plugin interface for context management
  - Hooks: bootstrap, ingest, assemble, compact, afterTurn, prepareSubagentSpawn
  - Allows custom RAG pipelines, summarization strategies, isolated memory spaces
- **Dual-Engine Routing** — Intelligent model fallback and retry mechanism
  - If primary model is rate-limited, automatically switches to secondary provider
  - Can chain multiple models and let agent choose best/cheapest for the job
- **Telegram topic-level agent isolation** — Run different agents in separate topics of same group
- **Persistent channel bindings** — Configs saved and restored after restart
- **200+ bug fixes** across channel connectors, core agent logic, gateway, memory, security

**v2026.3.8** — Practical upgrade guide available with breaking changes documented

**v2026.2.17** — Anthropic Claude Sonnet 4.6 support, expanded context windows

**Security note:** Some releases have addressed critical vulnerabilities (credential theft, RCE). Keeping OpenClaw updated is important.

### MCP — Model Context Protocol (The New Standard)

MCP has become the "USB-C for AI" — the standard way agents connect to tools, data, and APIs.

**2026 Roadmap priorities:**
1. **Transport Evolution** — Streamable HTTP for remote MCP servers, horizontal scaling
2. **Agent Communication** — Tasks primitive with retry semantics and expiry policies
3. **Governance Maturation** — Working Groups with delegated SEP approval
4. **Enterprise Readiness** — Audit trails, SSO auth, gateway behavior

**For Karen:** OpenClaw already supports tool calling. Understanding MCP means I can potentially integrate with a growing ecosystem of standard tools rather than custom implementations.

### Key Local AI Tools (10k+ stars each)

| Tool | Purpose | Stars |
|------|---------|-------|
| **vLLM** | High-concurrency production inference (PagedAttention) | 30k+ |
| **Ollama** | Easy local model deployment (GGUF, Modelfile) | 30k+ |
| **LiteLLM** | Universal proxy — routes OpenAI-format requests to any backend | 15k+ |
| **CrewAI** | Multi-agent orchestration with role-playing | 25k+ |
| **Continue.dev** | Offline IDE extension (replaces Copilot) | 20k+ |
| **Qdrant** | Rust-based vector DB for agent memory | 20k+ |
| **AnythingLLM** | Full-stack RAG desktop app | 25k+ |
| **Promptfoo** | Prompt evaluation and regression testing | 10k+ |

---

## 3. Local Models — What Fits My Hardware

### My Specs
- **RAM:** 24GB
- **Current models:** qwen3.5:4b (3GB), llama3.1:8b (5.7GB), nomic-embed-text (274MB)
- **BitNet:** 2B model at 1.1GB RAM, 27 t/s

### 2026 Model Landscape

**Key developments:**
- HuggingFace integrated GGML quantized models directly into Transformers library
- MoE (Mixture-of-Experts) went mainstream — large total params, small active params
- Q4_K_M and Q5_K_M quantization preserves 95-98% of full-precision quality
- Apple Silicon now supports 128-192GB unified memory (not relevant for me, but shows trend)

**Models worth considering for 24GB RAM:**

| Model | Total Params | Active Params | Min RAM | Notes |
|-------|-------------|---------------|---------|-------|
| Qwen 3.5 4B | 4.7B | 4.7B | 3GB | Already running — fast general tasks |
| Qwen 3.5 9B | 9B | 9B | 6GB | Could add for better reasoning |
| Mistral Small 4 | 119B | 24B (MoE) | ~12GB | Cloud-competitive quality |
| Llama 3.3 8B | 8B | 8B | 5.7GB | Already running — quality reasoning |
| Phi-4 Mini | ~4B | ~4B | ~3GB | Good for coding tasks |
| Nemotron Nano 4B | 4B | 4B | ~3GB | Edge-optimized, very efficient |
| DeepSeek R1 (distilled) | 7B | 7B | ~5GB | Strong reasoning, coding |

**Recommendation:** With 24GB RAM, I could comfortably run:
- qwen3.5:4b for fast tasks
- llama3.1:8b for quality reasoning
- A 7B distilled reasoning model (DeepSeek R1 or similar) for complex analysis
- nomic-embed-text for embeddings
- Total: ~15-18GB, leaving headroom for OS and other processes

---

## 4. Agentic Workflow Patterns for 2026

### The ReAct Pattern (Still Foundational)

```
Perceive → Think → Act → Observe → Reflect
```

This loop, with explicit reasoning steps, remains the core pattern. In 2026, frameworks have standardized on it.

### Multi-Agent Orchestration

- **CrewAI** — Role-based agents ("Senior Researcher", "Tech Writer") with automatic task delegation
- **LangGraph** — Graph-based workflows with state management
- **OpenClaw sub-agents** — Already available via `sessions_spawn`

### Memory Systems

Every production agent needs:
1. **Short-term** — Conversation history within current session
2. **Long-term** — Vector store for semantic retrieval (Qdrant, Chroma)
3. **Episodic** — Specific experiences with reflections (my daily memory files)

---

## 5. Actionable Recommendations for Karen

### Immediate (This Week)

1. **Update OpenClaw** — Check current version against 2026.3.7+ releases
   - ContextEngine could improve my memory/context management
   - Model fallback would make me more resilient if kimi k2p5 is unavailable
   - Security patches are important

2. **Add a reflection step** — After failed tool calls or incorrect outputs:
   - Log what went wrong
   - Store in memory with the failure context
   - Reference on similar future tasks

3. **Evaluate additional local models** — Test if DeepSeek R1 7B or Phi-4 Mini fit my use cases better than current lineup

### Short-Term (This Month)

4. **Implement LATS-style retry** — For multi-step tasks:
   - If step N fails, don't abort — try alternative tools or approaches
   - Track which alternatives worked for future reference

5. **Explore MCP integration** — Understand what MCP servers exist for my common tools (file system, web search, code execution)

6. **Add prompt evaluation** — Use success/failure data to evolve system prompts (GEPA-style, lightweight)

### Medium-Term (This Quarter)

7. **Multi-agent workflows** — Use `sessions_spawn` more strategically:
   - Research agent for web searches
   - Coding agent for file edits
   - Review agent for checking work
   - Orchestrate results

8. **Vector memory upgrade** — Consider Qdrant or Chroma for semantic memory retrieval beyond simple file-based storage

9. **Model routing** — Configure automatic fallback from kimi k2p5 → llama3.1:8b → qwen3.5:4b based on task complexity and availability

---

## 6. Key Resources

- [MorphLLM: Self-Improving AI Guide](https://www.morphllm.com/self-improving-ai) — Comprehensive taxonomy
- [Agentic Workflows 2026 Guide](https://martinuke0.github.io/posts/2026-03-03-agentic-workflows-in-2026-a-zero-to-hero-guide-to-building-autonomous-ai-systems/) — Practical implementation
- [MCP 2026 Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/) — Protocol evolution
- [OpenClaw v2026.3.7 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.3.7-beta.1) — ContextEngine details
- [Local AI Models 2026 Guide](https://www.aimagicx.com/blog/local-ai-models-2026-qwen-mistral-llama-hardware-guide) — Hardware-specific recommendations

---

## Notes

- Research conducted via web search and article fetching
- Focused on practical, implementable improvements for my specific setup
- Avoided theoretical/research-only approaches
- Prioritized security and stability (OpenClaw updates, MCP standardization)

---

*Next review: Revisit in 2-4 weeks to assess which recommendations have been implemented and what's changed in the landscape.*
