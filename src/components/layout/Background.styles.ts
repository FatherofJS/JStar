// Background styled components and keyframes
// Beautiful cosmic background with vibrant nebula for dark mode

import styled, { keyframes } from "styled-components";
import type { CSSProperties } from "styled-components";

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
  contain: layout paint style;
  transform: translateZ(0);
  
  /* Dark mode - Rich cosmic gradient with galaxy colors */
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0f1a2e 60%, #0a0a1a 100%);
  
  [data-theme="light"] & {
    /* Light mode - Sky blue gradient like clear blue sky */
    background: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 40%, #ffffff 100%);
  }
`;

// =============================================================================
// STAR LAYER - Beautiful starfield for dark mode
// =============================================================================

export const StarsLayer = styled.div`
  display: none;
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
  will-change: opacity;

  > div {
    will-change: opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    > div {
      animation: none !important;
    }
  }

  @media (max-width: 1280px) {
    > div {
      animation: none !important;
      opacity: 0.35;
    }
  }

  [data-performance-mode="reduced"] & > div {
    animation: none !important;
    opacity: 0.22;
  }
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
    animation: ${starTwinkle} 8s ease-in-out infinite;
  }
  
  [data-theme="light"] & {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }

  @media (max-width: 1280px) {
    &::before {
      animation: none;
      opacity: 0.75;
    }
  }

  [data-performance-mode="reduced"] &::before {
    animation: none;
    opacity: 0.55;
  }
`;

// =============================================================================
// COSMIC GLOW - Beautiful center glow
// =============================================================================

export const CosmicGlow = styled.div`
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(59, 130, 246, 0.07) 32%,
    transparent 68%
  );
  animation: ${glowPulse} 14s ease-in-out infinite;
  will-change: opacity;
  
  [data-theme="light"] & {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 1280px) {
    animation: none;
    opacity: 0.22;
  }

  [data-performance-mode="reduced"] & {
    animation: none;
    opacity: 0.14;
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
  $direction?: number;
  style?: CSSProperties;
}

export const ShootingStar = styled.span<ShootingStarProps>`
  position: absolute;
  width: 72px;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6), transparent);
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  animation: ${shoot} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  will-change: transform, opacity;
  transform: rotate(${({ $direction }) => $direction || -45}deg);
  
  /* Bright glowing head on the left (start of movement direction) */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 
      0 0 4px 1px rgba(255, 255, 255, 1),
      0 0 8px 2px rgba(255, 255, 255, 0.8),
      0 0 12px 4px rgba(255, 255, 255, 0.5);
  }
  
  [data-theme="light"] & {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

// Export keyframes for external use if needed
export { slowDrift, nebulaPulse, starTwinkle, shoot, glowPulse };

