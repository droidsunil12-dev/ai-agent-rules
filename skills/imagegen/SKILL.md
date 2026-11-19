---
name: Image Generation
description: Generate a new image or edit an existing image from a text prompt. Use for illustrations, photos, textures, mockups, visual variants, and reference-image transformations that should produce a bitmap artifact.
icon: https://static.asidehq.com/apps/builtin-skills/image-generation.jpg
autoInject:
  keywords: ["generate an image", "create an image", "make an image", "edit this image", "image generation", "imagegen"]
---
# Image Generation

Use `imagegen.generate({ prompt, inputImages? })` in the REPL. Generate directly unless a required reference image is missing.

## Transparent background rule (HARD, ZERO-REMOVAL, for logos/icons/UI assets)

When the deliverable is a logo, lockup, icon, or any UI asset requiring a **transparent background**, the generation prompt MUST explicitly demand a **direct true transparent (alpha) background** in the initial generation call.
- **NEVER generate on a solid background (white, black, grey, or flat color) with the intention of stripping it later.**
- **NEVER use ChatGPT's built-in "Remove background" feature or code actions (`Run code`).** ChatGPT background removal uses destructive Python thresholding that eats into white/light parts of the artwork (punching black holes through glass, charred edges on white surfaces, ragged halos) and completely ruins the assets.
- **Zero Fallback to Removal:** If a model returns a solid background, NEVER fall back to background removal. REGENERATE immediately with an uncompromising direct-transparency prompt. Post-hoc background removal is strictly forbidden.
- **Mandatory Prompt Syntax:** Explicitly include: `"Rendered directly on a pure transparent background, true alpha channel PNG, isolated floating objects, no solid background, no white backdrop, no floor plane, no ground shadows"`.
- **Avoid Array:** Must include: `["white background", "solid background", "backdrop", "floor plane", "ground shadow", "checkerboard pattern", "fake transparency"]`.

Pass reference images as task file paths, data URLs, or `{ data, mimeType }` objects. The result contains full-resolution artifact paths and image data. Display every returned image so the user can preview it.

```js
const generated1 = await imagegen.generate({ prompt: 'A red circle on a plain white background' });
for (const image1 of generated1.images) display(image1.data);
console.log(generated1.images.map((image1) => image1.path));
```

For edits, describe the complete desired result and pass the source image:

```js
const edited1 = await imagegen.generate({
  prompt: 'Keep the composition and replace the daytime sky with a starry night sky',
  inputImages: ['/absolute/session/attachments/source.png'],
});
for (const image2 of edited1.images) display(image2.data);
console.log(edited1.images.map((image2) => image2.path));
```

Do not add provider-specific size, quality, or billing options. If generation fails, report the exact concise error and do not retry unless the error explicitly says retrying may help. Treat refusals and policy errors as final; do not bypass them with manual compositing. Point the user to Settings > Models only when the error indicates provider setup is required.

**Never reject or regenerate a generated image just because it looks dark/black in the viewer.** A transparent PNG shows the viewer's background through its alpha channel. A "solid black" appearance in a preview is almost always the viewer compositing transparent pixels, not a baked background. **Check the actual alpha channel** (sample corner/edge pixel A values) before concluding the background is opaque. Only regenerate if A=255 at the edges. **Never hand-draw an SVG or CSS shape to replace a generated transparent asset** — if the alpha is correct, use the file as-is.