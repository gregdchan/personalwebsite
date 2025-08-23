// src/lib/stores/themeStore.ts
import { browser } from '$app/environment';
import { writable, get, derived } from 'svelte/store';
import type { DesignToken } from '$lib/types/designToken';

// Main stores
export type Theme = 'light' | 'dark';
export const designTokens = writable<{ light: DesignToken | null; dark: DesignToken | null }>({ light: null, dark: null });
export const theme = writable<Theme>('light');

// --- Derived store for the active logo ---
// This derived store will hold the logo URLs from the main token objects.
const logoUrls = derived(designTokens, ($designTokens) => {
  // This assumes your Sanity query resolves the image asset to a URL.
  // e.g., using 'logo': logo.asset->url in your GROQ query.
  const lightLogoUrl = $designTokens.light?.logo?.asset?.url ?? null;
  const darkLogoUrl = $designTokens.dark?.logo?.asset?.url ?? null;
  return { light: lightLogoUrl, dark: darkLogoUrl };
});

// This derived store provides the active logo URL based on the current theme.
export const activeLogoUrl = derived(
  [theme, logoUrls],
  ([$theme, $logoUrls]) => {
    // Prefer the dark logo on dark theme, otherwise fallback to light logo.
    if ($theme === 'dark' && $logoUrls.dark) {
      return $logoUrls.dark;
    }
    return $logoUrls.light;
  }
);

// --- Helper functions to convert Sanity data to CSS ---

function colorToHex(color: any): string | undefined {
  return typeof color === 'object' && color !== null && color.hex ? color.hex : undefined;
}

function generateCssVariables(tokens: DesignToken | null): Record<string, string> {
  if (!tokens) return {};

  const cssVars: Record<string, string> = {};
  const { colors, typography, spacing } = tokens;

  // 1. Colors
  if (colors) {
    for (const [key, value] of Object.entries(colors)) {
      const hex = colorToHex(value);
      if (hex) {
        cssVars[`--color-${key}`] = hex;
        // Create mappings for simpler variable names
        if (key === 'bodyBackground') cssVars['--color-background'] = hex;
        if (key === 'bodyText') cssVars['--color-foreground'] = hex;
      }
    }
  }

  // 2. Typography
  if (typography) {
    const { fontFamily, customFontFamily, fontSize, fontWeight, textTransform, h1Size, h2Size, h3Size, h1Weight, h2Weight, h3Weight } = typography;
    
    const bodyFont = fontFamily === 'custom' ? customFontFamily : fontFamily;
    if (bodyFont) cssVars['--font-family-base'] = bodyFont;

    const headerFont = fontFamily === 'inherit' ? bodyFont : (fontFamily === 'custom' ? customFontFamily : fontFamily);
    if (headerFont) cssVars['--font-family-heading'] = headerFont;

    if (fontSize) cssVars['--font-size-base'] = `${fontSize}px`;
    if (fontWeight) cssVars['--font-weight-normal'] = fontWeight;

    // Assuming headings are part of typography and structured as an object
    if (typography.headings) {
      for (const [tag, styles] of Object.entries(typography.headings)) {
        if (styles && typeof styles === 'object') {
          if (styles.fontSize) cssVars[`--font-size-${tag}`] = `${styles.fontSize}px`;
          if (styles.fontWeight) cssVars[`--font-weight-${tag}`] = styles.fontWeight;
          if (styles.lineHeight) cssVars[`--line-height-${tag}`] = String(styles.lineHeight);
          if (styles.letterSpacing) cssVars[`--letter-spacing-${tag}`] = `${styles.letterSpacing}em`;
          if (styles.textTransform) cssVars[`--text-transform-${tag}`] = styles.textTransform;
        }
      }
    }
  }

  // 3. Spacing, Radius & Shadows
  if (spacing) {
    // Process radius tokens (e.g., spacing.radius.sm -> --radius-sm)
    if (spacing.radius) {
      for (const [key, value] of Object.entries(spacing.radius)) {
        if (typeof value === 'number') {
          cssVars[`--radius-${key}`] = `${value}px`;
        }
      }
    }
    // Process shadow tokens (e.g., spacing.shadow.md -> --shadow-md)
    if (spacing.shadow) {
      for (const [key, value] of Object.entries(spacing.shadow)) {
        if (typeof value === 'string') {
          cssVars[`--shadow-${key}`] = value;
        }
      }
    }
    // Process space tokens to create a scale (e.g., spacing.space.4 -> --space-4)
    if (spacing.space) {
      for (const [key, value] of Object.entries(spacing.space)) {
        if (typeof value === 'number') {
          cssVars[`--space-${key}`] = `${value}px`;
        }
      }
    }
  }

  return cssVars;
}

// --- Main Logic ---

function applyTokensToDOM(vars: Record<string, string>) {
  if (!browser) return;
  const root = document.documentElement;
  // Clear any previous inline styles
  root.style.cssText = '';
  // Apply new styles
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

// A derived store that automatically recalculates when theme or tokens change
const activeThemeVariables = derived(
  [theme, designTokens],
  ([$theme, $designTokens]) => {
    const currentTokens = $theme === 'dark' ? $designTokens.dark : $designTokens.light;
    return generateCssVariables(currentTokens);
  }
);

// Subscribe to the derived store to apply changes to the DOM
if (browser) {
  activeThemeVariables.subscribe(applyTokensToDOM);

  // Set initial theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = (savedTheme === 'light' || savedTheme === 'dark')
    ? savedTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  theme.set(initialTheme);

  // Update localStorage and <html> class whenever theme changes
  theme.subscribe($theme => {
    localStorage.setItem('theme', $theme);
    document.documentElement.classList.toggle('dark', $theme === 'dark');
    document.documentElement.setAttribute('data-theme', $theme);
  });
}

// --- Exposed functions for components ---

export function toggleTheme() {
  theme.update(t => (t === 'dark' ? 'light' : 'dark'));
}

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
}
