<script lang="ts">
	import AppIcon from '$lib/components/icons/AppIcon.svelte';

	let { principles = [] }: { principles: any[] } = $props();
</script>

{#if principles.length > 0}
	<div class="principles-grid">
		{#each principles as principle (principle._id)}
			<article class="principle-card">
				<div class="principle-header">
					{#if principle.icon}
						<span class="principle-icon">
							<AppIcon name={principle.icon} size={18} />
						</span>
					{/if}
					<h4 class="principle-title">{principle.title}</h4>
				</div>
				{#if principle.summary}
					<p class="principle-summary">{principle.summary}</p>
				{/if}
				{#if principle.category}
					<span class="principle-category">{principle.category}</span>
				{/if}
			</article>
		{/each}
	</div>
{/if}

<style>
	.principles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 0.75rem;
	}

	.principle-card {
		padding: 1rem 1.1rem;
		border-radius: 0.85rem;
		border: 1px solid var(--color-edge);
		background: color-mix(in oklab, var(--color-panel) 72%, transparent);
		display: grid;
		gap: 0.4rem;
	}

	.principle-header {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.principle-icon {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 0.5rem;
		background: color-mix(in oklab, var(--color-accent) 18%, transparent);
		color: var(--color-accent);
		flex-shrink: 0;
	}

	.principle-title {
		margin: 0;
		font-size: 0.95rem;
	}

	.principle-summary {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-muted-text);
	}

	.principle-category {
		justify-self: start;
		padding: 0.18rem 0.42rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.58rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		background: var(--color-chip);
		border: 1px solid var(--color-edge);
	}
</style>
