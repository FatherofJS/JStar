// Layout Component - Shared header and layout across pages
import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useScrollPosition } from "../hooks/useScrollPosition";
import {
  Header as StyledHeader,
  HeaderLeft,
  HeaderRight,
  Logo,
  NavMenu,
  NavItem as StyledNavItem,
  UserAvatar,
  UserName,
  UserMenuWrapper,
  UserInfoButton,
  UserMenuDropdown,
  UserMenuSection,
  UserMenuLabel,
  UserMenuEmail,
  UserMenuName,
  UserMenuItem,
  UserMenuDivider,
} from "../styles/LandingPage.styles";

// Memoized nav item
const NavItem = StyledNavItem;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  color: var(--text-inverse);
  overflow-x: hidden;
  position: relative;
`;

const Content = styled.main`
  padding-top: 80px;
  min-height: calc(100vh - 80px);
`;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const { isScrolled } = useScrollPosition();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  // Toggle user menu
  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
  }, []);

  // Close user menu
  const closeUserMenu = useCallback(() => {
    setIsUserMenuOpen(false);
  }, []);

  // Handle click outside user menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.user-menu-container')) {
          closeUserMenu();
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen, closeUserMenu]);

  // Handle logout
  const handleLogout = useCallback(() => {
    logout();
    closeUserMenu();
    navigate('/');
  }, [logout, closeUserMenu, navigate]);

  // Handle navigation to home
  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <LayoutWrapper>
      <StyledHeader $scrolled={isScrolled}>
        <HeaderLeft>
          <Logo onClick={handleGoHome}>JSTAR</Logo>
          
          <NavMenu>
            <NavItem $active={false} onClick={handleGoHome}>
              Home
            </NavItem>
            <NavItem $active={false} onClick={() => navigate('/star-chart')}>
              Chart
            </NavItem>
          </NavMenu>
        </HeaderLeft>

        <HeaderRight>
          <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />
          
          {/* User section - show login button or user menu */}
          {isLoggedIn ? (
            <UserMenuWrapper className="user-menu-container">
              <UserInfoButton onClick={toggleUserMenu} $hasMenu>
                <UserAvatar>{userInitial}</UserAvatar>
                <UserName>{user?.name}</UserName>
              </UserInfoButton>
              
              <UserMenuDropdown $open={isUserMenuOpen}>
                <UserMenuSection>
                  <UserMenuLabel>Account</UserMenuLabel>
                  <UserMenuName>{user?.name}</UserMenuName>
                  <UserMenuEmail>{user?.email}</UserMenuEmail>
                </UserMenuSection>
                
                <UserMenuDivider />
                
                <UserMenuItem onClick={handleLogout} $danger>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </UserMenuItem>
              </UserMenuDropdown>
            </UserMenuWrapper>
          ) : (
            <NavItem $active={false} onClick={() => navigate('/')}>
              Login
            </NavItem>
          )}
        </HeaderRight>
      </StyledHeader>

      <Content>
        {children}
      </Content>
    </LayoutWrapper>
  );
}

