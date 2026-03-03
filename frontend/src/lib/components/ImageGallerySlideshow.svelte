<script lang="ts">
	import AppIcon from '$lib/components/icons/AppIcon.svelte';
	import SanityImage from '$lib/components/SanityImage.svelte';

	type SlideImage = { image: any; alt: string; caption?: string };

	let {
		images = [],
		openLightbox
	}: {
		images: SlideImage[];
		openLightbox: (items: SlideImage[], index: number) => void;
	} = $props();

	let current = $state(0);

	function prev() {
		current = (current - 1 + images.length) % images.length;
	}

	function next() {
		current = (current + 1) % images.length;
	}
</script>

{#if images.length === 1}
	<button
		type="button"
		class="slide-single"
		onclick={() => openLightbox(images, 0)}
		aria-label="Open image"
	>
		<SanityImage image={images[0].image} alt={images[0].alt} loading="lazy" />
		<span class="open-tag">Open image</span>
	</button>
{:else if images.length > 1}
	<div class="slideshow">
		<div class="slide-viewport">
			<button
				type="button"
				class="slide-image"
				onclick={() => openLightbox(images, current)}
				aria-label="Open image in lightbox"
			>
				<SanityImage image={images[current].image} alt={images[current].alt} loading="lazy" />
				<span class="open-tag">Open image</span>
			</button>
		</div>

		<div class="slide-controls">
			<button type="button" class="slide-nav" onclick={prev} aria-label="Previous image">
				<AppIcon name="arrow-left" size={16} />
			</button>
			<span class="slide-counter">{current + 1} / {images.length}</span>
			<button type="button" class="slide-nav" onclick={next} aria-label="Next image">
				<AppIcon name="arrow-right" size={16} />
			</button>
		</div>
	</div>
{/if}

<style>
	.slide-single,
	.slide-image {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow: hidden;
		border-radius: 1rem;
		border: 1px solid color-mix(in oklab, var(--color-edge) 82%, transparent);
		background: color-mix(in oklab, var(--color-panel) 84%, transparent);
		box-shadow: 0 12px 34px color-mix(in oklab, black 12%, transparent);
		cursor: zoom-in;
		transition:
			transform 220ms ease,
			border-color 220ms ease;
	}

	.slide-single:hover,
	.slide-image:hover {
		transform: translateY(-2px);
		border-color: color-mix(in oklab, var(--color-accent) 54%, var(--color-edge));
	}

	:global(.slide-single .main-image),
	:global(.slide-image .main-image) {
		display: block;
		width: 100%;
		height: auto;
		max-height: 72vh;
		object-fit: cover;
	}

	.open-tag {
		position: absolute;
		right: 0.64rem;
		bottom: 0.64rem;
		padding: 0.25rem 0.44rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.61rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		background: color-mix(in oklab, var(--color-accent) 56%, black);
		color: var(--color-on-accent, #fff6e8);
	}

	.slideshow {
		display: grid;
		gap: 0.6rem;
	}

	.slide-viewport {
		position: relative;
	}

	.slide-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.slide-nav {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 999px;
		border: 1px solid var(--color-edge);
		background: var(--color-control-bg);
		cursor: pointer;
		transition: border-color 180ms ease;
	}

	.slide-nav:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.slide-counter {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: var(--color-muted-text);
	}
</style>
