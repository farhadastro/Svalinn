---
description: How to setup and run the CI/CD pipeline for DDoS Intelligence System
---
## Protocol for CI/CD Setup

1. **GitHub Repository Preparation**
   - Ensure the user has authenticated via `gh auth login`.
   - Create repositories for backend and frontend if not present.
   - // turbo
   - `gh repo create ddos-intelligence-backend --public --source=./backend --push`
   - `gh repo create ddos-intelligence-frontend --public --source=./frontend --push`

2. **Actions Configuration**
   - In each repository, create a `.github/workflows/deploy.yml`.
   - Add necessary secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).

3. **Verification**
   - Push a change to the `main` branch.
   - Monitoring the "Actions" tab on GitHub.
