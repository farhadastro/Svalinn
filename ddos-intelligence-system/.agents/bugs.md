# Bug Registry — DDoS Intelligence System

## Summary
Total bugs found: **6** | Fixed: **6** | Remaining: **0**

## Bugs

### BUG-001: Hardcoded localhost URLs in CountrySelector.jsx
- **Type:** API / Production
- **Severity:** 🔴 High
- **File:** `frontend/src/components/CountrySelector.jsx`
- **Description:** Two `fetch()` calls hardcoded `http://localhost:8000/api/countries` and `http://localhost:8000/api/simulate_country`. These bypass the Vite proxy in dev and completely break in production (Docker/Render).
- **Status:** ✅ Fixed

### BUG-002: WebSocket URL crash on missing env var
- **Type:** Runtime
- **Severity:** 🔴 High
- **File:** `frontend/src/hooks/useWebSocket.js`
- **Description:** `App.jsx` reads `import.meta.env.VITE_WS_URL` which is `undefined` when no `.env` file exists. The hook passes `undefined` to `new WebSocket(undefined)`, causing a connection error and infinite reconnect spam.
- **Status:** ✅ Fixed

### BUG-003: Stats overlay always hidden
- **Type:** UI / Logic
- **Severity:** 🟡 Medium
- **File:** `frontend/src/App.jsx`
- **Description:** The left-side stats panel (Events Analyzed, Active Constraints, Peak Throughput + live feed) only became visible when `showDashboard` was `true`. This means the primary HUD was invisible until the user opened the right-side intelligence panel.
- **Status:** ✅ Fixed

### BUG-004: Debug console.log statements in production code
- **Type:** Code Quality
- **Severity:** 🟢 Low
- **File:** `frontend/src/hooks/useWebSocket.js`
- **Description:** `console.log('Connected to DDoS Intelligence Stream')` and `console.log('Disconnected from stream...')` left in production code. Three `console.error` calls also present — one bare in `CountrySelector.jsx`.
- **Status:** ✅ Fixed

### BUG-005: Unused `import math` in backend
- **Type:** Dead Code
- **Severity:** 🟢 Low
- **File:** `backend/simulation/attack_simulator.py`
- **Description:** `import math` on line 10 was imported but never referenced anywhere in the file.
- **Status:** ✅ Fixed

### BUG-006: No `.env.example` for developer onboarding
- **Type:** Configuration / DX
- **Severity:** 🟢 Low
- **File:** `frontend/.env.example` (missing)
- **Description:** The `VITE_WS_URL` env var is used in `App.jsx` and referenced in `docker-compose.yml` but nowhere documented for local development.
- **Status:** ✅ Fixed

### BUG-007: CountrySelector unsafe array access
- **Type:** Runtime
- **Severity:** 🟡 Medium
- **File:** `frontend/src/components/CountrySelector.jsx`
- **Description:** `setSelected(data.countries[0].name)` crashes if the countries array is empty. Changed to `data.countries[0]?.name || ''`.
- **Status:** ✅ Fixed
