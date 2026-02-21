// Background styled components and keyframes
// Reusable cosmic background effects for all views

import styled, { keyframes } from "styled-components";
import type { CSSProperties } from "styled-components";

// =============================================================================
// ANIMATIONS
// =============================================================================

const nebulaDrift = keyframes`
  0% { transform: translate3d(-4%, -3%, 0) scale(1.1); }
  50% { transform: translate3d(4%, 3%, 0) scale(1.15); }
  100% { transform: translate3d(-4%, -3%, 0) scale(1.1); }
`;

const auroraWave = keyframes`
  0% { opacity:.1; transform: translateY(0); }
  50% { opacity:.2; transform: translateY(-20px); }
  100% { opacity:.1; transform: translateY(0); }
`;

const starTwinkle = keyframes`
  0%,100% { opacity:.15; }
  50% { opacity:.3; }
`;

const grainShift = keyframes`
  0% { transform: translate(0,0); }
  100% { transform: translate(-5%,5%); }
`;

const cosmicPulse = keyframes`
  0%,100% { opacity:.15; }
  50% { opacity:.25; }
`;

const shoot = keyframes`
  0% { transform: translate(0,0) rotate(-45deg); opacity:0; }
  10% { opacity:1; }
  100% { transform: translate(-700px,700px) rotate(-45deg); opacity:0; }
`;

const animStar = keyframes`
  from { transform: translateY(0px); }
  to { transform: translateY(-2000px); }
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
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  
  [data-theme="light"] & {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  }
`;

// =============================================================================
// STAR LAYERS - Scrolling stars effect
// =============================================================================

// Generate random star positions at build time
const generateStarPositions = (count: number): string => {
  const positions: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    positions.push(`${x}px ${y}px #fff`);
  }
  return positions.join(', ');
};

const stars1Positions = generateStarPositions(700);
const stars2Positions = generateStarPositions(200);
const stars3Positions = generateStarPositions(100);

export const StarsLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${stars1Positions};
  animation: ${animStar} 50s linear infinite;
  
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${stars1Positions};
  }
`;

export const StarsLayer2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${stars2Positions};
  animation: ${animStar} 100s linear infinite;
  
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: ${stars2Positions};
  }
`;

export const StarsLayer3 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${stars3Positions};
  animation: ${animStar} 150s linear infinite;
  
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: ${stars3Positions};
  }
`;

export const NebulaLayer = styled.div`
  position: absolute;
  inset: -25%;
  background: radial-gradient(
      circle at 30% 40%,
      rgba(140, 160, 255, 0.12),
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(200, 140, 255, 0.1),
      transparent 65%
    ),
    radial-gradient(
      circle at 50% 20%,
      rgba(0, 200, 255, 0.08),
      transparent 60%
    );
  filter: blur(60px);
  animation: ${nebulaDrift} 120s ease-in-out infinite;
  will-change: transform;
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const AuroraLayer = styled.div`
  position: absolute;
  inset: -10%;
  background: linear-gradient(
    120deg,
    rgba(0, 200, 255, 0.06),
    transparent,
    rgba(140, 80, 255, 0.06)
  );
  filter: blur(40px);
  animation: ${auroraWave} 40s ease-in-out infinite;
  will-change: transform, opacity;
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const StarField = styled.div<{ $scrollY: number }>`
  position: absolute;
  inset: -10%;
  transform: perspective(1000px) rotateX(${({ $scrollY }) => $scrollY * 0.02}deg);
  transform-origin: center bottom;
  transition: transform 0.15s ease-out;
  will-change: transform;

  &:before {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: 
      /* Very bright stars (like Sirius, Canopus) - white/blue-white - larger sizes */
      radial-gradient(4px 4px at 3% 7%, rgba(255, 255, 255, 1) 0%, transparent 100%),
      radial-gradient(4px 4px at 97% 5%, rgba(255, 255, 255, 0.98) 0%, transparent 100%),
      radial-gradient(3.8px 3.8px at 50% 2%, rgba(200, 220, 255, 0.95) 0%, transparent 100%),
      radial-gradient(3.8px 3.8px at 25% 15%, rgba(255, 255, 255, 0.95) 0%, transparent 100%),
      radial-gradient(3.5px 3.5px at 75% 12%, rgba(255, 250, 240, 0.92) 0%, transparent 100%),
      radial-gradient(3.5px 3.5px at 8% 22%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
      radial-gradient(3.5px 3.5px at 92% 18%, rgba(200, 210, 255, 0.9) 0%, transparent 100%),
      radial-gradient(3.2px 3.2px at 42% 8%, rgba(255, 255, 255, 0.92) 0%, transparent 100%),
      radial-gradient(3.2px 3.2px at 15% 35%, rgba(255, 250, 245, 0.88) 0%, transparent 100%),
      radial-gradient(3px 3px at 85% 28%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
      radial-gradient(3px 3px at 55% 18%, rgba(200, 220, 255, 0.88) 0%, transparent 100%),
      radial-gradient(3px 3px at 28% 45%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
      radial-gradient(2.8px 2.8px at 70% 35%, rgba(255, 250, 240, 0.88) 0%, transparent 100%),
      radial-gradient(2.8px 2.8px at 5% 58%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
      radial-gradient(2.8px 2.8px at 95% 42%, rgba(200, 210, 255, 0.85) 0%, transparent 100%),
      radial-gradient(2.6px 2.6px at 38% 28%, rgba(255, 255, 255, 0.82) 0%, transparent 100%),
      radial-gradient(2.6px 2.6px at 62% 52%, rgba(255, 250, 245, 0.8) 0%, transparent 100%),
      radial-gradient(2.5px 2.5px at 12% 72%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
      radial-gradient(2.5px 2.5px at 88% 65%, rgba(200, 210, 255, 0.8) 0%, transparent 100%),
      radial-gradient(2.5px 2.5px at 45% 62%, rgba(255, 255, 255, 0.82) 0%, transparent 100%),
      radial-gradient(2.2px 2.2px at 22% 82%, rgba(255, 250, 240, 0.78) 0%, transparent 100%),
      radial-gradient(2.2px 2.2px at 78% 78%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
      radial-gradient(2.2px 2.2px at 58% 85%, rgba(200, 210, 255, 0.75) 0%, transparent 100%),
      radial-gradient(2px 2px at 8% 92%, rgba(255, 255, 255, 0.75) 0%, transparent 100%),
      radial-gradient(2px 2px at 35% 72%, rgba(255, 250, 245, 0.72) 0%, transparent 100%),
      radial-gradient(2px 2px at 72% 92%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 52% 38%, rgba(200, 220, 255, 0.68) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 18% 58%, rgba(255, 255, 255, 0.65) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 82% 48%, rgba(255, 250, 240, 0.62) 0%, transparent 100%);
    background-size: 100% 100%;
    opacity: 0.85;
    animation: ${starTwinkle} 4s ease-in-out infinite;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: 
      /* Faint distant stars - larger and more numerous */
      radial-gradient(2px 2px at 33% 8%, rgba(255, 255, 255, 0.45) 0%, transparent 100%),
      radial-gradient(2px 2px at 7% 58%, rgba(200, 210, 255, 0.4) 0%, transparent 100%),
      radial-gradient(2px 2px at 91% 75%, rgba(255, 255, 255, 0.35) 0%, transparent 100%),
      radial-gradient(2px 2px at 56% 33%, rgba(255, 250, 240, 0.4) 0%, transparent 100%),
      radial-gradient(2px 2px at 14% 91%, rgba(255, 255, 255, 0.35) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 75% 18%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 26% 66%, rgba(220, 230, 255, 0.3) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 63% 81%, rgba(255, 255, 255, 0.25) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 41% 24%, rgba(255, 250, 245, 0.35) 0%, transparent 100%),
      radial-gradient(1.8px 1.8px at 9% 44%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
      radial-gradient(1.6px 1.6px at 84% 6%, rgba(200, 210, 255, 0.25) 0%, transparent 100%),
      radial-gradient(1.6px 1.6px at 59% 49%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
      radial-gradient(1.6px 1.6px at 19% 33%, rgba(255, 255, 255, 0.25) 0%, transparent 100%),
      radial-gradient(1.6px 1.6px at 77% 87%, rgba(255, 255, 255, 0.2) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 44% 72%, rgba(220, 230, 255, 0.25) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 2% 78%, rgba(255, 255, 255, 0.22) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 96% 42%, rgba(255, 250, 240, 0.2) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 31% 3%, rgba(255, 255, 255, 0.25) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 67% 59%, rgba(200, 210, 255, 0.22) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 12% 19%, rgba(255, 255, 255, 0.2) 0%, transparent 100%),
      radial-gradient(1.4px 1.4px at 53% 92%, rgba(255, 255, 255, 0.22) 0%, transparent 100%),
      radial-gradient(1.4px 1.4px at 87% 35%, rgba(200, 210, 255, 0.2) 0%, transparent 100%),
      radial-gradient(1.4px 1.4px at 22% 8%, rgba(255, 255, 255, 0.25) 0%, transparent 100%),
      radial-gradient(1.4px 1.4px at 6% 65%, rgba(255, 250, 245, 0.2) 0%, transparent 100%),
      radial-gradient(1.4px 1.4px at 93% 28%, rgba(255, 255, 255, 0.22) 0%, transparent 100%),
      radial-gradient(1.3px 1.3px at 36% 48%, rgba(255, 255, 255, 0.18) 0%, transparent 100%),
      radial-gradient(1.3px 1.3px at 71% 72%, rgba(200, 210, 255, 0.15) 0%, transparent 100%),
      radial-gradient(1.3px 1.3px at 15% 28%, rgba(255, 255, 255, 0.18) 0%, transparent 100%),
      radial-gradient(1.3px 1.3px at 48% 15%, rgba(255, 250, 240, 0.15) 0%, transparent 100%),
      radial-gradient(1.3px 1.3px at 82% 92%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
      radial-gradient(1.2px 1.2px at 28% 58%, rgba(255, 255, 255, 0.15) 0%, transparent 100%),
      radial-gradient(1.2px 1.2px at 61% 42%, rgba(220, 230, 255, 0.12) 0%, transparent 100%),
      radial-gradient(1.2px 1.2px at 4% 35%, rgba(255, 255, 255, 0.18) 0%, transparent 100%),
      radial-gradient(1.2px 1.2px at 79% 8%, rgba(255, 250, 245, 0.15) 0%, transparent 100%),
      radial-gradient(1.2px 1.2px at 33% 82%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
      radial-gradient(1.1px 1.1px at 65% 22%, rgba(200, 210, 255, 0.1) 0%, transparent 100%),
      radial-gradient(1.1px 1.1px at 24% 68%, rgba(255, 255, 255, 0.12) 0%, transparent 100%),
      radial-gradient(1.1px 1.1px at 91% 55%, rgba(255, 250, 240, 0.1) 0%, transparent 100%),
      radial-gradient(1.1px 1.1px at 47% 75%, rgba(255, 255, 255, 0.08) 0%, transparent 100%);
    background-size: 100% 100%;
    opacity: 0.65;
    animation: ${starTwinkle} 7s ease-in-out infinite 1s;
  }
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const CosmicGlow = styled.div`
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    circle at center,
    rgba(120, 160, 255, 0.1),
    transparent 60%
  );
  animation: ${cosmicPulse} 12s ease-in-out infinite;
  will-change: opacity;
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const GrainOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.015),
    rgba(255, 255, 255, 0.015) 1px,
    transparent 2px,
    transparent 3px
  );
  opacity: 0.1;
  animation: ${grainShift} 10s linear infinite;
  will-change: transform;
  
  [data-theme="light"] & {
    display: none;
  }
`;

interface ShootingStarProps {
  $top: number;
  $left: number;
  $delay: number;
  $duration: number;
  style?: CSSProperties;
}

export const ShootingStar = styled.span<ShootingStarProps>`
  position: absolute;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, var(--text-primary), transparent);
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
export { nebulaDrift, auroraWave, starTwinkle, grainShift, cosmicPulse, shoot, animStar };

