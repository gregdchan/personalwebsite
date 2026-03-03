<script lang="ts">
	type StoryImage = { src: string; alt: string; caption?: string };

	let {
		comparisons = [],
		openLightbox
	}: {
		comparisons: any[];
		openLightbox: (items: StoryImage[], index: number) => void;
	} = $props();

	function imageToStory(img: any, fallbackAlt: string): StoryImage | null {
		const src = img?.asset?.url;
		if (!src) return null;
		return { src, alt: img?.alt || fallbackAlt };
	}
</script>

{#if comparisons.length > 0}
	<div class="comparisons">
		{#each comparisons as comp, i (comp._key || i)}
			{@const beforeImg = imageToStory(comp.before, 'Before')}
			{@const afterImg = imageToStory(comp.after, 'After')}
			{@const pair = [beforeImg, afterImg].filter(Boolean) as StoryImage[]}
			<div class="comparison" class:stacked={comp.layout === 'stacked'}>
				{#if comp.title}
					<h4 class="comp-title">{comp.title}</h4>
				{/if}
				{#if comp.context}
					<p class="comp-context">{comp.context}</p>
				{/if}
				<div class="comp-images" class:side-by-side={comp.layout !== 'stacked'}>
					{#if beforeImg}
						<div class="comp-frame">
							<span class="comp-label before">Before</span>
							<button
								type="button"
								class="comp-img-btn"
								onclick={() => openLightbox(pair, 0)}
								aria-label="Open before image"
							>
								<img src={beforeImg.src} alt={beforeImg.alt} loading="lazy" decoding="async" />
							</button>
						</div>
					{/if}
					{#if afterImg}
						<div class="comp-frame">
							<span class="comp-label after">After</span>
							<button
								type="button"
								class="comp-img-btn"
								onclick={() => openLightbox(pair, beforeImg ? 1 : 0)}
								aria-label="Open after image"
							>
								<img src={afterImg.src} alt={afterImg.alt} loading="lazy" decoding="async" />
							</button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.comparisons {
		display: grid;
		gap: 1.5rem;
	}

	.comparison {
		display: grid;
		gap: 0.5rem;
	}

	.comp-title {
		margin: 0;
		font-size: 1rem;
	}

	.comp-context {
		margin: 0;
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--color-muted-text);
	}

	.comp-images {
		display: grid;
		gap: 0.65rem;
	}

	.comp-images.side-by-side {
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 600px) {
		.comp-images.side-by-side {
			grid-template-columns: 1fr;
		}
	}

	.comp-frame {
		position: relative;
	}

	.comp-label {
		position: absolute;
		top: 0.45rem;
		left: 0.45rem;
		z-index: 1;
		padding: 0.18rem 0.44rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.58rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.comp-label.before {
		background: color-mix(in oklab, var(--color-muted-text) 25%, transparent);
		color: var(--color-body-text);
		border: 1px solid var(--color-edge);
	}

	.comp-label.after {
		background: color-mix(in oklab, var(--color-accent) 30%, transparent);
		color: var(--color-accent);
		border: 1px solid color-mix(in oklab, var(--color-accent) 40%, transparent);
	}

	.comp-img-btn {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		border-radius: 0.75rem;
		border: 1px solid var(--color-edge);
		overflow: hidden;
		cursor: zoom-in;
		background: transparent;
		transition: border-color 180ms ease;
	}

	.comp-img-btn:hover {
		border-color: color-mix(in oklab, var(--color-accent) 54%, var(--color-edge));
	}

	.comp-img-btn img {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
