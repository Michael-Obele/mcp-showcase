# Todos: MCP Showcase Implementation

## Phase 1: Setup & Scaffolding

- [x] Initialize SvelteKit project
- [x] Add Tailwind CSS
- [x] Install shadcn-svelte components
- [x] Setup core layout (Nav, Footer) with "Lovely Docs" aesthetic

## Phase 2: Data & Gallery

- [x] Define the `MCP` data structure (TypeScript interface)
- [x] Create a local TS file with current MCP details
- [x] Build the `MCPCard` component
- [x] Implement search and category filtering using Svelte 5 runes

## Phase 3: Detail View & Install Commands

- [x] Build a Detail Dialog (switched from Drawer for better scrolling)
- [x] Implement the `ConfigTabs` component (Claude, Cursor, VS Code, Windsurf, Zed, CLI)
- [x] Add "Copy" buttons with `Sonner` toast notifications
- [x] Add platform-specific info for Codex and Gemini mcp-remote

## Phase 4: Showcase Checklist

- [x] Create a "Submission Manager" route (`/checklist`)
- [x] Implement the platform checklist using `Table` and `Checkbox`
- [x] Add persistence (Local Storage) and lightweight "secret" protection

## Phase 5: Deployment

- [ ] Build & Preview test
- [ ] Push to GitHub
- [ ] Deploy to Vercel/Netlify with Bun runtime

- [ ] Performance audit (Lighthouse)
- [ ] Deploy to Vercel/Netlify
- [ ] Share on Twitter/Bluesky

---

[Back to Index](./index.md)
