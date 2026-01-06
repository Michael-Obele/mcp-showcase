export interface Registry {
	name: string;
	url: string;
	description: string;
	submissionMethod: string;
}

export const registries: Registry[] = [
	{
		name: 'MCP Official Registry',
		url: 'https://github.com/modelcontextprotocol/registry',
		description: 'The official source-of-truth registry for MCP servers.',
		submissionMethod: 'PR to registry.json'
	},
	{
		name: 'Smithery',
		url: 'https://smithery.ai/',
		description: 'A dedicated marketplace for discovery and easy installation of MCP servers.',
		submissionMethod: 'Automatic via GitHub App or Manual Submit'
	},
	{
		name: 'Glama',
		url: 'https://glama.ai/mcp',
		description: 'A platform for discovering and interacting with MCP tools.',
		submissionMethod: 'Web submission form'
	},
	{
		name: 'Pulse',
		url: 'https://pulse.build/',
		description: 'Community-driven registry focused on high-quality AI tools.',
		submissionMethod: 'Community submission'
	},
	{
		name: 'Mozilla AI Registry',
		url: 'https://github.com/mozilla-ai/mcp-registry',
		description: "Mozilla's community registry for open-source MCP implementations.",
		submissionMethod: 'PR to repository'
	},
	{
		name: 'Awesome MCP Servers',
		url: 'https://github.com/mctrinh/awesome-mcp-servers',
		description: 'The primary awesome-list for the MCP ecosystem.',
		submissionMethod: 'GitHub PR'
	}
];
