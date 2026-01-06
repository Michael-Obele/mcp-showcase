<script lang="ts">
	import { ModeToggle } from '$lib/components/blocks';
	import { Terminal, Github } from '@lucide/svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
</script>

<nav class="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 py-3 backdrop-blur-md">
	<div class="container flex items-center justify-between">
		<div class="flex items-center gap-2">
			<a href="/" class="group flex items-center gap-2 transition-opacity hover:opacity-90">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFB800]/10 ring-1 ring-[#FFB800]/20 group-hover:bg-[#FFB800]/20"
				>
					<Terminal class="h-5 w-5 text-[#FFB800]" />
				</div>
				<span class="text-xl font-bold tracking-tight">
					<span class="text-white">Server</span><span class="text-[#FFB800]">Showcase</span>
				</span>
			</a>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="https://github.com/Michael-Obele/mcp-showcase"
				target="_blank"
				rel="noreferrer"
				class={cn(
					buttonVariants({ variant: 'ghost', size: 'icon' }),
					'h-9 w-9 text-white/70 transition-colors hover:bg-white/5 hover:text-[#FFB800]'
				)}
			>
				<Github class="h-5 w-5" />
				<span class="sr-only">GitHub</span>
			</a>
			<div class="mx-2 h-4 w-px bg-white/10"></div>
			<ModeToggle />
		</div>
	</div>
</nav>
