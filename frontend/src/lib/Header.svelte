<script lang="ts">
  import ThemeToggle from '$lib/ThemeToggle.svelte';
  import type { Navigation, NavigationItem } from '$lib/types/navigation';
  import { theme } from '$lib/stores/themeStore';
  import { onMount } from 'svelte';

  export let navigation: Navigation | null;
  export let logoUrl: string | null = null;

  let isMobileMenuOpen = false;

  function href(item: NavigationItem) {
    const any = item as any;
    if (typeof any.link === 'string') return any.link;
    if (any.link?.external) return any.link.external;
    const slug = any.link?.internal?.slug?.current;
    return slug ? `/${slug}` : '#';
  }
  function toggleMobileMenu() { isMobileMenuOpen = !isMobileMenuOpen; }
  function closeMobileMenu() { isMobileMenuOpen = false; }

  onMount(() => {
    const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMobileMenu(); };
    const onResize = () => { if (isMobileMenuOpen) closeMobileMenu(); };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('keydown', onKeydown);
      window.removeEventListener('resize', onResize);
    };
  });
</script>

{#if isMobileMenuOpen}
  <div class="mobile-backdrop" on:click={closeMobileMenu} aria-hidden="true"></div>
{/if}

<header class="header">
  <nav class="nav-container">
    <div class="nav-content">
      <a href="/" aria-label="Home" class="logo-link" on:click={closeMobileMenu}>
        {#if logoUrl}
          <img src={logoUrl} alt="Site Logo" class="logo-img" />
        {:else}
          <span class="logo-text">Greg D. Chan</span>
        {/if}
      </a>

      {#if navigation?.items}
        <div class="desktop-nav">
          {#each navigation.items as item}
            <a href={href(item)} class="nav-item" target={(item as any).target || '_self'}>
              <span class="nav-text">{(item as any).text}</span>
              <span class="nav-underline"></span>
            </a>
          {/each}
        </div>
      {/if}

      <div class="nav-controls">
        <div class="theme-toggle-wrapper">
          <!-- ThemeToggle should call themeStore.toggleTheme() internally; no prop needed -->
          <ThemeToggle />
        </div>
        <button
          class="mobile-menu-button"
          on:click={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
          <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
          <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
        </button>
      </div>
    </div>

    {#if navigation?.items}
      <div class="mobile-nav {isMobileMenuOpen ? 'open' : ''}">
        {#each navigation.items as item}
          <a
            href={href(item)}
            class="mobile-nav-item"
            target={(item as any).target || '_self'}
            on:click={closeMobileMenu}
          >{(item as any).text}</a>
        {/each}
      </div>
    {/if}
  </nav>
</header>

<style>
  /* 
    When the body has the 'no-transitions' class, forcefully disable transitions 
    on the header and ALL of its child elements to prevent any blinking on page load.
  */
  :global(body.no-transitions) .header,
  :global(body.no-transitions) .header * {
    transition: none !important;
  }

  .header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 1000;
    /* These variables are now reliably set by the global themeStore */
    color: var(--color-headerText, var(--color-foreground));
    border-bottom: 1px solid var(--color-border, #e2e8f0);
    /* The backdrop-filter gives the modern "glassmorphism" effect */
    -webkit-backdrop-filter: blur(18px);
            backdrop-filter: blur(18px);
    box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.12);
    /* When scrolled, use a semi-transparent version of the background */
    background: color-mix(in srgb, var(--color-headerBackground, var(--color-background)) 85%, transparent);
    /* The transition for theme changes is kept for when the user toggles the theme */
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  .mobile-backdrop {
    position: fixed;
    inset: 0;
    z-index: 900;
    background: transparent;
  }

  .nav-container { max-width: 1280px; margin: 0 auto; padding: 0 1.25rem; }
  .nav-content { display: flex; align-items: center; justify-content: space-between; height: var(--header-h); }

  .logo-link { display: flex; align-items: center; gap: .5rem; text-decoration: none; color: inherit; transition: transform .25s ease; }
  .logo-link:hover { transform: scale(1.03); }
  .logo-text { font-size: 1.25rem; font-weight: 800; color: var(--color-headerText, var(--color-foreground)); line-height: 1; }
  .logo-img { max-height: calc(var(--header-h) - 0.75rem); height: auto; object-fit: contain; }

  .desktop-nav { display: none; gap: 1.5rem; }
  @media (min-width: 768px) { .desktop-nav { display: flex; } }

  .nav-item {
    position: relative;
    padding: .4rem 0;
    color: var(--color-headerText, var(--color-foreground));
    text-decoration: none;
    font-weight: 500;
    font-size: .9rem;
    text-transform: uppercase;
    letter-spacing: .05em;
  }
  .nav-item .nav-underline {
    position: absolute; left: 0; bottom: 0; height: 2px; width: 0;
    background: var(--color-primary);
    transition: width .25s ease;
  }
  .nav-item:hover .nav-underline { width: 100%; }

  .nav-controls { display: flex; align-items: center; gap: 1rem; }
  .theme-toggle-wrapper { line-height: 0; display: flex; align-items: center; transform-origin: center; margin-right: .25rem; }
  @media (min-width:768px){ .theme-toggle-wrapper { transform: scale(.9); } }

  .mobile-menu-button {
    display: flex; flex-direction: column; justify-content: space-around;
    width: 2rem; height: 2rem; background: transparent; border: none; cursor: pointer; padding: 0;
  }
  @media (min-width: 768px) { .mobile-menu-button { display: none; } }

  .hamburger-line { width: 100%; height: 2px; background: var(--color-headerText, var(--color-foreground)); transition: all .35s ease; transform-origin: center; }
  .hamburger-line.open:nth-child(1) { transform: rotate(45deg) translate(6px,6px); }
  .hamburger-line.open:nth-child(2) { opacity: 0; }
  .hamburger-line.open:nth-child(3) { transform: rotate(-45deg) translate(6px,-6px); }

  .mobile-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    background: color-mix(in srgb, var(--color-headerBackground, var(--color-background)) 90%, transparent);
    -webkit-backdrop-filter: blur(18px);
            backdrop-filter: blur(18px);
    border-top: 1px solid var(--color-border, #e2e8f0);
    transform: translateY(-8px);
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity .25s ease, transform .25s ease;
  }
  .mobile-nav.open { transform: translateY(0); opacity: 1; visibility: visible; pointer-events: auto; }

  .mobile-nav-item {
    display: block;
    padding: 1rem 1.25rem;
    color: var(--color-headerText, var(--color-foreground));
    text-decoration: none;
    font-weight: 500;
    font-size: .9rem;
    text-transform: uppercase;
    letter-spacing: .06em;
    border-bottom: 1px solid var(--color-border, #e2e8f0);
    transition: background .2s ease, color .2s ease, padding-left .2s ease;
  }
  .mobile-nav-item:hover { background: rgba(0,0,0,0.05); color: var(--color-primary); padding-left: 2rem; }
  .mobile-nav-item:last-child { border-bottom: none; }

  @media (max-width: 767px) { .nav-container { padding: 0 1rem; } }

  /* Remove visible square focus on theme toggle */
  :global(.theme-toggle) { outline: none; border: 0; -webkit-tap-highlight-color: transparent; }
  :global(.theme-toggle:focus), :global(.theme-toggle:focus-visible) { outline: none !important; box-shadow: none !important; }
</style>
