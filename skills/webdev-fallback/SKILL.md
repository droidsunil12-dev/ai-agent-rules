# webdev-fallback

Browser fallback for the local "WhatsApp → AI builds website → deploys" pipeline
(see `C:\Users\Admin\Desktop\Work Automation\README.md`). Use this when the user asks
to build/modify a website via chat but the WhatsApp/n8n automation is unavailable,
or when they want me (Aside) to do the dev work directly.

## What I have
- **Brain:** user's agnes-ai OpenAI-compatible API.
  - base URL: `https://apihub.agnes-ai.com/v1`
  - model: `agnes-3.0-flash`
  - key: read from `C:\Users\Admin\work-auto\canvas.env` (env `AGENT_CANVAS_API_KEY` / `LOCAL_BACKEND_API_KEY`)
    or the value in `C:\Users\Admin\Desktop\Work Automation\n8n\.env` (`AGNES_API_KEY`).
- **Agent coder:** Agent Canvas REST API at `http://127.0.0.1:8000` (self-hosted Docker,
  running only when the PC is on). Verified working.
- **Projects on disk:** `C:\Users\Admin\work-auto\projects\<name>\` (agent's `/projects` inside the container).
- **Deploy:** `C:\Users\Admin\work-auto\deploy-sh\deploy.sh <projectDir>` (surge, free)
  or Netlify Drop (browser) as fallback.
- **Existing sites** (already on the user's PC, per memory):
  - KinePay (surge.sh marketing + local `C:\Users\Admin\Desktop\Kinepay app`)
  - Narangpur Agro & Dairy (static, Netlify)
  - CredWise (static, Netlify, two-tree sync)

## Pipeline (do this when user asks to "build/fix/change <site>")

1. **Pick the project.**
   - Existing → its folder under `C:\Users\Admin\work-auto\projects\<name>`.
   - New → make a folder + `index.html` + `deploy.json` `{ "target":"surge","domain":"<name>.surge.sh" }`.
2. **Drive Agent Canvas** (only if the PC + Docker are up). Use `repl`/`bash` with `curl.exe`:
   - Create conversation:
     ```
     POST http://127.0.0.1:8000/api/conversations
     Authorization: Bearer <CANVAS_API_KEY>
     {
       "workspace": { "working_dir": "/projects/<name>" },
       "agent_profile_id": "<AGENT_PROFILE_ID>",   # default: 7a0598b6-8c00-4467-82a2-b3a15d368490
       "initial_message": {
         "content": [ { "type":"text","text":"Project folder: /projects/<name>. Write all new/changed files INTO that folder.\n\nINSTRUCTION: <user request>" } ]
       }
     }
     → returns { "id":"<conv>" }
     ```
   - Run it: `POST /api/conversations/<conv>/run` (body `{}`) → `{"success":true}`.
   - Poll: `GET /api/conversations/<conv>` until `execution_status == "finished"`
     (retry every ~15-20s; cap ~10 min). `error`/`stuck` → report to user with the status.
   - Agent has written files to disk. Verify by listing the project folder.
3. **Deploy.**
   - Preferred: the host deploy-server (if running): `POST http://127.0.0.1:7171/deploy` with JSON `projectDir` = the folder and `target` = `auto` - it shells to the host's surge/netlify CLI and returns the public link.
   - Or directly: `C:\Users\Admin\work-auto\deploy-sh\deploy.sh "C:\Users\Admin\work-auto\projects\<name>"`.
   - If `~/.netrc` has no surge login, stop and tell the user to run `surge login` on the host (a credential step - do NOT bypass). Netlify Drop is the manual fallback.
4. **Report.** Give the user the public link + what the agent changed.

## If Agent Canvas is NOT running (PC off / Docker down)
Do the dev work MYSELF with the agnes-ai key as the brain (I am the agent here):
- Call the LLM via `repl` fetch (OpenAI-compatible):
  ```
  POST https://apihub.agnes-ai.com/v1/chat/completions
  Authorization: Bearer <AGNES_API_KEY>
  { "model":"agnes-3.0-flash",
    "messages":[{"role":"user","content":"You are a web dev. Given this project's files and a task, output the full updated files as a JSON map {filename: content}:\n<files>\nTask: <request>"}] }
  ```
- Parse the JSON map, write the files into `C:\Users\Admin\work-auto\projects\<name>` via `write_file`.
- Then deploy (step 3). Same outcome, no Docker needed.
- Keep the LLM prompt disciplined: ask for a strict `{file: content}` JSON, one site at a time,
  and validate the keys look like real filenames before writing.

## Rules
- **Never invent project contents** - if I don't know the existing site, read it from the
  project folder first (`read_file`), or fetch the live URL if it's deployed.
- **Credentials are the user's** - read the key from the files above; do not ask the user to
  paste it into chat.
- **Reversible edits only** without confirmation; a deploy to a brand-new domain is fine, but
  overwriting a live production site's files needs the user's OK first.
- **Hand over the credential step** if blocked on a secret (surge login, Netlify token,
  Meta token): give the exact where-to-get-it + where-to-paste, then keep monitoring for
  the "it's done" signal (see the standing handover rule in memory).
- When both the canvas and a manual LLM pass produce files, prefer the canvas path
  (it's the canonical tool); fall back to LLM-driven only when Docker is down.

## Verification
- After deploy, open the published URL in a tab, take a screenshot, confirm it renders,
  and show the link to the user.
