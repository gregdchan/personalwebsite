<script lang="ts">
	import { optimizedUrl } from '$lib/sanity';
	import { onMount } from 'svelte';

	let {
		image,
		alt = '',
		width = 800,
		height,
		class: className = '',
		loading = 'lazy',
		fetchpriority = 'auto'
	}: {
		image: any;
		alt?: string;
		width?: number;
		height?: number;
		class?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
	} = $props();

	const isStatic = $derived(typeof image === 'string');
	const asset = $derived(image?.asset || image);
	const lqip = $derived(isStatic ? null : asset?.metadata?.lqip);
	const dimensions = $derived(isStatic ? null : asset?.metadata?.dimensions);
	const src = $derived(isStatic ? image : optimizedUrl(image, width, 80, height));
	const imageAlt = $derived(alt || image?.alt || '');
	const resolvedAspectRatio = $derived(
		typeof height === 'number' && height > 0
			? `${width} / ${height}`
			: dimensions
				? `${dimensions.width} / ${dimensions.height}`
				: undefined
	);

	let isLoaded = $state(false);
	let imgElement = $state<HTMLImageElement | null>(null);
	let loadedInstantly = $state(false);

	onMount(() => {
		if (imgElement?.complete) {
			isLoaded = true;
			loadedInstantly = true;
		}
	});

	function handleLoad() {
		isLoaded = true;
	}
</script>

<div
	class="sanity-image-container {className}"
	style:aspect-ratio={resolvedAspectRatio}
>
	{#if lqip}
		<img src={lqip} alt="" aria-hidden="true" class="lqip-placeholder" class:hidden={isLoaded} />
	{/if}

	<img
		bind:this={imgElement}
		{src}
		alt={imageAlt}
		{loading}
		{fetchpriority}
		decoding="async"
		class="main-image"
		class:visible={isLoaded || !lqip}
		class:instant={loadedInstantly}
		onload={handleLoad}
		width={dimensions?.width}
		height={dimensions?.height}
	/>
</div>

<style>
	.sanity-image-container {
		position: relative;
		overflow: hidden;
		background-color: color-mix(in oklab, var(--color-panel) 80%, black);
		width: 100%;
		display: block;
	}

	.lqip-placeholder {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		filter: blur(20px);
		transform: scale(1.1);
		transition: opacity 400ms ease;
	}

	.lqip-placeholder.hidden {
		opacity: 0;
	}

	.main-image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0;
		transition: opacity 300ms ease-out;
		will-change: opacity;
	}

	.main-image.instant {
		transition: none !important;
	}

	.main-image.visible {
		opacity: 1;
	}
</style>
