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

  background: radial-gradient(circle at center, #000 30%, var(--bg-wrapper) 70%);
  box-shadow: 0 0 50px rgba(90, 120, 255, 0.9),
    inset 0 0 30px rgba(0, 0, 0, 1);

  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:active {
    transform: scale(0.94);
  }

  @media (max-width: 480px) {
    width: 14rem;
    height: 3.2rem;
    font-size: 14px;
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

export const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: ${({ $scrolled }) => ($scrolled ? "64px" : "80px")};
  padding: 0 40px;

  background: ${({ $scrolled }) => 
    $scrolled ? "var(--nav-bg)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => 
    $scrolled ? "blur(20px)" : "none"};
  
  border-bottom: ${({ $scrolled }) => 
    $scrolled ? "1px solid var(--glass-border)" : "none"};

  box-shadow: ${({ $scrolled }) => 
    $scrolled ? "0 4px 30px var(--shadow-color)" : "none"};

  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 20px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: transform 0.3s ease;

  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px var(--text-shadow);

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavMenuMobile = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    padding: 20px;
    gap: 16px;
    
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "300px" : "0")};
    overflow: hidden;
    transition: all 0.3s ease;
  }
`;

export const Wrapper = styled.div`
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

  background: var(--nav-bg);
  backdrop-filter: blur(30px);
  border: 1px solid var(--glass-border);

  box-shadow: 0 10px 40px var(--shadow-color);

  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    top: ${({ $scrolled }) => ($scrolled ? "10px" : "16px")};
    flex-direction: column;
    width: ${({ $open }) => ($open ? "240px" : "56px")};
    height: ${({ $open }) => ($open ? "auto" : "52px")};
    padding: ${({ $open }) => ($open ? "16px" : "0")};
    border-radius: ${({ $open }) => ($open ? "24px" : "28px")};
  }

  @media (max-width: 480px) {
    width: ${({ $open }) => ($open ? "220px" : "52px")};
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
  align-items: center;
  gap: 35px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 12px;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "300px" : "0")};
    overflow: hidden;
    transition: all 0.4s ease;
    gap: 16px;
  }
`;

export const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 2px;
  color: ${({ $active }) => ($active ? "var(--nav-item-active)" : "var(--text-inverse)")};
  transition: 0.3s;
  padding: 8px 4px;

  &:hover {
    color: var(--nav-item-active);
    text-shadow: 0 0 15px var(--text-shadow);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 8px;
    text-align: center;
    border-radius: 8px;
    
    &:hover {
      background: var(--nav-item-hover);
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(120, 140, 255, 0.15);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-inverse);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(120, 140, 255, 0.25);
    box-shadow: 0 0 15px rgba(120, 140, 255, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
    width: 100%;
    justify-content: center;
  }
`;

export const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #787cff, #a85aff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: white;
`;

export const UserName = styled.span`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    max-width: none;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-inverse);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 100, 100, 0.2);
    border-color: rgba(255, 100, 100, 0.4);
    color: #ffaaaa;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// =============================================================================
// USER MENU STYLES
// =============================================================================

export const UserMenuWrapper = styled.div`
  position: relative;
`;

export const UserInfoButton = styled.div<{ $hasMenu?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(120, 140, 255, 0.15);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-inverse);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(120, 140, 255, 0.25);
    box-shadow: 0 0 15px rgba(120, 140, 255, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
    width: 100%;
    justify-content: center;
  }
`;

export const UserMenuDropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow: 0 10px 40px var(--shadow-color);
  overflow: hidden;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.3s ease;
  z-index: 1000;
`;

export const UserMenuSection = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid var(--glass-border);
`;

export const UserMenuLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

export const UserMenuEmail = styled.div`
  font-size: 13px;
  color: var(--text-inverse);
  word-break: break-all;
`;

export const UserMenuName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
  margin-bottom: 4px;
`;

export const UserMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: ${({ $danger }) => ($danger ? '#ff6b6b' : 'var(--text-inverse)')};
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? 'rgba(255, 107, 107, 0.15)' : 'var(--nav-item-hover)')};
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export const UserMenuDivider = styled.div`
  height: 1px;
  background: var(--glass-border);
  margin: 4px 0;
`;

// =============================================================================
// CHANGE PASSWORD MODAL STYLES
// =============================================================================

export const PasswordModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

export const PasswordModalContainer = styled.div<{ $open: boolean }>`
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  transform: ${({ $open }) => ($open ? 'scale(1)' : 'scale(0.9)')};
  transition: all 0.3s ease;
`;

export const PasswordModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const PasswordModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-inverse);
  margin: 0;
`;

export const PasswordModalClose = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  
  &:hover {
    color: var(--text-inverse);
  }
`;

export const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PasswordInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PasswordInputLabel = styled.label`
  font-size: 13px;
  color: var(--text-secondary);
`;

export const PasswordInput = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: var(--hero-gradient-start);
    box-shadow: 0 0 0 3px rgba(120, 140, 255, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

export const PasswordSubmitButton = styled.button`
  padding: 14px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #787cff, #a85aff);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(120, 140, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const PasswordErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 13px;
  text-align: center;
  padding: 8px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
`;

export const PasswordSuccessMessage = styled.div`
  color: #4ade80;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    width: 20px;
    height: 20px;
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

export const Section = styled.section`
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 768px) {
    min-height: 500px;
    padding: 20px 16px;
  }
`;

export const Content = styled.div`
  max-width: 620px;

  h1 {
    font-size: clamp(36px, 6vw, 84px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -1px;
  }

  span {
    background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
    text-shadow: 0 0 30px var(--text-shadow);
  }

  p {
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
  }

  @media (max-width: 480px) {
    h1 {
      font-size: clamp(32px, 8vw, 52px);
    }
  }
`;

export const Actions = styled.div`
  margin-top: 40px;
`;

export const GlassBox = styled.div`
  width: 80%;
  padding: 60px;
  border-radius: 28px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);

  @media (max-width: 768px) {
    width: 90%;
    padding: 40px 24px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    width: 94%;
    padding: 32px 16px;
    border-radius: 16px;
  }

  h2 {
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  p {
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

