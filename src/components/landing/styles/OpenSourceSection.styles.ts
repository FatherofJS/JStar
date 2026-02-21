// OpenSourceSection Component Styles

import styled from "styled-components";

// =============================================================================
// OPEN SOURCE SECTION STYLES
// =============================================================================

export const OpenSourceSectionWrapper = styled.section`
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

export const OpenSourceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const OpenSourceBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.3);
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  font-size: 14px;
  font-weight: 500;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const OpenSourceTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const OpenSourceDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 700px;
  
  strong {
    color: var(--text-primary);
  }
`;

export const OpenSourceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
  max-width: 900px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const OpenSourceCard = styled.div`
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--bg-secondary);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--hero-gradient-start);
    margin-bottom: 16px;
  }
`;

export const OpenSourceCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const OpenSourceCardDesc = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
`;

export const OpenSourceButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const OpenSourceButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &.primary {
    background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(120, 140, 255, 0.4);
    }
  }
  
  &.secondary {
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-primary);
    
    &:hover {
      background: var(--bg-secondary);
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

