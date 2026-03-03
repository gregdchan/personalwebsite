<script lang="ts">
	let { block = null }: { block: any } = $props();

	const chartData = $derived(Array.isArray(block?.chartData) ? block.chartData : []);
	const flowSteps = $derived(Array.isArray(block?.flowSteps) ? block.flowSteps : []);
	const maxValue = $derived(Math.max(...chartData.map((d: any) => d.value || 0), 1));

	// Donut chart SVG generation
	const donutSegments = $derived.by(() => {
		if (block?.blockType !== 'donut' || chartData.length === 0) return [];
		const total = chartData.reduce((sum: number, d: any) => sum + (d.value || 0), 0);
		if (total === 0) return [];

		let cumulative = 0;
		const radius = 15.9155;
		const circumference = 2 * Math.PI * radius;

		return chartData.map((d: any) => {
			const pct = (d.value || 0) / total;
			const dashLen = pct * circumference;
			const dashOffset = -cumulative * circumference;
			cumulative += pct;
			return {
				label: d.label,
				value: d.value,
				color: d.color || 'var(--color-accent)',
				dashLen,
				dashOffset,
				pct: Math.round(pct * 100)
			};
		});
	});
</script>

{#if block}
	<div class="infographic" data-type={block.blockType}>
		{#if block.title}
			<h4 class="info-title">{block.title}</h4>
		{/if}

		{#if block.blockType === 'stat'}
			<div class="stat-callout">
				<span class="stat-big">{block.statValue || '—'}</span>
				{#if block.statLabel}
					<span class="stat-sub">{block.statLabel}</span>
				{/if}
			</div>
		{:else if block.blockType === 'bar'}
			<div class="bar-chart">
				{#each chartData as point (point.label)}
					<div class="bar-row">
						<span class="bar-label">{point.label}</span>
						<div class="bar-track">
							<div
								class="bar-fill"
								style:width="{((point.value || 0) / maxValue) * 100}%"
								style:background={point.color || 'var(--color-accent)'}
							></div>
						</div>
						<span class="bar-value">{point.value}</span>
					</div>
				{/each}
			</div>
		{:else if block.blockType === 'donut'}
			<div class="donut-wrap">
				<svg viewBox="0 0 42 42" class="donut-svg">
					{#each donutSegments as seg}
						<circle
							cx="21"
							cy="21"
							r="15.9155"
							fill="none"
							stroke={seg.color}
							stroke-width="5"
							stroke-dasharray="{seg.dashLen} {2 * Math.PI * 15.9155 - seg.dashLen}"
							stroke-dashoffset={seg.dashOffset}
						/>
					{/each}
				</svg>
				<div class="donut-legend">
					{#each donutSegments as seg}
						<div class="legend-item">
							<span class="legend-dot" style:background={seg.color}></span>
							<span class="legend-text">{seg.label} ({seg.pct}%)</span>
						</div>
					{/each}
				</div>
			</div>
		{:else if block.blockType === 'flow'}
			<div class="flow-diagram">
				{#each flowSteps as step, i (step.label || i)}
					<div class="flow-node">
						<span class="flow-label">{step.label}</span>
						{#if step.description}
							<span class="flow-desc">{step.description}</span>
						{/if}
					</div>
					{#if i < flowSteps.length - 1}
						<span class="flow-arrow">&rarr;</span>
					{/if}
				{/each}
			</div>
		{/if}

		{#if block.caption}
			<p class="info-caption">{block.caption}</p>
		{/if}
	</div>
{/if}

<style>
	.infographic {
		padding: 1rem 1.1rem;
		border-radius: 0.85rem;
		border: 1px solid var(--color-edge);
		background: color-mix(in oklab, var(--color-panel) 55%, transparent);
		display: grid;
		gap: 0.6rem;
	}

	.info-title {
		margin: 0;
		font-size: 0.95rem;
	}

	.info-caption {
		margin: 0;
		font-size: 0.78rem;
		color: var(--color-muted-text);
		line-height: 1.5;
	}

	/* Stat callout */
	.stat-callout {
		text-align: center;
		padding: 0.8rem 0;
	}

	.stat-big {
		display: block;
		font-size: clamp(2.2rem, 5vw, 3.2rem);
		font-weight: 800;
		font-family: var(--font-heading);
		line-height: 1;
		color: var(--color-accent);
	}

	.stat-sub {
		display: block;
		margin-top: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted-text);
	}

	/* Bar chart */
	.bar-chart {
		display: grid;
		gap: 0.4rem;
	}

	.bar-row {
		display: grid;
		grid-template-columns: 100px 1fr 44px;
		align-items: center;
		gap: 0.5rem;
	}

	.bar-label {
		font-size: 0.76rem;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.bar-track {
		height: 18px;
		border-radius: 999px;
		background: color-mix(in oklab, var(--color-edge) 35%, transparent);
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		border-radius: 999px;
		transition: width 600ms ease;
	}

	.bar-value {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-muted-text);
	}

	/* Donut */
	.donut-wrap {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		flex-wrap: wrap;
	}

	.donut-svg {
		width: 120px;
		height: 120px;
		transform: rotate(-90deg);
		flex-shrink: 0;
	}

	.donut-legend {
		display: grid;
		gap: 0.3rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.legend-text {
		font-size: 0.78rem;
		color: var(--color-muted-text);
	}

	/* Flow diagram */
	.flow-diagram {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.flow-node {
		padding: 0.55rem 0.75rem;
		border-radius: 0.6rem;
		border: 1px solid var(--color-edge);
		background: color-mix(in oklab, var(--color-panel) 85%, transparent);
		display: grid;
		gap: 0.1rem;
		text-align: center;
	}

	.flow-label {
		font-size: 0.82rem;
		font-weight: 600;
	}

	.flow-desc {
		font-size: 0.68rem;
		color: var(--color-muted-text);
	}

	.flow-arrow {
		font-size: 1.1rem;
		color: var(--color-accent);
	}

	@media (max-width: 480px) {
		.flow-diagram {
			flex-direction: column;
		}

		.flow-arrow {
			transform: rotate(90deg);
		}

		.bar-row {
			grid-template-columns: 70px 1fr 36px;
		}
	}
</style>
