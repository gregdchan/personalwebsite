<script lang="ts">
	let { metrics = [] }: { metrics: any[] } = $props();

	const highlighted = $derived(metrics.filter((m: any) => m.highlight));
	const regular = $derived(metrics.filter((m: any) => !m.highlight));

	function deltaClass(delta: string | undefined): string {
		if (!delta) return '';
		if (delta.startsWith('+') || delta.startsWith('\u2191')) return 'positive';
		if (delta.startsWith('-') || delta.startsWith('\u2193')) return 'negative';
		return '';
	}

	function valueClass(value: unknown): string {
		const raw = typeof value === 'string' ? value.trim() : String(value ?? '');
		if (raw.length > 34) return 'value-long';
		if (raw.length > 20) return 'value-medium';
		return 'value-short';
	}
</script>

{#if metrics.length > 0}
	<div class="metrics-block">
		{#if highlighted.length > 0}
			<div class="hero-stats">
				{#each highlighted as metric (metric._key || metric.label)}
					<div class="hero-stat">
						<span class={`stat-value ${valueClass(metric.value)}`}>{metric.value}</span>
						<span class="stat-label">{metric.label}</span>
						{#if metric.delta}
							<span class="stat-delta {deltaClass(metric.delta)}">{metric.delta}</span>
						{/if}
						{#if metric.context}
							<span class="stat-context">{metric.context}</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		{#if regular.length > 0}
			<div class="compact-grid">
				{#each regular as metric (metric._key || metric.label)}
					<div class="compact-stat">
						<span class={`compact-value ${valueClass(metric.value)}`}>{metric.value}</span>
						<span class="compact-label">{metric.label}</span>
						{#if metric.delta}
							<span class="compact-delta {deltaClass(metric.delta)}">{metric.delta}</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.metrics-block {
		display: grid;
		gap: 1rem;
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 0.9rem;
	}

	.hero-stat {
		padding: 1.2rem 1.1rem;
		border-radius: 1rem;
		border: 1px solid color-mix(in oklab, var(--color-accent) 35%, transparent);
		background: color-mix(in oklab, var(--color-accent) 8%, transparent);
		display: grid;
		align-content: start;
		gap: 0.2rem;
		text-align: left;
		min-height: 11.4rem;
	}

	.stat-value {
		font-size: clamp(1.55rem, 2.8vw, 2.25rem);
		font-weight: 800;
		font-family: var(--font-heading);
		line-height: 1.12;
		color: var(--color-accent);
		overflow-wrap: anywhere;
		word-break: break-word;
		text-wrap: balance;
	}

	.stat-value.value-medium {
		font-size: clamp(1.3rem, 2.15vw, 1.85rem);
	}

	.stat-value.value-long {
		font-size: clamp(1.12rem, 1.85vw, 1.5rem);
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	.stat-delta {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		font-weight: 600;
	}

	.stat-delta.positive {
		color: #22c55e;
	}

	.stat-delta.negative {
		color: #ef4444;
	}

	.stat-context {
		margin-top: 0.1rem;
		font-size: 0.74rem;
		line-height: 1.45;
		color: var(--color-muted-text);
		overflow-wrap: anywhere;
	}

	.compact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 0.6rem;
	}

	.compact-stat {
		padding: 0.7rem 0.85rem;
		border-radius: 0.65rem;
		border: 1px solid var(--color-edge);
		background: color-mix(in oklab, var(--color-panel) 60%, transparent);
		display: grid;
		gap: 0.1rem;
	}

	.compact-value {
		font-size: clamp(1.05rem, 2vw, 1.28rem);
		font-weight: 700;
		font-family: var(--font-heading);
		line-height: 1.2;
		overflow-wrap: anywhere;
		word-break: break-word;
		text-wrap: balance;
	}

	.compact-value.value-medium {
		font-size: 1rem;
	}

	.compact-value.value-long {
		font-size: 0.92rem;
	}

	.compact-label {
		font-size: 0.7rem;
		color: var(--color-muted-text);
	}

	.compact-delta {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		font-weight: 600;
	}

	.compact-delta.positive {
		color: #22c55e;
	}

	.compact-delta.negative {
		color: #ef4444;
	}

	@media (max-width: 700px) {
		.hero-stat {
			min-height: auto;
		}
	}
</style>
