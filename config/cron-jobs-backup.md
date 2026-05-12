# Cron Jobs Backup — 2026-05-10

Generated after cleanup: 14 active jobs, 0 disabled.

## Active Jobs

| Name | Schedule | Delivery Target | Notes |
|------|----------|-----------------|-------|
| gateway-health-check | */15 * * * * | #group-chat | Added today — pings gateway status endpoint |
| research-ai-tools | 0 13 * * * | #research | |
| research-local-llm | 0 15 * * * | #research | |
| research-security | 0 17 * * * | #research | |
| weekly-memory-distill | 0 18 * * 0 | #group-chat | Delivery prefix fixed |
| weekly-workspace-cleanup | 0 19 * * 0 | #group-chat | Delivery prefix fixed |
| evening-accomplishment-log | 0 22 * * * | #group-chat | |
| github-backup | 0 23 * * * | #group-chat | |
| session-storage | 30 23 * * * | #group-chat | Date bug fixed — uses $(date +%Y-%m-%d) |
| session-clear | 0 0 * * * | (none, systemEvent) | Clears old sessions |
| morning-health-check | 30 6 * * * | #group-chat | |
| daily-suggestions | 45 6 * * 1-6 | #group-chat | Mon–Sat only |
| research-openclaw-updates | 0 9 * * 1,4 | #research | Mon & Thu |
| weekly-openclaw-update-check | 0 9 * * 0 | #group-chat | |

## Removed Jobs

- research-self-improvement
- research-emerging-tech
- research-kdp-coloring
- research-philosophy

All were disabled placeholders with broken delivery (`"last"` → no recipient).

## Key Fixes Applied

1. **session-storage** — changed from hardcoded `2026-04-19` to `$(date +%Y-%m-%d)` dynamically
2. **gateway-health-check** — new job, runs every 15 min, alerts if gateway non-200
3. **weekly-memory-distill** — fixed delivery target to `channel:1498775486552211619`
4. **weekly-workspace-cleanup** — fixed delivery target to `channel:1498775486552211619`
5. **All other jobs** — proactively patched to use `channel:` prefixed delivery targets

## Delivery Pattern

All Discord deliveries now use explicit `channel:<id>` format. The bare ID format (`149877...`) caused silent failures on some jobs.
