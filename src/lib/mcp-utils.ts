import type { MCP, MCPInstallConfig } from './types';

/**
 * Generates full installation configurations for an MCP server.
 * If endpoints (SSE/HTTP) are provided, it generates standard Mastra-style configurations.
 * Explicit overrides in mcp.install take precedence.
 */
export function getFullInstallConfig(
	mcp: MCP,
	transport: 'sse' | 'http' = 'sse'
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
			command: `claude mcp add --transport ${transport} ${name} ${url}`
		};

		generated.cursor = {
			[name]: {
				type: transport,
				url: url
			}
		};

		generated.windsurf = {
			mcpServers: {
				[name]: {
					url: url,
					transport: transport
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
		gemini: install.gemini || generated.gemini
	};
}
