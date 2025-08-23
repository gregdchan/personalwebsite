<script lang="ts">
	import { onMount, afterNavigate } from 'svelte';
	import { browser } from '$app/environment';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { designTokens, activeLogoUrl } from '$lib/stores/themeStore';
	import type { DesignToken } from '$lib/types/designToken';
	import type { Navigation } from '$lib/types/navigation';
	import '../app.css';

	export let data: {
		tokens: { light: DesignToken | null; dark: DesignToken | null };
		navigation: Navigation | null;
	};

	onMount(() => {
		// This runs once the page is fully interactive.
		// We set the design tokens from the server.
		designTokens.set(data.tokens);

		// Now that the page is loaded, we remove the 'no-transitions' class
		// to re-enable animations for user interactions (like theme toggling).
		document.body.classList.remove('no-transitions');
	});

	// After navigating to a new page, re-apply the 'no-transitions' class
	// and then remove it after a short delay. This prevents flashes on client-side navigation.
	afterNavigate(() => {
		document.body.classList.add('no-transitions');
		setTimeout(() => {
			document.body.classList.remove('no-transitions');
		}, 100); // A short delay is enough for the DOM to update.
	});
</script>

<svelte:head>
	<title>Greg D. Chan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- 
	This inline script is the core of the FOUC fix.
	It runs instantly, before Svelte hydrates and before the browser paints the page.
  -->
	<script>
		(function () {
			// Immediately set the 'no-transitions' class on the body.
			document.body.classList.add('no-transitions');

			// Determine the theme from localStorage or system preference.
			const storedTheme =
				localStorage.getItem('theme') ||
				(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

			// Apply the theme class to the root <html> element.
			document.documentElement.classList.toggle('dark', storedTheme === 'dark');
			document.documentElement.setAttribute('data-theme', storedTheme);
		})();
	</script>
</svelte:head>

<div class="main-container">
	<Header navigation={data.navigation} logoUrl={$activeLogoUrl} />

	<main>
		<slot />
	</main>

	<Footer />
</div>

