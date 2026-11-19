---
title: TeraBox Drive
description: Closed-source Windows client that mounts a TeraBox account (~1 TB free quota) as a local drive via rclone + WinFSP
---

## Current
- `github.com/teraboxdrive/terabox-drive` is a **prebuilt closed-source Windows client** (no source to build), not a git clone. "1 TB drive on PC" = the user's own TeraBox account quota (~1 TB free) mounted locally via rclone + WinFSP; it is NOT a bundled physical drive.
- Latest release `TeraBoxDrive-Setup-0.3.0-x64.exe` (≈50 MB, NSIS; signature markers "Nullsoft"/"NSIS" in bytes). Always verify the download's SHA-256 against the release's published `.sha256` before running (a third-party, closed-source, unsigned binary — internals not vouched for; only pull from the official GitHub release).
- Silent install: `Start-Process $exe -ArgumentList '/S','/all' -Verb RunAs -PassThru; $p.WaitForExit(45000)`. **Elevation is mandatory** — a bare `/S` without `-Verb RunAs` leaves an empty `C:\Program Files\TeraBox Drive\` dir.
- WinFSP gotcha: the bundled `winfsp.msi` does NOT auto-register on silent install — `Get-Service winfsp` stays absent and `msiexec /i winfsp.msi /qn` alone doesn't take. The driver registers only when the app (launched, WebView2/Electron-style) performs its first mount. So after install: open the app, connect the TeraBox account in the UI, then mount → a drive letter appears under This PC.
- Connector cookie: the app's "Connect TeraBox" form wants the TeraBox **HttpOnly** login session cookie (placeholder `XXXXXXXX=`). `document.cookie`/`page.evaluate` CANNOT read it (only non-HttpOnly cookies are visible: `browserid`, `lang`, `csrfToken`, `__stripe_mid`, `__stripe_sid`, `ndut_fmt`, `ndut_fmv`, `g_state`). Per the user's credential-handover rule, hand this step over immediately with a DevTools guide (F12 → Application → Cookies → domain → the HttpOnly cookie's value) rather than attempting extraction via browser JS / CDP / locked cookie DB / DPAPI.
- Aside attach quirk: `attachBrowserTab` by raw targetId can fail with "No open browser tab found" even though `listBrowserTabs()` reports the tab; attach works via `attachBrowserTab(tab.id)` where `id` already has the `tab:` prefix. Re-test in a fresh REPL scope (top-level `const` collisions block re-attach within the same session).

## History
- 2026-11-06: Set up TeraBox Drive 0.3.0 as a "1 TB on PC" — NSIS silent install (with `-Verb RunAs`), SHA-256 verified; learned the WinFSP drive only registers on the app's first mount and the HttpOnly session cookie can't be read via JS, so the connect step was handed over to the user (`episodic/2026-11-06.md`).
