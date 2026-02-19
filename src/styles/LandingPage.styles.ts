// LandingPage styled components and keyframes
// Organized by component for better maintainability

import styled, { keyframes } from "styled-components";

// =============================================================================
// ANIMATIONS
// =============================================================================

// ZodiacCinematic animations
export const floatSlow = keyframes`
  0% { transform: translateY(-6px) }
  50% { transform: translateY(6px) }
  100% { transform: translateY(-6px) }
`;

export const rotateUltraSlow = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

export const drawLine = keyframes`
  0% {
    stroke-dashoffset: 140;
    opacity: .15;
  }
  70% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

export const fadeInSymbol = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(.95);
  }
  to {
    opacity: .85;
    transform: translate(-50%, -50%) scale(1);
  }
`;

// Space button animations
export const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
`;

export const vortexSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(360deg) scale(1.1); }
`;

export const shockwaveAnim = keyframes`
  0% { opacity:.8; transform: scale(.3); }
  100% { opacity:0; transform: scale(3.2); }
`;

export const glowPulse = keyframes`
  0%,100% { opacity:.5; }
  50% { opacity:1; }
`;

// Landing page section animations
export const zoomIn = keyframes`
  from { transform: scale(0.9); opacity:0; filter: blur(8px); }
  to { transform: scale(1); opacity:1; filter: blur(0); }
`;

export const zoomOut = keyframes`
  from { transform: scale(1); opacity:1; }
  to { transform: scale(0.95); opacity:0.5; }
`;

// =============================================================================
// ZODIAC CINEMATIC STYLES
// =============================================================================

export const ZodiacWrapper = styled.div`
  margin-top: 40px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
`;

export const ZodiacSymbol = styled.img`
  position: absolute;
  width: 320px;
  height: auto;
  object-fit: contain;
  pointer-events: none;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: 0;

  animation: ${fadeInSymbol} 2.2s ease forwards;
  animation-delay: 4.8s;

  mix-blend-mode: screen;

  filter: drop-shadow(0 0 50px rgba(120, 140, 255, 0.6)) blur(0.2px);

  z-index: 1;
`;

export const ConstellationContainer = styled.div`
  position: relative;
  width: 420px;
  height: 420px;
  transform-style: preserve-3d;
  transition: transform 0.25s ease;
  animation: ${floatSlow} 8s ease-in-out infinite;
`;

export const DeepGlow = styled.div<{ color: string }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ color }) => color}40, transparent 70%);
  filter: blur(120px);
  opacity: 0.6;
`;

export const AuraRing = styled.div`
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: ${rotateUltraSlow} 90s linear infinite;
`;

export const OrbitRing = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  animation: ${rotateUltraSlow} 40s linear infinite reverse;
`;

export const ZodiacName = styled.div`
  position: absolute;
  bottom: -38px;
  width: 100%;
  text-align: center;
  letter-spacing: 5px;
  font-size: 22px;
  opacity: 0.9;
`;

export const GalaxyStar = styled.circle<{ intensity: number }>`
  fill: rgba(255, 255, 255, ${(p) => 0.5 + p.intensity * 0.5});

  filter: drop-shadow(0 0 ${(p) => 1 + p.intensity * 1}px rgba(255, 255, 255, 0.9))
    drop-shadow(0 0 ${(p) => 3 + p.intensity * 3}px rgba(200, 220, 255, 0.8))
    drop-shadow(0 0 ${(p) => 8 + p.intensity * 6}px rgba(160, 180, 255, 0.6))
    drop-shadow(0 0 ${(p) => 18 + p.intensity * 10}px rgba(120, 140, 255, 0.35));

  opacity: ${(p) => 0.5 + p.intensity * 0.5};
`;

export const ConstellationSVG = styled.svg`
  width: 420px;
  height: 420px;
  z-index: 2;
`;

export const Line = styled.line<{ color: string; delay: number }>`
  stroke: ${(p) => p.color};
  stroke-width: 0.8;
  filter: drop-shadow(0 0 8px ${(p) => p.color});
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation: ${drawLine} 5.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: ${(p) => p.delay}s;
`;

// =============================================================================
// SPACE BUTTON STYLES
// =============================================================================

export const WrapperBH = styled.div`
  display: inline-block;
  position: relative;
`;

export const ButtonBH = styled.button`
  position: relative;
  overflow: hidden;

  width: 16rem;
  height: 3.6rem;
  border-radius: 60px;
  border: none;
  cursor: pointer;

  color: white;
  font-weight: 600;
  letter-spacing: 1px;

  background: radial-gradient(circle at center, #000 30%, #050a2a 70%);
  box-shadow: 0 0 50px rgba(90, 120, 255, 0.9),
    inset 0 0 30px rgba(0, 0, 0, 1);

  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:active {
    transform: scale(0.94);
  }
`;

export const Vortex = styled.div`
  position: absolute;
  inset: -45%;
  border-radius: 50%;

  background: conic-gradient(
    from 0deg,
    rgba(90, 120, 255, 0.8),
    rgba(140, 80, 255, 0.8),
    rgba(0, 200, 255, 0.8),
    rgba(90, 120, 255, 0.8)
  );

  filter: blur(45px);
  animation: ${vortexSpin} 6s linear infinite;
  z-index: -1;
`;

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 60px;

  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.25),
    transparent 60%
  );
  animation: ${glowPulse} 3s ease-in-out infinite;
`;

export const Shockwave = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 140px;
  height: 140px;

  border-radius: 50%;
  border: 2px solid rgba(120, 160, 255, 0.8);

  transform: translate(-50%, -50%);
  animation: ${shockwaveAnim} 0.8s ease-out forwards;
  pointer-events: none;
`;

export const Particle = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(160, 180, 255, 0.9);
  border-radius: 50%;
  animation: ${orbit} 6s linear infinite;
`;

// =============================================================================
// LANDING PAGE LAYOUT STYLES
// =============================================================================

export const Wrapper = styled.div`
  min-height: 400vh;
  color: white;
  overflow-x: hidden;
  position: relative;

  .zoom-in {
    animation: ${zoomIn} 0.8s ease forwards;
  }
  .zoom-out {
    animation: ${zoomOut} 0.6s ease forwards;
  }
`;

export const DynamicIsland = styled.div<{ $scrolled: boolean; $open: boolean }>`
  position: fixed;
  top: ${({ $scrolled }) => ($scrolled ? "14px" : "30px")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ $scrolled }) => ($scrolled ? "52px" : "70px")};
  width: ${({ $open, $scrolled }) =>
    $open ? "280px" : $scrolled ? "fit-content" : "540px"};

  padding: 0 35px;
  border-radius: ${({ $open }) => ($open ? "30px" : "999px")};

  background: rgba(20, 25, 70, 0.7);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    flex-direction: column;
    width: ${({ $open }) => ($open ? "260px" : "60px")};
    height: ${({ $open }) => ($open ? "auto" : "52px")};
    padding: ${({ $open }) => ($open ? "20px" : "0")};
  }
`;

export const MobileToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 20px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
  }
`;

export const NavContainer = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 35px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 12px;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "240px" : "0")};
    overflow: hidden;
    transition: all 0.4s ease;
  }
`;

export const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 2px;
  color: ${({ $active }) => ($active ? "#7aa2ff" : "white")};
  transition: 0.3s;

  &:hover {
    color: #7aa2ff;
    text-shadow: 0 0 15px rgba(122, 162, 255, 0.9);
  }
`;

// Galaxy component - kept for any section-specific galaxy effects (e.g., brightness control)
// The main background is now handled by the reusable Background component
export const Galaxy = styled.div<{ $active: boolean }>`
  position: fixed;
  inset: 0;
  pointer-events: none;
  transition: filter 0.6s ease;
  filter: ${({ $active }) => ($active ? "brightness(1.35)" : "brightness(1)")};
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
  filter: blur(80px);
  opacity: 0.7;
  z-index: -1;
`;

export const SectionHero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
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
    gap: 60px;
  }
`;

export const DividerGlow = styled.div`
  width: 120px;
  height: 2px;
  margin-top: 28px;

  background: linear-gradient(90deg, transparent, #7aa2ff, transparent);
  filter: blur(0.6px);
  opacity: 0.7;
`;

export const HeroRight = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateY(-10px);

  @media (max-width: 1000px) {
    transform: none;
  }
`;

export const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 620px;

  h1 {
    font-size: clamp(52px, 6vw, 84px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -1px;
  }

  span {
    background: linear-gradient(90deg, #7aa2ff, #c084fc, #22d3ee);
    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
    text-shadow: 0 0 30px rgba(122, 162, 255, 0.6);
  }

  p {
    margin-top: 24px;
    font-size: 17px;
    line-height: 1.6;
    opacity: 0.75;
    max-width: 520px;
  }
`;

export const Actions = styled.div`
  margin-top: 40px;
`;

export const GlassBox = styled.div`
  width: 80%;
  padding: 60px;
  border-radius: 28px;
  background: rgba(20, 25, 60, 0.55);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

