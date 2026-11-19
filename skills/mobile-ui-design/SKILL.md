---
name: "mobile-ui-design"
description: "Design, refine, and implement professional mobile-first product interfaces with distinctive visual systems, clear interaction feedback, and responsive behavior. Use for mobile UI design or visual consistency work."
autoInject:
  keywords: ["mobile app", "mobile ui", "mobile design", "ios ui", "android ui", "mobile screen", "app screen", "mobile layout", "touch target", "responsive mobile"]
---

# Mobile UI Design

## Hard rule: mobile-only changes must not alter desktop (HARD)
When the task is mobile/responsive improvement only, the desktop layout stays **byte-identical in look and layout**:
- Every mobile-only change uses a **breakpoint-qualified class** (`md:`/`lg:`/`xl:` prefix, or `@media (max-width: 1024px)` block). **Never** a bare, un-qualified class that hits all viewports.
- **Before/after desktop verification:** capture `getBoundingClientRect()` of the affected elements at a desktop viewport (≥1280px) **before** and **after**. Heights, widths, positions, and text-wrap must match. If they don't, the change leaked into desktop — revert the leaking part and re-do it under a `lg:`/`xl:` prefix instead of leaving it.
- A `w-auto`/content-width shrink on a paired button is the classic leak: the longer label wraps and the two buttons stop being equal-height. Pair any `w-auto` with `min-h` + `whitespace-nowrap` at the desktop breakpoint so both stay one line + equal height.
- The final report must state **"desktop verified unchanged"** (with the before/after numbers) or flag exactly which desktop element moved and why. Never claim desktop unchanged without the live comparison.

Create product interfaces that feel intentional, credible, and tailored to the product. Avoid generic AI-generated layouts, repeated decoration, and one-size-fits-all component patterns.

## Start with the visual direction

For a Type-A app (including a multi-screen redesign built as a new app), AGENTS.md §0.0 owns discovery. Show the two lettered visual sets first and inherit icon direction from the selected design and approved kit. Skip the separate icon questionnaire below.

Before beginning a new UI generation or visual-design pass, ask the user which icon/illustration direction they want. Offer these choices:

1. Flat vector style
2. 3D style
3. Vector + 3D combination
4. 3D vector style
5. Isometric vector style

Ask in one short question and let the user choose or describe another direction. If the user already specified a direction in the current request or earlier context, honor it without asking them to repeat it. Otherwise, wait for their choice before starting the visual-design/generation pass.

## Design for the real product and device

- Inspect the existing screen, nearby flows, product palette, typography, assets, and component conventions before changing the UI. Preserve strong existing decisions and make the requested changes fit the product.
- Design narrow mobile screens first. Check content wrapping, safe areas, scroll behavior, sticky actions, bottom navigation, and how layouts adapt across widths.
- Establish a clear hierarchy: one primary action, readable section titles, concise supporting copy, visible state, and enough breathing room. Make common tasks easy to scan and complete with one hand.
- Use consistent spacing, type scale, control height, border treatment, elevation, and color roles. Reuse design tokens where available; do not introduce near-duplicate colors or arbitrary dimensions without reason.
- Make each screen feel specific to its purpose. Use distinct compositions when content differs; do not turn every section into the same stack of identical rounded cards.
- Keep UI copy human, useful, and concise. Do not expose prototype notices, sample-data warnings, internal implementation notes, or other technical copy unless explicitly requested.

## Avoid generic AI-generated UI

- Do not add decoration just to fill space: avoid random gradients, glows, floating blobs, gratuitous shadows, icon confetti, decorative dividers, and unrelated illustrations.
- Avoid nested cards, excessive pill badges, oversized rounded corners, unnecessary borders, and stacks of surfaces that make the screen feel soft, busy, or template-like.
- Do not repeat the same generic icon or illustration across unrelated cards. Give each visual a clear semantic role and use artwork created for that context.
- Avoid emoji or mismatched icon libraries as a substitute for a coherent visual system. Do not use rounded-square icon backdrops unless the user explicitly requests them.
- Do not invent metrics, statuses, testimonial content, or disabled-looking controls to make a screen appear complete. Use the supplied product content and represent real states clearly.
- Keep realistic content density. Replace walls of copy with short labels and summaries, but do not hide information needed to make a decision.

## Icon and illustration system

- Default to standalone artwork on transparent backgrounds. Keep the pictogram or illustration itself unboxed; never place it in a rounded-square tile, badge, app-icon frame, or similar backdrop unless asked.
- Never crop or clip generated artwork with a circular mask, `overflow: hidden`, `object-fit: cover`, or a fixed-shape wrapper. Show the complete uncropped image with `object-fit: contain`; keep wrappers transparent and overflow visible unless the user explicitly asks for a crop or masked avatar treatment. Do not add circular backplates behind feature artwork.
- Separate functional icons from card illustrations. A card illustration should explain that card's subject; do not copy an icon from another section just because it is available.
- For a group of cards, create a coordinated set of purpose-made graphics. Keep palette, outline weight, lighting or fill treatment, detail level, and optical scale consistent while making each composition distinct and recognizable at its actual display size.
- For generated icon or illustration sets, prefer one image per unique concept when practical. Use image generation for custom generated artwork; do not replace it with hand-authored SVG or code-drawn icons unless the user requests native vector files. Ask the image model for actual transparent backgrounds, full uncut artwork, clear separation, no text, and no unwanted tiles, backgrounds, glows, or shadows.
- If a sprite sheet is necessary, confirm it has a real alpha channel and transparent gutters; inspect its known row/column grid at native size. Label connected alpha components across the whole sheet and assign each complete component to its nearest expected cell center, preserving disconnected parts and internal holes. Do not crop guessed cells, keep only the largest component, or color-key near-white/black pixels. Crop the assigned artwork to its visible alpha bounds, remove only nearly invisible resampling noise, preserve aspect ratio, and normalize the longest visible edge across files without adding a square canvas or padding. Review a labeled contact sheet at native and actual UI sizes. If different icons touch or merge, regenerate with wider gutters rather than guessing.
- Review every asset on a checkerboard and at its real UI size. Check alpha, crop, halos, stray fragments, optical scale, style consistency, and anatomy. Reject or regenerate malformed figures and ambiguous symbols before integration.
- Display artwork in consistent fixed slots with `object-fit: contain`. Keep proportions natural; adjust the source composition or slot when an asset looks smaller because of its aspect ratio or transparent edges.
- For illustrations inside metric or summary cards, do not place a small standalone picture beside the heading like a toolbar icon. Make the art feel composed into the card: use a purpose-made, recognizable scene or motif large enough to read at the card's actual dimensions, anchor it intentionally within the card, and blend it with that card's own palette/surface (for example as a soft right-side scene or a contextual background illustration). Preserve clear text contrast and the card's existing information hierarchy; avoid accidental overlaps, tiny floating artwork, icon-like placement, or a separate icon tile. Inspect at the real narrow-screen card size and enlarge or recompose any art that reads as a speck or unrelated sticker.
- **Default for grid-style metric/summary cards: use a coordinated set of minimal 3D graphics, not flat-vector graphics, unless the user explicitly requests vector/another style.** Treat the complete card group as one visual family: same material, lighting, camera angle, scale, detail density, palette, shadow softness, and level of realism, while tailoring each graphic to its card's meaning. Prefer compact 3D object/scene illustrations over generic pictograms. Place them in a deliberate illustration area within each card and keep text readable; do not fade them into oversized background watermarks or shrink them to toolbar-icon scale. Ask about style only when it is genuinely unspecified by the user or established task context; any explicit style request overrides this default.
- Do not replace existing 3D artwork when the request only concerns flat icons or another portion of the UI.
- Keep footer/bottom-navigation icons visually quiet and unmistakably part of one set: use a single monochrome treatment or at most a two-color duotone palette, with matching outline weight, filled areas, apparent size, and detail level. Avoid multicolor shading, gloss, or emoji-like expressions in navigation. Do not add rounded-square icon backdrops. Active and inactive states should use restrained tint/opacity changes that preserve legibility.

## Interaction feedback and states

- Show successful actions such as save, submit, copy, or update with a small mobile-style popup/toast confirmation instead of relying only on changed button text or a message buried in the page. Keep the message concise, readable, and visually consistent with the app.
- Give errors and important outcomes clear, persistent-enough feedback. Use an alert or dialog when the user must act; use a toast for brief confirmation. Reserve confirmation dialogs for consequential or destructive actions.
- While an operation is actually processing, show an appropriate progress treatment: an inline spinner for short actions, a progress bar when measurable progress is available, and a skeleton only when content is loading. Pair it with a short contextual label when needed.
- Prevent duplicate submissions while an action is in progress, keep the affected control's state clear, and restore it when the operation finishes or fails. Do not add fake wait times or decorative loaders when nothing is processing.
- Respect reduced-motion preferences. Keep movement brief and purposeful; do not use distracting looping animation. Ensure toast and status changes are announced accessibly and are not conveyed by color alone.
- Design the full state set when relevant: default, pressed, focused, disabled, loading, success, empty, and error. Do not make interactive elements look clickable if they are not.

## Accessibility and usability

- Maintain readable contrast and text sizes. Do not use color alone to communicate status.
- Provide visible focus, clear labels, useful alternative text for meaningful images, and accessible names for icon-only controls.
- Use touch targets around 44 by 44 CSS pixels where practical, with enough spacing to avoid accidental taps.
- Align button icons and labels with a shared inline-flex row, centered vertically, and a deliberate consistent gap. Size icons optically to the label (typically 18–20 CSS px for a compact action); do not use baseline nudges, arbitrary right margins, or mismatched icon dimensions to position them.
- Keep forms understandable: label fields persistently, explain errors beside the affected input, preserve entered data after recoverable errors, and show submission progress and outcome.

## Footer navigation icon style

- **Hard requirement: generate the entire footer icon family in one image-generation call as one set on a genuinely transparent background. Never generate footer icons individually, mix icons from separate generation runs, or substitute a separately generated icon into the set.** If the full set needs correction, regenerate the full set together.
- Request a regular grid of equal-sized, clearly separated cells, one icon per cell, with generous transparent gutters. Specify the exact icon count and order; keep every icon centered and at the same optical scale with matching stroke/shape weight. No cell borders, tiles, backplates, labels, or shadows.
- After generation, inspect the whole sheet before extraction. Split by the known equal-cell grid (not visual guesses), then alpha-trim each cell to the glyph's exact visible bounds and export each icon separately with transparency. **Do not add a common canvas, safe margin, spacer pixels, or other padding after trimming.** No visible neighboring-cell fragments may remain.
- Use this extraction sequence: isolate the exact grid cell; convert to RGBA; make the background transparent if needed; threshold tiny alpha specks; calculate the nontransparent alpha bounding box and crop to it; resize proportionally to the target maximum edge; threshold resampling specks in the alpha channel; calculate the alpha bounding box again and crop a second time; save that tight RGBA result directly. Do not use the full grid cell bounds as the icon bounds. Preserve antialiased edge alpha and include detached details only when they clearly belong to that glyph. If transparency is missing or ambiguous, inspect and correct the alpha mask before cropping.
- Keep source files tightly trimmed. Handle equal apparent size in the UI with a shared CSS box and `object-fit: contain`, not by adding transparent padding into the PNGs. Preserve aspect ratio and do not stretch icons to force matching dimensions.
- Verify the extracted files as a set: outer alpha rows/columns are fully transparent-free only at the exact glyph edge (no blank border), matching navy/teal palette and treatment, comparable visible scale/weight at actual footer size, no clipped edges, no cross-cell fragments, and no icon that is substantially more filled or heavier than its peers. Reject and regenerate the complete set if any check fails.
- Keep bottom-navigation icons visually quiet and clearly from one family. Use monochrome icons or a maximum of two colors across the set; choose colors from the product palette and keep their roles consistent.
- Prefer one solid icon color with active and inactive states handled through tint, opacity, or a subtle state indicator. If using two colors, use the same foreground/background role on every icon.
- Avoid multicolor shading, gradients, gloss, emoji-like expressions, and unrelated per-icon accent colors. Keep shapes and visual weight consistent at the rendered navigation size.
- Do not place footer icons inside rounded-square tiles or decorative backplates unless explicitly requested.
- Inspect every icon at its actual small UI size for alignment, apparent scale, legibility, visual balance, transparent margins, and consistent padding before applying the complete set across the UI.

## Improvement runs on an existing mobile UI: use `hallmark`

When the request is to improve, audit, polish, restyle, or redesign an *existing* mobile app or responsive site (including "make it stop looking AI-generated"), run the `hallmark` skill (`<accountRoot>/skills/user/hallmark/SKILL.md`) for the run structure: its depth table (audit / polish / restyle / full), the before-record so nothing the app had disappears, the gate sweep, and the handoff. It applies its Floor in app scope (no hero or section rhythm, density is the design, four data states per region, motion only as state), and on native runtimes it translates the Floor into platform terms instead of importing web CSS. This skill still owns the icon/illustration direction question, footer-navigation icon conventions, device conventions, and the kickoff Q&A above; Hallmark owns the anti-slop tells and the gate counts. Do not run both a Taste critique pass and a Hallmark sweep over the same screen - pick one.

## Mobile changes must NOT affect desktop (HARD)
When a request is mobile-view-only ("improve mobile", "fix mobile buttons", "make it responsive for phones"), **never change the desktop rendering**:
- Use only responsive prefixes: mobile as the base class + `md:`/`lg:`/`xl:` overrides that restore the desktop state at/above the breakpoint. A mobile-only change touches only classes that apply below the desktop breakpoint.
- Never remove or restructure desktop layout containers, desktop media queries, or desktop class sets to fix a mobile problem.
- If the mobile fix truly requires a structural change that will also alter desktop, stop and ask the user first — "this will change the desktop layout too, proceed?" — instead of silently changing both.
- Gate any `w-full`, `min-height`, `whitespace-nowrap`, or width/height override that you add for mobile behind the desktop breakpoint (`lg:`/`md:`) so it can't leak into the desktop view.
- **After the change, live-verify both viewports** (390px mobile + 1280px desktop, `getBoundingClientRect` on the changed elements) and report both. Never claim "desktop unchanged" without an actual desktop read.

## Implementation and review

- Implement only the requested frontend scope. Keep semantics, responsive behavior, and existing app flows intact; do not make backend changes unless requested.
- Check all affected widths and important interaction states using the available app/browser workflow when feasible. Inspect visual output after changes rather than relying on source alone.
- Keep source and deployment copies synchronized when the project maintains both. Verify referenced assets exist and that copies match.
- Report what changed and what was actually checked. Do not claim browser or runtime verification if only static inspection was performed.

## UI improvement kickoff Q&A

- Outside Type A, when the user asks to **improve, redesign, polish, or modernize an existing UI** and a missing choice materially affects the work, ask a targeted question before making that change. Ask in one compact message, using selectable options where practical.
- Cover these choices: (1) icon/illustration style—professional flat vector, 3D, vector plus 3D, 3D-vector, isometric vector, or keep current; (2) layout—cleaner/minimal/simplified while preserving the same functionality and usage, or keep the current layout; (3) remove generic AI-generated visual cues and make the interface feel intentionally designed; (4) personalize the UI to the user’s brand; and (5) make interactions feel more like a mobile app—popup confirmations, splash/launch screen, purposeful loading/progress states, and related feedback.
- Offer an “all of these” choice and a way to specify only selected improvements. Keep the questions short and avoid asking for information that the user already provided in the current request or established earlier in the conversation.
- If the user has already stated the desired scope or style, treat that as their answer and proceed without repeating the Q&A. Ask only about materially unresolved choices; do not block clear implementation work on optional preferences.
- After the user answers, restate the selected scope briefly and implement it while preserving existing functionality unless they request behavior changes.
