# HyperDDoS Attack Map — System Architecture

## Deployment Topology
```
┌──────────────────────────────────────────────────────────────┐
│                     GitHub (Svalinn repo)                     │
│                    Push to main triggers:                     │
├──────────────────────┬───────────────────────────────────────┤
│                      │                                       │
│   ┌──────────────────▼──────────────┐  ┌────────────────────▼────────┐
│   │     Vercel (Frontend)           │  │     Render (Backend)         │
│   │  • React + Vite + Three.js      │  │  • FastAPI + Gunicorn        │
│   │  • Root: /frontend              │  │  • Docker multi-stage build  │
│   │  • Static site + Edge Middleware│  │  • GZip compression          │
│   │  • GeoIP-based API routing      │  │  • WebSocket streaming       │
│   └──────────────┬──────────────────┘  ├─────────────┬──────────────┤
│                  │                     │  US (Oregon) │ EU (Frankfurt)│
│                  │                     └─────────────┴──────────────┘
│                  │                              ▲
│                  │  WebSocket (wss://)           │
│                  │  REST API (/api/*)            │
│                  └──────────────────────────────-┘
└──────────────────────────────────────────────────────────────┘
```

## Frontend → Backend Interconnection

### WebSocket (Real-time attack stream)
- **File**: `frontend/src/hooks/useWebSocket.js`
- **Resolution order**:
  1. `VITE_WS_US` + `VITE_WS_EU` (multi-region failover)
  2. `VITE_WS_URL` (single endpoint fallback)
  3. Auto-derive from `window.location` (local dev via Vite proxy)
- **Features**: Auto-reconnect with exponential backoff, duplicate detection, multi-endpoint cycling

### REST API (Status, attacks, countries, simulate)
- **File**: `frontend/middleware.js` (Vercel Edge Middleware)
- **Mechanism**: Intercepts `/api/*` requests, reads Vercel's `req.geo.country` header, routes to US or EU Render backend
- **Endpoints**: `/api/status`, `/api/attacks`, `/api/countries`, `/api/simulate_country`

### Environment Variables (Vercel Project Settings)
| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_WS_URL` | Single WebSocket endpoint | `wss://hyperddos-backend-us.onrender.com/ws/attacks` |
| `VITE_API_URL` | Single REST API endpoint | `https://hyperddos-backend-us.onrender.com` |
| `VITE_WS_US` | US WebSocket (multi-region) | `wss://hyperddos-backend-us.onrender.com/ws/attacks` |
| `VITE_WS_EU` | EU WebSocket (multi-region) | `wss://hyperddos-backend-eu.onrender.com/ws/attacks` |
| `VITE_API_US` | US REST API (multi-region) | `https://hyperddos-backend-us.onrender.com` |
| `VITE_API_EU` | EU REST API (multi-region) | `https://hyperddos-backend-eu.onrender.com` |

## Backend Architecture
- **FastAPI** with lifespan-managed background task generating synthetic DDoS events
- **GZipMiddleware** compresses payloads > 1000 bytes
- **Gunicorn** with 4 Uvicorn workers for production scaling
- **WebSocket** broadcasts events to all connected clients in real-time
- **CORS** open for cross-origin Vercel → Render communication
