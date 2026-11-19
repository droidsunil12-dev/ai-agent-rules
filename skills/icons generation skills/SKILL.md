# SUPERSEDED — do not follow for new logo/icon work
The "remove background-color fringes / refine alpha matte" guidance predates the durable rule. Generate logo/icon assets DIRECTLY on a true transparent background when the need is transparent; do NOT generate on a solid background and strip it later (post-hoc removal on a solid source makes the asset grainy/ugly and unusable). See master-icon-generation rule 15 and the imagegen skill "Transparent background rule".
---
---
name: icon-set-production
description: Generate a consistent icon set for any theme, style, product, or company, accurately extract each icon from the approved generated artwork, create transparent individual assets, verify the cutouts, and deliver everything in one ZIP.
autoInject:
  keywords: ["icon", "icons", "icon set", "app icons", "ui icons", "generate icons", "icon pack", "3d icons", "icon sheet"]
---

# Icon Set Production Skill

## Purpose

When the user asks for an icon set, complete the full production workflow in one task:
1. Establish only essential missing requirements.
2. Generate one coherent icon-sheet image in the requested style.
3. Extract the actual generated icons from that sheet—never redraw them as substitutes.
4. Produce individual transparent assets.
5. Inspect and validate the extracted files.
6. Package the deliverables into a ZIP and provide a working download link.

The skill must execute the task, not merely explain how the user could do it.

## Non-negotiable rules

- **Original artwork is the source of truth.** Every delivered icon must come from the approved generated icon sheet or from an individually generated original icon. Do not replace icons with hand-written SVG approximations, stock icons, emoji, or unrelated artwork.
- **Never claim a raster file is vector.** PNG is raster; SVG is vector. Do not convert or rename PNG files to `.svg`. Only deliver SVGs if genuine vector tracing or vector generation has been performed and visually checked.
- **Transparent background means real transparency.** A checkerboard pattern baked into an image is not transparency. Inspect the image alpha channel and verify output PNGs contain transparent pixels.
- **Preserve the artwork.** Keep the icon's silhouette, colors, lighting, perspective, details, and proportions. Do not redesign, recolor, distort, or apply a different style during extraction.
- **Do not use arbitrary grid crops as the final extraction method** if they include pieces of neighboring icons, backgrounds, or other objects. Grid cells may be used as initial regions, but each crop must be segmented and inspected.
- **No invented additions.** Do not add a logo, brand name, captions, labels, or decorative elements unless the user explicitly requests them.
- **Logo gate:** If logo inclusion is not already answered for this task, ask once: “Should I add your company logo? Upload the exact logo, or reply No.” If the user says No, do not add one. If the user requests a logo, use the supplied logo exactly as provided; never redesign or modify it.
- Respect the user's specified icon style, theme, company, brand palette, intended use, and dimensions. If these are already clear, do not ask again.
- Do not claim completion until the ZIP exists, has been opened/tested, and contains the expected assets.

## Step 1 — Interpret the brief

Extract from the user's prompt:
- Theme or industry (for example fintech, healthcare, travel, education, gaming, retail).
- Company/product name and exact brand colors, if provided.
- Requested icon style (for example flat, outline, duotone, clay, 3D, isometric vector, glass, line art).
- Required icon subjects and approximate set size.
- Intended use (web UI, mobile app, dashboard, marketing, etc.).
- Output requirements (transparent background, PNG/SVG, size, ZIP).
- Logo instruction.

Do not ask for details already provided. If the brief is sufficiently clear, proceed without a questionnaire. If the user says “you decide,” make sensible design decisions and proceed.

## Step 2 — Define a coherent icon system

Before generating, establish a compact visual specification:
- One consistent perspective and camera angle.
- Consistent outline treatment and line weight, if outlines are part of the style.
- Consistent lighting direction, shadow direction, material treatment, and detail density.
- A controlled palette aligned to the brand or theme.
- Consistent visual scale, padding, and complexity.
- Clear, recognizable silhouettes that remain legible at typical UI sizes.
- No text inside icons unless it is essential to the subject or explicitly requested.
- No sheet title, labels, frames, numbering, or extra copy unless requested.

For “vector-style 3D isometric,” use **clean geometric vector illustration with a consistent isometric view**: crisp edges, simplified planes, controlled flat shading, limited gradients, and no photorealistic materials or glossy toy-like objects. Do not interpret this style as generic shiny 3D renders.

Create a sensible set of unique icons that fit the theme. Avoid duplicates and near-duplicates.

## Step 3 — Generate the source artwork with ChatGPT image generation

**Use ChatGPT image generation as the default image-generation route.** This is a required workflow step, not an optional suggestion. The agent must determine which of these routes it can actually use, then follow the best available one.

### Built-in `imagegen` tool: use only for a few icons, never for sets
- **Never use the built-in `imagegen` tool for multi-icon sets, icon sheets, or >~3 icons at once.** In practice it bakes a solid opaque panel or dark radial-vignette background behind the icons, which cannot be cleanly keyed out and yields distorted, inconsistent, stretched cutouts. This failure was observed repeatedly.
- **Use the built-in `imagegen` tool ONLY for a small number of individual icons (a few, one at a time)** when a single isolated icon is needed and the ChatGPT browser route is unavailable or overkill.
- **Default: route any icon-set / sheet / batch generation through the ChatGPT browser (Route A).** Built-in `imagegen` is a last resort for a couple of singles, not the primary generator.

### Route A — Open ChatGPT's image generation in the browser
1. Open **https://chatgpt.com/** in a new tab and use the user's already-logged-in session. Do not ask for passwords, API keys, or session cookies. If sign-in is required, pause and say what the user needs to do.
2. Start a new conversation (or continue a suitable existing one). Enable/switch to image generation mode in the ChatGPT interface when it is available; explicitly activate image creation, don't just ask the text model to describe an image.
3. Pass the complete image-generation prompt (icon theme, visual style, brand palette, icon subjects, layout, isolation requirements, and transparency requirements) directly into ChatGPT's image generation.
4. Wait for generation to finish, then download the **full-resolution original** result using ChatGPT's own download/open control — not a screenshot of the webpage.
5. Record the exact output file path and confirm it is accessible before processing.

### Route B — ChatGPT browser route is unavailable (not logged in, page blocked, no download control reachable)
Explain the specific blocker honestly. Do not silently fall back to the square-capped `imagegen` tool for icon-sheet work that needs a non-square layout; report that the ChatGPT generation step is blocked in this session and stop, rather than producing a crop-damaged substitute.

### Route C — Neither a built-in ChatGPT image tool nor browser control is available
Explain that the ChatGPT image-generation step cannot be executed in the current environment. Do not claim to have visited ChatGPT or generated an image. If appropriate, provide the ready-to-paste image prompt as a fallback, but clearly distinguish that from completed work.

### Source-artwork requirements
Generate a single organized icon sheet when it is suitable for reliable batch extraction. Use a clean, evenly spaced layout with:
- A consistent icon size and clear gaps between icons.
- No overlapping icons.
- No icon touching the canvas edge.
- No sheet title, labels, frames, numbering, or decorative scenery unless explicitly requested.
- A transparent background whenever the image-generation tool truly supports transparency. A checkerboard drawn into the picture is not transparency.
- One consistent perspective, lighting direction, level of detail, and visual style throughout the sheet.

If individual generation produces more accurate or separable results for a particular style, generate icons in small consistent batches or one at a time, while reusing the same visual specification. Do not squeeze an excessive number of tiny icons into one sheet just to maximize count; prioritize recognizable, extractable artwork.

Immediately identify the exact source image file or asset returned by ChatGPT image generation. Confirm that it exists in the current working environment before processing it. Never guess or reuse a path from an earlier session.

## Step 4 — Inspect the source before extraction

Use image inspection and image-processing tools available in the environment.

Check:
- Image dimensions and color mode.
- Whether an alpha channel exists.
- Whether the alpha channel contains real transparent pixels.
- Whether the supposed background is actually transparent or is a baked-in checkerboard/solid/gradient.
- How many icons are present and where they are located.
- Whether icons touch or overlap each other.
- Whether glows, shadows, or background colors connect separate icons.

Choose the extraction method based on the source:

### A. Source already has real transparency
1. Use the alpha channel and connected-component analysis to identify icon regions.
2. Group related components belonging to the same icon (for example, a small coin or sparkle attached to a main object).
3. Keep detached details that visually belong to the icon.
4. Do not simply keep one connected component per icon; one icon may contain several disconnected components.
5. Remove stray components that belong to adjacent icons or background artifacts.
6. Preserve the original RGB values and alpha edges.

### B. Source has a flat or nearly flat background
1. Estimate the background color from the outer canvas and empty gaps.
2. Build a foreground mask using color distance and spatial context, not color alone.
3. Preserve similarly colored foreground details that could otherwise be removed.
4. Refine edges and remove background-color fringes without damaging the icon.
5. Keep natural object shadows only if they are part of the intended artwork; remove broad sheet-level glow/background effects.

### C. Source has a complex gradient or multicolored background
1. Use a suitable foreground-segmentation/background-removal model or a careful mask workflow if available.
2. Use each icon's region as a guide, then segment its silhouette.
3. Refine the alpha matte around antialiased edges.
4. Remove color spill from the old background when needed.
5. If accurate separation is not possible with available tools, do not pretend it is clean. Try a better segmentation method or regenerate the source with more separable spacing and a simpler/transparent background.

### D. Grid-based extraction
A grid can define initial regions, but it is only a starting point. For every region:
1. Detect the actual icon silhouette.
2. Remove adjacent-icon fragments and unrelated artwork.
3. Crop to the icon's alpha bounds with balanced transparent padding.
4. Check that no icon is clipped.
5. Check that no neighboring icon or background remains.
6. Keep the original art unchanged.

Never split a sheet into equal rectangles and assume that every rectangle is a finished icon.

## Step 5 — Normalize and export assets

Export each icon as an individual PNG unless the user requested another format.

Default export recommendations:
- Transparent RGBA PNG.
- High resolution appropriate to the source; do not upscale and claim that it creates new detail.
- Tight but balanced crop with consistent visual padding.
- Consistent canvas dimensions where practical. Center icons optically, not only mathematically.
- Clear, descriptive, lowercase filenames with underscores, such as `send_money.png`, `mobile_recharge.png`, `profile.png`.
- Do not add backgrounds, labels, shadows, or margins that were not part of the approved icon design.

For a consistent UI asset library, it is acceptable to place each cropped icon on a standardized transparent canvas after segmentation. Do not distort aspect ratio to force all icons into a square.

### SVG requests
- If the user asks for SVG, use a real vector tracing/generation method and visually compare the SVG rendering with the source.
- Simplify paths only when it does not materially alter the approved artwork.
- Do not manually invent substitute SVG icons.
- If accurate vectorization is unavailable or would substantially damage the artwork, deliver the faithful transparent PNGs and clearly state that they are raster assets. Do not label them as SVGs.

## Step 6 — Quality assurance (mandatory)

Before creating the ZIP, inspect the extracted assets as a contact sheet and/or review them individually.

For every icon, verify:
- The intended icon is present and recognizable.
- No part is clipped.
- No adjacent icon fragments remain.
- No baked-in checkerboard or unwanted background remains.
- Alpha transparency is real.
- Edges do not have severe halos, jagged masks, or missing details.
- Colors and perspective match the original sheet.
- File opens successfully and dimensions are nonzero.
- Filename matches the subject.

Also verify the collection:
- The icon count matches the expected count, excluding README/preview files.
- There are no accidental duplicates.
- Visual scale, padding, and style are reasonably consistent.
- The ZIP opens successfully and contains all expected files.

If quality checks fail, fix the affected icons or repeat extraction before delivering. Do not silently include known-bad assets.

## Step 7 — Package the deliverables

Create a ZIP containing:
- A clearly named folder, for example `company_icon_set/`.
- One file per icon.
- `README.txt` describing the format, transparency, icon count, and any relevant limitation.
- Optionally, a contact-sheet preview if useful; do not let the preview replace the individual files.

Keep the package clean. Do not include temporary masks, debug images, scripts, unrelated files, or obsolete versions unless requested.

Use a descriptive filename such as:
- `fintech_icon_set.zip`
- `company_isometric_icons.zip`
- `travel_app_icon_set.zip`

Verify the exact ZIP path exists in the current environment and test the archive before returning a download link. Never invent a sandbox path.

## Step 8 — Final response

Be concise. Include:
- A direct working download link to the ZIP.
- The actual number of individual icons.
- Actual file format(s).
- Confirmation of real transparency only if verified.
- A brief, honest limitation if vector output was requested but only faithful PNG extraction was possible.

Do not claim that the icons are SVG/vector if they are PNGs. Do not make the user repeat the brief. Do not return code instead of the completed asset package.

## Failure handling

If extraction quality is poor:
1. Do not deliver the poor ZIP as finished.
2. Inspect the original sheet and improve segmentation.
3. If the image itself is too crowded or background removal is unreliable, regenerate a better-separated sheet using the same design specification.
4. Re-extract and inspect the assets.
5. If a limitation remains, explain it accurately and deliver only what has been verified.

## Completion checklist

- [ ] Style and subjects match the user's brief.
- [ ] Logo instruction was followed.
- [ ] Actual generated icons were extracted; no substitute redraws.
- [ ] Each icon is an individual file.
- [ ] Background transparency was verified.
- [ ] All icons were inspected for clipping, fragments, and halos.
- [ ] Filenames are clear and descriptive.
- [ ] README accurately describes the assets.
- [ ] ZIP exists and passes an archive integrity test.
- [ ] Download link points to the verified ZIP.
- [ ] Final response accurately states PNG vs SVG.

