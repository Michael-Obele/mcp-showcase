import type { MCP } from '../types';
import { Server as ServerIcon, Database, Globe, CloudRainWind, Cpu } from '@lucide/svelte';

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
		icon: Globe,
		mastra: {
			domain: 'shadcn-svelte.mastra.cloud',
			slug: 'shadcn'
		},
		install: {},
		tools: [
			{
				name: 'shadcn-svelte-list',
				description:
					'List all available shadcn-svelte components, blocks, charts, and documentation sections.'
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
		icon: Cpu,
		mastra: {
			domain: 'tauri-docs.mastra.cloud',
			slug: 'tauri-docs-mcp'
		},
		install: {},
		tools: [
			{
				name: 'list-sections',
				description: 'List all available documentation sections and their use cases.'
			},
			{
				name: 'get-page',
				description: 'Retrieve the content of a specific documentation page.'
			},
			{
				name: 'search',
				description: 'Search the Tauri documentation for specific topics.'
			},
			{
				name: 'get-plugin',
				description: 'Get detailed information about a specific Tauri plugin.'
			}
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
		icon: Cpu,
		mastra: {
			domain: 'rust-docs.mastra.cloud',
			slug: 'rust-docs'
		},
		install: {},
		tools: [
			{
				name: 'search-crates',
				description: 'Search for Rust crates on crates.io.'
			},
			{
				name: 'get-crate-overview',
				description: 'Get overview information for a specific Rust crate.'
			},
			{
				name: 'get-item-docs',
				description: 'Retrieve documentation for specific Rust items (functions, structs, etc.).'
			},
			{
				name: 'list-modules',
				description: 'List all modules in a Rust crate.'
			}
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
		icon: ServerIcon,
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
		icon: ServerIcon,
		mastra: {
			domain: 'layerchart-docs.mastra.cloud',
			slug: 'layerchart-docs'
		},
		install: {},
		tools: [
			{
				name: 'list-docs',
				description: 'List all available documentation pages and component routes.'
			},
			{
				name: 'get-doc',
				description:
					'Get the documentation content for a specific route (text and code from GitHub).'
			},
			{
				name: 'get-source',
				description: 'Fetch raw source code for a documentation page or component implementation.'
			},
			{
				name: 'search-docs',
				description:
					'Search for specific documentation and components within the LayerChart repository.'
			}
		],
		exampleQueries: [
			'How to create a BarChart with LayerChart?',
			'Search LayerChart docs for PieChart examples',
			'What are the props for the AreaChart component?'
		]
	},
	{
		id: 'drizzle-docs',
		name: 'drizzle-docs-mcp',
		description:
			'Mastra MCP server and tooling that provides real-time access to all Drizzle ORM documentation pages with fuzzy search, pre-caching, and flexible content retrieval.',
		tags: ['Drizzle', 'ORM', 'Mastra', 'Documentation', 'Web Scraping'],
		githubUrl: 'https://github.com/Michael-Obele/drizzle-docs',
		features: [
			'Production deployment on Mastra Cloud',
			'Three main MCP tools for comprehensive Drizzle ORM support',
			'Smart Fuzzy Search: Powered by fuse.js, allowing for typos and partial matches.',
			'Pre-caching: Automatically fetches and indexes all 97 documentation pages at startup.',
			'Flexible Content Retrieval: Fetch full pages or specific sections in Markdown, JSON, or Plaintext.',
			'Support for all major AI code editors',
			'HTTP and SSE transport protocols',
			'Real-time web scraping from orm.drizzle.team'
		],
		icon: CloudRainWind,
		mastra: {
			domain: 'drizzle.mastra.cloud',
			slug: 'drizzle-docs-mcp'
		},
		install: {},
		tools: [
			{
				name: 'list_topics',
				description:
					'Discover all 97 available Drizzle ORM documentation pages. Use this to understand the structure or find specific topic slugs.'
			},
			{
				name: 'fetch_page',
				description:
					'Fetch and convert documentation pages to Markdown with optional filtering (slug, format, sections, maxLength).'
			},
			{
				name: 'search_docs',
				description: 'Search the documentation using intelligent fuzzy matching (query, limit).'
			}
		],
		exampleQueries: [
			'Show me how to setup a Postgres schema in Drizzle',
			'List all Drizzle docs topics',
			'Search for relational query examples in Drizzle',
			'How do I handle migrations with Drizzle Kit?',
			'Compare Drizzle select vs relational query builders'
		]
	}
];
