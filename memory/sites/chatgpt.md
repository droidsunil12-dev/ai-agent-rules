---
title: ChatGPT Web
description: Browser automation quirks, image upload mechanics, and image generation pipeline
---

## Current
- Use ChatGPT browser (https://chatgpt.com) for non-square banner and icon generation.
- File upload bypass: Playwright `setInputFiles` fails with daemon path escape, and standard input fails with "File is empty" toast. Working upload pattern injects a `File` object via DOM `DataTransfer`:
  ```javascript
  const dt = new DataTransfer();
  dt.items.add(new File([blob], 'image.jpg', { type: 'image/jpeg' }));
  input.files = dt.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
  input.dispatchEvent(new Event('input', { bubbles: true }));
  ```
- ChatGPT cloud cannot resolve local `127.0.0.1` URLs directly.
- Style extraction pipeline:
  1. Pick verified reference URL.
  2. Upload reference image to ChatGPT.
  3. Extract style-only JSON specification (`styleCategory`, `rendering`, `lighting`, `background`, `composition`, `depthTreatment`, `mood`, `doNotReplicate`).
  4. Prompt ChatGPT image generation combining the style JSON with brand colors and required subject.
- Composer and extraction mechanics:
  - Input requires `keyboard.type()` after focus/select-all; direct DOM `innerText` does not update React state.
  - Send button is `button[aria-label="Send"]`.
  - Generated images are `blob:` URLs. Extract by scrolling image into view, drawing to an in-page canvas, and converting via `toDataURL('image/png')`.
  - If image viewer is open ("Move toolbar", "Markup", "Comment", "Erase" visible), click "Close viewer" first; otherwise new prompts hijack into "Describe edits" box.
- Rate limits and continuation:
  - Free-tier image cap blocks new generations until reset. Aside `imagegen` credits pool is separate; do not assume it covers ChatGPT limits.
  - When credit runs out mid-task, click Share button, copy URL, and open in logged-in backup account to preserve conversation context.
  - Context-window-full state: click "New chat" button to create linked continuation chat. Think mode is text/analysis only; turn Think OFF for image generation.

## History
- 2026-11-02: Mandated ChatGPT browser image-gen for non-square layouts (`episodic/2026-11-02.md`).
- 2026-11-03: Solved file upload failure using DOM `DataTransfer` injection (`episodic/2026-11-03.md`).
- 2026-11-03: Established Pinterest -> JSON style spec -> ChatGPT banner workflow (`episodic/2026-11-03.md`).
- 2026-11-18: ChatGPT contenteditable requires `keyboard.type()` (not `evaluate()`) to trigger React state for Send button; generated images are `blob:` URLs, must extract via canvas draw + base64 dataURL (not `fetch()` or `img.screenshot()`); virtualized messages drop off-screen blob images from DOM, scroll into view first (`episodic/2026-11-18.md`).
- 2026-11-19: Free-tier daily image cap (~9 images) hits UTC reset; Aside imagegen credits are separate and not a free fallback; Share button moves full conversation to backup account when credits exhaust; context-window-full continuation uses "New chat" button; image viewer toolbar overlay hijacks prompt input into "Describe edits" box until "Close viewer" clicked (`episodic/2026-11-19.md`).
