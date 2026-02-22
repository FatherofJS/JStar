// CTASection Component - Final Call to Action

import { memo } from "react";
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
  return (
    <CTASectionWrapper data-section="contact" className="zoom-section">
      <MaxWidthContainer>
        <CTAContent>
          <CTATitle>
            Ready to Discover <GradientText>Your Cosmic Identity?</GradientText>
          </CTATitle>
          
          <CTADescription>
            Join thousands of astrology enthusiasts using JSTAR to calculate faster 
            and communicate more clearly. Your journey into the stars starts here.
          </CTADescription>
          
          <CTAButton onClick={onOpenAuthModal}>
            Start Your Free Trial
            <ArrowRightIcon />
          </CTAButton>
          
          <CTANote>No credit card required • Free forever plan available</CTANote>
        </CTAContent>
      </MaxWidthContainer>
    </CTASectionWrapper>
  );
}

export default memo(CTASection);

