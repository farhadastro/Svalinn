# DDoS Intelligence System — Repository Workflow

## Purpose
A full-stack, real-time DDoS attack map simulator for academic/analytical visualization. Displays synthetic cyber threat streams on an interactive 3D globe with live metrics, severity scoring, and mitigation dashboards.

**All data is procedurally generated — no real attacks.**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend Runtime | Python 3.11 |
| Backend Framework | FastAPI 0.115.0 + Uvicorn 0.30.0 |
| Real-time Transport | WebSockets (via `websockets` 13.0) |
| Data Models | Pydantic 2.9.0 |
| Frontend Framework | React 18.3 |
| Build Tool | Vite 5.4 |
| 3D Rendering | Three.js 0.169 via @react-three/fiber 8.17 |
| Charts | Recharts 2.13 |
| Globe Data | GeoJSON (countries.json, ~14MB) |
| Containerization | Docker + docker-compose |
| Deployment | Render.com (render.yaml) |

## Architecture

```
┌──────────────────────┐     WebSocket (ws://host/ws/attacks)     ┌──────────────────────┐
│   Python Backend     │ ──────────────────────────────────────►  │   React Frontend     │
│   (FastAPI/Uvicorn)  │                                          │   (Vite/Three.js)    │
│                      │     REST API (/api/*)                    │                      │
│   - attack_simulator │ ◄──────────────────────────────────────  │   - Globe (3D)       │
│   - geo_data         │                                          │   - Dashboard        │
│   - server.py        │                                          │   - CountrySelector  │
└──────────────────────┘                                          └──────────────────────┘
```

### Backend Modules
- `api/server.py` — FastAPI app with REST + WebSocket endpoints, background attack generator
- `simulation/attack_simulator.py` — Statistical attack event generator (9 attack types, burst modeling)
- `simulation/geo_data.py` — 20 countries with coordinates, weighted source/target probabilities

### Frontend Components
- `App.jsx` — Root layout: 3D canvas, top bar, stats overlay, dashboard toggle
- `Globe.jsx` — Three.js Earth sphere with GeoJSON country borders and attack arcs
- `AttackArc.jsx` — Animated 3D bezier curves from source → destination with particle trails
- `Dashboard.jsx` — Right slide-out panel: vector analysis, traffic metrics (Recharts), geo intelligence, mitigation
- `CountrySelector.jsx` — UI to force attacks from a specific country via REST API
- `useWebSocket.js` — Auto-reconnecting WebSocket hook with dedup buffer

### API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/status` | System status, uptime, connection count |
| GET | `/api/attacks` | Recent attack events (default: 50) |
| GET | `/api/countries` | All 20 simulated countries |
| POST | `/api/simulate_country` | Force attacks from a specific country |
| WS | `/ws/attacks` | Real-time attack event stream |

## Running Locally

**Backend (Terminal 1):**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn api.server:app --host 0.0.0.0 --port 8000
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173
