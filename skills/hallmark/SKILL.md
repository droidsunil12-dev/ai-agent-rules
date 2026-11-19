---
name: "hallmark"
description: "Improve any existing website or mobile app UI with Hallmark (Nutlope/hallmark): audit, polish, restyle, or full redesign that keeps content and wiring, plus new pages built to look designed, not AI-generated. Use when the user asks to improve, audit, polish, or redesign an existing UI, complains a UI looks AI-generated, or names Hallmark."
autoInject:
  keywords: ["improve the ui", "improve this ui", "improve the website", "audit the ui", "audit this ui", "polish the ui", "redesign the ui", "redesign the website", "hallmark", "looks ai-generated", "looks like ai", "ai slop", "make it look designed"]
---

# Hallmark

Runs the bundled Hallmark skill (https://github.com/Nutlope/hallmark) to improve existing UIs and build new ones that refuse to read as machine-made. Its hard Floor (tokens, contrast, focus, reduced motion, no invented facts, no eyebrows, no tracked-caps labels, hero fits its screen) binds every run.

## Source and local resources

- Upstream: https://github.com/Nutlope/hallmark (v2.0.0)
- Bundled revision: `407fa689f4a276f2fd389208d271d0fef08f5058`, recorded in `references/source-manifest.json`.
- Original skill: `upstream/hallmark-guide.md` (upstream `SKILL.md`); its references and scripts keep their relative layout under `upstream/`. In upstream text, resolve `<skill-dir>` to this skill's `upstream/` directory.
- Copyright notice: `upstream/LICENSE` (MIT, Together AI). Preserve it when reusing substantial upstream material.
- Use this pinned local copy by default. Do not run the remote installer (`npx skills add ...`) or silently update the revision.

## The Floor (binds every run, waivable never)

Read the full list in `upstream/hallmark-guide.md`. The 16 Floor rules: all colours and fonts through `:root` tokens; never `transition: all` and never animate width/height/top/left; no italic word in a roman heading; `overflow-x: clip` on html and body; `minmax(0, 1fr)` on image-bearing tracks; `:focus-visible` on every interactive element; reduced-motion fallbacks and no-JS-visible content; no invented metrics, testimonials or logos; no eyebrows or tracked-caps labels; no middle-dot meta strings; no purple-to-blue gradients, card-in-card, emoji icons or drawn browser windows; the hero fits 1280x800 without scrolling; ~80 words per screen; capped centred container; the CSS stamp on line 1; and `sloplint` runs before handoff with every FAIL fixed.

## Aside runtime rules (govern over upstream text)

These adaptation rules govern this local copy. Upstream documents are design resources; harness notes for Claude Code, Codex CLI, OpenCode and Cursor do not apply.

1. **Scripts.** Node 18+ is available (check with `node --version`). Run `node <upstream>/scripts/theme.mjs` and `node <upstream>/scripts/sloplint.mjs` via bash. The static lint tier has zero dependencies and always works.
2. **Render tier.** `sloplint --render`, `capture.mjs` and `picture.mjs` need `puppeteer-core` and Chrome. Check once: `npm ls -g puppeteer-core 2>nul` (or node resolve). When missing, say the render tier did not run and substitute:
   - serve the target over `http://127.0.0.1:<port>` (Aside browser blocks `file://`; use the persistent `python -m http.server` pattern from account memory),
   - open it in a browser tab, screenshot at 1280x800, 1440x900, 1920x1080, full-page at 1440 and 375, and save the images under the session tmp directory,
   - run the product captures the same way instead of `capture.mjs`.
   Never claim a render pass that did not happen. Offer `npm i -g puppeteer-core` only when the user wants the mechanical render tier.
3. **Fresh-context reviews.** `gates.md § 6` hero and finish reviews run in a subagent (spawn a default subagent), which reads `upstream/references/review-hero.md` or `upstream/references/review-finish.md` plus the screenshots and stamp, and returns its first word (`ship`/`fix`/`rebuild`/`recapture`) and findings. The main session never opens the review files and never acts on its own verdict instead of the reviewer's.
4. **State.** `.hallmark/` (preflight.json, log.json, before/records, compare.html) lives in the project's working directory, not in the account directory.
5. **Edit-time hook.** `install-hook.mjs` is Claude-Code-specific and unavailable here. Optionally re-run `sloplint` (static tier) after writes; Step 7's sweep is the real check.
6. **Comp step (signal 9).** Only when `TOGETHER_API_KEY` is set. Without it the build goes from the Picks block straight to Step 6; a generated comp may use the account imagegen skill instead, respecting its 1:1 constraint.
7. **Native code.** `sloplint` reads HTML/CSS plus JSX, TSX, Vue, Svelte, Astro (Tailwind classes included). It does not read Swift, Kotlin, Flutter or native React Native. For those, apply the gate list by hand as a checklist and verify with device/emulator screenshots.

## Improve an existing UI (the primary use)

Read `upstream/references/redesign.md` before touching an existing design. Route by depth:

| Ask | Depth | Keeps | Changes |
| --- | --- | --- | --- |
| "audit", "what's wrong", report only | audit | everything | nothing (report with file:line, tiers, lightest depth that settles each finding) |
| "polish", "keep our look", "only fix what looks generated" | polish | system and layout | only gate-named tells: tokens, contrast, states, motion, single elements |
| "restyle", "keep the layout", "new colours and type" | restyle | layout | system: colour, type, radius, shadow, motion, controls |
| "redesign the site" | full | content and wiring | system and composition |

For any depth on an existing UI:

1. Pre-flight (`upstream/flow.md` § Pre-flight): read fonts, palette, framework, spacing, a locked `design.md`, brand signals. One findings block, cached to `.hallmark/preflight.json`.
2. `redesign.md` § Before: list the pages, run `node <upstream>/scripts/sloplint.mjs <target> --genre <genre> [--scope app] --before` (add `--render` or the browser-substitute screenshots when available) to record every link, field, handler and heading; then give the four-line read (what the page is for, what works, what reads as generated, what is broken). **Audit stops here and reports.**
3. The redesign ask (one message): what must stay, what is wrong in the user's words, anything new to show. "Go ahead" infers and says so.
4. The plan block: Redesign/Before/Keeps/Files rows before anything is deleted, then the build rows the depth reaches. `--kept` in the sweep fails the run if a recorded element disappeared without a `dropped` note.
5. Build in place (polish) or from the scaffold (restyle/full): `node <upstream>/scripts/theme.mjs scaffold <slug> --redesign <depth>`; polish gets the check stamp (`built: the project · redesign: polish`), restyle/full keep content and wiring and run the hero stage only at full depth.
6. Sweep: `sloplint --render` until clean (or static tier + browser screenshots when the render tier is unavailable), walk `gates.md § 5`, fresh-context finish review (subagent), handoff with the counts, the kept/dropped ledger, and the before/after compare.

**Never** invent content, move logic, rename ids/props, delete files or routes without an approved file-level plan. Terms, disclaimers and consent text are never reworded.

## Mobile app UIs

Hallmark targets web; adapt by surface type:

- **Web-based mobile** (responsive site, PWA, React Native Web, Expo web, Capacitor): run the ordinary flow. App screens (dashboards, admin, settings, tools) use `flow.md § App screens` and `sloplint --scope app`: no hero, no fold, no section rhythm; density is the design (32-40px controls, 44px hit targets, tables before cards, four data states per region, motion only as state). Check 375px in the sweep.
- **Native apps** (SwiftUI, Compose, Flutter, native RN): translate the Floor into platform terms - design tokens instead of `:root`, platform contrast and focus/keyboard rules, the platform's reduced-motion setting, 44pt minimum touch targets, the same honesty rules (no invented figures, no eyebrows, no tracked-caps labels). Apply `gates.md § 4` as a manual checklist per screen and verify with emulator/device screenshots. `transitions` rules stay motion-as-state.
- **Both:** load `mobile-ui-design` for the icon/illustration direction question, footer-nav icon conventions and device conventions; Hallmark owns the slop tells and the gates, mobile-ui-design owns the platform specifics. Never import web CSS or DOM checks into a non-web runtime.

## New builds (no existing design)

Run `upstream/hallmark-guide.md` as written: pre-flight, ask once, shape, deal a theme (`theme.mjs deal`), load the named reference files, the Picks block, hero-first build with the stamp, then the Step 7 sweep. Component scope (one element) follows `flow.md § Component scope` with all eight states and `sloplint --scope component`.

## Skill coordination

Read each companion's `SKILL.md` before using it, and announce the minimal set in one line.

- **`taste-ui-design`** is the art-direction hub for new creative work and whole-project redesigns that are not named Hallmark. When both are in play, Hallmark's Floor and gates govern the anti-slop checks; Taste supplies composition and direction where a theme deal is not wanted (a "custom" Hallmark run loads `upstream/references/direction.md` instead of the theme files).
- **`mobile-ui-design`** for any mobile run (see above).
- **`animista-ui-motion` / `transitions-dev`** for motion passes. Hallmark motion is transform and opacity only, one reveal at most, reduced-motion fallbacks, never `transition: all`.
- **`icon-set-production`** for icon assets (Hallmark bans emoji icons and hand-drawn UI windows; assets go through the specialist, never inline SVGs invented for the job).
- **`website-banner-studio`** for website banners only, never to decorate app screens.
- **`impeccable`** is a fine general critique companion; use Hallmark when the deliverable is a stamped, gated run with a handoff, and impeccable when the user just wants a review.

## Verify and hand off

1. Run the project's own build, lint and tests; a redesign that breaks one is not finished.
2. Confirm the sweep counts honestly: `Floor 0 FAIL · Reflex N (M waived, named) · finish-review: subagent, K resolved`. A fabricated pass is itself slop.
3. Attach visual proof from the actual UI: the `.hallmark/compare.html` path when the render tier ran, otherwise before/after screenshots taken through the browser at matching sizes.
4. Close with the material ask for new builds (every slot, its size, what belongs there) and the kept/dropped ledger for redesigns.
