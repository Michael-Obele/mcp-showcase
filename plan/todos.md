# Todos: MCP Showcase Implementation

## Phase 1: Setup & Scaffolding

- [ ] Initialize SvelteKit project (`bunx sv create mcp-showcase`)
- [ ] Add Tailwind CSS (`bunx sv add tailwindcss`)
- [ ] Install shadcn-svelte CLI (`npx shadcn-svelte@latest init`)
- [ ] Setup core layout (Nav, Sidebar, Footer)

## Phase 2: Data & Gallery

- [ ] Define the `MCP` data structure (TypeScript interface)
- [ ] Create a local JSON/TS file with current MCP details
- [ ] Build the `MCPCard` component using `Card`, `Badge`, and `Button`
- [ ] Implement search and category filtering using Svelte 5 runes

## Phase 3: Detail View & Install Commands

- [ ] Build a Detail Drawer using `Drawer` (shadcn)
- [ ] Implement the `ConfigTabs` component to show Claude/Cursor/Windsurf configs
- [ ] Add "Copy" buttons with `Sonner` toast notifications
- [ ] Fetch GitHub stars/metadata using the GitHub API (optional)

## Phase 4: Showcase Checklist

- [ ] Create a "Submission Manager" page/section
- [ ] Implement the platform checklist using `Table` and `Checkbox`
- [ ] Add persistence (Local Storage or a small DB like LibSQL/Prisma)

## Phase 5: Deployment

- [ ] Performance audit (Lighthouse)
- [ ] Deploy to Vercel/Netlify
- [ ] Share on Twitter/Bluesky

---

[Back to Index](./index.md)
