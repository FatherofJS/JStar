import styled, { keyframes } from "styled-components";




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

// Removed borderGlow keyframes for performance


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

  background: ${({ $scrolled }) =>
    $scrolled
      ? "linear-gradient(135deg, rgba(20, 25, 70, 0.85) 0%, rgba(30, 35, 80, 0.9) 100%)"
      : "linear-gradient(135deg, rgba(20, 25, 70, 0.4) 0%, rgba(30, 35, 80, 0.5) 100%)"};
  
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(12px)" : "blur(8px)"};
  
  border-bottom: 1px solid var(--glass-border);

  animation: ${slideDown} 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none"};

  transition:
    height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);

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
    padding: 0 14px;
  }

  @media (max-width: 1280px) {
    box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 4px 18px var(--shadow-color)" : "none"};
  }

  [data-performance-mode="reduced"] & {
    box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 2px 12px var(--shadow-color)" : "none"};

    &::after {
      opacity: ${({ $scrolled }) => ($scrolled ? 0.7 : 0.18)};
    }
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;

  @media (max-width: 768px) {
    gap: 12px;
    min-width: 0;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    min-width: 0;
  }
`;

export const DesktopOnly = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  font-family: 'Cinzel Decorative', serif;
  
  background: linear-gradient(135deg, #7aa2ff 0%, #c084fc 50%, #22d3ee 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 10px rgba(122, 162, 255, 0.5));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(122, 162, 255, 0.8));
  }

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
    font-size: 18px;
    letter-spacing: 2px;
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
    height: 44px;
    width: 44px;
    font-size: 18px;
  }
`;

export const NavItemMemo = styled.div<{ $active: boolean }>`
  position: relative;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: ${({ $active }) => ($active ? "var(--nav-item-active)" : "var(--text-inverse)")};
  transition: all 0.3s ease;
  padding: 8px 4px;

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



