<script lang="ts">
	import type { NavItem } from '$lib/types/navigation';
	export let navItems: NavItem[] = [];
</script>

<nav class="hidden space-x-8 md:flex">
	{#each navItems as item}
		{#if item.children?.length}
			<div class="group relative">
				<a href={item.link} target={item.target} class="text-foreground hover:text-accent"
					>{item.text}</a
				>

				<div class="bg-background absolute left-0 mt-2 hidden py-2 shadow-lg group-hover:block">
					{#each item.children as c}
						<a
							href={c.link}
							target={c.target}
							class="text-foreground hover:text-accent block px-4 py-2">{c.text}</a
						>
					{/each}
				</div>
			</div>
		{:else}
			<a href={item.link} target={item.target} class="text-foreground hover:text-accent"
				>{item.text}</a
			>
		{/if}
	{/each}
</nav>
