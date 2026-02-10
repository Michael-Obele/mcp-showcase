<script lang="ts">
	import type { MCP } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { getFullInstallConfig } from '$lib/mcp-utils';
	import {
		Github,
		Copy,
		Check,
		Terminal,
		Zap,
		MessageSquare,
		Settings,
		Info,
		Search as SearchIcon,
		ExternalLink,
		Cpu,
		Layers,
		Sparkles,
		Bot,
		Code
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { mcp } = $props<{ mcp: MCP }>();

	let preferredTransport = $state<'sse' | 'http' | 'stdio'>('sse');
	let installConfig = $derived(getFullInstallConfig(mcp, preferredTransport));
	let showMcpServersWrapper = $state(false);
	let showMcpJsonWrapper = $state(true);

	// Additional toggles for other platforms
	let showClaudeMcpServers = $state(true);
	let showWindsurfMcpServers = $state(true);
	let showGeminiMcpServers = $state(true);

	let mcpJsonDisplay = $derived(() => {
		const mcpJson = installConfig.vscode?.mcpJson;
		if (!mcpJson) return {};
		return showMcpJsonWrapper ? mcpJson : (mcpJson as any).mcpServers || {};
	});

	let claudeConfigDisplay = $derived(() => {
		const claudeConfig = installConfig.claude?.config;
		if (!claudeConfig) return {};
		return showClaudeMcpServers ? claudeConfig : (claudeConfig as any).mcpServers || {};
	});

	let windsurfConfigDisplay = $derived(() => {
		const windsurfConfig = installConfig.windsurf;
		if (!windsurfConfig) return {};
		return showWindsurfMcpServers ? windsurfConfig : (windsurfConfig as any).mcpServers || {};
	});

	let geminiConfigDisplay = $derived(() => {
		const geminiConfig = installConfig.gemini;
		if (!geminiConfig) return {};
		return showGeminiMcpServers ? geminiConfig : (geminiConfig as any).mcpServers || {};
	});

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		toast.success('Copied to clipboard');
	}

	function formatConfig(config: Record<string, unknown> | string) {
		if (typeof config === 'string') return config;
		return JSON.stringify(config, null, 2);
	}

	function getIconForPlatform(platform: string) {
		switch (platform) {
			case 'vscode':
				return Cpu;
			case 'cursor':
				return Bot;
			case 'claude':
				return MessageSquare;
			case 'windsurf':
				return Layers;
			case 'zed':
				return Zap;
			case 'cli':
				return Terminal;
			default:
				return Settings;
		}
	}
</script>

{#snippet mcpHeadToggle(
	platform: string,
	currentMode: 'sse' | 'stdio' | 'http',
	onToggle: (mode: 'sse' | 'stdio' | 'http') => void
)}
	<div class="mb-6 flex items-center justify-between border-border pb-4">
		<div class="flex items-center gap-2">
			<div class="h-2 w-2 bg-primary"></div>
			<p class="text-xs font-black tracking-widest text-muted-foreground uppercase">
				Transport Mode for {platform}
			</p>
		</div>
		<div class="flex items-center gap-2 border border-border/50 bg-muted/30 p-1">
			<Button
				variant="ghost"
				size="sm"
				class="h-8 rounded-none border border-transparent px-3 text-[10px] font-black uppercase transition-all data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
				onclick={() => onToggle('sse')}
				data-active={currentMode === 'sse'}
			>
				SSE
			</Button>
			<Button
				variant="ghost"
				size="sm"
				class="h-8 rounded-none border border-transparent px-3 text-[10px] font-black uppercase transition-all data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
				onclick={() => onToggle('stdio')}
				data-active={currentMode === 'stdio'}
			>
				STDIO
			</Button>
		</div>
	</div>
{/snippet}

{#snippet cursorGuide()}
	<div class="mt-8 space-y-12 border-t-2 border-dotted border-border pt-12">
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<div
					class="bg-primary p-2 text-primary-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
				>
					<Bot class="h-5 w-5" />
				</div>
				<h3 class="text-xl font-black tracking-tighter uppercase italic">
					How to Use MCP in Cursor
				</h3>
			</div>

			<div class="space-y-6">
				<!-- What is MCP? -->
				<section>
					<h4
						class="mb-3 text-sm font-black tracking-widest text-primary uppercase underline decoration-dotted underline-offset-4"
					>
						What is MCP?
					</h4>
					<blockquote
						class="rounded-none border-l-4 border-dotted border-primary bg-muted/30 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
					>
						<p class="text-sm leading-relaxed font-medium text-foreground italic">
							Model Context Protocol (MCP) is an open protocol that allows you to provide custom
							tools to agentic LLMs in Cursor's Composer feature.
						</p>
					</blockquote>
				</section>

				<!-- Installation Steps -->
				<section>
					<h4
						class="mb-4 text-sm font-black tracking-widest text-primary uppercase underline decoration-dotted underline-offset-4"
					>
						Installation Steps
					</h4>
					<div class="grid gap-4 md:grid-cols-2">
						<div
							class="group relative rounded-none border-2 border-border bg-background p-5 transition-all hover:border-primary/50"
						>
							<div class="mb-2 flex items-center justify-between">
								<span
									class="bg-primary/10 px-2 py-1 font-mono text-xs font-black text-primary uppercase"
									>STEP 01</span
								>
								<Settings class="h-4 w-4 text-muted-foreground" />
							</div>
							<h5 class="mb-2 font-bold tracking-tight uppercase">Open Settings</h5>
							<p class="text-xs leading-relaxed text-muted-foreground">
								Navigate to <span
									class="font-bold text-foreground underline decoration-dotted underline-offset-2"
									>Cursor Settings &gt; Features &gt; MCP</span
								>
								and click the <span class="font-bold text-foreground">+ Add New MCP Server</span> button.
							</p>
						</div>
						<div
							class="group relative rounded-none border-2 border-border bg-background p-5 transition-all hover:border-primary/50"
						>
							<div class="mb-2 flex items-center justify-between">
								<span
									class="bg-primary/10 px-2 py-1 font-mono text-xs font-black text-primary uppercase"
									>STEP 02</span
								>
								<Terminal class="h-4 w-4 text-muted-foreground" />
							</div>
							<h5 class="mb-2 font-bold tracking-tight uppercase">Configure Server</h5>
							<p class="text-xs leading-relaxed text-muted-foreground">
								Select the transport type (<span class="font-bold text-foreground">sse</span> or
								<span class="font-bold text-foreground">stdio</span>) and enter the URL or Command
								provided above.
							</p>
						</div>
					</div>
				</section>

				<!-- Using Tools -->
				<section>
					<h4
						class="mb-4 text-sm font-black tracking-widest text-primary uppercase underline decoration-dotted underline-offset-4"
					>
						Using Tools in Composer
					</h4>
					<div class="rounded-none border border-border bg-muted/10 p-5">
						<ul class="space-y-4">
							<li class="flex items-start gap-4">
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-primary-foreground"
								>
									<Zap class="h-4 w-4" />
								</div>
								<div>
									<p class="text-sm font-bold tracking-tight uppercase">Tool Availability</p>
									<p class="mt-1 text-xs text-muted-foreground">
										After adding, it will appear in your server list. Click refresh to populate
										tools.
									</p>
								</div>
							</li>
							<li class="flex items-start gap-4">
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-primary-foreground"
								>
									<MessageSquare class="h-4 w-4" />
								</div>
								<div>
									<p class="text-sm font-bold tracking-tight uppercase">Automatic Usage</p>
									<p class="mt-1 text-xs text-muted-foreground">
										The Composer Agent uses MCP tools automatically. You can also explicitly prompt
										tool usage by name.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</section>

				<!-- Important Notes -->
				<div class="rounded-none border-2 border-dotted border-primary/20 bg-primary/5 p-6">
					<div class="flex items-start gap-3">
						<Info class="h-5 w-5 shrink-0 text-primary" />
						<div class="space-y-2">
							<h5 class="text-xs font-black tracking-widest text-primary uppercase">
								Important Notes
							</h5>
							<ul class="list-none space-y-1 p-0 pl-1 text-[11px] leading-tight text-primary/80">
								<li class="flex items-start gap-2">
									<span>▪</span> MCP tools may not work with all models.
								</li>
								<li class="flex items-start gap-2">
									<span>▪</span> MCP tools are only available to the Agent in Composer.
								</li>
								<li class="flex items-start gap-2">
									<span>▪</span> For servers requiring environment variables, create a wrapper script.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet codeCpy(code: string)}
	<div
		class="group relative mx-auto mt-2 w-[75vw] rounded-none border border-border bg-muted/50 p-4 font-mono text-sm lg:w-full"
	>
		<ScrollArea orientation="horizontal" class="pt-8 pb-2 whitespace-nowrap">
			<pre class="whitespace-pre text-foreground/90">{code}</pre>
		</ScrollArea>
		<Button
			variant="ghost"
			size="icon"
			class="absolute top-2 right-2 rounded-none border border-transparent text-muted-foreground group-hover:opacity-100 hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
			onclick={() => copyToClipboard(code)}
		>
			<Copy class="h-4 w-4" />
		</Button>
	</div>
{/snippet}

<div class="flex flex-col gap-12">
	<!-- Hero Header -->
	<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-none bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
				>
					<Cpu class="h-6 w-6" />
				</div>
				<h2 class="text-2xl font-bold tracking-tighter uppercase italic md:text-3xl">{mcp.name}</h2>
			</div>

			<p
				class="max-w-3xl text-base leading-relaxed text-muted-foreground underline decoration-muted-foreground/30 decoration-dotted underline-offset-4"
			>
				{mcp.description}
			</p>

			<div class="flex flex-wrap gap-3">
				{#each mcp.tags as tag (tag)}
					<Badge
						variant="outline"
						class="rounded-none border-2 border-primary/20 bg-primary/5 px-3 py-1 font-mono text-sm font-bold tracking-wider text-primary uppercase"
					>
						{tag}
					</Badge>
				{/each}
			</div>
		</div>

		<div class="flex flex-wrap gap-4">
			<Button
				variant="outline"
				href={mcp.githubUrl}
				target="_blank"
				class="h-12 rounded-none border-2 border-border px-6 font-bold tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:border-primary hover:bg-primary/5 hover:text-primary"
			>
				<Github class="mr-2 h-5 w-5" />
				Source
			</Button>
			{#if mcp.registryUrl}
				<Button
					href={mcp.registryUrl}
					target="_blank"
					class="h-12 rounded-none bg-primary px-6 font-bold tracking-widest text-primary-foreground uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
				>
					<Layers class="mr-2 h-5 w-5" />
					Smithery
				</Button>
			{/if}
		</div>
	</div>

	<Tabs.Root value="overview" class="w-full">
		<Tabs.List
			class="grid h-auto w-full grid-cols-2 gap-1 rounded-none border border-border bg-muted/40 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] md:grid-cols-4"
		>
			<Tabs.Trigger
				value="overview"
				class="flex h-12 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
			>
				<Info class="h-4 w-4" />
				<span>Overview</span>
			</Tabs.Trigger>
			<Tabs.Trigger
				value="tools"
				class="flex h-12 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
				disabled={!mcp.tools?.length}
			>
				<Zap class="h-4 w-4" />
				<span>Tools</span>
			</Tabs.Trigger>
			<Tabs.Trigger
				value="prompts"
				class="flex h-12 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
				disabled={!mcp.prompts?.length}
			>
				<MessageSquare class="h-4 w-4" />
				<span>Prompts</span>
			</Tabs.Trigger>
			<Tabs.Trigger
				value="config"
				class="flex h-12 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
			>
				<Settings class="h-4 w-4" />
				<span>Config</span>
			</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content
			value="overview"
			class="mt-10 animate-in space-y-16 duration-500 fade-in slide-in-from-bottom-4"
		>
			<!-- Key Features -->
			<section>
				<div class="mb-8 flex items-center gap-4">
					<div
						class="bg-primary p-2 text-primary-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
					>
						<Check class="h-6 w-6" />
					</div>
					<h3
						class="text-lg font-black tracking-tighter uppercase underline decoration-primary/30 decoration-dotted underline-offset-8"
					>
						Key Capabilities
					</h3>
				</div>
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each mcp.features as feature (feature)}
						<div
							class="group relative overflow-hidden rounded-none border-2 border-border/50 bg-background p-6 transition-all hover:border-primary/50 hover:bg-primary/5"
						>
							<div
								class="absolute top-0 left-0 h-1 w-full bg-primary/10 transition-colors group-hover:bg-primary/40"
							></div>
							<p class="leading-tight font-bold text-foreground md:text-sm">
								{feature}
							</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Example Usage (Revamped) -->
			{#if mcp.exampleQueries}
				<section>
					<div class="mb-8 flex items-center gap-4">
						<div
							class="bg-primary p-2 text-primary-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
						>
							<SearchIcon class="h-6 w-6" />
						</div>
						<h3
							class="text-lg font-black tracking-tighter uppercase underline decoration-primary/30 decoration-dotted underline-offset-8"
						>
							Example Usage
						</h3>
					</div>
					<div class="grid gap-6">
						{#each mcp.exampleQueries as query (query)}
							<blockquote
								class="group relative rounded-none border-l-8 border-dotted border-primary bg-muted/40 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] transition-all hover:bg-muted/60"
							>
								<div class="flex items-start gap-6">
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] transition-transform group-hover:rotate-6"
									>
										<MessageSquare class="h-5 w-5" />
									</div>
									<div class="space-y-1">
										<p
											class="text-sm font-bold tracking-widest text-primary/70 uppercase underline decoration-dotted underline-offset-4"
										>
											Query
										</p>
										<p class="text-base leading-relaxed font-medium text-foreground italic">
											"{query}"
										</p>
									</div>
								</div>
							</blockquote>
						{/each}
					</div>
				</section>
			{/if}
		</Tabs.Content>

		<Tabs.Content
			value="tools"
			class="mt-10 animate-in duration-500 fade-in slide-in-from-bottom-4"
		>
			<div class="grid gap-6 sm:grid-cols-2">
				{#each mcp.tools || [] as tool (tool.name)}
					<div
						class="group relative rounded-none border-2 border-border bg-background p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-primary hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]"
					>
						<div class="mb-4 flex items-center gap-3">
							<div
								class="bg-primary/10 p-2 font-mono text-xs font-black text-primary uppercase transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
							>
								TOOL
							</div>
							<h4
								class="font-mono text-base font-bold text-primary underline decoration-dotted underline-offset-4"
							>
								{tool.name}
							</h4>
						</div>
						<p class="leading-relaxed text-muted-foreground">{tool.description}</p>
					</div>
				{/each}
			</div>
		</Tabs.Content>

		<Tabs.Content
			value="prompts"
			class="mt-10 animate-in duration-500 fade-in slide-in-from-bottom-4"
		>
			<div class="grid gap-6 sm:grid-cols-2">
				{#each mcp.prompts || [] as prompt (prompt.name)}
					<div
						class="group relative rounded-none border-2 border-border bg-background p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-primary hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]"
					>
						<div class="mb-4 flex items-center gap-3">
							<div
								class="bg-primary/10 p-2 font-mono text-xs font-black text-primary uppercase transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
							>
								PROMPT
							</div>
							<h4
								class="text-base font-black tracking-tight text-primary underline decoration-dotted underline-offset-4"
							>
								{prompt.name}
							</h4>
						</div>
						<p class="leading-relaxed text-muted-foreground">{prompt.description}</p>
					</div>
				{/each}
			</div>
		</Tabs.Content>

		<Tabs.Content
			value="config"
			class="mt-10 animate-in space-y-10 duration-500 fade-in slide-in-from-bottom-4"
		>
			<!-- Protocol Switcher Card -->
			<div
				class="rounded-none border-2 border-primary/20 bg-primary/5 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]"
			>
				<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div class="space-y-1">
						<h4
							class="text-lg font-black tracking-widest uppercase underline decoration-dotted underline-offset-8"
						>
							Global Transport
						</h4>
						<p class="text-muted-foreground">Default delivery mechanism for server connections.</p>
					</div>
					<div class="flex items-center gap-2 border border-border/50 bg-background/50 p-2">
						{#each ['sse', 'stdio', 'http'] as mode}
							<Button
								variant="ghost"
								size="sm"
								class="h-10 rounded-none border border-transparent px-4 text-xs font-black uppercase transition-all data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:text-primary"
								onclick={() => (preferredTransport = mode as any)}
								data-active={preferredTransport === mode}
							>
								{mode}
							</Button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Platform Configs -->
			<div class="space-y-8">
				{#if installConfig}
					<Tabs.Root value="cursor" class="w-full">
						<Tabs.List
							class="flex h-fit w-full flex-wrap gap-2 border-b-2 border-border bg-transparent p-0"
						>
							{#each (Object.keys(installConfig) as Array<keyof typeof installConfig>).filter((k) => installConfig[k] && !['codex', 'gemini', 'opencode'].includes(k)) as platform (platform)}
								{@const Icon = getIconForPlatform(platform)}
								<Tabs.Trigger
									value={platform}
									class="relative h-12 gap-2 rounded-none border-b-4 border-transparent px-6 font-black tracking-widest text-muted-foreground uppercase transition-all hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
								>
									{#if Icon}
										<Icon class="h-4 w-4" />
									{/if}
									{platform === 'vscode' ? 'VS Code' : platform === 'cli' ? 'CLI' : platform}
								</Tabs.Trigger>
							{/each}
						</Tabs.List>

						<div class="mt-8">
							<Tabs.Content
								value="cursor"
								class="container animate-in overflow-clip duration-300 fade-in"
							>
								{@render mcpHeadToggle(
									'Cursor',
									preferredTransport,
									(m) => (preferredTransport = m)
								)}

								<p class="mb-4 text-base font-bold text-foreground">
									Add to <span class="underline decoration-dotted underline-offset-4"
										>Cursor Settings</span
									>:
								</p>
								<div
									class="mb-4 flex items-center gap-2 rounded-none bg-primary/10 px-3 py-1 text-xs font-black text-primary uppercase"
								>
									Transport: {preferredTransport === 'stdio' ? 'stdio (command)' : 'sse (url)'}
								</div>
								{@render codeCpy(formatConfig(installConfig.cursor || ''))}

								{@render cursorGuide()}
							</Tabs.Content>

							<Tabs.Content value="vscode" class="animate-in duration-300 fade-in">
								<div class="grid gap-8">
									<div class="space-y-4">
										<p
											class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
										>
											Command Palette
										</p>
										<p class="text-sm text-muted-foreground">
											Run <strong class="bg-primary/10 px-1 text-primary">MCP: Add Server</strong> and
											paste:
										</p>
										{@render codeCpy(installConfig.vscode?.commandPalette || '')}
									</div>
									<Separator class="rounded-none" />
									<div class="space-y-4">
										<div class="flex items-center justify-between">
											<p
												class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
											>
												mcp.json
											</p>
											<div class="flex items-center gap-2">
												<label for="mcpJson-toggle" class="text-sm text-muted-foreground">
													Include mcpServers
												</label>
												<Switch id="mcpJson-toggle" bind:checked={showMcpJsonWrapper} />
											</div>
										</div>
										<p class="text-sm text-muted-foreground">
											Add to your <strong class="bg-primary/10 px-1 text-primary"
												>.vscode/mcp.json</strong
											>:
										</p>
										{@render codeCpy(formatConfig(mcpJsonDisplay()))}
									</div>
									<Separator class="rounded-none" />
									<div class="space-y-4">
										<div class="flex items-center justify-between">
											<p
												class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
											>
												Alternative Format
											</p>
											<div class="flex items-center gap-2">
												<label for="mcpServers-toggle" class="text-sm text-muted-foreground">
													Include mcpServers
												</label>
												<Switch id="mcpServers-toggle" bind:checked={showMcpServersWrapper} />
											</div>
										</div>
										<p class="text-sm text-muted-foreground">
											Alternative configuration format for VS Code MCP extensions:
										</p>
										{@render codeCpy(
											formatConfig(
												showMcpServersWrapper
													? { mcpServers: installConfig.vscode?.alternativeJson }
													: installConfig.vscode?.alternativeJson || ''
											)
										)}
									</div>
								</div>
							</Tabs.Content>

							<Tabs.Content value="gemini" class="animate-in duration-300 fade-in">
								<div class="mb-4 flex items-center justify-between">
									<p
										class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
									>
										Gemini Config
									</p>
									<div class="flex items-center gap-2">
										<label for="gemini-mcp-toggle" class="text-sm text-muted-foreground">
											Include mcpServers
										</label>
										<Switch id="gemini-mcp-toggle" bind:checked={showGeminiMcpServers} />
									</div>
								</div>
								<p class="mb-2 text-sm text-muted-foreground">
									Add to your <strong class="bg-primary/10 px-1 text-primary"
										>gemini_config.json</strong
									>:
								</p>
								{@render codeCpy(formatConfig(geminiConfigDisplay()))}
							</Tabs.Content>

							<Tabs.Content value="codex" class="animate-in duration-300 fade-in">
								<p
									class="mb-4 text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
								>
									Codex CLI
								</p>
								<p class="mb-2 text-sm text-muted-foreground">Run in your terminal:</p>
								{@render codeCpy(installConfig.codex || '')}
							</Tabs.Content>

							<Tabs.Content value="claude" class="animate-in duration-300 fade-in">
								<div class="grid gap-8">
									<div class="space-y-4">
										<div class="flex items-center justify-between">
											<p
												class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
											>
												Claude Desktop
											</p>
											<div class="flex items-center gap-2">
												<label for="claude-mcp-toggle" class="text-sm text-muted-foreground">
													Include mcpServers
												</label>
												<Switch id="claude-mcp-toggle" bind:checked={showClaudeMcpServers} />
											</div>
										</div>
										<p class="text-sm text-muted-foreground">
											Add to <strong class="bg-primary/10 px-1 text-primary"
												>claude_desktop_config.json</strong
											>:
										</p>
										{@render codeCpy(formatConfig(claudeConfigDisplay()))}
									</div>
									<Separator class="rounded-none" />
									<div class="space-y-4">
										<p
											class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
										>
											Claude Code (CLI)
										</p>
										<p class="text-sm text-muted-foreground">Run in terminal:</p>
										{@render codeCpy(installConfig.claude?.command || '')}
									</div>
								</div>
							</Tabs.Content>

							<Tabs.Content value="windsurf" class="animate-in duration-300 fade-in">
								<div class="mb-4 flex items-center justify-between">
									<p
										class="text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
									>
										Windsurf Config
									</p>
									<div class="flex items-center gap-2">
										<label for="windsurf-mcp-toggle" class="text-sm text-muted-foreground">
											Include mcpServers
										</label>
										<Switch id="windsurf-mcp-toggle" bind:checked={showWindsurfMcpServers} />
									</div>
								</div>
								{@render codeCpy(formatConfig(windsurfConfigDisplay()))}
							</Tabs.Content>

							<Tabs.Content value="zed" class="animate-in duration-300 fade-in">
								<p
									class="mb-4 text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
								>
									Zed Settings
								</p>
								<p class="mb-2 text-sm text-muted-foreground">
									Add to <strong class="bg-primary/10 px-1 text-primary">settings.json</strong>:
								</p>
								{@render codeCpy(formatConfig(installConfig.zed || ''))}
							</Tabs.Content>

							<Tabs.Content value="cli" class="animate-in duration-300 fade-in">
								<div class="space-y-6">
									<div>
										<p
											class="mb-4 text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
										>
											Direct CLI Usage
										</p>
										<p class="mb-2 text-sm text-muted-foreground">
											Connect proxy or debug directly:
										</p>
										{@render codeCpy(installConfig.cli || '')}
									</div>

									{#if installConfig.codex || installConfig.gemini || installConfig.opencode}
										<Separator class="rounded-none" />
										<div>
											<p
												class="mb-4 text-base font-bold tracking-tighter uppercase underline decoration-dotted underline-offset-4"
											>
												CLI Clients
											</p>
											<Tabs.Root value="codex" class="w-full">
												<Tabs.List
													class="grid h-fit w-full grid-cols-3 gap-1 rounded-none border border-border bg-muted/40 p-1"
												>
													{#if installConfig.codex}
														<Tabs.Trigger
															value="codex"
															class="flex h-10 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
														>
															<Code class="h-4 w-4" />
															<span>Codex</span>
														</Tabs.Trigger>
													{/if}
													{#if installConfig.gemini}
														<Tabs.Trigger
															value="gemini"
															class="flex h-10 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
														>
															<Code class="h-4 w-4" />
															<span>Gemini</span>
														</Tabs.Trigger>
													{/if}
													{#if installConfig.opencode}
														<Tabs.Trigger
															value="opencode"
															class="flex h-10 items-center gap-2 rounded-none border border-transparent font-bold tracking-wider uppercase shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
														>
															<Code class="h-4 w-4" />
															<span>OpenCode</span>
														</Tabs.Trigger>
													{/if}
												</Tabs.List>

												<div class="mt-4">
													{#if installConfig.codex}
														<Tabs.Content value="codex" class="animate-in duration-300 fade-in">
															<p class="mb-2 text-sm text-muted-foreground">Run in terminal:</p>
															{@render codeCpy(installConfig.codex)}
														</Tabs.Content>
													{/if}
													{#if installConfig.gemini}
														<Tabs.Content value="gemini" class="animate-in duration-300 fade-in">
															<p class="mb-2 text-sm text-muted-foreground">
																Add to <strong class="bg-primary/10 px-1 text-primary"
																	>gemini_config.json</strong
																>:
															</p>
															{@render codeCpy(formatConfig(installConfig.gemini))}
														</Tabs.Content>
													{/if}
													{#if installConfig.opencode}
														<Tabs.Content value="opencode" class="animate-in duration-300 fade-in">
															<p class="mb-2 text-sm text-muted-foreground">
																Add to <strong class="bg-primary/10 px-1 text-primary"
																	>config.json</strong
																>:
															</p>
															{@render codeCpy(formatConfig(installConfig.opencode))}
														</Tabs.Content>
													{/if}
												</div>
											</Tabs.Root>
										</div>
									{/if}
								</div>
							</Tabs.Content>
						</div>
					</Tabs.Root>
				{/if}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>
