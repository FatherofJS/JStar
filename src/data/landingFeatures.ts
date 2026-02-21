// Feature data for LandingPage - Used by FeatureSection components

export interface FeatureItem {
  id: string;
  badge: string;
  badgeIcon?: "chart" | "sparkles";
  title: string;
  description: string;
  items: string[];
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  glowColor?: "blue" | "purple";
}

export const featuresData: FeatureItem[] = [
  {
    id: "features",
    badge: "Interactive Charts",
    badgeIcon: "chart",
    title: "Beautiful, Precise Astrology Charts",
    description: "High-precision SVG charts with interactive hover states, customizable themes, and detailed planetary positions. Every chart is calculated with astronomical accuracy.",
    items: [
      "Natal, Transits, Synastry, Composite charts",
      "Solar and Lunar Return charts",
      "Multiple house systems (Placidus, Whole Sign, Koch...)",
      "Tropical and Sidereal zodiac options",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/birth-chart.webp",
    imageAlt: "Astrologer Studio Dashboard - Natal Chart",
    reversed: false,
    glowColor: "blue",
  },
  {
    id: "chart-data",
    badge: "Chart Data",
    badgeIcon: "chart",
    title: "Complete Chart Analysis",
    description: "Every chart includes a comprehensive Data tab with all the details you need. Planetary positions, house placements, aspects, and element distributions at your fingertips.",
    items: [
      "Chart highlights with key placements",
      "Lunar phase and aspect details",
      "Element and quality distribution charts",
      "Complete planetary positions table",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
    imageAlt: "Chart Data Tab - Detailed planetary positions",
    reversed: true,
    glowColor: "blue",
  },
  {
    id: "transit-analysis",
    badge: "Transit Analysis",
    badgeIcon: "chart",
    title: "Real-Time Planetary Transits",
    description: "Overlay current planetary positions on any natal chart. Track how transiting planets interact with natal placements to understand timing and influences.",
    items: [
      "Dual-ring chart with natal and transit positions",
      "Aspect lines between transit and natal planets",
      "Customizable transit date selection",
      "Instant aspect calculations",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-chart.webp",
    imageAlt: "Transit Chart - Current planetary transits",
    reversed: false,
    glowColor: "purple",
  },
  {
    id: "aspect-grid",
    badge: "Aspect Grid",
    badgeIcon: "chart",
    title: "Complete Aspect Overview",
    description: "View all planetary aspects at a glance with our interactive aspect grid. Quickly identify harmonious and challenging configurations in any chart comparison.",
    items: [
      "Color-coded aspect types (conjunction, trine, square...)",
      "Orb values displayed for each aspect",
      "Filter by aspect type or planet",
      "Works with natal, transit, and synastry charts",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-grid.webp",
    imageAlt: "Transit Grid - Detailed aspect grid",
    reversed: true,
    glowColor: "blue",
  },
  {
    id: "transit-timeline",
    badge: "Transit Timeline",
    badgeIcon: "chart",
    title: "Track Upcoming Transits",
    description: "See exactly when transits will be exact with the timeline view. Plan ahead with precise dates for applying and separating aspects.",
    items: [
      "Chronological list of transit events",
      "Exact dates and times for aspect perfection",
      "Filter by planet, aspect type, or date range",
      "Retrograde and direct station markers",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/timeline.webp",
    imageAlt: "Timeline - Transit events and exact aspect dates",
    reversed: false,
    glowColor: "purple",
  },
  {
    id: "ephemeris",
    badge: "Ephemeris & Tables",
    badgeIcon: "chart",
    title: "Visual Planetary Ephemeris",
    description: "Explore planetary positions with both graphical and tabular views. Track planetary movements across the zodiac over any time period.",
    items: [
      "Graphical ephemeris chart with planetary tracks",
      "Detailed position tables by date",
      "Retrograde periods clearly highlighted",
      "Export data for research and reference",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-chart.webp",
    imageAlt: "Graphical Ephemeris - Visual planetary position chart",
    reversed: true,
    glowColor: "blue",
  },
  {
    id: "position-tables",
    badge: "Position Tables",
    badgeIcon: "chart",
    title: "Detailed Position Data",
    description: "Access precise planetary positions for any date range. Perfect for research, mundane astrology, and verifying chart calculations.",
    items: [
      "Daily positions for all planets",
      "Degree, minutes, and seconds precision",
      "Moon phases and void-of-course times",
      "Ingress dates and sign changes",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-list.webp",
    imageAlt: "Ephemeris Table - Daily planetary positions",
    reversed: false,
    glowColor: "blue",
  },
  {
    id: "data-management",
    badge: "Data Management",
    badgeIcon: "chart",
    title: "Organize Your Client Database",
    description: "Store unlimited profiles with complete birth data, notes, and tags. Quick access to any client's charts and readings in seconds.",
    items: [
      "Complete birth data with location lookup",
      "Rodden rating for data accuracy",
      "Tags and notes for organization",
      "Quick search and filter",
    ],
    imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
    imageAlt: "Data Management - Subject database",
    reversed: true,
    glowColor: "purple",
  },
  {
    id: "ai-interpretations",
    badge: "AI Interpretations",
    badgeIcon: "sparkles",
    title: "Instant Insights, Powered by AI",
    description: "Get intelligent, context-aware interpretations for any chart. Rich formatted text with emojis, headings, and structured analysis delivered in real-time.",
    items: [
      "Full chart analysis with key themes",
      "Structured sections with headings",
      "Real-time streaming text generation",
      "Works with all chart types",
    ],
    imageSrc: "",
    imageAlt: "AI Interpretation",
    reversed: false,
    glowColor: "blue",
  },
];

