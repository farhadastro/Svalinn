---
description: How to run the DDoS Intelligence System locally for development
---
# Local Development Workflow

// turbo-all

## Prerequisites
- Python 3.11+
- Node.js 20+
- npm

## Step 1: Start Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn api.server:app --host 0.0.0.0 --port 8000 --reload
```

## Step 2: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

## Step 3: Open Browser
Navigate to `http://localhost:5173`. The Vite proxy forwards `/api` and `/ws` to `localhost:8000` automatically.

## Notes
- No environment variables needed for local dev (auto-derived from `window.location`)
- Backend generates synthetic attack events every 1-3 seconds
- WebSocket auto-reconnects with exponential backoff
