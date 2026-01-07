<script lang="ts">
	import { mcps } from '$lib/data/mcps';
	import type { MCP } from '$lib/types';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from '$lib/components/ui/tabs';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import {
		Search,
		Github,
		Copy,
		Check,
		Terminal,
		Zap,
		MessageSquare,
		Settings
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { getFullInstallConfig } from '$lib/mcp-utils';

	let searchQuery = $state('');
	let selectedMcp = $state<MCP | null>(null);
	let isDialogOpen = $state(false);
	let preferredTransport = $state<'sse' | 'http'>('http');

	let installConfig = $derived(
		selectedMcp ? getFullInstallConfig(selectedMcp, preferredTransport) : null
	);

	let filteredMcps = $derived(
		mcps.filter((mcp) => {
			const query = searchQuery.toLowerCase();
			return (
				mcp.name.toLowerCase().includes(query) ||
				mcp.description.toLowerCase().includes(query) ||
				mcp.tags.some((tag) => tag.toLowerCase().includes(query))
			);
		})
	);

	function openDialog(mcp: MCP) {
		selectedMcp = mcp;
		isDialogOpen = true;
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		toast.success('Copied to clipboard');
	}

	function formatConfig(config: Record<string, unknown>) {
		return JSON.stringify(config, null, 2);
	}
</script>

{#snippet codeCpy(code: string)}
	<div class="relative mt-2 rounded-md border border-border bg-muted/50 p-4 font-mono text-sm">
		<ScrollArea orientation="horizontal" class="pb-2">
			<pre class="text-foreground/90">{code}</pre>
		</ScrollArea>
		<Button
			variant="ghost"
			size="icon"
			class="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
			onclick={() => copyToClipboard(code)}
		>
			<Copy class="h-4 w-4" />
		</Button>
	</div>
{/snippet}

<div class="relative container mx-auto px-4 py-8">
	<header class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
			Server<span class="text-primary">Showcase</span>
		</h1>
		<p class="mb-8 text-lg text-muted-foreground">
			Discover specialized MCP servers for your AI workflows.
		</p>

		<div class="relative mx-auto max-w-xl">
			<Search class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search servers..."
				class="h-12 border-border bg-background/50 pl-10 text-lg focus-visible:ring-primary"
				bind:value={searchQuery}
			/>
		</div>
	</header>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredMcps as mcp (mcp.id)}
			<button
				class="group flex h-full cursor-pointer flex-col text-left transition-all hover:scale-[1.02] focus:outline-none"
				onclick={() => openDialog(mcp)}
			>
				<Card.Root
					class="flex h-full w-full flex-col border-border bg-background transition-colors hover:border-primary/50 hover:bg-accent/5"
				>
					<Card.Header>
						<div class="flex items-start justify-between">
							<Card.Title class="text-xl font-semibold text-primary">{mcp.name}</Card.Title>
							<Terminal
								class="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
							/>
						</div>
						<Card.Description class="mt-2 line-clamp-2 min-h-10">
							{mcp.description}
						</Card.Description>
					</Card.Header>
					<Card.Content class="grow">
						<div class="flex flex-wrap gap-2">
							{#each mcp.tags as tag (tag)}
								<Badge
									variant="outline"
									class="border-border hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
								>
									{tag}
								</Badge>
							{/each}
						</div>
					</Card.Content>
					<Card.Footer class="border-t border-border/50 pt-4 text-sm text-muted-foreground">
						<div class="flex items-center gap-2">
							<Github class="h-4 w-4" />
							<span>View Details</span>
						</div>
					</Card.Footer>
				</Card.Root>
			</button>
		{/each}
	</div>

	<Dialog.Root bind:open={isDialogOpen}>
		<Dialog.Content
			class="flex min-h-125 flex-col gap-0 border-primary/20 bg-background p-0 sm:max-h-[90vh] sm:max-w-4xl"
		>
			{#if selectedMcp}
				<div class="scrollbar-thin scrollbar-thumb-primary/20 flex-1 overflow-y-auto p-6">
					<Dialog.Header class="px-0">
						<div class="mb-2 flex items-center justify-between">
							<Dialog.Title class="text-3xl font-bold text-primary">{selectedMcp.name}</Dialog.Title
							>
							<div class="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									href={selectedMcp.githubUrl}
									target="_blank"
									class="border-border hover:border-primary hover:text-primary"
								>
									<Github class="mr-2 h-4 w-4" />
									GitHub
								</Button>
							</div>
						</div>
						<Dialog.Description class="text-lg">
							{selectedMcp.description}
						</Dialog.Description>
					</Dialog.Header>

					<div class="mt-8 space-y-8 pb-8">
						<section>
							<h3 class="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
								<Check class="h-5 w-5 text-primary" />
								Features
							</h3>
							<ul class="grid gap-2 text-muted-foreground sm:grid-cols-2">
								{#each selectedMcp.features as feature (feature)}
									<li class="flex items-start gap-2">
										<div class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"></div>
										<span>{feature}</span>
									</li>
								{/each}
							</ul>
						</section>

						{#if selectedMcp.tools}
							<section>
								<h3 class="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
									<Zap class="h-5 w-5 text-primary" />
									Available Tools
								</h3>
								<div class="grid gap-3 sm:grid-cols-2">
									{#each selectedMcp.tools as tool (tool.name)}
										<div class="rounded-lg border border-border/50 bg-muted/20 p-3">
											<div class="font-mono text-sm font-semibold text-primary">{tool.name}</div>
											<div class="mt-1 text-sm text-muted-foreground">{tool.description}</div>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						{#if selectedMcp.prompts}
							<section>
								<h3 class="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
									<MessageSquare class="h-5 w-5 text-primary" />
									Guided Prompts
								</h3>
								<div class="grid gap-3 sm:grid-cols-2">
									{#each selectedMcp.prompts as prompt (prompt.name)}
										<div class="rounded-lg border border-border/50 bg-muted/20 p-3">
											<div class="font-mono text-sm font-semibold text-primary">
												{prompt.name}
											</div>
											<div class="mt-1 text-sm text-muted-foreground">{prompt.description}</div>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						{#if selectedMcp.exampleQueries}
							<section>
								<h3 class="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
									<Search class="h-5 w-5 text-primary" />
									Example Usage
								</h3>
								<ul class="space-y-2 text-muted-foreground">
									{#each selectedMcp.exampleQueries as query (query)}
										<li class="flex items-start gap-3 italic">
											<span class="text-primary/40">"</span>
											<span>{query}</span>
											<span class="text-primary/40">"</span>
										</li>
									{/each}
								</ul>
							</section>
						{/if}

						<Separator class="bg-border/50" />

						<section>
							<div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<h3 class="flex items-center gap-2 text-lg font-semibold text-foreground">
									<Settings class="h-5 w-5 text-primary" />
									Installation
								</h3>
								<div class="flex items-center space-x-2 rounded-lg bg-muted/30 px-3 py-1.5">
									<Label for="transport-toggle" class="text-xs font-medium text-muted-foreground"
										>SSE</Label
									>
									<Switch
										id="transport-toggle"
										checked={preferredTransport === 'http'}
										onCheckedChange={(checked) => (preferredTransport = checked ? 'http' : 'sse')}
									/>
									<Label for="transport-toggle" class="text-xs font-medium text-primary">HTTP</Label>
								</div>
							</div>
							{#if installConfig}
								<Tabs.Root value="cursor" class="w-full">
									<Tabs.List
										class="w-full justify-start overflow-x-auto border border-border/50 bg-muted/20 p-1"
									>
										{#each (Object.keys(installConfig) as Array<keyof typeof installConfig>).filter((k) => k !== 'codex' && k !== 'gemini' && installConfig[k]) as platform (platform)}
											<Tabs.Trigger
												value={platform}
												class="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
											>
												{platform === 'vscode' ? 'VS Code' : platform}
											</Tabs.Trigger>
										{/each}
									</Tabs.List>

									<Tabs.Content value="cursor" class="mt-4">
										<p class="mb-2 text-sm text-muted-foreground">
											Add as a <strong class="text-primary uppercase">{preferredTransport}</strong> type
											MCP server in Cursor settings:
										</p>
										{@render codeCpy(formatConfig(installConfig.cursor!))}
									</Tabs.Content>

									<Tabs.Content value="vscode" class="mt-4">
										<Tabs.Root value="palette" class="w-full">
											<Tabs.List class="grid w-full grid-cols-2 bg-muted/40 p-1">
												<Tabs.Trigger value="palette">Command Palette</Tabs.Trigger>
												<Tabs.Trigger value="json">mcp.json</Tabs.Trigger>
											</Tabs.List>
											<Tabs.Content value="palette" class="mt-4">
												<p class="mb-2 text-sm text-muted-foreground">
													Run <strong>MCP: Add Server</strong> (Cmd/Ctrl+Shift+P) and paste:
												</p>
												{@render codeCpy(installConfig.vscode!.commandPalette)}
											</Tabs.Content>
											<Tabs.Content value="json" class="mt-4">
												<p class="mb-2 text-sm text-muted-foreground">
													Add to your <strong>.vscode/mcp.json</strong> or user-level config:
												</p>
												{@render codeCpy(formatConfig(installConfig.vscode!.mcpJson))}
											</Tabs.Content>
										</Tabs.Root>
									</Tabs.Content>

									<Tabs.Content value="claude" class="mt-4">
										<Tabs.Root value="config" class="w-full">
											<Tabs.List class="grid w-full grid-cols-2 bg-muted/40 p-1">
												<Tabs.Trigger value="config">Config File</Tabs.Trigger>
												<Tabs.Trigger value="cli">CLI Command</Tabs.Trigger>
											</Tabs.List>
											<Tabs.Content value="config" class="mt-4">
												<p class="mb-2 text-sm text-muted-foreground">
													Add to your <strong>claude_desktop_config.json</strong> using
													<strong class="text-primary uppercase">{preferredTransport}</strong>:
												</p>
												{@render codeCpy(formatConfig(installConfig.claude!.config))}
											</Tabs.Content>
											<Tabs.Content value="cli" class="mt-4">
												<p class="mb-2 text-sm text-muted-foreground">
													Run this command for <strong>Claude Code</strong>:
												</p>
												{@render codeCpy(installConfig.claude!.command || '')}
											</Tabs.Content>
										</Tabs.Root>
									</Tabs.Content>

									<Tabs.Content value="windsurf" class="mt-4">
										<p class="mb-2 text-sm text-muted-foreground">
											Add to Windsurf configuration using
											<strong class="text-primary uppercase">{preferredTransport}</strong>:
										</p>
										{@render codeCpy(formatConfig(installConfig.windsurf!))}
									</Tabs.Content>

									<Tabs.Content value="zed" class="mt-4">
										<p class="mb-2 text-sm text-muted-foreground">Add to Zed settings.json:</p>
										{#if installConfig.zed}
											<Tabs.Root value="config" class="w-full">
												<Tabs.List class="grid w-full grid-cols-2 bg-muted/40 p-1">
													<Tabs.Trigger value="config">Config</Tabs.Trigger>
													<Tabs.Trigger value="source">Install Source</Tabs.Trigger>
												</Tabs.List>
												<Tabs.Content value="config" class="mt-4">
													{@render codeCpy(
														formatConfig((installConfig.zed as any).config || installConfig.zed)
													)}
												</Tabs.Content>
												<Tabs.Content value="source" class="mt-4">
													<p class="mb-2 text-xs text-muted-foreground italic">
														Requires an extension to serve as the MCP host:
													</p>
													{@render codeCpy(
														formatConfig(
															(installConfig.zed as any).context_servers?.[selectedMcp.name]
																?.source || 'custom'
														)
													)}
												</Tabs.Content>
											</Tabs.Root>
										{:else}
											<p class="text-sm italic">Zed configuration not available.</p>
										{/if}
									</Tabs.Content>

									<Tabs.Content value="cli" class="mt-4">
										<Tabs.Root value="direct" class="w-full">
											<Tabs.List
												class="w-full justify-start overflow-x-auto border border-border/50 bg-muted/40 p-1"
											>
												<Tabs.Trigger value="direct">Direct</Tabs.Trigger>
												{#if installConfig.codex}
													<Tabs.Trigger value="codex">Codex</Tabs.Trigger>
												{/if}
												{#if installConfig.gemini}
													<Tabs.Trigger value="gemini">Gemini</Tabs.Trigger>
												{/if}
											</Tabs.List>
											<Tabs.Content value="direct" class="mt-4">
												<p class="mb-2 text-sm text-muted-foreground">
													Test the MCP server directly:
												</p>
												{@render codeCpy(installConfig.cli!)}
											</Tabs.Content>
											{#if installConfig.codex}
												<Tabs.Content value="codex" class="mt-4">
													<p class="mb-2 text-sm text-muted-foreground">Run via Codex CLI:</p>
													{@render codeCpy(installConfig.codex)}
												</Tabs.Content>
											{/if}
											{#if installConfig.gemini}
												<Tabs.Content value="gemini" class="mt-4">
													<p class="mb-2 text-sm text-muted-foreground">
														Run via Gemini mcp-remote:
													</p>
													{@render codeCpy(formatConfig(installConfig.gemini))}
												</Tabs.Content>
											{/if}
										</Tabs.Root>
									</Tabs.Content>
								</Tabs.Root>
							{/if}
						</section>
					</div>
				</div>

				<Dialog.Footer class="border-t border-border/50 px-6 py-4">
					<Button
						variant="outline"
						class="w-full border-border sm:w-auto"
						onclick={() => (isDialogOpen = false)}>Close</Button
					>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
</div>
