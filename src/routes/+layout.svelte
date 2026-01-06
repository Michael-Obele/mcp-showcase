<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Navbar, Footer } from '$lib/components/blocks';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background text-foreground antialiased">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<Toaster />
</div>
