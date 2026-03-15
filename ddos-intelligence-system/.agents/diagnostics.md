# Master Diagnostic & Bug Registry: Project Svalinn
**Source**: Antigravity Diagnostic Subsystem
**Scope**: Dockerization, Deployment, and Security Audit

## 1. Systemic Execution Logs (Raw Console Data)

### 1.1 AWS CLI Initial Failure
```powershell
aws : The term 'aws' is not recognized as the name of a cmdlet...
At line:1 char:1
+ aws --version
```
**Resolution**: Initialized via `winget` at `C:\Program Files\Amazon\AWSCLIV2\aws.exe`.

### 1.2 GitHub CLI Authentication Failure
```powershell
To get started with GitHub CLI, please run: gh auth login
Alternatively, populate the GH_TOKEN environment variable...
```
**Status**: Pending Human Authentication.

### 1.3 AWS Credential Failure
```text
aws: [ERROR]: An error occurred (NoCredentials): Unable to locate credentials. 
You can configure credentials by running "aws configure".
```
**Status**: Pending Human Configuration.

## 2. Technical Friction & Impediments (Academic Analysis)

### 2.1 Environmental Divergence
The host environment lacked pre-configured cloud binaries. The transition to `winget` established a scalable installer pattern for Windows-based node clusters.

### 2.2 GitHub Orchestration Gaps
Separate repository injection (`backend`/`frontend`) requires cryptographic handshake (OAuth/PAT) which cannot be automated without privileged token access.

## 3. High-Priority Security Risks

### 3.1 CORS and WebSocket Vulnerabilities
- **Permissive CORS**: `allow_origins=["*"]` in `server.py` creates a target for CSRF/XSS vectors.
- **WebSocket Auth**: Zero-handshake entry point in `/ws/attacks` allows unauthorized telemetry scraping.

### 3.2 Container Hardening
- **Root-User Default**: Both backend and frontend Dockerfiles lack non-privileged user definitions, increasing the surface area for host-escape exploits.

---
> [!IMPORTANT]
> This folder (`.agents/`) must be reviewed by any subsequent agentic entity before attempting deployment or structural modification.
