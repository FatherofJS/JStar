import styled from "styled-components";


export const CTASectionWrapper = styled.section`
  position: relative;
  z-index: 10;
  padding: 80px 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  
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

export const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const CTADescription = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
`;

export const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  background: #7189ff;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(120, 140, 255, 0.4);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 1280px) {
    /* transition: none; */

    &:hover {
      /* transform: none;
      box-shadow: none; */
    }
  }

  [data-performance-mode="reduced"] & {
    /* transition: none; */

    &:hover {
      /* transform: none;
      box-shadow: none; */
    }
  }
`;

export const CTANote = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
`;

