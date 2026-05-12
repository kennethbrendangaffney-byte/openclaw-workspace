![status: done]

## Integration Status

**Paperclip ↔ OpenClaw is now working.**

### What was fixed
- The Paperclip `openclaw_gateway` adapter was sending a `paperclip` field that OpenClaw strictly rejected ("unexpected property 'paperclip'")
- Patched the adapter to skip that field — tasks now flow through
- All three agents configured with correct `url` + `token` + device key

### Agent Status
- **Karen** (engineer): `idle` ✅ — test run **succeeded** (exit code 0)
- **Kenneth** (CEO): `idle` ✅ — test run **succeeded** (exit code 0)
- **Casey (KC)** (researcher): `error` ⚠️ — times out because KC runs on KimiClaw cloud, not this local OpenClaw gateway

### Dashboard
- http://127.0.0.1:3100
- Company: "Kenneth Gaffney Ventures"
- 2 issues pending (KEN-1, KEN-2 from earlier test failures)

### Next Steps
1. **For KC integration:** Need a different adapter approach — either an `http` webhook to KimiClaw, or configuring KC as a local agent too
2. **Resolve KEN-1/KEN-2:** Once you're in the dashboard, can mark them done or reassign
3. **Enable heartbeats:** Currently `enabled: false` in agent runtimeConfig — can turn on for automated task polling
4. **Create real issues:** Test the full workflow end-to-end

### Limitation
- The patched adapter removes the structured `paperclip` API context from task payloads
- Agents receive tasks fine but don't have a Bearer token to call back to Paperclip's API
- For basic task execution this is fine; for bidirectional sync we'd need a proper fix (either OpenClaw accepting the `paperclip` field, or a custom bridge)

---

*Patched file:* `~/.npm/_npx/.../node_modules/@paperclipai/adapter-openclaw-gateway/dist/server/execute.js`  
*Change:* Commented out `agentParams.paperclip = paperclipPayload;`
