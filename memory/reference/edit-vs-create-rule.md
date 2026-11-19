# Edit vs Create — Hard Rule (user-enforced, 2026-11-16)

## The rule
- **Edit task = smallest possible diff to the existing asset.** If the user says "make it horizontal" on an approved logo, you reposition/resize/re-arrange the EXISTING elements. You do NOT regenerate the artwork from scratch.
- **Approved asset = locked.** Its appearance (emblem art, wordmark style, colors, proportions) is fixed unless the user explicitly asks to redesign.
- **Creating new is a different task.** Only applies when no approved version exists or user explicitly says "redesign" / "make a new one."
- **When in doubt, ask ONE question before altering:** "do you want me to just reposition the existing elements, or redesign it?" Better to ask than to silently regenerate and hand back something unrecognizable.
- **MANDATORY first step (4:00 correction): inspect the file's alpha channel BEFORE any logo edit.** Read alpha + pixel content. If corner alpha is 0, it's already a clean transparent source and the task is **trimming** (PIL `getbbox` crop + small pad), NOT bg-removal or regeneration. Never assume a backdrop you rendered is the source. The 2026-11-16 Narangpur saga was caused by misdiagnosing an already-transparent PNG as a black-bg square (the black bg was my own mis-render).
- **Allowed ops on an approved asset:** (a) trim excess padding (default for "clean it up / make it horizontal" on an already-arranged logo), (b) recolor for dark/light surface or greyed-out/monochrome, (c) reposition ONLY when explicitly requested.
- **Forbidden without explicit instruction:** regenerating/restyling the emblem or wordmark, redrawing anything, baking a solid bg then stripping it.
- **"Vertical to horizontal" = switch LAYOUT** (emblem-left + wordmark-right), not just trim the canvas. Confirm which *layout* the client wants before picking the source file. Filenames can be misleading ("(vertical original)" = stacked text layout, not canvas orientation).

## What went wrong (Narangpur logo, 2026-11-16)
- Task: change existing logo from vertical to horizontal arrangement.
- Mistake: regenerated the whole logo via imagegen instead of just moving the wordmark next to the emblem. Created a new version that looks different from the approved one.
- Compounding: when the regen had a black background, tried PIL bg-removal which left dark halo + washed-out wordmark. The black bg was MY OWN mis-render (composited on a dark canvas), not the source file — the source was already a true-transparent PNG.
- The entire add-bg-then-strip / luminance+saturation key / regenerate-from-scratch saga was wrong. Correct task: take the approved transparent PNG, `getbbox`-trim the padding → done.
- User's exact words: "there is a difference between editing and create new or change completely. when the task is to edit then do only edit."

## Where the rule lives
- `C:\Users\Admin\.aside\u\0\AGENTS.md` — "Editing vs Creating" section
- `C:\Users\Admin\.aside\u\0\skills\user\master-icon-logo-generation\SKILL.md` — rule 16 (renamed from `master-icon-generation`)
- `C:\Users\Admin\.aside\u\0\skills\user\master-ui-ux-design\SKILL.md` — rule 8
- `memory\reference\edit-vs-create-rule.md` (this file)

## Practical test before regenerating
Ask: "Can I accomplish this by moving/resizing/recoloring what already exists?"
- YES → do the edit, don't regenerate. For trimming: PIL `getbbox` + small pad.
- NO (and user explicitly wants new artwork) → generate, but always request true-transparent-bg in the same call.
- **Always inspect the file's alpha channel first** (read corner pixels + content bbox). If corner alpha is 0, it's already transparent — the task is trimming, not bg-removal or regeneration.
