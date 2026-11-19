# Mobile App UI Mockup Ratio Rule

## 9:16 Portrait Requirement

All generated mobile app UI screen mockups MUST be exactly 9:16 portrait aspect ratio:
- **1080×1920** pixels (or equivalent 9:16 ratio)
- No stretching, bars, bezel padding, or squashing to force the ratio
- Check actual pixel dimensions BEFORE accepting a mockup

## Verification

Use this check after downloading any mockup:

```javascript
// Verify 9:16 ratio
const buf = await fs.readFile('path/to/mockup.png');
// Parse PNG dimensions from header
// Bytes 16-19: width (big-endian)
// Bytes 20-23: height (big-endian)
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
const ratio = width / height;
// 9:16 = 0.5625
const is9x16 = Math.abs(ratio - 0.5625) < 0.01;
console.log(`Mockup: ${width}x${height}, ratio=${ratio.toFixed(3)}, 9:16=${is9x16}`);
```

## Regeneration Rule

If a mockup does NOT match 9:16:
1. **Preserve the mismatched file** as a draft (rename to `*-draft.png` or move to `drafts/` folder)
2. **Regenerate** with explicit size instruction: "Generate at exactly 1080×1920 pixels, 9:16 portrait ratio"
3. **Verify** the new file matches 9:16 before proceeding

## ChatGPT Prompt Addition

When sending screen prompts to ChatGPT, ALWAYS include:

```
Generate the screen mockup at exactly 1080×1920 pixels (9:16 portrait ratio).
No bars, no bezel padding, no squashing. The canvas must be exactly 1080 wide and 1920 tall.
```

## Known Issue: ChatGPT Ignores 1080×1920

ChatGPT's image generator outputs at 1024×1536 (2:3 ratio) even when explicitly requested at 1080×1920. The 2:3 ratio is NOT the same as 9:16.

**Workaround:** Resize post-generation using canvas:

```javascript
// Resize PNG to 1080x1920 using canvas in browser
const img = new Image();
img.src = dataUrl;
const canvas = document.createElement('canvas');
canvas.width = 1080;
canvas.height = 1920;
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0, 1080, 1920);
const resizedDataUrl = canvas.toDataURL('image/png');
```

**OR** accept 1024×1536 as the closest available size and document the limitation. Visual quality is fine; only the aspect ratio differs.

## Affected Files (Kinepay B2B)

All 15 screen mockups in `research/screens/` are 1024×1536 (2:3). Preserved as drafts in `research/screens/drafts/`.

## Preflight Check

The `type-a-preflight.cjs` should verify mockup dimensions:

```javascript
// In preflight, after reading the mockup file:
const dims = getPNGDimensions(mockupPath);
if (Math.abs(dims.width / dims.height - 9/16) > 0.05) {
  block(`Mockup ${mockupPath} is ${dims.width}x${dims.height}, not 9:16. Regenerate at 1080x1920 or resize.`);
}
```
