// LandingPage Component - Main landing page with hero section and navigation

import { useRef, useState } from "react";
import { ZodiacCinematic } from "./ZodiacCinematic";
import { SpaceButton } from "./SpaceButton";
import { Background } from "./Background";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { SECTIONS } from "../constants";
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

export default function LandingPage() {
  // Section refs
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLElement>(null);
  const forecastRef = useRef<HTMLElement>(null);

  // UI state
  const [isOpen, setIsOpen] = useState(false);

  // Custom hooks for scroll and section tracking
  const { isScrolled } = useScrollPosition();
  const { activeSection } = useSectionObserver();

  // Smooth scroll to section
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <Wrapper>
      {/* Reusable Background Component */}
      <Background showShootingStars={activeSection === SECTIONS.HOME} />

      {/* Fixed Navigation Bar */}
      <DynamicIsland $scrolled={isScrolled} $open={isOpen}>
        <MobileToggle onClick={() => setIsOpen(!isOpen)}>☰</MobileToggle>

        <NavContainer $open={isOpen}>
          <NavItem
            $active={activeSection === SECTIONS.HOME}
            onClick={() => scrollTo(heroRef)}
          >
            Home
          </NavItem>
          <NavItem
            $active={activeSection === SECTIONS.ABOUT}
            onClick={() => scrollTo(aboutRef)}
          >
            About
          </NavItem>
          <NavItem
            $active={activeSection === SECTIONS.CHART}
            onClick={() => scrollTo(chartRef)}
          >
            Chart
          </NavItem>
          <NavItem
            $active={activeSection === SECTIONS.FORECAST}
            onClick={() => scrollTo(forecastRef)}
          >
            Forecast
          </NavItem>
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
              <SpaceButton />
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
    </Wrapper>
  );
}

