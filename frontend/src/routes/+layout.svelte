<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { tokenToStyles } from '$lib/utils/design';

	let { data, children } = $props();

	const navigation = data?.navigation;
	const tokens = data?.tokens;

	// We assume a default "dark" mode for this personal website
	let currentMode = $state('dark');

	// Dynamic CSS variables from Sanity
	let dynamicStyles = $derived(tokenToStyles((tokens as any)?.[currentMode]));

	function toggleTheme() {
		currentMode = currentMode === 'dark' ? 'light' : 'dark';
		if (typeof window !== 'undefined') {
			document.documentElement.classList.toggle('dark', currentMode === 'dark');
			localStorage.setItem('theme', currentMode);
		}
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			currentMode = savedTheme;
		} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			currentMode = 'light';
		}
		document.documentElement.classList.toggle('dark', currentMode === 'dark');
	});
</script>

<svelte:head>
	<style>
    :root {
      {@html dynamicStyles}
    }
	</style>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-surface-50-950 text-surface-900-100 selection:bg-primary-500/30"
>
	<Header {navigation} {currentMode} onToggleTheme={toggleTheme} logoUrl={null} />

	<main class="flex-grow">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	:global(body) {
		@apply transition-colors duration-300;
		background-color: var(--color-page-bg, inherit);
		color: var(--color-body-text, inherit);
		font-family: var(--font-sans, inherit);
	}

	:global(h1, h2, h3, h4, h5, h6) {
		color: var(--heading-color, inherit);
		font-family: var(--font-heading, inherit);
	}

	:global(h1) {
		font-size: var(--h1-font-size, inherit);
		line-height: var(--h1-line-height, inherit);
	}
	:global(h2) {
		font-size: var(--h2-font-size, inherit);
		line-height: var(--h2-line-height, inherit);
	}
</style>
