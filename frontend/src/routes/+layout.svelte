<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import { browser } from '$app/environment';
  import type { DesignToken } from '$lib/types/designToken';
  import type { Navigation } from '$lib/types/navigation';
  import '../app.css';
  
  export let data: {
    tokens: DesignToken | null;
    navigation: Navigation | null;
  };
  
  let currentTheme: 'light' | 'dark' = 'light';
  
  // Initialize theme from tokens or localStorage
  $: if (browser) {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      currentTheme = savedTheme;
    } else if (data.tokens?.mode) {
      currentTheme = data.tokens.mode;
    }
    applyTheme(currentTheme);
  }
  
  function handleThemeChange(event: CustomEvent<{ theme: 'light' | 'dark' }>) {
    currentTheme = event.detail.theme;
    if (browser) {
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    }
  }
  
  function applyTheme(theme: 'light' | 'dark') {
    if (!browser) return;
    
    const root = document.documentElement;
    document.body.classList.toggle('dark', theme === 'dark');
    
    // Apply design tokens if available
    if (data.tokens) {
      applyTokens(data.tokens, theme);
    }
  }
  
  function applyTokens(token: DesignToken, theme: 'light' | 'dark') {
    const root = document.documentElement;
    if (token.colors) {
      root.style.setProperty('--color-primary', token.colors.primary?.hex ?? '');
      // Add more color tokens as needed
    }
  }
</script>

<svelte:head>
  <title>Greg D. Chan</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Header 
  navigation={data.navigation} 
  {currentTheme} 
  on:themeChange={handleThemeChange} 
/>

<main class="min-h-[90vh] bg-background text-foreground font-custom">
  <slot />
</main>

<Footer />