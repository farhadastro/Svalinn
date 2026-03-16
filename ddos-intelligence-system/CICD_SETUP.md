# CI/CD Setup Guide (Vercel Frontend + Render Backend)

We are splitting the deployment: your Frontend will be hosted on **Vercel**, and your Backend simultaneously on **Render**. Since you haven't created the Vercel project yet, you do not have a Project ID. We can bypass the complex CLI keys by simply linking Vercel directly to GitHub!

## Step 1: Deploy Backend via Render Blueprint
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click the **New +** button in the top right corner.
3. Select **Blueprint**.
4. Connect your GitHub account and select this repository (`Svalinn`).
5. Render will automatically read `render.yaml` and provision both your US and EU backend servers.

## Step 2: Deploy Frontend via Vercel Native Integration
Vercel is literally built to read GitHub repositories directly without needing GitHub Actions or Secret Keys.

1. Go to the [Vercel Dashboard](https://vercel.com/new).
2. Click **Add New... > Project**.
3. Under "Import Git Repository", select your `Svalinn` repository and click **Import**.
4. **Important**: In the configuration screen, click the **Root Directory** edit button and select the `frontend` folder!
5. Click **Deploy**.

Vercel will now automatically host your frontend, and any time you `git push` to `main`, BOTH Vercel and Render will automatically grab the new code and redeploy simultaneously! No secrets needed!
