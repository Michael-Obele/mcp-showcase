# GitHub Copilot Instructions - Standard Project Template

## Tech Stack & Architecture

- **Runtime & Tooling**: Bun (`bun`, `bunx`) is the preferred package manager and task runner.
- **Framework**: SvelteKit 5 (using Runes: `$state`, `$props`, `$derived`, `$effect`).
- **Styling**: Tailwind CSS v4. Prefer semantic classes (e.g., `btn-primary`, `text-muted-foreground`).
- **Database**: Prisma ORM with PostgreSQL. Use a singleton client (typically at `$lib/prisma` or `$lib/server/db`).
- **Authentication**: Better Auth (preferred) or WorkOS.
- **Icons**: Use `@lucide/svelte` (NOT `lucide-svelte`). Import icons as components: `import { IconName } from '@lucide/svelte'`.
- **Components**: shadcn-svelte primitives and Bits UI.

## Coding Conventions

### Quality Gate

- **Proactive Checking**: Run `bun check` immediately after substantive edits to catch regressions or type errors.
- **Error Handling**: Only warnings can be ignored; errors must be fixed immediately. Use `<svelte:boundary>` for async operations to handle loading and error states gracefully.

### Svelte 5 Runes

Always use Svelte 5 runes for reactivity. Never use legacy `export let` or `$:`.

- `$state(value)`: Declare reactive state. Use `$state.raw` for large objects/arrays that don't need deep reactivity.
- `$props()`: Receive component props. Destructure for clarity: `let { prop1, prop2 } = $props();`.
- `$derived(expression)`: Declare derived state. Use `$derived.by(() => ...)` for complex logic.
- `$effect(() => ...)`: Handle side effects (DOM, timers, etc.). Avoid for state synchronization.
- `$bindable()`: Mark a prop as bindable for two-way communication.
- `$inspect(value)`: Debug reactive state in development.
- **Events**: Use modern event attributes (e.g., `onclick`, `onsubmit`, `onchange`) directly on elements.

### SvelteKit State Management

- Prefer `$app/state` (e.g., `import { page } from '$app/state'`) over legacy `$app/stores` for accessing `page`, `navigating`, `updated`, etc.

### Data Fetching & Mutations (Remote Functions)

Default to **Remote Functions** (experimental `@sveltejs/kit` features or standard patterns) over `+page.server.ts` actions for most mutations.

- **Location**: Place remote functions in `src/lib/remote/` with the `.remote.ts` extension.
- **Barrel Exports**: Use `src/lib/remote/index.ts` to re-export all functions individually (not `export *`) to allow for better documentation and discovery.
- **Flavors**:
  - `query`: For reading dynamic data. Supports `refresh()`, `loading`, `error`.
  - `form`: For mutations via `<form>`. Supports progressive enhancement via `enhance`.
  - `command`: For mutations triggered by scripts/buttons without a form.
  - `prerender`: For data that can be fetched at build time.
- **Validation**: Always validate inputs using a Standard Schema library, preferably **Valibot**.
- **Client-side Validation**: Use `preflight(schema)` for client-side validation before submission where applicable.
- **Efficiency**: Use `query.batch` for multiple related fetches and `submit().updates(query)` for efficient post-mutation UI updates.

### Database Access

- Default to using a singleton Prisma client.
- Schema changes: Use `bunx prisma db push` for rapid prototyping and `bunx prisma migrate dev` for stable environments.

### Styling & UI Design

- **Gradients**: NEVER use gradients; prefer solid colors, clean layouts, and professional minimalist aesthetics.
- **Tailwind v4**: Use semantic tokens from the CSS configuration. Avoid hardcoded HSL/Hex strings in components.
- **Responsive**: Use standard Tailwind responsive prefixes (e.g., `lg:flex-row`).
- **Utility**: Use a `cn` utility (clsx + tailwind-merge) for conditional class merging.

## Key Files & Directories Pattern

- `src/lib/remote/`: Logic for data fetching and mutations.
- `src/lib/components/ui/`: shadcn-svelte / primitive UI components.
- `src/routes/`: Router logic. Use `+page.server.ts` or `+layout.server.ts` ONLY for initial `load` functions.
- `static/`: Static assets.

## Common Workflows

- **Development**: `bun run dev`
- **Type Checking**: `bun run check`

## AI Agent Integration

- **Memory MCP**: Persist useful context by writing to Memory MCP during work to maintain consistency across sessions.
- **Documentation**: Use `mcp_svelte_get-documentation` for the latest Svelte 5/Kit logic and `mcp_svelte_svelte-autofixer` to validate components before finalizing.
