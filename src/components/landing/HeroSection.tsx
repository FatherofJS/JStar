import { useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ZodiacCinematic } from "../../components/ui/ZodiacCinematic";
import { landingContent } from "../../data/landingData";
import { StarPlayButton } from "../ui/button/StarPlayButton";
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

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const t = landingContent;

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

  const handleGetStarted = useCallback(() => {
    navigate("/star-chart");
  }, [navigate]);

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
            <span>{t.heroTitle}</span>
            <br /> {t.heroSubtitle}
          </Title>

          <Description>
            {t.heroDescription}
          </Description>

          <DividerGlow />

          <Actions>
            <StarPlayButton onClick={handleGetStarted}>
              {t.getStarted}
            </StarPlayButton>
          </Actions>
        </Content>

        <HeroRight>
          <ZodiacCinematic />
        </HeroRight>
      </HeroLayout>

      <ScrollButton
        onClick={() => scrollTo(SECTIONS.CHART_DATA)}
        aria-label={t.scrollDown}
      >
        <ChevronDownIcon />
      </ScrollButton>
    </HeroSectionWrapper>
  );
}

export default memo(HeroSection);
