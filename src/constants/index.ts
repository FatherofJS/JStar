// Application constants and magic numbers
// Centralized configuration values

// ============================================================================
// ZODIAC CONFIGURATION
// ============================================================================

export const ZODIAC_CYCLE_INTERVAL = 7000; // Time between zodiac transitions (ms)

// ============================================================================
// ANIMATION TIMINGS
// ============================================================================

export const ANIMATION = {
  // ZodiacCinematic
  FADE_IN_SYMBOL: 2.2,
  FADE_IN_DELAY: 4.8,
  DRAW_LINE_DURATION: 5.5,
  LINE_DRAW_DELAY_MULTIPLIER: 0.35,
  FLOAT_DURATION: 8,
  AURA_ROTATION_DURATION: 90,
  ORBIT_ROTATION_DURATION: 40,

  // SpaceButton
  VORTEX_SPIN: 6,
  SHOCKWAVE_DURATION: 0.8,
  GLOW_PULSE: 3,
  BUTTON_TILT_FACTOR: 0.25,
  BUTTON_SCALE: 1.05,

  // Background
  STAR_TWINKLE: 6,
  COSMIC_PULSE: 12,
  NEBULA_DRIFT: 60,
  AURORA_WAVE: 20,
  GRAIN_SHIFT: 10,

  // Section transitions
  ZOOM_IN: 0.8,
  ZOOM_OUT: 0.6,
} as const;

// ============================================================================
// SCROLL CONFIGURATION
// ============================================================================

export const SCROLL = {
  TRIGGER_THRESHOLD: 40,
  INTERSECTION_THRESHOLD: 0.55,
  ROOT_MARGIN: "-10% 0px -10% 0px",
} as const;

// ============================================================================
// STAR CONFIGURATION
// ============================================================================

export const STAR = {
  INTENSITY_THRESHOLDS: {
    LOW: 0.7,
    MEDIUM: 0.9,
  },
  SIZES: {
    LOW: 0.6,
    MEDIUM: 1,
    HIGH: 1.4,
  },
  OPACITY: {
    BASE: 0.5,
    LOW: 0.2,
    MEDIUM: 0.5,
    HIGH: 1,
  },
} as const;

// ============================================================================
// LAYOUT DIMENSIONS
// ============================================================================

export const LAYOUT = {
  ZODIAC: {
    WRAPPER_HEIGHT: 440,
    CONTAINER_SIZE: 420,
    SYMBOL_SIZE: 320,
    AURA_DIAMETER: 340,
    ORBIT_DIAMETER: 280,
    NAME_BOTTOM_OFFSET: -38,
    NAME_FONT_SIZE: 22,
    NAME_LETTER_SPACING: 5,
  },
  HERO: {
    GRID_GAP: 120,
    CONTENT_MAX_WIDTH: 620,
    DIVIDER_WIDTH: 120,
    DIVIDER_HEIGHT: 2,
  },
  GLASS_BOX: {
    WIDTH: "80%",
    PADDING: 60,
    BORDER_RADIUS: 28,
  },
  BUTTON: {
    WIDTH: "16rem",
    HEIGHT: "3.6rem",
    BORDER_RADIUS: 60,
    SHOCKWAVE_SIZE: 140,
    PARTICLE_SIZE: 6,
  },
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 1000,
} as const;

// ============================================================================
// COLORS (for reference)
// ============================================================================

export const COLORS = {
  PRIMARY: "#7aa2ff",
  PRIMARY_LIGHT: "#c084fc",
  PRIMARY_CYAN: "#22d3ee",
  BACKGROUND_DARK: "#01020a",
  BACKGROUND_PANEL: "rgba(20, 25, 70, 0.7)",
  BORDER: "rgba(255, 255, 255, 0.1)",
  TEXT: "white",
  TEXT_SECONDARY: "rgba(255, 255, 255, 0.75)",
} as const;

// ============================================================================
// SECTION IDs
// ============================================================================

export const SECTIONS = {
  HOME: "home",
  ABOUT: "about",
  CHART: "chart",
  FORECAST: "forecast",
} as const;

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS];

