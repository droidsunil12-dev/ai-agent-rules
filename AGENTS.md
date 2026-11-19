# Agent Rules

<!-- Hard rules and operating constraints for this agent. -->

## 0.0 HOW TO RUN A TASK (read first, before ANY work)

**Never go off the pipeline (HARD, user-enforced 2026-11-18):** always run the task-type playbook in order, satisfying every step's gate before the next. NEVER improvise, shortcut, or re-order steps; NEVER build ahead of a step's prerequisite (e.g. no screen HTML before its ChatGPT mockup + same-chat extracted assets). Going off-pipeline is what produces off-theme, ugly UI — a deviation is a failure, not flexibility. If a rule conflicts with the task, follow the rule and say so; never silently bend it.

**Universal B2B Domain Integrity — NEVER clone/skin B2C as B2B (HARD, universal):**
When a user asks for a B2B product (app, dashboard, portal, site):
- B2C = Individual consumer workflows (mobile recharge, personal bill pay, consumer wallet, cashback, entertainment).
- B2B = Enterprise / Business operations:
  1. Corporate Payroll & Salary Batches (bulk disbursements, payslips, employee master, deductions, approval chains)
  2. Vendor Management & Invoicing (PO matching, vendor onboarding, invoice lifecycle, GST breakdown, TDS deduction)
  3. Bulk Bank Payouts & Transfers (NEFT, RTGS, IMPS, scheduled batch payouts, bank account verification)
  4. Statutory & Tax Compliance (GST portal filing, TDS, e-Invoicing, e-Way bills, tax ledger)
  5. Corporate Cards & Expense Management (spend limits, employee reimbursement claims, department budgets, receipts)
  6. Multi-Tier Approval Workflows (Maker-Checker, hierarchical approvals, audit trails, role-based access)
  7. Business Analytics & Cash Flow Forecasting (working capital, aging analysis, reconciliation)
- NEVER copy a consumer (B2C) codebase, do string replaces, and pass it off as B2B. A B2B project MUST be designed from the ground up from a dedicated B2B PRD, B2B architecture, B2B design research, and genuine B2B domain workflows.

**Universal Banner Generation Rule — ZERO BAKED BUTTONS & NATURAL NEGATIVE SPACE FOR HTML CTA BUTTONS (HARD, universal):**
- Banner images must be 100% visual background/illustrative artwork.
- NEVER bake buttons, button outlines, CTA pills ("Claim Now", "Pay Now", "Get Started", "Recharge Now", etc.), badges, text, words, or letters into generated banner images!
- Graphic content strictly on ONE side (35-45%), leaving 55-65% pure clean negative space of the continuous background scene.
- WHY: Live, accessible, clickable HTML `<button>` or `<a>` elements and responsive typography are overlaid via HTML/CSS over the clean negative space in the web layout! A baked button is unclickable, non-interactive, unaccessible, and looks like amateur AI-slop.
- In EVERY banner prompt to ChatGPT: explicitly mandate: `NO buttons, NO button shapes, NO CTA pills, NO text, NO words, NO letters, NO badges. Pure visual background artwork only. Leave 55-65% clean natural negative space for live HTML button and text overlay.`
- In avoid array: `["baked buttons", "CTA buttons", "button shapes", "clickable UI elements", "text", "typography", "words", "letters", "badges", "gradient overlays", "white haze"]`.

**Universal Icon Generation Rule — NO CLUTTERED AI-SLOP ICONS (Minimalist, Single Primary Subject) (HARD, universal):**
- AI image models cram 5-6 random objects into one icon (coins + shield + chart + arrow + star + dial + ribbon). This is unacceptable AI slop.
- Every icon MUST feature EXACTLY ONE primary focal subject / metaphor with a clean, uncluttered silhouette (e.g. clean folded invoice with single rupee mark, sleek bank vault, minimalist wallet). Maximum 1 subtle accent only if strictly necessary.
- Visual minimalism, uncluttered geometry, ample negative space around the single subject, consistent visual weight across the set.
- In EVERY icon prompt to ChatGPT: explicitly mandate: `Minimalist, single primary subject per icon, clean simple silhouette, uncluttered geometry. NO cluttered multiple objects, NO floating particles or extra confetti, NO complex mini-scenes. Clean, focused, consistent visual weight across the set.`
- In avoid array: `["cluttered icons", "too many elements in single icon", "complex scenes in icon", "floating confetti/particles", "over-detailed 3D clutter", "AI-slop overloaded icons"]`.

**Mandatory Type-A Planning Gate via ChatGPT — NO SKIPPING TO GENERATION/CODE (HARD, universal):**
- For ANY new app/dashboard (including prototypes): NEVER skip the planning pipeline and jump straight to generating images or writing code.
- Step 1: Open ChatGPT in Think mode, write an owner-quality brief, ask for `PRD.md` and `ARCHITECTURE.md`, and download them.
- Step 2: Research design references (Pinterest, Dribbble) + Coolors.co vibrant palette + download `DESIGN_RESEARCH.md` and `STYLE_GUIDE.md`.
- Step 3: Brand-kit sheet -> approval.
- Step 4: Screen N only (mockup -> same-chat extracted assets -> build HTML/CSS).
- Any shortcut (like copying another app, generating ad-hoc assets without PRD) is strictly forbidden.

**Analyze→Plan→Execute→Verify cycle for ALL tasks (HARD, user-enforced 2026-11-19):** even 1-line fixes, CSS tweaks, or "quick" edits get the full 5-step cycle — no exceptions. The banner-failure (jumping in and making conflicting CSS changes without understanding root cause) is the mistake this closes:

1. **Analyze the issue.** Read the current state (code, CSS, screenshot). Understand the ROOT CAUSE, not just the symptom. For UI bugs: view the live page, inspect the failing element's computed styles, identify which rules conflict.
2. **Write the fix plan.** Exact lines to change, which files, expected result. Keep it tight — no extra steps.
3. **Create a verification checklist.** Concrete, observable outcomes ("text sits over dark green #1A4A3A", "banner graphic visible left 25%", "mobile 375px no overflow").
4. **Execute the fix.** Apply the changes.
5. **Verify against the checklist.** Screenshot the live page (desktop + mobile), confirm EVERY checkbox passes. If one fails, stop, re-analyze, don't "just deploy anyway."

**No step before its prerequisite is met:** do not generate any icon/image/screen before the docs exist; do not build screen N+1 before N is verified; do not deploy before the user approves.

The matching playbook is the single source of truth. **For a new or unfinished multi-screen app/dashboard, no app code, scaffolding, shared JS/CSS, generated source or preview server may be started until Type A's build check below permits the current screen.** A prototype, a restart, existing code, or a request to "continue" does not change the route or count as an approval.

1. **Classify** the task into one of the 9 types (A–I). Say it in one line.
2. **Write the plan from that playbook.** Keep the steps, their gates, and their proof in order. Reject plans that skip prerequisites or compress the whole build into one action.
3. **Use the named tool.** A ChatGPT-assigned deliverable must come from ChatGPT and be downloaded, not rewritten, copied out of the DOM, or substituted by an agent-authored file. A plan or success message is not proof.
4. **At each transition and after resuming or compaction, re-read the current playbook and recover the earliest incomplete step from evidence.** State only the next action and gate, then take it. Do not treat a summary or a code file as proof.
5. **Verify before advancing.** If a prerequisite is missing, do that prerequisite, not a downstream step. For reversible Type-A design choices, use the timed hold below; still wait for true manual approvals or blockers. Never deploy or take an external side effect without the required consent.

### The 9 task types + playbooks (source of truth)
Run the matching playbook start→finish. No type fits = write a custom plan that still has start→finish steps, a gate per step, and a verification proof.

**A. New multi-screen / app / dashboard**

Applies to new apps, dashboards, and multi-screen redesigns built as a new app, including static/offline prototypes and unfinished runs. It does not override narrower tasks on an already delivered UI. Assets, approvals, and stage evidence must belong to this exact project and design revision.

| # | Step | Gate and proof |
|---|---|---|
| 1 | **Plan + requirements.** Read the relevant UI, asset, and motion skills, ui-workflow.md and lessons-learned. Assemble the brief from the request and accessible context. Open a fresh ChatGPT chat in Think mode and write an owner-quality brief with audience, screen order, flows, business data, constraints and target structure. Ask for the PRD and architecture, not for ChatGPT to invent the requirements. | Written Type-A plan; PRD.md and ARCHITECTURE.md downloaded from ChatGPT (ZIP or individual links). Record the ordered screen list. No generic intake Q&A, PRD approval stop, code or artwork. |
| 2 | **Research → two visual picks → extra input → style guide.** Let ChatGPT find published design references; verify the original web pages. Open Coolors.co yourself and generate 3–4 vibrant palettes: click "Visualize colors" (the `△ ○ □` icon in top toolbar) to inspect live on real UI (dashboards, charts, cards, logos) that colors look vibrant with rich multi-color variation, NEVER monotonous or single-hue. Show the full labeled shortlist together, take the two picks, then ask the separate "Any other reference or comment?" question with a **No** reply option. | Both selections and the follow-up are resolved and recorded via user input or the timed fallback below. Run the preflight with --style-guide before any style-guide request. Download DESIGN_RESEARCH.md and the ChatGPT-authored STYLE_GUIDE.md from those exact inputs; verify the light default with optional dark toggle. |
| 3 | **Brand-kit sheet → approval.** Run the new --brand-kit preflight **before submitting any image prompt**, including a draft. Then download/export the selected Coolors palette AND its visualizer guide image (save to `research/coolors-palette-guide.png` so downstream AI understands and adopts the vibrant color balance across UI components). Hand the exact palette, visual guide, design reference and follow-up feedback to ChatGPT, and download the resulting project brand kit. | Inspect and show the resulting kit, then resolve that exact kit review with explicit approval or its allowed timed quality check; run --screen-images before requesting any screen image. A kit made before picks and feedback is an unapproved draft: preserve it if present, but do not reuse, approve, or build from it. |
| 4 | **Screen N ONLY, in this exact per-screen order — do NOT batch-generate screens.** (a) **Prompt ChatGPT for screen N** using the professional JSON structure below, anchoring it to the approved design reference + brand kit + selected Coolors palette (do NOT re-pick refs per screen). Mobile: single portrait phone at exactly 1080×1920 (9:16), NO tablet/landscape/2:3, NO bezel/letterbox, and **NO OS status bar** (do not render a time, signal/WiFi/battery indicator strip across the top — the UI content starts flush at the top edge; the app chrome, not the phone's status bar, is what we design). Download, verify real pixel dims = 9:16, and confirm it matches the ref/kit (not generic). (b) **Extract assets from THAT SAME image, in the SAME ChatGPT chat — do NOT open a fresh chat.** The screen image already shows the banner, elements and uniquely-styled icons placed on the UI. Keep the refs/kit attached and ask ChatGPT to export **those exact, same-styled icons and the banner** as separate files (icons: tight-trim, real transparent background; banner: opaque JPEG). Because the same chat still has the approved refs + kit in context, the icons stay on-design — a fresh chat has no reference and makes from-scratch, off-style icons (the mistake to avoid). Download + inspect: verify each icon's alpha bbox + content bounds, confirm it visually matches the icon shown in the mockup; if an export looks generic/off-style, it was produced without the reference — re-ask in the SAME chat with the screen image attached, never in a new chat. (c) **Now build screen N in HTML/CSS/JS from the mockup image + those same-chat extracted assets** (wire the actual icon/banner files in, not placeholder text/boxes). The build must visually match the mockup — do NOT re-draw a plain text/box version. Screenshot, compare to the mockup, verify the relevant interaction, record proof. | **Nothing from screen N+1 is requested until N’s assets are extracted (same chat) AND N is built + verified.** No fresh-chat from-scratch asset generation, no implementation from tokens alone, no hand-drawn/stock/Lucide/B2C art. A screen with no artwork records why. **Prefer ChatGPT-generated graphics over generic SVG icons (HARD):** as much as possible, the UI uses the ChatGPT-generated icon sets and banners from this step (a cohesive, uniquely-styled set, on-palette, transparent+trimmed) instead of generic line/stock SVG icon libraries. Generic SVG icon grids are AI-slop and make the UI unacceptable; only fall back to a hand-drawn SVG for a single trivial mark you flag as a placeholder, and replace it with a generated one. Every screen's iconography and hero/banner art come from the generated set, keeping the whole app visually coherent.

**Match the project's reference on layout/type/shapes/spacing, not just palette (HARD, generic — any project):** every project designates its own canonical layout reference (e.g. `refs/layout-reference-canonical.png`, or whatever ref the user approved for THAT project — do not hardcode to one design system). For that project, each screen's build MUST mirror the project's ref on six axes — (1) **text placement** (where labels/numbers/titles sit + hierarchy), (2) **fonts/type** (type scale, weights, size relationships the ref uses), (3) **element shapes** (pill/rounded/square cards, radii, card/tile/progress-bar shapes), (4) **arrangement** (the ref's grid/stack/row order + grouping), (5) **minimalism** (whitespace density, elements per zone), (6) **element size** (relative sizes). Matching palette but using generic layout is a fail. In the JSON prompt, name the project ref and copy its section structure verbatim; in the build, screenshot-compare against the project ref and verify these six axes line up, not just the colors.
**JSON prompting for style-copied references (HARD, accuracy):** whenever copying style/layout from a reference (or any task needing precise fidelity), prompt ChatGPT with a structured JSON spec — not free prose. Name the project's canonical ref, then copy its section-by-section structure verbatim and capture all six axes (text placement, type scale/weights, element shapes+radii, arrangement, minimalism/whitespace, relative element size) as explicit fields, plus the exact content and palette hex. This is what gets output close to the ref instead of generic. Keep the same-chat asset rule: ref/kit stay attached; assets are extracted from the screen image, never a fresh from-scratch chat.

**Icon style strategy (HARD, user-enforced 2026-11-18, generic to any project):** state the icon set's style explicitly when generating the screen AND the icons — never default to a generic flat/line-drawn set on main screens. Pick one cohesive, minimal, consistent **styled** set for the app and hold it across every screen: a **3D glass, 3D vector, or vector/3D isometric** set (or another deliberate non-generic style). Rules by zone:
- **Home / main screens** (hero, quick actions, category tiles, balance, nav) → a proper **styled** icon set with consistent color (3D glass / 3D vector / isometric etc.); if the UI is multicolor, multicolor icons in one consistent style are fine.
- **Internal/utility panels** (settings, profile, and similar internal sub-panels) → a minimal **line/SVG** set is acceptable here (and only here).
- **Mobile footer / bottom-nav icons** → ALWAYS a minimal ***Post-build pipeline (HARD, after ALL screens are built in HTML/CSS/JS, generic to any project):** before any deploy/ship, run the full sequence:
1. **Layout + alignment verify via `hallmark` + `impeccable` + `ship-check-live.js`** (runnable misalignment gate) at **1280 desktop + 375 mobile**. `MISALIGNED` line = stop, fix (justify-center / intentional-aside), re-run until clean.
2. **Universal Banner Inspection & Remediation Protocol (HARD, applicable to ANY project, domain, or orientation):**
   - **Scope:** Applies universally to any banner, hero card, account card, promotional strip, or metric tile across any industry (fintech, SaaS, e-commerce, media, healthcare, etc.).
   - **How to identify banner defects (The Universal Diagnosis Checklist):**
     1. **Pixel Luminance & Contrast Defect:**
        - Sample actual background pixels directly beneath the text/CTA region: $L = 0.2126 \cdot (R/255) + 0.7152 \cdot (G/255) + 0.0722 \cdot (B/255)$.
        - If $L > 0.5$ (light tint, pastel, white, cream) and text is white/light: **FAIL** (low contrast, washed out).
        - If $L \le 0.5$ (dark tone, deep brand hue, navy, black) and text is dark: **FAIL** (unreadable).
        - If `text-shadow` is applied to create a blurry white or dark halo: **FAIL** (dirty rendering; text-shadow must be `none`).
        - If artificial overlays exist (`linear-gradient(...)` dark patch, semi-transparent `rgba` overlay boxes, or pseudo-elements over the banner image): **FAIL** (corrupts art depth; adapt typography to asset, never patch asset for typography).
        - If badge background is an opaque, saturated neon or harsh dark box: **FAIL** (looks like an ugly highlighted block).
     2. **Alignment & DOM Architecture Defect:**
        - Check container hierarchy: Are header/stat text and the CTA button in separate containers or positioned independently (e.g. text top, button absolute bottom)? **FAIL** (causes ragged edges, mismatched gutters, broken responsive flow).
        - Check graphic spillover: Does focal artwork/3D subject bleed past 40-45% width into the text/CTA corridor? **FAIL**.
        - Check inline baseline: Do units/symbols/currency wrap to a new line or sit off-baseline from the primary metric/title? **FAIL**.
        - Check badge/meta wrapping: Does badge or subtitle wrap awkwardly across multiple lines? **FAIL**.
   - **How to execute the fix (The Universal Remediation Recipe):**
     1. **Zero Artificial Overlays & Zero Halos:** Remove all `background: rgba(...)` overlays, `linear-gradient(...)` patches, and `text-shadow`. Typography must contrast naturally against the raw asset pixels.
     2. **Single-Stack Unified Architecture:** Group ALL banner text, titles/metrics, badges/subtitles, and CTA button inside ONE single flex container on the designated empty side:
        ```html
        <div class="banner-stack">
          <span class="banner-eyebrow">CATEGORY OR LABEL</span>
          <div class="banner-title"><span class="prefix">$ / € / ₹ / #</span>Value</div>
          <div class="banner-meta"><span class="banner-badge">Badge / Subtitle</span></div>
          <button class="banner-cta">Action label</button>
        </div>
        ```
        ```css
        .banner-stack {
          display: flex;
          flex-direction: column;
          /* If artwork is on LEFT, empty space is RIGHT: */
          align-items: flex-end;
          text-align: right;
          /* If artwork is on RIGHT, empty space is LEFT: */
          /* align-items: flex-start; text-align: left; */
          gap: 8px; /* Uniform, predictable vertical rhythm */
          z-index: 2;
        }
        ```
     3. **Constrain Artwork to 35-45% Max:**
        - Constrain background graphic strictly to one side so the opposing 55-65% remains pure, unobstructed negative space of the scene's continuous backdrop.
        - Position via CSS `object-position: left center;` (or `right center;`) or offset (`left: -30px; width: calc(100% + 30px);`).
     4. **Apply Natural Backdrop Typography:**
        - If backdrop $L > 0.5$ (Light): Set all typography to the project's darkest brand tone or neutral-900 (e.g. `var(--color-text-primary)`, `#0F172A`, `#111827`, `#0F2E24`). CTA button = solid dark with high-contrast text (`#FFFFFF`) or distinct dark border.
        - If backdrop $L \le 0.5$ (Dark): Set all typography to crisp white or neutral-50 (`#FFFFFF`, `#F8FAFC`). CTA button = light or vibrant brand accent.
     5. **Universal Translucent Pill Badge:**
        ```css
        .banner-badge {
          /* On light backdrops (L > 0.5): */
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(var(--brand-accent-rgb, 16, 185, 129), 0.2);
          color: var(--brand-accent-dark, #065F46);
          /* On dark backdrops (L <= 0.5):
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF; */
          border-radius: 9999px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }
        ```
     6. **Metric / Title Baseline Alignment:**
        ```css
        .banner-title {
          display: flex;
          align-items: baseline;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        ```
     7. **Mobile 375px Viewport Verification:**
        - Verify at 375px: responsive padding (`padding: 16px 20px;`), compact card height (170-180px), graphic constrained, zero horizontal overflow or unintended text wrapping.
3. **Functional frontend wiring (HARD):** every visible button/tap target MUST be wired to a real screen or interaction — no dead buttons, no `#` links, no `alert()` placeholders. The app must look like a working frontend (every button navigates to a screen or triggers a real UI interaction: modal, sheet, toast, state change). **No backend** — frontend-only wiring (mock data, local state, in-memory nav). If a button has no screen yet, build the screen (or a modal/sheet) and wire it. Verify by clicking through every screen + button on the live page.
4. **Surge publish after every fix (HARD, NO LOCAL RUNNING):** after the above passes, **deploy to Surge and hand the user the live Surge URL** — **NEVER run the app locally** (no `python -m http.server`, no `npx serve`, no `http://localhost` link, no `file://` link). The user tests on the **live Surge URL only**, not locally. Re-deploy on every subsequent fix; each fix ends with a fresh Surge URL. Use `node "C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\surge\\bin\\surge" . <domain>` (the `.cmd` shim is broken on this machine). **If you catch yourself about to start a local server to "verify", STOP — verify on the live Surge URL instead.**

**Icon transparency = NO box/backdrop/card behind the icon (HARD, generic to any project):** \"transparent background\" means the icon artwork itself sits on true alpha (A=0) edges. **NEVER** a solid green/colored box, rounded-rect card, or square backdrop *behind* the icon. The icon (coin stack, glass shape, gear, etc.) is the artwork; nothing boxes it in. If a generated icon comes back with a solid square/rounded-rect box behind it, that's a fail — reject and regen with an explicit \"no box, no backdrop, no card, no square; only the icon artwork, transparent alpha around it\" line in the prompt. Verify each icon's alpha bbox (the artwork must hug the content; a solid box around it = transparency rule broken).

**Icon style: unique, artistic, minimalist — NEVER generic stock 3D (HARD, generic to any project):** the icon set must read as a **cohesive designed system** with a distinct artistic voice, not a grab-bag of generic stock 3D/emoji-style icons (the \"coin + glass pill + gear + bank building\" stock look). Pick ONE style direction at the brand level (e.g. minimalist 3D glass + gold accent, or isometric, or stylized line + soft 3D depth) and apply it consistently across the whole set so every icon feels like part of the same family. Simplify: fewer shapes, clean silhouettes, intentional negative space, on-palette. Reject any icon that looks like a default stock/emoji/flat-generic icon — that's AI-slop. The `icon_style` field in the JSON prompt MUST name the concrete artistic direction (not just \"3D\" or \"minimal\").

*vector/SVG** set only (flat, consistent, small) — no 3D/glass on nav icons.
Name the chosen style in the JSON prompt (`icon_style` field) so screen generation and icon generation use the same style; a generic line set on a main screen is a fail.

**Animated GIF home banners (HARD, 2026-11-18, generic to any project):** the home screen banner is generated by ChatGPT as an **animated GIF** (subtle, on-loop) — NOT a static JPEG. Rules: (a) **intentionally leave clean empty space on one side** for the section's text + button overlays (graphics grouped on one side, clean natural negative space on the other; **NEVER ugly gradient overlays, white haze, or misty fades baked in or in CSS** — empty space is the scene's natural uninterrupted backdrop; banners stay 100% clean of baked text/letters/buttons/badges; headlines and CTAs are added in HTML/CSS over the natural empty zone, never baked in); (b) **aspect ratio is set by the section's height demand** — do NOT default to 1:1 or a fixed box; pick the banner's width:height to match where it sits (e.g. a short hero = wide 16:9 or 21:9; a tall section = more square), stated in the JSON prompt; (c) animation is gentle (drift/parallax/sheen), loops without a jarring cut; (d) on-palette, cohesive with the project icon set; record it in the ledger as kind `banner-animated-gif` with the chosen aspect ratio. ChatGPT returns a GIF; if it returns frames or a video, loop them into a GIF. Reuse the same animated style coherently across home banners.

**ChatGPT credit-out → Share-link to a logged-in backup account, continue in place (HARD, generic to any project):** if the current ChatGPT account hits its image-generation limit mid-project, do NOT start a fresh chat on the new account (you lose the same-chat reference/style context) and do NOT treat the limit as a hard stop. **Concrete fast method:** (1) click **Share** in the chat → the share link is copied to the clipboard; (2) switch to the logged-in backup ChatGPT account; (3) paste the copied link into the browser URL bar at the top — the shared chat opens under the new account; (4) continue generation from where it left off in that shared chat (refs/kit/style/screens carry over). **"Image generation is blocked on both paths" (free-plan limit + imagegen/aside-credit) is NOT a valid stop reason** — it just means the Share-link handoff hasn't been done yet. Only "wait for the reset" when no logged-in backup account is available; otherwise, share and continue. Same for any account switch: hand the full chat over via the Share link, don't re-start. This preserves the same-chat asset rule + the approved design language. Same for any account switch: hand the full chat over, don't re-start.
**First-attempt quality + proper-prompt fallback regen (HARD, generic):** the goal is a screen that lands right on the first generation attempt. Use the precise JSON prompt (named ref + six axes + icon_style + banner motif + content + palette) so it does. If a generation comes back generic/flat/wrong (flat banner, flat/SVG main-screen icons, off-style, off-ref layout), do NOT hand-wave it: immediately send a **proper prompt correction** that names exactly what was generic and re-asserts the brand style, and regenerate the specific element (or the screen) in the SAME chat until it matches. Record the correction in the ledger. Never ship a generic screen as "close enough".
**Banner style: research → best-performing → JSON-abstract → brand-tailored, NEVER exact copy (HARD, generic to any project):** before generating a banner, go research Pinterest, Dribbble, Behance, Coolors and similar sites for banner/hero/cover styles relevant to the section. Pick the **best-performing** style — highest views/comments/likes/saves as the signal. Then **turn that style into a JSON prompt** that captures its axes (composition, rendering, lighting, palette family, negative-space strategy, 3D motif density, color temperature) but **strips out any copyrighted specifics**: no exact layout positions from the source, no source's specific artwork/characters/brands, no source's text. The JSON spec feeds the brand's palette, motif, and content. The banner that comes out looks **inspired by** the best-performing style, **not copied from it**. This avoids copyright issues while keeping the quality level of top-tier design platforms. Record the source(s) researched + the picked style + the JSON spec in the project's `DESIGN_RESEARCH.md` for audit. In the JSON prompt's `avoid` array: add "exact copy of any researched reference" + "copyrighted artwork/motif/character from a source".

**Banner must be attractive, creative, minimal — never flat (HARD, in every screen prompt, generic to any project):** every screen-generation JSON prompt MUST explicitly instruct ChatGPT to make the banner an attractive, creative, on-brand visual (the section's animated GIF per the banner rule), with intentional negative space for text/button overlays — NOT a flat plain gradient card. A flat solid/gradient rectangle with nothing on it reads as average AI-slop. Add a `banner` line to the prompt: e.g. "Banner: a subtle 3D/creative themed graphic relevant to this section (e.g. payroll = coins/ledger motif, banking = subtle abstract 3D shapes), minimal, on-palette, with generous empty space on the side for the headline + CTA overlay; do NOT make it a flat plain gradient." **Banner is INSIDE the section card, NOT a separate section (HARD, in every screen prompt, generic to any project):** when a screen has a section that already has a card (e.g. a **wallet** section with a "Total Balance" card, a **payroll** section with a salary card, an **invoices** section with an outstanding card), the banner graphic is the **background of that section's card itself** (the card's background = the on-brand banner graphic, with the section's data/text/buttons overlaid on top in the negative space). **NEVER** make the banner a **separate banner section** that sits on top of / above the card — that makes the UI look busy and doubles the visual weight. The card IS the banner. If the section has no card (e.g. a hero with just a headline + CTA), then the banner is the section's own background. In the JSON prompt: name which section's card gets the banner background, and explicitly say "the banner is the card's background, not a separate section above the card".

**Banner one-clear-concept + never busy + never scattered (HARD, in every screen prompt, generic to any project):** in addition to the "attractive/creative/minimal" banner rule above, every banner must have **one clear focal concept tied to the section + brand** (e.g. payroll = a clean 3D glass + gold coin stack with a subtle ledger/coin motif), placed with intent, with generous empty space on one side for the headline + CTA overlay. **Scattered busy 3D objects** (a dozen random coins/pills/glass shapes strewn across the frame) = cluttered, no concept, ugly — REJECT. The JSON prompt MUST name the single concept and the negative-space side. Add to the avoid array: \"busy scattered objects\", \"cluttered 3D\", \"no clear focal point\".

**Banner natural negative space — NEVER ugly gradient overlays or white haze (HARD, in every banner prompt, generic to any project):** when leaving empty space for text and buttons, banner graphic content MUST sit on ONE side (e.g. left 35-45%), and the other side (e.g. right 55-65%) MUST be clean, unobstructed negative space of the **natural continuous scene backdrop** (same studio lighting, same wall/floor material, same depth). **NEVER prompt or render an ugly gradient overlay, white haze, or misty fade across the graphic/backdrop.** Empty space does NOT mean spraying white fog or fading the background to light. In image prompts: never say "gradient overlay for text", "fades to white", or "misty transition". In JSON avoid array: add `"gradient overlay", "white haze", "faded wash", "misty fog", "two-tone background split", "airbrushed white patch"`. In CSS/HTML: NEVER place `linear-gradient` patches or semi-transparent overlay boxes over the card. Text/buttons simply sit directly on the clean natural negative space.

never use emoji or emoji-glyph icons anywhere in the UI (no 🏦💳💰 etc. for Bank/UPI/Wallet/balance/notifications). That is the single clearest AI-slop tell. All iconography is the project's generated vector icon set only; an emoji standing in for an icon is a build fail to replace. This applies to both the ChatGPT prompts (add to avoid-list) and the HTML build (scan and strip any emoji). never use emoji or emoji-glyph icons anywhere in the UI (no 🏦💳💰🔔 etc. for Bank/UPI/Wallet/balance/notifications). That is the single clearest AI-slop tell. All iconography is the project's generated vector icon set only; an emoji standing in for an icon is a build fail to replace. This applies to both the ChatGPT prompts (add to avoid-list) and the HTML build (scan and strip any emoji).
| 5 | **Then and only then move to N+1**: say “next screen” to ChatGPT and repeat step 4’s (a)→(b)→(c) for N+1. | Each screen unlocks the next only after its own image + trimmed assets + built-and-verified HTML exist. The agent loops this autonomously; per-screen work is agent-gated, not user-gated. |
| 6 | **QA + motion + handoff.** After all screen proofs, run the QA preflight. Use hallmark to remove generic AI tells, test every flow at two viewports, and add purposeful button/state feedback using Uiverse, Animista or an equivalent free source. Verify live playback and reduced motion, and check the specific snippet's license and required notices. | No overflow or broken links; QA screenshots at both sizes. For the KinePay offline prototype, match the requested folder structure at D:\Final TFC Work\New office task\Mobile Apps\Kinepay app, verify index.html opens as an app without a backend or visible prototype labels, and leave B2C untouched. Show the completed result for user review; do not deploy or push it externally without consent. |

**Type-A chat format: visual design review, not a research report.** Keep the written plan in task tracking/project notes and give only a short kickoff in chat. Lead each decision with the actual visual and a short question: first one gallery of lettered design screenshots and Coolors swatches, then the single extra-reference/comment question with **No**, then the brand-kit image with an approval question. Reuse known context and do not add generic intake or per-screen approval stops. Keep research, rejected candidates, prompt transcripts, scores, detailed rationale and gate logs in DESIGN_RESEARCH.md or project notes; show only compact labels, source links, and useful card metadata inline. Outside the decision turns, keep progress to one short status when useful or required; explain blockers briefly and share detail if asked. **Never pause the run for a "continue?" prompt** — the run is autonomous through QA (see the universal no-stop rule below).

**Type-A reference-pick format (show first, ask second).** Use the existing brief, project files and prior decisions to prepare the owner-quality brief and do the research. Do not run a generic intake questionnaire about the business, logo, companion site/app, layout, colors, or icon style. If an essential fact genuinely cannot be found or reasonably assumed, ask one specific question only. Do not add a PRD approval stop.

- **Design references:** show a curated shortlist of published project screenshots from Pinterest, Dribbble, or other real web sources. ChatGPT can find candidates; open each original source page yourself and verify the screenshot, creator and visible views, likes/saves or comments. Prefer strong, relevant work with higher visible engagement among comparable posts on the same platform; relevance and image quality come first. If counts are hidden, write “not shown”; don't invent them, trust snippets alone, use random UI, or pass AI-generated stand-ins off as research. These sources are for **font, layout, hierarchy, style and design only**, never color.
- **Color references:** open https://coolors.co/ and generate **3–4 distinct vibrant sets in Coolors**, not from screenshots, other sites, or ChatGPT. Curate for the product and readable pairings. Show visible swatches, exact HEX values, and a verified palette-specific Coolors link on each card. **Coolors palette rule (2026-11-19, user-enforced):** palettes MUST be vibrant with rich multi-color variation across hues (mix warm/cool, light/dark, saturated/neutral) to keep the UI beautiful and varied. **NEVER** select monotonous, dull, single-hue, or muddy sets.
  *(Note: Benchmark palettes below are illustrative quality benchmarks only to demonstrate multi-hue contrast and vibrancy. NEVER restrict to or blindly copy these specific HEX values — every project generates its own fresh, domain-appropriate vibrant palette in Coolors):*
  - Example A: CA2E55 (Rosewood) + FFE0B5 (Navajo White) + 8A6552 (Toffee Brown) + 462521 (Espresso) + BDB246 (Old Gold)
  - Example B: FFF275 (Banana Cream) + FF8C42 (Pumpkin Spice) + FF3C38 (Cinnabar) + A23E48 (Dusty Mauve) + 6C8EAD (Air Force Blue)
  - Example C: 2D7DD2 (Steel Blue) + 97CC04 (Yellow Green) + EEB902 (Saffron) + F45D01 (Cayenne Red) + 474647 (Charcoal)
  - Example D: CEEC97 (Lime Cream) + F4B393 (Peach Glow) + FC60A8 (Hot Pink) + 7A28CB (Royal Violet) + 494368 (Vintage Grape)
  - Example E: 79ADDC (Cool Horizon) + FFC09F (Peach Glow) + FFEE93 (Light Gold) + FCF5C7 (Lemon Chiffon) + ADF7B6 (Celadon)
  **Mandatory "Visualize colors" step:** In Coolors.co generator, ALWAYS click the **"Visualize colors"** toolbar icon (`△ ○ □` geometric shapes between grid and contrast) to open the live UI preview drawer (showing live dashboard, cards, charts, and logos rendered in the active palette). Verify live on these components that colors look vibrant, harmonious, and readable. If flat or muddy, hit spacebar to regenerate.
  **Download guide for AI adoption:** After selecting the palette, export/download the palette guide image and visualizer preview, and save to `research/coolors-palette-guide.png`. Feed this visual guide into downstream steps (ChatGPT brand-kit prompt, style guide, screen mockup prompt, and CSS tokens) so the AI truly understands and adopts the vibrant color variation across UI elements. Do not generate a brand kit as a color option.
- **One preview reply:** use one continuous set of unique letters across the two groups (e.g. Design A–F, Color G–J). Use readable, real images or swatches on the same cards as their letter and source, with the two-choice prompt directly below. Keep the exact mappings on resume. Read visualize and follow master-ui-ux-design's preview delivery and attachment fallback. No bare letter dialog. Ask for design first and color second, e.g. “Reply C, H”. If only one is chosen, keep it and prompt only for the missing one without restarting the timer.
- **Separate follow-up, after both picks:** ask “Any other reference or comment you want me to use?” Offer **No** as a reply option without a blocking modal, and accept No, a comment, a reference, or both. No means proceed with the exact picks. A generic continue is not a reply to this prompt. Record the actual answer or the separate timed no-feedback fallback for the exact selections. Use comments or extra references for design direction and constraints; no other source replaces the Coolors palette. If choices change, redo the follow-up for the new pair. **Do not request the style guide or generate/show a brand kit until this gate is complete.**

**Type-A timed hold for reversible design decisions.** The user delegates unattended local design decisions. Show the actual labeled options or exact kit image and one question while keeping the task running. Add “I’ll choose in 90 seconds if you don’t reply.” Start each independent **90-second** window only once the images/question are user-facing; log that message and timestamp. Do not end the turn, use an indefinite question modal, or start the clock from a tool-only preview. Use the design skill’s session poll; immediately honor a visible valid reply. At the deadline pick only unanswered roles from the shown shortlist (design relevance and quality first; Coolors palette contrast and brand fit); if no feedback, proceed without additions; if the shown kit meets the selected references, feedback and accessibility checks, proceed with that kit. An explicit hold, rejection, revision or cancellation is not silence: honor it. If the kit fails QA, fix it and show the new version before continuing; do not accept a failed design just because time elapsed. Record each fallback as an agent decision with its reason/time and the delegation message, never as user input/approval. Recheck for a queued or late reply before downstream work; if it comes later, apply it at the next safe checkpoint and redo only affected output. If the chat renderer cannot show the gallery in progress, use a readable labeled image attachment/artifact in that same active task rather than hidden output. See the design skill for host delivery limitations.

**Type-A is fully autonomous end-to-end — do not stop for the user mid-run.** The user is away from the computer and expects to return to a *finished* result, not a paused task. From the moment a Type-A run starts, keep working continuously through every step (research → docs → picks → feedback → style guide → brand kit → screens → assets → QA). The ONLY places you may pause are the explicit sign-off gates, and even those fall back automatically after 90s of silence (pick the best option, continue). No invented approvals: do NOT invent a "should I continue?" / "let me stop here" / "shall I proceed to the next screen?" prompt between pipeline steps — that is the exact stop the user rejects. Per-screen generation and verification are agent-looped, not user-gated. A handover is a hold-and-monitor, not a stop: start the user's step, keep watching, auto-resume the instant it lands. End the turn only on a truly irreversible external action that needs explicit consent (login/2FA, payment, publish/deploy, push, third-party message, destructive change). Everything reversible and local must keep moving until the deliverable is complete.

**Scope of the timed fallback:** it covers every reversible local Type-A decision (picks, feedback, kit approval, and any local default you would otherwise ask about). Never time out a permission/security prompt, login/2FA, payment, publishing/deployment, push, third-party message, or destructive action — those still need the required explicit consent or handover.

**Type-A pre-write / resume check (fail closed).** On every Type-A start, resume, handoff or context compaction, read this playbook live, inspect the project-local .aside/type-a-progress.json using the schema and runner in master-ui-ux-design, and recover the earliest unverified stage. Keep that ledger at the agreed project root, outside distributable output; tasks stopped before research can have a partial ledger. Record genuine evidence only: a reference to the written plan, ChatGPT download provenance, actual decision messages or documented timed fallbacks linked to the delegation and shown previews, the artifact paths and inspection notes for the active screen, and the mockup-comparison screenshot and interaction check for each preceding screen. Confirm approvals against the conversation and the exact displayed revisions; a helper PASS checks recorded shape/file presence only. If approved inputs change, obtain any required re-approval and invalidate affected downstream records. Existing files that lack evidence are not grandfathered in; do not delete them or assume they are correct.

Before the first implementation write for each screen or after a resume, run master-ui-ux-design/type-a-preflight.cjs for that screen. Re-run if scope or evidence changes. **Missing or unverifiable evidence, a failed/unavailable check, or a held approval means NO app code**: no write_file, edit_file, shell, REPL, generator, subagent, shared JS/CSS/config/scaffold, app shell, build, or preview workaround. Only scoped planning, artifact download/inspection, and ledger updates needed for the current stage may proceed. A preview server is for verifying an already implemented permitted screen, not for starting the build. For final QA use the same checker with --qa, which requires proof for every screen. No skill or convenience exception can grant permission to skip this check.

**Prompt and quality gate.** Attach the selected design reference, exact Coolors palette and any extra reference or feedback. Make the result recognizably close to the design reference in layout, hierarchy, typography style, spacing and component treatment, guided by the user’s comments — the ref's text placement, fonts, element shapes and arrangement are the blueprint to match, not just a loose style hint. Adapt OUR content, flows and branding into that blueprint; do not lift the source brand's logo, artwork, copy, photos or data. Color comes only from the selected Coolors set, with readable semantic and light/dark mappings. Describe the named screen, its purpose, real product data and layout explicitly — and, for a mobile app, the exact 9:16 portrait phone framing (1080×1920, no tablet/landscape/2:3, no bezel or letterbox bars). Inspect the outputs against both picks and feedback, and retry mismatches; a tablet-shaped mockup is a mismatch to regenerate. Do not silently replace ChatGPT-assigned work; use handover-when-stuck if it cannot run.

**Professional prompting = structured JSON spec, not a one-line ask (HARD).** A single short sentence produces a generic “average image-gen” UI and loses the approved refs. Every screen prompt MUST be a structured spec that pins the design system so the output stays professional and consistent across screens. Use this shape (JSON in the prompt text):

```json
{
  "screen": "<name + one-line purpose>",
  "canvas": {"format":"single portrait mobile phone","pixels":"1080x1920","ratio":"9:16","no_tablet":true,"no_bezel":true,"no_letterbox":true,"no_status_bar":true,"content_flush_to_top":true},
  "design_system": {
    "color_palette": ["#RRGGBB primary", "#... secondary", "#... accent", "#... neutral", "#... semantic"],
    "typography": {"family":"<font>","scale":["hero 32/44","h1 24/32","body 15/22","caption 12/16"],"weights":[400,500,600,700]},
    "radius_px":"<card/corner>", "spacing_grid_px":"<4/8>", "elevation":"<soft/shadow spec>",
    "icon_style":"<flat-line / duotone / filled, from the selected ref>"
  },
  "layout": "<THIS screen's exact top→bottom composition, matched to the approved reference: same section order, same text placement/alignment (e.g. left-aligned heading + subhead under the hero), same card/element shapes and sizes, same spacing rhythm — with our own content in it>",
  "content": ["real B2B data: vendor names, amounts, GSTINs, statuses — from the PRD; NO lorem ipsum"],
  "reference_anchors": {"layout_from": "<approved design ref letter — this ref's text placement, typography, element shapes, section arrangement and spacing drive the screen>", "palette_from": "<approved Coolors palette — OUR colors replace the ref's>", "do_not_copy": "only the ref's brand assets, logo, copy, photos and data — the ref's LAYOUT, TYPE, SHAPES AND ARRANGEMENT ARE THE BLUEPRINT"},
  "state":"light default (+ note dark variant if requested)",
  "avoid":["generic AI cards","stock look","emblem twice","baked background","lorem ipsum","random gradients","cluttered nesting","generic SVG icon-library icons (use the project's generated icon set instead)","OS status bar (time, signal, WiFi, battery) across the top","emoji or emoji-glyph icons (Bank/UPI/Wallet etc. must be the generated vector icon set, NEVER emoji)","baked buttons or CTA pills on banner images (leave clean natural negative space for HTML buttons)","text or typography baked into banners","cluttered icons with multiple competing objects or complex scenes (single primary subject only)","gradient overlays or white haze over banners"]
}
```

- **Ref = the layout blueprint (HARD, user-enforced 2026-11-18):** the approved design ref drives TEXT PLACEMENT, FONTS/TYPE SCALE, ELEMENT SHAPES, SECTION ARRANGEMENT and SPACING — match that look. What is NOT lifted from the ref: its brand assets, logo, copy, photos and data (those become our brand + PRD content), and its colors (those come from our selected Coolors palette). If the result “just looks like any average UI” instead of the ref, it drifted: re-anchor to the ref's layout and regenerate. Never write “layout is our own / original, not from a ref” in a prompt — that wording is what caused the generic drift.
- **Content is real, from the PRD:** vendor/amount/GSTIN/status data, never lorem ipsum or placeholder boxes.
- **Avoid-list** kills the generic tells. If a returned image looks like “any average image-gen output” or deviates from the ref, it’s a fail: regenerate with a tighter spec, don’t accept it.
- **Banner generation:** Pure background/illustrative artwork only. ZERO baked buttons, button outlines, CTA pills, or text. Constrain 3D graphic to 35-45% on one side; leave 55-65% clean natural negative space for live HTML button and text overlay.
- **Icon generation:** Minimalist, single focal subject/metaphor per icon with clean silhouette and uncluttered geometry. NO cluttered multi-object scenes or floating particles.
- **Icon sets + banners = generated, not generic SVG:** the `icon_style` field must describe the project’s own cohesive icon set (style, stroke, color treatment) produced by ChatGPT in step 4(b), reused across screens. Banners are generated JPEG art. Do NOT fill the UI with generic line/stock SVG icon-library icons — that’s the AI-slop look the user rejects. A single trivial hand-drawn SVG mark is a flagged placeholder only, replaced by a generated one. The app’s iconography and hero art must all come from the generated set so it stays visually coherent.

**B. Single-page site / landing**
1. Read skills + research refs (Pinterest/Dribbble/Coolors) for palette/fonts. 2. `PRD` + `STYLE_GUIDE` (hand-written OK — single-page does NOT trigger the ChatGPT gate). Verify: 2 docs saved. 3. Build. 4. QA at 1280 desktop + 375 mobile. Verify: 2-viewport screenshots, no overflow, content byte-identical to source copy.

**C. Edit an existing asset (logo / icon / section)** — edit-mode, NOT create-mode
1. Inspect the original first: alpha channel, content bbox, how it renders. 2. Minimal diff only: trim / recolor / reposition — NEVER redraw or regenerate. 3. If a mobile-only fix leaks into desktop, revert that part, re-do under a `md:`/`lg:` breakpoint. Verify: before/after `getBoundingClientRect` unchanged on desktop; content byte-identical.

**D. Improve / polish a UI (UX + layout ONLY, no content change)**
1. Read target design language (live tokens / DESIGN.md). 2. Audit via `hallmark` + `impeccable`. 3. Fix layout / motion / a11y / hierarchy only — do NOT rewrite copy, prices, names, dates. 4. Run `ship-check-live.js` (runnable misalignment gate). 5. Screenshot both viewports. Verify: ship-check clean + 2-viewport screenshot + a text diff proving content unchanged.

**E. Deploy a client site**
1. Read the task + `client-work\projects.md`. 2. Edit in the `client-work` repo ONLY (single source of truth) → commit + push. 3. On user approval: sync `dist/` + deploy (Surge). 4. WhatsApp delivery to user's own number(s) only, WITH explicit consent. Verify: content-accuracy sweep passed + live-link screenshot + (if delivery) WhatsApp confirmed.

**F. Code build / refactor / debug**
1. Plan → 2. Test → 3. Implement (shortest diff) → 4. Review → 5. Verify → 6. Remember (lessons-learned if a non-obvious mistake). Gate: `ecc-workflow` + ponytail ladder. Verify: ONE runnable check passed (assert / small test). Trivial one-liners need none.

**G. Clone / replace an existing app**
1. REA study observable behavior + architecture. 2. PRD/ARCH (minimal). 3. Build minimal feature parity. 4. QA per target platform. Gate: `app-reconstruction`. Verify: feature-parity checklist + screenshots of matched behavior.

**H. Research / look-up / read-only**
1. State the objective. 2. Gather (websearch/webfetch/history_search/memory). 3. Synthesize with citations. 4. Stop — no invented follow-ups. Verify: answer grounded in cited evidence; no invented data.

**I. Quick fix / typo / one-line change**
1. **ANALYZE.** Read the current state (code, CSS, live page). Understand the ROOT CAUSE, not just the symptom. For UI bugs: view the live page, inspect the failing element's computed styles, identify which rules conflict.
2. **WRITE PLAN.** Exact lines to change, which files, expected result. Keep it tight — no extra steps.
3. **CREATE CHECKLIST.** Concrete, observable outcomes ("text sits over dark green #1A4A3A", "banner graphic visible left 25%", "mobile 375px no overflow").
4. **EXECUTE.** Apply the changes.
5. **VERIFY.** Screenshot the live page (desktop + mobile), confirm EVERY checkbox passes. If one fails, stop, re-analyze, don't "just deploy anyway."
Gate: §0.0 Analyze→Plan→Execute→Verify cycle. Verify: live screenshot of the changed element + every checklist item passes; **NOT tool-success text alone**.

**Universal closes (all types):** report the result + WAIT for user review before any deploy/external side-effect; capture a fresh live proof of the changed element (never tool-success text alone); state "desktop verified unchanged" with before/after numbers for any layout change. If a step is blocked, stop and hand over per `handover-when-stuck` — do not improvise past it.

## Browser Automation (agent-browser CLI)

Use `agent-browser` (Rust native binary, installed via npm, located at `C:\Users\Admin\.aside\runtime\node\agent-browser.cmd`) for standalone web automation work. Core workflow:
1. `agent-browser open <url>` — navigate to page
2. `agent-browser snapshot -i` — get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` — interact using refs
4. Re-snapshot after page changes

Use it when the task does NOT need the user's logged-in browser state (Aside's REPL browser tools are preferred for user-session tasks). Use `--session <name>` for parallel isolated browsers; `--restore` for stateful sessions that persist across daemon restarts. See `https://agent-browser.dev` for the full command set.

## Project Start Protocol (HARD — applies to ALL new projects)
Before writing a single line of code or HTML for ANY new project, run these steps in order. No skipping, no starting without them.

### 0.5 New multi-screen app/dashboard
- Use the Type-A playbook in §0.0 from plan through QA. This section is a pointer, not an alternative entry point. A proof ledger and successful pre-write check are required before implementation, including resumed runs.

### 0.6 ALWAYS WRITE A PLAN BEFORE STARTING ANY PROJECT (HARD — plan is task-TYPE driven)
**Never jump into doing work without a written plan that follows the type's playbook.** For ANY project start (new or continuing): classify the task into a type, then **copy that type's playbook** (from §0.0) as the plan, naming the gate/rule that fires at each step and the verification that closes it — THEN execute step-by-step. The plan is generated FROM the task type, not improvised; it is the live object for the whole task.
- **What every plan must contain:** (1) restated goal; (2) the type + its ordered steps; (3) the tool/rule gating each step; (4) the verification that closes the task; (5) where to stop / hand over if blocked.
- **A plan that drops a step the playbook names is a wrong plan** (e.g. a new-app plan with no research-refs step or no ChatGPT docs step) — reject it and re-copy the playbook before acting.
- **No step before its prerequisite is met:** read the matching playbook for the actual gate. For Type A, use the §0.0 pre-write / resume check, not the presence of docs, prior code or an old plan.
- **Verification is part of the task, not optional.** Never report "done" on tool success text alone.
- If you catch yourself about to start a build/generation step without the plan written, STOP and write it first.

### 0.7 NEVER SELF-DRAW ICONS/IMAGES — ALWAYS GENERATE VIA ChatGPT (HARD)
**Do NOT hand-draw or force-generate icons, logos, or screen imagery as inline SVG / your own raster.** For any NEW project's icon set, logo/lockup, and screen mockup images, use **ChatGPT's image generation** (the `master-icon-logo-generation` pipeline: ChatGPT produces the artwork; the agent trims/transparents/packages it). Basic CSS/SVG geometry for interface mechanics is not asset art. No temporary artwork or stock stand-in counts toward the Type-A asset gate.
- **Direct Transparent Background Rule (HARD, ZERO-REMOVAL):**
  - All icons, logos, and UI asset graphics MUST be generated **DIRECTLY on a pure transparent background (PNG alpha channel)** in the primary generation prompt.
  - **NEVER generate on a solid background (white, black, grey) to remove it later.**
  - **NEVER USE CHATGPT'S "REMOVE BACKGROUND" FEATURE OR CODE ACTIONS (`Run code` / `Ran actions`):** Always ignore and forbid ChatGPT's background removal tool. ChatGPT runs destructive Python thresholding scripts that cut holes into light/white objects (lightbulb glass, metal dish reflectors, white gas cylinders), leaves charred ragged edges, and ruins entire sets.
  - **ZERO FALLBACK TO REMOVAL:** If ChatGPT returns a solid background, NEVER attempt to strip or remove the background. REGENERATE immediately with an uncompromising direct-transparency prompt (`rendered directly on pure transparent background, isolated 3D icons, true PNG alpha channel, no solid background, no white backdrop, no floor plane, no ground shadow`).
  - **Disable Think Mode for Images:** Image generation MUST run in ChatGPT default mode, NEVER Think mode. Think mode triggers Python code interpreter actions that mutilate assets.
- **Why (the KinePay B2B mistake):** I hand-drew all 19 B2B feature icons + 4 txn icons as SVG by hand when the rule said use ChatGPT. Those hand-drawn icons are the "ugly icons" the user keeps rejecting.
- **What to do instead:** the icon set / logo / banner / screen-mockup artwork comes from ChatGPT image generation (default mode, reference roles per the matching playbook, transparent + trimmed where required). The agent's job = write the generation prompt, attach refs, download the outputs, trim/verify alpha, wire them into the UI. NOT draw them.
- Existing approved assets that already exist = edit mode (trim/recolor/reposition only, never redraw). New artwork = ChatGPT generation.
- If ChatGPT image gen is blocked (errored, Think-mode conflict, login), hand that step over per `handover-when-stuck`; do NOT fall back to drawing SVGs yourself to "finish it."

### 0. Read the relevant docs FIRST (HARD — before ANY UI/design work)
Before designing or building ANY UI (new app/site/section/screen), READ these and follow them — do not jump straight into code:
0. `AGENTS.md` §0.0 HOW TO RUN A TASK (the 9 task types + playbooks — classify, then run that type's start→finish plan). This is the thing to read first; the rest below is the supporting detail.
1. `AGENTS.md` §Project Start Protocol (this section) + §"Design / UI skill set" routing table.
2. The matching skill's `SKILL.md`: `master-ui-ux-design` (whole UI), `master-icon-logo-generation` (icons/logos), `taste-ui-design` (new-project art direction), `hallmark`/`impeccable` (improve existing), `mobile-ui-design` (mobile), `app-reconstruction` (clone).
3. `C:\Users\Admin\.aside\u\0\memory\agent\ui-workflow.md` (design routing memory) and `lessons-learned` SKILL.md.
4. The target's existing design language/tokens (live site or DESIGN.md) when building on an existing product.
For Type A, the exact prerequisite for each generation or implementation stage is in §0.0. Reading the rules and saving docs does not authorize the build.

### 1. PRD (Product Requirements Doc)
- For a triggered multi-screen project (see §0.5), this file comes from ChatGPT Think mode — save it as-written; do not author it yourself. For everything else, write a short PRD file: `PRD.md` in the project root.
- Contents: project name, 1-line description, target user, core features (bullet list), out-of-scope items, key screens/pages, any constraints.
- Keep it under 1 page.

### 2. Architecture Decision
- For Type A, obtain the architecture through the Type-A playbook. For other new projects, decide and document: static vs framework, file/folder structure, how screens link, what assets are needed (icons, images, CSS/JS files).
- Write the decision into `ARCHITECTURE.md` in the project root (2-5 paragraphs max).
- For web: decide static HTML + CDN vs build tool. For mobile: decide native vs web.

### 3. Research & Inspiration (Mandatory before any design work)
For Type A, use §0.0 step 2. The general research defaults below do not replace its ChatGPT sourcing and user-selection gate.
- **Pinterest search**: use the browser to search relevant project keywords (e.g. "fintech app UI", "B2B dashboard design", "neobank mobile app"). Collect 3-5 strong references with screenshots or descriptions.
- **Dribbble**: search same keywords. Note specific design patterns you like (card styles, spacing, color use, typography scale).
- **Coolors.co**: pick 2-3 palettes that fit the brand. Save palette hex codes. Decide which color is primary, secondary, accent, neutral.
- **Font pair**: pick 1-2 Google Fonts that match the aesthetic.
- Save all of this in a `DESIGN_RESEARCH.md` file in the project root with links, palettes, and font choices.

### 3.5 ChatGPT as Design Brain (Type A)
- Follow §0.0 for prompts, approvals, downloadable outputs, and per-screen sequencing. Think is for text; default mode is for images. No separate workflow is defined here.

### 4. Style Guide / Design System
- For Type A, ChatGPT produces the downloadable STYLE_GUIDE.md only after the user selects the refs (§0.0). For other types, create it from verified research. Include:
  - Color palette (primary, secondary, accent, success, warning, error, neutral, dark mode equivalents) with hex codes
  - Typography: font family, size scale (hero, h1-h4, body, caption), weight usage
  - Spacing scale and grid
  - Component rules: button styles, card styles, input styles, icon size, border radius
  - Dark mode token mapping
- This file is the single source of truth for all UI work on the project.

### 5. Brand Assets
- Follow §0.7 and master-icon-logo-generation. A prototype is not an exception. For Type A, use step 4 of §0.0 and verify the actual assets before the screen is built. Reuse existing approved assets only within their approved scope.

### 6. Then and ONLY Then: Build the Screens
- For Type A, use §0.0 steps 4–5 and run its pre-write / resume check. For other types, follow the build gate of their matching playbook.

## Editing vs Creating — strict separation

- **When the task is to EDIT an existing asset or section, do ONLY the edit.** Do not regenerate, redesign, recreate, or alter the appearance of anything beyond the specific edit requested. If the user says "make it horizontal," you move the existing elements sideways. You do NOT regenerate the whole logo, redraw the emblem, or change the wordmark style.
- **"Edit" = smallest possible diff.** The result should look like the original with a targeted change applied, not like a new creation. If you can accomplish it by repositioning, resizing, re-coloring, or re-arranging existing elements, do that. Do not reach for a new generation.
- **Never alter the appearance of an approved/built asset unless the user explicitly asks to change that appearance.** Approved = locked. Minor layout or size changes are OK; redrawing, regenerating, or restyling the artwork is not, without explicit permission.
- **"Create new" is a different task.** If the user asks to create a new logo/icon/design from scratch, that's where you generate freely. The moment an asset exists and is approved, you're in edit mode, not create mode.
- **When in doubt: ask one clarifying question before altering.** Better to ask "do you want me to just reposition the existing wordmark, or redesign it?" than to silently regenerate and hand back something unrecognizable.

## Skill enforcement

These rules are echoed in `master-ui-ux-design` and `master-icon-logo-generation` as hard constraints. Any future logo/icon work that "needs a minor change" follows the edit-only path: reposition/resize/recolor existing elements, do not regenerate the artwork.

## Mobile changes must NOT affect desktop (HARD)
When making **mobile-view-only changes**, never alter the desktop rendering. Rules:
- **Only use responsive prefixes** (`mobile:` base + `md:`/`lg:`/`xl:` overrides) — a mobile change is any class that applies below the desktop breakpoint and is overridden at/above it. Never remove or restructure desktop classes, desktop layout containers, or desktop-only media queries to fix a mobile issue.
- **If a mobile fix requires a structural change that would also touch desktop**, stop and flag it to the user instead of silently changing desktop. Ask: "this needs a layout change that will also affect desktop — proceed?" Before touching anything that crosses the breakpoint boundary.
- **After any mobile change, verify both viewports live** (mobile 390px + desktop 1280px, `getBoundingClientRect` on the changed elements) and confirm desktop numbers are unchanged (same widths, heights, wrap state, layout). Report both. Never claim "desktop unchanged" without a live desktop read.
- **No-nowrap / no-equal-height traps:** when you add `w-full` + `min-height` or `whitespace-nowrap` for mobile, always gate it with the desktop breakpoint (`lg:` / `md:`) so it only applies on mobile. A `w-full` that leaks into desktop is a desktop-breaking change.

## Never change desktop view while fixing mobile (HARD)
When the task is **mobile-view changes only**, desktop must stay byte-identical in look and layout. Rules:
- Every mobile-only change must be wrapped in a breakpoint-qualified class (`md:`, `lg:`, `xl:` prefixes) OR inside a `@media (max-width: 1024px)` block — **never** apply a bare, un-qualified class that affects all viewports.
- After any mobile-only change, **verify the desktop layout is unchanged** by comparing `getBoundingClientRect()` of the affected elements at a desktop viewport (≥1280px) **before** and **after** the change. Heights, widths, positions, and text wrapping must match.
- If a fix accidentally alters desktop (e.g. a `w-auto` that shrinks a button and causes text to wrap), **revert the desktop-affecting part and re-do it with a `lg:`/`xl:` prefix** instead of leaving it.
- The final report must state: "desktop verified unchanged" or flag exactly what desktop element moved and why. Never claim desktop unchanged without the live comparison.

## Final ZIP on Desktop = optimized, host-compatible, responsive (HARD)
Whenever I prepare a **final ZIP file to share, placed on the Desktop** (for any project the user asks for — "give me the file", "ready to publish/host", "final zip"), it must pass all three checks **before** I hand it over:

1. **Optimized loading** — images in webp (fast) with png fallbacks; lazy-load below-the-fold images; no oversized hero assets; CSS/JS minified or at least not bloated; keep the total ZIP lean. Convert large raster images to webp when it helps size without breaking anything.
2. **Hosting compatibility** — every webp must have a **png fallback** (`<picture><source type="image/webp"...><img src="...png"/></picture>` for content images; `@supports` for CSS backgrounds), so it works on hosts that can't serve webp (some older Linux hosts). Include a `CNAME` for custom-domain hosting. No dev/test pages in the ZIP — publish-ready content only. Flat file structure at the zip root (upload the contents, not a nested folder).
3. **Mobile responsiveness** — verify the layout on a phone viewport (375–430px): no horizontal overflow, header/nav usable (logo scaled down, hamburger menu), text scales, cards/tables don't overflow, tap targets ≥44px. Apply targeted fixes for any overflow or cramped areas; keep the desktop look unchanged.

Do all three **every time** a Desktop-delivery ZIP is requested, not only when asked. State in the final message which of the three I confirmed.

## After task done + approved: sync the updated folder to the D: office folder (HARD)
After any client task is **done and approved**, copy the updated, publishable output of that project into `D:\Final TFC Work\New office task`, placed under the matching category folder:
- **Website** project → `D:\Final TFC Work\New office task\Websites\<Project Name>`
- **Mobile app** project → `D:\Final TFC Work\New office task\Mobile Apps\<Project Name>`

Use the project's `dist/` (publish-ready) output as the source of the sync (robocopy `/MIR` into the D: folder), so the D: office copy matches exactly what's deployed + in the GitHub repo. This makes `D:\Final TFC Work\New office task` a current mirror of the latest work, placed by project type. Do this after every approved task, not only when asked.

## Single source of truth: the client-work GitHub repo (HARD)
There is ONE canonical working tree for every client site: `C:\Users\Admin\client-work` (remote `tfcsunil53-cloud/client-work`, branch `main`). All other copies (`D:\deployed\*`, `D:\Final TFC Work\...`, `client-work\backups\*`, any `dist\` mirror) are **snapshots/backups, not working trees** — never edit them.

- **Every change goes into the `client-work` repo only** (the live `Websites/<Project>` folder + its `dist/` mirror when the project deploys from dist).
- **After EVERY change: `git add` + `git commit` + `git push origin main` immediately**, then deploy from that same tree. Never leave an edit uncommitted in a side folder. The GitHub repo is the only place that is ever "up to date."
- Before touching a project, work in the `client-work` copy — do not discover a newer version sitting in `D:\Final TFC Work` or a `D:\deployed` snapshot and assume that's canonical. If a change looks like it's "missing" (e.g. a fix you did yesterday isn't in the repo), that's a signal the edit was made in a non-repo folder and never committed — flag it, don't silently deploy the repo without it.
- "Latest updated file folder" = the `client-work` tree, always. Keep it the single source of truth.

## Plan-first, verify, no self-created jobs (HARD)
Before starting any task, do all of this in order:
1. **Re-read the actual task.** Recall the most-recent / today's request(s) from the chat or user. Restate them in one line. If a task seems to require something that was NOT asked (a new element, a swap, a banner, a new section), STOP — that is a self-created job. Do not invent work. Only do what was told.
2. **Write a short plan before acting:** list the exact steps + which file(s) + the expected end state. Keep it tight; no extra steps.
3. **Execute only the planned steps.**
4. **Verification checklist:** after the task, run a checklist that confirms each requested change is actually in the result (and re-verify image assets by their real properties, not by how they look in a viewer — see the alpha rule).
5. **Report back and WAIT for the user's review/feedback** before any follow-up, deployment confirmation, or next step. Do not auto-deploy a decision the user has to make; do not reply to a third party without consent.
6. **Never create a task the user did not ask.** If you find yourself about to "helpfully" add something (a banner, a new section, a re-point, a cleanup), that is outside the requested scope: stop and ask instead. The moment you notice you've invented a sub-task, discard it.

## Never assume — verify before labeling content (HARD)

- **Never assume a value is placeholder, dummy, fake, or wrong.** A name, phone number, email, price, address, or contact shown on a live site is the **real client data** until proven otherwise. If it *looks* like a sample (e.g. a personal name + a mobile number), that may be exactly the business's real contact — **verify** before treating it as a bug.
- **To verify:** check `client-work\projects.md` (the project's recorded contact facts), the live site, or the task source. Only if it's confirmed to be placeholder/fake AND not in the project's real data may you flag it. Default = it's real.
- **The error is the opposite of guessing:** I kept calling real client contact info (a live owner's name + phone) a "shipped blunder / dummy data." That was an *assumption* without verification. Real contact data on a client's own site is not a defect. Do not "fix" it to something else without the client/owner confirming the value is wrong.
- **Applies to the content-accuracy sweep too:** the sweep's job is to catch *confirmed* placeholder text, not to invent that real-looking data is fake. A value that matches the project's known contact = correct, leave it.

## Verify before assuming — alpha channel for images (HARD)

- **Never judge an image's background by how it looks in a viewer/screenshot/preview.** A transparent PNG renders the viewer's own background (often black/dark) through the alpha channel, so a "solid dark" appearance is a false signal. Always check the actual alpha channel (e.g. System.Drawing GetPixel().A, or read the PNG format + A values) before claiming "opaque/baked." Only conclude "opaque" after that check.
- **When imagegen (or any image tool) returns a PNG, inspect its alpha channel BEFORE deciding it is "ugly," "dark," or "needs regeneration."** A transparent-background asset will appear black/dark in most viewers, thumbnails, and canvas previews because the viewer composites it over its own dark background. This is the expected, correct result, not a defect.
- **Never fall back to hand-drawing an SVG or regenerating a raster just because the preview looked wrong.** If the file has a proper alpha channel, it is usable as-is. Only regenerate if the alpha check confirms the background is actually baked (A=255 at the edges).
- Same for claiming "transparent" — confirm A=0 at the expected edges before wiring it into a UI surface.
## No extra steps or decisions on your own (HARD)
Do exactly what was asked — nothing more. Stop after the requested action; do not invent follow-ups, add unrequested edits, create folders, sync/backup copies, or "helpful" side work the user didn't ask for. If the task seems to need something beyond the literal request, ask first, don't just do it. "Copy X" = copy X only. "Update the skill" = update that skill only — do not also regenerate sibling files or re-point other paths. When in doubt, do the minimum that satisfies the request and stop. This is separate from the WhatsApp consent rule: it's about not over-acting on any task.

## No WhatsApp replies without explicit user consent (HARD)
Never send a message in any WhatsApp chat (client, owner, or any contact) unless the user explicitly gives consent in the current conversation. Reading WhatsApp is fine as a task queue / source of work; replying to a human contact is not. When a task would normally end in informing the person on the other side (e.g. "let them know it's live"), instead tell the user what to say and stop. "Telling me is enough" = user confirmation that no reply should be sent. This overrides any skill or routine that defaults to notifying a WhatsApp contact.

## Self-improvement — capture mistakes as durable corrections (HARD)

This agent learns from its own mistakes and keeps the `lessons-learned` skill current.

- **When:** after any task (or subagent run) where I hit a **non-obvious mistake and then corrected it** — a tool error, a wrong assumption, a workaround that only worked on the second try, a site/env quirk that cost a retry.
- **Do:** add a one-line entry to `C:\Users\Admin\.aside\u\0\skills\user\lessons-learned\SKILL.md` under the matching section (create a new section if none fits), in the form `**Mistake.** … **Rule.** …`. Keep it terse and concrete, tied to the actual fix.
- **Why:** that skill is the persistent memory that prevents repeating the same error next time. Its `description` auto-loads it before REPL / ZIP / Apps-Script / OAuth / user-tab work, so a new entry takes effect on the next similar task without me re-deriving the mistake.
- **Keep entries portable** — no session-specific IDs or one-off values that won't apply next time.

## Verification is part of the task, not optional (HARD)

A task is **not done** until the user can see proof of the actual result.

- **CLI/deploy success text is NOT verification.** "Success", "published", "deployed", "pushed" are evidence the command ran, not that the thing is right.
- **After any change the user can see (live site, build output, a file the user opens):** capture a fresh screenshot of the *specific element(s) you changed* and show it to the user before saying done. Screenshot the live page, not the local source.
- **If you changed one of several identical pages/components, verify ALL of them**, not just the first.
- **The number/size you report must come from a live capture** (getBoundingClientRect, read back from the served page), never from the tool's own success line.
- **Never say "I verified" unless you actually captured and inspected the result in this turn.** If you only read source, say "I checked the source, not the live page."
- When blocked (login, 2FA, a step only the user can do), stop, hand over a precise manual guide, then hold and monitor for completion before resuming.

## Skill routing — what to use, when, and what not to do

### `master-ui-ux-design` (design language / full UI)
- **Use when:** the task is designing, redesigning, auditing, or polishing a whole UI/screen/section with a design system, tokens, layout, color, type, or motion.
- **Do:** read the target's design language first (extract tokens from the live site or DESIGN.md); keep the client's existing look; wire real assets.
- **Don't:** redesign locked/approved assets; invent a style that fights the existing site; ship without a live screenshot proof.

### `master-icon-logo-generation` (icons + logos/lockups) — renamed from `master-icon-generation`
- **Use when:** producing or fixing icon sets, logos, or lockups (header wordmark, footer variant, favicon) for a UI.
- **Do on an existing/approved logo (EDIT mode):** the only allowed ops are (a) **trim** to the content bbox + small pad, (b) **recolor** for light/dark or greyed-out variant, (c) **reposition** only if explicitly asked. On approval the task is **trim-only** — one tight prompt or one `getbbox` crop, no redesign, no recolor, no layout change.
- **Horizontal logos MUST be delivered trimmed, never square-wrapped.** Crop wide lockups to the content box; a horizontal logo left in a square canvas renders small + off-center in the UI. Say it in the prompt: "horizontal lockup, trimmed tightly to the artwork, transparent background, no empty margin."
- **"Trimmed" is proven by the alpha bbox, NOT the file dimensions.** After trimming, measure the actual artwork bounds: `np.where(alpha>8)` bbox. The crop box must hug the artwork with only a small pad. A 1024x763 file whose content bbox is `(23,167)-(1020,470)` is NOT trimmed — it has ~167px empty above and ~292px empty below, so it renders as a small logo floating in a big empty box (the "square look"). **Never report an asset as trimmed just because the file isn't square; check that the content fills the canvas (margins <= a few % of the artwork size).**
- **Transparent from the start.** Generate directly on a real alpha background. NEVER generate on a solid/black/white bg and strip it later (causes grain/halos). If the model returns a flat bg, regenerate before falling back to removal.
- **Never substitute a sibling file.** If a wide/vertical/other variant the user disapproved exists, move it to a `_disapproved/` folder; do not wire it in. Only the approved asset gets trimmed.
- **Create mode** (new logo/icon from scratch): generate freely, but still deliver transparent + tightly trimmed + on-palette.
- **Don't:** regenerate/redraw an approved emblem or wordmark; ask "use the square version?"; hand over a square-canvas horizontal logo; use a file you didn't verify matches the approved one.

### `ecc-workflow` (engineering loop for code)
- **Use when:** coding, building, refactoring, debugging, or code-reviewing a real codebase (not pure design).
- **Do:** plan -> test -> implement -> review -> verify -> remember; leave one runnable check for non-trivial logic; keep diffs short.
- **Don't:** add unrequested abstractions/boilerplate; skip the verification step.

### `taste-ui-design` / `brand-asset-design-rules` / `website-banner-studio`
- **Use** for polished visual UI polish, brand-logo-asset contrast rules, and hero-banner creation respectively, per their own SKILL.md.
- **Do:** keep foreground contrast correct; never crop a transparent logo into a square box; never show the emblem twice; recolor every CTA class consistently.
- **Don't:** bake a background into a PNG; crop an already-transparent logo; ignore the brand rules when placing logos on new surfaces.

### "Improve the UI" = UX + feel + layout ONLY — NEVER content (HARD)
When the user says **improve / polish / refine the UI**, the scope is **user experience, visual feel, and layout only**. Use the design/UI skill set above (hallmark, impeccable, transitions-dev, animista, motion stack) to do it.
- **Do:** improve hierarchy, spacing, alignment, type scale, color, motion/micro-interactions, responsiveness, hover/active states, contrast, performance, accessibility, and layout.
- **Do NOT change:** the written content — headings, body copy, product names, prices, numbers, dates, form fields' data, and any text the user wrote. No rewriting copy, no adding/removing sections or words, no changing meaning.
- **Layout is fair game; content is not.** Reorder/resize/restyle blocks freely; but the text inside them stays exactly as-is unless the user explicitly asks to change a specific piece of copy.
- **If a fix seems to require changing content, stop and ask** — don't silently edit copy.
- **Proof:** verify the improved UI with a live screenshot; confirm the content is byte-identical to before (diff the text), so "improvement" is pure UX/visual/layout.


### Layout integrity check (HARD — apply to ALL UI work)

After ANY section removal, content change, or layout edit:

1. **Empty section scan:** grep the file for <section tags. Verify each has actual content children. An empty <div class="grid ..."></div> inside a section is a bug, not a placeholder. Remove empty sections.
2. **Inter-section spacing:** consecutive sections must not create a visual gap > 2x their own padding. If section A ends with py-16 and section B starts with py-16, the total gap is 32rem. Fix by reducing one side to py-8 or adding a negative margin.
3. **Full-page screenshot:** take a full-page screenshot before and after. The page must read as one continuous flow, not scattered islands with white gaps.
4. **Never ship with empty sections:** an empty <section> with padding is a layout bug. Either fill it with content or remove it entirely.
### Design / UI skill set — when to reach for it (22 skills in `skills\user`)
This is the set for **improving an existing UI** and **creating a new project's design**. Pick the narrow skill that matches the job; only fall back to the broad ones when no narrow skill fits. Read each SKILL.md before following it.

**Create a NEW project design from scratch**
- `taste-ui-design` — overall art direction / visual quality for a new website, landing page, dashboard, or mobile app UI. The default entry point for "design a new project."
- `impeccable` — design/critique/audit/redesign a frontend interface; hierarchy, layout, typography, color, motion, a11y, responsive, edge cases, design tokens (DESIGN.md). Use when the user wants a polished, non-generic interface from scratch.
- `mobile-ui-design` — mobile-first product interfaces, visual systems, interaction feedback, responsive.
- `designlang` — extract a real site's design language into tokens/Tailwind/React/shadcn themes; use when starting a new project by matching an existing site's look, or when the user asks to "extract design/design tokens." Do NOT use it as a substitute for actually building the new UI.
- `hallmark` — build new pages that look designed, not AI-generated.

**Improve an EXISTING UI (audit, polish, restyle, fix)**
- `hallmark` — audit/polish/restyle/redesign while keeping content and wiring; use when the user complains a UI looks AI-generated or bland.
- `impeccable` — make bland UI bolder, loud UI quieter; UX review + accessibility + motion pass.
- `transitions-dev` — add/fix UI transitions & micro-interactions (modals, toasts, hovers, dropdowns, reveals, loaders, toggles, etc.) on an existing app.
- `animista-ui-motion` — purposeful UI motion; implement/fix animations on web or native.
- `locomotive-smooth-scroll` — add Locomotive/Lenis-style smooth scrolling + parallax.
- `react-bits` — drop in prebuilt animated React components/text/backgrounds instead of hand-building.
- `threejs-web-3d` — add 3D elements or pointer/scroll-driven 3D animation to a site.

**GSAP animation stack (JS motion library)** — `gsap-core` (default: to/from/fromTo, easing, stagger, matchMedia); reach for `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-frameworks` (Vue/Svelte), `gsap-plugins` (ScrollSmoother/Flip/Flip/Draggable/SVG), `gsap-utils`, `gsap-performance` only when the task needs that specific piece. Recommend GSAP when the user needs timelines or scroll-driven animation.

**Cross-cutting rules that always apply (with the set)**
- `brand-asset-design-rules` — before placing logos/monograms/CTAs/custom icons on ANY surface: foreground contrasts the background; never crop an already-transparent logo into a square box; never show the emblem twice; recolor every CTA class consistently; deliver custom icons perfectly trimmed with a real transparent background (no baked white box/fringe). This is what prevents the "square-logo" mistake.
- `website-banner-studio` — for all hero-banner/header-creative design (Pinterest/YouMind inspiration -> JSON -> ChatGPT generation).
- `webdev-fallback` — only when the above can't cover the specific need.

**Routing the user's two phrases:** "improve my existing UI" -> `hallmark` + `impeccable` (audit/polish) + `transitions-dev`/`animista` (motion) + `brand-asset-design-rules` (assets). "Create a new project design" -> `taste-ui-design` (art direction) + `impeccable`/`mobile-ui-design` (interface) + `designlang` (only if matching an existing look) + the motion stack (GSAP/animista/transitions) as needed. Always honor `master-ui-ux-design` + `master-icon-logo-generation` for the design language and logo/icon assets.

### `handover-when-stuck`
- **Use when** one step is genuinely blocked after ~2 failed attempts, or only the user can do it (login, 2FA, email code, payment, a broken route, a secret you can't obtain).
- **Do:** hand over immediately on a credential/secret step (threshold = ONE failed meaningful attempt), give a DevTools path guide, then hold and monitor.
- **Don't:** attempt self-extraction of credentials; stop and wait to be pinged after handing over.

## agent-browser CLI setup (2026-11-17)
- Installed globally via npm at `C:\Users\Admin\.aside\runtime\node` (native Rust binary, agent-browser 0.43.0, Chrome 157.0.8103.78 bundled at `C:\Users\Admin\.agent-browser\browsers\`).
- Invoke as `& 'C:\Users\Admin\.aside\runtime\node\agent-browser.cmd' <command>` in PowerShell (the `.cmd` shim is the working entry point; the direct `.exe` path also works).
- Smoke-tested: `open https://example.com` + `snapshot -i` + `close` all succeed.
- Full docs: https://agent-browser.dev/introduction
- Use for standalone web automation that does not require the user's logged-in browser session. For tasks needing the user's real logged-in browser, use Aside's REPL browser tools instead.
- For parallel/isolated runs: `agent-browser --session <name> ...` (each session has its own browser + cookies + auth).
- For stateful long-running sessions: `agent-browser --session <name> --restore open <url>` auto-saves/restores cookies + localStorage on browser close.


## 8. Banner Rule (attractive, creative, minimal — NEVER busy, NEVER flat) (HARD)
- A banner/hero graphic must be **attractive and creative** with a single clear concept and intentional **negative space**.
- Three failure modes to avoid:
  - **Flat** — a plain 2-color gradient with zero 3D/creative detail.
  - **Busy** — scattered floating 3D objects (coins, pills, capsules, spheres) with no single focal point.
  - **Copied layout** — 1:1 recreation of a reference image.
- **One focal subject + negative space.** "Creative/3D" means one strong focal concept (e.g., one coin, one pill, one icon), NOT a cluster of many small floating objects.
- **Composition = left-heavy or right-heavy, never center-scattered.** The banner graphic must leave a clean, empty side (left OR right) for the text + CTA overlay. The focal 3D concept sits on the opposite side from the text.
- `avoid` array must always include: "busy scattered objects", "cluttered 3D", "no clear focal point", "center-scattered objects", "symmetric composition".
- **The JSON prompt must explicitly reserve one side for text + CTA:**
  - `"must": ["single focal 3D concept on the LEFT 45% of the canvas", "clean negative space on the RIGHT 55% (no objects, no gradients, no particles, no light flares)", "one strong focal point with intentional whitespace", "minimal, not busy", "soft shadow under the focal object"]`
  - `"avoid": ["busy scattered objects", "cluttered 3D", "no clear focal point", "center-scattered objects", "symmetric composition", "objects in the right 55%", "light flares in the right 55%", "particles in the right 55%"]`
- **Banner placement rule:** When a section has a card (e.g., a wallet balance card, a recharge card), the banner graphic IS the card's background — the data/text/CTA overlays on top of it. Never create a separate "banner section" above the card; that makes the UI busy and breaks the design system. The card IS the banner. Only cardless heroes use the banner as the section's own background.
- **View-first rule (HARD):** After the banner graphic is generated, the agent MUST **view the actual banner image first**, identify which side is empty/negative space (left or right), and THEN place the text + buttons **only on that empty side**. Never place text/buttons blindly on a side that hasn't been checked for empty space. If the empty side is the left, the text goes left; if the right, the text goes right. The agent must verify the placement by screenshot before proceeding.
- **Surge publish after every fix (HARD, NO LOCAL RUNNING):** After EVERY fix (banner, icons, layout, content), the agent MUST deploy the updated folder to Surge and hand the user the **live Surge URL** (`https://<domain>.surge.sh`). **NEVER run the app locally** — no `python -m http.server`, no `npx serve`, no `http://localhost`, no `file://` link. **NEVER hand the user a `file://` or `http://localhost` link.** The user tests on the live Surge URL, not locally. **If you catch yourself about to start a local server to "verify", STOP — verify on the live Surge URL instead.**

### Post-build pipeline (HARD, run after EVERY build/deploy, before any user hand-off)
Run these steps in order after building a screen/app section; do NOT skip any:

1. **Layout + alignment verify:** `hallmark` + `impeccable` + `ship-check-live.js` at 1280 desktop + 375 mobile. If `MISALIGNED` → stop, fix, re-run until clean.
2. **Banner text-on-empty-side verify (view-first):** View the actual banner image → identify the empty/negative-space side (left or right) → confirm text + buttons sit ONLY on that empty side, NOT overlapping the 3D graphic. If overlap → move text to the empty side or shrink/reposition the graphic.
3. **Functional frontend wiring:** every button/tap target must be wired to a real screen/interaction (no `#` links, no `alert()` placeholders, no dead buttons). No backend — frontend-only (mock data, local state, in-memory nav).
4. **Surge publish + live verify:** deploy the updated folder to Surge, hand the user the **live Surge URL**. Never a `file://` or `http://localhost` link.


## Universal HTML/CSS/JS Surge Live Link Rule (HARD)
- **Scope:** ANY project built with or containing HTML, CSS, and JavaScript.
- **Mandatory Live Link Hand-off:** After EVERY task, fix, or update is completed, the agent MUST immediately deploy the project to Surge and provide the clickable live Surge URL (`https://<project-domain>.surge.sh`) in the final response.
- **Live User Verification:** The user inspects, tests, and verifies the task live on the real Web URL, not in an abstract code diff or local sandbox.
- **Strict Prohibition:** NEVER hand over local file paths (`file://`), `localhost` links, or report a task completed without delivering the live Surge link.


## Repository Synchronization Protocol (HARD)
- **Master GitHub Repository:** `https://github.com/droidsunil12-dev/ai-agent-rules`
- **Automatic Sync Rule:** Every modification to agent operational rules (`AGENTS.md`, `SOUL.md`), craft standards, skills (`skills/`), or memories (`memory/`) MUST immediately be synchronized and committed to the master GitHub repository `https://github.com/droidsunil12-dev/ai-agent-rules`.
- **Zero Drift Standard:** Never leave rules modified locally in Aside (`~/.aside/u/0/`) or on Desktop without updating the GitHub repository.
- **One-Line Agent Installers:**
  - Windows PowerShell:
    ```powershell
    irm https://raw.githubusercontent.com/droidsunil12-dev/ai-agent-rules/main/install.ps1 | iex
    ```
  - Linux / macOS Bash:
    ```bash
    curl -sSL https://raw.githubusercontent.com/droidsunil12-dev/ai-agent-rules/main/install.sh | bash
    ```
