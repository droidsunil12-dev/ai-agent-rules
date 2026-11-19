---
name: "animista-ui-motion"
description: "Use when creating, implementing, improving, or redesigning any website or mobile app UI, or adding, refining, or fixing UI animations in an existing project. Use https://animista.net/ as the primary source for purposeful motion (or https://uiverse.io/ for button/UI snippets; verify the chosen snippet’s license), adapting animations to the project's web or native stack with accessible, responsive, performant behavior."
autoInject:
  keywords: ["animation", "animations", "animista", "ui motion", "css animation", "animate", "microinteraction", "page transition", "hover effect", "entrance animation"]
---

# Animista UI Motion

## Core rules

- Use https://animista.net/ for animation selection whenever building or improving UI. Include a deliberate motion pass in new UI work, not only when animation is explicitly requested.
- **uiverse.io as a second source:** for ready-to-drop button/card/loader/badge/toggle/hover snippets, use https://uiverse.io/ (verify the selected snippet’s actual license and preserve required notices). Adapt each snippet to the project's token palette + framework; keep it performant and respect `prefers-reduced-motion`.
- Add motion where it communicates interaction, hierarchy, navigation, state changes, or feedback. Do not animate every element or force decorative effects into static or motion-free designs. Explicit project requirements take precedence.
- Preserve the existing visual language, component architecture, animation tools, and design tokens. Coordinate with any applicable UI design skill; this skill governs motion rather than replacing the design workflow. On Type A, follow AGENTS.md §0.0: motion is part of the final QA pass, not permission to write early.
- Animista produces CSS animation classes and keyframes, not a native-app SDK. Use its generated CSS directly for web UI; translate its verified motion into the existing native animation system for native apps.

## 1. Inspect and plan

1. Inspect the relevant UI, project files, framework, styling approach, existing transitions, supported platforms, and available tests. Do not assume a CSS-capable runtime.
2. Identify the few states that benefit from animation: button press, menu/modal entry and exit, card appearance, tab changes, validation, loading, or success feedback.
3. Define each animation's target, trigger, starting and final state, replay policy, duration, easing, and reduced-motion behavior. Keep focus management, semantics, and business logic independent of animation.
4. Reuse project motion tokens. If none exist, start with 100–180 ms for micro-feedback, 180–300 ms for small transitions, and 250–450 ms for larger entrances. These are design starting points, not Animista defaults. Tune for context and device size.
5. Prefer short, subtle displacement and opacity/scale changes. Avoid long delays on actions, large viewport travel on phones, constant bouncing, and unnecessary background loops.

## 2. Select and retrieve from Animista

1. Check open browser tabs for Animista and reuse a relevant tab. Otherwise open https://animista.net/ in a background tab.
2. Read the library with snapshots and use its current UI. The library exposes basic, entrances, exits, text, attention, and background categories. Choose a category and preview a specific variant appropriate to the interaction.
3. Adjust duration, timing-function, delay, iteration-count, direction, and fill-mode. Use the preview object closest to the target and replay to inspect the motion. A library demonstration is not proof the effect fits the actual UI.
4. Use **Generate code** and retrieve BOTH the class declaration and its corresponding keyframes. Copy or download only the animations needed; do not import the whole library or embed the Animista website in the product.
5. Snapshot after actions and retrieve the generated text from the inspected code fields. Do not invent controls, selectors, deep links, animation names, or claim to have sourced code you did not inspect.
6. Record the chosen variant, actual source URL, and any modifications in a concise source comment or existing project documentation. Distinguish unchanged generated code, adapted Animista motion, and original fallback motion.
7. Preserve the generated attribution header. Inspect https://animista.net/license and retain the required copyright notice, conditions, and disclaimer in source distributions; include them in documentation or other distribution materials for binary builds. A source URL alone is not a substitute for required license notices.
8. If the site or export is unavailable, try another available retrieval path. If still blocked, state the limitation. Only use previously verified project Animista code with clear provenance or label a minimal original fallback honestly; do not silently substitute another library.

## 3. Integrate in the project's stack

### Web, responsive web, and CSS-capable hybrid apps

- Store selected keyframes and reusable motion classes/tokens in the existing style structure. Namespace names where necessary and keep class/keyframe references consistent. Use the build's prefixing strategy rather than duplicating redundant prefixed output.
- Connect animations to actual component state, not arbitrary timers. Entry should play when the element appears; hover should not be required for touch interactions; press/focus feedback should remain available to keyboard and touch users.
- Keep content visible and usable without JavaScript or animation. Never rely on an entrance animation to reveal permanently hidden content. Server-rendered UI must remain readable if hydration fails.
- Support exit transitions with the framework's existing presence/lifecycle mechanism. Prevent stale callbacks, duplicate replay, and races from rapid open/close actions. Remove closed UI from focus and hit testing promptly, and unmount it when appropriate.
- Reuse the existing animation library only if it materially helps lifecycle or gestures. Do not install a heavy dependency for a simple CSS effect or let CSS and another animation engine compete for the same property.
- Inspect transform ownership. Use a wrapper or compose transforms if the component already uses transform for layout, gestures, or positioning. Fill-mode must not leave stale transforms or invisible/focusable elements behind.

### Native mobile apps

- Translate the selected Animista variant's keyframe offsets, opacity, translation, scale, rotation, transform origin, easing, and duration into the project's established API, such as React Native Animated/Reanimated, Flutter, SwiftUI/UIKit, or Android Compose.
- Convert CSS units and transform ordering deliberately; native transform-origin, perspective, filters, and cubic-bezier support differ. If an effect cannot be reproduced safely, select a simpler Animista variant and explain the adaptation.
- Use the existing UI-thread/native-driver path where supported. Do not paste CSS into a non-CSS runtime, add a WebView just for animation, or claim an exact native reproduction without testing.
- Respect system reduced-motion settings and app lifecycle. Stop or cancel unnecessary animation when a view disappears or the app enters the background. Keep navigation, gestures, and focus behavior consistent with platform conventions.

## 4. Accessibility and performance

- Implement `prefers-reduced-motion: reduce` on web and the platform equivalent on native. Disable nonessential spatial movement and provide an immediate, correct final state. Keep necessary state feedback legible and avoid flashing effects.
- Scope reduced-motion styles to the new motion layer instead of overriding every animation in the application. Explicitly restore opacity or other hidden states when disabling keyframes requires it.
- Do not depend exclusively on `animationend` or a fixed delay for focus, cleanup, navigation, or business logic. Reduced motion, cancellation, and zero-duration paths must complete correctly too.
- Prefer transform and opacity. Avoid repeated layout animation of width, height, top, or left. Treat large blur, shadow, filter, and full-screen effects as expensive; test or replace them for mobile.
- Add `will-change` only when justified and release it after the interaction. Avoid permanent layers on many elements, unbounded stagger delays, and infinite decorative animation.
- Preserve visible focus indicators, readable text, input responsiveness, touch targets, and scroll behavior. Motion must not shift actionable controls unexpectedly or block immediate interaction.

## 5. Verify and deliver

1. Run the project's available build, lint, and relevant tests. Check both the start and final states, repeated activation, cancellation, rapid state changes, and entry/exit cleanup.
2. Inspect the actual UI at representative desktop and mobile sizes where applicable. Test keyboard focus, touch-style interactions, overflow, reduced motion, and slower devices when tools permit. For native apps, use the available emulator/device or explicitly mark runtime verification as blocked.
3. Confirm that no layout jump, invisible content, transform collision, lingering overlay, or unnecessary dependency was introduced. Verify notices for redistributed Animista code are retained.
4. Capture visual proof from the implemented UI when browser verification is possible. A still screenshot proves appearance, not animation timing; report motion behavior only to the extent actually tested.
5. Summarize the changed components, selected Animista variants and source, accessibility safeguards, and verification performed. Clearly identify any fallback, native adaptation, or unverified behavior.
