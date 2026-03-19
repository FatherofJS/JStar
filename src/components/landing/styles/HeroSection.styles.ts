// HeroSection Component Styles

import styled, { keyframes } from "styled-components";

// =============================================================================
// ANIMATIONS
// =============================================================================

const zoomIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0.5; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
`;

// =============================================================================
// HERO SECTION STYLES
// =============================================================================

export const HeroSectionWrapper = styled.section`
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 80px 0;

  @media (max-width: 768px) {
    min-height: 500px;
    padding: 60px 0;
  }

  @media (max-width: 480px) {
    min-height: 450px;
    padding: 40px 0;
  }
`;

export const HeroWrapper = styled.div`
  min-height: 400vh;
  color: var(--text-inverse);
  overflow-x: hidden;
  position: relative;

  .zoom-in {
    animation: ${zoomIn} 0.8s ease forwards;
  }
  .zoom-out {
    animation: ${zoomOut} 0.6s ease forwards;
  }
`;

export const HeroLight = styled.div`
  position: absolute;
  inset: -20%;
  pointer-events: none;

  background: radial-gradient(
      circle at 25% 30%,
      rgba(120, 140, 255, 0.25),
      transparent 40%
    ),
    radial-gradient(
      circle at 75% 40%,
      rgba(180, 120, 255, 0.18),
      transparent 45%
    ),
    radial-gradient(
      circle at 50% 80%,
      rgba(0, 200, 255, 0.12),
      transparent 50%
    );
  filter: blur(56px);
  opacity: 0.55;
  z-index: -1;
`;

export const HeroLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 520px;
  align-items: center;
  padding: 0 6vw;
  gap: 120px;
  position: relative;
  z-index: 2;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
    padding: 0 4vw;
  }

  @media (max-width: 480px) {
    gap: 24px;
    padding: 0 20px;
  }
`;

export const Content = styled.div`
  max-width: 620px;

  @media (max-width: 1000px) {
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  font-size: clamp(36px, 6vw, 84px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -1px;

  span {
    background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
    text-shadow: 0 0 30px var(--text-shadow);
  }

  @media (max-width: 480px) {
    font-size: clamp(32px, 8vw, 52px);
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Description = styled.p`
  margin-top: 24px;
  font-size: clamp(14px, 2vw, 17px);
  line-height: 1.6;
  opacity: 0.75;
  max-width: 520px;
  color: var(--text-secondary);
  
  @media (max-width: 1000px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const DividerGlow = styled.div`
  width: 120px;
  height: 2px;
  margin-top: 28px;

  background: linear-gradient(90deg, transparent, var(--divider-glow), transparent);
  filter: blur(0.6px);
  opacity: 0.7;

  @media (max-width: 1000px) {
    margin: 28px auto 0;
  }
`;

export const Actions = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const HeroRight = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateY(-10px);

  @media (max-width: 1000px) {
    transform: none;
    order: -1;
  }
`;

export const ScrollButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${bounce} 2s ease-in-out infinite;
  
  &:hover {
    border-color: var(--text-primary);
    background: var(--bg-secondary);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--text-secondary);
  }
  
  @media (min-width: 1024px) {
    bottom: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

