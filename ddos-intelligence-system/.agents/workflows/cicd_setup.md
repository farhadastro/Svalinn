---
description: How to deploy the HyperDDoS Attack Map — Vercel (Frontend) + Render (Backend) with GitHub CI/CD
---
# Deployment Workflow: HyperDDoS Attack Map

// turbo-all

## Architecture Overview
- **Frontend (React/Vite)** → Hosted on **Vercel** (auto-deploys on push to `main`)
- **Backend (FastAPI/Python)** → Hosted on **Render** via Docker (US + EU instances)
- **Interconnection**: Frontend connects to backend via:
  - `useWebSocket.js`: Resolves WebSocket URL from `VITE_WS_URL` / `VITE_WS_US` / `VITE_WS_EU` env vars
  - `middleware.js`: Vercel Edge Middleware proxies `/api/*` requests to the correct Render backend using GeoIP routing
  - In local dev, Vite's proxy handles `/api` and `/ws` forwarding to `localhost:8000`

## Step 1: Deploy Backend to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New + > Blueprint**
3. Select the `Svalinn` GitHub repository
4. Render reads `render.yaml` and provisions:
   - `hyperddos-backend-us` (Oregon, Docker)
   - `hyperddos-backend-eu` (Frankfurt, Docker)
5. Note the live URLs (e.g., `https://hyperddos-backend-us.onrender.com`)

## Step 2: Deploy Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Add New... > Project**
3. Import the `Svalinn` GitHub repository
4. Set **Root Directory** to `frontend`
5. Add these **Environment Variables** in Vercel's project settings:
   - `VITE_WS_URL` = `wss://hyperddos-backend-us.onrender.com/ws/attacks`
   - `VITE_API_URL` = `https://hyperddos-backend-us.onrender.com`
   - (Optional multi-region):
     - `VITE_WS_US` = `wss://hyperddos-backend-us.onrender.com/ws/attacks`
     - `VITE_WS_EU` = `wss://hyperddos-backend-eu.onrender.com/ws/attacks`
     - `VITE_API_US` = `https://hyperddos-backend-us.onrender.com`
     - `VITE_API_EU` = `https://hyperddos-backend-eu.onrender.com`
6. Click **Deploy**

## Step 3: Verify
1. Open the Vercel deployment URL in your browser
2. Check that the globe loads and the WebSocket status shows "NODE CONNECTED"
3. Verify attack events are streaming in real-time from the Render backend

## Local Development
```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
python -m uvicorn api.server:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```
Vite proxy at `localhost:5173` auto-forwards `/api` and `/ws` to `localhost:8000`.
