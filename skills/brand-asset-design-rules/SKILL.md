# SUPERSEDED — do not follow for new logo/icon work
The "remove background with alpha matte" guidance in this file predates the durable rule. Generate logo/icon assets DIRECTLY on a true transparent background when the need is transparent; do NOT generate on a solid background and strip it later (post-hoc removal on a solid source makes the asset grainy/ugly and unusable). See master-icon-generation rule 15 and the imagegen skill "Transparent background rule".
---
---
name: "brand-asset-design-rules"
description: "Use before editing any screen/hero/splash that places brand logos, monograms, buttons, or custom icon sets, or any UI contrast work. Master rule: make foreground contrast the background (logo variant by real bg color; CTA buttons stay a contrasting accent, not a bg-matching color; custom icons match the surface they sit on). Also enforces: never crop an already-transparent logo into a square box, never show the emblem twice, recolor every CTA class consistently, and deliver custom icons perfectly trimmed with a real transparent background (no baked white box/fringe)."
---

# Brand Asset Design Rules

Hard rules for placing brand logos, monograms, buttons, and derived icon assets in UI. These came from repeated user corrections: cropping a transparent logo into a square, repeating the emblem on one screen, putting a white logo on a light background, and recoloring a CTA to blend into its page.

## Rule 0 — Master contrast principle: foreground must contrast the background

Every element placed on a surface (logo, button, text) must be legible against the surface actually behind it. Design for contrast, never for the foreground matching the background. If an element disappears into its bg, it is wrong.

- **Logos/monograms:** pick the variant (white vs color) from the real bg luminance — see Rule 3.
- **CTA buttons:** pick a color that pops against the page — see Rule 4. A button the same hue as the page is a mistake (the exact complaint: "don't make the button color match the background, it makes the UI monotonous").
- **Check method:** for each element, note the surface color under it and confirm the foreground differs enough in luminance/hue to read at glance level. When unsure, prefer higher contrast.

## Rule 1 — Never crop an already-transparent logo into a square box

If the source logo/monogram asset already has a transparent background (`A=0` corners, no baked gradient), **do not crop it to a square**. A square crop forces a boxed feel and a second, competing size that clashes with the wordmark. Use the asset as-is and let CSS `object-contain` + height/width classes size it.

- Only crop when the source is a **wide lockup** (emblem + wordmark + tagline in one file) and you genuinely need just the emblem, OR when the source has a baked background that must be removed.
- When you crop for a favicon/app icon, the crop is for that icon target only. Do NOT then also place the full lockup and the crop side-by-side on a screen.
- Favicon: downscale the emblem to the icon size. If webp tooling (sharp) is unavailable, output PNG and update the `<link type="image/webp">` to `image/png` in every screen that references it.

## Rule 2 — The emblem shows exactly once per screen

A screen must not render the monogram/emblem twice (e.g., a big animated monogram stacked above the full wordmark lockup that also contains the emblem).

- If a screen shows a hero monogram, the wordmark below it must be **text-only** (HTML text for "KINE PAY" + tagline), not the full logo image.
- Simplest correct pattern for a splash/hero on a light bg: show the **single unified lockup asset** once, sized well. Drop the separate monogram + separate text.
- Before finalizing a screen, grep it for both `kine-monogram*` and `kinepay-logo-*`; if both are in the same visible stack, that's a repeat — remove one.

## Rule 3 — Pick the logo variant by reading the ACTUAL background color

Light bg (white / pale gradient like `#fef4f9 → #eff6ff → #ecfdf5`, light cards) → use the **dark/color** logo (`kinepay-logo-color.png`) or the user's light-bg vertical monogram (`kinepay-monogram-light.png`). Dark/mid bg (deep navy `#0a1e5c`, near-black, AND the home hero blue `#1a63b0 → #5fb0e8`) → use the **white** logo (`kinepay-logo-white.png`).

- Do NOT assume a hero is light or dark from class names alone. Read the gradient stops. The Kinepay **splash** hero is light (pale pastels) → color/monogram-light. The **home** hero (`.home-top-curve`) is a mid-to-dark blue gradient → white logo.
- After choosing, add a subtle `drop-shadow` matched to the bg (light shadow `rgba(0,0,0,0.15)` on light bg; no shadow or a dark glow on dark bg).
- Never put a white logo on a light background or a dark logo on a near-black background.

## Rule 4 — Keep primary CTA buttons yellow; don't match them to the background

Primary action buttons (`.btn-tfc-action`, `.btn-tfc-yellow`, `.btn-shine`) stay **yellow/gold** so they pop. Do NOT recolor a CTA to a blue/teal gradient that blends into a light/pale page — that makes the UI monotonous and the button disappears.

- Kinepay standard CTAs: `.btn-tfc-action` / `.btn-tfc-yellow` (gold `#facc15 → #f59e0b`, border `#d97706`, 3D shadow `#92400e`, dark-navy text `#1e293b`) AND `.btn-add-money` (same gold; it is a separate class and must be recolored with the rest). White text on bright yellow is low contrast — use dark text.
- If you change a CTA color in `assets/css/style.css`, update the matching inline `shadow-[3px_4px_0_#...]` tokens in every `screens/*.html` that hardcodes the old shadow hex (they are per-screen and won't follow the CSS).
- "Pop" rule: a primary CTA should contrast with its page bg. On a light/pale hero, a warm yellow CTA is the correct choice; reserve blue/teal for secondary/decorative surfaces, not the main action.

## Rule 5 — Profile avatar shows the registered user's name initial, not a hardcoded two-letter demo

The home header avatar (`.home.html`) must show the **first letter of the registered user's name**, not a hardcoded "JD". It is green (per user request), not the old blue→teal.

- Avatar bg: green gradient `from-green-500 to-emerald-400` (user preference for the profile button).
- Initial: read `kinepay_user` from localStorage (`{name}`); fall back to `kinepay_fullName` / `kinepay_name`; final fallback "John Doe" → "J". The element is `#profile-avatar-initial`; a script in home.html fills it on DOMContentLoaded.
- Signup stores the name: `signup.html` gives the Full Name input id `signup-full-name` and its `onsubmit` does `localStorage.setItem('kinepay_user', JSON.stringify({name}))` before redirecting to otp-verification.html. If you change the storage key, update both signup (write) and home (read).
- Never hardcode a fake user's initials in a header; derive from the stored name.

## Rule 6 — Custom icons: match the placement surface (contrast) and deliver perfectly trimmed, truly transparent assets

When generating or swapping icon assets (3D/vector sets), apply Rule 0 to them too, and hold the cutout to a hard standard:

- **Contrast by where the icon actually sits, not by its own colors.** On a light surface (white cards, pale splash) icons may be colorful/teal; on a mid-to-dark surface (home hero blue `#1a63b0 → #5fb0e8`, purple receipts) a light/white icon is right and a dark-teal icon would sink in. Read the real bg behind each icon slot before choosing/recoloring a variant. Same logic as Rule 3, for icons.
- **True transparency, not a baked white box.** A PNG icon must carry real alpha. A white square, checkerboard baked into the pixels, or a white fringe around the edges is a defect. Verify with an alpha check (corner/edge pixels `A=0`) before shipping. White-source sheets must have the white removed with an alpha matte, not just a rectangular crop.
- **Remove background by border-flood, never by global color.** A 3D icon often uses **white as a real material** (glossy white faces). A blanket "make every near-white pixel transparent" punches holes through those faces. Instead flood-fill the background white that is *connected to the image border*; interior white stays opaque.
- **Upscale with bilinear, not nearest-neighbor.** The source sheet cells are small (~150–220px); scaling to a 512px canvas is an *upscale*. Nearest-neighbor sampling turns the gradient shading into a visible checkerboard/moiré. Use bilinear (or better) interpolation for the final raster.
- **Perfectly trimmed.** Crop tightly to the icon silhouette with small, consistent transparent padding. No slivers of a neighboring icon, no leftover background, no clipped parts. After extraction, inspect each PNG at full size for halos/fragments before including it.
- **Consistent set.** Same perspective, lighting, scale, padding, and palette across every icon in the set so the UI reads as one system.
- **Deliver honest format.** Transparent PNGs are raster. Do not label them SVG/vector unless genuine vector tracing was done and checked. Name files clearly (`send_money.png`, `mobile_recharge.png`, …).

## Rule 7 — How to GENERATE a custom icon set, and how to SEPARATE it accurately

Getting icons right fails in two places: the generation prompt and the separation. Both were wrong before and produced overlapping / under-trimmed / poorly bg-removed icons. Fix the pipeline, not just one asset.

### Generation: grid, transparent, spaced — never a single row

- **Generate on a GRID, not one long row.** A 18-icon single row in 1024px leaves ~50px between icons with no reliable gaps → bleed and mis-crops. Use a 2D grid (e.g. 3×2, 3×3) so there is spacing on **both** axes. Keep icons-per-sheet small (6, ideally ≤3×3) so each cell is large and the gaps are wide.
- **Generate with a transparent background, never a white/colored box.** The flat v3 style sits fine on real alpha. Asking for "pure white background" forces a fragile bg-removal step (Rule 6) that always leaves fringes. Ask for **transparent PNG, no background** (or a clearly separable neutral bg if the generator can't do alpha), then still verify alpha.
- **Demand generous, uniform gaps in the prompt.** Explicitly say: icons in a regular grid, each icon fully inside its own cell, wide empty margins between cells, nothing touching. Name each icon's cell (row, col) so the layout is deterministic.
- **Keep the style spec constant across all sheets** (same palette, perspective, shading, shadow, scale, label placement) so the set reads as one system. Feed reference icons for style.

### Separation: fixed cell split, not gap-detection

- **When the layout is a known grid, split by cell geometry, not by searching for gaps.** A `cols × rows` grid on a `W×H` image has cell boundaries at multiples of `W/cols` and `H/rows`. Crop each cell, tight-crop to the icon silhouette inside that cell, then upscale. This is deterministic and cannot pull in a neighbor.
- **Only use gap/density detection when the layout is NOT a regular grid** (hand-placed, ragged). For a generated grid it is the wrong tool and the cause of the bleed/crop defects.
- **Per-cell pipeline:** crop the cell → border-flood the surrounding bg (Rule 6: connected-to-edge only, never global white) → tight-crop to the silhouette with small consistent padding → bilinear-upscale to the target size (Rule 6) → inspect for halos / neighbor slivers / clipped parts before shipping.
- **Verify the count:** number of extracted icons must equal number requested. Any shortfall means a cell was empty (icon generated in the wrong cell) → regenerate that sheet, don't force-fit.
- **Re-generate the offending sheet when spacing fails.** If a sheet's icons crowd (no clean cell gaps), do not squeeze the extraction — regenerate that sheet with a sparser grid (fewer icons, larger margins) until every cell separates cleanly.

## Workflow

1. Identify every screen/hero that shows a brand mark or CTA button.
2. Read each surface's real background (gradient stops, `bg-*` classes) — not just the presence of `gradient`.
3. Apply Rule 0: for each element on that surface, confirm it contrasts the bg (logo variant per Rule 3, CTA color per Rule 4).
4. For each, choose: single unified lockup (light hero) OR monogram-as-text-wordmark (if a big monogram is desired), and the correct color variant.
5. Verify: no emblem repeats on a screen; logo variant matches bg; no square-crop box on transparent assets; CTAs are a contrasting accent, not bg-matching.
6. Grep the whole `screens/` set for `kinepay-logo-white`, `kinepay-logo-color`, and every CTA class (`btn-tfc-action`, `btn-tfc-yellow`, `btn-add-money`) and confirm each sits on the right bg / uses the consistent CTA color.

## Verification

- After edits, grep for double-emblem stacks and wrong-variant placements across all screens, not just the one being changed.
- If you can render (browser screenshot available), confirm the emblem appears once and the wordmark is legible on its bg. If not, state the limitation and verify from source.

