// Header Component Styles

import styled from "styled-components";

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

// Memoized nav item to prevent re-renders
export const NavItemMemo = styled.div<{ $active: boolean }>`
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

