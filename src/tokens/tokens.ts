// Monee Design System — Design Tokens (TypeScript)
// Auto-generated from monee-design-tokens.json
// Use these constants in React Native StyleSheet or any JS/TS context

// ─── Font Family ────────────────────────────────────────────────────────────
export const fontFamily = {
  plain: 'Roboto',
  brand: 'Shopee2021',
} as const;

// ─── Font Weight ────────────────────────────────────────────────────────────
export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;

// ─── Font Size ───────────────────────────────────────────────────────────────
export const fontSize = {
  xs:  11,
  s:   12,
  m:   14,
  l:   16,
  xl:  18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 36,
} as const;

// ─── Line Height ─────────────────────────────────────────────────────────────
export const lineHeight = {
  xs:  14,
  s:   16,
  m:   18,
  l:   20,
  xl:  24,
  '2xl': 26,
  '3xl': 30,
  '4xl': 34,
  '5xl': 38,
  '6xl': 44,
} as const;

// ─── Dimension Scale ─────────────────────────────────────────────────────────
export const dim = {
  none: 0,
  '0_5': 2,
  '1':   4,
  '1_5': 6,
  '2':   8,
  '2_5': 10,
  '3':   12,
  '4':   16,
  '5':   20,
  '6':   24,
  '7':   28,
  '8':   32,
  '9':   36,
  '10':  40,
  '11':  44,
  '12':  48,
  '13':  52,
  '14':  56,
  '15':  60,
  '16':  64,
  '17':  68,
  '18':  72,
  '19':  76,
  '20':  80,
  '26':  104,
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const gap = {
  none: 0,
  s:    2,
  m:    4,
  l:    6,
  xl:   8,
  '2xl': 12,
  '3xl': 16,
  '4xl': 20,
  '5xl': 24,
} as const;

export const padding = gap; // same scale

// ─── Border Radius ───────────────────────────────────────────────────────────
export const radius = {
  none: 0,
  s:    4,
  m:    6,
  l:    10,
  xl:   12,
  full: 999,
} as const;

// ─── Control Height ──────────────────────────────────────────────────────────
export const controlHeight = {
  xs:   16,
  s:    28,
  m:    44,
  l:    48,
  xl:   56,
  '2xl': 64,
  '3xl': 72,
} as const;

export const buttonHeight = {
  s:  28,
  m:  36,
  l:  44,
  xl: 52,
} as const;

// ─── Palette ─────────────────────────────────────────────────────────────────
export const palette = {
  white: '#ffffff',
  black: '#000000',
  neutral: {
    25: '#f8f8f8', 50: '#f2f2f2', 100: '#e4e4e4', 200: '#d7d7d7',
    300: '#bebebe', 400: '#a3a3a3', 500: '#8c8c8c', 600: '#747474',
    700: '#5b5b5b', 800: '#454545', 900: '#333333', 950: '#222222',
  },
  shopee: {
    25: '#fff6f4', 50: '#ffe8e3', 100: '#ffd9d0', 200: '#ffc7ba',
    300: '#f9a896', 400: '#fb846b', 500: '#f9674a', 600: '#ee4d2d',
    700: '#ca3a1d', 800: '#a12b13', 900: '#741b09', 950: '#58190d',
  },
  mariBank: {
    25: '#fff5ec', 50: '#ffead8', 100: '#ffdbbd', 200: '#ffcaa5',
    300: '#f9ab7d', 400: '#fb8e56', 500: '#fd7135', 600: '#fa5e00',
    700: '#cc3802', 800: '#a12c0b', 900: '#741c03', 950: '#5c1402',
  },
  success: {
    25: '#edfef1', 300: '#4ce58f', 500: '#1fbd6a', 600: '#1ea95e', 700: '#008942',
  },
  warning: {
    25: '#fcf9e6', 300: '#f4c251', 500: '#f1a500', 600: '#ea9400',
  },
  error: {
    25: '#fff6f7', 300: '#ffa2aa', 500: '#f64356', 600: '#ea1c42',
  },
} as const;

// ─── Semantic Color Tokens (Mobile Light Theme) ───────────────────────────────
export const color = {
  fg: {
    primary:          '#222222',
    primaryOnSolid:   '#ffffff',
    secondary:        '#5b5b5b',
    tertiary:         '#8c8c8c',
    disable:          '#bebebe',
    placeholder:      '#8c8c8c',
    link:             '#1c64f0',
    shopee:           '#ee4d2d',
    mariBank:         '#fa5e00',
    success:          '#1fbd6a',
    warning:          '#f1a500',
    error:            '#f64356',
    income:           '#2673dd',
    saveplus:         '#ea5f00',
  },
  text: {
    primary:          '#222222',
    primaryOnSolid:   '#ffffff',
    secondary:        '#5b5b5b',
    tertiary:         '#8c8c8c',
    disable:          '#bebebe',
    placeholder:      '#8c8c8c',
    link:             '#1c64f0',
    shopee:           '#ee4d2d',
    mariBank:         '#fa5e00',
    success:          '#1ea95e',
    warning:          '#ea9400',
    error:            '#ea1c42',
  },
  bg: {
    primary:          '#ffffff',
    primaryOverlay:   'rgba(0,0,0,0.64)',
    secondary:        '#f8f8f8',
    tertiary:         '#f2f2f2',
    disable:          '#e4e4e4',
    shopee:           '#fff6f4',
    shopeeSolid:      '#ee4d2d',
    shopeeOverlay:    '#ca3a1d',
    mariBank:         '#fff5ec',
    maribankSolid:    '#fa5e00',
    maribankOverlay:  '#cc3802',
    success:          '#edfef1',
    successSolid:     '#1fbd6a',
    warning:          '#fcf9e6',
    warningSolid:     '#f1a500',
    error:            '#fff6f7',
    errorSolid:       '#f64356',
  },
  border: {
    primary:   'rgba(0,0,0,0.87)',
    secondary: 'rgba(0,0,0,0.64)',
    tertiary:  'rgba(0,0,0,0.45)',
    disable:   'rgba(0,0,0,0.10)',
    split:     'rgba(0,0,0,0.10)',
    shopee:    '#f9a896',
    shopeeSolid: '#ee4d2d',
    mariBank:  '#f9ab7d',
    maribanSolid: '#fa5e00',
    success:   '#4ce58f',
    warning:   '#f4c251',
    error:     '#ffa2aa',
  },
} as const;
