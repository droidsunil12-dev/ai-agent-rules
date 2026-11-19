---
name: "handover-when-stuck"
description: "Stop retrying a blocked step and hand over a precise manual guide to the user so they can complete it, then resume when they hand back. Use when a task is genuinely stuck on one step after a couple of failed attempts, or when progress depends on something only the user can do (login/2FA/email codes, payments, account actions, a broken/404 UI route, hardware, or an external code/secret you cannot obtain). Do not use for steps you can finish yourself."
---

# Hand Over When Stuck

Do not loop on a step that is not moving. If the same action has failed **two meaningful times** with no progress, or the step depends on something only the user can provide, stop retrying and hand over.

## Decision rule

- **Keep going yourself** when you have a working path: valid credentials/token, a reliable API, a different tool, or a fresh idea you have not yet tried. One clean alternative attempt is allowed; a 3rd identical retry is not.
- **Hand over** when: the blocker is external to you (auth/2FA/email code/OTP, password, payment, a one-time secret, a broken route that 404s on every variant), you have verified the step genuinely cannot be completed with current access, or you have burned two attempts with zero progress.

## Before handing over, verify and pin down the state

- Confirm exactly what succeeded and what is blocked; do not assume.
- Capture the precise current state (URL, file path, commit sha, run id, error text) so the user does not have to rediscover it.
- Make the handover step **as small as possible** — one concrete thing, not "do the rest."

## Handover guide format (what the user should see)

Lead with the status, then a numbered, copy-paste-ready checklist. Keep it tight.

1. **Where we are:** one line — what is done, what is blocked.
2. **The blocker:** the exact thing that only they can do (e.g., "GitHub emailed a 6-digit code to x@x.com; enter it").
3. **Do this:** numbered steps with exact URLs, fields, values, and expected result. Include the exact endpoint/path/secret location (never display a live secret; point to where it is and how to grab it).
4. **Hand back:** what to tell me when done (e.g., "say 'done' + paste the code/URL") and what I will do next.
5. **Why I stopped:** one line on why this is beyond me (auth, external dependency), so it reads as deliberate, not a failure.

## Hold, monitor, and auto-resume (a handover is NOT the end of your turn)

Handing a step to the user means **holding the task, not parking it**. You do not stop and wait to be pinged.

- While the user does their step, **keep monitoring** for completion. Pick the cheapest reliable signal for that step: a UI state change, a running/ended process, a log line, an event, or a scheduled background check.
- **The moment it's done, carry things forward immediately** — resume the very next step yourself, without asking. If their step takes seconds, watch it directly; if it takes minutes, put a background routine/subagent on it that watches and pings you, then resume on notification.
- If they finish but the completion signal is ambiguous, do one quick verification, then continue — don't make them re-explain.
- Do **not** redo their completed step; trust it and move on.
- Only end the turn if the step is genuinely indeterminate for a long time; then state exactly what you're watching for and that you'll resume the instant it lands.

## Credential / secret handover (specific rule)

When the blocker is a **credential, secret, or one-time code that only the user can surface** — including browser cookies (especially HttpOnly ones), API keys the user must paste, 2FA codes, payment confirmation, or any "log in and confirm" step — **hand over immediately after confirming the step is genuinely blocked, do NOT attempt to extract it yourself via browser JS, CDP, file-system reads, or automation workarounds.**

- HttpOnly cookies are deliberately unreadable by `document.cookie`. That is by design; treat it as a hard wall, not a puzzle to solve. Do not spin on `fetch()`, CDP, reading the locked Chrome/Edge/WebView2 cookie DB, or DPAPI key extraction. Those paths are low-yield, high-risk (touching locked DBs, DPAPI, process-stop), and the user can do the manual copy in 30 seconds. Hand over.
- If you know *where* the value lives and *how* the user grabs it (DevTools → Application → Cookies, or the app's settings field), that is your handover guide. Stop.
- Threshold: **one** failed meaningful attempt at a blocked credential step → hand over. Not two. Credential/secret steps are not a "two attempts" category; they are handover-category by nature.

## Good examples

- GitHub sudo/email-OTP for a PAT: trigger the email, ask for the code, enter it, resume via API.
- A broken "Enable X" button (route 404s): switch to the API; if the API also can't, hand over the exact API/CLI command for them to run and hand back the result.
- Two-factor on any login: hand over, do not guess codes.
