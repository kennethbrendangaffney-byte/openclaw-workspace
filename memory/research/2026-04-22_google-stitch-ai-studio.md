# Google Stitch & Google AI Studio Research Report

**Date:** 2026-04-22
**Focus:** Google's AI design and development tools for 2026

---

## 1. Google Stitch — AI-Native UI Design

**Status:** Experimental (Google Labs)
**URL:** https://stitch.withgoogle.com/
**Latest Update:** March 18, 2026 — "Vibe Design" launch

### What is Stitch?

Stitch is Google's experimental AI-powered UI design tool that transforms natural language descriptions into high-fidelity interface designs. It bridges the gap between ideation and production-ready prototypes.

### Key Features (March 2026 Update)

#### 1. "Vibe Design" with AI-Native Canvas
- **Infinite canvas** for ideation and prototyping
- Accepts any input format: text, images, or code
- AI-native workflow from concept to interactive prototype
- Explore multiple design directions quickly

#### 2. Design Agent & Agent Manager
- **Reasons across entire project evolution**
- Tracks your design progress
- Works on multiple ideas in parallel
- Maintains organization across iterations

#### 3. DESIGN.md — Design System Export
- Extract design systems from any URL
- Export/import via markdown (`DESIGN.md`)
- Agent-friendly format for cross-tool compatibility
- Apply designs across different Stitch projects

#### 4. Interactive Prototyping
- Transform static designs to interactive prototypes instantly
- "Stitch" screens together in seconds
- Auto-generate logical next screens based on clicks
- Click "Play" to preview app flows
- Map user journeys effortlessly

#### 5. Voice-Powered Design
- **Speak directly to your canvas**
- Real-time design critiques from AI
- Interview-style landing page creation
- Voice commands: *"give me three menu options"* or *"show this in different palettes"*

#### 6. Developer Integration
- **MCP Server** — Model Context Protocol support
- **SDK** available: https://github.com/google-labs-code/stitch-sdk
- **Skills system** (2.4k stars on GitHub)
- Export to developer tools: AI Studio, Antigravity

### Use Cases
- Professional designers exploring dozens of variations
- Founders prototyping first software ideas
- Teams collaborating on UI/UX without design tools expertise
- Rapid concept validation before developer handoff

### Pricing
- **Free** (experimental Google Labs product)

---

## 2. Google AI Studio — Developer Platform

**Status:** Production (free tier + paid API)
**URL:** https://aistudio.google.com/
**Latest Major Update:** March 2026

### What is AI Studio?

Google AI Studio is a unified playground for developers to experiment with, prototype, and deploy applications using Google's AI models (Gemini family, Imagen, Veo, etc.).

### Key Features (March 2026 Update)

#### 1. Unified Playground
**Problem solved:** Previously fragmented interfaces for different models

**New unified experience:**
- **Gemini Chat** — Text conversations (Gemini 3.1 Pro/Flash)
- **GenMedia** — Video generation (Veo 3.1) + Image generation (Imagen)
- **TTS** — Text-to-Speech (Gemini 2.5 Flash/Pro TTS)
- **Live Models** — Real-time voice and video interactions

**Workflow:** Prompt → Image → Video → Voiceover in one flow

#### 2. Maps Grounding (March 18, 2026)
- **Location-aware AI** using Google Maps data
- Supports Gemini 3 series and later
- Real-world context for location-based queries

**Use Cases:**
- Travel apps: nearby restaurant/attraction recommendations
- Real estate: enrich listings with nearby amenities
- Logistics: delivery route optimization with AI context

#### 3. Combined Built-in Tools + Function Calling
**Previously:** Mutually exclusive in single API request
**Now:** Use both together in one call

**Benefits:**
- Simplifies complex agent architectures
- Reduces latency (single vs multiple calls)
- Lower costs (fewer API requests)

**Example:** Google Search + custom product database lookup in one request

#### 4. Saved System Instructions
- **Reusable templates** for system prompts
- No longer lost when clearing chat history
- Switch between personas per project
- Team sharing planned for future

#### 5. Real-Time Usage Tracking
- Current API usage and remaining quota
- Per-project utilization breakdown
- Free vs paid tier consumption ratios
- Rate limit warnings

#### 6. Revamped API Key Management
- Project grouping
- Key renaming
- Better organization across multiple projects

### Billing Changes (April 2026)
- **Project-level spend caps** — pause requests when exceeded (~10 min delay)
- Restructured usage tiers (clearer free vs paid separation)
- Real-time spend tracking in AI Studio

### Supported Models (as of March 2026)
- **Gemini 3.1 Pro** — Best quality, complex reasoning
- **Gemini 3.1 Flash** — Fast, cost-effective
- **Veo 3.1** — Video generation
- **Imagen 3** — Image generation
- **Gemini 2.5 Flash TTS** — Low-latency speech
- **Gemini 2.5 Pro TTS** — High-quality speech

### Build Mode (Coming)
- Generate full-stack apps from prompts
- Gemini powers the code
- Firebase auto-provisions databases and auth
- "Vibe coding" week announced for rapid app development

---

## Comparison: Stitch vs AI Studio

| Aspect | Google Stitch | Google AI Studio |
|--------|---------------|-------------------|
| **Primary Use** | UI/UX Design | AI App Development |
| **Target User** | Designers, founders | Developers, engineers |
| **Output** | High-fidelity UI prototypes | Code, APIs, deployed apps |
| **Models** | Gemini 3 (design agent) | Full Gemini family + media |
| **Integration** | MCP, SDK, AI Studio export | Full API, Firebase, GCP |
| **Pricing** | Free (experimental) | Free tier + paid API |
| **Stage** | Google Labs | Production |
| **Collaboration** | Real-time voice + canvas | Team templates (planned) |

---

## Relevance to Our Setup

### For Ken's Workflow
- **Stitch** — Could rapidly prototype UIs for future projects (KDP coloring book tools, personal apps)
- **AI Studio** — Already relevant for Level 7 AI course; free experimentation with cutting-edge models

### For Karen (Local Agent)
- **Stitch MCP Server** — Potential integration path if building design-related tools
- **AI Studio API** — Could supplement local models with cloud Gemini for specific tasks

### Practical Next Steps
1. Try Stitch for quick UI mockups if designing tools/apps
2. Use AI Studio for Gemini 3.1 experiments before local deployment
3. Export Stitch designs to code via AI Studio for implementation
4. Monitor Stitch for production release (currently experimental)

---

## Sources

1. [Google Blog — Introducing "vibe design" with Stitch](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design)
2. [Google Blog — Stitch gets Gemini 3 updates](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-gemini-3/)
3. [Stitch Documentation](https://stitch.withgoogle.com/docs/learn/overview/)
4. [Gemini Lab — AI Studio 2026 Major Update](https://gemilab.net/en/articles/gemini-dev/google-ai-studio-2026-major-update-unified-playground)
5. [Google Blog — AI Studio updates: More control](https://blog.google/technology/developers/ai-studio-updates-more-control)

---

## Key Takeaway

Google is aggressively unifying its AI tooling in 2026. Stitch handles the design layer (vibe design → prototype), while AI Studio handles the development layer (prototype → deployed app). Both are free to experiment with and represent Google's push toward "vibe coding" — describing what you want in natural language and having AI generate the rest.
