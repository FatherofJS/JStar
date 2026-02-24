// PricingSection Component - Simple, Transparent Pricing

import { memo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  PricingSectionWrapper,
  PricingHeader,
  PricingTitle,
  GradientText,
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
  MaxWidthContainer,
} from "./styles/PricingSection.styles.ts";

// SVG Icons
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

interface PricingSectionProps {
  onOpenAuthModal: () => void;
}

function PricingSection({ onOpenAuthModal }: PricingSectionProps) {
  const { t } = useLanguage();
  
  const features = [
    t.pricingFeature1,
    t.pricingFeature2,
    t.pricingFeature3,
    t.pricingFeature4,
    t.pricingFeature5,
    t.pricingFeature6,
  ];

  return (
    <PricingSectionWrapper data-section="pricing" className="zoom-section">
      <MaxWidthContainer>
        <PricingHeader>
          <PricingTitle>
            {t.pricingTitle.split(' ').map((word, i) => 
              i === t.pricingTitle.split(' ').length - 1 ? (
                <GradientText key={i}>{word}</GradientText>
              ) : (
                `${word} `
              )
            )}
          </PricingTitle>
          <PricingSubtitle>
            {t.pricingSubtitle}
          </PricingSubtitle>
        </PricingHeader>
        
        <PricingCard>
          <PricingBadge>
            <RocketIcon />
            {t.launchSpecial}
          </PricingBadge>
          
          <PricingIcon>
            <SparklesIcon />
          </PricingIcon>
          
          <PricingPlanName>{t.proPlan}</PricingPlanName>
          <PricingPlanDesc>{t.proPlanDesc}</PricingPlanDesc>
          
          <PricingAmount>
            <PricingOriginalPrice>$10</PricingOriginalPrice>
            <PricingCurrentPrice>$5</PricingCurrentPrice>
          </PricingAmount>
          <PricingPeriod>{t.perMonth}</PricingPeriod>
          <PricingDiscount>{t.launchDiscount}</PricingDiscount>
          
          <PricingFeatures>
            {features.map((feature, index) => (
              <PricingFeatureItem key={index}>
                <CheckIcon />
                {feature}
              </PricingFeatureItem>
            ))}
          </PricingFeatures>
          
          <PricingButton onClick={onOpenAuthModal}>
            {t.getStartedBtn}
            <ArrowRightIcon />
          </PricingButton>
          <PricingNote>{t.pricingNote}</PricingNote>
        </PricingCard>
      </MaxWidthContainer>
    </PricingSectionWrapper>
  );
}

export default memo(PricingSection);

