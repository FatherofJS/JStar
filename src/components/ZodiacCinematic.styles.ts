// ZodiacCinematic styled components and keyframes
// Optimized for performance

import styled, { keyframes } from "styled-components";

// =============================================================================
// ANIMATIONS - Simplified for performance
// =============================================================================

export const floatSlow = keyframes`
  0% { transform: translateY(-3px) }
  50% { transform: translateY(3px) }
  100% { transform: translateY(-3px) }
`;

export const rotateUltraSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const drawLine = keyframes`
  0% { stroke-dashoffset: 140; opacity: 0.15; }
  70% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 1; }
`;

export const fadeInSymbol = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
  to { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
`;

// =============================================================================
// ZODIAC CINEMATIC STYLES
// =============================================================================

export const ZodiacWrapper = styled.div`
  margin-top: 40px;
  height: clamp(280px, 50vh, 440px);
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  padding: 0 20px;

  @media (max-width: 1000px) {
    margin-top: 24px;
    height: clamp(240px, 40vh, 360px);
  }

  @media (max-width: 480px) {
    margin-top: 16px;
    height: clamp(200px, 35vh, 280px);
  }
`;

export const ZodiacSymbol = styled.img`
  position: absolute;
  width: clamp(160px, 30vw, 280px);
  height: auto;
  object-fit: contain;
  pointer-events: none;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: 0;

  animation: ${fadeInSymbol} 2s ease forwards;
  animation-delay: 4s;

  mix-blend-mode: screen;

  filter: drop-shadow(0 0 30px rgba(120, 140, 255, 0.4)) blur(0.2px);

  z-index: 1;
`;

export const ConstellationContainer = styled.div`
  position: relative;
  width: clamp(260px, 45vw, 420px);
  height: clamp(260px, 45vw, 420px);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  @media (max-width: 480px) {
    width: clamp(200px, 55vw, 260px);
    height: clamp(200px, 55vw, 260px);
  }
`;

export const DeepGlow = styled.div<{ color: string }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ color }) => color}30, transparent 70%);
  filter: blur(40px);
  opacity: 0.5;
`;

export const AuraRing = styled.div`
  position: absolute;
  width: clamp(200px, 35vw, 340px);
  height: clamp(200px, 35vw, 340px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: ${rotateUltraSlow} 180s linear infinite;

  @media (max-width: 480px) {
    width: clamp(160px, 45vw, 200px);
    height: clamp(160px, 45vw, 200px);
  }
`;

export const OrbitRing = styled.div`
  position: absolute;
  width: clamp(160px, 28vw, 280px);
  height: clamp(160px, 28vw, 280px);
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  animation: ${rotateUltraSlow} 80s linear infinite reverse;

  @media (max-width: 480px) {
    width: clamp(120px, 35vw, 160px);
    height: clamp(120px, 35vw, 160px);
  }
`;

export const ZodiacName = styled.div`
  position: absolute;
  bottom: -38px;
  width: 100%;
  text-align: center;
  letter-spacing: 5px;
  font-size: clamp(16px, 2.5vw, 22px);
  opacity: 0.9;

  @media (max-width: 480px) {
    bottom: -28px;
    letter-spacing: 3px;
    font-size: 14px;
  }
`;

export const GalaxyStar = styled.circle<{ intensity: number }>`
  fill: rgba(255, 255, 255, ${(p) => 0.5 + p.intensity * 0.5});
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
  opacity: ${(p) => 0.5 + p.intensity * 0.5};
`;

export const ConstellationSVG = styled.svg`
  width: clamp(260px, 45vw, 420px);
  height: clamp(260px, 45vw, 420px);
  z-index: 2;

  @media (max-width: 480px) {
    width: clamp(200px, 55vw, 260px);
    height: clamp(200px, 55vw, 260px);
  }
`;

export const Line = styled.line<{ color: string; delay: number }>`
  stroke: ${(p) => p.color};
  stroke-width: 0.5;
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation: ${drawLine} 4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: ${(p) => p.delay}s;
`;

