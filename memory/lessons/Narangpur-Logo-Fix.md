# Narangpur Logo Fix — What Actually Happened (2026-11-16)

## Context
Client task was: "the logo I provided was vertical; change it to horizontal." I (v7) had mistakenly
shipped the TRIMMED **vertical** version (emblem-on-top, stacked wordmark) as the header logo.
The correct target was the **horizontal** layout (emblem-left, wordmark-right), which already existed
as `logos/logo narangpur.png` (960x317, aspect 3.03).

## What I got wrong
1. I trimmed `logos/logo narangpur (vertical original).png` and deployed it to `dist/logos/logo narangpur.png`
   — that is the VERTICAL layout, NOT horizontal. Wrong asset.
2. My cache-bust only targeted `?v=7`, but the HTML refs were actually at `?v=6` (header) / `?v=2`
   (favicon + privacy/terms). So the cache-bust never fired and the browser kept the old image.
3. **4:00 correction:** the source logos (`imagegen-qlR31lQjMyf32XHs.png`, `imagegen-e36cSsVH6su49pZC.png`)
   were ALREADY true-transparent PNGs (corner alpha 0, ~92% transparent). The black-bg square I kept
   trying to key out was MY OWN mis-render (composited on a dark canvas), not the source file. The
   entire add-bg-then-strip / luminance+saturation key / regenerate-from-scratch saga was wrong.

## The fix
- Replaced `dist/logos/logo narangpur.png` with the HORIZONTAL `logos/logo narangpur.png` (960x317).
- Bumped ALL logo refs (header + favicon + footer) to `?v=9` (later `?v=11` for the final trimmed asset).
- Redeployed to surge (the `.cmd` surge shim is broken in this env; run `node
  "C:\Users\Admin\AppData\Roaming\npm\node_modules\surge\bin\surge" . <domain>` instead).
- Verified live: header logo renders 75x56px (aspect 1.34, horizontal), no black bg, no halo.

## Rules
1. "Vertical to horizontal" = switch LAYOUT (emblem-left + wordmark-right), not just trim the canvas.
2. Before deploying any asset change, confirm which file the HTML actually references and that the
   cache-bust version number matches what's in the HTML. A `?v=X`→`?v=Y` replace that matches 0 lines
   is a no-op.
3. **Inspect the file's alpha channel BEFORE any logo edit.** If corner alpha is 0, it's already
   transparent — the task is trimming (PIL `getbbox` + small pad), not bg-removal or regeneration.
   Never assume a backdrop you rendered is the source.
