export interface ColorValue { hex?: string; alpha?: number }

export interface ColorPaletteNew {
  brand?: {
    primary?: ColorValue
    secondary?: ColorValue
    accent?: ColorValue
  }
  surfaces?: {
    page?: ColorValue
    content?: ColorValue
    siteHeader?: ColorValue
  }
  text?: {
    primary?: ColorValue
    muted?: ColorValue
    siteHeader?: ColorValue
  }
  headings?: {
    default?: ColorValue
    h1?: ColorValue
    h2?: ColorValue
    h3?: ColorValue
    h4?: ColorValue
    h5?: ColorValue
    h6?: ColorValue
  }
}

// Legacy (kept optional for backwards compat)
export interface ColorPaletteLegacy {
  primary?: ColorValue
  secondary?: ColorValue
  background?: ColorValue
  foreground?: ColorValue
  headerBackground?: ColorValue
  headerText?: ColorValue
  bodyBackground?: ColorValue
  bodyText?: ColorValue
  accent?: ColorValue
  muted?: ColorValue
}

export type FontWeight = '300' | '400' | '500' | '700' | '800'
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

export interface HeadingStyle {
  fontSize?: number
  fontWeight?: FontWeight
  lineHeight?: number
  letterSpacing?: number
  textTransform?: TextTransform
}

export interface HeadingLevels {
  h1?: HeadingStyle
  h2?: HeadingStyle
  h3?: HeadingStyle
  h4?: HeadingStyle
  h5?: HeadingStyle
  h6?: HeadingStyle
}

export type BodyFont =
  | 'system-ui'
  | 'Inter, sans-serif'
  | 'Poppins, sans-serif'
  | 'Roboto, sans-serif'
  | 'Georgia, serif'
  | 'custom'

export type HeadingFont =
  | 'inherit'
  | 'Inter, sans-serif'
  | 'Poppins, sans-serif'
  | 'Roboto, sans-serif'
  | 'Georgia, serif'
  | 'custom'

export interface Typography {
  bodyFontFamily?: BodyFont
  customBodyFontFamily?: string
  headingFontFamily?: HeadingFont
  customHeadingFontFamily?: string
  baseFontSize?: number
  baseFontWeight?: '300' | '400' | '500' | '700'
  levels?: HeadingLevels
}

export interface Spacing {
  spaceUnit?: number
  borderRadius?: number
  boxShadow?: string
}

export interface SanityImage {
  asset?: { _ref?: string; url?: string }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface ThemeVariant {
  logo?: SanityImage
  colors?: ColorPaletteNew & ColorPaletteLegacy
  typography?: Typography
  spacing?: Spacing
}

export interface DesignToken {
  _id?: string
  _type?: 'designToken'
  themeName?: string
  mode?: 'light' | 'dark'
  isDefault?: boolean
  logo?: SanityImage
  colors?: ColorPaletteNew & ColorPaletteLegacy
  typography?: Typography
  spacing?: Spacing
  lightTheme?: ThemeVariant
  darkTheme?: ThemeVariant
}

