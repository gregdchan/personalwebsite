<script lang="ts">
	import type { NavItem } from '$lib/types/navigation';
	export let navItems: NavItem[] = [];
	let open = false;
	function toggle() {
		open = !open;
	}
</script>

<button
	on:click={toggle}
	class="text-foreground p-2 md:hidden"
	aria-expanded={open}
	aria-label="Toggle menu"
>
	<!-- your hamburger icon here -->
</button>

{#if open}
	<nav class="bg-background space-y-2 px-4 py-4 md:hidden">
		{#each navItems as item}
			<a href={item.link} target={item.target} class="text-foreground hover:text-accent block"
				>{item.text}</a
			>

			{#if item.children?.length}
				<div class="space-y-1 pl-4">
					{#each item.children as c}
						<a href={c.link} target={c.target} class="text-foreground hover:text-accent block"
							>{c.text}</a
						>
					{/each}
				</div>
			{/if}
		{/each}
	</nav>
{/if}
