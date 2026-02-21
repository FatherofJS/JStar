// LandingPage styled components and keyframes
// Optimized for performance

import styled, { keyframes } from "styled-components";

// =============================================================================
// ANIMATIONS - Simplified for performance
// =============================================================================

// ZodiacCinematic animations - simplified
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

// Space button animations - simplified
export const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
`;

export const vortexSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(360deg) scale(1.1); }
`;

export const shockwaveAnim = keyframes`
  0% { opacity: 0.8; transform: scale(0.3); }
  100% { opacity: 0; transform: scale(3.2); }
`;

export const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// Landing page section animations - simplified
export const zoomIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const zoomOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0.5; }
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

// Secondary Button Styles - White in dark mode, black in light mode
export const SecondaryButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const SecondaryButton = styled.button`
  position: relative;
  overflow: hidden;

  width: 16rem;
  height: 3.6rem;
  border-radius: 60px;
  border: none;
  cursor: pointer;

  font-weight: 600;
  letter-spacing: 1px;

  /* Theme-aware colors using CSS variables */
  background: var(--secondary-btn-bg);
  color: var(--secondary-btn-color);

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }
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

// =============================================================================
// NEW LANDING PAGE SECTIONS STYLES (Similar to astrologerstudio.com)
// =============================================================================

// Feature Badge
export const FeatureBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  gap: 4px;
  margin-bottom: 16px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

// Section Container
export const SectionContainer = styled.section`
  position: relative;
  z-index: 10;
  padding: 80px 16px;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

export const SectionContainerAlt = styled(SectionContainer)`
  background: var(--bg-secondary);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
`;

// Max Width Container
export const MaxWidthContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

// Grid Layout
export const GridTwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// Feature Content (Left)
export const FeatureContent = styled.div`
  @media (max-width: 1000px) {
    order: 2;
  }
`;

// Feature Content Reversed (Right)
export const FeatureContentReversed = styled.div`
  @media (max-width: 1000px) {
    order: 2;
  }
`;

// Feature Image Container
export const FeatureImageWrapper = styled.div`
  position: relative;
  
  @media (max-width: 1000px) {
    order: 1;
  }
`;

// Feature Image Card
export const FeatureImageCard = styled.div`
  position: relative;
  cursor: zoom-in;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:hover .feature-overlay {
    opacity: 1;
  }
`;

export const FeatureImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.7s ease;
  
  ${FeatureImageCard}:hover & {
    transform: scale(1.05);
  }
`;

export const FeatureImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  backdrop-filter: blur(2px);
  transition: all 0.3s ease;
`;

export const ZoomHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// Glow Effects
export const FeatureGlow = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  inset: -20px;
  z-index: -10;
  border-radius: 2rem;
  opacity: 0.5;
  background: linear-gradient(
    ${({ $position }) => $position === 'left' 
      ? 'to right, rgba(120, 140, 255, 0.2), transparent' 
      : 'to left, rgba(120, 140, 255, 0.2), transparent'}
  );
  filter: blur(40px);
  
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const FeatureGlowPurple = styled(FeatureGlow)`
  background: linear-gradient(
    ${({ $position }) => $position === 'left' 
      ? 'to right, rgba(168, 85, 247, 0.2), transparent' 
      : 'to left, rgba(168, 85, 247, 0.2), transparent'}
  );
`;

// Section Title
export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

// Section Description
export const SectionDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 540px;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// Feature List
export const FeatureList = styled.ul`
  list-style: disc;
  list-style-position: outside;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeatureListItem = styled.li`
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
`;

// Aspect Grid Preview (CSS-based placeholder)
export const AspectGridPreview = styled.div`
  padding: 24px;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
`;

// AI Interpretation Preview
export const AIInterpretationPreview = styled.div`
  height: 400px;
  overflow: hidden;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: 12px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
`;

export const AIBlinkingCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: var(--text-primary);
  animation: pulse 1s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// =============================================================================
// PRICING SECTION
// =============================================================================

export const PricingSection = styled(SectionContainer)`
  text-align: center;
`;

export const PricingHeader = styled.div`
  margin-bottom: 48px;
`;

export const PricingTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const PricingSubtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

export const PricingCard = styled.div`
  position: relative;
  max-width: 420px;
  margin: 0 auto;
  border-radius: 16px;
  border: 2px solid rgba(120, 140, 255, 0.3);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    margin: 0 16px;
  }
`;

export const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  color: white;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(120, 140, 255, 0.4);
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PricingIcon = styled.div`
  margin: 16px auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(120, 140, 255, 0.1);
  
  svg {
    width: 28px;
    height: 28px;
    color: var(--hero-gradient-start);
  }
`;

export const PricingPlanName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

export const PricingPlanDesc = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
`;

export const PricingAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const PricingOriginalPrice = styled.span`
  font-size: 24px;
  color: var(--text-secondary);
  text-decoration: line-through;
`;

export const PricingCurrentPrice = styled.span`
  font-size: 56px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const PricingPeriod = styled.span`
  font-size: 16px;
  color: var(--text-secondary);
`;

export const PricingDiscount = styled.p`
  font-size: 14px;
  color: var(--hero-gradient-start);
  font-weight: 500;
  margin-bottom: 24px;
`;

export const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

export const PricingFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-primary);
  
  svg {
    width: 20px;
    height: 20px;
    color: var(--hero-gradient-start);
    flex-shrink: 0;
  }
`;

export const PricingButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(120, 140, 255, 0.4);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PricingNote = styled.p`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 16px;
  text-align: center;
`;

// =============================================================================
// GET STARTED STEPS
// =============================================================================

export const StepsSection = styled(SectionContainerAlt)`
  text-align: center;
`;

export const StepsHeader = styled.div`
  margin-bottom: 48px;
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const StepCard = styled.div`
  position: relative;
  text-align: center;
`;

export const StepNumber = styled.div`
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

export const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const StepDescription = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
`;

// =============================================================================
// OPEN SOURCE SECTION
// =============================================================================

export const OpenSourceSection = styled(SectionContainer)`
  text-align: center;
`;

export const OpenSourceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const OpenSourceBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(34, 197, 94, 0.3);
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  font-size: 14px;
  font-weight: 500;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const OpenSourceTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const OpenSourceDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 700px;
  
  strong {
    color: var(--text-primary);
  }
`;

export const OpenSourceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
  max-width: 900px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const OpenSourceCard = styled.div`
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--bg-secondary);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--hero-gradient-start);
    margin-bottom: 16px;
  }
`;

export const OpenSourceCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const OpenSourceCardDesc = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
`;

export const OpenSourceButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const OpenSourceButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &.primary {
    background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(120, 140, 255, 0.4);
    }
  }
  
  &.secondary {
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-primary);
    
    &:hover {
      background: var(--bg-secondary);
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// =============================================================================
// FINAL CTA SECTION
// =============================================================================

export const CTASection = styled(SectionContainerAlt)`
  text-align: center;
`;

export const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const CTADescription = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
`;

export const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(120, 140, 255, 0.4);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const CTANote = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
`;

// =============================================================================
// FOOTER
// =============================================================================

export const FooterWrapper = styled.footer`
  position: relative;
  z-index: 10;
  padding: 32px 16px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--glass-border);
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

export const FooterLogo = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
`;

export const FooterCopyright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
  gap: 2px;
  
  @media (min-width: 768px) {
    align-items: flex-start;
  }
  
  a {
    color: var(--text-secondary);
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--text-primary);
    }
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const FooterLink = styled.a`
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
`;

// =============================================================================
// SCROLL TO FEATURE BUTTON
// =============================================================================

export const ScrollButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  animation: bounce 2s ease-in-out infinite;
  
  &:hover {
    border-color: var(--text-primary);
    background: var(--bg-secondary);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--text-secondary);
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(10px); }
  }
  
  @media (min-width: 1024px) {
    bottom: 40px;
  }
`;

// Aspect Grid Table (placeholder)
export const AspectGridTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  font-size: 11px;
  text-align: center;
`;

export const AspectGridCell = styled.div<{ $color?: string }>`
  padding: 8px 4px;
  border-radius: 4px;
  background: ${({ $color }) => $color || 'var(--glass-bg)'};
  color: ${({ $color }) => $color ? 'white' : 'var(--text-secondary)'};
  font-weight: 500;
`;

export const AspectGridHeader = styled(AspectGridCell)`
  background: transparent;
  color: var(--text-primary);
  font-weight: 600;
`;

