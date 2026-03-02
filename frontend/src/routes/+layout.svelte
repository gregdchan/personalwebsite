<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { tokenToStyles } from '$lib/utils/design';

	let { data, children } = $props();

	const navigation = data?.navigation;
	const tokens = data?.tokens;

	let currentMode = $state('dark');
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

<div class="site-shell">
	<div class="aurora aurora-a"></div>
	<div class="aurora aurora-b"></div>
	<div class="noise-layer"></div>

	<Header {navigation} {currentMode} onToggleTheme={toggleTheme} logoUrl={null} />

	<main class="site-main">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.site-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		isolation: isolate;
		background:
			radial-gradient(circle at 8% 12%, rgba(30, 64, 175, 0.23), transparent 42%),
			radial-gradient(circle at 88% 10%, rgba(14, 116, 144, 0.26), transparent 38%),
			linear-gradient(180deg, #040712 0%, #060d1b 52%, #04070f 100%);
		color: var(--color-body-text, #e5e7eb);
	}

	.aurora {
		position: fixed;
		z-index: -2;
		pointer-events: none;
		filter: blur(90px);
		opacity: 0.5;
	}

	.aurora-a {
		width: 460px;
		height: 460px;
		left: -90px;
		top: 14%;
		background: rgba(30, 64, 175, 0.26);
	}

	.aurora-b {
		width: 390px;
		height: 390px;
		right: -100px;
		bottom: 12%;
		background: rgba(14, 116, 144, 0.28);
	}

	.noise-layer {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background-image: radial-gradient(rgba(255, 255, 255, 0.035) 0.55px, transparent 0.55px);
		background-size: 3px 3px;
		opacity: 0.25;
	}

	.site-main {
		flex: 1;
		width: 100%;
		overflow-x: clip;
	}

	:global(body) {
		margin: 0;
		background: #030712;
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
</style>
