# Product development plan

Each round completes one feature or repair. Future items are planned, not implemented claims.

## Current round

bg-mode

## Roadmap

### bg-mode — Background Mode to prevent stealing focus

Status: in_progress

Acceptance:
- New tabs opened with --background flag open in background without activating target
- Tab switches skip Page.bringToFront to preserve current view
- Navigation skips Page.bringToFront after navigation
- Auto-connect respects background flag for initial fresh tab
- Environment variable AGENT_BROWSER_BACKGROUND works globally and per-command

Implementation: `src/cli.js`, `src/chrome.js`

Tests: `test/chrome.test.js`

---

Alan Vo · [alanvo.net](https://alanvo.net) · [X: @alanvoasi](https://x.com/alanvoasi)
