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
	[key: string]: unknown;
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
	description: string;
	tags: string[];
	githubUrl: string;
	features: string[];
	install: {
		claude: ClaudeInstall;
		cursor: CursorInstall;
		windsurf: WindsurfInstall;
		vscode: VSCodeInstall;
		zed?: ZedInstall;
		cli: string;
	};
	tools?: Tool[];
	prompts?: Prompt[];
	envVars?: { name: string; description: string; required: boolean }[];
	exampleQueries?: string[];
}
