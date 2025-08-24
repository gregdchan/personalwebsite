import { writable, derived, get } from 'svelte/store';
import type { DesignToken, ThemeVariant } from '$lib/types/designToken';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function getEffectiveTheme(token: DesignToken, mode: Theme): ThemeVariant {
  const tv = mode === 'light' ? token.lightTheme : token.darkTheme;
  if (!tv) return { logo: token.logo, colors: token.colors, typography: token.typography, spacing: token.spacing };
  return {
    logo: tv.logo || token.logo,
    colors: tv.colors || token.colors,
    typography: tv.typography || token.typography,
    spacing: tv.spacing || token.spacing
  };
}

export const designTokens = writable<{ light: DesignToken | null; dark: DesignToken | null }>({ light: null, dark: null });

function initializeTheme(): Theme {
  if (!browser) return 'light';
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export const theme = writable<Theme>(initializeTheme());

// Persist and apply dark class
if (browser) {
  const apply = (t: Theme) => {
    document.documentElement.classList.toggle('dark', t === 'dark');
    localStorage.setItem('theme', t);
  };
  apply(get(theme));
  theme.subscribe(apply);
}

export const activeTokens = derived(
  [theme, designTokens],
  ([$theme, $tokens]) => {
    const token = $theme === 'dark' ? $tokens.dark : $tokens.light;
    return token ? getEffectiveTheme(token, $theme) : null;
  }
);

// Utilities to set/get color hex with fallbacks (new -> legacy)
const hex = (c?: { hex?: string } | null) => c?.hex ?? '';

function colorOr(...candidates: Array<{ hex?: string } | undefined | null>) {
  for (const c of candidates) if (c?.hex) return c;
  return undefined;
}

function getHeadingColor(variant: ThemeVariant | null, tag?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6') {
  const h = variant?.colors as any;
  const newDefault = h?.headings?.default;
  const newTag = tag ? h?.headings?.[tag] : undefined;
  const textPrimary = h?.text?.primary;
  const legacyFallback = colorOr(h?.foreground, h?.bodyText);
  return colorOr(newTag, newDefault, textPrimary, legacyFallback);
}

function applyActiveTokensToCSS(variant: ThemeVariant | null) {
  if (!browser) return;

  const c: any = variant?.colors;

  // Brand
  document.documentElement.style.setProperty('--color-primary',  hex(colorOr(c?.brand?.primary, c?.primary)));
  document.documentElement.style.setProperty('--color-secondary',hex(colorOr(c?.brand?.secondary, c?.secondary)));
  document.documentElement.style.setProperty('--color-accent',   hex(colorOr(c?.brand?.accent, c?.accent)));
  document.documentElement.style.setProperty('--color-muted',    hex(colorOr(c?.text?.muted, c?.muted)));

  // Surfaces
  document.documentElement.style.setProperty('--color-body-bg',  hex(colorOr(c?.surfaces?.page,    c?.bodyBackground, c?.background)));
  document.documentElement.style.setProperty('--color-background',hex(colorOr(c?.surfaces?.content, c?.background)));
  document.documentElement.style.setProperty('--color-header-bg',hex(colorOr(c?.surfaces?.siteHeader, c?.headerBackground)));

  // Text
  document.documentElement.style.setProperty('--color-body-text',hex(colorOr(c?.text?.primary, c?.bodyText, c?.foreground)));
  document.documentElement.style.setProperty('--color-header-text', hex(colorOr(c?.text?.siteHeader, c?.headerText)));

  // Headings (default + per-level)
  document.documentElement.style.setProperty('--heading-color', hex(getHeadingColor(variant)));
  (['h1','h2','h3','h4','h5','h6'] as const).forEach(tag => {
    document.documentElement.style.setProperty(`--${tag}-color`, hex(getHeadingColor(variant, tag)));
  });

  // Typography base
  const body = variant?.typography?.bodyFontFamily === 'custom'
    ? variant?.typography?.customBodyFontFamily
    : variant?.typography?.bodyFontFamily;

  const heading = variant?.typography?.headingFontFamily === 'custom'
    ? variant?.typography?.customHeadingFontFamily
    : (variant?.typography?.headingFontFamily === 'inherit' ? body : variant?.typography?.headingFontFamily);

  document.documentElement.style.setProperty('--font-body', body ?? '');
  document.documentElement.style.setProperty('--font-heading', heading ?? '');
  if (variant?.typography?.baseFontSize)
    document.documentElement.style.setProperty('--font-size-base', `${variant.typography.baseFontSize}px`);
  document.documentElement.style.setProperty('--font-weight-base', variant?.typography?.baseFontWeight ?? '');

  const levels: any = variant?.typography?.levels;
  (['h1','h2','h3','h4','h5','h6'] as const).forEach(tag => {
    const lv = levels?.[tag];
    if (!lv) return;
    if (lv.fontSize != null) document.documentElement.style.setProperty(`--${tag}-font-size`, `${lv.fontSize}px`);
    if (lv.fontWeight) document.documentElement.style.setProperty(`--${tag}-font-weight`, lv.fontWeight);
    if (lv.lineHeight != null) document.documentElement.style.setProperty(`--${tag}-line-height`, String(lv.lineHeight));
    if (lv.letterSpacing != null) document.documentElement.style.setProperty(`--${tag}-letter-spacing`, `${lv.letterSpacing}em`);
    if (lv.textTransform) document.documentElement.style.setProperty(`--${tag}-text-transform`, lv.textTransform);
  });

  // Spacing (renamed spaceUnit)
  const s = variant?.spacing;
  if (s?.spaceUnit != null) document.documentElement.style.setProperty('--space', `${s.spaceUnit}px`);
  if (s?.borderRadius != null) document.documentElement.style.setProperty('--radius', `${s.borderRadius}px`);
  if (s?.boxShadow) document.documentElement.style.setProperty('--shadow', s.boxShadow);
}

// Sync CSS vars on change
if (browser) {
  activeTokens.subscribe(applyActiveTokensToCSS);
}

// Convenience exports
export const activeLogoUrl = derived(activeTokens, (t) => t?.logo?.asset?.url ?? null);

export function toggleTheme() {
  theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
}

export function applyThemeToDocument() {
  if (!browser) return;
  document.documentElement.classList.toggle('dark', get(theme) === 'dark');
}