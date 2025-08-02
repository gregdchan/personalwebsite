<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import { browser } from '$app/environment';
  import type { DesignToken } from '$lib/types/designToken';
  import type { Navigation } from '$lib/types/navigation';
  import '../app.css';
  import { fade } from 'svelte/transition';
  import { theme } from '$lib/stores/themeStore';
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  export let data: {
    tokens: { light: DesignToken | null; dark: DesignToken | null };
    navigation: Navigation | null;
  };

  let currentThemeData: DesignToken | null = null;
  let unsubscribeTheme: () => void;

  let isInitialLoad = true;
  let isHomePage = false;

  function applyTokens(tokenSet: DesignToken) {
    // — COLORS —
    for (const [key, val] of Object.entries(tokenSet.colors || {})) {
      if ((val as any)?.hex) {
        document.documentElement.style.setProperty(
          `--color-${key}`,
          (val as any).hex
        );
      }
    }

    // — TYPOGRAPHY —
    const ty = tokenSet.typography;
    if (ty) {
      // Body font-family
      const bf =
        ty.bodyFontFamily === 'custom'
          ? ty.customBodyFontFamily
          : ty.bodyFontFamily;
      if (bf && bf !== 'custom') {
        document.documentElement.style.setProperty('--font-family', bf);
      }

      // Base font-size
      if (typeof ty.baseFontSize === 'number' && ty.baseFontSize > 0) {
        document.documentElement.style.setProperty(
          '--font-size-base',
          `${ty.baseFontSize}px`
        );
      }

      // Base font-weight
      if (ty.baseFontWeight) {
        document.documentElement.style.setProperty(
          '--font-weight',
          ty.baseFontWeight
        );
      }

      // Header font-family
      const hf =
        ty.headerFontFamily === 'inherit'
          ? bf
          : ty.headerFontFamily === 'custom'
          ? ty.customHeaderFontFamily
          : ty.headerFontFamily;
      if (hf && hf !== 'custom') {
        document.documentElement.style.setProperty(
          '--font-family-heading',
          hf
        );
      }
    }
  }

  onMount(() => {
    // 1) Homepage fade
    isHomePage = window.location.pathname === '/';
    setTimeout(() => (isInitialLoad = false), 200);

    if (!browser) return;

    // 2) Figure out initial theme
    const initTheme = get(theme);
    currentThemeData =
      initTheme === 'dark' ? data.tokens.dark : data.tokens.light;

    // 3) Apply it once
    if (currentThemeData) {
      applyTokens(currentThemeData);
      // cache to localStorage
      localStorage.setItem(
        'designTokens',
        JSON.stringify(data.tokens)
      );
    }

    // 4) Subscribe so toggles reapply instantly
    unsubscribeTheme = theme.subscribe((t) => {
      document.documentElement.classList.toggle('dark', t === 'dark');
      const ts = t === 'dark' ? data.tokens.dark : data.tokens.light;
      if (ts) {
        currentThemeData = ts;
        applyTokens(ts);
        localStorage.setItem(
          'designTokens',
          JSON.stringify(data.tokens)
        );
      }
    });
  });

  onDestroy(() => {
    unsubscribeTheme && unsubscribeTheme();
  });
</script>

<svelte:head>
  <title>Greg D. Chan</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!--
    Pre-hydrate theme class + CSS variables from last session.
    Prevents FOUC/blink when you navigate or reload.
  -->
  <script>
    (function () {
      const storedTheme =
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light');
      document.documentElement.classList.toggle(
        'dark',
        storedTheme === 'dark'
      );

      let tokens = {};
      try {
        tokens = JSON.parse(localStorage.getItem('designTokens')) || {};
      } catch {}
      const tokenSet = tokens[storedTheme] || {};

      // Apply colors
      if (tokenSet.colors) {
        Object.entries(tokenSet.colors).forEach(([k, v]) => {
          if (v?.hex) {
            document.documentElement.style.setProperty(
              `--color-${k}`,
              v.hex
            );
          }
        });
      }

      // Apply typography
      if (tokenSet.typography) {
        const ty = tokenSet.typography;
        const bf =
          ty.bodyFontFamily === 'custom'
            ? ty.customBodyFontFamily
            : ty.bodyFontFamily;
        if (bf) {
          document.documentElement.style.setProperty(
            '--font-family',
            bf
          );
        }
        if (ty.baseFontSize > 0) {
          document.documentElement.style.setProperty(
            '--font-size-base',
            `${ty.baseFontSize}px`
          );
        }
        if (ty.baseFontWeight) {
          document.documentElement.style.setProperty(
            '--font-weight',
            ty.baseFontWeight
          );
        }
        const hf =
          ty.headerFontFamily === 'inherit'
            ? bf
            : ty.headerFontFamily === 'custom'
            ? ty.customHeaderFontFamily
            : ty.headerFontFamily;
        if (hf) {
          document.documentElement.style.setProperty(
            '--font-family-heading',
            hf
          );
        }
      }
    })();
  </script>
</svelte:head>

{#if isInitialLoad && isHomePage}
  <div in:fade={{ duration: 150, delay: 150 }}>
    <Header
      navigation={data.navigation}
      currentTheme={$theme}
      currentThemeData={currentThemeData}
    />
    <main class="min-h-[90vh] bg-background text-foreground">
      <slot />
    </main>
    <Footer />
  </div>
{:else}
  <Header
    navigation={data.navigation}
    currentTheme={$theme}
    currentThemeData={currentThemeData}
  />
  <main class="min-h-[90vh] bg-background text-foreground">
    <slot />
  </main>
  <Footer />
{/if}
