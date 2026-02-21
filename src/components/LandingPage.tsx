// LandingPage Component - Main landing page with multiple sections similar to astrologerstudio.com

import { useRef, useState, useCallback, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZodiacCinematic } from "./ZodiacCinematic";
import { Background } from "./Background";
import AuthModal from "./AuthModal";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { SECTIONS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import ThemeSwitch from "./ThemeSwitch";
import {
  Wrapper,
  Header,
  HeaderLeft,
  HeaderRight,
  Logo,
  NavMenu,
  NavMenuMobile,
  MobileToggle,
  NavItem,
  UserAvatar,
  UserName,
  HeroLight,
  SectionHero,
  HeroLayout,
  Content,
  DividerGlow,
  HeroRight,
  // New imports for enhanced sections
  // Section containers
  SectionContainer,
  SectionContainerAlt,
  MaxWidthContainer,
  GridTwoColumns,
  FeatureContent,
  FeatureContentReversed,
  FeatureImageWrapper,
  FeatureImageCard,
  FeatureImage,
  FeatureImageOverlay,
  ZoomHint,
  FeatureGlow,
  FeatureGlowPurple,
  // Typography
  SectionTitle,
  GradientText,
  SectionDescription,
  FeatureBadge,
  FeatureList,
  FeatureListItem,
  // Actions (for Hero buttons)
  Actions,
  // Pricing
  PricingSection,
  PricingHeader,
  PricingTitle,
  PricingSubtitle,
  PricingCard,
  PricingBadge,
  PricingIcon,
  PricingPlanName,
  PricingPlanDesc,
  PricingAmount,
  PricingOriginalPrice,
  PricingCurrentPrice,
  PricingPeriod,
  PricingDiscount,
  PricingFeatures,
  PricingFeatureItem,
  PricingButton,
  PricingNote,
  // Steps
  StepsSection,
  StepsHeader,
  StepsGrid,
  StepCard,
  StepNumber,
  StepTitle,
  StepDescription,
  // Open Source
  OpenSourceSection,
  OpenSourceContent,
  OpenSourceBadge,
  OpenSourceTitle,
  OpenSourceDescription,
  OpenSourceCards,
  OpenSourceCard,
  OpenSourceCardTitle,
  OpenSourceCardDesc,
  OpenSourceButtons,
  OpenSourceButton,
  // CTA
  CTASection,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAButton,
  CTANote,
  // Footer
  FooterWrapper,
  FooterContent,
  FooterBrand,
  FooterLogo,
  FooterCopyright,
  FooterLinks,
  FooterLink,
  // Scroll button
  ScrollButton,
  // User menu
  UserMenuWrapper,
  UserInfoButton,
  UserMenuDropdown,
  UserMenuSection,
  UserMenuLabel,
  UserMenuEmail,
  UserMenuName,
  UserMenuItem,
  UserMenuDivider,
  // Password modal
  PasswordModalOverlay,
  PasswordModalContainer,
  PasswordModalHeader,
  PasswordModalTitle,
  PasswordModalClose,
  PasswordForm,
  PasswordInputGroup,
  PasswordInputLabel,
  PasswordInput,
  PasswordSubmitButton,
  PasswordErrorMessage,
  PasswordSuccessMessage,
} from "../styles/LandingPage.styles";

// Import StarPlayButton component
import { StarPlayButton } from "./StarPlayButton";
// Import SpaceStyleButton component
import { SpaceStyleButton } from "./SpaceStyleButton";

// Memoized nav item to prevent re-renders
const NavItemMemo = memo(NavItem);

// SVG Icons as components
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
    <path d="M2 12h20"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" x2="16.65" y1="21" y2="16.65"/>
    <line x1="11" x2="11" y1="8" y2="14"/>
    <line x1="8" x2="14" y1="11" y2="11"/>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
    <path d="M20 2v4"/>
    <path d="M22 4h-4"/>
    <circle cx="4" cy="20" r="2"/>
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function LandingPage() {
  // Section refs
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const chartDataRef = useRef<HTMLElement>(null);
  const transitRef = useRef<HTMLElement>(null);
  const aspectGridRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const ephemerisRef = useRef<HTMLElement>(null);
  const positionRef = useRef<HTMLElement>(null);
  const dataMgmtRef = useRef<HTMLElement>(null);
  const aiRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const getStartedRef = useRef<HTMLElement>(null);
  const openSourceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Custom hooks for scroll and section tracking
  const { isScrolled } = useScrollPosition();
  const { activeSection } = useSectionObserver();
  
  // Theme context
  const { theme, toggleTheme } = useTheme();
  
  // Auth context
  const { user, isLoggedIn, logout, changePassword } = useAuth();
  
  // Navigation
  const navigate = useNavigate();
  
  // Get first letter of user name for avatar
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
  
  // Callback to handle successful login
  const handleLoginSuccess = useCallback(() => {
    console.log("Login successful!");
  }, []);

  // Handle See Your Star button click
  const handleStarButtonClick = useCallback(() => {
    if (isLoggedIn) {
      // If logged in, navigate to star chart page
      navigate('/star-chart');
    } else {
      // If not logged in, open auth modal
      setIsAuthModalOpen(true);
    }
  }, [isLoggedIn, navigate]);

  // Handle logout
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Memoize scrollTo function
  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }, []);

  // Memoize setIsOpen toggle
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Handle open auth modal
  const handleOpenAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  // Handle close auth modal
  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Toggle user menu
  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
  }, []);

  // Close user menu
  const closeUserMenu = useCallback(() => {
    setIsUserMenuOpen(false);
  }, []);

  // Handle click outside user menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.user-menu-container')) {
          closeUserMenu();
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen, closeUserMenu]);

  // Handle open change password
  const handleOpenChangePassword = useCallback(() => {
    setIsUserMenuOpen(false);
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

  return (
    <Wrapper>
      {/* Reusable Background Component */}
      <Background showShootingStars={activeSection === SECTIONS.HOME} />

      {/* Fixed Navigation Header */}
      <Header $scrolled={isScrolled}>
        <HeaderLeft>
          <Logo onClick={() => scrollTo(heroRef)}>JSTAR</Logo>
          
          <NavMenu>
            <NavItemMemo
              $active={activeSection === SECTIONS.HOME}
              onClick={() => scrollTo(heroRef)}
            >
              Home
            </NavItemMemo>
            <NavItemMemo
              $active={activeSection === SECTIONS.FEATURES}
              onClick={() => scrollTo(featuresRef)}
            >
              Features
            </NavItemMemo>
            <NavItemMemo
              $active={activeSection === SECTIONS.PRICING}
              onClick={() => scrollTo(pricingRef)}
            >
              Pricing
            </NavItemMemo>
            <NavItemMemo
              $active={activeSection === SECTIONS.OPEN_SOURCE}
              onClick={() => scrollTo(openSourceRef)}
            >
              Open Source
            </NavItemMemo>
          </NavMenu>
        </HeaderLeft>

        <HeaderRight>
          <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />
          
          {/* User section - show login button or user menu */}
          {isLoggedIn ? (
            <UserMenuWrapper className="user-menu-container">
              <UserInfoButton onClick={toggleUserMenu} $hasMenu>
                <UserAvatar>{userInitial}</UserAvatar>
                <UserName>{user?.name}</UserName>
              </UserInfoButton>
              
              <UserMenuDropdown $open={isUserMenuOpen}>
                <UserMenuSection>
                  <UserMenuLabel>Account</UserMenuLabel>
                  <UserMenuName>{user?.name}</UserMenuName>
                  <UserMenuEmail>{user?.email}</UserMenuEmail>
                </UserMenuSection>
                
                <UserMenuItem onClick={handleOpenChangePassword}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Change Password
                </UserMenuItem>
                
                <UserMenuDivider />
                
                <UserMenuItem onClick={handleLogout} $danger>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </UserMenuItem>
              </UserMenuDropdown>
            </UserMenuWrapper>
          ) : (
            <NavItemMemo $active={false} onClick={handleOpenAuthModal}>
              Login
            </NavItemMemo>
          )}
          
          <MobileToggle onClick={toggleMenu}>☰</MobileToggle>
        </HeaderRight>
      </Header>

      {/* Mobile Navigation Menu */}
      <NavMenuMobile $open={isOpen}>
        <NavItemMemo
          $active={activeSection === SECTIONS.HOME}
          onClick={() => scrollTo(heroRef)}
        >
          Home
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.FEATURES}
          onClick={() => scrollTo(featuresRef)}
        >
          Features
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.PRICING}
          onClick={() => scrollTo(pricingRef)}
        >
          Pricing
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.OPEN_SOURCE}
          onClick={() => scrollTo(openSourceRef)}
        >
          Open Source
        </NavItemMemo>
        {isLoggedIn ? (
          <UserMenuWrapper className="user-menu-container">
            <UserInfoButton onClick={toggleUserMenu} $hasMenu>
              <UserAvatar>{userInitial}</UserAvatar>
              <UserName>{user?.name}</UserName>
            </UserInfoButton>
            
            <UserMenuDropdown $open={isUserMenuOpen}>
              <UserMenuSection>
                <UserMenuLabel>Account</UserMenuLabel>
                <UserMenuName>{user?.name}</UserMenuName>
                <UserMenuEmail>{user?.email}</UserMenuEmail>
              </UserMenuSection>
              
              <UserMenuItem onClick={handleOpenChangePassword}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Change Password
              </UserMenuItem>
              
              <UserMenuDivider />
              
              <UserMenuItem onClick={handleLogout} $danger>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </UserMenuItem>
            </UserMenuDropdown>
          </UserMenuWrapper>
        ) : (
          <NavItemMemo $active={false} onClick={handleOpenAuthModal}>
            Login
          </NavItemMemo>
        )}
      </NavMenuMobile>

      {/* Hero Section */}
      <SectionHero
        ref={heroRef}
        data-section={SECTIONS.HOME}
        className="zoom-section zoom-in"
      >
        <HeroLight />

        <HeroLayout>
          <Content>
            <h1>
              <span>JSTAR</span>
              <br /> KNOW YOUR STAR
            </h1>

            <p>
              Professional astrology software for accurate natal charts, transits, 
              synastry, and AI-powered interpretations. Discover your cosmic identity.
            </p>

            <DividerGlow />

            <Actions>
              <StarPlayButton onClick={handleStarButtonClick} />
              <SpaceStyleButton onClick={() => navigate('/your-star')}>
                SEE YOUR STAR
              </SpaceStyleButton>
            </Actions>
          </Content>

          <HeroRight>
            <ZodiacCinematic />
          </HeroRight>
        </HeroLayout>

        <ScrollButton onClick={() => scrollTo(featuresRef)} aria-label="Scroll to features">
          <ChevronDownIcon />
        </ScrollButton>
      </SectionHero>

      {/* Features Section - Interactive Charts */}
      <SectionContainer
        ref={featuresRef}
        data-section={SECTIONS.FEATURES}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureContent>
              <FeatureBadge>
                <ChartIcon />
                Interactive Charts
              </FeatureBadge>
              <SectionTitle>
                Beautiful, Precise <GradientText>Astrology Charts</GradientText>
              </SectionTitle>
              <SectionDescription>
                High-precision SVG charts with interactive hover states, customizable themes, 
                and detailed planetary positions. Every chart is calculated with astronomical accuracy.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Natal, Transits, Synastry, Composite charts</FeatureListItem>
                <FeatureListItem>Solar and Lunar Return charts</FeatureListItem>
                <FeatureListItem>Multiple house systems (Placidus, Whole Sign, Koch...)</FeatureListItem>
                <FeatureListItem>Tropical and Sidereal zodiac options</FeatureListItem>
              </FeatureList>
            </FeatureContent>
            <FeatureImageWrapper>
              <FeatureGlow $position="right" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/birth-chart.webp" 
                  alt="Astrologer Studio Dashboard - Natal Chart"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainer>

      {/* Chart Data Section */}
      <SectionContainerAlt
        ref={chartDataRef}
        data-section={SECTIONS.CHART_DATA}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureImageWrapper>
              <FeatureGlow $position="left" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp" 
                  alt="Chart Data Tab - Detailed planetary positions"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
            <FeatureContentReversed>
              <FeatureBadge>
                <ChartIcon />
                Chart Data
              </FeatureBadge>
              <SectionTitle>
                Complete <GradientText>Chart Analysis</GradientText>
              </SectionTitle>
              <SectionDescription>
                Every chart includes a comprehensive Data tab with all the details you need. 
                Planetary positions, house placements, aspects, and element distributions at your fingertips.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Chart highlights with key placements</FeatureListItem>
                <FeatureListItem>Lunar phase and aspect details</FeatureListItem>
                <FeatureListItem>Element and quality distribution charts</FeatureListItem>
                <FeatureListItem>Complete planetary positions table</FeatureListItem>
              </FeatureList>
            </FeatureContentReversed>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainerAlt>

      {/* Transit Analysis Section */}
      <SectionContainer
        ref={transitRef}
        data-section={SECTIONS.TRANSIT_ANALYSIS}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureContent>
              <FeatureBadge>
                <ChartIcon />
                Transit Analysis
              </FeatureBadge>
              <SectionTitle>
                Real-Time <GradientText>Planetary Transits</GradientText>
              </SectionTitle>
              <SectionDescription>
                Overlay current planetary positions on any natal chart. Track how transiting 
                planets interact with natal placements to understand timing and influences.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Dual-ring chart with natal and transit positions</FeatureListItem>
                <FeatureListItem>Aspect lines between transit and natal planets</FeatureListItem>
                <FeatureListItem>Customizable transit date selection</FeatureListItem>
                <FeatureListItem>Instant aspect calculations</FeatureListItem>
              </FeatureList>
            </FeatureContent>
            <FeatureImageWrapper>
              <FeatureGlowPurple $position="right" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-chart.webp" 
                  alt="Transit Chart - Current planetary transits"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainer>

      {/* Aspect Grid Section */}
      <SectionContainerAlt
        ref={aspectGridRef}
        data-section={SECTIONS.ASPECT_GRID}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureImageWrapper>
              <FeatureGlow $position="left" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-grid.webp" 
                  alt="Transit Grid - Detailed aspect grid"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
            <FeatureContentReversed>
              <FeatureBadge>
                <ChartIcon />
                Aspect Grid
              </FeatureBadge>
              <SectionTitle>
                Complete <GradientText>Aspect Overview</GradientText>
              </SectionTitle>
              <SectionDescription>
                View all planetary aspects at a glance with our interactive aspect grid. 
                Quickly identify harmonious and challenging configurations in any chart comparison.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Color-coded aspect types (conjunction, trine, square...)</FeatureListItem>
                <FeatureListItem>Orb values displayed for each aspect</FeatureListItem>
                <FeatureListItem>Filter by aspect type or planet</FeatureListItem>
                <FeatureListItem>Works with natal, transit, and synastry charts</FeatureListItem>
              </FeatureList>
            </FeatureContentReversed>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainerAlt>

      {/* Transit Timeline Section */}
      <SectionContainer
        ref={timelineRef}
        data-section={SECTIONS.TRANSIT_TIMELINE}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureContent>
              <FeatureBadge>
                <ChartIcon />
                Transit Timeline
              </FeatureBadge>
              <SectionTitle>
                Track <GradientText>Upcoming Transits</GradientText>
              </SectionTitle>
              <SectionDescription>
                See exactly when transits will be exact with the timeline view. 
                Plan ahead with precise dates for applying and separating aspects.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Chronological list of transit events</FeatureListItem>
                <FeatureListItem>Exact dates and times for aspect perfection</FeatureListItem>
                <FeatureListItem>Filter by planet, aspect type, or date range</FeatureListItem>
                <FeatureListItem>Retrograde and direct station markers</FeatureListItem>
              </FeatureList>
            </FeatureContent>
            <FeatureImageWrapper>
              <FeatureGlowPurple $position="right" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/timeline.webp" 
                  alt="Timeline - Transit events and exact aspect dates"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainer>

      {/* Ephemeris Section */}
      <SectionContainerAlt
        ref={ephemerisRef}
        data-section={SECTIONS.EPHEMERIS}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureImageWrapper>
              <FeatureGlow $position="left" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-chart.webp" 
                  alt="Graphical Ephemeris - Visual planetary position chart"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
            <FeatureContentReversed>
              <FeatureBadge>
                <ChartIcon />
                Ephemeris & Tables
              </FeatureBadge>
              <SectionTitle>
                Visual <GradientText>Planetary Ephemeris</GradientText>
              </SectionTitle>
              <SectionDescription>
                Explore planetary positions with both graphical and tabular views. 
                Track planetary movements across the zodiac over any time period.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Graphical ephemeris chart with planetary tracks</FeatureListItem>
                <FeatureListItem>Detailed position tables by date</FeatureListItem>
                <FeatureListItem>Retrograde periods clearly highlighted</FeatureListItem>
                <FeatureListItem>Export data for research and reference</FeatureListItem>
              </FeatureList>
            </FeatureContentReversed>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainerAlt>

      {/* Position Tables Section */}
      <SectionContainer
        ref={positionRef}
        data-section={SECTIONS.POSITION_TABLES}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureContent>
              <FeatureBadge>
                <ChartIcon />
                Position Tables
              </FeatureBadge>
              <SectionTitle>
                Detailed <GradientText>Position Data</GradientText>
              </SectionTitle>
              <SectionDescription>
                Access precise planetary positions for any date range. Perfect for research, 
                mundane astrology, and verifying chart calculations.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Daily positions for all planets</FeatureListItem>
                <FeatureListItem>Degree, minutes, and seconds precision</FeatureListItem>
                <FeatureListItem>Moon phases and void-of-course times</FeatureListItem>
                <FeatureListItem>Ingress dates and sign changes</FeatureListItem>
              </FeatureList>
            </FeatureContent>
            <FeatureImageWrapper>
              <FeatureGlow $position="right" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-list.webp" 
                  alt="Ephemeris Table - Daily planetary positions"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainer>

      {/* Data Management Section */}
      <SectionContainerAlt
        ref={dataMgmtRef}
        data-section={SECTIONS.DATA_MANAGEMENT}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureImageWrapper>
              <FeatureGlowPurple $position="left" />
              <FeatureImageCard>
                <FeatureImage 
                  src="https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp" 
                  alt="Data Management - Subject database"
                />
                <FeatureImageOverlay className="feature-overlay">
                  <ZoomHint>
                    <ZoomInIcon />
                    Zoom
                  </ZoomHint>
                </FeatureImageOverlay>
              </FeatureImageCard>
            </FeatureImageWrapper>
            <FeatureContentReversed>
              <FeatureBadge>
                <ChartIcon />
                Data Management
              </FeatureBadge>
              <SectionTitle>
                Organize Your <GradientText>Client Database</GradientText>
              </SectionTitle>
              <SectionDescription>
                Store unlimited profiles with complete birth data, notes, and tags. 
                Quick access to any client's charts and readings in seconds.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Complete birth data with location lookup</FeatureListItem>
                <FeatureListItem>Rodden rating for data accuracy</FeatureListItem>
                <FeatureListItem>Tags and notes for organization</FeatureListItem>
                <FeatureListItem>Quick search and filter</FeatureListItem>
              </FeatureList>
            </FeatureContentReversed>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainerAlt>

      {/* AI Interpretations Section */}
      <SectionContainer
        ref={aiRef}
        data-section={SECTIONS.AI_INTERPRETATIONS}
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            <FeatureContent>
              <FeatureBadge>
                <SparklesIcon />
                AI Interpretations
              </FeatureBadge>
              <SectionTitle>
                Instant Insights, <GradientText>Powered by AI</GradientText>
              </SectionTitle>
              <SectionDescription>
                Get intelligent, context-aware interpretations for any chart. 
                Rich formatted text with emojis, headings, and structured analysis delivered in real-time.
              </SectionDescription>
              <FeatureList>
                <FeatureListItem>Full chart analysis with key themes</FeatureListItem>
                <FeatureListItem>Structured sections with headings</FeatureListItem>
                <FeatureListItem>Real-time streaming text generation</FeatureListItem>
                <FeatureListItem>Works with all chart types</FeatureListItem>
              </FeatureList>
            </FeatureContent>
            <FeatureImageWrapper>
              <FeatureGlow $position="right" />
              <FeatureImageCard style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  <br />
                  <span style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--text-primary)', animation: 'pulse 1s ease-in-out infinite' }}></span>
                </div>
              </FeatureImageCard>
            </FeatureImageWrapper>
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainer>

      {/* Pricing Section */}
      <PricingSection
        ref={pricingRef}
        data-section={SECTIONS.PRICING}
      >
        <MaxWidthContainer>
          <PricingHeader>
            <PricingTitle>
              Simple, Transparent <GradientText>Pricing</GradientText>
            </PricingTitle>
            <PricingSubtitle>
              One plan, everything included. No hidden fees.
            </PricingSubtitle>
          </PricingHeader>
          
          <PricingCard>
            <PricingBadge>
              <RocketIcon />
              Launch Special
            </PricingBadge>
            
            <PricingIcon>
              <SparklesIcon />
            </PricingIcon>
            
            <PricingPlanName>Pro Plan</PricingPlanName>
            <PricingPlanDesc>Full access to JSTAR</PricingPlanDesc>
            
            <PricingAmount>
              <PricingOriginalPrice>$10</PricingOriginalPrice>
              <PricingCurrentPrice>$5</PricingCurrentPrice>
            </PricingAmount>
            <PricingPeriod>per month</PricingPeriod>
            <PricingDiscount>50% off — Launch price!</PricingDiscount>
            
            <PricingFeatures>
              <PricingFeatureItem>
                <CheckIcon />
                Unlimited birth charts
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckIcon />
                All chart types (Transit, Synastry, Composite, Returns)
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckIcon />
                AI-powered interpretations
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckIcon />
                PDF export
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckIcon />
                Timeline analysis
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckIcon />
                Priority support
              </PricingFeatureItem>
            </PricingFeatures>
            
            <PricingButton onClick={handleOpenAuthModal}>
              Get Started
              <ArrowRightIcon />
            </PricingButton>
            <PricingNote>15-day free trial • Cancel anytime</PricingNote>
          </PricingCard>
        </MaxWidthContainer>
      </PricingSection>

      {/* Get Started Steps Section */}
      <StepsSection
        ref={getStartedRef}
        data-section={SECTIONS.GET_STARTED}
      >
        <MaxWidthContainer>
          <StepsHeader>
            <PricingTitle>
              Get Started in <GradientText>Three Simple Steps</GradientText>
            </PricingTitle>
          </StepsHeader>
          
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Create Your Account</StepTitle>
              <StepDescription>
                Sign up in seconds and set up your astrology preferences.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Add Your Data</StepTitle>
              <StepDescription>
                Enter birth data for yourself, friends, or clients.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Generate & Interpret</StepTitle>
              <StepDescription>
                Create charts, explore data, and get AI-powered insights.
              </StepDescription>
            </StepCard>
          </StepsGrid>
        </MaxWidthContainer>
      </StepsSection>

      {/* Open Source Section */}
      <OpenSourceSection
        ref={openSourceRef}
        data-section={SECTIONS.OPEN_SOURCE}
      >
        <MaxWidthContainer>
          <OpenSourceContent>
            <OpenSourceBadge>
              <CodeIcon />
              100% Open Source • AGPLv3 License
            </OpenSourceBadge>
            
            <OpenSourceTitle>
              Professional software with an <GradientText>Open Source Heart</GradientText>
            </OpenSourceTitle>
            
            <OpenSourceDescription>
              <strong>JSTAR is fully open source</strong>, licensed under the AGPLv3. 
              Built with industry-standard astrology engines used by thousands of developers. 
              We believe in transparency and the spirit of libre software.
            </OpenSourceDescription>
            
            <OpenSourceCards>
              <OpenSourceCard>
                <CodeIcon />
                <OpenSourceCardTitle>Transparency</OpenSourceCardTitle>
                <OpenSourceCardDesc>
                  Our core calculation engine is open for inspection. You know exactly how your charts are calculated.
                </OpenSourceCardDesc>
              </OpenSourceCard>
              
              <OpenSourceCard>
                <HeartIcon />
                <OpenSourceCardTitle>Sustainability</OpenSourceCardTitle>
                <OpenSourceCardDesc>
                  Your subscription directly funds the development of free software tools for the entire astrology community.
                </OpenSourceCardDesc>
              </OpenSourceCard>
              
              <OpenSourceCard>
                <GithubIcon />
                <OpenSourceCardTitle>Community</OpenSourceCardTitle>
                <OpenSourceCardDesc>
                  Join a project that values collaboration. Contribute code, report issues, or suggest features on GitHub.
                </OpenSourceCardDesc>
              </OpenSourceCard>
            </OpenSourceCards>
            
            <OpenSourceButtons>
              <OpenSourceButton 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="primary"
              >
                <GithubIcon />
                JSCLUB on GitHub
              </OpenSourceButton>
            </OpenSourceButtons>
          </OpenSourceContent>
        </MaxWidthContainer>
      </OpenSourceSection>

      {/* CTA Section */}
      <CTASection
        ref={contactRef}
        data-section={SECTIONS.CONTACT}
      >
        <MaxWidthContainer>
          <CTAContent>
            <CTATitle>
              Ready to Discover <GradientText>Your Cosmic Identity?</GradientText>
            </CTATitle>
            
            <CTADescription>
              Join thousands of astrology enthusiasts using JSTAR to calculate faster 
              and communicate more clearly. Your journey into the stars starts here.
            </CTADescription>
            
            <CTAButton onClick={handleStarButtonClick}>
              Start Your Free Trial
              <ArrowRightIcon />
            </CTAButton>
            
            <CTANote>No credit card required • Free forever plan available</CTANote>
          </CTAContent>
        </MaxWidthContainer>
      </CTASection>

      {/* Footer */}
      <FooterWrapper>
        <FooterContent>
          <FooterBrand>
            <FooterLogo>JSTAR</FooterLogo>
            <FooterCopyright>
              <span>© 2026 JSTAR</span>
              <span>License: <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer">AGPLv3</a></span>
            </FooterCopyright>
          </FooterBrand>
          
          <FooterLinks>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Accessibility</FooterLink>
            <FooterLink href="#">Cookies</FooterLink>
          </FooterLinks>
        </FooterContent>
      </FooterWrapper>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} onLoginSuccess={handleLoginSuccess} />

      {/* Change Password Modal */}
      <PasswordModalOverlay 
        $open={isChangePasswordOpen} 
        onClick={(e) => {
          if (e.target === e.currentTarget) handleCloseChangePassword();
        }}
      >
        <PasswordModalContainer $open={isChangePasswordOpen}>
          <PasswordModalHeader>
            <PasswordModalTitle>Change Password</PasswordModalTitle>
            <PasswordModalClose onClick={handleCloseChangePassword}>×</PasswordModalClose>
          </PasswordModalHeader>
          
          {passwordSuccess ? (
            <PasswordSuccessMessage>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Password changed successfully!
            </PasswordSuccessMessage>
          ) : (
            <PasswordForm onSubmit={handlePasswordSubmit}>
              <PasswordInputGroup>
                <PasswordInputLabel>Current Password</PasswordInputLabel>
                <PasswordInput
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordFormChange}
                  autoComplete="current-password"
                />
              </PasswordInputGroup>
              
              <PasswordInputGroup>
                <PasswordInputLabel>New Password</PasswordInputLabel>
                <PasswordInput
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  autoComplete="new-password"
                />
              </PasswordInputGroup>
              
              <PasswordInputGroup>
                <PasswordInputLabel>Confirm New Password</PasswordInputLabel>
                <PasswordInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  autoComplete="new-password"
                />
              </PasswordInputGroup>
              
              {passwordError && (
                <PasswordErrorMessage>{passwordError}</PasswordErrorMessage>
              )}
              
              <PasswordSubmitButton type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </PasswordSubmitButton>
            </PasswordForm>
          )}
        </PasswordModalContainer>
      </PasswordModalOverlay>
    </Wrapper>
  );
}
