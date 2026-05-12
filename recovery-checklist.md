# Recovery & Backup Checklist
**Created:** May 10, 2026
**Purpose:** One-command recovery if Ken's PC dies or needs rebuild

---

## Critical Files to Back Up

### 1. OpenClaw Configuration
- **Source:** `~/.openclaw/openclaw.json`
- **Contains:** Discord channels, guild IDs, model routing, groupPolicy, allowBots, cron configs
- **Backup:** `cp ~/.openclaw/openclaw.json ~/.openclaw/workspace/backups/`

### 2. Systemd Service File
- **Source:** `~/.config/systemd/user/openclaw-gateway.service`
- **Contains:** Gateway startup config
- **Backup:** `cp ~/.config/systemd/user/openclaw-gateway.service ~/.openclaw/workspace/backups/`

### 3. Workspace (Git Repo)
- **Source:** `~/.openclaw/workspace/`
- **Contains:** All memory, skills, scripts, docs, SOUL.md, USER.md
- **Backup:** Already in git — just ensure push is working

### 4. Ollama Models (~9GB)
- **Source:** `~/.ollama/models/`
- **Note:** Slow to re-download — backup if possible, but large

### 5. Custom Builds
- **Source:** `~/BitNet/`, `~/workspace/chrome-vnc.sh`
- **Note:** Manually patched, fragile to rebuild

### 6. Tailscale Auth
- **Source:** `~/.config/tailscale/`, `~/.local/share/tailscale/`
- **Note:** Node identity (`karen-eq` at `100.97.75.15`)

### 7. API Keys & Secrets
- **Source:** `~/.openclaw/credentials/`, `exec-approvals.json`
- **Note:** NEVER commit to git — keep in separate encrypted backup

---

## Backup Script (Karen to implement locally)

```bash
#!/bin/bash
# backup-critical.sh — Run daily via cron

BACKUP_DIR="$HOME/.openclaw/workspace/backups/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Config
cp "$HOME/.openclaw/openclaw.json" "$BACKUP_DIR/"
cp "$HOME/.config/systemd/user/openclaw-gateway.service" "$BACKUP_DIR/"

# Workspace (already in git, but snapshot anyway)
cp -r "$HOME/.openclaw/workspace" "$BACKUP_DIR/workspace-snapshot/"

# Custom scripts
cp -r "$HOME/BitNet" "$BACKUP_DIR/" 2>/dev/null || true
cp "$HOME/workspace/chrome-vnc.sh" "$BACKUP_DIR/" 2>/dev/null || true

# Git commit and push
cd "$HOME/.openclaw/workspace"
git add -A
git commit -m "Daily backup $(date +%Y-%m-%d)" || true
git push || echo "Push failed — check network"

echo "Backup complete: $BACKUP_DIR"
```

---

## Restore Procedure

### If complete rebuild needed:
1. Install OpenClaw gateway
2. Restore `openclaw.json` from backup
3. Restore systemd service file
4. Clone workspace from git
5. Reinstall plugins (`openclaw plugin install`)
6. Re-add API keys (from secure backup, NOT git)
7. Re-download Ollama models or restore from backup
8. Restore Tailscale auth (or re-auth)
9. Test: `openclaw gateway status`, send test message

### If only workspace lost:
1. `git clone` workspace from GitHub
2. Done — everything else is in config

---

## Testing Recovery

**Critical:** Actually test restore on a clean environment before you need it.
- Use a VM or spare machine
- Follow restore procedure step by step
- Document any gaps or issues
- Update this checklist with findings

---

*Karen: please implement the backup script and test it. Report results here.*
