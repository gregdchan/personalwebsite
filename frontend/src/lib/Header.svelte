<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import type { Navigation } from '$lib/types/navigation';
	import type { NavItem } from '$lib/types/navigation'; // keep your existing types
	import { urlFor, logoSrcsetWebp } from '$lib/utils/sanityImage';
	import { logoCache } from '$lib/stores/logoStore';

	/** Props **/
	export let navigation: Navigation | null;
	export let currentTheme: 'light' | 'dark' = 'light';
	export let currentThemeData: any = {};

	/** Local state **/
	let mobileMenuOpen = false;
	let headerElement: HTMLElement;

	// We keep a stable, local copy of the logo props so the <img> doesn't flip sources
	let logoUrl = '';
	let logoSrcset = '';
	let logoAlt = '';

	const dispatch = createEventDispatcher<{ themeChange: { theme: 'light' | 'dark' } }>();

	/** Helpers **/
	function setLogoFromThemeData() {
		// Build from Sanity only if a logo asset is present
		if (currentThemeData?.logo?.asset?._ref) {
			const url = urlFor(currentThemeData.logo).width(360).auto('format').quality(95).url();
			const srcset = logoSrcsetWebp(currentThemeData.logo, 360, 95, 'webp');
			const alt = currentThemeData.themeName || 'Site Logo';

			// Update local state (stable for template)
			logoUrl = url || '';
			logoSrcset = srcset || '';
			logoAlt = alt;

			// Persist in your existing store (same shape you used before)
			logoCache.set({ url: logoUrl, srcset: logoSrcset, alt: logoAlt });
		}
	}

	// Initialize once on mount: prefer cache, otherwise compute from current theme data
	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		const cached = $logoCache;
		if (cached?.url) {
			logoUrl = cached.url;
			logoSrcset = cached.srcset || '';
			logoAlt = cached.alt || 'Site Logo';
		} else {
			setLogoFromThemeData();
		}

		return () => document.removeEventListener('click', handleClickOutside);
	});

	// Update only when the theme's identity changes relative to what's in cache
	// (prevents recomputation on every navigation)
	$: if (currentTheme && currentThemeData?.themeName) {
		if ($logoCache?.alt !== currentThemeData.themeName) {
			setLogoFromThemeData();
		}
	}

	/** Events & UI handlers **/
	function handleThemeChange(event: CustomEvent<{ theme: 'light' | 'dark' }>) {
		dispatch('themeChange', event.detail);
	}

	function getHref(item: NavItem): string {
		if (typeof item.link === 'string') return item.link;
		if (item.link?.external) return item.link.external;
		const slug = item.link?.internal?.slug?.current;
		return slug ? `/${slug}` : '#';
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		if (mobileMenuOpen && headerElement && !headerElement.contains(event.target as Node)) {
			mobileMenuOpen = false;
		}
	}
</script>

<header
	bind:this={headerElement}
	class="bg-header text-header border-gray-200 dark:border-gray-700 flex items-center"
	style="height: 100px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);"
>
	<nav class="site-container w-full">
		<div class="flex h-16 items-center justify-between">
			<div class="flex-shrink-0 flex items-center">
				<a href="/" class="nav-link flex items-center space-x-2" aria-label="Home">
					{#if logoUrl}
						<img
							src={logoUrl}
							srcset={logoSrcset}
							alt={logoAlt}
							width="160"
							height="40"
							decoding="async"
							loading="eager"
							fetchpriority="high"
							style="display:block"
							class="logo-img"
						/>
					{:else}
						<span class="text-xl font-bold">Greg D. Chan</span>
					{/if}
				</a>
			</div>

			<div class="flex items-center space-x-6">
				<div class="hidden md:block">
					<div class="flex items-baseline space-x-4">
						{#if navigation?.items}
							{#each navigation.items as item}
								<a
									href={getHref(item)}
									class="nav-link hover:text-primary rounded-md px-3 py-2 text-sm transition-colors"
									target={item.target || '_self'}
								>
									{item.text}
								</a>
							{/each}
						{/if}
					</div>
				</div>

				<ThemeToggle {currentTheme} on:themeChange={handleThemeChange} />

				<div class="md:hidden">
					<button
						type="button"
						on:click|stopPropagation={toggleMobileMenu}
						class="bg-header text-header hover:text-primary focus:ring-primary inline-flex h-10 w-10 items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none focus:ring-inset"
						aria-controls="mobile-menu"
						aria-expanded={mobileMenuOpen}
					>
						<span class="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
						<div class="relative flex h-6 w-6 items-center justify-center">
							<span
								class="absolute h-0.5 w-6 origin-center bg-current transition-all duration-300 ease-in-out"
								style={mobileMenuOpen
									? 'transform: rotate(45deg);'
									: 'transform: translateY(-4px);'}
							></span>
							<span
								class="absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out"
								style={mobileMenuOpen ? 'opacity: 0; transform: scale(0);' : 'opacity: 1;'}
							></span>
							<span
								class="absolute h-0.5 w-6 origin-center bg-current transition-all duration-300 ease-in-out"
								style={mobileMenuOpen
									? 'transform: rotate(-45deg);'
									: 'transform: translateY(4px);'}
							></span>
						</div>
					</button>
				</div>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div 
				id="mobile-menu" 
				class="md:hidden fixed top-[100px] left-0 right-0 z-50 bg-header text-header border-t border-gray-200 dark:border-gray-700 shadow-lg"
				transition:slide={{ duration: 300, easing: cubicOut }}
			>
				<div class="space-y-2 py-4 max-h-[80vh] overflow-y-auto">
					{#if navigation?.items}
						{#each navigation.items as item}
							<div class="px-4 py-2 border-b border-gray-100 dark:border-gray-800 last:border-none">
								<a
									href={getHref(item)}
									class="nav-link hover:text-primary block text-base transition-colors"
									target={item.target || '_self'}
									style="font-family: var(--font-family-base);"
								>
									{item.text}
								</a>
								{#if item.children?.length}
									<div class="pl-4 mt-2 space-y-2">
										{#each item.children as child}
											<a
												href={getHref(child)}
												class="nav-link hover:text-primary block text-base transition-colors"
												target={child.target || '_self'}
												style="font-family: var(--font-family-base);"
											>
												{child.text}
											</a>
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</nav>
</header>
