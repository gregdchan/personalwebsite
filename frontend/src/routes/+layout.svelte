<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { designTokens, activeLogoUrl, theme, applyThemeToDocument } from '$lib/stores/themeStore';
	import type { Navigation } from '$lib/types/navigation';
	import type { DesignToken } from '$lib/types/designToken';

	export let data: {
		navigation: Navigation | null;
		tokens: {
			light: DesignToken | null;
			dark: DesignToken | null;
		};
		errorPages: unknown;
	};

	onMount(() => {
		designTokens.set(data.tokens);
		applyThemeToDocument(); // Apply theme class to document
	});
</script>

<div class="min-h-screen flex flex-col">
	<Header navigation={data.navigation} logoUrl={$activeLogoUrl} />

	<main class="flex-1">
		<slot />
	</main>

	<Footer />
</div>
