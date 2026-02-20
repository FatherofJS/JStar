// LandingPage Component - Main landing page with hero section and navigation

import { useRef, useState, useCallback, memo } from "react";
import { ZodiacCinematic } from "./ZodiacCinematic";
import { SpaceButton } from "./SpaceButton";
import { Background } from "./Background";
import AuthModal from "./AuthModal";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { SECTIONS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";
import ThemeSwitch from "./ThemeSwitch";
import {
  Wrapper,
  DynamicIsland,
  MobileToggle,
  NavContainer,
  NavItem,
  HeroLight,
  SectionHero,
  HeroLayout,
  Content,
  DividerGlow,
  HeroRight,
  Section,
  Actions,
  GlassBox,
} from "../styles/LandingPage.styles";

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

  // Custom hooks for scroll and section tracking
  const { isScrolled } = useScrollPosition();
  const { activeSection } = useSectionObserver();
  
  // Theme context
  const { theme, toggleTheme } = useTheme();

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

  return (
    <Wrapper>
      {/* Reusable Background Component */}
      <Background showShootingStars={activeSection === SECTIONS.HOME} />

      {/* Fixed Navigation Bar */}
      <DynamicIsland $scrolled={isScrolled} $open={isOpen}>
        <MobileToggle onClick={toggleMenu}>☰</MobileToggle>

        <NavContainer $open={isOpen}>
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
          <NavItemMemo $active={false}>
            <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />
          </NavItemMemo>
        </NavContainer>
      </DynamicIsland>

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
              <SpaceButton onClick={handleOpenAuthModal} />
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
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </Wrapper>
  );
}
