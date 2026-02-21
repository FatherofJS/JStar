// LandingPage Component - Main landing page using modular components

import { useState, useCallback } from "react";
import { Background } from "./background/Background";
import AuthModal from "./AuthModal";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { SECTIONS } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { featuresData } from "../data/landingFeatures";

// Import modular components
import Header from "./landing/Header";
import HeroSection from "./landing/HeroSection";
import { FeatureSection, FeatureSectionAlt, AIInterpretationSection } from "./landing/FeatureSection";
import PricingSection from "./landing/PricingSection";
import GetStartedSteps from "./landing/GetStartedSteps";
import OpenSourceSection from "./landing/OpenSourceSection";
import CTASection from "./landing/CTASection";
import Footer from "./landing/Footer";

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

