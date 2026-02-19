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

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

export const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;
  background: var(--bg-wrapper);
  
  [data-theme="light"] & {
    background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #B8E4F9 100%);
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
  
  [data-theme="light"] & {
    display: none;
  }
`;

export const StarField = styled.div<{ $scrollY: number }>`
  position: absolute;
  inset: -10%;
  transform: perspective(1000px) rotateX(${({ $scrollY }) => $scrollY * 0.02}deg);
  transform-origin: center bottom;
  transition: transform 0.1s ease-out;

  &:before {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: radial-gradient(
        1px 1px at 20px 30px,
        var(--text-primary),
        transparent
      ),
      radial-gradient(1px 1px at 60px 70px, var(--text-primary), transparent),
      radial-gradient(1px 1px at 120px 140px, var(--text-primary), transparent),
      radial-gradient(1px 1px at 200px 200px, var(--text-primary), transparent);
    background-size: 240px 240px;
    opacity: 0.5;
    animation: ${starTwinkle} 6s ease-in-out infinite;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: radial-gradient(
        2px 2px at 80px 90px,
        rgba(255, 255, 255, 0.8),
        transparent
      ),
      radial-gradient(
        2px 2px at 160px 40px,
        rgba(255, 255, 255, 0.7),
        transparent
      ),
      radial-gradient(
        2px 2px at 200px 120px,
        rgba(255, 255, 255, 0.75),
        transparent
      );
    background-size: 300px 300px;
    opacity: 0.8;
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
  
  [data-theme="light"] & {
    display: none;
  }
`;

// Export keyframes for external use if needed
export { nebulaDrift, auroraWave, starTwinkle, grainShift, cosmicPulse, shoot };

