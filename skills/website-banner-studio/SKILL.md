---
name: website-banner-studio
description: Create cohesive branded website hero banners and header creatives using the Pinterest & YouMind inspiration -> JSON style extraction -> customized brand JSON -> ChatGPT browser generation pipeline. Mandates light pastel or custom palettes, native wide aspect ratio, zero baked text/buttons, and zero square-tool fallback.
autoInject:
  keywords: ["banner", "banners", "hero banner", "website banner", "hero image", "banner set", "campaign banner", "promotional banner", "banner design", "hero section", "make a banner", "make banners", "website creative", "hero visual", "header banner"]
---

# Website Banner Studio

Create cohesive, high-end website hero banners and creatives inspired by elite modern web design (Pinterest, YouMind) using this mandatory 6-step pipeline.

## Core Directives

- **ONLY use this pipeline for banner/hero creatives.** No ad-hoc prompt guessing.
- **NEVER use `imagegen.generate` for banners.** That tool is square-only (1024×1024) and causes severe crop/seam damage on wide hero containers.
- **NEVER search specific physical objects** ("coin", "wallet", "credit card", "bank", "piggy bank", "photoshoot"). Narrow queries return cliché stock photos and cluttered junk.
- **Search broad, aesthetic design queries** on Pinterest (`in.pinterest.com`) and YouMind (`youmind.com`):
  - `website hero banner`
  - `fintech hero banner`
  - `saas hero banner 3d`
  - `landing page banner 3d`
  Fewer keywords = more elite design results.
- **Zero baked text, zero baked buttons.** The generated banner must be 100% clean visual background art. Never let AI render typography, copy, badges, or buttons into the image. HTML/CSS or local Canvas compositing handles text so it stays crisp, scalable, and editable.
- **Default to Light Pastel & Airy Theme** unless dark mode is explicitly commanded. Soft ivory/mint/sky backgrounds with soft studio lighting and delicate pastel shadows read clean and premium.

---

## The Mandatory 6-Step Banner Pipeline

### Step 1: Find Real Banner Inspiration (Pinterest & YouMind)
1. Open Pinterest (`in.pinterest.com`) or YouMind (`youmind.com`) in the logged-in browser.
2. Search broad design terms with minimal keywords (`website hero banner`, `fintech hero banner`, etc.).
3. Select an authentic, modern website hero banner layout:
   - True wide landscape format (16:9, 2.5:1, or ~2.76:1).
   - Premium 3D sculptural or architectural form (organic ribbon, frosted glass structure, dynamic wave, minimal portal).
   - Raking studio key light, soft diffused cast shadows, subtle floor/grid texture.
   - Asymmetrical layout with **40–50% completely clean negative space** on one side reserved for copy and CTA.
4. Download or fetch the full-res reference image.

### Step 2: Attach Reference to ChatGPT Browser
1. Open `https://chatgpt.com/` in the browser tab.
2. Inject the reference image bytes directly into ChatGPT's file input using DOM `DataTransfer` (avoids sandbox file-path boundaries):
   ```javascript
   const dt = new DataTransfer();
   dt.items.add(new File([blob], 'inspiration-banner.jpg', { type: 'image/jpeg' }));
   const input = document.querySelector('input[type="file"][accept*="image"]');
   input.files = dt.files;
   input.dispatchEvent(new Event('change', { bubbles: true }));
   input.dispatchEvent(new Event('input', { bubbles: true }));
   ```
3. Verify the file attachment pill appears in the composer.

### Step 3: Extract Visual Design Style into JSON
Prompt ChatGPT to analyze the attached image and extract ONLY the visual style into a structured JSON object. Exclude company logos, text, and specific brand colors:

```json
{
  "styleCategory": "short name for aesthetic (e.g. Premium Minimalist 3D Sculptural Hero)",
  "composition": {
    "aspectRatio": "e.g. ultra-wide landscape ~2.5:1 to 2.76:1",
    "focalSubjectPlacement": "where hero 3D form flows and anchors",
    "negativeSpaceStrategy": "exact region reserved clean for headline/CTA",
    "visualBalance": "asymmetrical weight distribution"
  },
  "threeDimensionalElements": {
    "primaryForm": "sculptural shape, curve, or architectural track",
    "secondaryAccent": "small single accent or focal token nestled in the form",
    "materials": "frosted glass, dark titanium, satin ceramic, brushed gold",
    "shadowAndDepth": "cast shadows, contact shadows, ambient occlusion"
  },
  "lightingAndAtmosphere": {
    "lightSource": "direction, softness, and temperature of studio light",
    "highlights": "specular reflections and rim lighting details",
    "shadows": "softness and falloff"
  },
  "backgroundAndFloor": {
    "surface": "matte architectural floor, perspective grid, subtle grain",
    "colorPalette": "ambient tone and light gradients"
  },
  "moodAndTone": ["3-5 design adjectives"],
  "doNotReplicate": [
    "Specific company branding or logos",
    "Specific body copy or headline text",
    "Exact proprietary accent design"
  ]
}
```

### Step 4: Customize the JSON for Target Brand Creative
Adapt the extracted JSON to the target product/website:
1. **Palette**: Apply target site's actual brand colors in light pastel tones (e.g. soft warm ivory `#F8FAFC`, pale mint-teal `#CCFBF1`, soft sky blue `#E0F2FE`, champagne gold accent) unless dark theme is explicitly requested.
2. **Subject**: Adapt primary form and single secondary accent to the brand topic (e.g. a single gold ₹ reward coin nestled along an S-curved frosted glass ribbon).
3. **Aspect Ratio & Negative Space**: Explicitly require ultra-wide landscape (2.76:1) and declare the entire left 40–50% empty negative space for text overlay.
4. **Strict Exclusions**: 
   - ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO NUMBERS.
   - ABSOLUTELY NO BUTTONS, NO BADGES, NO CTA PILLS, NO ICONS.
   - Pure visual 3D artwork only.
   - No cards, no credit cards, no bank logos, no coin piles, no clutter.

### Step 5: Generate via ChatGPT Browser
1. Send the customized JSON prompt in the same thread. If asked about logos or text, reply: *"No logo, no text, no buttons. Completely text-free, button-free pure 3D visual. Please generate now."*
2. Wait for image completion, locate the full-res blob (`img` with `naturalWidth > 1500`, e.g. 2081×756), fetch its `arrayBuffer`, and save as high-res PNG.
3. Inspect at 1:1 scale to verify:
   - Native wide aspect ratio (no letterbox/seams).
   - Clear negative space on text side.
   - High-fidelity lighting and materials matching inspiration style.
   - Zero text and zero buttons baked in.

### Step 6: Text & CTA in Website Code
- Never bake text or buttons into the background image.
- Place headline, supporting copy, and CTA buttons directly in HTML/CSS over the banner's reserved negative space.
- Typography stays crisp, perfectly aligned, editable, and accessible.

---

## Emergency Route B (Browser Route Blocked)
If ChatGPT is not logged in or inaccessible:
- Stop and report the blocker immediately.
- Do NOT silently generate square 1024×1024 images via `imagegen` as a fallback.

