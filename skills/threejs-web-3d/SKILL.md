---
name: "threejs-web-3d"
description: "Use when adding 3D elements to a website or web app, or building scroll-linked or mouse/pointer-driven animations on 3D objects, using Three.js from threejs.org."
autoInject:
  keywords: ["three.js", "threejs", "webgl", "3d web", "3d canvas", "3d animation", "interactive 3d", "3d scene", "gltf", "3d model"]
---

# Three.js Web 3D

Build 3D elements for websites and web apps with Three.js, driven by scroll position or mouse/pointer movement. Ground everything in the official resources below rather than inventing API calls or example URLs.

## Source entry points (verify before relying on them)

- Home / current version: https://threejs.org/ (version badge, e.g. r187). Confirm the current release and check the latest npm version at https://www.npmjs.com/package/three before pinning a CDN version.
- Manual (guides): https://threejs.org/manual/ — read the specific page you need instead of guessing. High-value pages:
  - Installation: https://threejs.org/manual/pages/installation.html
  - Creating a Scene: https://threejs.org/manual/pages/creating-a-scene.html
  - Picking objects with the mouse: https://threejs.org/manual/pages/picking.html
  - Responsive Design: https://threejs.org/manual/pages/responsive.html
  - Rendering On Demand: https://threejs.org/manual/pages/rendering-on-demand.html
  - How to Update Things / How to Dispose of Objects: https://threejs.org/manual/pages/how-to-update-things.html and .../how-to-dispose-of-objects.html
  - Post Processing: https://threejs.org/manual/pages/post-processing.html
- Examples gallery (reference patterns by category): https://threejs.org/examples/ — `webgl`, `webgl / postprocessing`, `webgl / advanced`, `webgpu`, `css3d`, and more. Open the category that matches the effect and read that example's source.
- API docs: https://threejs.org/docs/ (Core, Lights, Cameras, Materials, Textures, Geometries, etc.).
- Repo: https://github.com/mrdoob/three.js/.

If a URL 404s or an addon name looks off, re-read the live manual/examples page in a browser tab before coding; do not cite a path you have not checked.

## 1. Set up the project

Choose the setup that matches the existing project; do not force a build tool where the site is static, or vice versa.

- **With a build tool (recommended for anything with deps):** install `three` (and optionally `vite`) in the project, import `import * as THREE from 'three';` and use `three/addons/...` for controls/loaders/postprocessing. Follow the project's existing build system.
- **Static / no build tool:** use an import map that maps `three` to a pinned CDN build and `three/addons/` to the matching `examples/jsm/` path, then import the same way. Pin one version and import all addons from that same version/CDN. Serve the page over http (not file://) so module and texture loads work.
- Match the addon import style to whichever setup the manual's Installation page shows for the current version; addon paths move between releases.

Do not duplicate Three.js across sources in one page.

## 2. Build the 3D element

Use the working starter in `<accountRoot>/skills/user/threejs-web-3d/references/starter.js` as the scaffold and adapt it. Core responsibilities:

- Renderer: correct pixel-ratio cap, antialias, and `alpha: true` when the canvas sits over HTML content. Make the canvas the element you animate, or a transparent background layer behind the DOM.
- Scene + camera sized to the element, not the whole window, when the 3D is one panel.
- Lights and materials matched to the existing site palette; a 3D hero usually wants a subtle neutral look, not a demo-scene default.
- A single `requestAnimationFrame` loop (or the on-demand render pattern from the manual when the scene is idle).
- A resize handler that updates camera aspect and renderer size for the element's container.

For models/textures, load from the project's real assets. Use `GLTFLoader` (and Draco/KTX2 where assets provide them) via `three/addons/loaders/`. See "Loading 3D Models" in the manual.

## 3. Scroll-linked animation

The core technique: read the scroll position (or a section's progress through the viewport) and map it to object/camera transforms instead of animating on a timer.

- Compute a normalized progress value (0–1) for the element or section, then lerp between defined keyframe states (positions, rotations, scales, camera look-at). See `references/starter.js` for the progress + lerp pattern.
- For richer easing or scrubbing, use the project's existing animation library (e.g. GSAP `ScrollTrigger`) if it is already a dependency; otherwise keep it to native `scroll`/`IntersectionObserver` + lerp to avoid adding a heavy dep for one effect.
- Reuse the manual's "How to Update Things" and "Matrix Transformations" for the transform math.

## 4. Mouse / pointer effects

- **Parallax / mouse-follow:** normalize pointer position to -1..1, lerp it into camera or group offsets so motion feels smooth, and disable it on touch devices.
- **Hover / picking on 3D objects:** raycast from the pointer against the scene and toggle a highlighted state on the hit object. Follow the manual's "Picking Objects with the mouse" and the `interactive / raycasting` examples.
- Keep pointer listeners passive where possible and throttle the raycast to the render loop (raycast once per frame against the latest pointer value, not on every `mousemove`).

## 5. Performance, resize, and cleanup

- Cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- Pause rendering when the element is off-screen (`IntersectionObserver`) and when the tab is hidden; resume on re-entry.
- Dispose geometry, materials, textures, and the renderer on teardown (manual "How to Dispose of Objects" / "Freeing Resources").
- Prefer instancing and merged geometry for many repeated objects (manual "Optimizing Lots of Objects"); avoid a postprocessing chain unless it is essential (bloom, etc., per the examples).

## 6. Accessibility and fallback

- Respect `prefers-reduced-motion`: when set, stop or greatly reduce scroll/mouse motion and show a static final pose of the object.
- Provide a no-JS / WebGL-unavailable fallback: a static image or a neutral background so the section still reads. Three.js should enhance, not gate, the content.
- Keep the 3D panel from shifting layout: reserve its space with a fixed aspect or min-height, and let the canvas fill that box.
- Do not make essential information live only inside the 3D scene.

## 7. Coordinate with other skills

- For the surrounding page composition, hierarchy, and art direction, use `taste-ui-design`.
- For site-wide smooth scrolling, viewport detection, and parallax, use `locomotive-smooth-scroll`. Sync the Three.js render loop with Locomotive's `lenisInstance.on('scroll', ...)` so 3D objects and DOM elements stay in sync without jitter.
- For non-3D UI transitions/entrances that wrap the 3D element, use `animista-ui-motion`; keep Three.js motion confined to the 3D objects themselves.
- If the task is only static brand artwork or icons, route to `website-banner-studio` / `icon-set-production` instead — do not reach for WebGL.

## 8. Verify and deliver

- Run the project's build/dev server and open the page; check the 3D renders, resizing, scroll scrubbing at 0/50/100%, and pointer hover.
- Test reduced-motion and a mobile viewport; confirm the fallback renders when WebGL/JS is unavailable.
- Screenshot the rendered 3D state at a couple of scroll positions and attach it as proof.
- Report the Three.js version used, the setup (npm vs CDN), which addons were imported, and any motion/fallback limitations. Do not claim a version or addon that was not actually used.
