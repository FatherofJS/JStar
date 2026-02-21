// LandingPage Component - Main landing page with hero section and navigation

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
  Section,
  Actions,
  GlassBox,
  // New user menu components
  UserMenuWrapper,
  UserInfoButton,
  UserMenuDropdown,
  UserMenuSection,
  UserMenuLabel,
  UserMenuEmail,
  UserMenuName,
  UserMenuItem,
  UserMenuDivider,
  // Password modal components
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

export default function LandingPage() {
  // Section refs
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLElement>(null);
  const forecastRef = useRef<HTMLElement>(null);

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
              $active={activeSection === SECTIONS.ABOUT}
              onClick={() => scrollTo(aboutRef)}
            >
              About
            </NavItemMemo>
            <NavItemMemo
              $active={activeSection === SECTIONS.CHART}
              onClick={() => scrollTo(chartRef)}
            >
              Chart
            </NavItemMemo>
            <NavItemMemo
              $active={activeSection === SECTIONS.FORECAST}
              onClick={() => scrollTo(forecastRef)}
            >
              Forecast
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
          $active={activeSection === SECTIONS.ABOUT}
          onClick={() => scrollTo(aboutRef)}
        >
          About
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.CHART}
          onClick={() => scrollTo(chartRef)}
        >
          Chart
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.FORECAST}
          onClick={() => scrollTo(forecastRef)}
        >
          Forecast
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
              CHOOSE YOUR DAY OF BIRTH TO SEE YOUR PERSONALIZED ASTROLOGY CHART
              AND INSIGHTS.
            </p>

            <DividerGlow />

            <Actions>
              <StarPlayButton onClick={handleStarButtonClick} />
              <SpaceStyleButton>
                VIEW CHART
              </SpaceStyleButton>
            </Actions>
          </Content>

          <HeroRight>
            <ZodiacCinematic />
          </HeroRight>
        </HeroLayout>
      </SectionHero>

      {/* About Section */}
      <Section
        ref={aboutRef}
        data-section={SECTIONS.ABOUT}
        className="zoom-section"
      >
        <GlassBox>
          <h2>About JSTAR</h2>
          <p>
            Discover your cosmic identity through personalized birth charts and
            AI-powered astrology.
          </p>
        </GlassBox>
      </Section>

      {/* Chart Section */}
      <Section
        ref={chartRef}
        data-section={SECTIONS.CHART}
        className="zoom-section"
      >
        <GlassBox>
          <h2>Birth Chart Analysis</h2>
          <p>Explore your planetary alignment and destiny path.</p>
        </GlassBox>
      </Section>

      {/* Forecast Section */}
      <Section
        ref={forecastRef}
        data-section={SECTIONS.FORECAST}
        className="zoom-section"
      >
        <GlassBox>
          <h2>Cosmic Forecast</h2>
          <p>Get personalized astrological predictions for your future.</p>
        </GlassBox>
      </Section>

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
