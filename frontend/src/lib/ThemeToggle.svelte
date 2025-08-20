<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/themeStore';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  export let currentTheme: 'light' | 'dark' = $theme;
  const dispatch = createEventDispatcher<{ themeChange: 'light' | 'dark' }>();
  
  let buttonElement: HTMLElement;
  let iconElement: HTMLElement;

  function handleClick() {
    const newTheme = $theme === 'dark' ? 'light' : 'dark';
    
    // Animate the button
    gsap.to(buttonElement, {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(buttonElement, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });
    
    // Animate the icon
    gsap.to(iconElement, {
      rotation: 360,
      duration: 0.5,
      ease: "power2.out"
    });
    
    toggleTheme();
    dispatch('themeChange', newTheme);
  }
  
  onMount(() => {
    // Initial animation
    gsap.fromTo(buttonElement,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  });
</script>

<button
  bind:this={buttonElement}
  on:click={handleClick}
  class="theme-toggle"
  aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <div bind:this={iconElement} class="theme-icon">
    {#if $theme === 'dark'}
      <!-- Sun icon for light mode -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
      </svg>
    {:else}
      <!-- Moon icon for dark mode -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    {/if}
  </div>
</button>

<style>
  .theme-toggle {
    position: relative;
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    color: var(--color-foreground);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    overflow: hidden;
  }
  
  .theme-toggle::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }
  
  .theme-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 3px 10px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  .theme-toggle:hover::before {
    opacity: 1;
  }
  
  .theme-toggle:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.1),
      inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  .theme-icon {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }
  
  .theme-toggle:hover .theme-icon {
    transform: scale(1.1);
  }
  
  /* Dark theme specific styles */
  :global(.dark) .theme-toggle {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: #f8fafc;
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  :global(.dark) .theme-toggle::before {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
  }
  
  :global(.dark) .theme-toggle:hover {
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.4),
      0 3px 10px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  /* Focus styles for accessibility */
  .theme-toggle:focus {
    outline: none;
    box-shadow: 
      0 0 0 3px rgba(59, 130, 246, 0.5),
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark) .theme-toggle:focus {
    box-shadow: 
      0 0 0 3px rgba(59, 130, 246, 0.5),
      0 4px 6px rgba(0, 0, 0, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.2);
  }
</style>