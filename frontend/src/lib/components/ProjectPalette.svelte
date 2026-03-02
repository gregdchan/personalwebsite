<script lang="ts">
	let { palette = null }: { palette: any } = $props();

	const swatches = $derived(Array.isArray(palette?.swatches) ? palette.swatches : []);

	function hexFromColor(color: any): string {
		return color?.hex || '#888888';
	}

	function textColor(hex: string): string {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.55 ? '#1a1a1a' : '#f5f5f5';
	}
</script>

{#if swatches.length > 0}
	<div class="palette-block">
		{#if palette?.title}
			<h3 class="palette-title">{palette.title}</h3>
		{/if}
		{#if palette?.description}
			<p class="palette-rationale">{palette.description}</p>
		{/if}
		<div class="swatch-row">
			{#each swatches as swatch (swatch._key)}
				{@const hex = hexFromColor(swatch.color)}
				<div class="swatch" style:--swatch-bg={hex} style:--swatch-text={textColor(hex)}>
					<div class="swatch-fill"></div>
					<div class="swatch-info">
						<span class="swatch-label">{swatch.label || 'Color'}</span>
						<code class="swatch-hex">{hex}</code>
						{#if swatch.usage}
							<span class="swatch-usage">{swatch.usage}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.palette-block {
		display: grid;
		gap: 0.6rem;
	}

	.palette-title {
		margin: 0;
		font-size: 1.05rem;
	}

	.palette-rationale {
		margin: 0;
		line-height: 1.65;
		color: var(--color-muted-text);
	}

	.swatch-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.swatch {
		flex: 1 1 120px;
		min-width: 100px;
		max-width: 180px;
		border-radius: 0.75rem;
		border: 1px solid var(--color-edge);
		overflow: hidden;
		background: var(--color-panel);
	}

	.swatch-fill {
		height: 56px;
		background: var(--swatch-bg);
	}

	.swatch-info {
		padding: 0.45rem 0.55rem;
		display: grid;
		gap: 0.15rem;
	}

	.swatch-label {
		font-size: 0.78rem;
		font-weight: 600;
	}

	.swatch-hex {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.04em;
		color: var(--color-muted-text);
	}

	.swatch-usage {
		font-size: 0.66rem;
		color: var(--color-muted-text);
	}
</style>
