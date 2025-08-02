<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/themeStore';
  
  // No need for prop if using the store directly, but keep for compatibility
  export let currentTheme: 'light' | 'dark' = $theme;
</script>

<button 
  on:click={toggleTheme}
  class="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
  aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $theme === 'dark'}
    <!-- Sun icon for light mode -->
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
  {:else}
    <!-- Moon icon for dark mode -->
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  {/if}
</button>