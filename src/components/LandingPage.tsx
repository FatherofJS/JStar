// LandingPage Component - Main landing page using modular components
// Auth removed — all "login" actions now navigate to /star-chart

import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Background } from "./background/Background";
import { useLandingPerformanceMode } from "../hooks/useLandingPerformanceMode";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useFeaturesFromAPI } from "../hooks/useFeaturesFromAPI";
import { SECTIONS } from "../constants";

// Import modular components
import Header from "./landing/Header";
import HeroSection from "./landing/HeroSection";
import { FeatureSection, FeatureSectionAlt, AIInterpretationSection } from "./landing/FeatureSection";
import GetStartedSteps from "./landing/GetStartedSteps";
import CTASection from "./landing/CTASection";
import Footer from "./landing/Footer";

const LandingPageShell = styled.div`
  position: relative;
  overflow-x: clip;
`;

function LandingPage() {
  const navigate = useNavigate();
  const { activeSection } = useSectionObserver();
  const { isReduced } = useLandingPerformanceMode();
  const { features: featuresData } = useFeaturesFromAPI();

  const handleGetStarted = useCallback(() => {
    navigate("/star-chart");
  }, [navigate]);

  const featureSections = useMemo(
    () =>
      featuresData.map((feature, index) => {
        if (feature.id === "ai-interpretations") {
          return (
            <AIInterpretationSection
              key={feature.id}
              feature={feature}
            />
          );
        }

        if (index % 2 === 0) {
          return (
            <FeatureSection
              key={feature.id}
              feature={feature}
            />
          );
        }

        return (
          <FeatureSectionAlt
            key={feature.id}
            feature={feature}
          />
        );
      }),
    [featuresData]
  );

  return (
    <LandingPageShell data-performance-mode={isReduced ? "reduced" : "default"}>
      {/* Reusable Background Component */}
      <Background
        showShootingStars={activeSection === SECTIONS.HOME}
        forceReducedMotion={isReduced}
      />

      {/* Fixed Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Hero Section */}
      <HeroSection />

      {/* Feature Sections */}
      {featureSections}
      {/* Get Started Steps */}
      <GetStartedSteps />

      {/* CTA Section */}
      <CTASection onGetStarted={handleGetStarted} />

      {/* Footer */}
      <Footer />
    </LandingPageShell>
  );
}

export default memo(LandingPage);
