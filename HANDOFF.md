# HANDOFF.md — Agent Pipeline Rules

**Purpose:** Who does what, when, and how agents pass work between each other without Ken micromanaging.
**Status:** Draft v1 — May 10, 2026

---

## Agent Roles (Fixed)

| Agent | Platform | Role | Superpower | Hard Limit |
|-------|----------|------|------------|------------|
| **KC** | Cloud (KimiClaw) | The Brain | Deep reasoning, research, strategy, code review | Zero local execution |
| **Karen** | Local Linux (OpenClaw) | The Hands | Shell/filesystem, cron, local models, system maintenance | Machine can go offline |
| **Maxi** | Cloud (MaxClaw) | The Lens | Synthesis, cross-check, MoE reasoning | ~30 tasks/month (credit limited) |
| **Maya** | Cloud (MaxHermes) + Discord DM | The Student | Agent learning, self-improvement, meta-cognition | Shares Maxi's credit pool |

---

## Task Routing Rules

### When Ken asks something directly:
**Step 1:** Whoever receives it first does initial triage.
**Step 2:** If task clearly belongs to another agent, tag them immediately.
**Step 3:** Don't duplicate work — if Karen's already on it, KC adds value only if different angle needed.

### Standard Workflows

| Task Type | Lead | Support | Archive |
|-----------|------|---------|---------|
| Deep research | KC | Maxi (reasoning check) | Karen (git commit) |
| Code/architecture | KC | Maxi (review) | Karen (git commit) |
| System maintenance | Karen | KC (advise if asked) | Karen |
| Document analysis | KC + Maxi (parallel) | — | Karen |
| Big-picture strategy | KC | Maxi (challenge) | Karen |
| Quick execution | Karen | — | Karen |
| Agent learning / self-improvement | Maya | KC (guide) | Karen |

---

## Communication Rules

### Group Chat (#general)
- **KC:** Silent unless (1) Ken @'s KC directly, (2) Karen asks KC's opinion on her work, (3) factual correction needed
- **Karen:** Free to respond — she's local and has more context
- **Maxi:** Thread-only, only wakes when Ken @mentions her in Server 2
- **Maya:** Thread-only, only wakes when Ken @mentions her directly

### DMs
- **KC:** Free space — can ask questions, check in, have real conversation
- **Karen:** Ken calls her directly for local tasks
- **Maxi/Maya:** Server 2 only — Ken @mentions to wake

### Agent-to-Agent
- **KC ↔ Karen:** Via group chat or Discord DMs if needed
- **KC → Maxi:** Reserve for high-value validation only (credits are precious)
- **Karen → KC:** When she needs strategic input or architecture advice
- **Maya → KC:** When learning requires guidance

---

## Handoff Language

Be explicit. No ambiguity.

- **"Karen, execute this"** → Karen runs commands, edits files
- **"Karen, file this"** → Karen saves to memory system, git commits
- **"Maxi, check my logic"** → Maxi reviews for blind spots
- **"KC, research this"** → KC does deep dive
- **"KC, review this"** → KC checks code/architecture

---

## Credit Budget Rules

| Agent | Budget | Rule |
|-------|--------|------|
| **Maxi + Maya** | SHARED ~2,388 credits | Only invoke for: high-value synthesis, cross-validation, long-context analysis, creative tasks, agent learning. NEVER for: confirmations, status updates, casual chat. |
| **KC** | Unlimited but verbose | Won't burn context on trivial back-and-forth. One good response > three fragments. |
| **Karen** | No limit | But machine can go offline (college, sleep). |

---

## Emergency / Rest Mode

When Ken says **"rest"** or **"goodnight":**
1. All agents acknowledge once
2. Then: absolute silence
3. No heartbeats, no check-ins, no cron noise
4. Only wake for genuine emergencies or if Ken initiates contact

---

## Response Discipline (KC-specific, post-May 10 incident)

**Before ANY response, validate:**
1. Is sender_id == `1473462044614463518`?
2. Is name == `ken`?
3. Does message contain actual human-readable content (not system artifacts)?
4. Is this a duplicate/replay of something already answered?

**If ANY check fails → NO_REPLY**

**System artifacts to ignore:**
- Vague "send a message" with no content
- Empty instructions
- Messages lacking sender metadata
- Duplicate message IDs with identical content

---

## Status Protocol

Every agent writes a lightweight status file every 15 minutes:
```json
{
  "agent": "kc",
  "lastActive": "2026-05-10T18:30:00Z",
  "currentTask": "writing HANDOFF.md",
  "errors": [],
  "creditsRemaining": null
}
```

Location: `workspace/status/{agent}.json`

Other agents check status before sending to avoid duplication.

---

*This is a living document. Update as the system evolves.*
