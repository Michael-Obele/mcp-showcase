<script lang="ts">
	import './layout.css';
	import favicon from '$lib/favicon/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Navbar, Footer } from '$lib/components/blocks';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowBigUp } from '@lucide/svelte';

	let { children } = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'Home') {
				event.preventDefault();
				scrollToTop();
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="icon" type="image/png" href="$lib/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="shortcut icon" href="$lib/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="$lib/favicon/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="MCP SSE" />
	<link rel="manifest" href="$lib/favicon/site.webmanifest" />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background text-foreground antialiased">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<Toaster />
</div>
