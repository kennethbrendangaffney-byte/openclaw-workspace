# Hermes Agent — Deep Dive

## What It Is

Hermes Agent is an **open-source, self-improving AI agent** built by **Nous Research** (the lab behind the Hermes, Nomos, and Psyche model families). Launched February 2026, MIT licensed, ~87K GitHub stars as of late April 2026.

It's **not** a chatbot wrapper or IDE plugin. It's a persistent, self-hosted agent that:
- Lives on your server ($5 VPS to GPU cluster)
- Remembers what it learns across sessions
- Builds reusable **skills** from completed tasks
- Connects via Telegram, Discord, Slack, WhatsApp, Signal, email, CLI
- Works with any LLM provider (OpenAI, Anthropic, OpenRouter, Nous Portal, local models, etc.)

## The Core Problem It Solves

Every agent you've used (Claude Code, Codex, OpenClaw) is **stateless by default**. Session ends → memory resets. You have to re-explain your project, your preferences, the edge cases every single time.

Workarounds exist (CONTEXT.md, memory files), but the deeper problem is: **the agent doesn't retain what worked**. You teach it a deployment fix on Monday, it tries a different (wrong) approach on Wednesday.

Hermes fixes this with a **closed learning loop**.

## The Learning Loop (4 Stages)

After every non-trivial task (5+ tool calls, error recovery, non-obvious workflow):

1. **Execute** — Agent receives task, decomposes, selects tools, runs.
2. **Evaluate** — Checks outcome. Did it succeed? Did user accept or correct? Builds signal from *your* behavior, not just self-assessment.
3. **Extract** — If the approach is worth keeping, it distills the successful workflow into a reusable format.
4. **Store** — Writes a **skill file** — not a log, but a reusable instruction set for future sessions.

## The Three-Layer Memory System

1. **Working Memory** — Current session context, tool outputs, active plan.
2. **Persistent Memory** — Agent-curated facts, user preferences, project details. Saved across sessions with periodic "nudges" to persist important info.
3. **Procedural Memory (Skills)** — Reusable workflows the agent created itself. Self-improves during use.

## Skills System

- **Autonomous creation** — After complex tasks, agent writes skill files automatically
- **Self-improvement** — Skills get refined during reuse based on success/failure
- **Portable** — Compatible with `agentskills.io` open standard
- **Community hub** — Share and download skills from the Skills Hub
- **67+ built-in tools** — Web search, file ops, code execution, image gen, voice, etc.

## How to Use It

### Installation (60 seconds)
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes  # start chatting
```

Works on Linux, macOS, WSL2, Android (Termux). Windows = WSL2 only.

### Key Commands
| Command | What it does |
|---------|-------------|
| `hermes` | Start interactive CLI |
| `hermes model` | Choose LLM provider/model |
| `hermes tools` | Enable/disable tools |
| `hermes gateway` | Start messaging gateway (Telegram, Discord, etc.) |
| `hermes setup` | Full setup wizard |
| `hermes claw migrate` | Migrate from OpenClaw |
| `hermes update` | Update to latest |

### Running It
- **CLI mode** — Direct terminal interaction with full TUI (multiline editing, slash commands, history)
- **Gateway mode** — Background process, talk via messaging apps
- **Serverless** — Daytona/Modal backends hibernate when idle, cost nearly nothing

## Multi-Platform Support

15+ platforms from one gateway: Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Mattermost, Email, SMS, DingTalk, Feishu, WeCom, BlueBubbles, Home Assistant.

Voice support in CLI, Telegram, Discord, Discord VC.

## Model Agnostic

Switch models with `hermes model`. Supports:
- Nous Portal
- OpenRouter (200+ models)
- NVIDIA NIM
- Xiaomi MiMo
- z.ai/GLM
- Kimi/Moonshot
- MiniMax
- Hugging Face
- OpenAI
- Your own endpoint

## Security

- Command approval system
- Container isolation
- Authorization levels
- Safe by default

## Hermes vs OpenClaw

| | Hermes | OpenClaw |
|--|--------|----------|
| **Type** | Single self-improving agent | Multi-agent orchestration framework |
| **Memory** | Built-in learning loop, auto skill creation | Manual memory files, no auto-learning |
| **Skills** | Auto-created from experience | Pre-defined tools only |
| **Platforms** | 15+ messaging platforms | Discord, Telegram |
| **Hosting** | VPS, serverless, local | Local only |
| **Model** | Any provider | Configured per agent |
| **Best for** | Solo deep work, learning accumulation | Multi-agent teams, specific tool pipelines |

## Research Features

- Batch trajectory generation
- Atropos RL environments
- Trajectory compression for training tool-calling models
- Built by model trainers (Nous Research) for model training

## Summary

Hermes is what you get when you ask: "What if the agent actually kept what it learned?" It's not about having more tools — it's about the agent getting smarter the longer you use it, without you having to manually configure that intelligence.

---
*Compiled by Karen from Nous Research docs, GitHub repo, and community sources. May 2026.*
