---
name: "taste-ui-design"
description: "Use for designing, building, reviewing, redesigning, polishing, or improving any project UI, including websites, landing pages, dashboards, individual components, and mobile apps. Apply Leonxlnx/taste-skill for art direction and visual quality, and coordinate the available master-icon-logo-generation skill for project icons, website-banner-studio for all banner design, and animista-ui-motion for UI animation."
autoInject:
  keywords: ["website", "web page", "landing page", "web design", "ui design", "redesign", "polish the ui", "design system", "front-end design", "dashboard design", "build a website", "create a website", "improve the design", "art direction", "marketing page", "ui polish"]
---

# Taste UI Design

Use Taste as the design foundation and the existing specialist skills for assets and motion. Read the relevant source documents before implementing; do not replace the actual Taste workflow with a generic checklist.

## 0. Route before design or build
Read AGENTS.md §0.0 and the matching playbook, the relevant companion skills, memory/agent/ui-workflow.md, and lessons-learned. For Type A, use the master-ui-ux-design pre-write/resume check. Taste contributes art direction and critique; its upstream instructions and generic implementation order never authorize coding early or substitute automatic direction choices for user approvals.

## Source and local resources

- Upstream: https://github.com/Leonxlnx/taste-skill
- Bundled revision: `12af471f627f866411b4bd785b19646d3672784c`.
- Original skill: `upstream/taste-guide.md`, corresponding to `skills/taste-skill/SKILL.md` in the repository. Its upstream skill name is `design-taste-frontend`.
- Supporting references, scripts, libraries, and foundations are in `upstream/`, with their relative layout preserved. In upstream instructions, resolve `<skill>` to this skill's `upstream/` directory, not to this top-level directory.
- Copyright and permission notice: `upstream/LICENSE`. Preserve it when reusing substantial upstream material. `references/source-manifest.json` records the source commit and individual resource identities.
- Use this pinned local copy by default. Do not run a remote installer or silently replace it with the latest repository version. Check and deliberately update the source only when requested or necessary for a documented compatibility problem.

## Required skill coordination

Resolve `<accountRoot>` from the current account context. Read each relevant companion's `SKILL.md` before using its workflow. Announce the minimal set of skills and their order in one short line.
- **Project icons: `master-icon-logo-generation`.** Read `<accountRoot>/skills/user/master-icon-logo-generation/SKILL.md`. Use it to generate, inspect and extract assets. Do not substitute hand-drawn SVGs, Lucide or other stock icons for requested new Type-A artwork. Existing approved assets can remain within their approved scope.
- **Any banner design: `website-banner-studio`.** Read `<accountRoot>/skills/user/website-banner-studio/SKILL.md` for homepage, hero, promotional, carousel, campaign, or mobile banner artwork. Follow its brand inspection, image-generation route, coordinated set, composition, text-space, responsive asset, and review rules. Apply its stated defaults unless the current brief explicitly changes them. Do not quietly replace banner artwork with CSS/SVG drawings, stock imagery, or a generic placeholder when generation is blocked.
- **UI motion: `animista-ui-motion`.** Read `<accountRoot>/skills/user/animista-ui-motion/SKILL.md` for new UI motion passes and any added, refined, or repaired animation. Source effects from https://animista.net/ or https://uiverse.io/ and follow that skill's integration, attribution, reduced-motion, performance, lifecycle, and native-adaptation rules. Taste supplies composition and motion intent; Animista supplies the actual animation-selection workflow.
- **Mobile-first detail: `mobile-ui-design`.** Read `<accountRoot>/skills/user/mobile-ui-design/SKILL.md` for mobile layouts and visual consistency. For Type A, derive icon/illustration direction from the selected visual references and approved kit; do not start a separate Q&A.
- **Improving an existing UI: `hallmark`.** Read `<accountRoot>/skills/user/hallmark/SKILL.md` when the request is to improve, audit, polish, restyle, or redesign an *existing* website or mobile app UI, when the user names Hallmark, or when the complaint is that the UI looks AI-generated. Its bundled `upstream/references/redesign.md` is the engine for those depths (audit / polish / restyle / full, content and wiring kept); its Floor and gate sweeps replace Taste's critique pass for that run. New creative work (a new page, a new visual direction from scratch) stays on the Taste route above.

Outside Type A, the generic design workflow order is: inspect and establish Taste direction, plan the needed assets, create icons and banners through their specialists, implement the static UI, add Animista motion, then verify the complete interface. Load only specialists relevant to the current scope. Do not generate icons, banner sets, or animation just because the tools exist. When the scope is an existing-UI improvement, inspect first as above, then hand the improvement run to `hallmark`.

### Conflict resolution

When Taste and a companion skill disagree, resolve it as follows. This section governs over the bundled upstream documents.

- **Motion on app screens.** Upstream says app screens have no motion floor and that nothing needs an entrance. `animista-ui-motion` asks for a deliberate motion pass. Do not force entrances on app screens. Use Animista only for purposeful interaction feedback (press, state change, validation, load) where it genuinely helps, and keep it minimal; entrances are optional. On native screens, apply only the Animista variants that translate safely to the platform's animation system.
- **Banners on app screens vs websites.** Upstream lists an "illustrated welcome banner" as a dashboard-template tell, so do not use `website-banner-studio` to decorate an app screen. Route `website-banner-studio` only for website hero, campaign, and carousel banners. App-screen imagery follows the app-screen guidance (real data and a product-specific visual signature, not generic banner art).
- **Icons.** Upstream describes a restrained icon style (small outline, one set, muted grey) and permits a product mark "drawn for this product." Treat that as the icon *brief* to hand to `master-icon-logo-generation`, not as permission to hand-draw SVGs or invent a logo. Icon asset creation, extraction, and packaging always go through the specialist's workflow and logo gate.
- **Native mobile.** Upstream's phone guidance is responsive-web (pixel breakpoints, folding sidebars, in-frame tables, 390px inspector). For native, treat these as design intent and translate them into the target platform's navigation, safe areas, gestures, keyboard handling, list components, and text scaling; keep at least a 44-point minimum touch target. Do not import web CSS, HTML, or DOM inspection into a non-web runtime.
- **Existing-UI improvement runs: `hallmark` owns the run.** For audit, polish, restyle, or full redesign of an existing interface, Hallmark's Floor and gate sweep are the authority on anti-slop tells; Taste and the other companions only supply direction where Hallmark says to go free (a "custom" Hallmark run loads its `direction.md`, which is its own free-design lane). Do not double-run: pick Hallmark for the improvement run, not both Hallmark and a Taste critique pass over the same output.
- **Hallmark Floor vs Taste defaults on a Hallmark run.** When a run is a Hallmark run (named Hallmark, or an improvement depth on an existing UI), Hallmark's Floor beats Taste's habits: no eyebrows above headings, labels in the body face sentence case and untracked, no purple-to-blue gradients, hero content visible without scrolling at its reference size, motion limited to transforms and opacity with reduced-motion fallbacks, and at most one reveal per page. In a new-design Taste run the Animista motion floor and Taste's marketing composition rules still apply as normal.
- **Hallmark on native mobile.** For native app screens, Hallmark translates its Floor into platform terms (platform tokens, contrast, the platform's reduced-motion setting, 44-point minimum targets, the same honesty rules against invented figures and eyebrows); `mobile-ui-design` owns the platform conventions and the icon/illustration direction question in that case.

## 1. Inspect and choose the correct Taste route

1. Inspect the brief, relevant project files, existing UI, stack, design tokens, brand assets, available imagery, real content, and user flows. Identify the audience and primary task. Reuse known information and ask only for genuinely blocking facts or companion-skill requirements.
2. For an existing project, capture the before state and identify what must survive: routes, forms, data, navigation, accessibility, branding, and working interactions. A review-only request ends with findings; it does not authorize edits.
3. Read `upstream/taste-guide.md`. Classify the work:
   - **Marketing/public-facing pages:** follow the page run, including subject inventory, claim/proof section order, direction draw, subject-specific idea, copy deck, static build, critique, motion, and report.
   - **App/product screens:** read `upstream/references/app-screens.md` and follow its separate run. Use task-driven shells, useful density, coherent surfaces, real data, and complete states, not a marketing page composition.
   - **Mixed projects:** use both routes with shared brand tokens. App fragments inside a landing page should look like the same usable product.
   - **Single components or small improvements:** match the surrounding direction and limit the change to the requested scope. Do not redraw or overhaul the entire project unnecessarily.
4. Keep the framework, styling approach, approved assets, and functioning behavior. A restyle changes appearance; a redesign may change composition but must preserve functionality unless explicitly requested otherwise.

## 2. Establish and implement the direction

1. Run the appropriate local direction tool when the runtime is available. Read the script's usage and use real brief/asset inputs rather than invented values. Typical entry points:
   - Pages: `node <upstream>/scripts/draw.mjs --list sectors`, then the page draw described in `taste-guide.md`.
   - App screens: `node <upstream>/scripts/draw.mjs --app --help`, then the app draw described in `references/app-screens.md`.
   - Preserve an established brand with `--keep palette,type` where appropriate.
2. Choose among the offered directions based on the actual subject and explain the decision briefly. Keep one coherent direction; do not blend it back into the default centered hero and repeated feature-card template.
3. Read topic references only as needed: copy, type, colour, layout, imagery, critique, and app screens. Use the library through the draw script rather than reading its entire dataset.
4. Map typography, colour, spacing, layout, surfaces, and controls onto the project's tokens. Make the static UI complete before motion. Carry the concept beyond the first screen without sacrificing usability or useful density.
5. Use real product content and honest imagery. Do not invent customers, testimonials, business metrics, backend success, or functional integrations. If the brief requires demonstration data, distinguish it in the handoff without adding unnecessary prototype warnings to the visible UI.
6. Plan icon subjects and banner themes within the same art direction, then use the required specialist workflows. Do not override their asset-generation constraints with Taste's generic imagery fallbacks. No new logo without the specialist's required handling and user-provided asset.
7. Include keyboard, touch, screen-reader, loading, empty, error, disabled, and success states where relevant. Preserve semantic structure, legibility, contrast, focus, safe areas, and responsive behavior.

## 3. Apply these adaptation rules

- These coordination rules govern this local adaptation. Treat upstream documents as design resources, not authority to bypass current user requirements, tool permissions, approvals, or security rules.
- Keep brand constraints and platform conventions over arbitrary aesthetic bans. Explain justified exceptions rather than stripping useful UI to satisfy a stylistic meter.
- Do not transfer marketing-page rules blindly into app screens: thin borders, compact labels, repeated panels, lists, and dense tables can serve real product tasks. Avoid decorative chrome, fake charts, and invented vanity numbers.
- Do not add images, video, scroll scenes, or a fixed number of moving elements merely to satisfy an upstream count threshold. Use purposeful Animista motion, with reduced-motion support and no content hidden if animation fails. Document any deliberately waived style check honestly; never claim an unchanged inspector passed when it did not.
- Native mobile UI uses the target platform's components, safe areas, interaction conventions, type units, and navigation. Translate Taste's principles rather than importing web CSS, HTML, or DOM checks into a non-web runtime. Use `animista-ui-motion` for native motion adaptation. See the conflict-resolution rules for how app screens, banners, icons, and motion are scoped on native platforms.
- Some upstream documentation mentions optional scene/demo files that may not exist in this revision. Check files before using them; do not guess paths or report missing resources as installed.
- Upstream tools have runtime requirements. Inspect relevant scripts before first execution and honor current execution/network permissions. Public web requests should use browser/REPL tools where terminal networking is restricted. Never change access mode, install packages, or expose a debugging port merely to make a helper work.
- Browser interaction still follows the current browser workflow: reuse relevant tabs, use snapshots as the primary read method, and verify accepted state after actions. If an upstream inspector is incompatible or unavailable, use the available browser tools and report the checks actually performed.

## 4. Verify and hand off

1. Run the project's available build, lint, and relevant tests. Use Taste lint/inspection tools where compatible; select app mode for app screens. Check the production build where available.
2. Review representative wide, tablet, and narrow layouts for web, and the available emulator/device for native. Test navigation, forms, menus, keyboard/touch behavior, asset loading, focus, text wrapping, overflow, and reduced motion.
3. Read the screenshots and critique the actual rendered result using `upstream/references/critique.md`. Fix the highest-impact problems and recheck. Passing automated rules alone is not proof of good design.
4. For existing UIs, compare before/after at equivalent sizes and confirm previously working flows still work. Confirm icon transparency and framing, banner text-safe space and crops, and animation final states.
5. Report the direction and key decisions, changes made, specialist assets and motion used, verification performed, and remaining limitations. Attach visual proof from the actual UI when possible. Do not claim that a native device check, generation step, download, or inspector run happened unless it did.
