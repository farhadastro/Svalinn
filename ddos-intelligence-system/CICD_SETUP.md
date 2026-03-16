# CI/CD Setup Guide (All-in-One Render Blueprint)

Since Vercel routing was skipped, we have pivoted to a **100% Render deployment architecture**. Your repository now contains a complete `render.yaml` Blueprint which defines your frontend and both of your backend servers simultaneously.

## Step 1: Deploying the Entire Stack via Render
Because the Blueprint is fully configured, deploying the entire `hyperddos-attack-map` is essentially a one-click process!

1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click the **New +** button in the top right corner.
3. Select **Blueprint**.
4. Connect your GitHub account and select this repository (`Svalinn`).
5. Render will automatically read `render.yaml` and provision all 3 services at once:
   - `hyperddos-frontend` (Fast static site hosting for your React app)
   - `hyperddos-backend-us` (Oregon Docker instance)
   - `hyperddos-backend-eu` (Frankfurt Docker instance)
6. Click **Apply**.

## Step 2: Continuous Integration (GitHub Actions)
The included GitHub Action (`.github/workflows/deploy.yml`) will continue to run tests (like Python syntax validation) on every commit.

If you choose to disable "Auto-Deploy" in Render and prefer manual deployment triggers, you can set the following secrets in GitHub (**Settings > Secrets and variables > Actions**):
- `RENDER_DEPLOY_HOOK_US`
- `RENDER_DEPLOY_HOOK_EU`
- `RENDER_DEPLOY_HOOK_FRONTEND`

However, the Render Blueprint defaults to automatically redeploying everything whenever it detects a push to your `main` branch, meaning **you do not strictly need any GitHub Secrets** if you use the Blueprint method!
