<script lang="ts">
  import ThemeToggle from '$lib/ThemeToggle.svelte';
  import type { Navigation, NavigationItem } from '$lib/types/navigation';
  import { onMount } from 'svelte';

  export let navigation: Navigation | null = null;
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
  <nav class="nav-container" aria-label="Primary">
    <div class="nav-content">
      <a href="/" aria-label="Home" class="logo-link" data-sveltekit-prefetch on:click={closeMobileMenu}>
        {#if logoUrl}
          <img src={logoUrl} alt="Site Logo" class="logo-img" />
        {:else}
          <span class="logo-text">Greg D. Chan</span>
        {/if}
      </a>

      {#if navigation?.items}
        <div class="desktop-nav" role="menubar">
          {#each navigation.items as item}
            <a
              href={href(item)}
              class="nav-item"
              role="menuitem"
              target={(item as any).target || '_self'}
              data-sveltekit-prefetch
              on:click={closeMobileMenu}
            >
              <span class="nav-text">{(item as any).text}</span>
              <span class="nav-underline"></span>
            </a>
          {/each}
        </div>
      {/if}

      <div class="nav-controls">
        <div class="theme-toggle-wrapper">
          <ThemeToggle /> <!-- Make sure ThemeToggle does not trigger page-wide transitions -->
        </div>
        <button
          class="mobile-menu-button"
          on:click={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          type="button"
        >
          <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
          <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
          <span class="hamburger-line {isMobileMenuOpen ? 'open' : ''}"></span>
        </button>
      </div>
    </div>

    {#if navigation?.items}
      <div id="mobile-nav" class="mobile-nav {isMobileMenuOpen ? 'open' : ''}">
        {#each navigation.items as item}
          <a
            href={href(item)}
            class="mobile-nav-item"
            target={(item as any).target || '_self'}
            sveltekit:prefetch
            on:click={closeMobileMenu}
          >{(item as any).text}</a>
        {/each}
      </div>
    {/if}
  </nav>
</header>

<style>
  :global(:root) {
    --header-h: 64px;
    --page-max: 1280px;
  }

  /* Fixed, full-bleed header with no theme/background transitions */
  .header {
    position: fixed;
    top: 0; left: 0; right: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;
    background: transparent; /* background rendered on ::before */
    transform: translateZ(0); /* avoid 1px seams on some GPUs */
  }

  /* Full-width plate behind constrained content; NOTE: no transitions here */
  .header::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: color-mix(in srgb, var(--color-headerBackground, var(--color-background)) 85%, transparent);
    -webkit-backdrop-filter: blur(18px);
            backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--color-border, #e2e8f0);
    box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.12);
  }

  /* Constrain inner content; header itself remains full width */
  .nav-container {
    width: 100%;
    max-width: var(--page-max);
    margin-inline: auto;
    padding-inline: clamp(1rem, 3vw, 2rem);
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-h);
  }

  /* Logo */
  .logo-link { display: flex; align-items: center; gap: .5rem; text-decoration: none; color: inherit; }
  .logo-text {
    font-size: 1.25rem; font-weight: 800; line-height: 1;
    color: var(--color-headerText, var(--color-foreground));
  }
  .logo-img { max-height: calc(var(--header-h) - 0.75rem); height: auto; object-fit: contain; }

  /* Desktop nav */
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
    white-space: nowrap;
  }
  /* Keep this micro-UX; it doesn't trigger on route change */
  .nav-item .nav-underline {
    position: absolute; left: 0; bottom: 0; height: 2px; width: 0;
    background: var(--color-primary, currentColor);
    transition: width .2s ease; /* hover-only */
  }
  .nav-item:hover .nav-underline { width: 100%; }

  .nav-controls { display: flex; align-items: center; gap: 1rem; }
  .theme-toggle-wrapper { line-height: 0; display: flex; align-items: center; margin-right: .25rem; }

  .mobile-menu-button {
    display: flex; flex-direction: column; justify-content: space-around;
    width: 2rem; height: 2rem; background: transparent; border: none; cursor: pointer; padding: 0;
  }
  @media (min-width: 768px) { .mobile-menu-button { display: none; } }

  .hamburger-line { width: 100%; height: 2px; background: var(--color-headerText, var(--color-foreground)); transition: all .25s ease; transform-origin: center; }
  .hamburger-line.open:nth-child(1) { transform: rotate(45deg) translate(6px,6px); }
  .hamburger-line.open:nth-child(2) { opacity: 0; }
  .hamburger-line.open:nth-child(3) { transform: rotate(-45deg) translate(6px,-6px); }

  /* Mobile sheet */
  .mobile-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    background: color-mix(in srgb, var(--color-headerBackground, var(--color-background)) 90%, transparent);
    -webkit-backdrop-filter: blur(18px);
            backdrop-filter: blur(18px);
    border-top: 1px solid var(--color-border, #e2e8f0);
    transform: translateY(-8px);
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity .2s ease, transform .2s ease; /* only for opening/closing menu */
  }
  .mobile-nav.open { transform: translateY(0); opacity: 1; visibility: visible; pointer-events: auto; }

  .mobile-nav-item {
    display: block;
    padding: 1rem clamp(1rem, 3vw, 2rem);
    color: var(--color-headerText, var(--color-foreground));
    text-decoration: none;
    font-weight: 500;
    font-size: .9rem;
    text-transform: uppercase;
    letter-spacing: .06em;
    border-bottom: 1px solid var(--color-border, #e2e8f0);
  }
  .mobile-nav-item:last-child { border-bottom: none; }

  @media (max-width: 767px) {
    .nav-container { padding-inline: 1rem; }
  }

  /* Prevent children from forcing horizontal scroll on the fixed header */
  .header, .header * { max-width: 100vw; }

  /* Ensure your ThemeToggle doesn’t add outline flicker */
  :global(.theme-toggle) { outline: none; border: 0; -webkit-tap-highlight-color: transparent; }
  :global(.theme-toggle:focus), :global(.theme-toggle:focus-visible) { outline: none !important; box-shadow: none !important; }
</style>
