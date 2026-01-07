<script lang="ts">
	import './layout.css';
	import favicon from '$lib/favicon/favicon.svg';
	import favicon96 from '$lib/favicon/favicon-96x96.png';
	import faviconIco from '$lib/favicon/favicon.ico';
	import appleTouchIcon from '$lib/favicon/apple-touch-icon.png';
	import manifest from '$lib/favicon/site.webmanifest';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Navbar, Footer } from '$lib/components/blocks';
	import { onMount } from 'svelte';

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
	<link rel="icon" type="image/png" href={favicon96} sizes="96x96" />
	<link rel="shortcut icon" href={faviconIco} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<meta name="apple-mobile-web-app-title" content="MCP SSE" />
	<link rel="manifest" href={manifest} />
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
