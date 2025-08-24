<script lang="ts">
  import type { Navigation, NavigationItem } from '$lib/types/navigation';
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { quintOut, cubicIn } from 'svelte/easing';
  import ThemeToggle from './ThemeToggle.svelte';
  
  export let navigation: Navigation | null = null;
  export let logoUrl: string | null = null;
  
  let isMenuOpen = false;
  let mounted = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  // Close menu when clicking outside or pressing escape
  onMount(() => {
    mounted = true;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav') && isMenuOpen) {
        isMenuOpen = false;
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  });

  function href(item: NavigationItem) {
    if ((item as any)?.href) return (item as any).href;
    const link: any = (item as any)?.link;
    if (!link) return '#';
    if (typeof link === 'string') return link;
    if (link.url) return link.url;
    if (link.external) return link.external;
    const slug =
      link.internal?.slug?.current ??
      link.internal?.slug ??
      link.slug?.current ??
      link.slug;
    return slug ? `/${slug}` : '#';
  }
</script>

<header class="bg-[var(--color-header-bg)] text-[var(--color-header-text)] shadow-sm sticky top-0 z-40">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" aria-label="Home" data-sveltekit-prefetch class="flex items-center">
          {#if logoUrl}
            <img src={logoUrl} alt="Logo" class="h-8 w-auto" />
          {:else}
            <span class="text-lg font-bold">Site</span>
          {/if}
        </a>
      </div>

      <!-- Desktop nav -->
      <div class="hidden md:flex md:items-center md:space-x-6">
        {#if navigation?.items}
          <ul class="flex space-x-6">
            {#each navigation.items as item}
              <li>
                <a
                  href={href(item)}
                  data-sveltekit-prefetch
                  class="px-1 py-2 text-sm font-medium transition-colors duration-200 relative text-[var(--color-muted)] hover:text-[var(--color-foreground)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-primary)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {item.text}
                </a>
              </li>
            {/each}
          </ul>
        {/if}

        <!-- Theme toggle -->
        <div class="pl-5 border-l border-[color:var(--color-muted)]/30">
          <ThemeToggle />
        </div>
      </div>

      <!-- Mobile button -->
      <div class="flex items-center md:hidden">
        <ThemeToggle />
        
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-full p-2 focus:outline-none focus-visible:ring-2"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          on:click={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-[color:var(--color-header-text)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </nav>
    
    <!-- Mobile menu, show/hide based on menu state -->
    {#if mounted && navigation?.items}
      {#if isMenuOpen}
        <div
          id="mobile-menu"
          class="md:hidden fixed inset-x-0 top-16 z-40 backdrop-blur-md shadow-lg"
          style="
            background-color: color-mix(in srgb, var(--color-header-bg) 85%, transparent);
            color: var(--color-header-text);
          "
          in:slide={{ duration: 260, easing: quintOut }}
          out:slide={{ duration: 200, easing: cubicIn }}
        >
          <nav class="px-4 py-4 space-y-2">
            {#if navigation?.items}
              {#each navigation.items as item}
                <a
                  href={href(item)}
                  data-sveltekit-prefetch
                  class="block rounded-md px-3 py-2 text-base font-medium hover:opacity-80 focus:outline-none focus-visible:ring-2"
                  on:click={() => { isMenuOpen = false; }}
                >
                  {item.text}
                </a>
              {/each}
            {/if}
            <!-- Removed ThemeToggle from dropdown -->
          </nav>
        </div>
      {/if}
    {/if}
  </div>
</header>