// Background styled components and keyframes
// Beautiful cosmic background with vibrant nebula for dark mode

import styled, { keyframes } from "styled-components";

// =============================================================================
// ANIMATIONS - Beautiful and performant
// =============================================================================

const slowDrift = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-2%, -1%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const nebulaPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
`;

const shoot = keyframes`
  0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translate(-400px, 400px) rotate(-45deg); opacity: 0; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
`;

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

export const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;
  height: 100%;
  width: 100%;
  
  /* Dark mode - Rich cosmic gradient with galaxy colors */
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0f1a2e 60%, #0a0a1a 100%);
  
  [data-theme="light"] & {
    /* Light mode - Clean, modern gradient like astrologerstudio.com */
    background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
  }
`;

// =============================================================================
// STAR LAYER - Beautiful starfield for dark mode
// =============================================================================

const generateStarPositions = (count: number): string => {
  const positions: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    positions.push(`${x}% ${y}% #fff`);
  }
  return positions.join(', ');
};

const starsPositions = generateStarPositions(80);

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
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const StarsLayer2 = styled.div`
  display: none;
`;

export const StarsLayer3 = styled.div`
  display: none;
`;

// =============================================================================
// NEBULA LAYERS - Beautiful colorful nebula for dark mode
// Note: The actual nebula layers are rendered in Background.tsx using inline styles
// for better animation control
// =============================================================================

export const NebulaLayer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

export const AuroraLayer = styled.div`
  display: none;
`;

// =============================================================================
// STARFIELD - Clean static stars
// =============================================================================

export const StarField = styled.div`
  position: absolute;
  inset: 0;
  will-change: opacity;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(2px 2px at 10% 20%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
      radial-gradient(2px 2px at 25% 40%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
      radial-gradient(2px 2px at 40% 15%, rgba(200, 220, 255, 0.85) 0%, transparent 100%),
      radial-gradient(2px 2px at 55% 55%, rgba(255, 255, 255, 0.75) 0%, transparent 100%),
      radial-gradient(2px 2px at 70% 30%, rgba(255, 250, 240, 0.8) 0%, transparent 100%),
      radial-gradient(2px 2px at 85% 70%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 15% 60%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 35% 80%, rgba(200, 210, 255, 0.65) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 60% 85%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 80% 45%, rgba(255, 250, 245, 0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 20% 35%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
      radial-gradient(1px 1px at 45% 25%, rgba(200, 220, 255, 0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 65% 65%, rgba(255, 255, 255, 0.65) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 10%, rgba(255, 250, 240, 0.7) 0%, transparent 100%);
    background-size: 100% 100%;
    animation: ${starTwinkle} 6s ease-in-out infinite;
  }
  
  [data-theme="light"] & {
    display: none;
  }
`;

// =============================================================================
// COSMIC GLOW - Beautiful center glow
// =============================================================================

export const CosmicGlow = styled.div`
  position: absolute;
  inset: -30%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(147, 51, 234, 0.12) 0%,
    rgba(59, 130, 246, 0.08) 30%,
    rgba(236, 72, 153, 0.05) 50%,
    transparent 70%
  );
  animation: ${glowPulse} 10s ease-in-out infinite;
  will-change: opacity;
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const GrainOverlay = styled.div`
  display: none;
`;

// =============================================================================
// SHOOTING STARS
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
  height: 1.5px;
  background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0.8), transparent);
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  animation: ${shoot} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  will-change: transform, opacity;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
  
  [data-theme="light"] & {
    display: none;
  }
`;

// Export keyframes for external use if needed
export { slowDrift, nebulaPulse, starTwinkle, shoot, glowPulse };

