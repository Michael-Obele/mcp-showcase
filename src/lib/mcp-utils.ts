import type { MCP, MCPInstallConfig } from './types';

/**
 * Generates full installation configurations for an MCP server.
 * If endpoints (SSE/HTTP) are provided, it generates standard Mastra-style configurations.
 * Explicit overrides in mcp.install take precedence.
 */
export function getFullInstallConfig(
	mcp: MCP,
	transport: 'sse' | 'http' | 'stdio' = 'sse'
): MCPInstallConfig {
	const { endpoints: explicitEndpoints, mastra, name, install = {} } = mcp;

	// Derive endpoints if mastra is provided
	const endpoints =
		explicitEndpoints ||
		(mastra
			? {
					sse: `https://${mastra.domain}/api/mcp/${mastra.slug}/sse`,
					http: `https://${mastra.domain}/api/mcp/${mastra.slug}/mcp`
				}
			: undefined);

	// Default template based on Mastra pattern
	const generated: Partial<MCPInstallConfig> = {};

	if (endpoints) {
		const { sse, http } = endpoints;
		// If transport is stdio or http, we often use the http endpoint with a bridge
		const url = transport === 'sse' ? sse : http;

		generated.claude = {
			config: {
				mcpServers: {
					[name]: {
						command: 'npx',
						args: ['-y', 'mcp-remote', url]
					}
				}
			},
			command: `claude mcp add --transport ${transport === 'sse' ? 'sse' : 'stdio'} ${name} ${url}`
		};

		if (transport === 'stdio') {
			generated.cursor = {
				[name]: {
					type: 'stdio',
					command: 'npx',
					args: ['-y', 'mcp-remote', url]
				}
			};
		} else {
			generated.cursor = {
				[name]: {
					type: 'sse',
					url: sse
				}
			};
		}

		generated.windsurf = {
			mcpServers: {
				[name]: {
					url: url,
					transport: transport === 'sse' ? 'sse' : 'stdio'
				}
			}
		};

		generated.vscode = {
			commandPalette: url,
			mcpJson: {
				mcpServers: {
					[name]: {
						command: 'npx',
						args: ['-y', 'mcp-remote', url]
					}
				}
			},
			alternativeJson: {
				[name]: {
					url: url,
					type: transport
				}
			}
		};

		generated.zed = {
			context_servers: {
				[name]: {
					source: 'custom',
					command: 'npx',
					args: ['-y', 'mcp-remote', url],
					env: {}
				}
			}
		};

		generated.cli = `npx -y mcp-remote ${url}`;
		generated.codex = `codex mcp add ${name} --url ${url}`;
		generated.gemini = {
			mcpServers: {
				[name]: {
					command: 'npx',
					args: ['mcp-remote', url]
				}
			}
		};
		generated.opencode = {
			mcp: {
				[name]: {
					type: 'remote',
					url: url,
					enabled: true
				}
			}
		};
	}

	// Merge logic: deep merge for nested objects if needed, but here simple property check is fine
	return {
		claude: install.claude || generated.claude,
		cursor: install.cursor || generated.cursor,
		windsurf: install.windsurf || generated.windsurf,
		vscode: install.vscode || generated.vscode,
		zed: install.zed || generated.zed,
		cli: install.cli || generated.cli,
		codex: install.codex || generated.codex,
		gemini: install.gemini || generated.gemini,
		opencode: install.opencode || generated.opencode
	};
}
