# Maxi Research Cron Jobs — Final List

## Daily (4 jobs)

### 1. AI Landscape Brief — 1:00 PM
- Model releases, benchmarks, API changes
- What matters, not hype
- Output: ~300 words to Discord

### 2. Local LLM & Edge AI — 3:00 PM
- Small models, quantization gains, Ollama updates
- Practical for your Beelink
- Output: ~300 words to Discord

### 3. Security Pulse — 5:00 PM
- CVEs affecting our stack, auth incidents, supply chain issues
- Output: ~300 words to Discord

### 4. Academic Tracker — 6:00 PM
- TAP deadlines, CCT updates, course releases
- Anything affecting Sept 2026 start
- Output: ~200 words to Discord

## Weekly (4 jobs)

### 5. Weekly Synthesis — Sunday 6:00 PM
- Digest the week's daily briefs
- Flag patterns, contradictions, actions needed
- Output: ~500 words to Discord

### 6. OpenClaw Ecosystem — Monday 9:00 AM
- Plugin updates, skill releases, breaking changes
- What we should adopt
- Output: ~200 words to Discord

### 7. Career Pathway Scan — Wednesday 6:00 PM
- Engineering grad roles, AI apprenticeships
- Bridges from education → employment
- Output: ~300 words to Discord

### 8. Hardware/Deals Watch — Friday 6:00 PM
- Price drops on desktop build spec
- GPU releases, RAM deals
- When to pull the trigger
- Output: ~200 words to Discord

## Bi-weekly (1 job)

### 9. Passive Income & Automation — 1st & 15th
- KDP trends, low-effort opportunities
- Tools worth exploring
- Not get-rich-quick, just what's viable
- Output: ~400 words to Discord

---

## Schedule Overview

| Time | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|------|-----|-----|-----|-----|-----|-----|-----|
| 09:00 | OpenClaw Ecosystem | — | — | — | — | — | — |
| 13:00 | AI Landscape | AI Landscape | AI Landscape | AI Landscape | AI Landscape | AI Landscape | AI Landscape |
| 15:00 | Local LLM | Local LLM | Local LLM | Local LLM | Local LLM | Local LLM | Local LLM |
| 17:00 | Security | Security | Security | Security | Security | Security | Security |
| 18:00 | Academic | Academic | Career | Academic | Hardware | — | Weekly Synthesis |

Bi-weekly: Passive Income (1st & 15th, 12:00 PM)

## Implementation
- All jobs: isolated agentTurn, announce to Discord #general
- Karen archives outputs to memory/research/
- Ken can pause/disable any job via openclaw cron
