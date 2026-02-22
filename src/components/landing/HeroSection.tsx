// HeroSection Component - Hero chính với ZodiacCinematic, tiêu đề, mô tả, buttons

import { useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ZodiacCinematic } from "../../components/ZodiacCinematic";
import { StarPlayButton } from "../button/StarPlayButton";
import { SpaceStyleButton } from "../button/SpaceStyleButton";
import { useAuth } from "../../contexts/AuthContext";
import { SECTIONS } from "../../constants";
import {
  HeroSectionWrapper,
  HeroLight,
  HeroLayout,
  Content,
  Title,
  Description,
  DividerGlow,
  Actions,
  HeroRight,
  ScrollButton,
} from "./styles/HeroSection.styles.ts";

// SVG Icons
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface HeroSectionProps {
  onNavigateToStarChart: () => void;
}

function HeroSection({ onNavigateToStarChart }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const scrollTo = useCallback((sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleStarButtonClick = useCallback(() => {
    if (isLoggedIn) {
      navigate("/star-chart");
    } else {
      onNavigateToStarChart();
    }
  }, [isLoggedIn, navigate, onNavigateToStarChart]);

  return (
    <HeroSectionWrapper
      ref={heroRef}
      data-section={SECTIONS.HOME}
      className="zoom-section zoom-in"
    >
      <HeroLight />

      <HeroLayout>
        <Content>
          <Title>
            <span>JSTAR</span>
            <br /> KNOW YOUR STAR
          </Title>

          <Description>
            Professional astrology software for accurate natal charts, transits,
            synastry, and AI-powered interpretations. Discover your cosmic
            identity.
          </Description>

          <DividerGlow />

          <Actions>
            <StarPlayButton onClick={handleStarButtonClick} />
            <SpaceStyleButton onClick={() => navigate("/your-star")}>
              SEE YOUR STAR
            </SpaceStyleButton>
          </Actions>
        </Content>

        <HeroRight>
          <ZodiacCinematic />
        </HeroRight>
      </HeroLayout>

      <ScrollButton
        onClick={() => scrollTo(SECTIONS.CHART_DATA)}
        aria-label="Scroll to features"
      >
        <ChevronDownIcon />
      </ScrollButton>
    </HeroSectionWrapper>
  );
}

export default memo(HeroSection);
