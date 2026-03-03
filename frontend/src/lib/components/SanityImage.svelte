<script lang="ts">
	import { optimizedUrl } from '$lib/sanity';
	import { onMount } from 'svelte';

	let {
		image,
		alt = '',
		width = 800,
		class: className = '',
		loading = 'lazy',
		fetchpriority = 'auto'
	}: {
		image: any;
		alt?: string;
		width?: number;
		class?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
	} = $props();

	const isStatic = $derived(typeof image === 'string');
	const asset = $derived(image?.asset || image);
	const lqip = $derived(isStatic ? null : asset?.metadata?.lqip);
	const dimensions = $derived(isStatic ? null : asset?.metadata?.dimensions);
	const src = $derived(isStatic ? image : optimizedUrl(image, width));
	const imageAlt = $derived(alt || image?.alt || '');

	let isLoaded = $state(false);

	function handleLoad() {
		isLoaded = true;
	}
</script>

<div
	class="sanity-image-container {className}"
	style:aspect-ratio={dimensions ? `${dimensions.width} / ${dimensions.height}` : undefined}
>
	{#if lqip}
		<img src={lqip} alt="" aria-hidden="true" class="lqip-placeholder" class:hidden={isLoaded} />
	{/if}

	<img
		{src}
		alt={imageAlt}
		{loading}
		{fetchpriority}
		decoding="async"
		class="main-image"
		class:visible={isLoaded || !lqip}
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
		opacity: 0;
		transition: opacity 500ms ease;
	}

	.main-image.visible {
		opacity: 1;
	}
</style>
