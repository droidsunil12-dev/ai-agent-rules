---
name: "master-icon-logo-generation"
description: "Generate cohesive icon sets and logos/lockups in one ChatGPT image-generation request, then inspect the actual composition, isolate every asset using verified object boundaries, tightly trim each transparent PNG (horizontal logos trimmed, never square-wrapped), validate each file, and package the set. Supports any icon/logo style and palette, with deliberate collection-wide color balance."
---

# Master Icon & Logo Generation Skill

## Mission

Create a complete, visually cohesive icon set of any subject, style,
palette, or quantity through the ChatGPT website in **one
image-generation request**, then export every icon as a separate,
tightly trimmed PNG with genuine transparency.

The output must be ready for app, web, and UI development. Each PNG must
contain the complete icon artwork with only a tiny transparent safety
margin. Never place a small icon on a huge empty canvas.

This skill supports any style the user requests: flat, outline, filled,
3D, isometric, sticker, hand-drawn, glass, clay, pixel, monochrome, or
other visual languages.

## Absolute rules

0.  **Use ChatGPT image generation for new product icons, logos, and screen artwork.** For Type A, AGENTS.md §0.0 governs when artwork can be generated and when it may be wired in. A prototype is not a shortcut: never substitute hand-drawn SVG/CSS/raster or stock/Lucide for requested new art. Reuse only assets already approved for this use. Verify actual transparency and bounds before wiring; hand over a genuine generation blocker instead of drawing replacements.
1.  Generate one master sheet in one image-generation request whenever
    the user requests a set.
2.  Request an orderly grid and generous empty gutters.
3.  **Never assume the generated image actually follows the requested
    grid.** Inspect the downloaded original before separating anything.
4.  **Never judge an image's background by how it looks in a viewer.**
    A transparent PNG renders on whatever background the viewer shows,
    so "looks black/solid" is almost always the viewer, not the pixels.
    Before claiming an asset has a baked/opaque background, **verify the
    alpha channel** (sample corner/edge pixels, or read the PNG format +
    A values). Only conclude "opaque" after that check.
    **Never fall back to hand-drawing an SVG, CSS shape, or regenerating a raster just because the preview looked dark or "ugly."** A transparent-background asset will appear black in most viewers, thumbnails, and canvas previews. This is the expected, correct result, not a defect. If the alpha check confirms the background is actually baked (A=255 at edges), then and only then regenerate. If the alpha is correct, use the file as-is. Same for claiming
    "transparent" — confirm A=0 at the expected edges. Applies to every
    logo, icon, or image asset, including files the user supplies.
4.  **Never use equal grid-cell crops as final icon crops.** Grid cells
    are only approximate search regions. Final crops must follow each
    icon's complete visible artwork bounds.
5.  Never invent crop coordinates, infer them from a preview, or reuse
    coordinates from another image. Measure all coordinates from the
    exact downloaded original being processed.
6.  Account for every part of each icon, including detached details such
    as signal waves, droplets, tags, handles, antennae, sparkles,
    shadows, or other style-specific elements.
7.  Never remove small components solely because they are small. They
    may be intentional parts of the icon.
8.  Never include any part of a neighboring icon in an export.
9.  Never deliver clipped, incomplete, contaminated, or excessively
    padded icons.
10. Never claim transparency, separation, or visual correctness has been
    verified unless the actual exported PNGs have been inspected.
11. Preserve the user's exact style, palette, icon order, requested
    count, and exclusions.
12. Do not add a logo unless explicitly requested and the user provides
    the exact logo.
13. Do not silently recolor, simplify, or redesign the user's requested
    artwork during extraction.
14. Do not deliver until the final ZIP has been rebuilt from the
    validated PNGs.
15. Logos, lockups, and UI icons are no exception: deliver them as transparent, tightly trimmed PNGs. Generate them DIRECTLY on a true transparent (alpha) background when the need is a transparent asset. Do NOT generate on a solid background (black, white, or any flat fill) and strip it later — post-hoc removal on a solid source produces grain, halos, and cut-out artifacts that make the asset unusable. Only if the model returned a flat background against instruction, regenerate with a stronger transparency instruction before falling back to removal. Never ask the user whether to "use the square version." If both light- and dark-surface variants are needed, make each transparent and let CSS choose per surface — never bake a background into the PNG.

    **Horizontal-arrangement logos must be delivered trimmed, never square-wrapped.** When the artwork is laid out wide (emblem left, wordmark right, or any horizontal lockup), the output canvas must be CROPPED to the artwork's content box (alpha `getbbox` + a small uniform pad). Leaving a horizontal logo inside a square canvas makes it render small and off-center in the UI (empty top/bottom bands waste the height). So in the generation prompt say it explicitly: "horizontal lockup, trimmed tightly to the artwork, transparent background, no empty margin." If the model returns a square canvas, crop it before delivering — never hand over the square. **"Trimmed" is proven by the alpha bbox, not the file dimensions:** after cropping, measure the actual content bounds with `np.where(alpha>8)` and confirm the crop hugs the artwork (a few-percent pad max). A non-square file (e.g. 1024x763) can still hold only ~362px of artwork centered with ~167px empty above and ~292px below — that still renders as a small logo floating in a big empty box (the "square look"). Never report an asset as trimmed just because its dimensions changed; only report it after confirming the content fills the canvas. Vertical/stacked logos follow the same trim rule; only the aspect changes.

## Phase 1 --- Parse the brief

16. **Do NOT alter a logo unless asked. Minimal edits only.** An approved/existing logo is LOCKED artwork. The only permitted operations on it are:
    -   **Trim** excess whitespace/padding around the content (`getbbox` crop + small uniform pad). This is the default "make it horizontal" / "clean it up" / "trim the empty space" task on an already-arranged logo — just crop, don't move pixels. **On approval the task is trim-only:** one tight imagegen prompt ("trim the empty space, keep everything else untouched, transparent background") or one `getbbox` crop — no analysis, no redesign, no recolor, no layout change, no square-vs-horizontal question.
    -   **Never substitute a sibling file.** If a wide/vertical/other variant of the same logo already exists that the user disapproved, do NOT wire it in — that back-and-forth is the exact mistake that wastes the task. Only the approved asset gets trimmed. Move any disapproved sibling into a `_disapproved/` subfolder so it cannot be reused.
    -   **Recolor** the artwork's colors (e.g. switch to a greyed-out/monochrome version, or adapt color for dark vs light backgrounds). Recolor = change hue/value, never redraw.
    -   **Reposition / re-arrange existing elements** only when the user explicitly asks to change the layout.
    **FORBIDDEN without explicit instruction:** regenerating the emblem or wordmark from scratch, restyling the artwork, redrawing any part, or adding a solid background then stripping it (which destroys content). **Before touching any logo, first inspect it: check the alpha channel and the actual pixel content.** If the file is already transparent (corner alpha 0, content bbox present), it is a clean source — the task is almost certainly just trimming, not regeneration or background removal. Never assume a black or white backdrop you rendered is the source; read the real file. If unsure whether to edit or recreate, ask one question first.

Extract:

-   Exact icon count.
-   Exact icon names and order.
-   Requested grid dimensions, if specified.
-   Visual style and supplied reference images.
-   Palette and exact color values.
-   Perspective, lighting, rendering, shape language, and detail level.
-   Background and transparency requirements.
-   Required or prohibited effects (outlines, shadows, glow, gradients,
    text, etc.).
-   Desired output format, resolution, and canvas behavior.
-   Any collection-wide color balance or accent-distribution
    requirements.

Do not ask for details already supplied. Ask only for an essential
missing detail. Do not add labels, text, logos, or decorations unless
requested.

## Phase 2 --- Establish collection-wide color balance

A set must look like one designed family when its icons are viewed
together. Do not treat each icon as an unrelated illustration.

### Palette roles

Before generating, identify:

-   **Primary color(s):** the dominant shared colors that visually
    connect the set.
-   **Secondary color(s):** supporting colors used across multiple
    icons.
-   **Accent color(s):** limited highlights used to create hierarchy and
    variety.
-   **Functional colors:** colors that naturally belong to a subject,
    such as yellow for a light bulb, green for plants, or red for a
    medical cross, when appropriate to the user's brief.

### Balance rules — avoid the "colorful emoji" look

The icons must look like one professionally art-directed UI asset family,
not a collection of unrelated, brightly colored emoji illustrations.
Color consistency is a core design requirement.

1. **Use a restrained palette.** Unless the user explicitly requests
   otherwise, establish one dominant color, one supporting color, and
   no more than one or two controlled accent colors.
2. **Set a clear hierarchy.** For the current blue/gold icon family,
   blue is the dominant shared color; yellow/gold is the supporting
   accent; white and pale blue are neutral highlights. Pink is excluded
   from this family unless the user explicitly asks to bring it back.
3. **Do not make every icon a different bright color.** Avoid arbitrary
   combinations of pink, red, green, purple, orange, and yellow just to
   make individual icons look playful. Use only approved palette colors,
   except for a genuinely necessary subject-specific color allowed by
   the brief.
4. **Control saturation and brightness.** Avoid several competing,
   highly saturated hues in one icon. Create depth with lighter and
   darker tones of the approved colors instead of adding unrelated hues.
5. **Repeat the shared color signature.** The dominant color should
   recur across most icons wherever the subject allows. Supporting and
   accent colors must be distributed intentionally, not randomly.
6. **Allow subject-led exceptions.** A light bulb may naturally be
   yellow-dominant; a flame may use warm orange/yellow; a medical cross
   may use red only when the brief permits it. These exceptions must
   remain limited and must not turn the set into a rainbow.
7. **Do not force identical color percentages.** Judge the collection's
   overall visual rhythm. A naturally yellow bulb can sit beside
   blue-dominant utility icons and still belong to the same family.
8. **Review the contact sheet at normal UI size.** Flag any icon that
   looks much louder, more saturated, warmer, or more colorful than its
   neighbors. Remove unnecessary hues at the generation stage.
9. **Never add meaningless colored decorations** just to distribute an
   accent. Every color must serve the subject, hierarchy, or readability.
10. **Treat color exclusions as absolute.** If the user says "eliminate
    pink", pink must not appear in the artwork, highlights, reflections,
    shadows, tiny details, or background effects. Apply the same rule to
    every other prohibited color.
11. **Do not reintroduce excluded colors during extraction or editing.**
    Extraction preserves the approved source colors; it must not add
    colors.
12. **Do not carry this project's palette into unrelated projects.**
    Use the palette in the current brief or reference. The restrained
    palette and collection-wide consistency principles still apply.
13. **Do not recolor isolated icons just to hit numeric color ratios.**
    If the set feels unbalanced, revise the master prompt and regenerate
    the complete sheet so the result remains coherent.
14. Before generation, explicitly define palette roles and exclusions.
    If the user provides no palette, choose a restrained professional
    palette rather than letting the image model invent a different
    bright palette for every icon.

### Collection-level prompt language

When relevant, include a direction such as:

> Design the icons as one coordinated family. Maintain consistent color
> hierarchy and visual weight across the complete set. Reuse the shared
> primary colors across icons wherever appropriate, distribute accent
> colors intentionally, and allow subject-specific colors when they make
> visual sense. Avoid isolated icons that are disproportionately
> dominated by one accent. Review the complete collection as a single
> visual system. \[List any colors that are strictly prohibited.\]

Adapt this to the user's actual palette and constraints. Do not impose
colors the user did not request.

## Phase 3 --- Plan the master sheet

Use the requested grid dimensions when supplied. Otherwise choose a grid
that comfortably accommodates the number and proportions of icons.

Prompt the image model to:

-   Put one icon in each intended cell, in exact reading order.
-   Keep every icon centered and fully inside its own area.
-   Use consistent visual scale and visual weight.
-   Leave wide, uniform, completely empty gutters between icons.
-   Keep detached parts within the same icon's area.
-   Leave a clear margin around the outer edge.
-   Avoid overlap, touching, merged silhouettes, stray fragments, and
    decorative filler.
-   Use a genuinely transparent background when supported.
-   Avoid checkerboard simulation. A checkerboard is not alpha
    transparency.
-   Avoid panels, cards, tiles, grid lines, borders, captions, numbers,
    labels, and text unless requested.

Aim for roughly 18--25% clear space between neighboring icon silhouettes
where practical. Do not shrink icons excessively to create a grid. Each
icon must remain large enough to retain its details.

## Phase 4 --- Generate through the ChatGPT website

When operating as a browser assistant:

1.  Open ChatGPT and use its image-generation capability.
2.  Submit one complete prompt describing the entire icon set.
3.  Wait for generation to finish. Do not submit duplicate prompts while
    it is processing.
4.  Inspect the returned image at full size.
5.  Download the original generated image at the highest available
    resolution. Do not use a screenshot, thumbnail, or compressed chat
    preview if the original download is available.
6.  Keep the original master image unchanged as the source of truth.

### Prompt template

> Create ONE image containing exactly \[N\] icons in a \[COLUMNS\] ×
> \[ROWS\] arrangement, read left-to-right and top-to-bottom.
>
> Exact icon order: \[NUMBERED SUBJECT LIST\]
>
> STYLE: \[USER'S STYLE\]. Keep the style, perspective, proportions,
> detail level, finish, and visual weight consistent across all icons.
>
> COLORS: \[USER'S PALETTE AND COLOR ROLES\]. Treat the icons as one
> coordinated family. Maintain a consistent collection-wide color
> hierarchy and distribute accents intentionally. Allow subject-specific
> color dominance where appropriate. Strictly exclude: \[PROHIBITED
> COLORS OR ELEMENTS\].
>
> SPACING: Every icon must be a separate, complete object. Center each
> icon in its intended area. Keep all parts inside that area, including
> detached details. Leave wide, even, completely empty gaps between
> neighboring icons and a clear outside margin. No icon may touch or
> overlap another.
>
> BACKGROUND: \[USER'S BACKGROUND REQUIREMENT\]. If transparency is
> requested, use true alpha transparency, not a checkerboard or
> solid-color simulation.
>
> Do not add, omit, duplicate, label, number, or rearrange any icon. Do
> not add extra objects or decorative elements.

Adapt the prompt to the user's brief. Do not force no-shadow/no-outline
rules if the user explicitly requests those effects. Ensure requested
effects stay within each icon's own area.

## Phase 5 --- Inspect the actual source composition BEFORE cropping

This is mandatory. Do not jump from download directly to slicing.

1.  Load the exact downloaded image as RGBA.
2.  Record its true pixel dimensions.
3.  Inspect the complete image at full resolution, not just the chat
    thumbnail.
4.  Determine whether it has real alpha transparency:
    -   Transparent background pixels should have alpha 0.
    -   Artwork should have visible alpha.
    -   If the background is opaque, do not pretend it is transparent.
5.  Display the original on a checkerboard preview. The checkerboard
    must not be baked into exported icons.
6.  Count visible icon objects and compare with the requested count.
7.  Verify the actual row/column arrangement. Rows may be uneven, icons
    may be offset, and the model may ignore the requested grid.
8.  Identify each icon's actual location and all its visible components.
9.  Create an internal annotated map or contact sheet if useful.
10. Do not proceed if icons touch, overlap, merge, or cannot be
    confidently distinguished. Regenerate with more spacing instead of
    guessing.

### Never assume the layout

A requested 6 × 4 grid does not prove the generated image contains six
equal columns in every row. The model may center a shorter last row,
shift objects, change spacing, or place objects across nominal cell
boundaries.

The actual generated image---not the prompt---is the source of truth.

## Phase 6 --- Build a verified object map

Before exporting, create an object map for every icon containing:

-   Icon number and requested name.
-   Approximate visual center.
-   Measured region that fully contains the icon.
-   Every detached component belonging to that icon.
-   Nearby neighboring icons that could be accidentally included.
-   Confirmed full-object bounding box.

### Object mapping methods

Use the most reliable method available:

1.  **Visual inspection plus measured bounding boxes:** Preferred for
    irregular layouts and moderate icon counts. Inspect at full
    resolution and measure each icon's true bounds.
2.  **Connected-component analysis:** Useful with transparent
    backgrounds and separated artwork. Detached parts belonging to one
    icon must be grouped intentionally.
3.  **Segmentation or object detection:** Useful for complex shapes or
    detached components. Verify every mask against the original.
4.  **Grid-cell regions:** Use only to help locate icons. Never use cell
    edges as final crop edges.

Do not use one bounding rectangle for multiple icons. Do not assume the
largest connected component is the whole icon. Do not discard small
components merely because they are small.

### Coordinates must be verified

-   Never reuse coordinates from a previous image, generation, or
    resolution.
-   Never copy crop coordinates from a thumbnail or screenshot and apply
    them to the original.
-   If the image is resized, transformed, or cropped, recompute
    coordinates in the transformed image's coordinate system.
-   Overlay every proposed crop rectangle on the original and inspect
    that it encloses the complete intended icon only.
-   If a rectangle touches a neighboring icon or cuts any part of the
    icon, correct it before export.

## Phase 7 --- Separate each icon

Process icons in the exact requested order.

For each icon:

1.  Use its verified individual region, not a presumed grid cell.
2.  Use the alpha channel or a reliable foreground mask.
3.  Keep all components that belong to the icon, including detached
    small details.
4.  Remove only confirmed background speckles or unrelated artifacts.
    Never apply a blanket component-size threshold without checking
    whether small parts are intentional.
5.  If a component could belong to either of two icons, inspect the
    original at full resolution. Do not guess.
6.  Find the union bounds of every component belonging to that icon.
7.  Tight-crop to those bounds.
8.  Add only a tiny transparent safety margin: approximately 1--2% of
    the icon's longer dimension, or 2--4 source pixels when appropriate.
9.  Preserve antialiased edges and original alpha. Avoid harsh
    thresholding that creates jagged edges.
10. Preserve the original aspect ratio. Never stretch an icon to make it
    square.
11. Save at natural cropped dimensions unless the user explicitly
    requests a standardized canvas.
12. Do not recolor or alter the artwork during extraction.

### Full-object examples

The crop must include the complete outer silhouette, not just the
central body:

-   Bulb: complete glass bulb and complete base.
-   Gas stove: complete flame and burner body.
-   Broadband router: both antennas and all signal waves.
-   Card: all rounded corners and contactless marks.
-   Satellite dish: dish, arm, base, and signal marks if present.
-   Shield: entire shield, emblem, checkmark, and any detached badge.

If any part is clipped, do not deliver the crop. Correct the object
bounds or regenerate the source.

## Phase 8 --- Mandatory visual QA of every individual PNG

A successful script run does not prove a correct export.

For each exported PNG:

1.  Reopen the saved PNG from disk. Do not inspect only the in-memory
    crop.
2.  Display it individually over a checkerboard.
3.  Compare it side-by-side with the corresponding icon in the original
    master image.
4.  Confirm the complete silhouette is present.
5.  Confirm no part is cut off at any edge.
6.  Confirm no neighboring icon fragment is present.
7.  Confirm all intentional detached parts remain.
8.  Confirm genuine transparency.
9.  Confirm the visible artwork fills most of the crop and is not tiny
    inside a large transparent canvas.
10. Confirm the aspect ratio is undistorted.
11. Confirm the file opens and is a valid RGBA PNG.

### Automatic checks

Check:

-   Correct number of output files.
-   Expected filenames and ordering.
-   Valid PNG format and RGBA mode.
-   Transparent outer corners or transparent margins.
-   Non-empty alpha bounds.
-   Tight crop occupancy.
-   No unexpected pixels outside the verified crop.

Automatic checks supplement visual inspection; they do not replace it.

### Contact-sheet QA

Create a preview contact sheet from the actual saved PNGs, not from the
original image. Show every icon against a checkerboard with enough room
to inspect it. Keep filenames outside the artwork if useful.

Inspect the contact sheet and every individual PNG. A contact sheet
alone can hide a clipped detail, so individual inspection remains
mandatory.

Also inspect the complete set at a consistent displayed size to
evaluate: - visual scale and weight, - style consistency, - palette
consistency, - accent distribution, - and whether any icon is
disproportionately dominated by one color.

**Anti-emoji color check:** the collection must not look like a row of
unrelated multicolored emojis. Confirm that the approved dominant color
visually connects the icons, accent colors are restrained, saturation
is controlled, and no icon introduces an unapproved hue. For the
current blue/gold family, pink must be absent throughout unless the user
explicitly changes that instruction.

If color balance is poor, regenerate the master sheet with a stricter
palette prompt. Do not try to fix the set by arbitrarily recoloring
isolated PNGs.

If any icon fails, repair it and rebuild the ZIP. Do not ship a
supposedly complete set if one requested icon is wrong.

## Phase 9 --- Export requirements

Use descriptive, numbered filenames in the requested order, for example:

-   `01_satellite_dish.png`
-   `02_landline_phone.png`
-   `03_prepaid_mobile.png`

Primary deliverables:

1.  One ZIP containing every individual, tightly trimmed transparent
    PNG.
2.  One contact-sheet preview generated from those exact saved PNGs.
3.  The original master sheet only if useful or requested.

Do not deliver only a contact sheet. Do not put icons on huge 1024 ×
1024 transparent canvases unless the user specifically asks for a
standard canvas. Do not upscale and claim native high resolution.

For UI and coding, tight native crops are the default. Developers can
size them with CSS or layout constraints. Avoid hidden empty margins
that make icons look too small.

If a common canvas size is requested, optionally provide both: - Tightly
trimmed PNGs (primary). - Standardized canvas PNGs with consistent
visual scale (secondary).

## Phase 10 --- Recovery and regeneration rules

-   **Icon clipped:** Reinspect the original and rebuild the complete
    bounding box. If the original itself clips the icon, regenerate.
-   **Neighbor fragment included:** Reinspect object boundaries and
    separate masks. If icons merged in the source, regenerate with
    larger gutters.
-   **Icon looks tiny in UI:** Check transparent bounds and trim excess
    padding. Do not tell the user to increase CSS size as a workaround
    for bad crops.
-   **Detached detail missing:** Restore it from the original source and
    group it with the correct icon.
-   **Background is opaque/checkerboard (was not generated transparent):**
    Do not export as transparent. FIRST regenerate the asset with a true
    transparent-background instruction (this is the correct fix). Only
    if regeneration is impossible, fall back to careful background
    removal with edge preservation — and treat the result as last-resort,
    not the default.
-   **Unexpected layout:** Build a new object map from the actual
    composition. Never force equal cells.
-   **Inconsistent visual style:** Regenerate inconsistent icons using
    the master sheet as a style reference.
-   **Unbalanced colors:** Reassess palette roles and collection-wide
    color distribution, then regenerate the sheet with explicit balance
    guidance.
-   **Prohibited color appears:** Regenerate or correct the source
    artwork so the prohibited color is absent throughout. Never leave
    small traces in highlights or accents.
-   **Wrong count/order:** Regenerate with an explicit numbered list and
    order.
-   **Uncertain boundary:** Stop and inspect or regenerate. Never guess
    and deliver.

## Phase 11 --- Communication and honesty

Be concise and direct. Provide links to the actual files created. Do not
claim "perfect," "verified," or "complete" unless the actual saved files
passed the checks above.

If a crop cannot be reliably separated, say so and regenerate the source
rather than handing over a broken file. Never ask the user to approve a
preview that contains known defects.

## Final delivery checklist

Before replying, verify every item:

-   [ ] Exact requested icon count.
-   [ ] Correct order and filenames.
-   [ ] Actual source inspected at full resolution.
-   [ ] Genuine alpha transparency confirmed.
-   [ ] Actual layout mapped; no assumed uniform grid.
-   [ ] Individual object bounds measured from this exact source.
-   [ ] Every icon's full silhouette and detached details included.
-   [ ] No neighboring fragments included.
-   [ ] Tight crop with minimal transparent margin.
-   [ ] No distortion or unintended upscaling.
-   [ ] No prohibited colors or elements remain.
-   [ ] Collection-wide color weight and accent distribution reviewed.
-   [ ] The set reads as one restrained UI icon family, not unrelated colorful emojis.
-   [ ] Dominant/supporting/accent color hierarchy is consistent across the collection.
-   [ ] Every saved PNG reopened and visually inspected individually.
-   [ ] Contact sheet generated from saved PNGs and inspected.
-   [ ] ZIP rebuilt from validated final PNGs.
-   [ ] Download links point to exact files created in this run.

**If any checkbox is not satisfied, do not claim the set is finished.**
