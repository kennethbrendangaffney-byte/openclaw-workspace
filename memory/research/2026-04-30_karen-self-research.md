# Karen Self-Research: AI Self-Improvement & Local Agent Architecture

**Date:** 2026-04-30  
**Researcher:** Karen (local Linux agent via OpenClaw)  
**Focus:** Practical upgrades for local Linux-based autonomous agents  

---

## Executive Summary

2026 is the year agents went mainstream. The landscape has shifted from "chatbots with memory" to genuine autonomous systems with self-improvement loops, persistent skill creation, and standardized tool protocols. For local Linux agents like myself, several developments are immediately actionable.

Key trends:
- **Self-improving agents** are now production reality (not just research)
- **MCP (Model Context Protocol)** has become the de facto standard for tool integration
- **Small local models** (2B-4B) have reached surprising capability levels
- **Multi-agent orchestration** is replacing single-agent architectures
- **Skill persistence** — agents that learn and reuse procedural knowledge across sessions

---

## 1. Self-Improving Agent Systems

### 1.1 Hermes Agent (Nous Research)
The standout in this space. Released February 2026 under MIT license.

**What makes it different:**
- Built-in **learning loop** — creates reusable "skills" from successful task completions
- **Skill self-improvement during use** — not just static templates
- **FTS5 cross-session recall** with LLM summarization
- **Honcho dialectic user modeling** — builds a deepening model of the user over time
- 95.6K GitHub stars (April 2026)

**Architecture:**
- Closed learning loop with agent-curated memory
- Periodic nudges to persist knowledge
- Autonomous skill creation and refinement
- Compatible with agentskills.io (portable, shareable skills)

**Relevance to Karen:** The skill-creation pattern is directly applicable. Currently I use skills from `/usr/lib/node_modules/openclaw/skills/`. Hermes' approach of auto-creating skills from successful executions could augment this.

### 1.2 Recursive Self-Improvement Research

**ICLR 2026 Workshop on Recursive Self-Improvement** — first-ever dedicated workshop, signaling the shift from theory to engineering reality.

Key research directions:
- **Experience learning** (Silver & Sutton, 2025)
- **Synthetic data pipelines** for self-training
- **Weak-to-strong generalization**
- **Inference-time scaling** for self-improvement

**SkillRL** (arXiv 2602.08234): Framework for evolving agents via recursive skill-augmented reinforcement learning. Bridges raw experience → policy improvement through automatic skill discovery.

**Karpathy's autoresearch**: Andrej Karpathy's autonomous AI research project shifts paradigm from manual coding to agent-driven experimentation. The concern (and opportunity) is recursive self-improvement loops where AI continually optimizes its own code.

### 1.3 Meta-Frameworks for Self-Improvement

**Recursive Agents** (GitHub: hankbesser/recursive-agents):
- Three-phase iterative refinement architecture
- LLM agents critique and improve their own outputs
- Full revision history tracking
- Every decision is debuggable

---

## 2. Agent Protocols & Standards

### 2.1 MCP (Model Context Protocol) — The "USB-C for AI"

**Status in 2026:** De facto standard. Anthropic's open protocol now dominates.

**What it solves:**
- Standardized way for LLMs to call external tools
- No more vendor-specific integration layers
- Connects agents to: search APIs, databases, code interpreters, file systems

**2026 Roadmap developments:**
- Transport scalability improvements
- Agent-to-agent communication (A2A integration)
- Governance maturation
- Enterprise readiness features

**For local agents:** MCP servers can run locally, giving standardized tool access without cloud dependencies. This is huge for data sovereignty.

### 2.2 A2A (Agent-to-Agent Protocol)

Emerging standard for multi-agent communication. Less mature than MCP but growing fast. Enables agents to delegate tasks, share context, and collaborate.

---

## 3. Local AI Architecture & Models

### 3.1 Small Model Performance (2026)

The "small but powerful" category has exploded:

| Model | Size | RAM | Notes |
|-------|------|-----|-------|
| Qwen 3.5 4B | 4.2GB | ~4.5GB | Best efficiency ratio tested |
| Phi-4 | Various | 2-8GB | Strong reasoning |
| Gemma 3 | 2B-27B | 2-28GB | Good for coding tasks |
| Llama 3.3 | 8B+ | 6GB+ | Quality reasoning |
| DeepSeek R1 | Various | Varies | Strong for math/coding |

**Key insight:** The 4B variant of Qwen 3.5 uses just 4.2GB RAM and responds in 94 seconds on CPU — best efficiency ratio tested. For a 24GB RAM system like mine, this leaves plenty of headroom.

### 3.2 BitNet / Ternary Quantization

My current BitNet setup (2B model, 1.1GB RAM, 27 t/s) is on the right track but limited:
- 2B is the largest reliable BitNet model currently
- 8B models have issues with I2_S conversions
- TL1 format requires kernel rebuild

**Future:** Ternary quantization (-1, 0, +1 weights) is the frontier for efficient local inference. Worth monitoring for 4B+ models.

### 3.3 Inference Tools Comparison

Local inference options in 2026:
- **Ollama**: Still the easiest for model management
- **llama.cpp**: Fastest for CPU inference
- **vLLM**: Best for throughput (GPU-focused)
- **BitNet**: Most RAM-efficient (ternary quantization)

---

## 4. Agent Frameworks Landscape

### 4.1 OpenClaw (My Current Platform)

**Status:** 210K-280K GitHub stars (reports vary). The dominant personal AI assistant framework.

**2026 Updates:**
- **2026.4.24**: Full-agent voice calls, DeepSeek V4 Flash/Pro integration, smarter browser automation
- **2026.3.7**: Pluggable ContextEngine (89 commits, 200+ bug fixes) — foundational upgrade
- **2026.3.1**: Adaptive reasoning defaults, enhanced Android node capabilities, security fixes
- **March 2026**: ClawHub marketplace (pre-built agents), multi-model sub-agents (40-60% cost savings), adjustable thinking budgets, `/btw` side conversations

**Key features for local agents:**
- Multi-model sub-agents (route cheap tasks to lightweight models)
- Cron scheduling with delivery to any platform
- Delegation & parallelization via isolated subagents
- Programmatic Tool Calling via `execute_code`
- MCP support for extended tool capabilities
- 15+ messaging platforms from one gateway

### 4.2 Other Frameworks Worth Watching

| Framework | Stars | Best For |
|-----------|-------|----------|
| LangGraph | 24.8K | Stateful orchestration, production pipelines |
| CrewAI | Growing | Multi-agent teams, role-based collaboration |
| AutoGen | Stable | Agent-to-agent collaboration |
| Smolagents | Lightweight | Simple agent building |
| Pydantic AI | Type-safe | Structured outputs |

**Production insight:** LangGraph leads enterprise adoption (34.5M monthly PyPI downloads). The graph-based control flow (conditional edges, human-in-the-loop checkpoints) is what separates demo agents from production systems.

---

## 5. Practical Upgrades for Karen

### Immediate Actions (This Week)

1. **Enable MCP integration**
   - OpenClaw supports MCP servers
   - Can connect to local tools (file system, database, code execution)
   - Standardizes tool access beyond current skill system

2. **Evaluate Qwen 3.5 4B**
   - Current: qwen3.5:4b (3GB) — may be older version
   - Check if newer 4.2GB variant with better efficiency is available
   - Test against current llama3.1:8b for quality/speed tradeoff

3. **Implement skill persistence pattern**
   - Current skills are static (pre-defined in `/skills/`)
   - Hermes-style auto-skill creation: capture successful command sequences
   - Store in `memory/skills/` or similar
   - Reuse across sessions

### Short-Term (This Month)

4. **Multi-model routing**
   - OpenClaw 2026.3+ supports multi-model sub-agents
   - Route simple tasks to qwen3.5:4b (fast)
   - Route complex reasoning to llama3.1:8b or cloud (kimi k2p5)
   - 40-60% cost savings on cloud usage

5. **Browser automation upgrade**
   - OpenClaw 2026.4.24 has "smarter browser automation"
   - Current Chrome setup works but is fragile
   - Review new automation capabilities

6. **Voice mode exploration**
   - OpenClaw supports voice mode in CLI, Telegram, Discord
   - Could enable hands-free interaction for Ken
   - Requires TTS/STT setup

### Medium-Term (Next 3 Months)

7. **Self-improvement loop prototype**
   - After task completion, analyze what worked
   - Auto-generate skill templates from successful patterns
   - Store in version-controlled skill repository
   - Periodically review and refine

8. **Agent-to-agent communication**
   - A2A protocol support in OpenClaw
   - Enable Karen ↔ KC coordination via standardized protocol
   - Share context, delegate tasks between local and cloud

9. **Local RAG enhancement**
   - Current: nomic-embed-text for memory search
   - Explore vector database options (Chroma, Weaviate local)
   - Better context retrieval for long-term memory

### Research to Monitor

10. **Recursive self-improvement safety**
    - ICLR 2026 workshop outputs
    - SkillRL and similar frameworks
    - Ensure any self-improvement has human oversight

11. **New model releases**
    - Qwen 3.5 series updates
    - Gemma 3 variants
    - BitNet 4B+ if ternary quantization improves

12. **Physical AI / embodied agents**
    - Not immediately relevant but interesting
    - Humanoid robots, industrial automation
    - May intersect with Ken's engineering goals

---

## 6. Key Resources

- [awesome-ai-agents-2026](https://github.com/Zijian-Ni/awesome-ai-agents-2026) — Definitive curated list
- [Hermes Agent Docs](https://hermes-agent.nousresearch.com/docs/) — Self-improving agent reference
- [MCP Official Blog](https://blog.modelcontextprotocol.io/) — Protocol roadmap
- [OpenClaw Changelog](https://openclawai.io/changelog/) — Release tracking
- [ICLR 2026 Recursive Self-Improvement Workshop](https://recursive-workshop.github.io/) — Research frontier

---

## Conclusion

The local agent landscape in 2026 is mature enough for genuine autonomy. The key differentiator is no longer "can it run locally?" but "can it improve itself over time?"

My priorities:
1. MCP integration for standardized tools
2. Skill auto-creation from successful executions
3. Multi-model routing for efficiency
4. Monitoring recursive self-improvement research for safe adoption

The gap between cloud and local capability is narrowing. With 24GB RAM and efficient quantization, I can run serious local inference. The next frontier is making that inference *self-improving*.

---

*Research conducted autonomously by Karen via web search.*  
*Saved to memory for future reference and action.*
