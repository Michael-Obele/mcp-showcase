export interface InstallConfig {
	mode: 'sse' | 'http';
	url: string;
	command?: string;
	args?: string[];
}

export interface ClaudeInstall {
	config: Record<string, unknown>;
	command?: string;
}

export interface CursorInstall {
	[key: string]: unknown;
}

export interface WindsurfInstall {
	[key: string]: unknown;
}

export interface VSCodeInstall {
	commandPalette: string;
	mcpJson: Record<string, unknown>;
}

export interface ZedInstall {
	config?: Record<string, unknown>;
	context_servers?: Record<
		string,
		{
			source: string;
			command: string;
			args: string[];
			env: Record<string, string>;
		}
	>;
	[key: string]: any;
}

export interface MCPInstallConfig {
	claude?: ClaudeInstall;
	cursor?: CursorInstall;
	windsurf?: WindsurfInstall;
	vscode?: VSCodeInstall;
	zed?: ZedInstall | { context_servers: Record<string, any> };
	cli?: string;
	codex?: string;
	gemini?: Record<string, unknown>;
	opencode?: Record<string, unknown>;
}

export interface Tool {
	name: string;
	description: string;
}

export interface Prompt {
	name: string;
	description: string;
	arguments?: { name: string; description: string; required: boolean }[];
}

export interface MCP {
	id: string;
	name: string;
	version?: string;
	description: string;
	tags: string[];
	githubUrl: string;
	features: string[];
	mastra?: {
		domain: string;
		slug: string;
	};
	endpoints?: {
		sse: string;
		http: string;
	};
	install: {
		claude?: ClaudeInstall;
		cursor?: CursorInstall;
		windsurf?: WindsurfInstall;
		vscode?: VSCodeInstall;
		zed?: ZedInstall;
		cli?: string;
		codex?: string;
		gemini?: Record<string, unknown>;
		opencode?: Record<string, unknown>;
	};
	tools?: Tool[];
	prompts?: Prompt[];
	envVars?: { name: string; description: string; required: boolean }[];
	exampleQueries?: string[];
}
