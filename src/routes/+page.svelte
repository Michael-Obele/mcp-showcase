<script lang="ts">
	import { mcps } from '$lib/data/mcps';
	import { Input } from '$lib/components/ui/input';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { Search, ArrowUp, Server as ServerIcon, Database, Globe, Cpu } from '@lucide/svelte';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import McpDetails from '$lib/components/mcp-details.svelte';
	import { onMount, tick } from 'svelte';
	import { useSearchParams } from 'runed/kit';
	import * as v from 'valibot';

	let searchQuery = $state('');
	let showBackToTop = $state(false);

	const params = useSearchParams(
		v.object({
			mcp: v.optional(v.string(), mcps[0]?.id || '')
		})
	);

	let selectedMcpId = $derived(params.mcp || mcps[0]?.id || '');

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

	// Auto-select first result if current selection is filtered out
	$effect(() => {
		if (filteredMcps.length > 0) {
			const exists = filteredMcps.some((m) => m.id === selectedMcpId);
			if (!exists && filteredMcps[0]) {
				params.mcp = filteredMcps[0].id;
			}
		}
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleScroll() {
		showBackToTop = window.scrollY > 300;
	}

	// Icon mapping helper
	function getIconForTags(tags: string[]) {
		const lowerTags = tags.map((t) => t.toLowerCase());
		if (lowerTags.some((t) => t.includes('database') || t.includes('sql'))) return Database;
		if (lowerTags.some((t) => t.includes('web') || t.includes('browser') || t.includes('scrape')))
			return Globe;
		if (lowerTags.some((t) => t.includes('rust') || t.includes('system'))) return Cpu;
		return ServerIcon;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative min-h-screen bg-background text-foreground">
	<div class="container mx-auto px-4 py-8 pb-32">
		<header class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
				Server<span class="text-primary underline decoration-dotted">Showcase</span>
			</h1>
			<p class="mb-8 text-lg text-muted-foreground underline decoration-dotted">
				Discover specialized MCP servers for your AI workflows.
			</p>

			<div class="relative mx-auto max-w-xl">
				<Search class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search servers..."
					class="h-12 rounded-none border-border bg-background/50 pl-10 text-lg focus-visible:ring-primary"
					bind:value={searchQuery}
				/>
			</div>
		</header>

		{#if filteredMcps.length > 0}
			<Tabs.Root
				value={selectedMcpId}
				onValueChange={(v) => {
					params.mcp = v;
				}}
				class="space-y-8"
			>
				<div
					class="sticky top-0 z-10 -mx-4 overflow-x-auto bg-background/95 px-4 py-4 backdrop-blur supports-backdrop-filter:bg-background/60 sm:static sm:mx-0 sm:overflow-visible sm:bg-transparent sm:p-0"
				>
					<Tabs.List
						class="inline-flex h-auto w-full flex-nowrap justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 sm:flex-wrap sm:justify-center"
					>
						{#each filteredMcps as mcp (mcp.id)}
							{@const Icon = getIconForTags(mcp.tags)}
							<Tabs.Trigger
								value={mcp.id}
								class="flex h-10 shrink-0 items-center gap-2 rounded-none border-2 border-border bg-background px-4 font-mono transition-all hover:border-primary/50 hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:h-12 md:px-6 dark:data-[state=active]:shadow-[4px_4px_0px_0px_oklch(0.796_0.187_76.5/0.6)]"
							>
								<Icon class="h-4 w-4" />
								<span class="underline decoration-dotted">{mcp.name}</span>
							</Tabs.Trigger>
						{/each}
					</Tabs.List>
				</div>

				{#each filteredMcps as mcp (mcp.id)}
					<Tabs.Content value={mcp.id} class="mt-0 focus-visible:outline-none">
						<div class="animate-in duration-300 fade-in-50 slide-in-from-bottom-2">
							<div
								class="rounded-none border-2 border-black bg-card p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-8 dark:border-white dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]"
							>
								<McpDetails {mcp} />
							</div>
						</div>
					</Tabs.Content>
				{/each}
			</Tabs.Root>
		{:else}
			<div class="py-20 text-center text-muted-foreground">
				<p>No MCP servers found matching your query.</p>
			</div>
		{/if}
	</div>

	<!-- Back to Top Button -->
	<Button
		variant="outline"
		size="icon"
		class={`fixed right-8 bottom-8 z-50 rounded-none shadow-lg transition-all duration-300 ${showBackToTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
		onclick={scrollToTop}
	>
		<ArrowUp class="h-5 w-5" />
	</Button>
</div>
