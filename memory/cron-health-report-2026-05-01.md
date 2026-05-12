# Cron Job Health Report — 2026-05-01

## Summary
- **Total jobs:** 17
- **Enabled:** 13 active
- **Disabled:** 4 (placeholder jobs with invalid dates)
- **Healthy:** 10 jobs running successfully
- **Recent errors:** 5 jobs with issues

## Healthy Jobs (last run OK)
1. **evening-accomplishment-log** — 22:00 daily (Discord DM)
2. **github-backup** — 23:00 daily (Discord DM)
3. **session-clear** — 00:00 daily (system event, no delivery)
4. **morning-health-check** — 06:30 daily (Discord DM)
5. **daily-suggestions** — 06:45 Mon-Sat (Discord DM)
6. **weekly-openclaw-update-check** — 09:00 Sun (Discord DM)
7. **weekly-memory-distill** — 18:00 Sun (Discord DM)
8. **weekly-workspace-cleanup** — 19:00 Sun (Discord DM)
9. **research-philosophy** — disabled placeholder (last run ok)
10. **research-emerging-tech** — disabled placeholder (last run ok)

## Jobs with Recent Errors
1. **research-ai-tools** (13:00 daily) — Gateway restart interruption
2. **research-local-llm** (15:00 daily) — Model timeout (300s exceeded)
3. **research-security** (17:00 daily) — API rate limit reached
4. **session-storage** (23:30 daily) — Model timeout
5. **research-openclaw-updates** (09:00 Mon/Thu) — Execution timed out

## All jobs have valid next run times scheduled.
