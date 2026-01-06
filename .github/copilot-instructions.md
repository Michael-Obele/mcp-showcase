# MCP Showcase - AI Agent Instructions

## Project Overview

This is **ServerShowcase**, a SvelteKit portfolio website for displaying Model Context Protocol (MCP) servers. Features include a searchable gallery of MCP cards, detailed views with installation commands for multiple AI tools (Claude Desktop, Cursor, Windsurf), and submission tracking across registries (Smithery, Glama, Pulse, etc.).

## Tech Stack & Architecture

- **Framework**: SvelteKit 2 with Svelte 5 (runes for state management)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **UI**: shadcn-svelte components (Bits UI) with custom "Lovely Docs" theme (black bg, gold/amber accents)
- **Package Manager**: Bun (use `bunx` for CLI tools like shadcn init)
- **Data**: Local TypeScript/JSON files for MCP server definitions

## Key Patterns & Conventions

### Component Structure

- Use shadcn-svelte components from `$lib/components/ui/` (add via `bunx shadcn-svelte@latest add <component>`)
- Use `@lucide/svelte` for icons (not `lucide-svelte` or `lucide-icons`)
- Apply custom styling with `cn()` utility from `$lib/utils.ts` for Tailwind class merging
- Follow "Lovely Docs" design: black backgrounds, gold highlights (`#FFB800`), white text, subtle borders (`border-white/10`)

### State Management

- Use Svelte 5 runes: `$state()` for reactive variables, `$derived()` for computed values
- Example filter implementation:

  ```svelte
  <script>
  	let searchQuery = $state('');
  	let selectedTags = $state<string[]>([]);

  	const filteredMCPs = $derived(() => {
  		return allMCPs.filter(
  			(mcp) =>
  				mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
  				(selectedTags.length === 0 || selectedTags.some((tag) => mcp.tags.includes(tag)))
  		);
  	});
  </script>
  ```

### Installation Commands

- Generate tool-specific configs (Claude JSON, Cursor settings) using nested `Tabs` components
- Include package manager variants (bun, npm, pnpm, yarn) in command switchers
- Use `Sonner` for copy-to-clipboard confirmations

### File Organization

- MCP data: Define in `$lib/data/mcps.ts` as TypeScript interfaces
- Components: `$lib/components/` (custom) and `$lib/components/ui/` (shadcn)
- Routes: Standard SvelteKit structure in `src/routes/`
- Plan docs: `plan/` folder for project planning and inspiration

## Development Workflows

### Setup & Component Addition

```bash
# Add shadcn components
bunx shadcn-svelte@latest add card badge button tabs sonner drawer table
```

### Code Quality

- **Type Checking**: `bun run check` (svelte-check with TypeScript)
- Always run `bun run check` after every edit to ensure type safety and catch errors early and fix them promptly.

### Deployment

Target: Vercel/Netlify with Bun runtime. Use `@sveltejs/adapter-auto` or switch to specific adapter.

## Key Files to Reference

- `plan/index.md`: Project goals and features
- `plan/notes.md`: Component strategy and Svelte 5 snippets
- `plan/platforms.md`: Registry submission checklist
- `components.json`: shadcn-svelte configuration
- `src/lib/utils.ts`: Utility functions and type helpers

## Common Patterns

- Prefix section headers with `>_` for developer aesthetic
- Use `Badge` components for tags (language, status)
- Implement search/filter with reactive derived state
- Handle installation configs as JSON objects with tool-specific formatting
