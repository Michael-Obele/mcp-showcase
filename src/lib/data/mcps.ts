import type { MCP } from '../types';

export const mcps: MCP[] = [
	{
		id: 'shadcn-svelte',
		name: 'shadcn-svelte-mcp',
		description:
			'Mastra MCP server and tooling that provides real-time access to shadcn-svelte component documentation and developer utilities using web scraping.',
		tags: ['Svelte', 'Mastra', 'shadcn', 'Web Scraping'],
		githubUrl: 'https://github.com/Michael-Obele/shadcn-svelte-mcp',
		features: [
			'Real-time web scraping from shadcn-svelte.com',
			'Bits UI API documentation access',
			'Lucide Svelte icon search (1600+ icons)',
			'Fuzzy search with typo tolerance',
			'Support for HTTP and SSE transports'
		],
		mastra: {
			domain: 'shadcn-svelte.mastra.cloud',
			slug: 'shadcn'
		},
		install: {},
		tools: [
			{
				name: 'shadcn-svelte-list',
				description: 'List all available components, blocks, charts, and documentation sections.'
			},
			{
				name: 'shadcn-svelte-get',
				description:
					'Retrieve detailed content, metadata, and code blocks for a specific component or doc.'
			},
			{
				name: 'shadcn-svelte-icons',
				description: 'Search and browse ~1,600 Lucide Svelte icons with smart filtering.'
			},
			{
				name: 'shadcn-svelte-search',
				description: 'Fuzzy search across the entire shadcn-svelte ecosystem with typo tolerance.'
			},
			{
				name: 'bits-ui-get',
				description: 'Access underlying Bits UI API documentation with AI-optimized content.'
			}
		],
		prompts: [
			{
				name: 'install-component',
				description: 'Step-by-step guide to install a specific shadcn-svelte component.'
			},
			{ name: 'setup-theming', description: 'Guide to set up custom theming and CSS variables.' },
			{
				name: 'cli-usage',
				description: 'Comprehensive guide for using shadcn-svelte CLI commands.'
			},
			{ name: 'project-init', description: 'Initialize a new shadcn-svelte project from scratch.' }
		],
		exampleQueries: [
			'Show me how to install the shadcn-svelte button component',
			'List all available shadcn-svelte components',
			'Search for date picker components in shadcn-svelte',
			'What are the API details for the Button component?',
			'Search for Lucide icons related to "user profile"'
		]
	},
	{
		id: 'tauri-docs',
		name: 'tauri-docs',
		description:
			'Mastra MCP server providing access to Tauri documentation from tauri.app with advanced caching and search.',
		tags: ['Rust', 'Tauri', 'Mastra', 'Documentation'],
		githubUrl: 'https://github.com/Michael-Obele/tauri-docs',
		features: [
			'Real-time fetching from tauri.app',
			'Advanced LRU caching',
			'Clean HTML output',
			'Guided prompts for common workflows'
		],
		mastra: {
			domain: 'tauri-docs.mastra.cloud',
			slug: 'tauri-docs'
		},
		install: {},
		tools: [
			{ name: 'tauri-docs-search', description: 'Search through Tauri documentation.' },
			{ name: 'tauri-docs-get', description: 'Retrieve specific Tauri documentation pages.' }
		],
		exampleQueries: [
			'How do I set up a new Tauri project?',
			'Search Tauri docs for window customization',
			'How to use the Tauri HTTP client?'
		]
	},
	{
		id: 'rust-docs',
		name: 'rust-docs',
		description: 'Mastra MCP server for searching and retrieving official Rust documentation.',
		tags: ['Rust', 'Mastra', 'Documentation'],
		githubUrl: 'https://github.com/Michael-Obele/rust-docs',
		features: [
			'Official Rust documentation search',
			'Standard library API reference',
			'Crate documentation support'
		],
		mastra: {
			domain: 'rust-docs.mastra.cloud',
			slug: 'rust-docs'
		},
		install: {},
		tools: [
			{ name: 'rust-docs-search', description: 'Search official Rust documentation.' },
			{ name: 'rust-docs-get', description: 'Fetch details for specific Rust modules or types.' }
		],
		exampleQueries: [
			'Search Rust docs for Option enum',
			'How to use Mutex in Rust?',
			'Search for Vec::with_capacity examples'
		]
	},
	{
		id: 'go-docs',
		name: 'go-docs',
		description: 'Mastra MCP server for Go programming language documentation and package search.',
		tags: ['Go', 'Mastra', 'Documentation'],
		githubUrl: 'https://github.com/Michael-Obele/go-docs',
		features: [
			'Go package documentation search',
			'Standard library reference',
			'Function signature lookup'
		],
		mastra: {
			domain: 'go-docs.mastra.cloud',
			slug: 'go-docs'
		},
		install: {},
		tools: [
			{ name: 'go-docs-search', description: 'Search Go packages and documentation.' },
			{ name: 'go-docs-get', description: 'Retrieve Go package or function details.' }
		],
		exampleQueries: [
			'Search Go docs for net/http package',
			'How to use context in Go?',
			'Find Go examples for json.Marshal'
		]
	},
	{
		id: 'layerchart-docs',
		name: 'layerchart-docs',
		description:
			'Mastra MCP server for searching and retrieving LayerChart documentation (Svelte charting library).',
		tags: ['Svelte', 'Charts', 'LayerChart', 'Mastra', 'Documentation'],
		githubUrl: 'https://github.com/Michael-Obele/layerchart-docs',
		features: [
			'LayerChart component documentation search',
			'Chart example retrieval',
			'API reference for visualization components'
		],
		mastra: {
			domain: 'layerchart-docs.mastra.cloud',
			slug: 'layerchart-docs'
		},
		install: {},
		tools: [
			{ name: 'layerchart-docs-search', description: 'Search LayerChart documentation.' },
			{ name: 'layerchart-docs-get', description: 'Fetch details for LayerChart components.' }
		],
		exampleQueries: [
			'How to create a BarChart with LayerChart?',
			'Search LayerChart docs for PieChart examples',
			'What are the props for the AreaChart component?'
		]
	}
];
