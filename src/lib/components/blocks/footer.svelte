<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
</script>

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
				href="https://github.com/Michael-Obele"
				target="_blank"
				class="text-xs underline-offset-4 hover:text-primary hover:underline"
			>
				GitHub Profile
			</a>
		</div>
	</div>
</footer>