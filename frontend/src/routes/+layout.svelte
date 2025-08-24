<script lang="ts">
        import { onMount } from 'svelte';
        import { beforeNavigate, afterNavigate } from '$app/navigation';
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
                // Re-enable transitions after first paint
                document.documentElement.classList.remove('no-transitions');
                document.body.classList.remove('no-transitions');
        });

        beforeNavigate(() => {
                document.body.classList.add('no-transitions');
        });

        afterNavigate(() => {
                requestAnimationFrame(() => {
                        document.body.classList.remove('no-transitions');
                });
        });
</script>

<svelte:head>
        <title>Greg D. Chan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="main-container">
	<Header navigation={data.navigation} logoUrl={$activeLogoUrl} />

	<main>
		<slot />
	</main>

	<Footer />
</div>
