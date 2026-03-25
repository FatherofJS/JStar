const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

export const API = {
  BASE_URL: getApiUrl(),
  CHART: '/chart',
  SYNASTRY: '/synastry',
  CHAT: '/api/chat',
  LOCATION: {
    SEARCH: '/api/location/search',
    SEARCH_COUNTRIES: '/api/location/search-countries',
    REVERSE: '/api/location/reverse',
  },
  HEALTH: '/api/health',
} as const;

export const getApiEndpoint = (endpoint: string): string => {
  return `${API.BASE_URL}${endpoint}`;
};

export const ZODIAC_CYCLE_INTERVAL = 7000;



export const SCROLL = {
  TRIGGER_THRESHOLD: 40,
  INTERSECTION_THRESHOLD: 0.55,
  ROOT_MARGIN: "-10% 0px -10% 0px",
} as const;

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

export const SECTIONS = {
  HOME: "home",
  ABOUT: "about",
  CHART: "chart",
  FORECAST: "forecast",
  FEATURES: "features",
  CHART_DATA: "chart-data",
  TRANSIT_ANALYSIS: "transit-analysis",
  ASPECT_GRID: "aspect-grid",
  TRANSIT_TIMELINE: "transit-timeline",
  EPHEMERIS: "ephemeris",
  POSITION_TABLES: "position-tables",
  DATA_MANAGEMENT: "data-management",
  AI_INTERPRETATIONS: "ai-interpretations",
  GET_STARTED: "get-started",
  OPEN_SOURCE: "open-source",
  DOCS: "docs",
  CONTACT: "contact",
} as const;

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS];

