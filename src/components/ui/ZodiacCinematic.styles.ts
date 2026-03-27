import styled, { keyframes } from "styled-components";


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

export const fadeOutElement = keyframes`
  to { opacity: 0; }
`;

export const breathe = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.06); }
`;


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

  [data-performance-mode="reduced"] & {
    perspective: none;
    contain-intrinsic-size: 300px;
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

  animation: 
    ${fadeInSymbol} 1s ease forwards 3s,
    ${breathe} 8s ease-in-out infinite 4s,
    ${fadeOutElement} 1s ease forwards 5.5s;

  mix-blend-mode: screen;

  filter: drop-shadow(0 0 20px rgba(120, 140, 255, 0.3));

  z-index: 1;

  @media (max-width: 768px) {
    animation: 
      ${fadeInSymbol} 1s ease forwards 3s,
      ${breathe} 8s ease-in-out infinite 4s,
      ${fadeOutElement} 1s ease forwards 5.5s;
    filter: drop-shadow(0 0 12px rgba(120, 140, 255, 0.18));
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.85;
  }

  [data-performance-mode="reduced"] & {
    animation: none;
    opacity: 0.82;
    mix-blend-mode: normal;
    filter: none;
  }
`;

export const ConstellationContainer = styled.div`
  position: relative;
  width: clamp(260px, 45vw, 420px);
  height: clamp(260px, 45vw, 420px);
  transform-style: preserve-3d;
  transition: transform 120ms linear;
  will-change: transform;
  contain: layout paint;

  @media (max-width: 768px) {
    transition: none;
    will-change: auto;
  }

  [data-performance-mode="reduced"] & {
    transform-style: flat;
    transition: none;
    will-change: auto;
  }

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
  filter: blur(16px);
  opacity: 0.3;

  @media (max-width: 768px) {
    /* filter: blur(16px);
    opacity: 0.18; */
  }

  [data-performance-mode="reduced"] & {
    /* display: none; */
  }
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

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 768px) {
    /* animation: none;
    opacity: 0.55; */
  }

  [data-performance-mode="reduced"] & {
    /* animation: none;
    opacity: 0.35; */
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

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 768px) {
    /* animation: none;
    opacity: 0.45; */
  }

  [data-performance-mode="reduced"] & {
    /* animation: none;
    opacity: 0.28; */
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

  [data-theme="light"] & {
    color: #1e293b;
  }
`;

export const GalaxyStar = styled.circle.attrs<{ $intensity: number }>((props) => {
  const opNormal = 0.5 + props.$intensity * 0.5;
  const opReduced = 0.4 + props.$intensity * 0.35;
  return {
    style: {
      "--star-op": opNormal,
      "--star-reduced-op": opReduced,
    } as any,
  };
})`
  fill: rgba(255, 255, 255, var(--star-op));
  opacity: var(--star-op);
  
  animation: ${fadeOutElement} 1s ease forwards 5.5s;

  @media (max-width: 768px) {
    filter: none;
  }

  [data-theme="light"] & {
    fill: rgba(30, 41, 59, var(--star-op));
  }

  [data-performance-mode="reduced"] & {
    filter: none;
    opacity: var(--star-reduced-op);
  }
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

export const Line = styled.line.attrs<{ color: string; $delay: number }>((props) => ({
  style: {
    "--line-color": props.color,
    "--line-delay": `${props.$delay}s`,
  } as any,
}))`
  stroke: var(--line-color);
  stroke-width: 0.5;
  stroke-dasharray: 140;
  stroke-dashoffset: 140;

  animation: 
    ${drawLine} 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards var(--line-delay),
    ${fadeOutElement} 1s ease forwards 5.5s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  @media (max-width: 768px) {
    animation: 
      ${drawLine} 1s cubic-bezier(0.22, 1, 0.36, 1) forwards var(--line-delay),
      ${fadeOutElement} 1s ease forwards 5.5s;
  }

  [data-theme="light"] & {
    stroke: #1e293b;
  }

  [data-performance-mode="reduced"] & {
    animation: none;
    stroke-dashoffset: 0;
    opacity: 0.7;
  }
`;

