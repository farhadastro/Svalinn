# Docker MCP Server Configuration

## Overview

The Docker MCP (Model Context Protocol) server provides AI agents with access to Docker functionality through a standardized protocol. This enables AI assistants to interact with Docker containers, images, and other Docker resources.

## Configuration

The MCP server configuration is stored in `.agent/mcp-servers.json`:

```json
{
  "mcp": {
    "servers": {
      "MCP_DOCKER": {
        "command": "docker",
        "args": [
          "mcp",
          "gateway",
          "run"
        ],
        "type": "stdio"
      }
    }
  }
}
```

### Configuration Fields

| Field | Description |
|-------|-------------|
| `command` | The executable to run (`docker`) |
| `args` | Command arguments: `mcp gateway run` starts the MCP gateway |
| `type` | Communication type: `stdio` for standard input/output |

## Prerequisites

1. **Docker Desktop** must be installed and running
2. **Docker MCP Toolkit** must be available (included in Docker Desktop 4.x+)

## Verification

To verify the Docker MCP setup is working:

```powershell
# Check Docker version
docker --version

# Check Docker MCP toolkit version
docker mcp version

# List available MCP catalog servers
docker mcp catalog ls

# Test gateway help
docker mcp gateway run --help
```

## Verified Environment

- **Docker Version**: 28.4.0 (build d8eb465)
- **Docker MCP Version**: v0.21.0
- **Verification Date**: 2026-01-03

## Usage

The MCP gateway runs as a stdio server, meaning it communicates via standard input/output streams. AI clients that support MCP can connect to this server to:

- Manage Docker containers
- Build and manage Docker images
- Access Docker Compose functionality
- Interact with Docker networks and volumes

## Troubleshooting

### Gateway Won't Start

1. Ensure Docker Desktop is running
2. Check that the Docker daemon is accessible: `docker info`
3. Verify MCP toolkit is installed: `docker mcp version`

### Connection Issues

1. Restart Docker Desktop
2. Check for conflicting MCP servers
3. Review Docker Desktop logs for errors

## Related Resources

- [Docker MCP Toolkit Documentation](https://docs.docker.com/desktop/features/mcp/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
