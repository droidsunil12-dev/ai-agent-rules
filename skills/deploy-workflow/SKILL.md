# Deploy & Verify

A reusable deploy/verify workflow for ANY static site or code project. Read the operating rules in `client-work\AGENTS.md` and the per-project facts in `client-work\projects.md` first; this skill is the procedure, not the data.

## When to use
When a task involves publishing a site/app or shipping code changes and you must confirm the live result, or when you must follow the client deploy/verify discipline.

## Inputs (from `projects.md`)
For the project you're working, pull: host, git branch, source dir, deploy dir, publish command, cache rules, and any known-broken paths. Never hardcode these in the skill.

## Workflow
1. **Edit source** in the source dir.
2. **Commit** with a clear message; push the branch.
3. **Sync/preview** to the deploy target (mirror the folder so it matches source).
4. **Publish** using the project's command.
5. **Verify on the live URL**: open the real host, screenshot the changed section, spot-check the key values (fonts, tracking, spacing, counts). Don't rely on the source edit alone.
6. **Cache-bust only after the user has approved the visuals** (if the host caches). Bump the token, republish, re-verify.

## Hard rules (from AGENTS.md)
- Never publish the next visual stage before visual approval.
- New motion/interaction must degrade to fully visible when JS is off or reduced-motion is preferred.
- No `transition: all`; animate only the changed properties.
- Preserve HTML structure; verify tag balance after edits.
- Keep the deploy copy in sync with source (mirror, not copy).

## Gotchas
- Surge ignores `.gitignore`; only `.gitignore`/`.env`/`README` are safe to exclude.
- For a static cache-bust, read the token from the deploy copy, not the repo.
- PowerShell inline `$vars` get mangled by the shell tool — write a script file and run it.
- `Select-String` 1-based index is -1 when there's no match — guard first.
- The browser tool can't reach `file://` or `127.0.0.1` for QA — verify on the live host.

## Output
A live-verified deploy: commit SHA, publish status, live screenshot of the changed area, and (if cached) confirmation the cache-bust took.
