// Header Component - Navigation with logo, menu, theme switch
// Auth removed - "Get Started" button navigates to /star-chart

import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";
import LanguageSwitch from "../themeSwitch/LanguageSwitch";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSectionObserver } from "../../hooks/useSectionObserver";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { SECTIONS } from "../../constants";
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
  Logo,
  NavMenu,
  NavMenuMobile,
  MobileToggle,
  NavItemMemo,
} from "./styles/Header.styles.ts";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isScrolled } = useScrollPosition();
  const { activeSection } = useSectionObserver();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

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
          <NavItemMemo
            $active={activeSection === SECTIONS.PRICING}
            onClick={() => handleNavClick(SECTIONS.PRICING)}
          >
            {t.pricing}
          </NavItemMemo>
        </NavMenu>
      </HeaderLeft>

      <HeaderRight>
        <LanguageSwitch />
        <ThemeSwitch isDark={theme === "dark"} onToggle={toggleTheme} />

        <NavItemMemo $active={false} onClick={handleGetStarted}>
          {t.getStarted}
        </NavItemMemo>

        <MobileToggle onClick={toggleMenu}>☰</MobileToggle>
      </HeaderRight>

      {/* Mobile Navigation Menu */}
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
        <NavItemMemo
          $active={activeSection === SECTIONS.PRICING}
          onClick={() => handleNavClick(SECTIONS.PRICING)}
        >
          {t.pricing}
        </NavItemMemo>
        <NavItemMemo $active={false} onClick={handleGetStarted}>
          {t.getStarted}
        </NavItemMemo>
      </NavMenuMobile>
    </HeaderWrapper>
  );
}

export default memo(Header);
