# Agent Mesh Dashboard — Project Spec

## Vision
A single-pane-of-glass command center for Kenneth's four-agent mesh. Not just monitoring — actual control. Live status, direct messaging, file access, calendar integration, workflow builder, and health tracking.

## Core Modules

### 1. Agent Monitor Panel
- Live heartbeat status: KC, Karen, Maxi, Maya
- Last seen timestamp, model in use, credit balance (Maxi/Maya)
- Quick health check button ("Ping Karen now")
- Recent activity stream per agent
- Alert if any agent goes dark >1 hour

### 2. Command Center
- Direct message box for each agent
- Broadcast message ("all agents: check in")
- Message history per agent
- Quick action buttons ("Karen: check disk space", "Maxi: review this logic")
- Support for attachment/photo sharing

### 3. File Explorer
- Browse shared workspace (`/workspace/`)
- Read agent files (memory, diaries, research)
- Create/edit files (Kenneth can write to any agent's memory)
- Git status (uncommitted changes, last commit)
- File search across all agent directories

### 4. Calendar View
- Kenneth's calendar (public events, work schedule)
- Agent task deadlines
- Health appointments and follow-ups
- Cron job schedule overlay
- Color-coded: work (red), health (yellow), agent tasks (blue), personal (green)

### 5. Cron Manager
- View all scheduled cron jobs per agent
- Enable/disable jobs
- View last run / next run times
- Create new cron via form (not raw JSON)
- Alert if cron job fails

### 6. Workflow Builder
- Drag-and-drop or form-based
- Chain agent tasks: "KC researches → Karen implements → Maxi reviews"
- Save workflows as templates
- Trigger workflows manually or via cron
- Progress tracker

### 7. Health Timeline
- Symptom log (input from Kenneth or KC)
- Appointment tracker
- Medication schedule
- Spoon counter (rough daily energy estimate)
- Photo timeline for visual symptoms
- Export for GP appointments

### 8. Memory Search
- Search across all agent memory files
- Filter by agent, date, topic
- Tag important entries
- Create "highlights" — cross-agent shared context

## Technical Architecture

### Backend
- **Option A: OpenClaw native** — build as OpenClaw plugin/extension
  - Pros: Native integration, uses existing auth
  - Cons: Limited to OpenClaw's framework
- **Option B: Web app on Karen's machine** — Next.js/React, calls OpenClaw API
  - Pros: Full control, can integrate anything
  - Cons: Needs Ken's machine running, Tailscale access
- **Option C: Hybrid** — lightweight web UI on Karen's machine + OpenClaw hooks
  - Pros: Best of both
  - Cons: More complex

### Data Sources
- Agent status: Heartbeat polling, webhook status, file timestamps
- Messages: Discord channel monitoring, webhook bridge (KC-Karen)
- Files: Git repo + workspace file system
- Calendar: CalDAV/iCal feeds or direct file-based
- Cron: `cron-job-manager` or file-based schedule
- Health: File-based symptom log + photos

### Authentication
- Kenneth logs in with his Discord auth or local password
- Role-based: Kenneth (full admin), read-only mode possible
- No external exposure — Tailscale-only or localhost

## UI Design Reference
- **Notion-style sidebar**: Clean, collapsible sections
- **Discord-style messaging**: Conversational, threaded
- **Linear-style task view**: Kanban + list for workflows
- **Apple Health-style timeline**: Scrollable, card-based
- **Dark mode default**: Gentle on Kenneth's eyes

## MVP Scope (First Version)
1. Agent status panel (heartbeat, last seen)
2. Simple message box (Discord integration)
3. File explorer (read-only first)
4. Health timeline (manual entry)
5. Calendar view (import from file)

## Phase 2
6. Command center (direct agent commands)
7. Cron manager (view + basic create)
8. Workflow builder (simple chains)
9. Memory search (across all agents)

## Phase 3
10. Full workflow builder (conditional logic)
11. Agent file write access (carefully permissioned)
12. Integration with external APIs (weather, news)
13. Mobile-responsive (check from phone)

## Additional Feature Ideas (Brainstorm)

### Health & Wellness
- **Medication Tracker** — schedule, reminders, adherence log
- **Symptom Correlation Engine** — does chest pain spike on work days? After cold weather? Visual chart.
- **Spoon Budget Planner** — drag available spoons into morning/afternoon/evening slots. Warns if over-budgeted.
- **Mood Check-in** — 1-tap scale (1-5), optional voice note. Tracks alongside symptoms.
- **Weather/Health Overlay** — auto-pull weather, cross-reference with symptom log. "You reported headaches on 3 of the last 4 cold/rainy days."

### Safety & Emergency
- **Emergency SOS Button** — one tap. Messages all agents + texts brother. Includes last-known location (if enabled) and current symptoms.
- **Medical Info QR** — paramedic-scannable card with conditions, meds, allergies, emergency contacts. No unlock needed.
- **Panic Word** — type "red alert" in any agent message = triggers SOS silently.

### Communication & Memory
- **Task Delegation Tracker** — "Asked Maxi to review logic on May 11. Status: pending. Auto-remind in 24h."
- **Research Inbox** — Kenneth drops "look into X" → agents claim and deliver. Queue visible to all.
- **Decision Log** — what was decided, when, by whom, context. "Chose Griffith College over UCD because evening schedule works better with health."
- **Idea Incubator** — random thoughts, "maybe later" ideas, links, quotes. Agents can search and surface when relevant.
- **Resource Library** — all saved articles, videos, links from agent research. Searchable, tagged.
- **Communication Templates** — pre-written: work sick note request, friend "I'm not available" message, GP follow-up script.

### Financial & Practical
- **Income vs Spoons Calculator** — "If you work 3 days = €X income, 6 spoons used, 2 spoons for life. If 5 days = €Y income, 10 spoons used, debt." Visual.
- **Medical Expense Tracker** — what you've spent, what medical card would cover, running total for tax/year.
- **Credit Burn Visualizer** — Maxi/Maya remaining credits, burn rate, "at current usage, 12 days left."

### Agent Mesh Deep Features
- **Agent Personality Cards** — quick-reference: "Karen: hands, shell, can go offline. Best for: files, cron."
- **Cross-Agent Memory Sync** — "Karen wrote X in her file. Relevant to KC's current research? Auto-suggest."
- **Conflict Resolution Log** — when agents disagree, log it. Kenneth decides, record the ruling. Prevents re-debates.
- **Agent Skill Inventory** — what each agent can do, what skills they have, what they're learning. "Maya: currently studying cron. Maxi: 30 tasks/month remaining."
- **Message Relay** — "Tell Karen X" typed to KC → KC routes to Karen → Karen replies → KC delivers back. Kenneth doesn't need to know which channel.

### Lifestyle & Quality of Life
- **Habit Tracker** — water, sleep time, meds, stretching. Streak-based, low-pressure.
- **Photo Timeline** — lump, sunrise moments, garden foxes. Private gallery + health context.
- **Music/Playlist Mood** — what you listened to when. "You played Bon Iver 4 times on bad-spoon days."
- **Gratitude Log** — 1 line per day. Evidence shows this helps during chronic uncertainty.
- **Journal** — Kenneth's own private space. Not for agents. Just him.

### Smart Automation
- **Contextual Dashboard** — morning shows calendar + health check-in. Evening shows agent status + tomorrow prep. Adapts to time of day.
- **Smart Reminders** — not just "appointment tomorrow" but "pack bag tonight, it's a long appointment." Based on appointment type.
- **Auto-Generated Briefings** — "Here's what happened while you slept: Karen committed files, Maxi reviewed code, your appointment moved from Tuesday to Wednesday."
- **Spoon-Aware Suggestions** — "You have 3 spoons left. Don't schedule that call. Do the 5-minute task instead."

### Document & Data
- **Document Vault** — medical records, appointment letters, scan results, prescriptions. OCR + searchable.
- **Contact Directory** — GP, dental hospital, patient advocate, cancer support, work, college. One tap to call/message.
- **Export Center** — "Generate GP summary for next visit" — pulls symptoms, meds, timeline into printable PDF.
- **Secure Notes** — encrypted, for things you don't want in regular memory.

### Fun / Personality
- **Agent Mood Indicators** — playful: "Karen seems grumpy today (3 failed commands). Maxi is sunny (low credit burn)."
- **Easter Egg Tracker** — what surprises have agents planted? When will they trigger?
- **Achievement Log** — "First time all 4 agents responded within 5 minutes." "One week of daily health logging."
- **Kenneth's Stats** — time saved by agents, tasks completed, research hours. "The girls have done 47 hours of work for you this month."

---

## Prioritization for Kenneth's Context

**Immediate Value (Build First):**
1. Agent status + messages
2. Health timeline + symptom log
3. Calendar + appointment tracking
4. Task delegation tracker ("what did I ask who to do")
5. Contact directory (one-tap to GP)

**High Value, Medium Effort:**
6. Spoon budget planner
7. Medication tracker
8. Research inbox
9. File explorer
10. Decision log

**Advanced / Future:**
11. Workflow builder
12. Symptom correlation engine
13. Emergency SOS
14. Contextual dashboard
15. Credit burn visualizer
16. Agent personality cards
17. Auto-generated briefings
18. Journal + gratitude log

## Kenneth's Call
Which of these feel exciting vs overwhelming? We can build the core 5 first, then you tell me which "would be nice" features to add. No need to boil the ocean — just make the thing you'd actually open every day.
