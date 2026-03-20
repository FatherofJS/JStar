// Layout Component - Shared header and layout across pages
// Auth removed — simple navigation layout
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ThemeSwitch from "./themeSwitch/ThemeSwitch";
import { useTheme } from "../contexts/ThemeContext";
import { useScrollPosition } from "../hooks/useScrollPosition";
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
  Logo,
  NavMenu,
  NavItemMemo,
} from "./Layout.styles";

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
  const { theme, toggleTheme } = useTheme();
  const { isScrolled } = useScrollPosition();

  return (
    <LayoutWrapper>
      <HeaderWrapper $scrolled={isScrolled}>
        <HeaderLeft>
          <Logo onClick={() => navigate('/')}>JSTAR</Logo>

          <NavMenu>
            <NavItemMemo $active={false} onClick={() => navigate('/')}>
              Home
            </NavItemMemo>
            <NavItemMemo $active={false} onClick={() => navigate('/star-chart')}>
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
