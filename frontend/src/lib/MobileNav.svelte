<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { NavigationItem } from '$lib/types/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  export let navItems: NavigationItem[] = [];

  let open = false;
  let panel: HTMLElement;
  let triggerBtn: HTMLButtonElement;

  // Toggle menu state and manage scroll locking
  function toggle() { 
    open = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  
  function close() { 
    if (!open) return;
    open = false; 
    document.body.style.overflow = '';
  }

  // Force close on any outside click - this is the most reliable approach
  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (!open) return;
    if (triggerBtn?.contains(e.target as Node)) return; // Don't close when clicking the toggle button
    
    // THIS IS CRUCIAL: Don't check if panel contains the target
    // We want to close on ANY click that's not the toggle button
    close();
  }
  
  // Close on scroll and window resize (for responsive layouts)
  function handleScroll() { close(); }
  function handleResize() { if (window.innerWidth >= 768) close(); }
  function handleKeydown(e: KeyboardEvent) { if (e.key === 'Escape') close(); }

  onMount(() => {
    // Use capturing phase to ensure our handler runs first
    document.addEventListener('click', handleOutsideClick, true);
    document.addEventListener('touchstart', handleOutsideClick, true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeydown);
  });
  
  onDestroy(() => {
    document.removeEventListener('click', handleOutsideClick, true);
    document.removeEventListener('touchstart', handleOutsideClick, true);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  });

  // Also close on navigation
  afterNavigate(() => { close(); });
</script>

<button
  bind:this={triggerBtn}
  type="button"
  on:click|stopPropagation={toggle}
  class="md:hidden p-2"
  aria-expanded={open}
  aria-controls="mobile-nav"
  aria-label="Toggle navigation menu"
>
  <!-- hamburger icon -->
  <span>☰</span>
</button>

{#if open}
  <div 
    class="backdrop" 
    aria-hidden="true"
    on:click|stopPropagation={close}
  ></div>

  <nav
    id="mobile-nav"
    bind:this={panel}
    class="sheet md:hidden"
    style="top: var(--header-h, 3.25rem)"
    transition:slide={{ duration: 300, easing: cubicOut }}
  >
    <div class="menu">
      {#each navItems as item}
        <a
          href={item.link || '#'}
          class="item"
          on:click|stopPropagation={() => close()}
        >{item.text}</a>
      {/each}
    </div>
  </nav>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .sheet {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 50;
    
    /* 
      This is the key fix. 
      We directly apply the semi-transparent background and blur effect
      using the same CSS variables the Header uses for its scrolled state.
      This ensures visual consistency.
    */
    background: var(--color-header-bg-scrolled);
    -webkit-backdrop-filter: blur(18px); /* Safari */
    backdrop-filter: blur(18px);
    
    border-top: 1px solid var(--color-header-border);
    box-shadow: 0 6px 24px rgba(0,0,0,.12);
  }
  .menu { 
    max-height: 80vh; 
    overflow-y: auto; 
    padding: .75rem 0;
    -webkit-overflow-scrolling: touch;
  }
  .item { 
    display: block; 
    padding: 1rem 1.25rem;
    color: var(--color-header-fg); /* Use header foreground color for text */
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  /* Add a subtle hover effect for better UX */
  .item:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
</style>
