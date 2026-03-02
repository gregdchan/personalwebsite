function normalizeHex(value: string | undefined): string | null {
    if (!value || typeof value !== 'string') return null;
    const hex = value.trim();
    if (!hex.startsWith('#')) return null;
    if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
        const [r, g, b] = hex.slice(1).split('');
        return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toLowerCase();
    return null;
}

function contrastRatio(foregroundHex: string, backgroundHex: string): number {
    const toRgb = (hex: string) => {
        const n = hex.slice(1);
        return {
            r: parseInt(n.slice(0, 2), 16) / 255,
            g: parseInt(n.slice(2, 4), 16) / 255,
            b: parseInt(n.slice(4, 6), 16) / 255
        };
    };

    const toLinear = (channel: number) =>
        channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);

    const luminance = (hex: string) => {
        const { r, g, b } = toRgb(hex);
        return (0.2126 * toLinear(r)) + (0.7152 * toLinear(g)) + (0.0722 * toLinear(b));
    };

    const l1 = luminance(foregroundHex);
    const l2 = luminance(backgroundHex);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

function pickReadableColor(candidate: string | undefined, bg: string, fallback: string, minRatio: number): string {
    const safeCandidate = normalizeHex(candidate);
    const safeFallback = normalizeHex(fallback) || fallback;
    if (!safeCandidate) return safeFallback;
    return contrastRatio(safeCandidate, bg) >= minRatio ? safeCandidate : safeFallback;
}

export function tokenToStyles(token: any): string {
    if (!token) return '';

    const styles: string[] = [];
    const isDark = token?.mode === 'dark';
    const fallbackBg = isDark ? '#090603' : '#fff8ef';
    const fallbackText = isDark ? '#faecd9' : '#24160d';
    const fallbackMuted = isDark ? '#d1b89b' : '#6b4c35';
    const fallbackHeading = isDark ? '#fff6e8' : '#1a0f08';

    // Colors
    if (token.colors) {
        const { brand, surfaces, text, headings } = token.colors;
        const pageBg = normalizeHex(surfaces?.page?.hex) || fallbackBg;

        if (brand) {
            if (brand.primary?.hex) styles.push(`--color-primary: ${brand.primary.hex};`);
            if (brand.secondary?.hex) styles.push(`--color-secondary: ${brand.secondary.hex};`);
            if (brand.accent?.hex) styles.push(`--color-accent: ${brand.accent.hex};`);
        }

        if (surfaces) {
            if (surfaces.page?.hex) styles.push(`--color-page-bg: ${surfaces.page.hex};`);
            if (surfaces.content?.hex) styles.push(`--color-content-bg: ${surfaces.content.hex};`);
            if (surfaces.siteHeader?.hex) styles.push(`--color-header-bg: ${surfaces.siteHeader.hex};`);
        }

        if (text) {
            const bodyText = pickReadableColor(text.primary?.hex, pageBg, fallbackText, 4.5);
            const mutedText = pickReadableColor(text.muted?.hex, pageBg, fallbackMuted, 3.2);
            styles.push(`--color-body-text: ${bodyText};`);
            styles.push(`--color-muted-text: ${mutedText};`);
            if (text.siteHeader?.hex) styles.push(`--color-header-text: ${text.siteHeader.hex};`);
        }

        if (headings) {
            const heading = pickReadableColor(headings.default?.hex, pageBg, fallbackHeading, 4.5);
            styles.push(`--heading-color: ${heading};`);
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
                const tagColor = pickReadableColor(headings[tag]?.hex, pageBg, heading, 4.5);
                styles.push(`--${tag}-color: ${tagColor};`);
            });
        }
    }

    // Typography
    if (token.typography) {
        const { bodyFontFamily, headingFontFamily, baseFontSize, baseFontWeight, levels } = token.typography;

        if (bodyFontFamily) styles.push(`--font-sans: ${bodyFontFamily === 'custom' ? token.typography.customBodyFontFamily : bodyFontFamily};`);
        if (headingFontFamily) styles.push(`--font-heading: ${headingFontFamily === 'inherit' ? 'var(--font-sans)' : (headingFontFamily === 'custom' ? token.typography.customHeadingFontFamily : headingFontFamily)};`);
        if (baseFontSize) styles.push(`--base-font-size: ${baseFontSize}px;`);
        if (baseFontWeight) styles.push(`--base-font-weight: ${baseFontWeight};`);

        if (levels) {
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
                const level = levels[tag];
                if (level) {
                    if (level.fontSize) styles.push(`--${tag}-font-size: ${level.fontSize}px;`);
                    if (level.fontWeight) styles.push(`--${tag}-font-weight: ${level.fontWeight};`);
                    if (level.lineHeight) styles.push(`--${tag}-line-height: ${level.lineHeight};`);
                    if (level.letterSpacing) styles.push(`--${tag}-letter-spacing: ${level.letterSpacing}em;`);
                    if (level.textTransform) styles.push(`--${tag}-text-transform: ${level.textTransform};`);
                }
            });
        }
    }

    // Spacing
    if (token.spacing) {
        if (token.spacing.spaceUnit) styles.push(`--space-unit: ${token.spacing.spaceUnit}px;`);
        if (token.spacing.borderRadius) styles.push(`--radius: ${token.spacing.borderRadius}px;`);
        if (token.spacing.boxShadow) styles.push(`--shadow: ${token.spacing.boxShadow};`);
    }

    return styles.join(' ');
}
