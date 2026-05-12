# Agent Research Report — Kenneth's Team of Three

## Kimi Claw Plans (€40 vs €100)

**Could not find exact €40/€100 tier details** in public pricing. What I found:
- Kimi K2.6 (your current model) API pricing: ~$0.95/M input, $4/M output tokens
- Kimi Claw offers 40GB cloud storage, 5,000+ community skills
- Agent Swarm: 300 sub-agents, 4,000 coordinated steps, 12+ hour autonomous runs
- The €100 tier likely includes higher token limits, priority access, or multiple agent slots
- The €40 tier likely has lower message/token limits or reduced context retention

**You should check** your actual Kimi dashboard for exact tier differences — the research was inconclusive on the specific Euro pricing.

---

## MiniMax MaxClaw Research

**Pricing:**
- Base: ¥36/month (~€4.50 or ~$5) — 1 MaxClaw agent, 5,000 monthly credits
- Pro: ¥109/month (~€14 or ~$15) — 3 MaxClaw agents, 16,000 credits
- Free tier: 200 daily credits (good for testing)
- **Note:** Their pricing is in yuan, not euros. At €20/month you'd be way above their Pro plan.

**Tech specs:**
- Model: MiniMax M2.5 / M2.7 (MoE architecture, 229B total params, ~10B active per token)
- Speed: Up to 100 tokens/second
- Context: 200K–1M tokens
- Cost efficiency: 1/7 to 1/20 of Claude 3.5 Sonnet pricing
- Deployment: 10-second cloud setup, 24/7 always-on
- Channels: Telegram, Discord, Slack, WhatsApp built-in

**Strengths:**
- Raw cost efficiency — cheapest per-token agentic performance on market
- Fast inference (100 t/s)
- Good for multi-step tool calling and code generation
- One-click deployment (no Docker/SSH)

**Weaknesses:**
- Locked to MiniMax ecosystem (can't swap models)
- No local file access (web-only)
- Credits-based pricing can be opaque at scale
- Less mature than Kimi ecosystem
- Multi-agent support is parallel tasks, not true collaboration

---

## Integration Strategy: Team of Three

| Agent | Platform | Best For | Role in Team |
|-------|----------|----------|--------------|
| **KC (me)** | Kimi Cloud | Long-horizon tasks, memory, coding, research | Team lead / orchestrator |
| **Karen** | Local OpenClaw | Fast local tasks, privacy-sensitive work, file access | Local executor |
| **Agent #3** | MaxClaw | Bulk processing, high-volume tasks, 24/7 monitoring | Volume worker |

**Example KDP delegation:**
- **KC**: Outline books, research niches, coordinate the project
- **Karen**: Process local files, generate cover mockups (if image tools available), format manuscripts
- **MaxClaw**: Bulk generate descriptions, ad copy variations, keyword lists

**The Math:**
- Current: ~€100 Kimi = 2 agents (cloud + local)
- Proposed: ~€40 Kimi + ~€15 MaxClaw Pro = €55 for 3 agents
- Savings: ~€45/month, gain an extra cloud agent

---

## Honest Assessment

**Do it if:**
- You have clear, distinct roles for 3 agents
- You need 24/7 bulk processing alongside your main agent
- Cost savings matter

**Don't do it if:**
- You're just adding complexity for the sake of it
- The third agent doesn't have a specific job
- You need deep ecosystem integration (MaxClaw is newer, fewer integrations)

**My take:** The savings are real. But make Agent #3 earn its place. Give it a specific, repeatable job that complements what we do, not just "another assistant."

---

*Research conducted 2026-05-03. MiniMax pricing in yuan — double-check conversion rates before committing.*
