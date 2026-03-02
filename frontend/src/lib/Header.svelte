<script lang="ts">
  import type { Navigation, NavigationItem } from '$lib/types/navigation';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { Menu, X, Sun, Moon, Laptop } from 'lucide-svelte';

  let { navigation = null, logoUrl = null }: { navigation: Navigation | null; logoUrl: string | null } = $props();

  let isMenuOpen = $state(false);
  let isScrolled = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleScroll() {
    isScrolled = window.scrollY > 20;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navItems = navigation?.items ?? [
    { text: 'Work', link: '/work' },
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' }
  ];
</script>

<header 
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-md {isScrolled ? 'bg-surface-900/80 py-3' : 'py-4'}"
>
  <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="group flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center font-bold text-white transition-transform group-hover:rotate-12">
        G
      </div>
      <span class="font-bold text-xl tracking-tight hidden sm:block">Greg D. Chan</span>
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center gap-8">
      {#each navItems as item}
        <a 
          href={href(item)} 
          class="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity relative group"
        >
          {item.text}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
        </a>
      {/each}
      
      <!-- Theme Switcher could go here if needed, but let's stick to Dark by default for "Tech Savvy" -->
    </nav>

    <!-- Mobile Menu Toggle -->
    <button 
      class="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
      onclick={toggleMenu}
      aria-label="Toggle Menu"
    >
      {#if isMenuOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>

  <!-- Mobile Nav Overlay -->
  {#if isMenuOpen}
    <div 
      class="md:hidden absolute top-full left-0 right-0 bg-surface-900 border-b border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl"
      transition:slide={{ duration: 300 }}
    >
      {#each navItems as item}
        <a 
          href={href(item)} 
          class="text-lg font-medium py-2"
          onclick={() => isMenuOpen = false}
        >
          {item.text}
        </a>
      {/each}
    </div>
  {/if}
</header>

<div class="h-20 lg:h-24"></div> <!-- Spacer -->

<style>
  header {
    /* Subtle glow for tech-savvy look */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
</style>