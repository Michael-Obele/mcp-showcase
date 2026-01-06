# Design Inspiration: Lovely Docs

Using the "Lovely Docs" aesthetic as inspiration for the **ServerShowcase** project. The design is characterized by high contrast, minimalist typography, and deep interactivity.

## Visual Identity

- **Primary Colors**: Black background (#000000) with Gold/Amber highlights (#FFB800) and White text.
- **Typography**: Clean sans-serif (e.g., Inter or Geist). Headlines use a monospaced-style prefix like `>_`.
- **Contrast**: Components use subtle borders (e.g., `border-white/10`) rather than heavy backgrounds.

## Implementation Details (shadcn-svelte + Svelte 5)

### 1. The Hero Section

A minimalist centered header with a specific gold primary button.

- **Component**: `Button` (Variant: `default`) with a custom class for the gold background.
- **Prefix**: The `>_` symbol should be used before main section headers for a developer-focused feel.

### 2. Multi-Level Command Switcher

The inspiration image shows a complex switcher for:

1. **Package Managers** (npm, pnpm, yarn, bun)
2. **AI Clients** (Cursor, VS Code, Claude Desktop, Claude Code, Gemini CLI, etc.)

We will implement this using nested or parallel `Tabs.Root` components.

#### Svelte 5 Usage:

````html
<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";

  let client = $state("cursor");
  let pm = $state("bun");

  const installCmd = $derived(() => {
    const commands = {
      bun: "bunx mcp-remote https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/sse",
      npm: "npx mcp-remote https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/sse",
      pnpm: "pnpm dlx mcp-remote https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/sse",
      yarn: "yarn dlx mcp-remote https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/sse",
    };
    return commands[pm];
  });
</script>

<Tabs.Root bind:value="{pm}">
  <!-- Package manager triggers -->
</Tabs.Root>

<Tabs.Root bind:value="{client}">
  <!-- AI client triggers with icons -->
</Tabs.Root>

<div class="code-block">
  <code>{installCmd()}</code>
  <CopyButton text="{installCmd()}" />
</div>

<!-- Example: add the hosted shadcn-svelte MCP server from our project (see https://github.com/Michael-Obele/shadcn-svelte-mcp/blob/main/README.md) -->
<div class="card mt-4">
  ```json { "mcpServers": { "shadcn-svelte": { "type": "sse", "url":
  "https://shadcn-svelte.mastra.cloud/api/mcp/shadcn/sse" } } }
</div>
````

</div>
```

### 3. Tree-based Directory Structure

The inspiration uses a visual "Directory Structure" to show where docs are placed.

- **Component**: A custom recursive component or a stylized `Table`/`Card` content area.
- **Iconography**: Use `lucide-svelte` icons like `File`, `Folder`, `Braces`.

### 4. Interactive Checklist

A "Submission Status" tracker as requested by the user.

- **Component**: `Checkbox` combined with `Label` inside a `Card`.
- **Status Badges**: `Badge` (Variants: `outline` or custom gold).

## Key Components from shadcn-svelte

- **Tabs**: Crucial for the installer switcher.
- **Card**: For organizing the directory structure view and sectioning content.
- **Button**: Specifically for the "Read the docs" gold CTA.
- **Checkbox**: For the MCP submission checklist.
- **Tooltip**: For icon-only buttons in the client switcher.
- **Sonner**: For "Copied!" notifications.

---

[Back to Index](./index.md)
