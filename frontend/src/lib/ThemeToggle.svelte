<script lang="ts">
  import { onMount } from 'svelte';
  import { theme, toggleTheme } from '$lib/stores/themeStore';
  import { fade, scale } from 'svelte/transition';

  let currentTheme: 'light' | 'dark' = 'light';
  const unsubscribe = theme.subscribe(value => {
    currentTheme = value;
  });

  onMount(() => {
    return () => unsubscribe();
  });
</script>

<button
  class="theme-toggle"
  on:click={toggleTheme}
  aria-label="Toggle theme"
  title="Toggle theme"
>
  {#if currentTheme === 'dark'}
    <div class="icon-wrapper" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
      <!-- Moon Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    </div>
  {:else}
    <div class="icon-wrapper" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
      <!-- Sun Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
      </svg>
    </div>
  {/if}
</button>

<style>
  /* When the body has the 'no-transitions' class, disable transitions on the icon wrapper. */
  :global(body.no-transitions) .icon-wrapper {
    /* By setting the animation to 'none', the svelte transition will not run */
    animation: none !important;
  }

  .theme-toggle {
    --size: 2rem;
    --icon-color-light: #f59e0b; /* Sun color */
    --icon-color-dark: #fde047;  /* Moon color */

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--size);
    height: var(--size);
    border-radius: 9999px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
  }

  .theme-toggle:focus-visible {
    outline: 2px solid var(--color-primary, #0ea5e9);
    outline-offset: 2px;
  }

  .icon-wrapper {
    position: absolute;
    width: 65%;
    height: 65%;
  }

  .icon-wrapper svg {
    width: 100%;
    height: 100%;
    color: var(--icon-color-light);
  }

  :global(.dark) .icon-wrapper svg {
    color: var(--icon-color-dark);
  }
</style>
