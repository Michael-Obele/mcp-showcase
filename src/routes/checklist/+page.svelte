<script lang="ts">
	import { onMount } from 'svelte';
	import { registries } from '$lib/data/registries';
	import { mcps } from '$lib/data/mcps';
	import * as Table from '$lib/components/ui/table';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Lock, Unlock, ExternalLink, RefreshCcw, Terminal } from '@lucide/svelte';

	let isAuthorized = $state(false);
	let password = $state('');
	let checklistData = $state<Record<string, Record<string, boolean>>>({});

	// Persistence key
	const STORAGE_KEY = 'mcp_showcase_checklist';
	const AUTH_KEY = 'mcp_showcase_auth';

	onMount(() => {
		// Check auth
		if (localStorage.getItem(AUTH_KEY) === 'true') {
			isAuthorized = true;
		}

		// Load checklist
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				checklistData = JSON.parse(saved);
			} catch (e) {
				console.error('Failed to parse checklist data', e);
			}
		}

		// Initialize missing data
		mcps.forEach((mcp) => {
			if (!checklistData[mcp.name]) {
				checklistData[mcp.name] = {};
			}
			registries.forEach((reg) => {
				if (checklistData[mcp.name][reg.name] === undefined) {
					checklistData[mcp.name][reg.name] = false;
				}
			});
		});
	});

	function handleAuth() {
		if (password === 'mcp-admin') {
			isAuthorized = true;
			localStorage.setItem(AUTH_KEY, 'true');
		} else {
			alert('Incorrect password. Hint: See the plan files.');
		}
	}

	function toggleCheck(mcpName: string, regName: string) {
		checklistData[mcpName][regName] = !checklistData[mcpName][regName];
		localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistData));
	}

	function resetAuth() {
		localStorage.removeItem(AUTH_KEY);
		isAuthorized = false;
	}

	const totalChecks = $derived(mcps.length * registries.length);
	const completedChecks = $derived(
		Object.values(checklistData).reduce(
			(acc, mcp) => acc + Object.values(mcp).filter(Boolean).length,
			0
		)
	);
	const progress = $derived(totalChecks > 0 ? (completedChecks / totalChecks) * 100 : 0);
</script>

<div class="container min-h-screen py-12">
	{#if !isAuthorized}
		<div class="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 pt-20">
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
				<Lock class="h-8 w-8 text-primary" />
			</div>
			<div class="text-center">
				<h1 class="text-3xl font-bold tracking-tight">Private Access</h1>
				<p class="mt-2 text-muted-foreground">Please enter your administration password.</p>
			</div>
			<div class="flex w-full flex-col space-y-2">
				<Input
					type="password"
					placeholder="Enter password..."
					bind:value={password}
					onkeydown={(e) => e.key === 'Enter' && handleAuth()}
					class="border-primary/20 bg-muted/50 focus-visible:ring-primary"
				/>
				<Button
					onclick={handleAuth}
					class="w-full bg-primary text-primary-foreground hover:bg-primary/90"
				>
					Unlock Database
				</Button>
			</div>
		</div>
	{:else}
		<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
			<div>
				<div class="flex items-center gap-2">
					<Terminal class="h-8 w-8 text-primary" />
					<h1 class="text-4xl font-bold tracking-tight text-foreground">Submission Tracker</h1>
					<Badge variant="outline" class="border-primary/50 text-primary">ADMIN</Badge>
				</div>
				<p class="mt-1 text-muted-foreground">
					Track the status of MCP servers across all registries.
				</p>
			</div>
			<div class="flex items-center gap-3">
				<div class="text-right">
					<p class="text-xs font-medium tracking-wider text-muted-foreground uppercase">Progress</p>
					<p class="text-xl font-bold text-primary">
						{completedChecks} / {totalChecks}
						<span class="text-sm font-normal text-muted-foreground">({progress.toFixed(0)}%)</span>
					</p>
				</div>
				<Button variant="ghost" size="icon" onclick={resetAuth} title="Lock Access">
					<Unlock class="h-5 w-5" />
				</Button>
			</div>
		</div>

		<div class="overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
			<Table.Root>
				<Table.Header class="bg-muted/30">
					<Table.Row class="hover:bg-transparent">
						<Table.Head class="w-62.5 font-bold text-foreground">MCP Server</Table.Head>
						{#each registries as reg}
							<Table.Head class="text-center">
								<a
									href={reg.url}
									target="_blank"
									class="flex items-center justify-center gap-1 text-xs transition-colors hover:text-primary"
								>
									{reg.name}
									<ExternalLink class="h-3 w-3" />
								</a>
							</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each mcps as mcp}
						<Table.Row class="border-white/5 hover:bg-white/5">
							<Table.Cell class="font-medium text-foreground">
								{mcp.name}
								{#if mcp.version}
									<p class="mt-1 font-mono text-[10px] text-muted-foreground opacity-50">
										v{mcp.version}
									</p>
								{/if}
							</Table.Cell>
							{#each registries as reg}
								<Table.Cell class="text-center">
									<div class="flex items-center justify-center">
										<Checkbox
											checked={checklistData[mcp.name]?.[reg.name] || false}
											onCheckedChange={() => toggleCheck(mcp.name, reg.name)}
											class="border-white/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
										/>
									</div>
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each registries as reg}
				<div class="rounded-lg border border-white/5 bg-muted/10 p-4">
					<div class="flex items-center justify-between">
						<h4 class="font-bold text-primary">{reg.name}</h4>
						<Badge variant="secondary" class="text-[10px] uppercase">
							{reg.submissionMethod.split(' ')[0]}
						</Badge>
					</div>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
						{reg.description}
					</p>
					<div class="mt-4">
						<Button
							variant="link"
							class="h-auto p-0 text-xs text-primary/70 hover:text-primary"
							href={reg.url}
							target="_blank"
						>
							Visit Registry <ExternalLink class="ml-1 h-3 w-3" />
						</Button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
