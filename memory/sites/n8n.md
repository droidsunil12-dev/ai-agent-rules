---
title: n8n (Docker sandbox)
description: n8n Community local Docker stack — code-sandbox wiring, version-pinning quirks, and the introspection technique for required env vars
---

## Current
- User (non-dev) runs n8n Community on Windows/Docker Desktop. **Status (2026-11-16): n8n ELIMINATED for client-task automation** — a skill + direct browser driving is enough; the n8n stack was stopped (`docker compose down`) but data volumes PRESERVED. Restart later via `START-N8N.ps1` if ever needed.
- **n8n 3.0-pre community build quirks (durable):**
  - No `n8n-nodes-base.executeCommand` node — publishing a workflow with it fails "Unrecognized node type". Replace with HTTP Request node → host-side deploy-server.
  - Host service on `127.0.0.1` NOT reachable from n8n container via `host.docker.internal` (resolves to host LAN IP, not loopback). Must bind host server to `0.0.0.0`.
  - n8n 3.0 uses "Publish" not "Activate"; publish gate blocks on unrecognized node types.
  - n8n's public REST API unreliable in this build (`/api/me` returns SPA HTML, `/api/v1/*` 404/Unauthorized) — drive n8n via browser UI, not REST token.
- **Sandbox stack (if restarted):** `sandbox-certs` (one-shot mTLS), `sandbox-api` (health gate), `sandbox-runner-1` (privileged DinD), runners, `searxng`. Working tag: `1.8.1` (NOT `v1.15.0`). Split env vars: `sandbox-api` needs `SANDBOX_API_RUNNER_REGISTRATION_TOKEN`; `sandbox-runner-1` needs `SANDBOX_RUNNER_REGISTRATION_TOKEN` + `SANDBOX_RUNNER_API_KEYS`. Introspect: `strings /usr/local/bin/<bin> | grep -oE 'SANDBOX_[A-Z_]+ must be set'`.

## History
- 2026-11-16: **n8n eliminated** for client-task automation — a skill + direct browser driving is enough. Stack stopped (`docker compose down`), data volumes preserved. Also documented: n8n 3.0-pre community build has NO `executeCommand` node, `host.docker.internal` doesn't reach `127.0.0.1` host services (bind to `0.0.0.0` instead), REST API unreliable (drive via browser UI), and the Agent Canvas programmatic API (`POST /api/conversations` → `POST /api/conversations/<id>/run` → `GET /api/conversations/<id>` poll) as the reliable way to trigger agent runs (`episodic/2026-11-16.md`).
- 2026-11-16: Wired the n8n local sandbox stack into the user's `docker-compose.yml`; hit the `v1.15.0` tag-not-found (use `1.8.1`) and the split `SANDBOX_API_RUNNER_REGISTRATION_TOKEN` / `SANDBOX_RUNNER_REGISTRATION_TOKEN`+`SANDBOX_RUNNER_API_KEYS` registration-quirk; all 5 sandbox services came up. `strings ... | grep 'must be set'` is the way to enumerate required vars (`episodic/2026-11-16.md`).
