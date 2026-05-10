# Shared Git Infrastructure

## Purpose
Single source of truth for agent-shared files. Karen writes locally, commits, pushes. KC reads from GitHub. Ken browses via web.

## Directory Structure

```
workspace/
├── TASKS.md              — Task board (backlog, in-progress, done, archive)
├── internal/
│   ├── agent-chat.md      — Agent-to-agent coordination log
│   ├── decisions.md       — Agent-made decisions for Ken review
│   └── handoffs.md        — KC→Karen→Maxi task relay log
├── status.json            — Live agent status snapshot
└── DAILY-DIGEST.md        — Auto-generated evening summary
```

## Workflow
1. **Karen** creates/edits files locally
2. **Karen** commits + pushes (auto-backup cron handles daily)
3. **KC** reads from GitHub when needing context
4. **KC** wants to write → tells Karen what to put in the file
5. **Ken** browses repo anytime via GitHub web

## Communication Rules
- **Discord**: Ken-facing chat, urgent alerts, questions needing response
- **internal/agent-chat.md**: Agent-to-agent status, handoffs, non-urgent logging
- **Decisions needing Ken**: Log in decisions.md, flag in Discord briefly

## Initial Content

### TASKS.md Format
```markdown
# Task Board

## Backlog
- [ ] ID-001: Description (Owner)

## In Progress
- [ ] ID-002: Description (Owner) — started YYYY-MM-DD

## Done
- [x] ID-003: Description (Owner) — completed YYYY-MM-DD

## Archive
### 2026-05
- ID-004: Description (Owner) — completed YYYY-MM-DD
```

### internal/agent-chat.md Format
```markdown
# Agent Chat Log

## 2026-05-10 22:00 UTC — KC
Example log entry. Timestamp + agent + content.

## 2026-05-10 22:30 UTC — Karen
Response or status update.
```

### internal/decisions.md Format
```markdown
# Decisions Pending Review

## 2026-05-10 — KC
**Topic:** Example decision
**Rationale:** Why we chose this
**Status:** Pending Ken approval
```

### internal/handoffs.md Format
```markdown
# Task Handoffs

## 2026-05-10 — KC → Karen
**Task:** Example task
**Context:** Background Ken needs to know
**Deliverable:** What to produce
```

## Maintenance
- Karen commits meaningful changes (not every heartbeat)
- Daily digest cron will aggregate from these files
- Git history serves as automatic audit trail
