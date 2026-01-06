<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background text-foreground antialiased">
	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-white/5 py-8 opacity-60 transition-opacity hover:opacity-100">
		<div class="container flex flex-col items-center justify-between gap-4 md:flex-row">
			<p class="text-sm">
				&copy; {new Date().getFullYear()} ServerShowcase. Built with Svelte 5 & MCP.
			</p>
			<div class="flex items-center gap-4">
				<a href="/checklist" class="text-xs underline-offset-4 hover:text-primary hover:underline">
					Admin Checklist
				</a>
				<a
					href="https://github.com/modelcontextprotocol"
					target="_blank"
					class="text-xs underline-offset-4 hover:text-primary hover:underline"
				>
					MCP Docs
				</a>
			</div>
		</div>
	</footer>
	<Toaster />
</div>
