<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import ThemeToggle from '$lib/ThemeToggle.svelte';
  import type { Navigation, NavItem } from '$lib/types/navigation';
  import { fade } from 'svelte/transition';
  import { urlFor, logoSrcsetWebp } from '$lib/utils/sanityImage';
  import { browser } from '$app/environment';
  import { logoCache } from '$lib/stores/logoStore';

  /** Props **/
  export let navigation: Navigation | null;
  export let currentTheme: 'light' | 'dark' = 'light';
  export let currentThemeData: any = {};

  /** Local state **/
  let mobileMenuOpen = false;
  let headerElement: HTMLElement;
  let logoUrl = '';
  let logoSrcset = '';
  let logoAlt = '';
  
  /** Process logo data once when component mounts or theme changes **/
  $: if (browser && currentThemeData?.logo?.asset?._ref) {
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

<header bind:this={headerElement} class="bg-background border-b border-gray-200 dark:border-gray-700">
  <nav class="site-container"> <!-- Replace mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 with site-container -->
    <div class="flex justify-between items-center h-16">
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
            <span class="text-xl font-bold text-foreground">Greg D. Chan</span>
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
                  class="nav-link text-foreground hover:text-primary px-3 py-2 rounded-md text-sm transition-colors"
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
            class="bg-background inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary w-10 h-10"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
          >
            <span class="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <div class="w-6 h-6 relative flex items-center justify-center">
              <span
                class="absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out origin-center"
                style={mobileMenuOpen ? 'transform: rotate(45deg);' : 'transform: translateY(-4px);'}
              />
              <span
                class="absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out"
                style={mobileMenuOpen ? 'opacity: 0; transform: scale(0);' : 'opacity: 1;'}
              />
              <span
                class="absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out origin-center"
                style={mobileMenuOpen ? 'transform: rotate(-45deg);' : 'transform: translateY(4px);'}
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    {#if mobileMenuOpen}
      <div
        id="mobile-menu"
        class="md:hidden"
        transition:fade={{ duration: 200 }}
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {#if navigation?.items}
            {#each navigation.items as item}
              <a
                href={getHref(item)}
                class="text-foreground hover:text-primary block px-3 py-2 rounded-md text-sm font-normal border-l-2 border-transparent hover:border-primary transition-all"
                target={item.target || '_self'}
              >
                {item.text}
              </a>
              {#if item.children?.length}
                <div class="pl-4 space-y-1">
                  {#each item.children as child}
                    <a
                      href={getHref(child)}
                      class="text-foreground hover:text-primary block px-3 py-2 rounded-md text-sm font-normal"
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
