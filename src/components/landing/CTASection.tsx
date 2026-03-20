// CTASection Component - Final Call to Action

import { memo } from "react";
import { landingContent } from "../../content/landingContent";
import {
  CTASectionWrapper,
  CTAContent,
  CTATitle,
  GradientText,
  CTADescription,
  CTAButton,
  CTANote,
  MaxWidthContainer,
} from "./styles/CTASection.styles.ts";

// SVG Icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface CTASectionProps {
  onGetStarted?: () => void;
}

function CTASection({ onGetStarted }: CTASectionProps) {
  const t = landingContent;

  return (
    <CTASectionWrapper data-section="contact" className="zoom-section">
      <MaxWidthContainer>
        <CTAContent>
          <CTATitle>
            {t.ctaTitle.split(" ").map((word, index, words) =>
              index === words.length - 1 ? (
                <GradientText key={index}>{word}</GradientText>
              ) : (
                `${word} `
              )
            )}
          </CTATitle>

          <CTADescription>{t.ctaDescription}</CTADescription>

          <CTAButton onClick={onGetStarted}>
            {t.ctaButton}
            <ArrowRightIcon />
          </CTAButton>

          <CTANote>{t.ctaNote}</CTANote>
        </CTAContent>
      </MaxWidthContainer>
    </CTASectionWrapper>
  );
}

export default memo(CTASection);
