// src/lib/stores/themeStore.ts
import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import type { DesignToken } from '$lib/types/designToken';

export type Theme = 'light' | 'dark';

// ----- INITIAL THEME (SYNC WITH <html>) -----
// Read synchronously from <html data-theme> or .dark class that you set in app.html.
// Falls back to system preference, then 'light' (SSR).
const initialTheme: Theme = (() => {
  if (!browser) return 'light';
  const attr = document.documentElement.getAttribute('data-theme') as Theme | null;
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();

// Main stores
export const designTokens = writable<{ light: DesignToken | null; dark: DesignToken | null }>({
  light: null,
  dark: null
});
export const theme = writable<Theme>(initialTheme);

// Keep DOM in sync immediately (no first-paint swap)
if (browser) {
  const root = document.documentElement;
  root.classList.toggle('dark', initialTheme === 'dark');
  root.setAttribute('data-theme', initialTheme);
}

// --- Derived store for the active logo ---
const logoUrls = derived(designTokens, ($designTokens) => {
  const lightLogoUrl = $designTokens.light?.logo?.asset?.url ?? null;
  const darkLogoUrl = $designTokens.dark?.logo?.asset?.url ?? null;
  return { light: lightLogoUrl, dark: darkLogoUrl };
});

export const activeLogoUrl = derived([theme, logoUrls], ([$theme, $logoUrls]) => {
  return $theme === 'dark' && $logoUrls.dark ? $logoUrls.dark : $logoUrls.light;
});

// --- Helper functions to convert Sanity data to CSS ---
function colorToHex(color: any): string | undefined {
  return typeof color === 'object' && color !== null && color.hex ? color.hex : undefined;
}

function generateCssVariables(tokens: DesignToken | null): Record<string, string> {
  if (!tokens) return {};
  const cssVars: Record<string, string> = {};
  const { colors, typography, spacing } = tokens;

  // Colors
  if (colors) {
    for (const [key, value] of Object.entries(colors)) {
      const hex = colorToHex(value);
      if (hex) {
        cssVars[`--color-${key}`] = hex;
        if (key === 'bodyBackground') cssVars['--color-background'] = hex;
        if (key === 'bodyText') cssVars['--color-foreground'] = hex;
      }
    }
  }

  // Typography
  if (typography) {
    const { fontFamily, customFontFamily, fontSize, fontWeight } = typography as any;
    const bodyFont = fontFamily === 'custom' ? customFontFamily : fontFamily;
    if (bodyFont) cssVars['--font-family-base'] = bodyFont;

    const headerFont =
      fontFamily === 'inherit' ? bodyFont : fontFamily === 'custom' ? customFontFamily : fontFamily;
    if (headerFont) cssVars['--font-family-heading'] = headerFont;

    if (fontSize) cssVars['--font-size-base'] = `${fontSize}px`;
    if (fontWeight) cssVars['--font-weight-normal'] = String(fontWeight);

    if ((typography as any).headings) {
      for (const [tag, styles] of Object.entries((typography as any).headings)) {
        if (styles && typeof styles === 'object') {
          const st = styles as any;
          if (st.fontSize) cssVars[`--font-size-${tag}`] = `${st.fontSize}px`;
          if (st.fontWeight) cssVars[`--font-weight-${tag}`] = String(st.fontWeight);
          if (st.lineHeight) cssVars[`--line-height-${tag}`] = String(st.lineHeight);
          if (st.letterSpacing) cssVars[`--letter-spacing-${tag}`] = `${st.letterSpacing}em`;
          if (st.textTransform) cssVars[`--text-transform-${tag}`] = st.textTransform;
        }
      }
    }
  }

  // Spacing, Radius & Shadows
  if (spacing) {
    if ((spacing as any).radius) {
      for (const [key, value] of Object.entries((spacing as any).radius)) {
        if (typeof value === 'number') cssVars[`--radius-${key}`] = `${value}px`;
      }
    }
    if ((spacing as any).shadow) {
      for (const [key, value] of Object.entries((spacing as any).shadow)) {
        if (typeof value === 'string') cssVars[`--shadow-${key}`] = value;
      }
    }
    if ((spacing as any).space) {
      for (const [key, value] of Object.entries((spacing as any).space)) {
        if (typeof value === 'number') cssVars[`--space-${key}`] = `${value}px`;
      }
    }
  }

  return cssVars;
}

// --- Apply vars ---
// IMPORTANT: do NOT clear cssText; it nukes server-injected vars and causes a flash.
// Just set/override our keys; browsers handle overwrites cheaply.
function applyTokensToDOM(vars: Record<string, string>) {
  if (!browser) return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

// Recompute when theme or tokens change
const activeThemeVariables = derived([theme, designTokens], ([$theme, $designTokens]) => {
  const currentTokens = $theme === 'dark' ? $designTokens.dark : $designTokens.light;
  return generateCssVariables(currentTokens);
});

// Subscribe in browser
if (browser) {
  activeThemeVariables.subscribe(applyTokensToDOM);

  // Persist & reflect changes immediately
  theme.subscribe(($theme) => {
    localStorage.setItem('theme', $theme);
    const root = document.documentElement;
    root.classList.toggle('dark', $theme === 'dark');
    root.setAttribute('data-theme', $theme);
  });
}

// --- Exposed controls ---
export function toggleTheme() {
  theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
}
export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
}

// --- DesignToken interface ---
// This should match the structure of your Sanity data.
// Consider making this more strict or using a utility type to infer from your data.
// NOTE: If you have more token types, extend this interface accordingly.
export interface DesignToken {
  colors?: Record<string, any>;
  typography?: Record<string, any>;
  spacing?: Record<string, any>;
  logo?: {
    asset?: {
      url?: string;
    };
  };
}
