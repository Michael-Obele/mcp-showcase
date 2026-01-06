---
title: ServerShowcase
status: draft
owner: Michael Obele
tags:
  - sveltekit
  - mcp
  - shadcn-svelte
  - portfolio
estimated_time: 2 weeks
prototype: false
---

# ServerShowcase

A specialized portfolio website to showcase Model Context Protocol (MCP) servers, provide easy installation commands for various AI tools, and track showcase status across different registries.

## Goals

- **Discovery**: A clean, searchable gallery of all built MCP servers.
- **Documentation**: Automatically display READMEs and feature lists for each MCP.
- **Onboarding**: One-click copy for installation commands (Claude Desktop, Cursor, VS Code, etc.).
- **Tracking**: A checklist for each MCP to see where it has been published (Pulse, Smithery, Glama, etc.).

## Key Features

- **Cards Gallery**: Grid view of MCPs with search and filter (by language, category, etc.).
- **Installation Tabs**: Tabbed interface for multi-tool config (Claude Config JSON, Cursor settings).
- **GitHub Integration**: Direct links to source code and stars count.
- **Showcase Status**: Visual badges/checklist for registry status.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn-svelte](https://shadcn-svelte.com/) (using Bits UI)
- **Deployment**: Vercel / Netlify / Bun

## Navigation

- [Technical Notes](./notes.md)
- [Design Inspiration](./inspiration.md)
- [Showcase Platforms](./platforms.md)
- [Task List](./todos.md)

---

[Back to Plans](../../README.md)
