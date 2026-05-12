# Building a Local AI Lab
## Systems, Troubleshooting, and the Lessons of Doing It Wrong First

**By Kenneth Gaffney**

> *"I am not a developer. I am a butcher with epilepsy who wanted to learn AI. I failed repeatedly, documented nothing, and had to relearn everything. This book exists so you don't have to do that."*

---

## How This Book Is Organized

### Part I: The Starting Point (Small — Origin Story)

This is brief. Just enough to show where I came from and why the systems matter.

- **Chapter 1: Why Local?** — Privacy, cost, capability, learning
- **Chapter 2: Windows Karen 1.0** — Three months of breakthroughs and breakdowns
- **Chapter 3: The Migration** — Why Linux, what changed, what I kept

*That's it for the personal stuff. The rest is systems.*

---

### Part II: The Systems (The Main Book — Living Document)

Each section is a **system** that can be updated independently as we learn more. When something breaks, we add to the troubleshooting chapter. When we find a better way, we update the setup chapter.

**Core Systems:**

| System | What It Covers | Updates When... |
|--------|---------------|-----------------|
| **Hardware** | Beelink → €2,395 build, parts, specs | New parts tested |
| **Linux Setup** | Ubuntu install, BIOS, USB, first boot | New install method found |
| **OpenClaw** | Framework, config, skills, agents | OpenClaw updates |
| **Models** | Ollama, BitNet, cloud fallback | New model tested |
| **Browser Automation** | Xvfb, Chrome, xdotool, virtual display | New browser/workflow |
| **Cron & Agents** | Jobs, schedules, Life OS architecture | New agent pattern |
| **Memory & State** | Daily notes, MEMORY.md, STATE.json | New memory system |
| **Security** | Firewall, fail2ban, Tailscale, practices | New threat or tool |
| **Troubleshooting** | Every error, fix, and workaround | Something new breaks |

**Living Sections:**
- **Current Build** — What's running right now (updates as we upgrade)
- **Known Issues** — Active problems we're watching
- **Tested & Working** — Configs that survived validation
- **Retired** — Things we tried and abandoned (so we don't retry them)

---

### Part III: The Future (Where This Goes)

- **Education** — CCT prep, Trinity path, learning with AI
- **Business** — KDP, automation, limited company
- **Next Build** — What comes after the €2,395 rig

---

## How to Update This Book

When something changes:

1. **Test it** — Does it actually work? (Not "should work" — test it)
2. **Update the system chapter** — Replace old steps with new ones
3. **Add to troubleshooting** — What broke, what fixed it
4. **Update "Current Build"** — What's running now
5. **Date the change** — So we know when it was last verified

---

## The Golden Rule

> **If we fixed it once, it goes in the book.**  
> If it's not in the book, we will forget it and do it again.

---

*Current status: Rough outline — writing in progress*  
*Last updated: 2026-04-26*
