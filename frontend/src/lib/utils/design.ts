export function tokenToStyles(token: any): string {
    if (!token) return '';

    const styles: string[] = [];

    // Colors
    if (token.colors) {
        const { brand, surfaces, text, headings } = token.colors;

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
            if (text.primary?.hex) styles.push(`--color-body-text: ${text.primary.hex};`);
            if (text.muted?.hex) styles.push(`--color-muted-text: ${text.muted.hex};`);
            if (text.siteHeader?.hex) styles.push(`--color-header-text: ${text.siteHeader.hex};`);
        }

        if (headings) {
            if (headings.default?.hex) styles.push(`--heading-color: ${headings.default.hex};`);
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
                if (headings[tag]?.hex) styles.push(`--${tag}-color: ${headings[tag].hex};`);
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
