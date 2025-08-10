<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { browser } from '$app/environment';
	import type { DesignToken } from '$lib/types/designToken';
	import type { Navigation } from '$lib/types/navigation';
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { theme } from '$lib/stores/themeStore';
	import { onMount } from 'svelte';

	export let data: {
		tokens: { light: DesignToken | null; dark: DesignToken | null };
		navigation: Navigation | null;
		logoUrl: string | null;
	};

	// Keep track of current theme data
	let currentThemeData: DesignToken | null = null;
	let isHomePage = false;

	/**
	 * Apply design tokens to document root as CSS variables
	 */
	function applyTokens(tokenSet: DesignToken) {
		if (!tokenSet) return;

		// Colors
		for (const [key, val] of Object.entries(tokenSet.colors || {})) {
			if ((val as any)?.hex) {
				document.documentElement.style.setProperty(`--color-${key}`, (val as any).hex);
				// Map main colors to standard variables
				if (key === 'bodyBackground') {
					document.documentElement.style.setProperty('--color-background', (val as any).hex);
				}
				if (key === 'bodyText') {
					document.documentElement.style.setProperty('--color-foreground', (val as any).hex);
				}
			}
		}

		// Typography
		const ty = tokenSet.typography;
		if (ty) {
			// Base font - use consistent variable name
			const baseFont = ty.fontFamily === 'custom' ? ty.customFontFamily : ty.fontFamily;
			if (baseFont) {
				document.documentElement.style.setProperty('--font-family-base', baseFont);
				// Also set the alternate name for backwards compatibility
				document.documentElement.style.setProperty('--font-family', baseFont);
			}

			// Heading font
			const headingFont =
				ty.fontFamily === 'inherit'
					? baseFont
					: ty.fontFamily === 'custom'
						? ty.customFontFamily
						: ty.fontFamily;

			if (headingFont) {
				document.documentElement.style.setProperty('--font-family-heading', headingFont);
			}

			// Font sizes and weights
			if (typeof ty.fontSize === 'number' && ty.fontSize > 0) {
				document.documentElement.style.setProperty('--font-size-base', `${ty.fontSize}px`);
			}

			if (ty.fontWeight) {
				document.documentElement.style.setProperty('--font-weight', ty.fontWeight);
			}
		}
	}

	onMount(() => {
		if (!browser) return;

		// Check if we're on the homepage
		isHomePage = window.location.pathname === '/';

		// Apply initial theme
		const currentMode = $theme;
		currentThemeData = currentMode === 'dark' ? data.tokens.dark : data.tokens.light;
		if (currentThemeData) {
			applyTokens(currentThemeData);
			localStorage.setItem('designTokens', JSON.stringify(data.tokens));
		}

		// Subscribe to theme changes
		return theme.subscribe((newTheme) => {
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
			const tokens = newTheme === 'dark' ? data.tokens.dark : data.tokens.light;
			if (tokens) {
				currentThemeData = tokens;
				applyTokens(tokens);
				localStorage.setItem('designTokens', JSON.stringify(data.tokens));
			}
		});
	});
</script>

<svelte:head>
	<title>Greg D. Chan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Initialize theme from localStorage before hydration to prevent flash -->
	<script>
		(function () {
			// Get theme from localStorage or system preference
			const storedTheme =
				localStorage.getItem('theme') ||
				(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

			// Apply theme class
			document.documentElement.classList.toggle('dark', storedTheme === 'dark');

			// Try to restore design tokens from localStorage
			try {
				const tokens = JSON.parse(localStorage.getItem('designTokens') || '{}');
				const tokenSet = tokens[storedTheme] || {};

				// Apply color tokens
				if (tokenSet.colors) {
					Object.entries(tokenSet.colors).forEach(([key, val]) => {
						if (val?.hex) {
							document.documentElement.style.setProperty(`--color-${key}`, val.hex);
							if (key === 'bodyBackground') {
								document.documentElement.style.setProperty('--color-background', val.hex);
							}
							if (key === 'bodyText') {
								document.documentElement.style.setProperty('--color-foreground', val.hex);
							}
						}
					});
				}

				// Apply typography tokens
				if (tokenSet.typography) {
					const ty = tokenSet.typography;
					const baseFont = ty.fontFamily === 'custom' ? ty.customFontFamily : ty.fontFamily;

					if (baseFont) {
						document.documentElement.style.setProperty('--font-family-base', baseFont);
					}

					if (typeof ty.baseFontSize === 'number' && ty.baseFontSize > 0) {
						document.documentElement.style.setProperty('--font-size-base', `${ty.baseFontSize}px`);
					}

					if (ty.baseFontWeight) {
						document.documentElement.style.setProperty('--font-weight', ty.baseFontWeight);
					}

					const headingFont =
						ty.headerFontFamily === 'inherit'
							? baseFont
							: ty.headerFontFamily === 'custom'
								? ty.customHeaderFontFamily
								: ty.headerFontFamily;

					if (headingFont) {
						document.documentElement.style.setProperty('--font-family-heading', headingFont);
					}
				}
			} catch (e) {
				console.error('Error restoring design tokens:', e);
			}
		})();
	</script>
</svelte:head>

<Header navigation={data.navigation} logoUrl={data.logoUrl} />

<main class="bg-background text-foreground">
	<div class="site-container">
		{#if isHomePage}
			<div in:fade={{ duration: 150, delay: 150 }}>
				<slot />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
</main>

<Footer />

<style>
	:root {
		--font-family-base:
			system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		--font-family: var(--font-family-base); /* For backwards compatibility */
		--font-family-heading: var(--font-family-base);
		--font-size-base: 16px;
		--line-height-base: 1.5;
		--font-weight: 400;
	}

	html,
	body {
		font-family: var(--font-family-base);
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		font-weight: var(--font-weight);
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--font-family-heading);
	}
</style>
