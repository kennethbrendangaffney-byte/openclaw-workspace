# Maxi Research Cron Jobs — Proposal

## Context
- Maxi runs on Server 2 (MaxClaw cloud, MiniMax credits)
- Shared credit pool with Maya (~2,388 credits remaining as of May 3)
- Maxi = synthesis/cross-validation specialist, 200K context, MoE reasoning
- Budget: ~30 tasks/month on Basic plan, credits roll over
- Karen handles execution/archiving, KC handles research design, Maxi validates

## Daily Research Tasks

### 1. AI Landscape Brief — 1:00 PM daily
- Latest model releases, benchmark shifts, API changes
- Focus: what's actually worth knowing vs noise
- Maxi strength: cuts through hype, flags what matters
- Output: ~300 word brief posted to Discord

### 2. Local LLM & Edge AI — 3:00 PM daily
- New quantization methods, small model releases, CPU/GPU optimization
- Ollama updates, new compatible models
- Maxi strength: technical synthesis without getting lost in weeds
- Output: ~300 word brief posted to Discord

### 3. Security & Privacy Pulse — 5:00 PM daily
- CVEs affecting our stack, auth/token incidents, supply chain issues
- Open-source project security advisories
- Maxi strength: cross-references multiple sources, catches what others miss
- Output: ~300 word brief posted to Discord

### 4. Trinity/CCT Academic Tracker — 6:00 PM Mon/Wed/Fri
- TAP deadline shifts, application portal updates, course changes
- CCT AI diploma: syllabus updates, enrollment windows
- Maxi strength: monitors scattered sources, synthesizes into actionable intel
- Output: ~200 word update posted to Discord

## Weekly Deep Dives

### 5. Weekly Synthesis — Sunday 6:00 PM
- Cross-reference all daily research from the week
- Flag contradictions, emerging patterns, things that need decisions
- Format: bullet summary + "needs Ken's attention" section
- Maxi strength: pattern recognition across time
- Output: ~500 word synthesis posted to Discord

### 6. OpenClaw Ecosystem Scan — Monday 9:00 AM
- Plugin updates, skill releases, community patterns
- New skills on clawhub.ai
- Output: ~200 word brief posted to Discord

## Credit Budget Estimate

| Task | Frequency | Est. Credits | Monthly Total |
|------|-----------|--------------|---------------|
| AI Landscape Brief | Daily | ~15 | ~450 |
| Local LLM & Edge AI | Daily | ~15 | ~450 |
| Security & Privacy | Daily | ~15 | ~450 |
| Academic Tracker | 3x/week | ~12 | ~144 |
| Weekly Synthesis | Weekly | ~25 | ~100 |
| OpenClaw Ecosystem | Weekly | ~15 | ~60 |
| **Total** | | | **~1,654/month** |

Current balance: ~2,388 credits (as of May 3)
Monthly burn: ~1,654 credits
Buffer: ~734 credits for ad-hoc tasks

## Implementation Notes
- All jobs run as isolated agentTurn sessions
- Delivery: announce to Discord #general (1498775486552211619)
- Model: Maxi's default (MiniMax)
- Karen archives outputs to memory/research/ after each run
- Ken can pause/disable any job via `openclaw cron disable <name>`

## Questions for Ken
1. Are these topics right, or should we swap any out?
2. Is the schedule timing OK for your day?
3. Should any of these post to Server 2 instead of Server 1?
4. Want me to set these up now, or wait for your go-ahead?
