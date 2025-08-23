<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation'; // ✅ correct hook
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
		// Apply server-supplied tokens to the store
		designTokens.set(data.tokens);

		// Re-enable transitions once the page has mounted
		document.body.classList.remove('no-transitions');
	});

	afterNavigate(() => {
		// Add a quick "no-transitions" reset on client-side route changes
		document.body.classList.add('no-transitions');
		setTimeout(() => {
			document.body.classList.remove('no-transitions');
		}, 100);
	});
</script>

<svelte:head>
	<title>Greg D. Chan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- FOUC Fix: runs instantly before hydration -->
	<script>
		(function () {
			document.body.classList.add('no-transitions');

			const storedTheme =
				localStorage.getItem('theme') ||
				(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

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
