---
name: "react-bits"
description: "Use when adding prebuilt animated React components, text animations, or animated backgrounds to a frontend project. Pull free source from React Bits (reactbits.dev) — 110+ components with minimal dependencies. Pick a component, copy its source (JS or TS, plain CSS or Tailwind), add the small deps it needs, and customize via props instead of assembling an average hero."
---

# React Bits (animated components)

React Bits is a large library of animated React components and backgrounds (text-animations, animations, components, backgrounds) that install as **source you own** — copy-paste, then tune. Great for hero backgrounds, micro-interactions, and stand-out UI without a heavy runtime dependency.

## Where to get a component
- Browse + live-preview + copy source: https://www.reactbits.dev (categories: text-animations, animations, components, backgrounds).
- Local vendored source: `<accountRoot>/skill-repos/react-bits` (search `src/` for the component).
- CLI/registry install: the repo ships a jsregistry; `npx jsrepo add react-bits <component>` (or the shadcn registry) can drop a component into a project that supports it.

## How to add one to a project
1. Pick the component you need (e.g. `Split Text`, `Aurora`, `Star Wars`, `Hover Particles`).
2. Choose a variant on reactbits.dev: **JavaScript** or **TypeScript**, and **plain CSS** or **Tailwind**.
3. Copy the component file(s) into the project.
4. Copy the matching CSS file (for the plain-CSS variant) and import it; for the Tailwind variant, make sure your Tailwind is loaded.
5. Install the small runtime deps that component uses (commonly `framer-motion`; many need nothing).
6. Import the component, use it, and customize via its props (colors, speed, size, duration).

## Rules
- Copy only the component(s) you actually use; do NOT vendor the whole library. Components are independent and tree-shakeable.
- Keep it minimal-deps: prefer components that need no extra package when the look allows.
- Verify the import works in the target framework (Next/React) and that the CSS variant matches the project's setup.
- Respect the license (see `<accountRoot>/skill-repos/react-bits/LICENSE.md`).
