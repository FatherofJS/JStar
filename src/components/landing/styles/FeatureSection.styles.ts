// FeatureSection Component Styles

import styled from "styled-components";

// =============================================================================
// FEATURE SECTION STYLES
// =============================================================================

// Feature Badge
export const FeatureBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  gap: 4px;
  margin-bottom: 16px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

// Section Container
export const SectionContainer = styled.section`
  position: relative;
  z-index: 10;
  padding: 80px 16px;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

export const SectionContainerAlt = styled(SectionContainer)`
  background: var(--bg-secondary);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(6px);
`;

// Max Width Container
export const MaxWidthContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

// Grid Layout
export const GridTwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// Feature Content (Left)
export const FeatureContent = styled.div`
  @media (max-width: 1000px) {
    order: 2;
  }
`;

// Feature Content Reversed (Right)
export const FeatureContentReversed = styled.div`
  @media (max-width: 1000px) {
    order: 2;
  }
`;

// Feature Image Container
export const FeatureImageWrapper = styled.div`
  position: relative;
  
  @media (max-width: 1000px) {
    order: 1;
  }
`;

// Feature Image Card
export const FeatureImageCard = styled.div`
  position: relative;
  cursor: zoom-in;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:hover .feature-overlay {
    opacity: 1;
  }
`;

export const FeatureImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.7s ease;
  
  ${FeatureImageCard}:hover & {
    transform: scale(1.05);
  }
`;

export const FeatureImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: all 0.3s ease;
`;

export const ZoomHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// Glow Effects
export const FeatureGlow = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  inset: -20px;
  z-index: -10;
  border-radius: 2rem;
  opacity: 0.5;
  background: linear-gradient(
    ${({ $position }) => $position === 'left' 
      ? 'to right, rgba(120, 140, 255, 0.2), transparent' 
      : 'to left, rgba(120, 140, 255, 0.2), transparent'}
  );
  filter: blur(24px);
  
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const FeatureGlowPurple = styled(FeatureGlow)`
  background: linear-gradient(
    ${({ $position }) => $position === 'left' 
      ? 'to right, rgba(168, 85, 247, 0.2), transparent' 
      : 'to left, rgba(168, 85, 247, 0.2), transparent'}
  );
`;

// Section Title
export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.2;
  
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

// Section Description
export const SectionDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 540px;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// Feature List
export const FeatureList = styled.ul`
  list-style: disc;
  list-style-position: outside;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeatureListItem = styled.li`
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
`;

