// LandingPage Component - Main landing page using modular components
// Auth removed — all "login" actions now navigate to /star-chart

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "./background/Background";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useFeaturesFromAPI } from "../hooks/useFeaturesFromAPI";
import { SECTIONS } from "../constants";

// Import modular components
import Header from "./landing/Header";
import HeroSection from "./landing/HeroSection";
import { FeatureSection, FeatureSectionAlt, AIInterpretationSection } from "./landing/FeatureSection";
import PricingSection from "./landing/PricingSection";
import GetStartedSteps from "./landing/GetStartedSteps";
import CTASection from "./landing/CTASection";
import Footer from "./landing/Footer";

function LandingPage() {
  const navigate = useNavigate();
  const { activeSection } = useSectionObserver();
  const { features: featuresData } = useFeaturesFromAPI();

  const handleGetStarted = useCallback(() => {
    navigate("/star-chart");
  }, [navigate]);

  // Render feature sections with alternating layout
  const renderFeatureSections = (): React.ReactNode[] => {
    const sections: React.ReactNode[] = [];

    featuresData.forEach((feature, index) => {
      if (feature.id === "ai-interpretations") {
        sections.push(
          <AIInterpretationSection
            key={feature.id}
            feature={feature}
          />
        );
      } else if (index % 2 === 0) {
        sections.push(
          <FeatureSection
            key={feature.id}
            feature={feature}
          />
        );
      } else {
        sections.push(
          <FeatureSectionAlt
            key={feature.id}
            feature={feature}
          />
        );
      }
    });

    return sections;
  };

  return (
    <>
      {/* Reusable Background Component */}
      <Background showShootingStars={activeSection === SECTIONS.HOME} />

      {/* Fixed Navigation Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Feature Sections */}
      {renderFeatureSections()}

      {/* Pricing Section */}
      <PricingSection onGetStarted={handleGetStarted} />

      {/* Get Started Steps */}
      <GetStartedSteps />

      {/* CTA Section */}
      <CTASection onGetStarted={handleGetStarted} />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default LandingPage;
