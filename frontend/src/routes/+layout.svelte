<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { tokenToStyles } from '$lib/utils/design';

	let { data, children } = $props();

	const navigation = data?.navigation;
	const tokens = data?.tokens;
	const LOGO_URL =
		'https://cdn.sanity.io/images/smxz6rsz/production/cffa41f6cfe0c1d511f2555b7cc1b5afa1279881-431x74.webp';

	let currentMode = $state('dark');
	let dynamicStyles = $derived(tokenToStyles((tokens as any)?.[currentMode]));
	let logoUrl = $derived(LOGO_URL);

	function applyTheme(mode: string) {
		if (typeof window === 'undefined') return;
		document.documentElement.classList.toggle('dark', mode === 'dark');
		document.documentElement.setAttribute('data-theme-mode', mode);
		localStorage.setItem('theme', mode);
	}

	function toggleTheme() {
		currentMode = currentMode === 'dark' ? 'light' : 'dark';
		applyTheme(currentMode);
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			currentMode = savedTheme;
		} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			currentMode = 'light';
		}
		applyTheme(currentMode);
	});
</script>

<svelte:head>
	<style>
		:root {
			{@html dynamicStyles}
		}
	</style>
</svelte:head>

<!-- Skip Navigation for a11y keyboard users -->
<a href="#main-content" class="skip-nav">Skip to main content</a>

<div class="site-shell">
	<div class="aurora aurora-a" aria-hidden="true"></div>
	<div class="aurora aurora-b" aria-hidden="true"></div>
	<div class="noise-layer" aria-hidden="true"></div>

	<Header {navigation} {currentMode} onToggleTheme={toggleTheme} {logoUrl} />

	<main id="main-content" class="site-main" tabindex="-1">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.site-shell {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		position: relative;
		isolation: isolate;
		background:
			radial-gradient(circle at 8% 12%, var(--app-bg-radial-a), transparent 42%),
			radial-gradient(circle at 88% 10%, var(--app-bg-radial-b), transparent 38%),
			linear-gradient(
				180deg,
				var(--app-bg-top) 0%,
				var(--app-bg-mid) 52%,
				var(--app-bg-bottom) 100%
			);
		color: var(--color-body-text, #e5e7eb);
	}

	.aurora {
		position: fixed;
		z-index: -2;
		pointer-events: none;
		filter: blur(90px);
		opacity: 0.5;
		contain: strict;
	}

	.aurora-a {
		width: min(460px, 50vw);
		height: min(460px, 50vw);
		left: -90px;
		top: 14%;
		background: var(--app-glow-a);
	}

	.aurora-b {
		width: min(390px, 42vw);
		height: min(390px, 42vw);
		right: -100px;
		bottom: 12%;
		background: var(--app-glow-b);
	}

	.noise-layer {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background-image: radial-gradient(rgba(255, 255, 255, 0.035) 0.55px, transparent 0.55px);
		background-size: 3px 3px;
		opacity: 0.25;
		contain: strict;
	}

	.site-main {
		flex: 1;
		width: 100%;
		overflow-x: clip;
		outline: none;
	}

	:global(body) {
		margin: 0;
		background: var(--app-body-bg, #030712);
		color: var(--color-body-text, #e5e7eb);
		font-family: var(--font-sans, sans-serif);
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		color: var(--heading-color, inherit);
		font-family: var(--font-heading, var(--font-sans, sans-serif));
	}

	:global(h1) {
		font-size: var(--h1-font-size, inherit);
		line-height: var(--h1-line-height, inherit);
	}

	:global(h2) {
		font-size: var(--h2-font-size, inherit);
		line-height: var(--h2-line-height, inherit);
	}

	/* Reduce visual complexity on small screens for performance */
	@media (max-width: 480px) {
		.aurora {
			display: none;
		}

		.noise-layer {
			opacity: 0.12;
		}
	}
</style>
