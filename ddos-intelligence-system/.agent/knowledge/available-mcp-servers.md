# Available MCP Servers (Docker MCP Catalog)

> [!TIP]
> This document helps AI agents understand and use the available MCP servers. Each server provides specialized tools for different tasks.

**Last Updated**: 2026-01-03  
**Docker MCP Toolkit Version**: v0.21.0

## Quick Reference

| Server | Category | Tools | Best For |
|--------|----------|-------|----------|
| `playwright` | Browser Automation | 22 | Web testing, screenshots, form filling |
| `postgres` | Database | 1 | Read-only SQL queries |
| `memory` | Knowledge Management | 9 | Persistent knowledge graphs |
| `context7` | Documentation | 2 | Library/package documentation lookup |
| `sequentialthinking` | Reasoning | 1 | Complex problem-solving |
| `postman` | API Development | 50+ | Collections, environments, mocks |
| `dockerhub` | Container Registry | 13 | Docker image management |
| `aws-core-mcp-server` | Cloud (AWS) | 1 | AWS expert advice |
| `aws-cdk-mcp-server` | Cloud (AWS) | - | AWS CDK operations |
| `aws-diagram` | Cloud (AWS) | - | AWS architecture diagrams |
| `aws-documentation` | Cloud (AWS) | - | AWS documentation lookup |
| `awslabs-cloudtrail` | Cloud (AWS) | - | CloudTrail analysis |
| `next-devtools-mcp` | Web Development | - | Next.js development |
| `node-code-sandbox` | Code Execution | - | Node.js code sandbox |
| `mcp-discord` | Communication | - | Discord integration |
| `mcp-python-refactoring` | Code Quality | - | Python refactoring |
| `github-mcp-server` | IDE Integrated | 30+ | GitHub repo and issue management |
| `supabase-mcp-server` | IDE Integrated | - | (Present but no active tools detected) |

---

## Detailed Server Documentation

### 🌐 Playwright (Browser Automation)

**Docker Image**: `mcp/playwright`  
**Author**: Microsoft  
**License**: Apache 2.0

Browser automation server for web testing, screenshots, and interaction.

#### Key Tools

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to a URL |
| `browser_click` | Click on elements |
| `browser_type` | Type text into fields |
| `browser_fill_form` | Fill multiple form fields |
| `browser_snapshot` | Capture accessibility snapshot (better than screenshot) |
| `browser_take_screenshot` | Take PNG/JPEG screenshots |
| `browser_evaluate` | Execute JavaScript on page |
| `browser_run_code` | Run Playwright code snippets |
| `browser_wait_for` | Wait for text/conditions |
| `browser_tabs` | Manage browser tabs |

#### Usage Configuration

```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp/playwright"]
    }
  }
}
```

---

### 🗄️ PostgreSQL (Database)

**Docker Image**: `mcp/postgres`  
**Author**: ModelContextProtocol  
**License**: MIT

Read-only access to PostgreSQL databases for schema inspection and queries.

#### Key Tools

| Tool | Description |
|------|-------------|
| `query` | Run a read-only SQL query |

#### Usage Configuration

```json
{
  "mcpServers": {
    "postgres": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "POSTGRES_URL",
        "mcp/postgres",
        "$POSTGRES_URL"
      ],
      "env": {
        "POSTGRES_URL": "postgresql://host.docker.internal:5432/mydb"
      }
    }
  }
}
```

---

### 🧠 Memory (Knowledge Graph)

**Docker Image**: `mcp/memory`  
**Author**: ModelContextProtocol  
**License**: MIT

Persistent knowledge graph for maintaining context across sessions.

#### Key Tools

| Tool | Description |
|------|-------------|
| `create_entities` | Create entities in knowledge graph |
| `create_relations` | Create relations between entities |
| `add_observations` | Add observations to entities |
| `search_nodes` | Search knowledge graph |
| `read_graph` | Read entire knowledge graph |
| `open_nodes` | Open specific nodes by name |
| `delete_entities` | Delete entities |
| `delete_relations` | Delete relations |
| `delete_observations` | Delete observations |

#### Usage Configuration

```json
{
  "mcpServers": {
    "memory": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-v", "/local-directory:/local-directory",
        "mcp/memory"
      ]
    }
  }
}
```

---

### 📚 Context7 (Library Documentation)

**Docker Image**: `mcp/context7`  
**Author**: Upstash  
**License**: MIT

Fetch up-to-date documentation for libraries and packages.

#### Key Tools

| Tool | Description |
|------|-------------|
| `resolve-library-id` | Resolve package name to Context7 library ID |
| `get-library-docs` | Fetch documentation for a library |

#### Workflow

1. Call `resolve-library-id` with library name (e.g., "next.js")
2. Use returned ID with `get-library-docs` to fetch documentation

#### Usage Configuration

```json
{
  "mcpServers": {
    "context7": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp/context7"]
    }
  }
}
```

---

### 🤔 Sequential Thinking (Reasoning)

**Docker Image**: `mcp/sequentialthinking`  
**Author**: ModelContextProtocol  
**License**: MIT

Dynamic problem-solving through structured thought sequences with branching and revision.

#### When to Use

- Breaking down complex problems
- Planning with room for revision
- Multi-step solutions
- Problems requiring context maintenance
- Filtering irrelevant information

#### Key Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `thought` | string | Current thinking step |
| `thoughtNumber` | integer | Current thought number |
| `totalThoughts` | integer | Estimated total needed |
| `nextThoughtNeeded` | boolean | Whether more thinking needed |
| `isRevision` | boolean | Revises previous thinking |
| `branchFromThought` | integer | Branching point |

#### Usage Configuration

```json
{
  "mcpServers": {
    "sequentialthinking": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp/sequentialthinking"]
    }
  }
}
```

---

### 📮 Postman (API Development)

**Docker Image**: `mcp/postman`  
**Author**: Postman  
**License**: MIT

Comprehensive API development tools for collections, environments, and mock servers.

#### Key Tool Categories

| Category | Tools |
|----------|-------|
| **Collections** | `createCollection`, `getCollection`, `getCollections`, `putCollection`, `duplicateCollection` |
| **Requests** | `createCollectionRequest`, `createCollectionResponse` |
| **Environments** | `createEnvironment`, `getEnvironment`, `getEnvironments`, `putEnvironment` |
| **Workspaces** | `createWorkspace`, `getWorkspace`, `getWorkspaces` |
| **Mock Servers** | `createMock`, `getMock`, `getMocks`, `publishMock` |
| **Specifications** | `createSpec`, `getSpec`, `getAllSpecs`, `generateCollection` |
| **User** | `getAuthenticatedUser` |

#### Common Workflow

1. Call `getAuthenticatedUser` to get user context
2. Use `getWorkspaces` to find workspace ID
3. Use workspace ID for collection/environment operations

#### Usage Configuration

Requires Postman API key.

---

### 🐳 Docker Hub (Container Registry)

**Docker Image**: `mcp/dockerhub`  
**Author**: Docker  
**License**: Apache 2.0

Manage Docker Hub repositories, images, and tags.

#### Key Tools

| Tool | Description |
|------|-------------|
| `search` | Search Docker Hub repositories |
| `listNamespaces` | List available namespaces |
| `listRepositoriesByNamespace` | List repos in namespace |
| `listRepositoryTags` | List tags in repository |
| `getRepositoryInfo` | Get repository details |
| `createRepository` | Create new repository |
| `checkRepository` | Check if repo exists |
| `dockerHardenedImages` | List Docker Hardened Images |

#### Usage Configuration

```json
{
  "mcpServers": {
    "dockerhub": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "HUB_PAT_TOKEN",
        "mcp/dockerhub",
        "--transport=stdio",
        "--username={{dockerhub.username}}"
      ],
      "env": {
        "HUB_PAT_TOKEN": "your_hub_pat_token"
      }
    }
  }
}
```

---

---

### 🐙 GitHub MCP Server (Integrated)

**Type**: IDE Integrated (Built-in)  
**Provider**: GitHub  

Comprehensive tools for interacting with GitHub repositories, issues, and pull requests directly from the IDE.

#### Key Tools

| Tool | Description |
|------|-------------|
| `create_issue` / `update_issue` | Create and manage issues |
| `list_issues` / `search_issues` | Find and list issues |
| `create_pull_request` | Create new pull requests |
| `list_pull_requests` / `search_pull_requests` | Find and list pull requests |
| `add_issue_comment` | Comment on issues or PRs |
| `get_file_contents` | Read file contents from repo |
| `create_or_update_file` | Create/Update files in repo |
| `push_files` | Push multiple files in one commit |
| `search_code` | Search code across repositories |
| `search_repositories` | Find repositories |
| `list_commits` / `get_commit` | Inspect commit history |

#### Usage
These tools are available automatically in the agent's environment without additional configuration.

---

### ⚡ Supabase MCP Server (Integrated)

**Type**: IDE Integrated (Built-in)  
**Provider**: Supabase

*Note: Server detected in configuration but no active tools or resources were returned during discovery.*

---

### ☁️ AWS Core MCP Server

**Docker Image**: `mcp/aws-core-mcp-server`  
**Author**: AWS Labs  
**License**: Apache 2.0

Starting point for AWS-related queries. Use this first for AWS expert advice.

#### Key Tools

| Tool | Description |
|------|-------------|
| `prompt_understanding` | Understand query and translate to AWS advice |

> [!IMPORTANT]
> Always use this tool **first** when working with AWS to get expert guidance.

#### Usage Configuration

```json
{
  "mcpServers": {
    "aws-core-mcp-server": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp/aws-core-mcp-server"]
    }
  }
}
```

---

## Enabling MCP Servers

To enable a server via Docker MCP:

```powershell
# List all available servers
docker mcp server ls

# Enable a specific server
docker mcp server enable <server-name>

# Inspect server details
docker mcp server inspect <server-name>

# Disable a server
docker mcp server disable <server-name>
```

---

## Best Practices for AI Agents

### Server Selection

1. **Browser tasks** → Use `playwright`
2. **Database queries** → Use `postgres`
3. **Persistent memory** → Use `memory`
4. **Library docs** → Use `context7`
5. **Complex reasoning** → Use `sequentialthinking`
6. **API development** → Use `postman`
7. **Docker images** → Use `dockerhub`
8. **AWS tasks** → Start with `aws-core-mcp-server`

### Common Patterns

- **Chain-of-thought for complex problems**: Use `sequentialthinking` to break down multi-step problems
- **Documentation lookup**: Use `context7` before implementing with unfamiliar libraries
- **Persistent context**: Use `memory` to store insights across sessions
- **Web verification**: Use `playwright` to verify UI changes

---

## Related Resources

- [Docker MCP Toolkit Documentation](https://docs.docker.com/desktop/features/mcp/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Docker MCP Server Configuration](./docker-mcp-server.md)
