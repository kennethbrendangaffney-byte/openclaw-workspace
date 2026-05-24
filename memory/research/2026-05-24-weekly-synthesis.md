# Weekly Research Synthesis — 2026-05-17 to 2026-05-24

*Compiled by Karen | Week of Sun 17 – Sat 24 May 2026*

---

## 5 Bullets — Things Ken Should Know

**1. CCT AI Diploma: Enrolment window closing soon — act this week.**
CCT College Dublin is accepting applications for the September 2026 intake. Ken has a confirmed place. The key action: contact CCT directly to confirm Springboard+ free funding status while on Jobseeker's Allowance — don't assume, confirm in writing. SUSI grant (new applications close **9 July 2026**) should be filed alongside. The earlier research noted a May 25th soft close for late CAO rounds; apply to CCT now to be safe.

**2. TAP 2027: Mark your calendar for October–November 2026.**
The current TAP intake is closed. The next cycle (September 2027 entry) opens approximately October–November 2026 via the CAO portal. Normal CAO close is 1 February 2027 (€50 fee, €35 early bird by 20 January 2027). Ken's path: CCT Level 7 AI diploma → TAP Foundation (Sept 2027) → Trinity General Engineering (Sept 2028). This is the spine of his 5-year plan — keep it on track.

**3. CRITICAL — Ollama "Bleeding Llama" (CVE-2026-7482): patch or isolate now.**
Every security brief this week has flagged this. A critical heap out-of-bounds read in Ollama's GGUF loader lets unauthenticated attackers leak API keys, prompts, and credentials via 3 API calls. ~175,000–300,000 public instances exposed. Patch to Ollama 0.17.1+ and restrict to `127.0.0.1` only. Also patch OpenClaw to latest (has its own CVE-2026-33579 auth bypass). This is the most actionable security item for this week.

**4. AI model landscape: Phi-4 and Qwen3 dominate local SLM benchmarks; Gemini 3 Pro tops leaderboards.**
On local models: Phi-4 (3.8B) and Qwen3 (0.5B–7B) are the new go-to SLMs for consumer hardware — worth testing locally on the EVO-X2. Q4_K_M remains the practical GGUF sweet spot. On cloud: Gemini 3 Pro tops the leaderboard (~91%), Claude Sonnet 4.6 wins coding (82.1% SWE-bench), GPT-5.4 is the best all-rounder. Google launched Gemini Diffusion (diffusion-based LLM, beta) this week — novel architecture shift worth watching.

**5. Hardware: RX 9070 XT hits $629 all-time low; DDR5 prices stabilising after 400% surge.**
AMD's RX 9070 XT is available at $629 (vs RTX 5080 at ~2× the price) — strong value for EVO-X2 GPU builds if not already purchased. DDR5 RAM prices, which spiked 400%+ over the past year, have been falling since March 2026 and are now at ~$10–11/GB — a good time to buy. Also: Google Gemma 3 can now run locally on the new Coralboard Edge AI SoC.

---

## 🚨 Urgent Flags

| # | Item | Deadline | Action |
|---|------|----------|--------|
| 🔴1 | **Ollama CVE-2026-7482** | **Immediate** | Patch to 0.17.1+ or restrict to 127.0.0.1. Check OpenClaw is on latest build. |
| 🟡2 | **CCT September 2026 place** | This week | Confirm place + Springboard+ funding with CCT directly (in writing). |
| 🟡3 | **SUSI grant (if CCT confirmed)** | **9 July 2026** | Apply before the new applications close. |

---

*Sources: Daily research files 2026-05-17 through 2026-05-24 | Agent: Karen*