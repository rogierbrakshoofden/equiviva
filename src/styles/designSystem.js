// Color palette from Equiviva design system
export const colors = {
  // Primary colors
  sand: '#E8E1D5',
  charcoal: '#2D2D2D',
  taupe: '#9B8B7E',
  burgundy: '#8B4049',
  
  // Category colors
  vet: '#C9705D',
  farrier: '#4A5F7F',
  feed: '#7A8B5F',
  training: '#A8747F',
  
  // Backgrounds
  light: '#F5F0E8',
  white: '#FFFFFF',
  black: '#000000',
};

export const fonts = {
  display: "'Cormorant Garamond', serif",
  body: "'Outfit', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const typography = {
  h1: {
    fontFamily: fonts.display,
    fontSize: '48px',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: fonts.body,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  small: {
    fontFamily: fonts.mono,
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: 1.4,
  },
};
