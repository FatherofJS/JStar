import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../../theme";
import { useScrollPosition } from "../../hooks/useScroll";
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
  Logo,
  NavMenu,
  NavItemMemo,
} from "../landing/styles/Header.styles";

const LayoutWrapper = styled.div`
  min-height: 100dvh;
  color: var(--text-inverse);
  overflow-x: hidden;
  position: relative;
`;

const Content = styled.main`
  padding-top: 80px;
  min-height: calc(100dvh - 80px);
`;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isScrolled } = useScrollPosition();

  return (
    <LayoutWrapper>
      <HeaderWrapper $scrolled={isScrolled}>
        <HeaderLeft>
          <Logo onClick={() => navigate('/')}>JSTAR</Logo>

          <NavMenu>
            <NavItemMemo $active={location.pathname === '/'} onClick={() => navigate('/')}>
              Home
            </NavItemMemo>
            <NavItemMemo $active={location.pathname.startsWith('/star-chart') || location.pathname.startsWith('/chart') || location.pathname.startsWith('/synastry')} onClick={() => navigate('/star-chart')}>
              Chart
            </NavItemMemo>
          </NavMenu>
        </HeaderLeft>

        <HeaderRight>
          <ThemeSwitch isDark={theme === 'dark'} onToggle={toggleTheme} />
        </HeaderRight>
      </HeaderWrapper>

      <Content>
        {children}
      </Content>
    </LayoutWrapper>
  );
}
