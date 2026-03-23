import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { landingContent } from "../../data/landingData";
import ThemeSwitch from "../layout/ThemeSwitch";
import { useTheme } from "../../theme";
import { useScrollPosition } from "../../hooks/useScroll";
import { SECTIONS, type SectionId } from "../../constants";
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
  DesktopOnly,
  Logo,
  NavMenu,
  NavMenuMobile,
  MobileToggle,
  NavItemMemo,
} from "./styles/Header.styles.ts";

interface HeaderProps {
  activeSection: SectionId;
}

function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isScrolled } = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const t = landingContent;

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }, []);

  const handleGetStarted = useCallback(() => {
    navigate("/star-chart");
    setIsOpen(false);
  }, [navigate]);

  return (
    <HeaderWrapper $scrolled={isScrolled}>
      <HeaderLeft>
        <Logo onClick={() => handleNavClick(SECTIONS.HOME)}>
          JSTAR
        </Logo>

        <NavMenu>
          <NavItemMemo
            $active={activeSection === SECTIONS.HOME}
            onClick={() => handleNavClick(SECTIONS.HOME)}
          >
            {t.home}
          </NavItemMemo>
          <NavItemMemo
            $active={activeSection === SECTIONS.CHART_DATA}
            onClick={() => handleNavClick(SECTIONS.CHART_DATA)}
          >
            {t.features}
          </NavItemMemo>
        </NavMenu>
      </HeaderLeft>

      <HeaderRight>
        <ThemeSwitch isDark={theme === "dark"} onToggle={toggleTheme} />

        <DesktopOnly>
          <NavItemMemo $active={false} onClick={handleGetStarted}>
            {t.getStarted}
          </NavItemMemo>
        </DesktopOnly>

        <MobileToggle onClick={toggleMenu}>☰</MobileToggle>
      </HeaderRight>

      <NavMenuMobile $open={isOpen}>
        <NavItemMemo
          $active={activeSection === SECTIONS.HOME}
          onClick={() => handleNavClick(SECTIONS.HOME)}
        >
          {t.home}
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.CHART_DATA}
          onClick={() => handleNavClick(SECTIONS.CHART_DATA)}
        >
          {t.features}
        </NavItemMemo>
        <NavItemMemo $active={false} onClick={handleGetStarted}>
          {t.getStarted}
        </NavItemMemo>
      </NavMenuMobile>
    </HeaderWrapper>
  );
}

export default memo(Header);
