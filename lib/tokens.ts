/**
 * Tomodex design tokens — JS mirror.
 *
 * This file must be kept in sync with globals.css.
 * Use these values anywhere CSS custom properties can't reach:
 * Three.js materials, canvas drawing, programmatic animation, etc.
 *
 * Rule: never hardcode a visual value in a component. Reference a token here
 * or a CSS custom property in your stylesheet.
 */

export const color = {
  // Backgrounds
  bg:            "#f2f2f0",
  bgInset:       "#e8e8e5",
  surface:       "#fafaf8",
  surfaceRaised: "#ffffff",

  // Text
  text:          "#1e1e1c",
  textSecondary: "#5a5a56",
  textFaint:     "#9a9a94",

  // Borders
  border:        "#c8c8c4",
  borderStrong:  "#b0b0aa",

  // Accent (platinum)
  accent:        "#909088",
  accentHover:   "#b0b0aa",

  // Aqua gloss — use as Three.js material opacity/emissive values
  highlight:     "rgba(255, 255, 255, 0.62)",
  gloss:         "rgba(255, 255, 255, 0.28)",
  shadowTint:    "rgba(0, 0, 0, 0.12)",
  shadowSoft:    "rgba(0, 0, 0, 0.06)",
} as const;

export const space = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
} as const;

export const duration = {
  fast:    120,
  default: 200,
  slow:    320,
} as const;

// Easing expressed as cubic-bezier arrays [x1, y1, x2, y2]
// Compatible with Three.js / GSAP / any tweening library
export const easing = {
  out:    [0.22, 1,    0.36, 1  ] as const,
  inOut:  [0.4,  0,    0.2,  1  ] as const,
  spring: [0.34, 1.56, 0.64, 1  ] as const,
} as const;

export const font = {
  ui:      "'Nunito Sans', system-ui, sans-serif",
  display: "'Nunito', system-ui, sans-serif",
} as const;