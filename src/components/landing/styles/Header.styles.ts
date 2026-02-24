// Header Component Styles

import styled, { keyframes, css } from "styled-components";

// =============================================================================
// KEYFRAMES ANIMATIONS
// =============================================================================

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const borderGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(122, 162, 255, 0.3), 0 0 40px rgba(122, 162, 255, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(122, 162, 255, 0.5), 0 0 60px rgba(122, 162, 255, 0.2);
  }
`;

// =============================================================================
// HEADER STYLES
// =============================================================================

export const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
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

  /* Glassmorphism với gradient nhẹ - Dark mode */
  background: ${({ $scrolled }) => 
    $scrolled 
      ? "linear-gradient(135deg, rgba(20, 25, 70, 0.85) 0%, rgba(30, 35, 80, 0.9) 100%)" 
      : "linear-gradient(135deg, rgba(20, 25, 70, 0.4) 0%, rgba(30, 35, 80, 0.5) 100%)"};
  
  backdrop-filter: ${({ $scrolled }) => 
    $scrolled ? "blur(25px) saturate(180%)" : "blur(15px) saturate(120%)"};
  
  border-bottom: 1px solid var(--glass-border);

  /* Animated border khi scroll */
  ${({ $scrolled }) => $scrolled && css`
    animation: ${borderGlow} 4s ease-in-out infinite;
  `}

  /* Entry animation */
  animation: ${slideDown} 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  box-shadow: ${({ $scrolled }) => 
    $scrolled ? "0 4px 30px var(--shadow-color), 0 0 40px rgba(122, 162, 255, 0.1)" : "none"};

  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  /* Gradient accent line at bottom - Dark mode */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(122, 162, 255, 0.3) 20%,
      rgba(192, 132, 252, 0.5) 50%,
      rgba(122, 162, 255, 0.3) 80%,
      transparent 100%
    );
    opacity: ${({ $scrolled }) => ($scrolled ? 1 : 0.3)};
    transition: opacity 0.4s ease;
  }

  /* Light mode - More prominent header */
  [data-theme="light"] & {
    background: ${({ $scrolled }) => 
      $scrolled 
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.98) 100%)" 
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(224, 242, 254, 0.9) 100%)"};
    
    backdrop-filter: ${({ $scrolled }) => 
      $scrolled ? "blur(20px) saturate(100%)" : "blur(12px) saturate(100%)"};
    
    border-bottom: 1px solid rgba(186, 230, 253, 0.5);
    
    box-shadow: ${({ $scrolled }) => 
      $scrolled ? "0 4px 20px rgba(14, 165, 233, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)" : "0 2px 12px rgba(14, 165, 233, 0.08)"};

    /* Light mode accent line */
    &::after {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(14, 165, 233, 0.4) 20%,
        rgba(56, 189, 248, 0.6) 50%,
        rgba(14, 165, 233, 0.4) 80%,
        transparent 100%
      );
      opacity: ${({ $scrolled }) => ($scrolled ? 1 : 0.5)};
    }
  }

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
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Font calligraphy đặc biệt */
  font-family: 'Cinzel Decorative', serif;
  
  /* Màu gradient với hiệu ứng phát sáng - Dark mode */
  background: linear-gradient(135deg, #7aa2ff 0%, #c084fc 50%, #22d3ee 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 10px rgba(122, 162, 255, 0.5));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(122, 162, 255, 0.8));
  }

  /* Light mode - Deeper sky colors */
  [data-theme="light"] & {
    background: linear-gradient(135deg, #0284c7 0%, #7c3aed 50%, #0891b2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(2, 132, 199, 0.4));

    &:hover {
      filter: drop-shadow(0 0 15px rgba(2, 132, 199, 0.6));
    }
  }

  @media (max-width: 768px) {
    font-size: 22px;
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
    background: linear-gradient(180deg, rgba(20, 25, 70, 0.95) 0%, rgba(15, 20, 50, 0.98) 100%);
    backdrop-filter: blur(25px);
    border-bottom: 1px solid var(--glass-border);
    padding: 20px;
    gap: 16px;
    
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "400px" : "0")};
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    
    /* Gradient border at top */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(122, 162, 255, 0.3) 50%,
        transparent 100%
      );
    }
  }
`;

export const MobileToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 20px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--nav-item-hover);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
  }
`;

// Memoized nav item với underline animation
export const NavItemMemo = styled.div<{ $active: boolean }>`
  position: relative;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: ${({ $active }) => ($active ? "var(--nav-item-active)" : "var(--text-inverse)")};
  transition: all 0.3s ease;
  padding: 8px 4px;

  /* Underline effect */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--hero-gradient-start),
      var(--hero-gradient-mid),
      var(--hero-gradient-end)
    );
    border-radius: 2px;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: var(--nav-item-active);
    text-shadow: 0 0 20px var(--text-shadow);
    
    &::after {
      width: 100%;
    }
  }

  /* Light mode - Better contrast */
  [data-theme="light"] & {
    color: ${({ $active }) => ($active ? "#0284c7" : "#1e293b")};
    
    &:hover {
      color: #0284c7;
      text-shadow: 0 0 15px rgba(2, 132, 199, 0.4);
    }
    
    &::after {
      background: linear-gradient(
        90deg,
        #0284c7,
        #7c3aed,
        #0891b2
      );
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 8px;
    text-align: center;
    border-radius: 8px;
    font-weight: 600;
    
    &:hover {
      background: linear-gradient(135deg, rgba(122, 162, 255, 0.15) 0%, rgba(192, 132, 252, 0.1) 100%);
    }
    
    &::after {
      display: none;
    }
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
  padding: 8px 16px;
  /* Gradient background - Dark mode */
  background: linear-gradient(135deg, rgba(120, 140, 255, 0.2) 0%, rgba(168, 90, 255, 0.15) 100%);
  border: 1px solid rgba(120, 140, 255, 0.25);
  border-radius: 24px;
  font-size: 13px;
  color: var(--text-inverse);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: linear-gradient(135deg, rgba(120, 140, 255, 0.35) 0%, rgba(168, 90, 255, 0.3) 100%);
    box-shadow: 0 0 25px rgba(120, 140, 255, 0.4), 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
    border-color: rgba(120, 140, 255, 0.5);
  }

  /* Light mode - More prominent */
  [data-theme="light"] & {
    background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(124, 58, 237, 0.12) 100%);
    border: 1px solid rgba(2, 132, 199, 0.3);
    color: #1e293b;
    
    &:hover {
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(124, 58, 237, 0.2) 100%);
      box-shadow: 0 0 20px rgba(2, 132, 199, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: rgba(2, 132, 199, 0.5);
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
    width: 100%;
    justify-content: center;
    border-radius: 12px;
  }
`;

export const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* Animated gradient - Dark mode */
  background: linear-gradient(135deg, #787cff 0%, #a85aff 50%, #6366f1 100%);
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: white;
  box-shadow: 0 2px 10px rgba(120, 140, 255, 0.4);

  /* Light mode - Sky blue gradient */
  [data-theme="light"] & {
    background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 50%, #0284c7 100%);
    box-shadow: 0 2px 8px rgba(14, 165, 233, 0.4);
  }
`;

export const UserName = styled.span`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--text-primary);

  @media (max-width: 768px) {
    max-width: none;
  }
`;

export const UserMenuDropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 240px;
  /* Gradient background với glass effect */
  background: var(--bg-secondary);
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 20px 50px var(--shadow-color), 0 0 30px rgba(120, 140, 255, 0.1);
  overflow: hidden;
  
  /* Glow border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--nav-item-active) 50%,
      transparent 100%
    );
  }
  
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-15px)')};
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1000;
`;

export const UserMenuSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--border);
  background: var(--nav-item-hover);
`;

export const UserMenuLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-secondary);
  margin-bottom: 10px;
  font-weight: 600;
`;

export const UserMenuEmail = styled.div`
  font-size: 13px;
  color: var(--text-primary);
  word-break: break-all;
  opacity: 0.85;
`;

export const UserMenuName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

export const UserMenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: ${({ $danger }) => ($danger ? '#ff6b6b' : 'var(--text-primary)')};
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  /* Hover background */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ $danger }) => ($danger ? '#ff6b6b' : 'var(--nav-item-active)')};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: var(--nav-item-hover);
    
    &::before {
      opacity: 1;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    opacity: 0.8;
  }
`;

export const UserMenuDivider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 4px 0;
`;

