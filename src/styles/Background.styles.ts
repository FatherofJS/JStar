// Background styled components and keyframes
// Optimized for performance - simplified cosmic background effects

import styled, { keyframes } from "styled-components";

// =============================================================================
// ANIMATIONS - Simplified for performance
// =============================================================================

const slowDrift = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-2%, -1%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
`;

const shoot = keyframes`
  0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translate(-500px, 500px) rotate(-45deg); opacity: 0; }
`;

// =============================================================================
// STYLED COMPONENTS - Simplified and optimized
// =============================================================================

export const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;
  height: 100%;
  width: 100%;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  contain: paint;
  
  [data-theme="light"] & {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  }
`;

// =============================================================================
// OPTIMIZED STAR LAYER - Single layer with CSS stars
// =============================================================================

// Generate random star positions at build time - reduced count
const generateStarPositions = (count: number): string => {
  const positions: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    positions.push(`${x}% ${y}% #fff`);
  }
  return positions.join(', ');
};

const starsPositions = generateStarPositions(100);

export const StarsLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  box-shadow: ${starsPositions};
  
  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    box-shadow: ${starsPositions};
  }
`;

export const StarsLayer2 = styled.div`
  display: none;
`;

export const StarsLayer3 = styled.div`
  display: none;
`;

// =============================================================================
// SIMPLIFIED NEBULA - Single gradient layer
// =============================================================================

export const NebulaLayer = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 50%,
    rgba(120, 140, 255, 0.08),
    transparent 50%
  );
  animation: ${slowDrift} 60s ease-in-out infinite;
  will-change: transform;
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const AuroraLayer = styled.div`
  display: none;
`;

export const StarField = styled.div`
  position: absolute;
  inset: 0;
  will-change: opacity;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
      radial-gradient(2px 2px at 40% 70%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
      radial-gradient(2px 2px at 50% 50%, rgba(200, 220, 255, 0.7) 0%, transparent 100%),
      radial-gradient(2px 2px at 60% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
      radial-gradient(2px 2px at 80% 80%, rgba(255, 250, 240, 0.6) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 10% 60%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 70% 40%, rgba(200, 210, 255, 0.5) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 30% 80%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 90% 10%, rgba(255, 250, 245, 0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 25% 25%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 75% 75%, rgba(200, 210, 255, 0.5) 0%, transparent 100%);
    background-size: 100% 100%;
    animation: ${starTwinkle} 6s ease-in-out infinite;
  }
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const CosmicGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(120, 160, 255, 0.06),
    transparent 50%
  );
  will-change: opacity;
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const GrainOverlay = styled.div`
  display: none;
  
  [data-theme="light"] & {
    display: none;
  }
`;

// =============================================================================
// SHOOTING STARS - Simplified
// =============================================================================

interface ShootingStarProps {
  $top: number;
  $left: number;
  $delay: number;
  $duration: number;
}

export const ShootingStar = styled.span<ShootingStarProps>`
  position: absolute;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  animation: ${shoot} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  will-change: transform, opacity;
  
  [data-theme="light"] & {
    display: none;
  }
`;

// Export keyframes for external use if needed
export { slowDrift, starTwinkle, shoot };

