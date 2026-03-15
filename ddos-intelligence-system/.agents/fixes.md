# Fixes Applied — DDoS Intelligence System

## FIX-001: CountrySelector.jsx — Relative API paths
**Bug:** BUG-001 | **File:** `frontend/src/components/CountrySelector.jsx`

```diff
-    fetch('http://localhost:8000/api/countries')
+    fetch('/api/countries')

-      const res = await fetch('http://localhost:8000/api/simulate_country', {
+      const res = await fetch('/api/simulate_country', {
```

**Why:** Vite's `vite.config.js` already proxies `/api` → `http://localhost:8000`. Hardcoded absolute URLs bypass the proxy and break in any non-localhost environment.

---

## FIX-002: useWebSocket.js — Smart URL resolution + cleanup
**Bug:** BUG-002, BUG-004 | **File:** `frontend/src/hooks/useWebSocket.js`

**Changes:**
1. Added URL resolution chain: `url` param → `VITE_WS_URL` env → auto-derive from `window.location`
2. Removed `console.log('Connected to DDoS Intelligence Stream')`
3. Removed `console.log('Disconnected from stream...')`
4. Removed all `console.error` calls (replaced with silent catches)
5. Added `startTime: Date.now() / 1000` to stats initialization

**Why:** Without a fallback, `new WebSocket(undefined)` throws and creates an infinite error loop. The auto-derive logic (`ws://` or `wss://` based on page protocol) makes it work in dev AND production without any config.

---

## FIX-003: App.jsx — Stats overlay always visible
**Bug:** BUG-003 | **File:** `frontend/src/App.jsx`

```diff
-      <div className={`stats-overlay ${showDashboard ? 'stats-overlay--visible' : ''}`}>
+      <div className="stats-overlay stats-overlay--visible">
```

**Why:** The stats overlay is the left-side HUD (Events, Threats, Throughput) which should always be visible as the primary info display over the 3D globe. It was incorrectly gated behind the `showDashboard` toggle which controls the right-side intelligence panel.

---

## FIX-004: attack_simulator.py — Remove unused import
**Bug:** BUG-005 | **File:** `backend/simulation/attack_simulator.py`

```diff
 import random
-import math
 from typing import Optional
```

**Why:** Dead import — `math` was never used in the module.

---

## FIX-005: .env.example created
**Bug:** BUG-006 | **File:** `frontend/.env.example`

Created file documenting `VITE_WS_URL` with explanatory comments.

---

## FIX-006: CountrySelector.jsx — Safe array access + error cleanup
**Bug:** BUG-007, BUG-004 | **File:** `frontend/src/components/CountrySelector.jsx`

```diff
-          setSelected(data.countries[0].name);
+          setSelected(data.countries[0]?.name || '');

-      .catch((err) => console.error('Failed to load countries:', err));
+      .catch(() => { /* Backend may not be running yet */ });

-    } catch (err) {
-      console.error(err);
+    } catch {
```

**Why:** Optional chaining prevents crash on empty array. Silent catches are appropriate here since the error states are already handled via `statusMsg` UI.
