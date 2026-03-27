import styled from "styled-components";


export const StepsSectionWrapper = styled.section`
  position: relative;
  z-index: 10;
  padding: 80px 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }

  @media (max-width: 1280px) {
    /* backdrop-filter: none; */
    background: rgba(255, 255, 255, 0.02);
  }

  [data-performance-mode="reduced"] & {
    /* backdrop-filter: none; */
    background: rgba(255, 255, 255, 0.015);
  }
`;

export const MaxWidthContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

export const StepsHeader = styled.div`
  margin-bottom: 48px;
`;

export const PricingTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const StepCard = styled.div`
  position: relative;
  text-align: center;
`;

export const StepNumber = styled.div`
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

export const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const StepDescription = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
`;

