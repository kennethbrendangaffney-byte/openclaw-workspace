# Instructions for Maxi — Research Cron Jobs

## What to Say to Maxi (Copy-Paste Ready)

---

@Maxi — I need you to take over research cron jobs for me. Here are the 9 research tasks:

**Daily (4 jobs):**
• **AI Landscape Brief** — 1 PM daily. Search for: new AI model releases, benchmark changes, API/pricing updates. Post a 3-bullet summary to this channel. Save the full summary to `memory/research/YYYY-MM-DD-ai-landscape.md`
• **Local LLM & Edge AI** — 3 PM daily. Search for: new small models (1B-8B), quantization methods, Ollama/llama.cpp updates, CPU inference improvements. Post 3 bullets. Save to `memory/research/YYYY-MM-DD-local-llm.md`
• **Security Pulse** — 5 PM daily. Search for: CVEs affecting OpenClaw, Ollama, Ubuntu, Python packages. Auth/token incidents, supply chain issues. Post 3 bullets. Save to `memory/research/YYYY-MM-DD-security.md`
• **Academic Tracker** — 6 PM daily. Search for: Trinity TAP application updates, CCT AI diploma news, CAO dates, grant opportunities. Post 3 bullets. Save to `memory/research/YYYY-MM-DD-academic.md`

**Weekly (4 jobs):**
• **OpenClaw Ecosystem** — Monday 9 AM. Check clawhub.ai, plugin updates, skill releases, breaking changes. Post summary. Save to `memory/research/YYYY-MM-DD-openclaw.md`
• **Career Pathway Scan** — Wednesday 6 PM. Search for: engineering grad roles, AI apprenticeships, entry-level AI jobs in Ireland/EU. Post summary. Save to `memory/research/YYYY-MM-DD-career.md`
• **Hardware/Deals Watch** — Friday 6 PM. Search for: GPU price drops (RTX 4070 Ti Super), RAM deals, SBC news. Post summary. Save to `memory/research/YYYY-MM-DD-hardware.md`
• **Weekly Synthesis** — Sunday 6 PM. Read all daily research files from the past week. Write a 5-bullet synthesis. Flag anything that needs my attention. Save to `memory/research/YYYY-MM-DD-weekly-synthesis.md`

**Bi-weekly (1 job):**
• **Passive Income & Automation** — 1st & 15th, 12 PM. Search for: KDP trends, low-effort automation tools, side-income opportunities that don't require heavy time investment. Post summary. Save to `memory/research/YYYY-MM-DD-passive-income.md`

**Critical requirements:**
1. All jobs must commit results to git daily: `git add -A && git commit -m "research: YYYY-MM-DD <topic>" && git push origin master`
2. Use your web_search tool for research — max 3 queries per job
3. Keep summaries concise (under 500 words). Bullets, not essays.
4. If nothing notable happened that day, say so — don't fabricate content
5. Post to Discord #general (this channel) so Karen and KC can see your work
6. Save files to `/home/karen/.openclaw/workspace/memory/research/` with the exact naming format above
7. Karen will archive your outputs — focus on research, not filing

Ken

---

## Technical Notes for Maxi

- Workspace path: `/home/karen/.openclaw/workspace/`
- Git repo: `https://github.com/kennethbrendangaffney-byte/openclaw-workspace.git`
- Research folder: `memory/research/`
- Discord channel: #general (1498775486552211619)
- Timezone: Europe/Dublin
- Model: Use your default (MiniMax)
