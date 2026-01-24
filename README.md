# mcp-showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A SvelteKit 5 starter / showcase app with Vite, Tailwind CSS v4, Prisma, and a small set of UI components plus MCP-backed examples.

## Features

- SvelteKit 5 (runes) + TypeScript
- Tailwind CSS v4
- Prisma ORM (PostgreSQL)
- MCP-backed checklist example
- UI primitives (shadcn-svelte style + Bits UI)
- Simple password-based admin unlock for protected actions

## Getting started

### Prerequisites

- Node.js 18+ (recommended)
- PostgreSQL (optional - database features will be mocked if missing)

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Michael-Obele/mcp-showcase.git
   cd mcp-showcase
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Update `.env` (see [Environment variables](#environment-variables)).

3. Set up the database:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Usage

- App runs at `http://localhost:5173/`
- Checklist demo: `http://localhost:5173/checklist`
- To edit the checklist, click **Unlock** and enter `ADMIN_PASSWORD`

## Environment variables

This project uses two environment variables (see [./.env.example](.env.example)):

- `DATABASE_URL`: PostgreSQL connection string for Prisma (**Optional** - database features will be mocked if missing)
- `ADMIN_PASSWORD`: Password for admin access to the checklist feature

Example `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?sslmode=require"
ADMIN_PASSWORD="your_secure_admin_password"
```

**Security:** Never commit `.env`. Use a strong `ADMIN_PASSWORD` and set secrets via your hosting provider in production.

## Database (Prisma)

After setting `DATABASE_URL`, run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Useful commands:

```bash
npx prisma studio
npx prisma db push
```

If you maintain a database seed, run `npx prisma db seed` (or a project `db:seed` script if configured).

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run check` - Type + Svelte checks
- `npm run format` - Format with Prettier
- `npm run lint` - Prettier check + ESLint

## Project Structure

```
src/
├── lib/
│   ├── components/          # UI components (shadcn-svelte, Bits UI)
│   ├── server/              # Server-side utilities (Prisma client)
│   ├── assets/              # Static assets
│   ├── checklist.remote.ts  # Remote functions for checklist actions
│   ├── types.ts             # TypeScript type definitions
│   ├── utils.ts             # Utility functions
│   └── index.ts             # Library exports
├── routes/                  # SvelteKit routes and pages
│   ├── checklist/           # MCP-backed checklist page
│   ├── +page.svelte         # Home page
│   └── +layout.svelte       # Root layout
├── app.d.ts                 # SvelteKit app types
├── app.html                 # HTML template
└── hooks.server.ts          # Server hooks

prisma/
└── schema.prisma            # Database schema

static/                      # Static assets
plan/                        # Project notes and planning
```

## Deployment

Suggested hosts: Vercel, Netlify, or any Node host that supports SvelteKit. Set `DATABASE_URL` and `ADMIN_PASSWORD` in the host environment.

Build/preview locally:

```bash
npm run build
npm run preview
```

## Contributing

Contributions are welcome.

- Run `npm run check` before opening a PR
- Keep changes consistent with existing patterns under `src/lib/components/`

## Key Files

- [`src/lib/index.ts`](src/lib/index.ts) - Library exports and utilities
- [`src/routes/+page.svelte`](src/routes/+page.svelte) - Home page
- [`src/routes/+layout.svelte`](src/routes/+layout.svelte) - Root layout
- [`src/routes/checklist/+page.svelte`](src/routes/checklist/+page.svelte) - MCP-backed checklist example
- [`prisma/schema.prisma`](prisma/schema.prisma) - Database schema
- [`.env.example`](.env.example) - Environment variables template

## Maintainers & Support

- Maintainer: Michael Obele
- Use GitHub issues for bugs/feature requests

## License

This project is available under the MIT License — see the `LICENSE` file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Acknowledgments

Built with [SvelteKit](https://svelte.dev/), [Prisma](https://prisma.io/), [Tailwind CSS](https://tailwindcss.com/), and inspired by open-source UI libraries.

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) code of conduct.
