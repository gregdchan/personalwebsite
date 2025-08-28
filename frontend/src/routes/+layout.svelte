<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { designTokens, activeLogoUrl, applyThemeToDocument } from '$lib/stores/themeStore';
	import type { Navigation } from '$lib/types/navigation';
	import type { DesignToken } from '$lib/types/designToken';
	import { derived } from 'svelte/store';
	import { activeTokens } from '$lib/stores/themeStore';

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

	const familyName = (input?: string | null) =>
		input?.split(',')[0]?.replace(/['"]/g, '').trim();

	const isGoogleFamily = (name?: string) =>
		name === 'Inter' || name === 'Poppins' || name === 'Roboto';

	// Include header weight in Google Fonts request
	export const googleFontsHref = derived(activeTokens, (t) => {
		const ty = t?.typography;
		if (!ty) return null;

		const bodySel =
			ty.bodyFontFamily === 'custom' ? ty.customBodyFontFamily : ty.bodyFontFamily;

		const headingSel =
			ty.headingFontFamily === 'inherit'
				? bodySel
				: ty.headingFontFamily === 'custom'
				? ty.customHeadingFontFamily
				: ty.headingFontFamily;

		const bodyName = familyName(bodySel);
		const headingName = familyName(headingSel);

		const families = Array.from(new Set([bodyName, headingName].filter(Boolean))) as string[];
		const googleFamilies = families.filter(isGoogleFamily);
		if (googleFamilies.length === 0) return null;

		const weights = new Set<string>();
		if (ty.baseFontWeight) weights.add(String(ty.baseFontWeight));
		const levels: any = ty.levels ?? {};
		for (const tag of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
			const w = levels?.[tag]?.fontWeight;
			if (w) weights.add(String(w));
		}
		// NEW: header font weight
		const headerW = (ty as any)?.header?.fontWeight;
		if (headerW) weights.add(String(headerW));

		if (weights.size === 0) weights.add('400');

		const weightList = Array.from(weights).sort().join(';');
		const familyParams = googleFamilies
			.map((n) => `family=${encodeURIComponent(n)}:wght@${weightList}`)
			.join('&');

		return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
	});

	// Derive header CSS vars (family, size, weight)
	const headerVars = derived(activeTokens, (t) => {
		const ty = t?.typography;
		if (!ty) return null;
		const h: any = (ty as any)?.header ?? {};
		const resolveFamily = (sel?: string | null, custom?: string | null) => {
			if (!sel || sel === 'inherit') {
				const hSel = ty.headingFontFamily === 'inherit' ? ty.bodyFontFamily : ty.headingFontFamily;
				return hSel === 'custom' ? ty.customHeadingFontFamily : hSel;
			}
			return sel === 'custom' ? custom : sel;
		};
		return {
			family: resolveFamily(h.fontFamily, h.customHeaderFontFamily),
			sizePx: h.fontSize ? `${h.fontSize}px` : null,
			weight: h.fontWeight || null
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	{#if $googleFontsHref}
		<link rel="stylesheet" href={$googleFontsHref} />
	{/if}
</svelte:head>

<!-- Apply body and heading font-family from tokens -->
<div
	class="min-h-screen bg-[var(--color-body-bg)] text-[var(--color-body-text)]"
	style="
		--font-header: {$headerVars?.family || 'var(--font-heading)'};
		--header-font-size: {$headerVars?.sizePx || '16px'};
		--header-font-weight: {$headerVars?.weight || 'var(--base-font-weight, 500)'};
	"
>
	<Header navigation={data.navigation} logoUrl={$activeLogoUrl} />

	<main class="flex-1">
		<slot />
	</main>

	<Footer />
</div>

<style>
	:global(html),
	:global(body) {
		font-family: var(--font-body);
	}
	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		font-family: var(--font-heading);
	}
	/* If you use @tailwind/typography */
	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4),
	:global(.prose h5),
	:global(.prose h6) {
		font-family: var(--font-heading);
	}
</style>
