// PricingSection Component Styles

import styled from "styled-components";

// =============================================================================
// PRICING SECTION STYLES
// =============================================================================

export const PricingSectionWrapper = styled.section`
  position: relative;
  z-index: 10;
  padding: 80px 16px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

export const MaxWidthContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

export const PricingHeader = styled.div`
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

export const PricingSubtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

export const PricingCard = styled.div`
  position: relative;
  max-width: 420px;
  margin: 0 auto;
  border-radius: 16px;
  border: 2px solid rgba(120, 140, 255, 0.3);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    margin: 0 16px;
  }
`;

export const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  color: white;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(120, 140, 255, 0.4);
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PricingIcon = styled.div`
  margin: 16px auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(120, 140, 255, 0.1);
  
  svg {
    width: 28px;
    height: 28px;
    color: var(--hero-gradient-start);
  }
`;

export const PricingPlanName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

export const PricingPlanDesc = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
`;

export const PricingAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const PricingOriginalPrice = styled.span`
  font-size: 24px;
  color: var(--text-secondary);
  text-decoration: line-through;
`;

export const PricingCurrentPrice = styled.span`
  font-size: 56px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const PricingPeriod = styled.span`
  font-size: 16px;
  color: var(--text-secondary);
`;

export const PricingDiscount = styled.p`
  font-size: 14px;
  color: var(--hero-gradient-start);
  font-weight: 500;
  margin-bottom: 24px;
`;

export const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

export const PricingFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-primary);
  
  svg {
    width: 20px;
    height: 20px;
    color: var(--hero-gradient-start);
    flex-shrink: 0;
  }
`;

export const PricingButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(120, 140, 255, 0.4);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PricingNote = styled.p`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 16px;
  text-align: center;
`;

