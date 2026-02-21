// GetStartedSteps Component - Three simple steps to get started

import { memo } from "react";
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
  steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up in seconds and set up your astrology preferences.",
    },
    {
      number: 2,
      title: "Add Your Data",
      description: "Enter birth data for yourself, friends, or clients.",
    },
    {
      number: 3,
      title: "Generate & Interpret",
      description: "Create charts, explore data, and get AI-powered insights.",
    },
  ]
}: GetStartedStepsProps) {
  return (
    <StepsSectionWrapper data-section="get-started">
      <MaxWidthContainer>
        <StepsHeader>
          <PricingTitle>
            Get Started in <GradientText>Three Simple Steps</GradientText>
          </PricingTitle>
        </StepsHeader>
        
        <StepsGrid>
          {steps.map((step) => (
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

