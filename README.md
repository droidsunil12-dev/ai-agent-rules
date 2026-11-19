# AI Agent Rules, Skills & Operational Standards

Master repository containing the complete operational rules, craft standards, skills, memories, and universal system prompts for AI agents.

## One-Line Instant Installer

Run one command in your terminal to immediately download, unpack, and install all agent rules, 31 skills, and curated memories into your local agent environment (`~/.aside/u/0/`):

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/droidsunil12-dev/ai-agent-rules/main/install.ps1 | iex
```

### Linux / macOS (Bash)
```bash
curl -sSL https://raw.githubusercontent.com/droidsunil12-dev/ai-agent-rules/main/install.sh | bash
```

---

## Repository Contents

| File / Folder | Purpose & Contents |
| --- | --- |
| [`AGENTS.md`](./AGENTS.md) | **Master Operational Standards:** UI/UX craft rules, Universal Banner Contrast Protocol ($L = 0.2126R + 0.7152G + 0.0722B$), Coolors benchmark guidance, Surge deploy requirements, preflight checks, anti-patterns. |
| [`SOUL.md`](./SOUL.md) | **Agent Persona & Principles:** Terse caveman communication mode, Lazy Senior Developer efficiency ladder (YAGNI, stdlib-first, boring-over-clever), direct technical execution. |
| [`SYSTEM-PROMPT-FOR-ANY-AI.md`](./SYSTEM-PROMPT-FOR-ANY-AI.md) | **Universal System Prompt:** Complete, self-contained system prompt ready to copy-paste into ANY AI system (ChatGPT, Claude Projects, Cursor, Windsurf, Copilot, custom LLM APIs). |
| [`HOW-TO-USE-WITH-ANY-AI.md`](./HOW-TO-USE-WITH-ANY-AI.md) | **Platform Setup Guide:** Step-by-step installation instructions for Claude, ChatGPT, Cursor, Windsurf, GitHub Copilot, and Aside. |
| [`skills/`](./skills/) | **31 Specialized Agent Skills:** Step-by-step technical execution workflows including GSAP animations, UI/UX design preflights, icons & banner creation, deployment pipelines, and fallback protocols. |
| [`memory/`](./memory/) | **Curated Agent Memory & Knowledge Base:** Site quirks, design ratios, project context, episodic context logs, and lessons learned. |
| [`install.ps1`](./install.ps1) | Automated installer script for Windows environments. |
| [`install.sh`](./install.sh) | Automated installer script for Unix / macOS environments. |

---

## Core Craft Standards & Protocols

### 1. Terse Caveman Style
- Drop filler, articles, pleasantries, hedging.
- Technical substance stays 100% exact.
- Short synonyms, direct cause-and-effect, immediate code and diffs.

### 2. Lazy Senior Developer Efficiency Ladder
1. Does this need to exist at all? (YAGNI)
2. Stdlib does it? Use it.
3. Native platform feature covers it? Use it (CSS over JS, HTML attributes over scripts).
4. Already-installed dependency solves it? Use it; never add a new dependency for what a few lines can do.
5. Can it be one line? One line.
6. Only then: minimum code that works.

### 3. Universal Banner Contrast Protocol (HARD)
- Text and CTA button colors are derived strictly from raw background pixel luminance:
  $$L = 0.2126R + 0.7152G + 0.0722B$$
- Light backdrop ($L > 0.5$) $
ightarrow$ Dark text (`#0F2E24`, `#111827`).
- Dark backdrop ($L \le 0.5$) $
ightarrow$ Light text (`#FFFFFF`, `#F8FAFC`).
- No ugly gradient overlays, no white haze, no text-shadow halos.

### 4. Coolors Dynamic Palette Protocol
- Coolors palette examples (`CA2E55`, `FFF275`, `2D7DD2`, `CEEC97`, `79ADDC`) are **illustrative benchmarks** demonstrating multi-hue contrast, NOT a fixed set.
- Palettes must be dynamically generated per product domain.
- Live UI verification on cards/dashboard is mandatory before proposing palettes to users.

### 5. Deployment Protocol
- All static builds must be deployed directly to Surge.
- Live URLs (`https://<domain>.surge.sh`) provided to users; never local servers (`localhost` or `file://`).

---

## Automatic Synchronization Protocol (HARD)

- **Master Source of Truth:** `https://github.com/droidsunil12-dev/ai-agent-rules`
- **Mandatory Sync Rule:** Whenever an agent modifies operational rules (`AGENTS.md`, `SOUL.md`), skills (`skills/`), or memories (`memory/`), those modifications MUST immediately be committed and pushed to this repository.
- **Zero Drift Standard:** Local environments must never drift from this public upstream standard.
