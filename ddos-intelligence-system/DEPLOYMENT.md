# Deployment Guide

This guide provides instructions on how to host the DDoS Intelligence System.

## Frontend: Vercel

The frontend is a React application built with Vite. It can be easily hosted on [Vercel](https://vercel.com/).

### Steps to Deploy

1.  **Push your code to GitHub/GitLab/Bitbucket.**
2.  **Import the project into Vercel.**
3.  **Configure the Build Settings:**
    *   **Root Directory:** `ddos-intelligence-system/frontend`
    *   **Framework Preset:** `Vite`
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
4.  **Set Environment Variables:**
    *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com`).
    *   `VITE_WS_URL`: The WebSocket URL of your deployed backend (e.g., `wss://your-backend.onrender.com/ws/attacks`).
5.  **Click Deploy.**

## Backend: Render

Since the backend requires persistent WebSocket connections for real-time attack streaming, Vercel (which uses Serverless Functions) is not suitable for the backend. We recommend using **[Render](https://render.com/)** or a similar service that supports Web Services with WebSockets.

### Steps to Deploy on Render

1.  **Create a new Web Service on Render.**
2.  **Connect your repository.**
3.  **Configure the Web Service:**
    *   **Root Directory:** `ddos-intelligence-system/backend`
    *   **Environment:** `Python`
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `uvicorn api.server:app --host 0.0.0.0 --port 10000`
4.  **Plan:** Select the **Starter** plan (or higher) to ensure the service stays active and maintains WebSocket connections.
5.  **Advanced Configuration:**
    *   Add a `PORT` environment variable set to `10000`.

## Connecting Frontend and Backend

Once both are deployed:
1.  Copy the URL of your Render backend.
2.  Update the `VITE_API_URL` and `VITE_WS_URL` environment variables in your Vercel project settings.
    *   Note: Use `wss://` for the WebSocket URL in production for security.
3.  Redeploy the frontend to apply the changes.
