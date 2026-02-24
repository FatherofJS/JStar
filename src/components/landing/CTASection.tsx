// CTASection Component - Final Call to Action

import { memo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
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
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

interface CTASectionProps {
  onOpenAuthModal?: () => void;
}

function CTASection({ onOpenAuthModal }: CTASectionProps) {
  const { t } = useLanguage();
  
  return (
    <CTASectionWrapper data-section="contact" className="zoom-section">
      <MaxWidthContainer>
        <CTAContent>
          <CTATitle>
            {t.ctaTitle.split(' ').map((word, i) => {
              const lastWords = ['Cosmic Identity?', 'Vũ trụ của Bạn?', '宇宙のアイデンティティ?'];
              const shouldBeGradient = lastWords.some(w => t.ctaTitle.endsWith(w));
              if (shouldBeGradient && i === t.ctaTitle.split(' ').length - 1) {
                return <GradientText key={i}>{word}</GradientText>;
              }
              return `${word} `;
            })}
          </CTATitle>
          
          <CTADescription>
            {t.ctaDescription}
          </CTADescription>
          
          <CTAButton onClick={onOpenAuthModal}>
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

