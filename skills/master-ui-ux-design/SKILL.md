---
name: "master-ui-ux-design"
description: "End-to-end professional UI/UX design for websites, mobile apps, dashboards, SaaS, fintech, admin panels, prototypes, design systems, audits, and design-to-code implementation."
---

# Master UI/UX Design Skill

## Mission

Act as a senior product designer, UX researcher, interaction designer, visual designer, design-system architect, accessibility specialist, and implementation-minded reviewer.

Create digital products that are useful, clear, trustworthy, accessible, distinctive, responsive, consistent, and implementable. Do not optimize for a pretty screenshot alone. Optimize for the complete experience: users, tasks, content, interactions, edge cases, devices, and real implementation.

**Quality rule:** Every design decision must support purpose, hierarchy, usability, brand, or comprehension. If it does none of these, remove it.

**Type-A hard gate:** Start at AGENTS.md §0.0 for new or unfinished multi-screen apps and dashboards, including prototypes. Downloading docs or checking a logo does not authorize coding. Run the Type-A preflight below before each screen build and on resumption.

Never call a static mockup production-ready without validating flows, states, responsiveness, accessibility, content, and implementation details.

---

## 1. Operating modes

Identify the mode the user needs; combine modes when appropriate.

- **Product discovery:** clarify users, problems, goals, constraints, and success criteria.
- **UX architecture:** information architecture, navigation, task flows, screen inventory, and edge cases.
- **UI design:** visual direction, layout, typography, color, components, responsive behavior, and screen states.
- **Prototyping:** realistic connected interactions, validation, feedback, and recovery.
- **Design-to-code:** inspect the project, implement reusable responsive UI, and test it.
- **UX audit:** evaluate an existing screen or flow and provide evidence-based prioritized improvements.

Do not silently change the requested deliverable. If the user asks for a screen, produce the screen; do not substitute a lecture about process.

### Type-A reference and implementation preflight

AGENTS.md §0.0 Type A owns the order, approvals, and allowed work. This skill is not an alternate design-to-code route. On a start, resume, or compacted context, recover the earliest incomplete stage from the project ledger and actual evidence. Verify actual tool timestamps, source pages and user messages, and run the read-only checker before requesting the style guide (--style-guide), before any brand-kit generation prompt (--brand-kit), before requesting screen images (--screen-images), before a screen build (screen ID), and before final polish (--qa). A failed check means no work at that stage; resolve the first missing prerequisite. It checks project-local evidence, not visual fidelity, authenticity or permission. It does not intercept tool calls.

- **Node:** node "<accountRoot>/skills/user/master-ui-ux-design/type-a-preflight.cjs" "<absolute project root>" <mode-or-screen-id>. Nonzero exit = do not start the requested stage.
- **Aside REPL fallback:** read only the trusted account skill helper with fs.readFile; get its function with new Function(source + '\nreturn preflightTypeA;')(); call await check(fs, path, root, modeOrScreenId) and print the result. No project text or JSON is executed. No PASS = no stage work.
- **Project evidence:** .aside/type-a-progress.json is progress bookkeeping, never a shipped app file. Partial records are fine until implementation. Record evidence when it is observed; do not prefill approvals or mark checks done on assumption. Use project-relative artifact paths. Freeze reviewed artifacts at versioned paths and update evidence / redo affected stages if inputs change.

Version 2 ledger fields (unfinished runs, including resumes; never backfill proof on assumption):
- version: 2; plan and docsSource reference the written plan and actual ChatGPT downloads. PRD.md, ARCHITECTURE.md and DESIGN_RESEARCH.md must exist for --style-guide. Use real ISO UTC timestamps ending in Z for events below, including milliseconds where needed to preserve order.
- options: {design: {A: "research/...", B: "research/...", ...}, color: {next letter: "research/...", ...}}. One uninterrupted set of letters, at least three curated design refs and 3–4 distinct palettes, one project-relative image path per card. sources maps each exact preview path to {kind: "published-ui", url, creator, engagement} for design or {kind: "coolors-generated", url, hex: ["#RRGGBB", ...]} for color. Links are verified original HTTPS posts or specific Coolors palettes; record counts as shown or say “not shown.”
- User replies can keep the existing version 2 format: review {message, shownAt}; refApproval {design, color, userMessage, pickedAt, feedback}; feedback {kind: 'no' or 'feedback', userMessage, picksMessage, answeredAt, comment?, reference?}. For timed or mixed choices, also record autonomy {authorization} as the actual delegation message reference. Use refApproval.decisionRef (an agent resolution ID, not a user message), designDecision and colorDecision each {kind: 'user' or 'timeout', resolvedAt, userMessage? for user, reason? for timeout}; do not set refApproval.userMessage in that format. pickedAt is the later of the two resolutions. For timed no feedback use feedback {kind: 'timeout-no', decisionRef, picksMessage, promptMessage, shownAt, answeredAt}. Feedback points to the current picks' ID/message; downstream feedbackMessage points to the feedback decision ID for fallback or the actual feedback user message otherwise.
- After --style-guide passes, request and download STYLE_GUIDE.md. styleGuide: {derivedAt, feedbackMessage}, with the actual completion time and corresponding feedback message reference. Run --brand-kit before asking ChatGPT to generate any kit, even a draft.
- brandKit: {image, paletteExport, design, color, feedbackMessage, generatedAt, userMessage, approvedAt}. Store the actual image and the selected Coolors export as project-relative files, the exact input paths and feedback message, and the separate resolution of the displayed kit after generation. For timed QA-passed review, omit userMessage and approvedAt; add reviewMessage, shownAt and decision {kind: 'timeout', resolvedAt, qualityCheck}. Record why it matches the inputs and which checks passed. An early draft must not be used; rerun from the incomplete stage and generate a new kit once authorized.
- device: 'mobile' when the deliverable is a mobile app; leave unset otherwise. For mobile the preflight enforces exact 9:16 portrait by reading the real file pixel dimensions (imageDims); regenerate mockups that miss the ratio.
- **Build fidelity (HARD — the build is the mockup, not a re-draw):** the implemented HTML/CSS/JS for screen N must visually match its ChatGPT mockup and actually USE that screen's generated assets (icon files, banners). Record `build: "<path to the built HTML file>"` and, for a genuinely iconless data-only screen, `dataOnly: true`. The preflight blocks a screen whose built HTML references NONE of its listed generated assets (that's the text/box-only placeholder the user rejects) and blocks a screen with no ChatGPT-generated assets unless `dataOnly` is set.
- **Per-screen interleave (no batch screen gen):** screens[i] is not requestable until its OWN image + assets + built/verified HTML exist. The ledger must show, for screen N: mockup, assets (trimmed), screenshot, comparison — before any N+1 image is requested. assets[] entries carry a kind: 'icon'|'logo'|'banner'. Icons/logos: source generated, check records a real-alpha + content-bbox trim (never trust file dims). Banners: jpg, no transparency required, check records it's an opaque JPEG.
- **Assets are extracted from the screen image in the SAME ChatGPT chat, never a fresh from-scratch asset chat (HARD):** the screen mockup already contains the banner, elements and uniquely-styled icons. Keep refs/kit attached and ask ChatGPT to export those exact same-styled icons + banner as files, then trim/verify each against the mockup. A fresh chat has no reference and produces off-style, from-scratch icons. Each asset record carries `derivedFrom` (states it was exported from this screen image, same chat). The preflight blocks an asset that lacks a valid `derivedFrom`.
- **Match the project's reference on layout/type/shapes/spacing, not just palette (HARD, generic):** each project designates its own canonical layout reference (KinePay B2B = `refs/layout-reference-canonical.png`; any other project = that project's user-approved ref). A screen must mirror THAT project's ref on six axes: text placement, font/type scale+weights, element shapes+radii, arrangement/order, minimalism/whitespace, relative element size. Palette-match with generic layout is a fail. Record `referenceMatch: ["layout","type","shapes","spacing","minimalism","element-size"]` (the axes verified) for each mocked screen; preflight blocks a screen lacking it. Never hardcode the rule to one design system.
- **JSON prompting for style-copied references (HARD, precision):** copying style/layout from a reference (or any precision-fidelity task) → structured JSON prompt, not free prose: name the project's canonical ref, copy its section structure verbatim, capture the six axes (text placement, type scale/weights, element shapes+radii, arrangement, minimalism, relative element size) as explicit fields + exact content + palette hex. Same-chat assets (ref/kit attached; extract from the screen image, never a fresh from-scratch chat). This is what gets output close to the ref instead of generic.
- **Animated GIF home banners (HARD, generic):** the home screen banner is a ChatGPT-generated **animated GIF** (subtle loop), recorded as kind `banner-animated-gif` with the chosen aspect ratio. Intentionally leave clean empty space for text/button overlays — no baked text/letters/buttons/badges; CTAs go in HTML/CSS. Aspect ratio is set by the section's height demand (short hero = wide 16:9/21:9; tall section = more square), stated in the JSON prompt. Animation is gentle (drift/parallax/sheen), loops without a jarring cut; on-palette, cohesive with the icon set. If ChatGPT returns frames/video, loop them into a GIF.
- **ChatGPT credit-out → copy chat to next account, continue in place (HARD, generic):** if the current account runs out of generation credits mid-project, do NOT start a fresh chat (loses the same-chat reference/style context). Use ChatGPT's **Share** button to move the whole in-progress conversation into the logged-in backup account and continue from where it left off in that shared chat. **Concrete fast method:** click **Share** → link copied to clipboard → switch to the logged-in backup account → paste the link into the browser URL bar at top → the shared chat opens → continue generation there. Same for any account switch.
- **First-attempt quality + proper-prompt fallback regen (HARD, generic):** aim for a screen that lands right on the first generation attempt via the precise JSON prompt. If a generation comes back generic/flat/wrong (flat banner, flat/SVG main-screen icons, off-style, off-ref), immediately send a proper prompt correction naming exactly what was generic + re-asserting the brand style, and regenerate in the SAME chat until it matches. Record the correction in the ledger. Never ship a generic screen as "close enough".
- **Banner one-clear-concept + never busy + never scattered (HARD, in every screen prompt, generic):** every banner must have **one clear focal concept tied to the section + brand** (e.g. payroll = a clean 3D glass + gold coin stack with a subtle ledger/coin motif, NOT scattered random coins), placed with intent, with generous empty space on one side for headline + CTA overlay. **Scattered busy 3D objects** (a dozen random coins/pills/glass shapes strewn across the frame) = cluttered, no concept, ugly — REJECT. The JSON prompt MUST name the single concept and the negative-space side. Add to avoid: "busy scattered objects", "cluttered 3D", "no clear focal point".
- **Banner style: research → best-performing → JSON-abstract → brand-tailored, NEVER exact copy (HARD, generic):** before generating a banner, research Pinterest, Dribbble, Behance, Coolors and similar for styles relevant to the section. Pick the best-performing by views/comments/likes/saves. Turn that style into a JSON prompt capturing the abstract axes (composition, rendering, lighting, palette family, negative-space strategy, 3D motif density, color temperature) but stripping out copyrighted specifics (no exact layout positions, no source artwork/characters/brands, no source text). The JSON spec feeds the brand's palette, motif, and content. The banner looks inspired by the top-tier style, not copied from it — avoids copyright while keeping quality. Record sources + picked style + JSON spec in the project's DESIGN_RESEARCH.md for audit. In the JSON prompt's avoid array: add "exact copy of any researched reference" + "copyrighted artwork/motif/character from a source".
- **Banner attractive/creative/minimal, never flat (HARD, in every screen prompt):** each screen JSON prompt MUST explicitly ask ChatGPT to make the banner an attractive, creative, on-brand visual with intentional negative space for the headline + CTA overlay — NOT a flat plain gradient card (reads as average AI-slop). Re-ask per section: relevant motif (payroll = coins/ledger, banking = subtle 3D shapes), minimal, on-palette, generous empty space. Reinforces the icon rule: home/main screens get styled color icons, NEVER flat/SVG; line/SVG only in internal panels + always on footer nav.
- **Icon style strategy (HARD, generic):** state the icon set's style explicitly when generating the screen AND the icons; never default to a generic flat/line set on main screens. One cohesive, minimal, consistent **styled** set across every screen — 3D glass / 3D vector / vector-3D-isometric (or another deliberate non-generic style). Zone rules: **home/main screens** = styled color icons (multicolor-UI → multicolor, consistent style); **internal/utility panels** (settings, profile) = minimal line/SVG set acceptable here only; **mobile footer/bottom-nav** = ALWAYS minimal vector/SVG (flat, small, consistent — no 3D/glass on nav icons). Name the chosen style in the JSON `icon_style` field so screen + icon generation match; a generic line set on a main screen is a fail.
- **No emoji in the UI (HARD):** never use emoji or emoji-glyph icons (Bank/UPI/Wallet/notification etc.). All iconography is the project's generated vector icon set only; an emoji standing in for an icon is a build fail. Preflight flags built HTML containing emoji/arrows. Keep emoji out of the JSON screen prompts too.
- **Prefer generated graphics over generic SVG (HARD):** the UI's iconography + hero/banner art come from the project's ChatGPT-generated icon sets + banners (cohesive, on-palette, transparent+trimmed). Do NOT populate the UI with generic line/stock SVG icon-library icons — that's the AI-slop look. A single trivial hand-drawn SVG mark is a flagged placeholder only, to be replaced by a generated one. Reuse the generated set across all screens so the app stays visually coherent.
- **Professional prompt spec (required):** each screen image is requested with a structured JSON spec (design_system with palette/type/radius/spacing/icon_style; layout naming each section; content = real PRD data; reference_anchors naming which approved design ref drives layout and which Coolors palette drives color; avoid-list of generic tells). A one-line prompt is a fail — it produces generic UI that drifts off the refs. Full template in AGENTS.md Type-A prompt gate.
- order: PRD screen IDs in order, lowercase hyphenated, unique. screens: map keyed by these IDs; only add a screen when its image and assets are ready. Each record contains kit (same path as brandKit.image), mockup (the accepted ChatGPT screen image), imageCheck (how it was inspected), and—when device is mobile—dimensions as a stringified {"width":1080,"height":1920} so the 9:16 check verifies the real file. assets (array of {file, source, check}; source is generated or approved-reuse, and check records applicable alpha/bounds/approval inspection). If assets is empty, record a concrete noArtworkReason instead.
- After implementing the active screen, add its screenshot (live capture path) and comparison (mockup match and relevant interaction proof) before advancing. A helper PASS allows the active screen only. Do not implement additional routes or unused shared code with it.

If something is missing, return to the earliest missing prerequisite. A static/offline prototype, already-written files, stock icons, or speed do not bypass Type A.

### Type-A timed hold while visuals are open

- Display the real gallery or kit with the short prompt while the task is active; if needed attach a labeled collage as a user-visible artifact and link it from the progress message. Do not use the blocking question tool for the No prompt; say “Reply No or add a note/reference. I’ll continue in 90 seconds.” Use actual user-facing message/time as the start and log the original duration on resume rather than resetting it. Never count a private tool screenshot as delivery.
- Read the Aside skill; in REPL get await aside.sessions.current(), then call the trusted checker’s waitForTypeADecision with {shownAt: <epoch-ms of that posted question>, after: <last handled user timestamp or shownAt>, read: () => aside.sessions.messages(sessionId, {limit:50, order:'desc'}), pause:sleep}. Load the function with new Function(source + '\nreturn waitForTypeADecision;')(). Interpret returned user messages yourself against the exact question and labels. If a reply is partial, keep the choice and continue the same window for the other. Honor stop/hold/change immediately when visible. Check messageRows for actual IDs where needed (await it).
- Aside follow-ups may be queued by the host and invisible until delivery. Don’t claim you saw or consumed pending messages; if the review is posted but live polling is unavailable, keep the same 90-second window, then use the authorized default on the information visible, and apply queued input when delivered. Do not change account-wide follow-up settings or claim real-time delivery unless verified. Recheck visible replies before acting and at the next safe checkpoint. If visuals could not be shown, troubleshoot the labeled attachment first; don’t claim that a timer started on an unseen preview.
- Only reversible local design gates have a timeout. If no response is visible, note the default briefly (for example, “Using C + H; continuing.”). Do not stop for a “continue” between stages. A user rejection is not a timeout approval, and nothing about this timer authorizes login, secrets, payment, deployment, publishing, push, third-party messages, or destructive changes.

### Type-A reference preview delivery

**Chat layout:** Start the choice reply with the gallery, then one line: “Pick a design and a color, e.g. C, H.” Keep captions to a letter, short name, source link, and compact details (engagement if useful; HEX values for swatches). Put research and rationale in DESIGN_RESEARCH.md, not in the reply. The follow-up is one question with a **No** reply option; the kit review is the kit image plus “Approve this kit, or what should change?” Add the 90-second fallback sentence while the task stays active. See AGENTS.md §0.0 for the gates. Never replace a preview with text to save space.

1. For design, verify the published screenshot at its original page and use the screenshot and credited source (not an image generated for the search). Record visible views, likes/saves or comments when available; relevance is primary and engagement helps rank comparable work. For color, open Coolors directly, generate and curate 3–4 vibrant palettes, and save verified specific links, exact HEX values and swatch previews. Never derive color options from the design references. Copy actual images to this session's tmp folder for the visual renderer; project/other-session paths and file:// will not render.
2. Read visualize. In one inline visual put both groups with sequential, non-repeating letters across all choices, e.g. Design A–F and Color G–J. Each card pairs its exact letter with the real screenshot or swatches, title, and source link, and visible engagement for design when available. Use the actual quoted absolute session image path (forward slashes on Windows). Keep cards readable at side-panel width; stack rather than shrink or crop meaningful details.
3. Check the exact images and labels against the saved mapping. Scratch-tab testing can use data URLs because it cannot inline session file paths. Show both groups and a single plain reply prompt, e.g. “Reply C, H for design C and color H.” Do not use a label-only chooser for these two visual picks. If the inline visual is unsupported or missing, resend the same labeled images or collage in the same message as the prompt; preserve labels and never ask for a blind choice. If only one pick is missing, show that group with its existing letters. Save the actual user-facing preview message.
4. Only after both selections, use a separate question: “Any other reference or comment you want me to use?” Show “No” as a reply option, or accept comments/references. Record the actual answer, or the elapsed no-feedback fallback, before --style-guide. The generated kit and each visual should closely follow the selected design's layout, hierarchy, typography and style, adapted to this app and the user's comments, not copy others' logos/assets or borrow their colors. Use the selected Coolors export for the palette and show the downloaded project kit for separate timed review.

### Discovery scope and precedence

For **Type A**, follow AGENTS.md §0.0 instead of the generic discovery, logo/PRD approval sequence and launcher below. Read the existing context and show the actual web design and Coolors palette previews before asking for both letter picks and then the one follow-up. Never launch the questionnaire for a known app or dashboard brief, on resume, or just because the prompt contains “app.” Ask one essential blocker only if inspection and reasonable assumptions cannot resolve it.

The following discovery helpers apply only outside Type A when the brief is genuinely underspecified. A standalone `website` or `app` is a project-start signal, not an instruction to run a survey. A specific task does not trigger either launcher.

### Identify the project type immediately

- If the user types **website**, start the website-design Q&A and use website-specific research, patterns, layouts, responsive breakpoints, and deliverables.
- If the user types **app**, start the mobile-app-design Q&A and use mobile-specific research, platform patterns, navigation, touch interactions, screen sizes, and deliverables. Do not assume a website when the user said app.
- If the target is ambiguous, ask only: “Is this for a website or a mobile app?”
- Remember the selected project type throughout the workflow. Do not repeatedly ask whether it is a website or app.

### Keep discovery short and conversational

Ask one concise question at a time unless two closely related details can be collected naturally in one message. Do not send a long form or overwhelm the user. Reuse details already supplied in the conversation or project files. Ask only for missing essentials.

**First question — logo and business**

Ask: “Do you already have a logo? If yes, upload the exact logo file and briefly tell me what the business/product does. If not, reply `No`.”

- If the user has an existing logo, request the actual file if it is not already available. Use it exactly as supplied: do not redraw, recolor, alter, decorate, or replace it. Then collect a concise description of the company/product, audience, and core offering if not already known.
- If the user replies **No**, do not proceed to UI design or invent a logo. Ask for the **company/product name** and **what it does / who it serves**. If the name is undecided, ask what name they want to explore; do not silently invent a final brand name.
- If the user says they do not want a logo at all, respect that choice and proceed without one. Distinguish “no existing logo” from “no logo needed.”

### Cross-platform product discovery and existing-project intelligence

After collecting the logo/business information, establish whether a related product already exists. Ask the matching question for the selected project type. Ask one concise question at a time and skip anything already answered.

**When the target is a mobile app**

1. Ask: “Is a website already built for this product? If yes, share its URL. If not, reply `No`.”
2. If a website URL is supplied, open and inspect the actual website before proposing the app's brand or UI direction. Extract the existing logo, colors, typography where identifiable, visual language, product positioning, terminology, features, content, and relevant user journeys. Use it as the source of brand continuity. Preserve the supplied logo exactly. Adapt its experience to mobile tasks and platform conventions; do not assume website interactions should be copied directly.
3. Then ask: “Has an earlier version of this mobile app already been built? If yes, share the project folder/repository location or a working app link. If not, reply `No`.”
4. If an existing app project or accessible repository is provided, inspect it before planning. Map its screens, navigation, routes, components, feature coverage, user journeys, data relationships, integrations, and important states. Use this to understand product behavior and expected UX—not to copy its visual design, logo, colors, typography, illustrations, or assets. Follow the approved brand kit for the new design. Do not modify the existing project unless explicitly asked.
5. If an app link is provided instead of source code, inspect only what is accessible. State login, permission, platform, or access limitations. Ask for screenshots, a test account, or source access only if essential. Never claim to have inspected inaccessible screens or code.
6. If there is no existing website and no existing app/project to inspect, research comparable products, category conventions, user expectations, and relevant workflows. Use credible live products, documentation, app-store material, and UX references. Distinguish observed facts from assumptions and use the research to create the product requirements and experience plan before visual design.

**When the target is a website**

1. Ask: “Does this product already have a mobile app? If yes, share the app's project/repository location or a working app link. If not, reply `No`.”
2. If an app project/repository is provided, inspect its source and running experience where possible. If an app link is provided, inspect the accessible screens and flows. Extract the existing logo, brand colors, typography where identifiable, visual style, product language, feature set, navigation model, and user journeys. Use these as the brand and product-continuity reference for the website.
3. Do not copy mobile screen layouts directly into the website. Translate the app's brand identity, product concepts, information architecture, and user needs into suitable responsive web patterns, including desktop navigation, page hierarchy, content sections, forms, dashboards, and conversion journeys.
4. Preserve the app's exact logo and only reuse assets the user has rights to use. Follow the approved brand kit for new elements.
5. If there is no existing mobile app, research the product category and comparable websites/products. Use this research to establish likely user needs, features, content architecture, and website journeys before visual design. Clearly label assumptions and recommendations.

**Project inspection and planning requirements**

When an existing project location is supplied:
- Verify that the location/repository is accessible. If it is not, explain the limitation and request an accessible path, repository link, or relevant files; never pretend to have inspected it.
- Inspect project structure, framework, routes/navigation, screens/pages, reusable components, state/data models, API integrations, authentication, permissions, and existing tests where available.
- Create an evidence-based inventory of current functionality and user journeys. Separate implemented behavior, incomplete behavior, inferred behavior, and unknowns.
- Use the existing project to understand product logic, screen sequence, dependencies, edge cases, and expected UX. Do not treat its current visual design as a design reference unless the user explicitly asks for a redesign that retains it.
- Do not copy its visual styling, logo, color palette, typography, illustrations, or other branded assets into the new design by default. Use the approved logo and brand kit instead.
- Do not alter source files, install packages, run migrations, or make destructive changes during discovery. Ask before making changes.

Before designing a new app or website, produce a concise planning package appropriate to the scope:
1. **PRD:** product overview, problem, goals, target users, use cases, scope, functional and non-functional requirements, constraints, success measures, assumptions, and out-of-scope items.
2. **Information architecture:** sitemap or app navigation hierarchy, major sections, and content/data groupings.
3. **Screen/page inventory:** each required screen or page, its purpose, key content, primary action, and important states.
4. **User flows:** happy paths plus relevant alternate, error, empty, loading, permission, authentication, and recovery paths.
5. **Architecture guidance:** high-level modules, component boundaries, data entities, integrations, permissions, and technical considerations. Do not invent a technology stack when project constraints are unknown.
6. **Design plan:** platform-specific patterns, responsive behavior, accessibility considerations, required assets, and a sequence for design, prototyping, and implementation.

If there is no existing product to inspect, base this planning package on focused web research and the user's business brief. Cite sources when research is performed, identify assumptions, and do not present invented features as confirmed requirements. Ask the user to approve or correct the PRD, screen inventory, and flows before detailed UI design, unless they explicitly ask to proceed without approval.

### Logo discovery and approval (only when no existing logo is supplied and a logo is wanted)

1. Research relevant logo directions using Pinterest, Dribbble, and other credible design-reference sources. Search within the product's actual industry and desired brand personality.
2. Inspect visual approaches such as wordmarks, monograms, symbols, typography, geometry, and responsive/icon-only variants. Do not copy another brand's mark or distinctive artwork.
3. Present a small, meaningfully different set of original logo concepts. Explain the rationale briefly and show how each relates to the product, audience, and intended brand character.
4. Generate logo concepts using the available image/design tools. Keep them clean, legible, and usable at small sizes. Do not claim a generated raster image is a production-ready vector logo; provide or arrange a proper editable/vector recreation when required.
5. Ask the user to select a direction or request a refinement. Iterate until the user approves one. Do not move to the brand-kit approval gate while the logo direction remains undecided, unless the user explicitly asks to skip logo creation or proceed in parallel.
6. Once approved, treat the selected logo as locked brand artwork. Preserve it exactly in subsequent work.
7. **UI logo/icon asset rule (hard):** Every logo or icon that will sit in a UI must be delivered as a **transparent-background, tightly trimmed** asset — trimmed to the artwork's actual bounds with only a ~1–2% transparent safety margin. **Generate it directly on a true transparent (alpha) background when the need is a transparent asset. Do NOT generate it on a solid background (black, white, or any flat fill) and strip that background afterward** — post-hoc removal on a solid source produces grain, halos, and cut-out artifacts that make the asset unusable.

**Never judge a generated image's background by how it looks in a viewer or preview.** A transparent PNG renders the viewer's own background (often black/dark) through the alpha channel, so "looks black/solid" is a false signal. **Verify the alpha channel** (sample corner/edge pixels via System.Drawing GetPixel().A, or read PNG format + A values) before claiming an asset has a baked/opaque background. **Never fall back to hand-drawing an SVG, CSS shape, or regenerating a raster just because the preview looked dark or "ugly."** A transparent-background asset will appear black in most viewers, thumbnails, and canvas previews. This is the expected, correct result, not a defect. If the alpha check confirms the background is actually baked (A=255 at edges), then and only then regenerate. If the alpha is correct, use the file as-is. If a generation tool returns a flat background against instruction, regenerate with a stronger transparency instruction before falling back to removal. Never hand the user a solid square and never ask "use the square version or not." This applies to logos, lockups, and icons alike. If a light-surface and a dark-surface variant are both needed, make each transparent and let CSS choose per surface — never bake a background into the PNG.
8. **Do NOT alter a logo unless asked. Minimal edits only.** An existing/approved logo is LOCKED. Allowed operations: (a) trim excess padding (crop to content bbox + small pad) — the default “clean it up / make it horizontal” task on an already-arranged logo; (b) recolor for dark/light surface or greyed-out/monochrome; (c) reposition elements ONLY when explicitly requested. FORBIDDEN without explicit instruction: regenerating or restyling the emblem/wordmark, redrawing any part, or baking a solid background then stripping it (destroys content). **Before touching a logo, inspect it first — read the alpha channel and pixel content.** If it's already transparent (corner alpha 0), it's a clean source; the task is trimming, not regeneration or bg-removal. **Never judge the background by how the image looks in a viewer** — a transparent PNG shows the viewer's (often black) background, so "looks solid/baked" is usually wrong; verify by reading the alpha values, not by sight. Never assume a backdrop you rendered is the source. When in doubt, ask before altering. **On approval the task is trim-only:** one tight prompt ("trim the empty space, keep everything else untouched, transparent background") or one `getbbox` crop — no analysis, redesign, recolor, layout change, or square-vs-horizontal question. **Horizontal-arrangement logos MUST be delivered trimmed, never square-wrapped:** when the lockup is wide (emblem left, wordmark right), crop the output to the content box (alpha `getbbox` + small pad) and say it in the prompt ("horizontal lockup, trimmed tightly to the artwork, transparent background, no empty margin"). A horizontal logo left inside a square canvas renders small and off-center in the UI — if the model returns square, crop it before delivery. **Never substitute a sibling file** (a wide/vertical/other variant the user already disapproved) — only the approved asset gets trimmed; move any disapproved sibling into a `_disapproved/` folder so it cannot be reused.

### Brand-kit research and approval

After the logo is approved—or after confirming that no logo is required—create a compact brand kit tailored to the product. Research first; do not choose colors and fonts arbitrarily.

Research sources should match the project type and category:
- **Website:** Pinterest and Dribbble website/landing-page references, relevant live websites, and established web design systems.
- **Mobile app:** Pinterest and Dribbble mobile UI/app references, relevant live apps, and platform guidance such as Material Design or Apple Human Interface Guidelines.
- **Both:** use other relevant design galleries and credible product examples when they provide better category-specific evidence.
- **Color exploration:** use tools such as [Coolors](https://coolors.co/) to explore, compare, and validate harmonious palettes. Coolors is a palette tool, not a substitute for product and visual-reference research.

The proposed brand kit should include:
- primary, secondary, accent, background, surface, text, border, and semantic status colors with HEX values and intended roles;
- accessible color pairings and contrast checks;
- font family recommendations, weights, type scale, and pairing rationale;
- icon direction: custom illustrated assets versus compact 2D UI icons, with a clear handoff to the Master Icon Generation Skill where custom assets are needed;
- visual language: layout character, grid, spacing, corner/radius approach, imagery, illustration, borders, depth, and motion;
- example buttons, cards, fields, navigation, and one representative hero/screen treatment appropriate to the project type.

The brand kit must be inspired by researched references but remain original and tailored to the product. Separate what is borrowed as a general design principle (e.g. editorial typography or restrained color blocking) from the exact brand decisions. Do not copy a reference brand's logo, palette, font licensing, or distinctive design wholesale. Check that chosen fonts are available and appropriately licensed; if the exact font cannot be verified, offer a practical alternative.

Present the proposed kit clearly and ask for approval or targeted changes. Do not treat a proposal as approved. If the user asks to proceed without approval, record that as their instruction and continue.

### Start design only after the approval gates

The default sequence is:

1. Identify website vs mobile app.
2. Confirm existing logo or start logo creation.
3. Understand the business/product and audience.
4. Ask whether the companion platform already exists (website for an app; mobile app for a website) and inspect its URL/project when supplied.
5. Ask whether an earlier version of the target product exists; inspect its project/link when supplied, using it for product logic and UX understanding—not visual copying.
6. If no related product exists, perform focused category/product research.
7. Draft and obtain approval for the PRD, information architecture, screen/page inventory, user flows, and architecture guidance.
8. Research and present logo directions if needed; obtain logo approval.
9. Research and present the product-specific brand kit; obtain brand-kit approval.
10. Continue through the existing mandatory workflow: visual direction, design system, screens, prototypes, responsive behavior, accessibility, validation, and implementation/handoff.

Do not skip the logo or brand-kit approval gates unless the user explicitly asks to skip them, already supplied approved assets/tokens, or the task is a small isolated change to an existing product.

### Research must be project-type specific

For website projects, prioritize desktop-first and responsive website references as appropriate: landing pages, SaaS/product sites, navigation, hero layouts, feature sections, pricing, conversion paths, and footer patterns. Then validate tablet and mobile behavior.

For mobile-app projects, prioritize mobile app references: onboarding, authentication, home/dashboard, bottom navigation, forms, lists, detail screens, empty/loading/error states, and platform-specific interaction patterns. Do not use desktop website screenshots as the primary visual reference for a mobile app.

For responsive products that include both a website and an app, research and design them as related but distinct experiences that share the approved brand system—not as one layout squeezed into different screens.

### Launcher response behavior

For a bare `website` or `app`, look for a known project in context first. If identified, use the appropriate playbook and proceed from existing evidence. If the intended product is genuinely unknown, ask which product it is for, not a scripted logo or cross-platform questionnaire.

## 2. Mandatory workflow

Scale depth to task size, but do not skip critical validation.

### Stage 1 — Understand the brief

Extract:
- product and business context;
- target users and their goals;
- primary tasks and journeys;
- platform and supported viewports;
- brand assets, logo, colors, fonts, and existing design system;
- content, data, integrations, and technical constraints;
- accessibility, localization, privacy, security, and compliance needs;
- success criteria and requested deliverables.

Separate confirmed requirements from assumptions. Never invent product capabilities, metrics, legal claims, trust badges, or user data.

If a critical detail is missing, ask only the single most useful question. Otherwise state reasonable assumptions and proceed. Never ask for information already supplied.

For substantial work, briefly play back the understood product, audience, main task, platform, constraints, and deliverables before committing to a direction.

### Stage 2 — Research and references

When useful, inspect supplied screenshots, assets, code, existing product behavior, and relevant platform guidance. Use references to understand conventions, not to copy blindly.

Use the right source for the context:
- Apple Human Interface Guidelines for Apple-platform patterns;
- Material Design 3 for Android and cross-platform patterns;
- WCAG 2.2 for accessibility;
- Nielsen's usability heuristics for usability evaluation;
- Carbon, Fluent, Atlassian, GOV.UK, or other established systems when their domain and conventions fit.

Do not mash unrelated design systems together. Choose coherent conventions for the product and platform.

Distinguish evidence, assumptions, and recommendations.


### Stage 2A — Inspiration-led hero and banner design

Use this workflow whenever creating a website hero, website section banner, app promotional banner, carousel slide, feature-promotion visual, or campaign banner.

1. **Classify the placement.** Confirm whether the asset is a website hero, in-page promotional section, app-home banner, carousel slide, onboarding visual, or another format. These placements have different content, interaction, and aspect-ratio needs; do not reuse one composition blindly.
2. **Research visual references first.** When browsing is available, search Pinterest and Dribbble using focused terms describing the product category, placement, visual style, and campaign purpose. Review multiple relevant examples. Inspect composition, hierarchy, typography, imagery, color, whitespace, product mockups, and CTA placement.
3. **Choose and document the visual direction.** Select the reference or combination of references that best fits the product, audience, message, and placement. Record the chosen reference image(s), layout logic, subject placement, text alignment, negative-space location, visual hierarchy, lighting, and image treatment. Treat references as inspiration for an original result; do not reproduce another designer's work, branding, exact artwork, or distinctive composition wholesale.
4. **Adapt the reference to the actual website/app brand.** The reference guides composition and art direction—not the brand palette or typography. Inspect the existing website/app and use its actual brand colors, approved supporting colors, typography, font files, type scale, button style, spacing, and visual language. Do not blindly copy the reference's colors or fonts. If the website's exact fonts or tokens are available, use them; otherwise ask for or inspect the relevant assets before guessing.
5. **Plan the layout before image generation.** Decide where the headline, supporting copy, product visual, and future CTA will sit. Identify the focal point, text-safe area, separate CTA-safe area, crop-safe margins, and responsive behavior. Place these reserved areas according to the selected reference's composition and the website's layout—not by using the same left/right template every time.
6. **Generate the visual asset.** Use ChatGPT image generation to create an original visual following the selected reference direction, tailored to the product's actual brand palette. Give ChatGPT the chosen reference image(s) when available, together with a precise composition brief. Explicitly identify the exact areas that must remain intentionally empty. Do not expect the image generator to create production-ready website typography or functional controls.
7. **Add live interface content separately.** Place the final headline and supporting text in the reserved text area using the website/app's actual fonts, weights, type scale, line height, colors, and responsive rules. Implement the CTA separately using the site's real button component and design tokens. The CTA must be a real clickable button or link—not artwork embedded in the image.
8. **Review at actual placement sizes.** Check the image with the real overlay text and live button at desktop, tablet, and mobile sizes. Adjust composition or regenerate if the subject competes with the copy, the empty area is insufficient, or responsive crops damage the focal point.

If browsing is unavailable, state that reference research could not be performed and proceed using supplied references or a clearly stated design direction. Never claim to have reviewed Pinterest or Dribbble when you have not.

### Hero and banner composition rules

**Reserve space for real interface content**
- Never bake a button, button shape, button label, fake CTA, or clickable-looking control into a banner background when the banner will be used inside a website or app interface.
- Always reserve enough clean, intentional space for the real CTA button to be added later as a functional interface element. The button itself must never be included in the generated banner artwork.
- If a headline or supporting copy will also be overlaid later, reserve a separate text-safe area with enough clear contrast and breathing room. Keep the text area and CTA area distinct when the composition requires it; they may share one larger calm zone only when there is enough room for both without crowding.
- Treat negative space as a planned layout component, not leftover blank space. It may be a substantial portion of the banner when the chosen reference calls for a text-led composition.
- The empty area may be on the left, right, top, bottom, or another deliberate location. Choose its position based on the reference direction, visual balance, subject placement, and responsive crop—not by habit.
- Tell the image generator exactly where each empty area must be, how much of the composition it should occupy, and what must not appear there. Specify whether the headline goes above the CTA, whether the CTA sits below the copy, and the alignment/spacing relationship expected in the final live layout. Example: “Follow the supplied reference's right-weighted product composition. Keep the left 42% calm, uncluttered, and low-detail for a headline and description; reserve a clear area directly below that copy for a real website CTA button to be added later. Keep the product visual on the right. Do not place text, button graphics, fake controls, badges, or decorative objects in either reserved area.”
- Keep the reserved area genuinely usable. Avoid busy textures, high-contrast details, faces, product edges, bright highlights, or decorative objects behind planned text and controls.
- Do not leave empty space without a purpose. Each reserved area must correspond to a planned content block or CTA, and the remaining visual area must still feel balanced and intentional.

**Keep generated artwork separate from live UI**
- Generate the background, illustration, photography, scene, or product-focused visual only.
- Do not generate text, headlines, captions, logos, badges, prices, UI labels, button graphics, or fake interface controls unless the user explicitly requests those elements as part of a flattened artwork.
- For standard web/app hero and promotional banners, add text and buttons later as editable, responsive interface elements.
- Match overlay typography to the actual website/app design system: use its exact supplied font family, weights, type scale, line height, letter spacing, colors, and responsive rules. Do not invent a new font treatment just for the banner or use the inspiration reference's typography if it conflicts with the site's brand system.
- Match the live CTA to the actual website/app button component, including its color, typography, radius, height, padding, and interaction states. The generated image must contain no button, pill, button-shaped placeholder, or fake clickable element.
- Implement the CTA using the existing button component and interaction pattern. It must have a real destination or action, accessible name, keyboard support, hover/focus/pressed/disabled states as appropriate, and a usable touch target.
- If the banner is a static exported advertisement rather than an interactive interface section, follow the requested ad deliverable instead; do not apply the live-button rule blindly.

**Composition and responsive behavior**
- Give the visual one clear focal point and maintain a deliberate balance between subject and reserved content space.
- Keep important subjects, product mockups, and essential details inside crop-safe areas.
- Define desktop, tablet, and mobile compositions. If the layout changes significantly, create or generate alternate crops/compositions rather than merely shrinking the desktop asset.
- Check that text and CTA do not overlap the subject, collide with each other, or become cramped at smaller widths.
- Use the correct aspect ratio and dimensions for the actual placement. Do not assume every banner is square or every hero is 16:9.
- Preserve supplied product UI, logos, and brand assets accurately. Never invent interface details or modify supplied brand assets.
- Keep campaign/carousel slides consistent in typography direction, palette, lighting, image treatment, and spacing while allowing each slide's composition to suit its message.

**Universal banner contrast & typography rule (HARD — NO artificial overlays, any project or domain):**
- **Banner natural negative space (NO ugly gradient overlays or white haze):** Empty space for text and CTAs means grouping graphic elements onto one side (left or right, 35-45% max), leaving the opposing side (55-65%) as clean, unobstructed space in the **natural scene environment** (continuous studio backdrop, consistent lighting and floor/wall texture). NEVER prompt or allow ugly gradient overlays, misty white hazes, airbrushed fog, or faded transitions across the banner image. Empty space is the clean backdrop itself, not an artificial white patch.
- **Sample empty-space pixel luminance:** Always inspect actual background pixel color/luminance where text and CTAs will sit ($L = 0.2126 \cdot (R/255) + 0.7152 \cdot (G/255) + 0.0722 \cdot (B/255)$).
- **Light backdrop (luminance > 0.5) → DARK text:** If empty space has a light/pale background, text/labels/amounts MUST be the project's darkest brand/neutral tone (e.g. `var(--color-text-primary)`, `#0F172A`, `#111827`, `#0F2E24`) with high contrast. CTA button solid dark with white text or distinct high-contrast border.
- **Dark backdrop (luminance <= 0.5) → LIGHT text:** If empty space has a dark background, text/labels/amounts MUST be light (`#FFFFFF`, `#F8FAFC`, `var(--color-text-inverse)`). CTA button light/accent.
- **NEVER use artificial overlays or gradient patches:** Do NOT apply semi-transparent overlays (`background: rgba(...)`), linear-gradient patches, or solid background rectangles over the banner to force white text to be readable. That corrupts the artwork and looks like a patched mess. Contrast comes from choosing typography colors that fit the asset, NOT by modifying or obscuring the asset.
- **NEVER use dirty text-shadow halos:** Blurry white or black halos (`text-shadow: 0 1px 4px ...`) over light backgrounds look dirty and unpolished. Use `text-shadow: none;` and choose the correct contrasting text color.
- **Single-Stack Unified Container for alignment:** Do NOT separate title/stat text and CTA button into sibling containers with disconnected positioning. Group all text, metrics, badges, and CTA buttons inside a single flex container (`display: flex; flex-direction: column; align-items: [flex-end | flex-start]; gap: 8px;`) aligned toward the empty side to ensure unified edge alignment and consistent vertical rhythm.
- **Clean translucent pill badge:** Never use harsh opaque or dark neon boxes for badges. On light backdrops, use clean translucent white pills (`background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(var(--brand-accent-rgb), 0.2); color: var(--brand-accent-dark); border-radius: 9999px; padding: 4px 10px; white-space: nowrap;`). On dark backdrops, use translucent dark pills (`background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.25); color: #FFFFFF; border-radius: 9999px;`).
- **Metric & currency/unit baseline:** Always use `display: flex; align-items: baseline; white-space: nowrap; font-variant-numeric: tabular-nums;` to prevent symbols or units from wrapping or misaligning vertically.
- **Mobile 375px verification:** Verify banner layout at 375px viewport — card height 170-180px, responsive padding, graphic constrained to edge, no horizontal overflow or wrapping.

### Image-generation prompt requirements for interface banners

Before generating, write a compact composition brief specifying:
- placement and target aspect ratio;
- selected visual reference image(s), source link(s) when available, and the specific design characteristics being adapted;
- which aspects come from the reference (composition/art direction) and which come from the website/app (palette, typography, UI styling);
- main subject and its exact location in the frame (e.g. strictly concentrated within left 35-45%);
- reserved headline/supporting-copy area, its exact location, approximate proportion, and alignment (e.g. right 55-65%);
- separate reserved CTA area, its exact location, approximate proportion, and relationship to the copy;
- **seamless natural backdrop:** the background environment (material, lighting, color, surface) must remain continuous and uniform across the entire canvas — NO split colors, no artificial fades;
- elements that must not appear (especially text, button artwork, logos, badges, fake UI, **ugly gradient overlays, white haze, misty spray, airbrushed fog, or faded washes**);
- brand palette and visual treatment;
- crop-safe zones and mobile-specific requirements.

Do not use vague instructions such as “leave some space.” Specify where the space should be, what it is reserved for, and what visual content must stay out of it. NEVER instruct the model to "fade to white" or "place a gradient overlay for text" — that ruins the depth of the 3D scene and makes banners look cheap and ugly. All that is needed is keeping graphics on one side and clean empty space of the natural scene on the other side. If the generated image fails to preserve the planned empty areas or renders an artificial haze/overlay, refine the prompt or regenerate.

### Stage 3 — Define experience architecture

Before detailed styling, establish:
- information architecture and navigation;
- primary and secondary journeys;
- screen inventory;
- content hierarchy and task priority;
- authentication and permission boundaries;
- success, error, empty, loading, disabled, offline, and recovery states;
- responsive and adaptive behavior.

For each important flow, define: entry point, user goal, inputs, system response, success state, failure/recovery paths, and next step.

Prefer the simplest flow that safely meets the user's need. Do not add steps, screens, or choices without a reason.

### Stage 4 — Set visual direction

Define brand character, color roles, typography, spacing, grid, radius, borders, elevation, icon style, imagery, density, and motion before multiplying screens.

Create a representative screen or component direction first for large projects. Validate it before scaling.

### Stage 5 — Design system and screens

Define tokens and reusable components, then compose complete screens. Do not design every screen as an unrelated poster. Establish the icon strategy for each UI context and invoke the Master Icon Generation Skill for custom icon assets.

### Stage 6 — Prototype

Make visible controls meaningful. Connect the primary journey and include validation, feedback, and recovery.

### Stage 7 — Validate

Review realistic content at realistic viewport sizes. Check hierarchy, usability, accessibility, consistency, responsiveness, and edge cases.

### Stage 8 — Handoff or implementation

Provide unambiguous specifications. If coding, use reusable components, semantic structure, tokens, and tests.

---

## 3. UX principles

### User goals before decoration
- Start from the user's task, not from a desired visual effect.
- Make the primary action easy to find.
- Reduce cognitive load and memory requirements.
- Use familiar language and recognizable patterns.
- Show information when it is needed.
- Preserve user input after recoverable errors.

### Nielsen-style usability heuristics
Apply these as practical checks:
1. Visibility of system status: show progress, confirmation, loading, and errors.
2. Match to the real world: use familiar concepts and the user's language.
3. User control and freedom: provide cancel, back, undo, and safe exits where appropriate.
4. Consistency and standards: keep patterns predictable.
5. Error prevention: prevent invalid actions before they occur.
6. Recognition over recall: show options and context.
7. Flexibility and efficiency: support frequent tasks without confusing new users.
8. Minimalist design: remove irrelevant information, not necessary context.
9. Error recovery: explain what happened and how to fix it.
10. Help and documentation: provide contextual help when needed.

### Cognitive load and decision design
- Break complex tasks into meaningful steps.
- Use progressive disclosure for advanced or infrequent options.
- Avoid too many equally weighted choices.
- Group related information.
- Use sensible defaults, but never make consequential decisions without consent.
- Explain unfamiliar domain terms.
- Do not hide fees, consequences, or important conditions.

### Interaction principles
Use these as design checks, not as slogans:
- **Fitts's Law:** make frequent and important targets easy to reach and large enough.
- **Hick-Hyman Law:** reduce unnecessary choices and clarify grouping.
- **Gestalt principles:** use proximity, similarity, continuity, and common region to express relationships.
- **Jakob's Law:** respect familiar conventions unless there is a strong reason to depart.
- **Doherty threshold:** provide prompt feedback and meaningful progress for longer actions.

---

## 4. Visual craft standards

### Layout and composition
- Establish a clear grid and consistent alignment.
- Use spacing to express relationships.
- Align edges, baselines, and repeated elements deliberately.
- Keep content within a readable measure.
- Use whitespace intentionally, not as accidental emptiness.
- Avoid arbitrary floating elements and inconsistent margins.
- Maintain a clear focal point and visual path.
- Keep density consistent across related screens.
- Make the primary task prominent without making every element loud.

### Responsive design
Design for content and behavior, not one screenshot:
- choose breakpoints where the layout actually needs to change;
- use fluid widths and sensible max-widths;
- define stacking, wrapping, collapsing, and overflow behavior;
- keep touch interactions usable on small screens;
- preserve hierarchy when columns collapse;
- handle long text, localization, zoom, and dynamic content;
- do not merely shrink desktop layouts to mobile.

### Typography
- Use a restrained type family system; usually one primary family, with a secondary only when purposeful.
- Define roles for display, page title, section heading, body, label, helper, caption, and numeric data.
- Establish a consistent scale, weights, line heights, and letter spacing.
- Maintain readable line lengths and comfortable line height.
- Use size, weight, and spacing for hierarchy—not all-caps and color everywhere.
- Avoid too many font sizes or weights.
- Never use tiny low-contrast text for essential information.
- Check numerals, currency, dates, and tabular data for legibility.
- Respect supplied and licensed brand fonts.

### Color system
Define semantic roles:
- primary, secondary, accent;
- page background, surface, elevated surface;
- primary/secondary/muted text;
- border/divider;
- focus;
- success, warning, error, informational.

Rules:
- **Vibrant multi-color variation over monotonous palettes (HARD, user-enforced):** Palettes MUST feature vibrant colors with rich multi-color variation across hues (mix warm/cool, light/dark, saturated/neutral) to keep the UI beautiful and varied. **NEVER** use monotonous, dull, single-hue, or muddy washed-out palettes. Benchmark examples provided by user are strictly illustrative quality benchmarks demonstrating multi-hue vibrancy—NEVER restrict future projects to those specific colors or palettes. Generate fresh, original palettes curated specifically for each product's domain, theme, and audience in Coolors.
- **Coolors.co "Visualize colors" live UI verification (HARD):** In Coolors.co generator, ALWAYS click the **"Visualize colors"** toolbar icon (`△ ○ □` geometric shapes between grid and contrast) to inspect the live colors applied to realistic UI components (dashboards, cards, charts, buttons, logos). Verify live that the palette looks vibrant, high-contrast, harmonious, and beautiful on actual UI before selecting. If it looks flat or muddy, hit spacebar to regenerate.
- **Download palette guide image for downstream AI adoption (HARD):** After selecting the palette, export/download the Coolors palette guide image and visualizer preview, and save to `research/coolors-palette-guide.png`. Feed this visual guide into downstream steps (brand kit, style guide, screen mockup JSON prompts, and CSS tokens) so the AI truly understands and accurately adopts the vibrant color distribution across UI elements.
- Never communicate status through color alone.
- Check text and non-text contrast against actual background pixel luminance.
- Use tokens consistently across components and states.
- Keep gradients purposeful and subtle.
- Never alter a supplied brand palette without permission.
- If proposing missing colors, label them as proposals.

### Depth, borders, and surfaces
- Prefer hierarchy through spacing, contrast, and surface changes.
- Use elevation only when it communicates layering.
- Keep shadows subtle and physically plausible.
- Avoid heavy text shadows, excessive glow, neon halos, thick outlines, and stacked effects.
- Do not put every section inside a card.
- Use borders only where they improve grouping or scanning.
- Use a consistent radius system.
- Avoid glassmorphism, neumorphism, and 3D effects unless they fit the brand and remain readable.

### Icons, illustrations, and logos
- Use one coherent icon family with consistent stroke/fill, scale, and optical weight.
- Do not mix outline, filled, emoji, and 3D icon styles arbitrarily.
- Icons reinforce meaning; they do not replace necessary labels.
- Keep icon sizes and alignment consistent.
- Give icon-only controls accessible names.
- Use supplied logos exactly as provided. Never redraw, recolor, distort, decorate, underline, or otherwise modify a logo unless explicitly authorized.
- Never invent brand marks or add unrequested decorative text.

### Content and microcopy
- Write concise, specific, human language.
- Use action labels that describe outcomes, e.g. "Continue" or "Pay ₹500".
- Avoid vague "Submit" labels when a specific action is possible.
- Explain why sensitive information is needed.
- Make errors actionable and non-blaming.
- Keep terminology consistent.
- Use realistic content lengths, not meaningless placeholder text.
- Respect locale-specific currency, dates, numbers, and address formats.

---

## 5. Design tokens and component architecture

Create tokens before styling individual components.

Token groups:
- color;
- typography;
- spacing;
- radius;
- borders;
- elevation;
- sizing;
- breakpoints;
- motion;
- focus rings.

Use semantic names such as `color.text.primary`, `color.surface.default`, `space.4`, `radius.card`, and `type.body.md`. Avoid encoding one screen's one-off appearance into every component.

Build reusable components around meaning and behavior:
- buttons;
- text fields;
- select/combobox;
- checkbox, radio, switch;
- tabs and navigation;
- cards only where useful;
- dialogs and sheets;
- alerts and toasts;
- tables and data lists;
- pagination and breadcrumbs;
- tooltips and menus;
- badges and status indicators;
- upload controls;
- date/time inputs.

For each component define anatomy, variants, sizes, states, interaction, keyboard behavior, accessibility semantics, responsive behavior, and content constraints. Avoid unnecessary variants and over-abstraction.

### Component states are mandatory

For relevant interactive components, define:
- default;
- hover where applicable;
- focus-visible;
- pressed/active;
- selected;
- disabled;
- loading;
- success;
- error;
- read-only;
- empty;
- validation feedback.

Do not show a state without defining when and why it appears.

---


## 5A. Icon strategy and mandatory Icon Generation Skill integration

Icons are part of the product's visual identity. Do not treat them as interchangeable decoration, and do not fill interfaces with random SVGs, emoji, or mixed icon packs.

### Mandatory skill handoff

When this UI/UX skill requires custom icons, icon families, feature illustrations, service icons, category icons, empty-state illustrations, or other icon assets:

1. Use the user's **Master Icon Generation Skill** as the production workflow for generating, separating, trimming, validating, and exporting custom icon assets.
2. Read and follow that skill before generating or preparing a custom icon set. Do not bypass its spacing, source-inspection, per-icon crop, transparency, and visual-QA requirements.
3. Define the icon brief from the UI design system first: intended use, visual style, palette, size, stroke/fill character, perspective, detail level, background, and file formats.
4. Generate icons as a coherent family. Their silhouette language, visual weight, corner softness, lighting, material, palette, and detail density must feel related.
5. Use generated icon assets wherever they materially improve the design. Do not generate icons merely to decorate empty space.
6. If the Icon Generation Skill is unavailable, do not claim it was used. Ask the user to provide/install it or clearly state that an alternative workflow is being used.

### Choose the right icon language for the right UI context

A polished product may combine a small number of deliberately chosen icon languages. Do not use one treatment everywhere.

**A. Custom illustrated / 3D / sticker icons**

Use for:
- service categories and bill-payment tiles;
- feature discovery and promotional modules;
- onboarding and educational content;
- empty states and friendly status illustrations;
- dashboards where a distinctive illustrated visual language is appropriate.

These icons may use subtle depth or dimensional shading, but must remain consistent as a set. Use restrained colors and avoid the colorful-emoji look. Follow the current project's approved palette and all color exclusions.

**B. Minimal 2D line or filled UI icons (including SVG)**

Use for:
- mobile bottom navigation;
- top app bars and toolbars;
- back, close, search, filter, edit, share, settings, and overflow actions;
- compact inline actions;
- table controls and dense data interfaces;
- repeated small controls where illustrated icons would create visual noise.

For mobile app footer navigation, default to restrained 2D vector icons—typically one consistent outline or filled family—with uniform optical size and stroke weight. Use a clear active state and pair icons with labels when the navigation pattern requires it. Do not use 3D/sticker icons as bottom-navigation buttons unless the user explicitly asks for that style and it remains usable.

### SVG policy: purposeful, not prohibited

SVG is a format, not a visual style. Use SVG when it is the best implementation format for a simple, crisp, scalable UI symbol or when the platform/design system already provides a suitable vector icon.

- Prefer one coherent, licensed or project-approved icon family for standard interface controls.
- Use SVGs purposefully; do not scatter unrelated SVG icons throughout the interface.
- Do not draw a custom SVG for every service or feature when the custom icon-generation workflow is more appropriate.
- Do not use generated 3D/sticker assets for tiny controls where details collapse or legibility suffers.
- Do not use emoji as production UI icons.
- Do not mix arbitrary SVG packs, emoji, raster illustrations, and 3D icons in the same visual group.
- If standard controls use simple SVGs while service cards use custom generated illustrations, that is intentional separation of roles—not inconsistency.

### Placement and sizing rules

- Use illustrated icons where they can be seen at a useful size and have room to communicate detail.
- Use simple vector UI icons for small controls and navigation.
- Keep icon boxes, optical alignment, and visual weight consistent within each component family.
- Do not force all icon artwork into identical square crops if natural aspect ratios differ. Use consistent display boxes with `object-fit: contain` or equivalent.
- Do not stretch icons or let transparent padding make them appear too small.
- Ensure custom assets are tightly trimmed and validated according to the Icon Generation Skill.
- Provide accessible labels for icon-only controls; decorative icons should not create redundant screen-reader output.
- Maintain sufficient contrast in active, inactive, hover, focus, and disabled states.
- Meet touch-target requirements independently of visible icon size.

### Icon usage decision test

Before adding an icon, ask:
1. Does it clarify meaning, recognition, navigation, or scanning?
2. Is this a service/feature illustration or a compact interface control?
3. Is the chosen style appropriate at the actual rendered size?
4. Does it belong to the correct icon family for this context?
5. Is it consistent with the product palette and visual weight?
6. Would text alone be clearer?
7. Is it decorative, and can it be removed without losing meaning?

If an icon does not improve usability or visual communication, omit it.

### Icon handoff requirements

For custom icon sets, specify:
- semantic name and intended UI placement for each icon;
- source style and approved palette;
- individual tightly trimmed transparent PNGs (or another requested format);
- consistent export naming;
- preview/contact sheet;
- verified archive of individual assets;
- recommended display sizes and whether each asset is decorative or meaningful.

For simple UI symbols, specify the chosen SVG/icon library and exact icon names, sizes, stroke weights, and active/inactive states. Never describe a generic placeholder as a finished icon asset.

## 6. Accessibility and inclusive design

Use **WCAG 2.2 AA** as the default target unless the project requires a stricter standard.

Check:
- text and non-text contrast;
- keyboard access to all functionality;
- visible and unobscured focus;
- logical focus order;
- semantic headings and landmarks;
- accessible names and descriptions;
- labels and instructions for form fields;
- error identification and suggestions;
- screen-reader announcements for dynamic updates;
- alternatives to color-only status;
- meaningful alt text for informative images;
- decorative images hidden from assistive technology;
- reduced-motion preferences;
- zoom and text resizing;
- target size and spacing;
- captions/transcripts where relevant;
- accessible authentication.

Aim for comfortable touch targets—commonly around 44–48 CSS pixels for primary touch controls—while following WCAG and platform requirements.

Forms:
- associate labels programmatically;
- explain formats before errors occur;
- validate at appropriate times;
- preserve entered values after errors;
- announce errors accessibly;
- summarize errors in long forms;
- never rely only on red borders.

Accessibility is part of the design from the beginning, not a cosmetic final pass.

---

## 7. Responsive and platform behavior

### Mobile
- Prioritize the primary task.
- Use comfortable touch targets and spacing.
- Avoid hover-only interactions.
- Respect safe areas and system UI.
- Use appropriate native navigation patterns.
- Consider one-handed reach for frequent actions.
- Ensure keyboards do not obscure fields or actions.
- Support required orientations.

### Desktop
- Use space deliberately; do not stretch content edge to edge.
- Keep navigation and hierarchy clear.
- Support keyboard workflows and visible focus.
- Use dense tables only when the task benefits.
- Define max-widths and behavior for smaller windows.

### Tablet and hybrid
Do not assume tablet is simply a large phone or small desktop. Define intermediate navigation, columns, and touch/pointer/keyboard behavior.

Follow platform conventions for navigation, dialogs, gestures, system controls, and typography. Do not imitate native components inaccurately.

---

## 8. Fintech and sensitive workflows

Trust and error prevention are essential:
- show amount, recipient, fees, and total before confirmation;
- distinguish available balance, ledger balance, pending amount, and status where relevant;
- show confirmation and reference details after an action;
- prevent duplicate submissions;
- explain processing states;
- do not claim success before system confirmation;
- provide recovery for failed, pending, reversed, and timed-out transactions;
- confirm high-impact or irreversible actions;
- mask sensitive values where appropriate;
- explain why permissions or personal information are requested;
- never expose full card numbers, OTPs, passwords, or secrets unnecessarily;
- avoid fake urgency, hidden fees, deceptive consent, or dark patterns;
- do not invent certifications or security guarantees.

### OTP flows
- state where the code was sent;
- support paste and autofill where available;
- show resend timing and retry behavior;
- preserve entered code after recoverable errors;
- communicate expiry and rate limits;
- provide an alternative if delivery fails;
- never expose the secret OTP in logs or analytics.

---

## 9. Motion and feedback

Motion should explain state changes, hierarchy, or spatial relationships.
- Use short, purposeful transitions.
- Keep motion consistent.
- Respect reduced-motion preferences.
- Do not delay tasks with decorative animation.
- Never communicate state through motion alone.
- Give immediate feedback to taps and submissions.
- Show progress for longer operations.
- Avoid layout shifts and unexpected movement.

Define motion tokens for duration, easing, and distance. Do not animate every element.

---

## 10. Prototyping requirements

A prototype must behave like a coherent product, not a static gallery.

For the primary journey:
- navigation works;
- buttons perform their stated actions;
- forms accept and validate input;
- errors can be recovered from;
- loading and success states exist;
- dialogs open and close correctly;
- back and cancel paths work;
- selected states are visible;
- data changes are reflected consistently;
- disabled controls are truly disabled.

Do not include inert controls that look functional. If an interaction is illustrative only, state that in the prototype notes.

---

## 11. Design-to-code implementation

### Before coding
- Inspect the repository, framework, dependencies, routes, assets, and conventions.
- Identify and reuse the existing design system where appropriate.
- Do not replace architecture or dependencies without reason.
- Confirm screens and flows in scope.
- Inspect reference images at full resolution.

### During implementation
- Use semantic HTML and accessible components.
- Use design tokens instead of scattered hardcoded values.
- Build reusable components around repeated patterns.
- Make layout responsive and content-driven.
- Keep state and validation predictable.
- Avoid unnecessary dependencies.
- Follow the project's framework and conventions.
- Use supplied assets; never substitute an approximate logo.
- Avoid brittle absolute positioning for core layout.
- Do not use arbitrary Unicode symbols instead of proper icons.
- Avoid giant single-file components when project structure supports separation.
- Handle loading, empty, error, success, and disabled states.
- Keep forms, navigation, and dialogs keyboard accessible.

### After implementation
- Run available lint, type-check, build, and test commands.
- Inspect rendered screens at key breakpoints.
- Test the primary journey and critical failure paths.
- Check console errors and broken assets.
- Verify focus, keyboard navigation, and labels.
- Compare implementation with references.
- Report what was tested and what remains unverified.

Never claim tests passed unless they actually ran.

---

## 12. UX audit and critique

Never give vague feedback such as "make it cleaner." For each finding provide:
- **Issue:** what is wrong or unclear;
- **Evidence:** where it occurs;
- **User impact:** what task or user group is affected;
- **Severity:** critical, high, medium, or low;
- **Recommendation:** specific correction;
- **Validation:** how to verify the fix.

Prioritize:
1. safety and blockers;
2. task completion and navigation failures;
3. comprehension and error prevention;
4. accessibility;
5. hierarchy and consistency;
6. visual polish.

Separate objective usability issues from subjective visual preferences.

---

## 13. Anti-patterns

Do not:
- decorate before understanding the task;
- make every section a card;
- use gradients, glow, glass, blur, shadows, or 3D effects by default;
- use random accent colors or mix icon styles;
- use oversized headings to compensate for weak hierarchy;
- use tiny low-contrast helper text;
- invent spacing values on every screen;
- center-align long paragraphs or dense data;
- hide primary actions below unnecessary content;
- use placeholder copy as final content;
- make every button visually primary;
- use color alone for meaning;
- rely on hover for essential actions;
- create dead-end flows;
- use destructive actions without safeguards;
- invent charts, metrics, testimonials, trust badges, or user counts;
- invent functionality not in the requirements;
- copy references so literally that usability or brand integrity suffers;
- call a static mockup a finished product;
- produce generic AI layouts without product-specific reasoning.

---

## 14. Professional design review checklist

Review at the correct platform and viewport.

### Project setup and brand foundations
- [ ] Website vs mobile app was identified correctly.
- [ ] Existing logo was requested/provided or the user explicitly chose no logo.
- [ ] If a new logo was needed, reference research and user selection/approval were completed.
- [ ] Product/business purpose and audience are understood.
- [ ] Brand kit was researched, proposed, and approved (or the user explicitly waived approval).
- [ ] Website references were used for website work; mobile UI references for app work.
- [ ] Brand colors, typography, icon language, and visual direction are documented as reusable tokens/guidelines.

### Product and UX
- [ ] User and primary task are clear.
- [ ] Information architecture is understandable.
- [ ] Primary action is obvious.
- [ ] Navigation is predictable.
- [ ] Consequences and decisions are clear.
- [ ] Errors can be prevented and recovered from.
- [ ] Unnecessary steps and choices are removed.

### Visual craft
- [ ] Strong hierarchy and focal point.
- [ ] Consistent grid and alignment.
- [ ] Systematic spacing.
- [ ] Purposeful readable typography.
- [ ] Restrained coherent palette.
- [ ] Sufficient contrast.
- [ ] Consistent component geometry and states.
- [ ] One coherent icon/imagery language, with illustrated assets and compact UI symbols used in the right contexts.
- [ ] Effects are subtle and purposeful.
- [ ] No accidental clutter or decorative noise.

### Existing-product discovery and planning
- [ ] Companion website/app question asked for the selected project type.
- [ ] Supplied companion URL or project location inspected where accessible.
- [ ] Existing product's brand identity and product behavior separated correctly.
- [ ] Existing source project used for UX/flow understanding only, not visual copying.
- [ ] If no existing product is available, category research completed and assumptions labeled.
- [ ] PRD, information architecture, screen/page inventory, user flows, and architecture guidance prepared.
- [ ] User approval obtained before detailed design unless explicitly waived.

### Hero and banner assets
- [ ] Pinterest/Dribbble or supplied-reference research completed when browsing is available; no false claim of research.
- [ ] Reference used as inspiration, not copied.
- [ ] Banner placement and aspect ratio are correct.
- [ ] Headline and supporting-copy safe areas are intentional and usable.
- [ ] A clean, intentionally positioned CTA-safe area exists for the future live button where required.
- [ ] No button artwork, fake CTA, button-shaped placeholder, or unrequested text is baked into an interface banner.
- [ ] Reference composition is adapted to the website/app's actual brand colors rather than copying the reference palette blindly.
- [ ] Overlay typography matches the website/app's actual font family, weights, type scale, and design tokens.
- [ ] The future live button matches the website/app's actual button component and remains a functional interface element.
- [ ] CTA is implemented separately as a functional, accessible interface control.
- [ ] Desktop, tablet, and mobile crops/compositions have been reviewed.
- [ ] Main subject remains clear and balanced with reserved whitespace.

### Responsive
- [ ] Small mobile checked.
- [ ] Tablet checked where relevant.
- [ ] Desktop checked where relevant.
- [ ] Long text and dynamic content checked.
- [ ] Overflow and sticky elements checked.
- [ ] Keyboard and touch behavior considered.

### Accessibility
- [ ] Keyboard access and visible focus.
- [ ] Labels and accessible names.
- [ ] Contrast and non-color status cues.
- [ ] Logical focus order and headings.
- [ ] Touch target size.
- [ ] Reduced motion.
- [ ] Accessible error announcements and recovery.

### Completeness
- [ ] Empty state.
- [ ] Loading state.
- [ ] Error state.
- [ ] Success state.
- [ ] Disabled state.
- [ ] Validation state.
- [ ] Confirmation for consequential actions.
- [ ] Primary flow works end to end.

### Implementation
- [ ] Existing project conventions respected.
- [ ] Components and tokens reused.
- [ ] Custom icon assets follow the Master Icon Generation Skill; compact navigation/control icons use a consistent UI vector family where appropriate.
- [ ] No unnecessary dependencies.
- [ ] Build/tests run where possible.
- [ ] Rendered output inspected.
- [ ] Limitations and untested areas disclosed.

Only mark checks complete when they have actually been verified. If something is outside the scope, label it not applicable; if not tested, say so.

---

## 15. Deliverables and communication

Match deliverables to the request:
- design brief;
- user journey or flow;
- sitemap and screen inventory;
- visual direction;
- token specification;
- component inventory;
- high-fidelity screens;
- interactive prototype;
- implementation;
- responsive specifications;
- accessibility review;
- prioritized UX audit;
- developer handoff.

Keep explanations concise, but make the artifact complete. State assumptions, important trade-offs, and limitations.

When asked for visual design, do not add unrequested copy, logos, badges, labels, or decorative elements. Preserve supplied brand assets exactly. Ask only for essential missing inputs.

## 16. Decision hierarchy

When choices conflict, prioritize:
1. user safety, privacy, and data integrity;
2. task completion and comprehension;
3. accessibility and inclusive use;
4. platform conventions and technical feasibility;
5. brand identity and consistency;
6. visual polish and distinctiveness;
7. decorative preference.

A visually impressive choice must never override clarity, accessibility, or task success.

## Final operating rule

Think like a product designer, craft like a visual designer, validate like a UX researcher, and implement like an engineer.

Design the complete experience—not just the screenshot.
