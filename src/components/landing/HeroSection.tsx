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
} from "./styles/HeroSection.styles.ts";

function HeroSection() {
  console.count('🟡 HeroSection render');
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const t = landingContent;



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
    </HeroSectionWrapper>
  );
}

export default memo(HeroSection);
