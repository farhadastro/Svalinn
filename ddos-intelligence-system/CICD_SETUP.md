# CI/CD Secrets Setup Guide

To enable the fast, concurrent deployments to Vercel and Render via GitHub Actions, you must configure the following **Repository Secrets** in GitHub.

## Navigate to Secrets in GitHub
1. Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret** for each of the following:

### Vercel Secrets
These are required for the `npx vercel deploy` command used in the workflow.

1. **`VERCEL_TOKEN`**:
   - Go to your Vercel Account Settings -> **Tokens** (https://vercel.com/account/tokens).
   - Create a new token and paste it as the value for `VERCEL_TOKEN`.

2. **`VERCEL_ORG_ID`**:
   - Get this from your Vercel Project Settings, but usually, Vercel gives you a `.vercel/project.json` file when you run `npx vercel link` locally.
   - If you run `npx vercel link` locally (and authenticate via browser), a `.vercel` folder is created. Open `.vercel/project.json`. The `orgId` value goes here.

3. **`VERCEL_PROJECT_ID`**:
   - From that same `.vercel/project.json` file, copy the `projectId` and paste it here.

### Render Secrets
These trigger the auto-deployments for your backend Web Services securely without exposing your main Render API key.

1. **`RENDER_DEPLOY_HOOK_US`**:
   - Go to your Render Dashboard -> Select your `ddos-backend-us` service -> **Settings**.
   - Scroll down to **Deploy Hook**.
   - Copy the unique deploy hook URL and paste it as the value for this secret.

2. **`RENDER_DEPLOY_HOOK_EU`**:
   - Go to your Render Dashboard -> Select your `ddos-backend-eu` service -> **Settings**.
   - Scroll down to **Deploy Hook**.
   - Copy the unique deploy hook URL and paste it as the value for this secret.

---

Once these 5 secrets are set in GitHub, any push to the `main` branch will automatically and concurrently deploy the frontend to Vercel and trigger the backend Docker build/deployment on Render!
