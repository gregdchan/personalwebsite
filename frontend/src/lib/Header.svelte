<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import type { Navigation } from '$lib/types/navigation';
  
  export let navigation: Navigation | null;
  export let currentTheme: 'light' | 'dark' = 'light';
  
  const dispatch = createEventDispatcher<{
    themeChange: { theme: 'light' | 'dark' }
  }>();
  
  function handleThemeChange(event: CustomEvent<{ theme: 'light' | 'dark' }>) {
    dispatch('themeChange', event.detail);
  }
</script>

<header class="bg-background border-b border-gray-200 dark:border-gray-700">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div class="flex-shrink-0">
        <a href="/" class="text-xl font-bold text-foreground nav-link">
          Greg D. Chan
        </a>
      </div>
      
      <!-- Navigation Menu & Theme Toggle -->
      <div class="flex items-center space-x-6">
        <!-- Navigation Menu -->
        <div class="hidden md:block">
          <div class="flex items-baseline space-x-4">
            {#if navigation?.items}
              {#each navigation.items as item}
                <a
                  href={item.link}
                  class="nav-link text-foreground hover:text-primary px-3 py-2 rounded-md text-sm transition-colors"
                  target={item.target || '_self'}
                >
                  {item.text}
                </a>
              {/each}
            {/if}
          </div>
        </div>
        
        <!-- Theme Toggle -->
        <ThemeToggle {currentTheme} on:themeChange={handleThemeChange} />
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            class="bg-background inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</header>