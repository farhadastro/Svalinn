---
name: deployment-pipeline
description: Deploy the HyperDDoS Attack Map to production. Use when the user asks to "deploy", "push to production", "go live", "host the site", "set up Vercel", "set up Render", or "connect frontend to backend". Covers Vercel frontend deployment, Render backend deployment, and the interconnection between them.
---

# Deployment Pipeline Skill

## Architecture
- **Vercel** = Frontend (React/Vite/Three.js static site + Edge Middleware for GeoIP routing)
- **Render** = Backend (FastAPI Docker containers in US + EU regions)
- **Interconnection** = WebSocket (`useWebSocket.js`) + REST proxy (`middleware.js`)

## When to Use
- User asks to deploy, go live, or host the application
- User asks about connecting frontend to backend
- User asks about environment variables or production configuration
- User mentions Vercel, Render, or deployment URLs

## Deployment Steps

### Backend (Render)
1. Ensure `render.yaml` exists with `hyperddos-backend-us` and `hyperddos-backend-eu` services
2. Push code to GitHub
3. In Render Dashboard: **New + > Blueprint > Select repo > Apply**
4. Note the live URLs from Render dashboard

### Frontend (Vercel)
1. Ensure `frontend/vercel.json` exists with correct framework and build settings
2. In Vercel Dashboard: **Add New > Project > Import repo > Set Root Directory to `frontend`**
3. Add environment variables in Vercel project settings:
   - `VITE_WS_URL` = `wss://<render-backend-url>/ws/attacks`
   - `VITE_API_URL` = `https://<render-backend-url>`
4. Deploy

### Connecting Frontend ↔ Backend
The code is already written to handle this automatically:
- `useWebSocket.js` reads `VITE_WS_URL` / `VITE_WS_US` / `VITE_WS_EU` at build time
- `middleware.js` uses Vercel Edge to proxy `/api/*` to the correct Render backend
- CORS is configured on the backend to allow all origins

## Key Files
- `frontend/src/hooks/useWebSocket.js` — WebSocket connection with multi-region failover
- `frontend/middleware.js` — Vercel Edge Middleware for GeoIP API routing
- `frontend/.env.example` — Template for environment variables
- `frontend/vercel.json` — Vercel project configuration
- `backend/api/server.py` — FastAPI server with CORS + GZip
- `render.yaml` — Render Blueprint for backend services
- `.github/workflows/deploy.yml` — GitHub Actions CI pipeline

## Troubleshooting
- If WebSocket shows "NODE DISCONNECTED": Check that `VITE_WS_URL` points to an active Render backend
- If API calls fail: Ensure CORS `allow_origins=["*"]` is set in `server.py`
- If Render build fails: Check that `backend/Dockerfile` and `requirements.txt` are valid
