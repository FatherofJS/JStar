// LandingPage Component - Main landing page using modular components

import { useState, useCallback } from "react";
import { Background } from "./background/Background";
import AuthModal from "./auth/AuthModal";
import ChangePasswordModal from "./auth/ChangePasswordModal";
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
  // UI state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Custom hooks
  const { activeSection } = useSectionObserver();
  const { features: featuresData } = useFeaturesFromAPI();

  // Handle successful login
  const handleLoginSuccess = useCallback(() => {
    console.log("Login successful!");
  }, []);

  // Handle open auth modal
  const handleOpenAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  // Handle close auth modal
  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Handle open change password
  const handleOpenChangePassword = useCallback(() => {
    setIsChangePasswordOpen(true);
  }, []);

  // Handle close change password
  const handleCloseChangePassword = useCallback(() => {
    setIsChangePasswordOpen(false);
  }, []);

  // Render feature sections with alternating layout
  const renderFeatureSections = (): React.ReactNode[] => {
    const sections: React.ReactNode[] = [];
    
    featuresData.forEach((feature, index) => {
      if (feature.id === "ai-interpretations") {
        // AI Interpretations - special component
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
      <Header 
        onOpenAuthModal={handleOpenAuthModal}
        onOpenChangePassword={handleOpenChangePassword}
      />

      {/* Hero Section */}
      <HeroSection onNavigateToStarChart={handleOpenAuthModal} />

      {/* Feature Sections */}
      {renderFeatureSections()}

      {/* Pricing Section */}
      <PricingSection onOpenAuthModal={handleOpenAuthModal} />

      {/* Get Started Steps */}
      <GetStartedSteps />

      {/* CTA Section */}
      <CTASection onOpenAuthModal={handleOpenAuthModal} />

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
      />
    </>
  );
}

export default LandingPage;

