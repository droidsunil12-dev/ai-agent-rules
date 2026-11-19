---
name: "locomotive-smooth-scroll"
description: "Use when creating or adding the Locomotive-style smooth scrolling experience throughout a website, including Lenis-powered inertia scrolling, declarative parallax (data-scroll-speed), in-view reveals, and scroll progress tracking, based on Locomotive Scroll v5 and https://locomotive.ca/."
autoInject:
  keywords: ["smooth scroll", "locomotive scroll", "lenis", "parallax", "scroll animation", "inertia scroll", "data-scroll", "smooth scrolling"]
---

# Locomotive Smooth Scroll

Implement the exact smooth scrolling experience seen on https://locomotive.ca/en and https://scroll.locomotive.ca/. The underlying engine is **Locomotive Scroll v5**, which wraps **Lenis** with declarative HTML attributes (`data-scroll-*`) for in-view detection, parallax speeds, and CSS scroll progress.

## Grounded source entry points

- Locomotive website: https://locomotive.ca/ (live production showcase)
- Locomotive Scroll docs: https://scroll.locomotive.ca/docs
- Landing & demo: https://scroll.locomotive.ca/
- GitHub repository: https://github.com/locomotivemtl/locomotive-scroll
- NPM package: `locomotive-scroll` (v5+), core engine dependency `lenis`
- Options documentation: https://scroll.locomotive.ca/docs/documentation/options
- Attributes documentation: https://scroll.locomotive.ca/docs/documentation/attributes
- Methods documentation: https://scroll.locomotive.ca/docs/documentation/methods

## Why this exact feel works

1. **Native scrollbar retained:** Uses window scrolling rather than hijacking the viewport with a fixed wrapper. Native browser accessibility, keyboard navigation, and scrollbars remain intact.
2. **Exponential easing with lerp:** Defaults to `lerp: 0.1`, `duration: 1.2`, and exponential ease `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
3. **Desktop smooth wheel / Native touch:** `smoothWheel: true`, `smoothTouch: false`. Touch devices keep native inertia by default for zero touch latency and native feel.
4. **Declarative markup:** Parallax, in-view triggers, and progress variables are set directly on DOM elements via HTML data attributes.

## 1. Installation and setup

Choose the approach that fits the project:

### Option A: Bundler / NPM (recommended)
```bash
npm install locomotive-scroll
```

In the main stylesheet:
```css
@import 'locomotive-scroll/dist/locomotive-scroll.css';
```
*(Or import from `node_modules/locomotive-scroll/dist/locomotive-scroll.css`)*

In JavaScript:
```javascript
import LocomotiveScroll from 'locomotive-scroll';

const locomotiveScroll = new LocomotiveScroll();
```

### Option B: CDN / No bundler
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll/bundled/locomotive-scroll.css">
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll/bundled/locomotive-scroll.min.js"></script>
<script>
  const locomotiveScroll = new LocomotiveScroll();
</script>
```

## 2. Essential CSS configuration

Locomotive Scroll v5 requires basic setup styles to prevent layout glitches and ensure sticky positioning works:

```css
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-scroll] {
  will-change: transform;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
```

## 3. Declarative HTML attributes reference

Locomotive Scroll scans for these attributes automatically:

| Attribute | Value / Example | Behavior |
|---|---|---|
| `data-scroll` | *(empty)* | Enables viewport detection on the element. |
| `data-scroll-class` | `"is-inview"` (default) or custom | CSS class added when element enters the viewport. |
| `data-scroll-offset` | `"100, 50%"` or `"25%, 15%"` | Trigger offsets `[enter, leave]`. Px or percentage of viewport height. |
| `data-scroll-position` | `"start, end"` (default) | Trigger positions: `'start'`, `'middle'`, `'end'`. |
| `data-scroll-repeat` | *(empty)* | Re-triggers in-view class and calls on every enter/leave (otherwise fires once). |
| `data-scroll-speed` | `"0.2"`, `"-0.3"`, `"1"` | Relative parallax displacement. Positive moves faster than scroll, negative moves slower/reversed. Start with subtle values `0.1`–`0.5`. |
| `data-scroll-enable-touch-speed` | *(empty)* | Enables parallax on touch devices (disabled by default for performance). |
| `data-scroll-css-progress` | *(empty)* | Injects a `--progress` CSS variable (value `0` to `1`) on the element while in view. |
| `data-scroll-event-progress` | `"myProgressEvent"` | Fires custom window event with `e.detail = { target, progress }`. |
| `data-scroll-call` | `"myCallEvent"` | Fires custom window event on enter/leave: `e.detail = { target, way, from }`. |
| `data-scroll-to` | *(empty)* | Intercepts click on anchor/button to smoothly scroll to target ID/href. |
| `data-scroll-to-offset` | `"-100"` | Vertical offset in px from target element top. |
| `data-scroll-to-duration` | `"1.5"` | Smooth scroll duration in seconds. |
| `data-scroll-ignore-fold` | *(empty)* | Prevents in-fold offset adjustment for elements visible on initial page load. |

## 4. Customizing scroll physics (Lenis options)

Pass `lenisOptions` to match the exact weight and responsiveness:

```javascript
const locomotiveScroll = new LocomotiveScroll({
  lenisOptions: {
    wrapper: window,
    content: document.documentElement,
    lerp: 0.1,                                         // 0.05 = heavier/floatier, 0.15 = snappier
    duration: 1.2,                                     // scroll duration
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,                                // keep native swipe on mobile
    wheelMultiplier: 1,
    touchMultiplier: 2,
    normalizeWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // signature Locomotive exponential ease
  },
  triggerRootMargin: '-1px -1px -1px -1px',
  rafRootMargin: '0px 0px 0px 0px',
  autoResize: true,
  autoStart: true,
});
```

To sync with an external animation loop (e.g. GSAP or Three.js), see `references/starter.js`.

## 5. In-view animations with CSS and data-scroll-css-progress

### A. Fade/Slide in on view
```html
<div class="reveal-card" data-scroll data-scroll-offset="15%">
  Content here
</div>
```
```css
.reveal-card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.2, 0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
}
.reveal-card.is-inview {
  opacity: 1;
  transform: translateY(0);
}
```

### B. Scrubbing transforms via CSS variable
```html
<div class="scale-box" data-scroll data-scroll-css-progress>
  Zooming content
</div>
```
```css
.scale-box {
  /* --progress ranges from 0 (entering) to 1 (leaving) */
  transform: scale(calc(0.85 + (var(--progress, 0) * 0.15)));
  opacity: calc(0.3 + (var(--progress, 0) * 0.7));
}
```

## 6. Dynamic DOM updates, SPA routing & cleanup

When adding/removing content via AJAX, router transitions (Next.js, Nuxt, Barba.js), or modal openings:

```javascript
// After DOM changes:
locomotiveScroll.resize();

// Or targeted container update:
locomotiveScroll.addScrollElements(newSectionElement);
locomotiveScroll.removeScrollElements(oldSectionElement);

// When unmounting a component / page teardown:
locomotiveScroll.destroy();
```

## 7. Accessibility and reduced-motion requirements

Always honor users' motion preferences:

```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let locomotiveScroll = null;
if (!prefersReduced) {
  locomotiveScroll = new LocomotiveScroll();
} else {
  // Ensure native scrolling with zero lerp and no parallax transform
  document.documentElement.style.scrollBehavior = 'auto';
}
```

In CSS:
```css
@media (prefers-reduced-motion: reduce) {
  [data-scroll] {
    transform: none !important;
    opacity: 1 !important;
    transition: none !important;
  }
}
```

## 8. Coordination with other skills

- **`taste-ui-design`:** Use for the overarching visual direction, typography scale, spacing system, and layout composition.
- **`threejs-web-3d`:** When combining 3D WebGL scenes with smooth scrolling, bind the Three.js render loop to Lenis scroll events via `locomotiveScroll.lenisInstance.on('scroll', ({ scroll, progress }) => { ... })` so 3D objects and HTML elements stay in perfect pixel synchronization without tearing.
- **`animista-ui-motion`:** Use Animista keyframes for CSS entrance animations triggered when Locomotive adds `.is-inview`.
- **`website-banner-studio` / `icon-set-production`:** Route banner/icon graphic creation to their respective skills; Locomotive handles only the scrolling runtime and parallax.

## 9. Verification checklist

1. Run the dev server and test scrolling in desktop browser with mouse wheel. Confirm smooth inertia, absence of jitter, and that scrollbar remains visible and functional.
2. Verify touch scroll on a mobile viewport; confirm native inertia is preserved without sticky lag.
3. Check `position: sticky` headers or sidebars; verify they lock properly without jumpiness.
4. Toggle `prefers-reduced-motion: reduce` in browser rendering emulation; confirm all parallax and inertia stops cleanly.
5. Check browser console for zero errors and confirm memory cleanup on `destroy()`.
