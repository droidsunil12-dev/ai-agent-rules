---
name: client-task-runner
description: On-demand task-queue pipeline for ANY project: read queued tasks, match each to a project, make the changes, commit+push, and on done+approved deploy + notify the owner. Project-specific facts (repo, hosts, deploy commands, recipients, design routing) are read from client-work\projects.md, never hardcoded here. Before deploying ANY UI change, ALWAYS run BOTH ship-gates: (1) content-accuracy sweep (no shipped placeholder/dummy data - verify before flagging, real data = real) and (2) layout/alignment QA: run the runnable ship-check tool (client-task-runner\ship-check-live.js - measures gutter asymmetry + overflow, MANDATORY, not skippable) AND a fresh screenshot; use the `hallmark` skill for deeper slop/quality tells. Check the lessons-learned skill for prior corrections. Trigger: "check my tasks", "process the queue", "run the client queue", "deploy project <name>".
metadata: {"emoji":"📋","requires":{"bins":["git","surge"]}}
---

# Client Task Runner (on-demand pipeline)

One prompt = one full pass through a task queue: read tasks, make the changes, push, and on done+approved deploy + notify. No timers; runs only when invoked. Trigger: "check my tasks", "process the queue", "run the client queue", "deploy project <name>".

This skill is the **procedure only**. All project-specific facts (repo, hosts, deploy commands, WhatsApp recipients, download paths, design-skill routing) live in `client-work\projects.md`. Read that first; never hardcode or guess those here.

## Model
- **Source of truth = the code repo** (clone location in `projects.md`). All edits happen in the clone, then `git commit` + `git push`. Never edit any seed/temp folder.
- **Auth is wired** (token in the remote / token-authed CLI). No manual login unless a token expires.
- **Deploy only on done + approved** — a flag the user/client sets on a task. Never deploy while a task is in progress.
- **Keep it simple.** Small change → lightest tool that works (tight image prompt, 3-line script). No custom multi-step pipelines. Read the task, find the minimal change, make it.

## Identifying today's task (HARD gate — read carefully, do NOT mix up tasks)

Before doing ANY work, decide which chat is "today's task". A chat counts as a task ONLY when ALL of these hold. Otherwise skip it.

1. **Recent = today.** The chat message is from *today* / the most recent batch. If the chat is older or not the most recent one, it is NOT today's task. Do NOT go back through old chat history to find tasks. When in doubt, the **most recent chat is the one to follow** — recency is the primary signal.
2. **Project already known.** The task names a project that is *already listed in `client-work\projects.md`* (our existing GitHub projects). If the named project is not in `projects.md`, it is not a task we own — note it, do not act.
3. **Sender is a known client user.** Today's tasks come from: **Nishu, Bhavesh, Vipin, Suraj, Vasudha, Sunil, Kamaldeep.** Only look for tasks in chats whose sender is one of these. If any of these names appear at the top of the recent chat, that chat is the candidate to inspect.

**Both 1 + 2 must be true** for a chat to be treated as today's task (3 is the filter for WHERE to look, not a separate task source).

### Rules that stop wrong work
- Do NOT scan every suggested/known name for tasks. Only inspect the **recent** chat, and only tasks from the known senders above.
- Do NOT mix tasks from different chats. One chat = its own task set; never pull a task from an older chat and apply it to a newer chat's project (or vice versa).
- If the recent chat's project isn't in `projects.md`, or the sender isn't a known client, or the message isn't recent → **skip it**, say why in one line, and stop. Do not guess or do the wrong change.
- "Don't mix up" = the single biggest risk. When two chats touch the same project, act only on the most recent one, and only for the specific change that chat asked for.

## Steps
1. **Read the queue (recent only).** Open the queue source named in `projects.md` (e.g. a chat inbox in the user's real browser). Read **only the newest batch — today's / most recent**, never full history. Then apply the **today's-task gate** above (recent + known project + known sender). Each candidate task: who, project, change, urgency, done/approved flag. Skip anything already handled, stale, or failing the gate.
2. **Extract tasks.** For each valid task: owner (must be a known sender), project (must be in `projects.md`), change, urgency, approval flag.
3. **Match to project.** owner + project → the folder named in `projects.md`. Match on folder/README/known mapping. Ambiguous → note it, ask which folder — do not guess.
4. **Make the edit.**
   - `git pull --ff-only` in the clone (fresh tree).
   - Open the project folder; edit code/design (Tailwind HTML, copy, images). For UI/design work, follow the design/UI routing table in `projects.md`.
   - Project-specific deploy-folder caveats (mirror trees, publish subfolders, etc.) are in `projects.md` — honor them.
   - `git add -A` in the project folder, commit with a short message, push.
   - Do NOT deploy yet unless the task is marked done+approved.
5. **Image/design edits needing a new asset — simplest tool.**
   - "Edit, don't redraw" (recolor, resize, crop, add text, re-arrange) → give the image model a tight prompt: pass the existing image, describe ONLY the one change, instruct it to keep everything else identical. One tight prompt beats a custom script.
   - Never use a crop/reshape PIL pipeline for logos (keeps producing mangled results). If the model alters the art, build a clean lockup from the original blocks instead — no cropping/mirroring pieces. Show the result and wait for approval before deploying.
   - Drop the asset into the project's assets folder, commit, push.
6. **Done + approved → download + deploy + notify.**
   - Copy the publish folder to the dated download path from `projects.md`.
   - Deploy using that project's command + host from `projects.md`.
   - Record the live URL.
   - **Do NOT send the link or any reply to a WhatsApp contact without the user's explicit consent in this conversation.** By default, stop after deploy and hand the user the exact text/URL to forward. Only send to the recipients in `projects.md` when the user explicitly authorizes it. (See AGENTS.md "No WhatsApp replies without explicit user consent".)
7. **Report back.** One line per task: owner, project, what changed, commit SHA, and (if deployed) the live URL + `link-sent` only if the user actually authorized the send, else `awaiting-consent`.

## Pipeline (run top to bottom)

0. **Plan first, no self-created jobs.** Before touching anything: (a) restate today's actual task(s) from the chat in one line; (b) if your next idea is something nobody asked for (a banner, a new section, a swap not requested, a re-point), discard it — do not invent work; (c) write the tight plan (steps + files + expected end state); (d) after finishing, run a verification checklist that every requested change is actually present; (e) report back and WAIT for the user's review before any follow-up or third-party reply. See AGENTS.md "Plan-first, verify, no self-created jobs".
0.5. **After done + approved, sync to the D: office folder.** Copy the project's `dist/` output into `D:\Final TFC Work\New office task`, under the right category: **website → `Websites\<Project>`, mobile app → `Mobile Apps\<Project>`**. robocopy `/MIR` from the project's `dist/`. This keeps `D:\Final TFC Work\New office task` a current mirror of the latest work, placed by project type. Do it after every approved task.
0.6. **Final Desktop ZIP = optimized + host-compatible + responsive (HARD).** When the user asks for a **final ZIP on the Desktop to share/publish/host**, the ZIP must pass all three before handover: (1) **optimized** — webp images with png fallbacks, lazy-loading, lean total size; (2) **hosting-compatible** — webp+png `<picture>`/`@supports` so it works on hosts that can't serve webp, include `CNAME`, flat file layout, no dev/test pages; (3) **mobile-responsive** — checked on a 375–430px viewport: no overflow, usable nav, scaled logo/text, tap targets ≥44px; fix any issue while keeping the desktop look. Do all three every time a Desktop ZIP is requested. See AGENTS.md "Final ZIP on Desktop = optimized, host-compatible, responsive".

## Guardrails
- **Never assume - verify first (HARD, user-enforced).** Never state or act on a judgment as fact unless it is verified. A phone that "looks like a sample" may be the owner's real number; a name that "looks made-up" may be a real contact; a layout that "looks broken" may be fine; a value that "looks wrong" may be the client's actual data. **Assumption is the failure mode; verification is the gate.** Before changing or flagging ANYTHING (content, data, layout, alignment, a "bug", a "fix"), confirm it against a known-good source: the client's own data, `client-work\projects.md`, the live site, or the owner. State the thing, verify it, then act. When in doubt, treat it as real/correct until proven otherwise and ASK the owner - do not silently change it. This overrides any "it looks like X" intuition.
- **Content-accuracy sweep before ANY deploy.** "Looks right" is NOT "is right." Before marking a task done/deployed, scan the changed section(s) for **placeholder or dummy data** and fix or flag it:
  - Hardcoded/placeholder values: sample phone numbers, fake contact names, "Lorem ipsum", "John Doe", TODO/FIXME, "coming soon", `www.yourdomain.com`, `#` links with no target, sample prices/addresses. **Only after confirming they are actually placeholders - a real owner name + their real phone (e.g. the owner's contact on their own site) is CORRECT data, not a bug. See the Never-assume rule above.**
  - Mismatched data: a phone / email / brand / number that **differs from the real project values in `projects.md` or the live site.** A value that MATCHES the project's known contact is CORRECT - leave it. A real-looking name + mobile number (e.g. an owner's name + their phone on their own business site) is NOT a bug by default; only flag it after verifying against `projects.md` / the client that it is actually placeholder. **Never assume contact data is fake because it "looks" like a sample.**
  - Wrong-but-plausible copy that survived because it "looked" correct: typos, stale numbers, outdated offers.
  - A value CONFIRMED to be placeholder/dummy (cross-checked against `projects.md` / the client) in a live section = **stop, do NOT deploy.** Fix it to the real value or confirm with the owner first. Do not assume - verify first.
  - This is the class of bug a screenshot QA misses - the layout is fine but the *content* is placeholder (e.g. a confirmed sample phone/name). **But verify before flagging: the owner's real contact (their name + their phone on their own business site) is NOT fake data. Never assume a value is placeholder/dummy just because it "looks" like one - confirm it first.**
- **Layout/alignment QA before ANY UI deploy (catches broken layout the eye misses).** A screenshot that "looks fine" can still ship a misaligned/broken section - this is exactly the class of bug that got missed on Narangpur's bulk CTA (buttons left-biased with empty space on the right). It is MANDATORY, not optional. Before marking a UI task done/deployed, run BOTH: (a) the **runnable ship-check tool** and (b) a fresh screenshot. "It renders" is not "it is aligned".
  - **Run the tool (this is the part I kept skipping - do not skip it).** Open the live page (or the changed section) in a browser tab at 1280, then at 375/414, and run `client-task-runner\ship-check-live.js` (see the file's header for the 3-line usage). It measures every flex/grid row's left vs right gutter and flags any centered parent whose row is **asymmetric (ragged/left-biased)** plus any **horizontal overflow**. It is a real, runnable check, not a judgment - it cannot be hand-waved. A `MISALIGNED` line = fix before deploy (add `justify-center` / `justify-between`, or intentionally left-align the parent).
  - **Check by eye too:** misalignment (uneven gaps, off-center/ragged blocks, overlapping cards, broken flex/grid columns), overflow/cutoff (text/images spilling, horizontal scroll on mobile, `overflow-x` not clipped, content cut at edges), responsiveness (375/414px collapse, tap targets < 44px, nav unusable, columns stacking wrong).
  - **Deeper slop/quality tells** (no purple-blue gradients, no card-in-card, no emoji icons, no tracked-caps/eyebrow labels, contrast + focus states): route through the `hallmark` skill when the section reads as generated/broken, not just misaligned. `hallmark`'s `sloplint` is the deeper audit; the ship-check tool is the fast mandatory gate.
  - **Gate:** ship-check flags a misaligned/overflow row in a changed section = **stop, fix it, re-run ship-check until clean**, then screenshot at 375 + 1280 + 1440 to confirm visually. Only then deploy.
- **Single source of truth = the `client-work` GitHub repo (HARD).** The only working tree is `C:\Users\Admin\client-work` (remote `tfcsunil53-cloud/client-work`, branch `main`). Every edit goes there, then `git add` + `commit` + `push origin main` immediately, then deploy from that same tree. Never edit `D:\deployed\*`, `D:\Final TFC Work\...`, `client-work\backups\*`, or any `dist/` mirror as if they were canonical — those are snapshots only. If a requested change looks "missing" from the repo, that means it was made in a non-repo folder and never committed: flag it and do not silently deploy the repo without it. The repo is the only folder that is ever "latest."
- **No extra steps / no own decisions (HARD).** Do only what the task or the user asked. After a requested change, stop. No unrequested edits, no new folders, no extra sync/backup copies, no re-pointing other paths, no "while I'm here" cleanup. If a follow-up seems needed, ask — don't just do it. Minimum that satisfies the request, then stop.
- **No WhatsApp replies without consent (HARD).** Never send a message to any WhatsApp contact as part of this pipeline unless the user explicitly says so in the current conversation. Deploying is fine; informing the human on the other side is not. Default end state: deploy + report the link back to the user, who decides whether to forward it. "Telling me is enough" = consent that no reply goes out.
- **No task mixing.** Act only on the most-recent chat that passes the today's-task gate (recent + project in `projects.md` + known sender). Never fold an older chat's request into a newer chat's project or apply one chat's change to a different project. One recent chat = one scoped change set.
- **Known senders only.** Tasks are only acted on when the recent chat's sender is one of: Nishu, Bhavesh, Vipin, Suraj, Vasudha, Sunil, Kamaldeep. Unknown sender → skip.
- **"Deploy Success" ≠ verification.** The CLI printing success only means files uploaded; it says nothing about whether the right thing is live. Before marking a deploy done, open the live URL and screenshot the exact element/section you changed; confirm the intended result, not a stale asset. If it shows the old version, that's a bug (usually cache) — fix it (cache-bust the changed asset), re-verify, then call it done.
- No exhaustive multi-page test runs; just confirm the changed thing looks right.
- Keep a commit per task. Never force-push.
- Recipients are owner-only, never clients.
- Slug-ify deploy links (no spaces).

## Gotchas (general)
- Surge CLI failing on a missing node path: prepend system node to PATH and run the surge entrypoint with it.
- Surge caches ~5 min; in-place filename overwrites keep the same URL → cache-bust changed assets.
- `git pull` conflict or a `safe.directory` warning → `git config --global --add safe.directory <path>` then retry.
- Push rejected (remote ahead) → `git pull --rebase` then retry.
- Credential/secret steps (login, token, OTP): one meaningful attempt, then hand over a guide and hold/monitor.

## Failure modes
- Queue source not signed in → hand over to user (credential rule), then hold and monitor.
- Deploy CLI not logged in → run once interactively (tty) so user authenticates; account persists after.
- No matching project → note it, ask which folder the owner maps to.

## "Send me" → WhatsApp delivery (do it in one pass, no trial-and-error)

When the user says **"send me"**, deliver the artifact file to **WhatsApp Web → the user's own chat** (`+917398997880` ONLY, the "(You)" personal-number row). They download from there. Never the secondary recipient number.

**Follow this recipe exactly. Do NOT try the wrong approaches first — they each cost a turn:**
- ❌ Do NOT `setInputFiles` on `input[type=file]` → its `accept` is `image/*`; a ZIP is rejected as "1 file you tried adding is not supported".
- ❌ Do NOT click the attach icon by coordinate → WhatsApp's input-bar icons are shadow-DOM; coordinate clicks land on the wrong icon (emoji picker etc.).
- ❌ Do NOT `page.locator("text=Document").click()` → throws "Node is not an Element"; use `getByText`.
- ✅ The only reliable path is **locator-based attach + native filechooser interception** below.

**Recipe (run it as one flow):**
```js
// 1) Make sure the right chat is open: the "(You)" personal row. If a "New contact" panel is open, click the back arrow (top-left) first.
// 2) Attach -> Document via locators (NOT coordinates, NOT text()):
const attach = page.locator("[aria-label='Attach']");
await attach.click();
await page.getByText("Document", { exact: true }).first().click();
// 3) The picker fires a native file-chooser; intercept it and set the absolute path:
const fc = await page.waitForEvent("filechooser", { timeout: 8000 });
await fc.setFiles(absolutePathToArtifact);   // forward slashes, e.g. C:/Users/.../artifact.zip
// 4) Send button = green paper-plane at bottom-right of input bar. It has NO aria-label, so click by coordinate ONLY (re-measure from a screenshot each session — it moves with window size):
await cua.click({ x: <sendX>, y: <sendY> });   // e.g. ~1143, 948 on the current layout
// 5) Verify by screenshot: the new message row shows  filename · TYPE · size  + a download arrow.
```

- **Absolute path** must be the artifact's real path with forward slashes (the `artifacts/` file).
- **Coordinates are per-session.** Before step 4, screenshot and confirm the send-button location; if the window resized, re-measure. The attach button itself is locator-driven, so only the final send click is coordinate-based.
- If `waitForEvent` times out (picker didn't fire), the chat may be on the "New contact" panel — go back to the chat list, reopen "(You)", and retry once.
- Done = screenshot shows the delivered message row. One clean pass, no retries of the banned approaches.
