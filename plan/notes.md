# Technical & Design Notes

Detailing the architecture, UI components, and implementation strategy for the MCP Showcase.

## Component Strategy (shadcn-svelte)

| Feature           | Component            | Usage                                                                            |
| ----------------- | -------------------- | -------------------------------------------------------------------------------- |
| MCP List          | `Card`               | Individual items in the grid showcasing the name, description, and primary tags. |
| Navigation        | `Sidebar`            | Filter controls (Language, Category) and link to "About MCP".                    |
| Detail View       | `Drawer` or `Dialog` | Sliding detail pane to see full docs without leaving the list.                   |
| Install Commands  | `Tabs`               | Switch between "Claude Desktop", "Cursor", and "Windsurf".                       |
| Notifications     | `Sonner`             | Confirmation when a command is copied to clipboard.                              |
| Progress Tracking | `Table`              | Checklist view for platform submission status.                                   |
| Tags              | `Badge`              | Indicating language (TypeScript, Python) or status (Beta, Official).             |

## Installation Command Generator

Each MCP should have a helper component that generates the correct configuration JSON.

### Example: Claude Desktop Config (JSON)

```json
{
  "mcpServers": {
    "my-cool-server": {
      "command": "npx",
      "args": ["-y", "@user/my-cool-server"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
```

## Svelte 5 Implementation Snippets

Using Svelte 5 runes for state management of filters and the checklist.

### Filter State

```svelte
<script>
  let searchQuery = $state("");
  let selectedTags = $state([]);

  const filteredMCPs = $derived(() => {
    return allMCPs.filter(mcp =>
      mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTags.length === 0 || selectedTags.some(tag => mcp.tags.includes(tag)))
    );
  });
</script>
```

### Copy Implementation (Bits UI hint)

While `shadcn-svelte` provides the button, we can use a pure Svelte logic or a dedicated library like `copy-to-clipboard` (or use `navigator.clipboard`).

---

[Back to Index](./index.md)
