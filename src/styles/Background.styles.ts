// Background styled components and keyframes
// Reusable cosmic background effects for all views

import styled, { keyframes } from "styled-components";
import type { CSSProperties } from "styled-components";

// =============================================================================
// ANIMATIONS
// =============================================================================

const nebulaDrift = keyframes`
  0% { transform: translate3d(-8%, -6%, 0) scale(1.2); }
  50% { transform: translate3d(8%, 6%, 0) scale(1.25); }
  100% { transform: translate3d(-8%, -6%, 0) scale(1.2); }
`;

const auroraWave = keyframes`
  0% { opacity:.25; transform: translateY(0); }
  50% { opacity:.55; transform: translateY(-60px); }
  100% { opacity:.25; transform: translateY(0); }
`;

const starTwinkle = keyframes`
  0%,100% { opacity:.25; }
  50% { opacity:.7; }
`;

const grainShift = keyframes`
  0% { transform: translate(0,0); }
  100% { transform: translate(-10%,10%); }
`;

const cosmicPulse = keyframes`
  0%,100% { opacity:.35; }
  50% { opacity:.75; }
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
`;

export const NebulaLayer = styled.div`
  position: absolute;
  inset: -25%;
  background: radial-gradient(
      circle at 30% 40%,
      rgba(140, 160, 255, 0.22),
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(200, 140, 255, 0.18),
      transparent 65%
    ),
    radial-gradient(
      circle at 50% 20%,
      rgba(0, 200, 255, 0.15),
      transparent 60%
    );
  filter: blur(160px);
  animation: ${nebulaDrift} 60s ease-in-out infinite;
`;

export const AuroraLayer = styled.div`
  position: absolute;
  inset: -10%;
  background: linear-gradient(
    120deg,
    rgba(0, 200, 255, 0.12),
    transparent,
    rgba(140, 80, 255, 0.12)
  );
  filter: blur(90px);
  animation: ${auroraWave} 20s ease-in-out infinite;
  mix-blend-mode: screen;
`;

export const StarField = styled.div`
  position: absolute;
  inset: -10%;

  &:before {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: radial-gradient(
        1px 1px at 20px 30px,
        #fff,
        transparent
      ),
      radial-gradient(1px 1px at 60px 70px, #fff, transparent),
      radial-gradient(1px 1px at 120px 140px, #fff, transparent),
      radial-gradient(1px 1px at 200px 200px, #fff, transparent);
    background-size: 240px 240px;
    opacity: 0.25;
    animation: ${starTwinkle} 6s ease-in-out infinite;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: radial-gradient(
        2px 2px at 80px 90px,
        rgba(255, 255, 255, 0.9),
        transparent
      ),
      radial-gradient(
        2px 2px at 160px 40px,
        rgba(255, 255, 255, 0.7),
        transparent
      ),
      radial-gradient(
        2px 2px at 200px 120px,
        rgba(255, 255, 255, 0.8),
        transparent
      );
    background-size: 300px 300px;
    opacity: 0.4;
  }
`;

export const CosmicGlow = styled.div`
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    circle at center,
    rgba(120, 160, 255, 0.18),
    transparent 60%
  );
  animation: ${cosmicPulse} 12s ease-in-out infinite;
`;

export const GrainOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.02) 1px,
    transparent 2px,
    transparent 3px
  );
  opacity: 0.15;
  animation: ${grainShift} 10s linear infinite;
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
  width: 260px;
  height: 3px;
  background: linear-gradient(90deg, #fff, transparent);
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  animation: ${shoot} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.9));
`;

// Export keyframes for external use if needed
export { nebulaDrift, auroraWave, starTwinkle, grainShift, cosmicPulse, shoot };

