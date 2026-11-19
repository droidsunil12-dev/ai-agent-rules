---
name: "app-reconstruction"
description: "Use REA (Reverse Engineer Anything) to study an app or software the user is authorized to inspect, document its observable behavior and architecture, and build an original, minimal, user-friendly implementation with broad feature parity. Trigger whenever the user asks to recreate, clone for compatibility, replace, or build their own version of a desktop, web, mobile, or command-line app from a supplied app, binary, website, screenshots, recordings, or description. Preserve the target platform and package format where feasible (for example, deliver a real Windows .exe for a Windows executable), and use the same technology only when evidence supports it and dependencies permit."
compatibility: Requires a coding workspace. REA MCP tools are preferred; REA CLI and applicable local inspection tools may be used if configured. Build tooling depends on the target platform and stack.
---

# App Reconstruction with REA

Study the user's reference software with REA, then implement an original app that preserves the behaviors the user cares about. Aim for broad, demonstrable functional parity and a simpler, more usable interface. Do not claim perfect or complete equivalence unless every relevant behavior has been observed and verified.

## Working principles

- Work only on software the user owns, has permission to inspect, or may lawfully analyze. Keep REA analysis local when possible. Do not bypass license checks, DRM, authentication, access controls, anti-cheat, or other protections. Do not extract secrets or private user data.
- Reproduce behavior and interoperability, not another product's identity. Use original names, visual design, copy, icons, and assets unless the user has rights to reuse the originals. Avoid presenting the new app as the original.
- Treat REA findings as evidence, not certainty. Separate directly observed facts from inferences and unknowns. Respect limits of static analysis, incomplete captures, missing providers, and unobserved workflows.
- The requested “same technology” and “same format” are goals, not assumptions. Identify the stack from evidence and use it when practical and maintainable. Deliver a genuine target-platform artifact, not a renamed file. If exact stack or packaging is infeasible, explain why and choose the closest compatible route.
- “Everything” means make a feature inventory, cover the user-visible workflows, and track parity. Do not promise full parity based on a sample of screens or a single execution trace.

## Workflow

### 1. Establish the target and available evidence

Inspect the workspace and the provided reference before asking broad questions. Determine:

- What app/product and version is being studied; what paths, URLs, accounts, sample data, screenshots, recordings, or test devices are available.
- Target platform(s), architecture, delivery format, intended users, and whether the user expects a standalone installer, portable executable, source project, or all of these.
- Which workflows matter most and which data/services the replacement should connect to.
- Whether REA is configured as an MCP server or its CLI is available, and what target-specific analyzers/providers can run here.

Use what the user already supplied. Ask only for missing details that block safe access, a build, or a concrete packaging decision. If REA is not available, explain that its official setup is `npx rea-agents setup` (review the proposed configuration changes and restart the agent), then continue with other authorized evidence only if that can still make progress; never imply REA ran when it did not. Follow setup and package links from the official [REA repository](https://github.com/morluto/rea) and do not substitute lookalike packages.

### 2. Plan an evidence-led investigation with REA

Use the connected REA MCP tools when available. Discover the actual tool names and schemas from the active MCP catalog; do not invent tool calls. For CLI work, consult the installed REA help/docs before choosing commands. REA supports different analysis paths for JavaScript/Electron apps, websites, .NET, Android, native binaries, process behavior, and other artifacts; select the path that matches the target and installed providers.

For each important user workflow:

1. State a concrete question, such as how a particular action changes state or which components implement a feature.
2. Select the least intrusive REA analysis that can answer it. Prefer static inspection first; run or interact with the reference only when needed and within user permissions.
3. Capture evidence: relevant modules, routes, IPC or API boundaries, UI state changes, inputs/outputs, persistence effects, errors, and environmental dependencies.
4. Record the evidence source and confidence. Mark facts as **observed**, **inferred**, or **unknown**.
5. Follow relevant calls or data flow only as far as needed to understand the behavior being recreated.

Do not dump or reverse engineer the entire product without a purpose. Avoid modifying the reference installation or its data. For runtime capture, disclose meaningful side effects and use a disposable/test account or copy when available.

### 3. Define scope and compatibility

Create a compact investigation summary before implementation:

- Target platform and delivery artifact.
- Confirmed or likely technology stack, with evidence and confidence.
- Feature inventory grouped into core, supporting, and out-of-scope workflows.
- User journeys and state transitions, including validation, errors, persistence, import/export, keyboard/accessibility needs, and network dependencies where relevant.
- Unknowns, external services, and behavior that cannot be observed.
- A parity checklist that can be checked against the new implementation.

When the user requests all features, expand the checklist from the available evidence and keep working through it. If the reference is too large to inspect exhaustively in one pass, make the scope explicit, deliver a coherent phase, and identify remaining workflows rather than silently omitting them.

### 4. Implement the user's version

Build inside the current project when one exists; otherwise create a clearly named project in the workspace. Keep the UI minimal, consistent, accessible, and easy to navigate while preserving the underlying feature behavior. Prefer familiar controls, clear labels, sensible defaults, direct feedback, useful empty/error states, and responsive layouts appropriate to the platform.

Use the same language/framework/runtime only when REA evidence or supplied project files support that choice and the environment can build it. Otherwise state the constraint and select the closest practical implementation. Keep business behavior separate from presentation where sensible, and design interfaces/adapters for unavailable services instead of fabricating successful live behavior.

Do not copy source code, proprietary assets, credentials, or protected content unless the user supplied them and has rights to reuse them. Reimplement from observed behavior and public interfaces with original code and presentation.

### 5. Build for the requested format

Match the target OS, architecture, and delivery format as closely as the environment permits:

- For a Windows `.exe` target, compile/package a real Windows executable with the appropriate runtime dependencies. Use the original framework if confirmed and practical. Provide an installer or portable build according to the user's stated expectation; do not merely rename a script or archive to `.exe`.
- For macOS, Linux, mobile, web, or CLI targets, produce the corresponding native/package/deployment form and document the build/run command.
- If the current host cannot produce the requested artifact, leave a reproducible project and build configuration and state what OS/toolchain is required to generate it.

Record artifact path, target platform/architecture, build prerequisites, and launch instructions. Do not claim an artifact was built unless it exists.

### 6. Verify against observed behavior

Run only checks needed to confirm the implementation and package requested by the user. Compare each implemented workflow against the parity checklist, using REA's recorded evidence and safe test inputs. Check both normal and representative error/edge paths when evidence supports them. For changes involving builds, confirm the output artifact exists and can launch where the environment allows.

Report each checklist item as **matched**, **partial**, **not implemented**, or **not verifiable**, with concise evidence. Distinguish behavior parity from visual similarity. Note any real-service integrations that need user credentials or infrastructure; never invent results for those.

## Deliverable

Finish with:

1. A brief description of the new app and its intended users.
2. The REA investigation summary: tools/analysis used, key evidence, confidence, and limitations.
3. Implemented workflows and the parity checklist status, including outstanding gaps.
4. The source project path and the built artifact path/format, platform, and run instructions.
5. Any stack or packaging deviation and its reason.

Keep the summary direct. Link to real workspace files with absolute paths. Never describe an inferred or unobserved behavior as confirmed.
