# mcp-showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A SvelteKit 5 starter / showcase app with Vite, Tailwind CSS, Prisma, and a small set of UI components and MCP examples.

## Features

- **SvelteKit 5**: Latest SvelteKit with runes and modern patterns
- **Tailwind CSS**: Utility-first CSS framework with custom components
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Authentication**: Simple password-based admin access for protected routes
- **MCP Examples**: Model Context Protocol implementations
- **UI Components**: shadcn-svelte and Bits UI primitives
- **TypeScript**: Full type safety throughout the application

## Quick start

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/Michael-Obele/mcp-showcase.git
   cd mcp-showcase
   npm install
   ```

2. **Set up environment variables:**

   Copy `.env.example` to `.env` and configure the required variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values (see [Environment Variables](#environment-variables) section below).

3. **Set up the database:**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**

   ```bash
   npm run build
   npm run preview
   ```

## Environment Variables

This project requires the following environment variables. Copy `.env.example` to `.env` and update the values:

- `DATABASE_URL`: PostgreSQL connection string for Prisma
- `ADMIN_PASSWORD`: Password for admin access to the checklist feature

Example `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?sslmode=require"
ADMIN_PASSWORD="your_secure_admin_password"
```

## Scripts

Available npm scripts:

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run check` - Run TypeScript and Svelte checks
- `npm run format` - Format code with Prettier
- `npm run lint` - Run linting checks

## Project Structure

```
src/
├── lib/
│   ├── components/          # UI components (shadcn-svelte, Bits UI)
│   ├── server/              # Server-side utilities (Prisma client)
│   ├── remote/              # Remote functions for data fetching
│   ├── assets/              # Static assets
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

## Database (Prisma)

This project uses Prisma ORM with PostgreSQL. The database schema is defined in `prisma/schema.prisma`.

After setting up your `DATABASE_URL`, run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

For database management:

```bash
npx prisma studio  # Open Prisma Studio
npx prisma db push # Push schema changes (for prototyping)
```

## Tech Stack & Conventions

- **Framework**: SvelteKit 5 with runes (`$state`, `$props`, `$derived`, `$effect`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with semantic utility classes
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: Simple password-based admin access
- **Validation**: Valibot for schema validation
- **UI Components**: shadcn-svelte primitives and Bits UI
- **Icons**: Lucide icons via `@lucide/svelte`
- **TypeScript**: Full type safety throughout

### Development Patterns

- Use Svelte 5 runes for reactive state management
- Prefer remote functions (`src/lib/remote/`) for data fetching
- Follow component patterns in `src/lib/components/`
- Use Valibot for input validation
- Run `npm run check` before committing

## Development

Use the provided scripts to validate and format the code:

```bash
npm run check    # TypeScript and Svelte checks
npm run format   # Format code with Prettier
npm run lint     # Run linting checks
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Code Style**: Follow the existing code style (Prettier + ESLint)
2. **Pre-commit Checks**: Run `npm run check` locally before opening PRs
3. **Components**: New components should live under `src/lib/components/` and follow existing patterns
4. **Commits**: Use clear, descriptive commit messages
5. **Issues**: Open an issue first for significant changes

## Key Files

- [`src/lib/index.ts`](src/lib/index.ts) - Library exports and utilities
- [`src/routes/+page.svelte`](src/routes/+page.svelte) - Home page
- [`src/routes/+layout.svelte`](src/routes/+layout.svelte) - Root layout
- [`src/routes/checklist/+page.svelte`](src/routes/checklist/+page.svelte) - MCP-backed checklist example
- [`prisma/schema.prisma`](prisma/schema.prisma) - Database schema
- [`.env.example`](.env.example) - Environment variables template

## License

This project is available under the MIT License — see the `LICENSE` file for details.
