import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { landingContent } from "../../data/landingData";
import ThemeSwitch from "../layout/ThemeSwitch";
import { useTheme } from "../../theme";
import { useScrollPosition } from "../../hooks/useScroll";
import { SECTIONS } from "../../constants";
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

// Remove HeaderProps

// Header now handles its own activeSection observation
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Removed useSectionObserver tracking to hit 0 scroll renders as requested
  // const { activeSection } = useSectionObserver();
  const { isScrolled } = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  
  // Hardcode activeSection to home as string to prevent dynamic layout recalcs
  const activeSection = "home" as string;
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
            $active={activeSection === 'about'}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </NavItemMemo>
          <NavItemMemo
            $active={activeSection === SECTIONS.FEATURES || ['natal', 'synastry', 'chatbot'].includes(activeSection)}
            onClick={() => handleNavClick(SECTIONS.FEATURES)}
          >
            {t.features}
          </NavItemMemo>
          <NavItemMemo
            $active={activeSection === SECTIONS.DOCS}
            onClick={() => handleNavClick(SECTIONS.DOCS)}
          >
            {t.docs}
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
          $active={activeSection === 'about'}
          onClick={() => handleNavClick('about')}
        >
          About Us
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.FEATURES || ['natal', 'synastry', 'chatbot'].includes(activeSection)}
          onClick={() => handleNavClick(SECTIONS.FEATURES)}
        >
          {t.features}
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.DOCS}
          onClick={() => handleNavClick(SECTIONS.DOCS)}
        >
          {t.docs}
        </NavItemMemo>
        <NavItemMemo $active={false} onClick={handleGetStarted}>
          {t.getStarted}
        </NavItemMemo>
      </NavMenuMobile>
    </HeaderWrapper>
  );
}

export default memo(Header);
