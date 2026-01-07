<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
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
