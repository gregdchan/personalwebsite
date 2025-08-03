<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import type { Navigation, NavItem } from '$lib/types/navigation';
	import type { DesignToken } from '$lib/types/designToken';
	import { fade } from 'svelte/transition';
	import { urlFor, logoSrcsetWebp } from '$lib/utils/sanityImage';
	import { logoCache } from '$lib/stores/logoStore';

	/** Props **/
	export let navigation: Navigation | null;
	export let currentTheme: 'light' | 'dark' = 'light';
	export let currentThemeData: DesignToken | null = null;

	/** Local state **/
	let mobileMenuOpen = false;
	let headerElement: HTMLElement;
	let logoUrl = '';
	let logoSrcset = '';
	let logoAlt = '';

	/** Process logo data once when component mounts or theme changes **/
	$: if (currentThemeData?.logo?.asset?._ref) {
		// First check if we already have this logo cached
		if (!$logoCache || $logoCache.alt !== currentThemeData.themeName) {
			// Generate high quality logo URL - using 3x size for sharpness
			logoUrl = urlFor(currentThemeData.logo)
				.width(360) // Triple size for sharpness
				.auto('format')
				.quality(95) // Higher quality for logo
				.url();

			logoSrcset = logoSrcsetWebp(currentThemeData.logo, 360, 95, 'webp');
			logoAlt = currentThemeData.themeName || 'Site Logo';

			// Store in the persistent cache
			logoCache.set({
				url: logoUrl,
				srcset: logoSrcset,
				alt: logoAlt
			});
		} else {
			// Use cached values
			logoUrl = $logoCache.url;
			logoSrcset = $logoCache.srcset;
			logoAlt = $logoCache.alt;
		}
	}

	/** Show logo whenever data includes a logo reference or we have cached data **/
	$: showLogo = Boolean(currentThemeData?.logo?.asset?._ref) || Boolean($logoCache);

	/** Theme-change dispatcher **/
	const dispatch = createEventDispatcher<{ themeChange: { theme: 'light' | 'dark' } }>();

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	/** Dispatch theme changes upward **/
	function handleThemeChange(event: CustomEvent<{ theme: 'light' | 'dark' }>) {
		dispatch('themeChange', event.detail);
	}

	/** Normalize links **/
	function getHref(item: NavItem): string {
		if (typeof item.link === 'string') return item.link;
		if (item.link?.external) return item.link.external;
		const slug = item.link?.internal?.slug?.current;
		return slug ? `/${slug}` : '#';
	}

	/** Mobile menu toggle **/
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	/** Click-away to close mobile menu **/
	function handleClickOutside(event: MouseEvent) {
		if (mobileMenuOpen && headerElement && !headerElement.contains(event.target as Node)) {
			mobileMenuOpen = false;
		}
	}
</script>

<header
	bind:this={headerElement}
	class="bg-header text-header border-b border-gray-200 dark:border-gray-700"
>
	<nav class="site-container">
		<!-- Replace mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 with site-container -->
		<div class="flex h-16 items-center justify-between">
			<!-- Logo / Brand -->
			<div class="flex-shrink-0">
				<a href="/" class="nav-link flex items-center space-x-2">
					{#if showLogo && (logoUrl || ($logoCache && $logoCache.url))}
						<img
							src={logoUrl || $logoCache.url}
							alt={logoAlt || $logoCache?.alt || 'Site Logo'}
							class="logo-img"
							fetchpriority="high"
							loading="eager"
							decoding="async"
						/>
					{:else}
						<span class="text-xl font-bold">Greg D. Chan</span>
					{/if}
				</a>
			</div>

			<!-- Desktop nav + theme toggle + mobile button -->
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
			<div id="mobile-menu" class="md:hidden" transition:fade={{ duration: 200 }}>
				<div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
					{#if navigation?.items}
						{#each navigation.items as item}
							<a
								href={getHref(item)}
								class="text-header hover:text-primary hover:border-primary block rounded-md border-l-2 border-transparent px-3 py-2 text-sm font-normal transition-all"
								target={item.target || '_self'}
							>
								{item.text}
							</a>
							{#if item.children?.length}
								<div class="space-y-1 pl-4">
									{#each item.children as child}
										<a
											href={getHref(child)}
											class="text-header hover:text-primary block rounded-md px-3 py-2 text-sm font-normal"
											target={child.target || '_self'}
										>
											{child.text}
										</a>
									{/each}
								</div>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</nav>
</header>
