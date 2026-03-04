// Hook to provide translated feature data for landing page
// Uses local translations directly (no /api/features endpoint in backend)

import { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { FeatureItem } from '../data/landingFeatures';
import { translations } from '../contexts/LanguageContext';

interface UseFeaturesResponse {
  features: FeatureItem[];
  loading: boolean;
  error: string | null;
  isFromAPI: boolean;
}

// Helper to convert translations to FeatureItem format
function getLocalFeatures(lang: 'en' | 'vi' | 'ja'): FeatureItem[] {
  const t = translations[lang];

  return [
    {
      id: "features",
      badge: t.interactiveChartsBadge,
      badgeIcon: "chart",
      title: t.interactiveChartsTitle,
      description: t.interactiveChartsDescription,
      items: t.interactiveChartsItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/birth-chart.webp",
      imageAlt: "Astrologer Studio Dashboard - Natal Chart",
      reversed: false,
      glowColor: "blue",
    },
    {
      id: "chart-data",
      badge: t.chartDataBadge,
      badgeIcon: "chart",
      title: t.chartDataTitle,
      description: t.chartDataDescription,
      items: t.chartDataItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
      imageAlt: "Chart Data Tab - Detailed planetary positions",
      reversed: true,
      glowColor: "blue",
    },
    {
      id: "transit-analysis",
      badge: t.transitAnalysisBadge,
      badgeIcon: "chart",
      title: t.transitAnalysisTitle,
      description: t.transitAnalysisDescription,
      items: t.transitAnalysisItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-chart.webp",
      imageAlt: "Transit Chart - Current planetary transits",
      reversed: false,
      glowColor: "purple",
    },
    {
      id: "aspect-grid",
      badge: t.aspectGridBadge,
      badgeIcon: "chart",
      title: t.aspectGridTitle,
      description: t.aspectGridDescription,
      items: t.aspectGridItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-grid.webp",
      imageAlt: "Transit Grid - Detailed aspect grid",
      reversed: true,
      glowColor: "blue",
    },
    {
      id: "transit-timeline",
      badge: t.transitTimelineBadge,
      badgeIcon: "chart",
      title: t.transitTimelineTitle,
      description: t.transitTimelineDescription,
      items: t.transitTimelineItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/timeline.webp",
      imageAlt: "Timeline - Transit events and exact aspect dates",
      reversed: false,
      glowColor: "purple",
    },
    {
      id: "ephemeris",
      badge: t.ephemerisBadge,
      badgeIcon: "chart",
      title: t.ephemerisTitle,
      description: t.ephemerisDescription,
      items: t.ephemerisItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-chart.webp",
      imageAlt: "Graphical Ephemeris - Visual planetary position chart",
      reversed: true,
      glowColor: "blue",
    },
    {
      id: "position-tables",
      badge: t.positionTablesBadge,
      badgeIcon: "chart",
      title: t.positionTablesTitle,
      description: t.positionTablesDescription,
      items: t.positionTablesItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-list.webp",
      imageAlt: "Ephemeris Table - Daily planetary positions",
      reversed: false,
      glowColor: "blue",
    },
    {
      id: "data-management",
      badge: t.dataManagementBadge,
      badgeIcon: "chart",
      title: t.dataManagementTitle,
      description: t.dataManagementDescription,
      items: t.dataManagementItems,
      imageSrc: "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
      imageAlt: "Data Management - Subject database",
      reversed: true,
      glowColor: "purple",
    },
    {
      id: "ai-interpretations",
      badge: t.aiInterpretationsBadge,
      badgeIcon: "sparkles",
      title: t.aiInterpretationsTitle,
      description: t.aiInterpretationsDescription,
      items: t.aiInterpretationsItems,
      imageSrc: "",
      imageAlt: "AI Interpretation",
      reversed: false,
      glowColor: "blue",
    },
  ];
}

export function useFeaturesFromAPI(): UseFeaturesResponse {
  const { language } = useLanguage();
  const features = useMemo(() => getLocalFeatures(language), [language]);

  return { features, loading: false, error: null, isFromAPI: false };
}

