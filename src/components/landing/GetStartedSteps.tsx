// GetStartedSteps Component - Three simple steps to get started

import { memo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  StepsSectionWrapper,
  StepsHeader,
  PricingTitle,
  GradientText,
  StepsGrid,
  StepCard,
  StepNumber,
  StepTitle,
  StepDescription,
  MaxWidthContainer,
} from "./styles/GetStartedSteps.styles.ts";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface GetStartedStepsProps {
  steps?: Step[];
}

function GetStartedSteps({ 
  steps
}: GetStartedStepsProps) {
  const { t } = useLanguage();
  
  const defaultSteps: Step[] = [
    {
      number: 1,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      number: 2,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      number: 3,
      title: t.step3Title,
      description: t.step3Desc,
    },
  ];

  const stepsToUse = steps || defaultSteps;

  return (
    <StepsSectionWrapper data-section="get-started" className="zoom-section">
      <MaxWidthContainer>
        <StepsHeader>
          <PricingTitle>
            {t.getStartedTitle.split(' ').map((word, i) => 
              i === t.getStartedTitle.split(' ').length - 1 ? (
                <GradientText key={i}>{word}</GradientText>
              ) : (
                `${word} `
              )
            )}
          </PricingTitle>
        </StepsHeader>
        
        <StepsGrid>
          {stepsToUse.map((step) => (
            <StepCard key={step.number}>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepCard>
          ))}
        </StepsGrid>
      </MaxWidthContainer>
    </StepsSectionWrapper>
  );
}

export default memo(GetStartedSteps);

