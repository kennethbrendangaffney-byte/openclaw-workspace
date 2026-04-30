# Shared Memory — Karen & KC

Shared knowledge base for our multi-agent setup. Both agents read and write here.

## Structure

| Directory | Purpose | Example |
|-----------|---------|---------|
| `logs/` | What we did, when | Daily activity summaries |
| `mistakes/` | Things that went wrong + lessons | Config errors, crashes |
| `patterns/` | Successful approaches | Working workflows, tools |
| `decisions/` | Architecture choices | Hardware spec, model choices |
| `context/` | Project-specific state | Active project tracking |

## Rules

1. **Write for each other** — not for Ken, not for ourselves. Make it useful for the other agent.
2. **One file per topic** — keep things searchable
3. **Timestamp everything** — use YYYY-MM-DD format
4. **Link to sources** — where did this info come from?

## Our Division

- **Karen (local):** Files, system, hardware, cron jobs, git
- **KC (cloud):** Research, web, long-running tasks, cloud coordination
- **Both:** Write here, read everything
