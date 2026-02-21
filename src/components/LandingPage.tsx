// LandingPage Component - Main landing page using modular components

import { useState, useCallback } from "react";
import { Background } from "./Background";
import AuthModal from "./AuthModal";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { SECTIONS } from "../constants";
import { useAuth } from "../contexts/AuthContext";

// Import modular components
import Header from "./landing/Header";
import HeroSection from "./landing/HeroSection";
import { FeatureSection, FeatureSectionAlt, AIInterpretationSection } from "./landing/FeatureSection";
import PricingSection from "./landing/PricingSection";
import GetStartedSteps from "./landing/GetStartedSteps";
import OpenSourceSection from "./landing/OpenSourceSection";
import CTASection from "./landing/CTASection";
import Footer from "./landing/Footer";

// Feature data
const featuresData = [
  {
    id: "features",
    badge: "Interactive Charts",
    badgeIcon: "chart" as const,
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
    glowColor: "blue" as const,
  },
  {
    id: "chart-data",
    badge: "Chart Data",
    badgeIcon: "chart" as const,
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
    glowColor: "blue" as const,
  },
  {
    id: "transit-analysis",
    badge: "Transit Analysis",
    badgeIcon: "chart" as const,
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
    glowColor: "purple" as const,
  },
  {
    id: "aspect-grid",
    badge: "Aspect Grid",
    badgeIcon: "chart" as const,
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
    glowColor: "blue" as const,
  },
  {
    id: "transit-timeline",
    badge: "Transit Timeline",
    badgeIcon: "chart" as const,
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
    glowColor: "purple" as const,
  },
  {
    id: "ephemeris",
    badge: "Ephemeris & Tables",
    badgeIcon: "chart" as const,
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
    glowColor: "blue" as const,
  },
  {
    id: "position-tables",
    badge: "Position Tables",
    badgeIcon: "chart" as const,
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
    glowColor: "blue" as const,
  },
  {
    id: "data-management",
    badge: "Data Management",
    badgeIcon: "chart" as const,
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
    glowColor: "purple" as const,
  },
  {
    id: "ai-interpretations",
    badge: "AI Interpretations",
    badgeIcon: "sparkles" as const,
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
    glowColor: "blue" as const,
  },
];

function LandingPage() {
  // UI state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Custom hooks
  const { activeSection } = useSectionObserver();
  const { changePassword } = useAuth();

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
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordError(null);
    setPasswordSuccess(false);
  }, []);

  // Handle close change password
  const handleCloseChangePassword = useCallback(() => {
    setIsChangePasswordOpen(false);
    setPasswordError(null);
    setPasswordSuccess(false);
  }, []);

  // Handle password form change
  const handlePasswordFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setPasswordError(null);
  }, []);

  // Handle password change submit
  const handlePasswordSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    // Validate
    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordError('Please enter a new password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setIsChangingPassword(false);

    if (result.success) {
      setPasswordSuccess(true);
      setTimeout(() => {
        handleCloseChangePassword();
      }, 1500);
    } else {
      setPasswordError(result.error || 'Failed to change password.');
    }
  }, [passwordForm, changePassword, handleCloseChangePassword]);

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

      {/* Open Source Section */}
      <OpenSourceSection />

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
      {isChangePasswordOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseChangePassword();
          }}
        >
          <div
            style={{
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '32px',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-inverse)', margin: 0 }}>
                Change Password
              </h3>
              <button 
                onClick={handleCloseChangePassword}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            
            {passwordSuccess ? (
              <div style={{
                color: '#4ade80',
                fontSize: '14px',
                textAlign: 'center',
                padding: '16px',
                background: 'rgba(74, 222, 128, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Password changed successfully!
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordFormChange}
                    autoComplete="current-password"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--glass-border)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-inverse)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordFormChange}
                    autoComplete="new-password"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--glass-border)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-inverse)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordFormChange}
                    autoComplete="new-password"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--glass-border)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-inverse)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                
                {passwordError && (
                  <div style={{
                    color: '#ff6b6b',
                    fontSize: '13px',
                    textAlign: 'center',
                    padding: '8px',
                    background: 'rgba(255, 107, 107, 0.1)',
                    borderRadius: '6px',
                  }}>
                    {passwordError}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={isChangingPassword}
                  style={{
                    padding: '14px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #787cff, #a85aff)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: isChangingPassword ? 'not-allowed' : 'pointer',
                    opacity: isChangingPassword ? 0.6 : 1,
                    marginTop: '8px',
                  }}
                >
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;

