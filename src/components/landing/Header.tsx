// Header Component - Navigation với logo, menu, theme switch, user menu

import { memo, useCallback, useEffect, useState } from "react";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
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
  UserMenuWrapper,
  UserInfoButton,
  UserAvatar,
  UserName,
  UserMenuDropdown,
  UserMenuSection,
  UserMenuLabel,
  UserMenuName,
  UserMenuEmail,
  UserMenuItem,
  UserMenuDivider,
} from "./styles/Header.styles.ts";

// SVG Icons
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

interface HeaderProps {
  onOpenAuthModal: () => void;
  onOpenChangePassword: () => void;
}

function Header({
  onOpenAuthModal,
  onOpenChangePassword,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isScrolled } = useScrollPosition();
  const { activeSection } = useSectionObserver();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const closeUserMenu = useCallback(() => {
    setIsUserMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Handle click outside user menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest(".user-menu-container")) {
          closeUserMenu();
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen, closeUserMenu]);

  // We don't have direct refs here, but we can use the navigate for now
  const handleNavClick = useCallback((sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }, []);

  return (
    <HeaderWrapper $scrolled={isScrolled}>
      <HeaderLeft>
        <Logo onClick={() => handleNavClick(SECTIONS.HOME)}>JSTAR</Logo>

        <NavMenu>
          <NavItemMemo
            $active={activeSection === SECTIONS.HOME}
            onClick={() => handleNavClick(SECTIONS.HOME)}
          >
            Home
          </NavItemMemo>
          <NavItemMemo
            $active={activeSection === SECTIONS.FEATURES}
            onClick={() => handleNavClick(SECTIONS.FEATURES)}
          >
            Features
          </NavItemMemo>
          <NavItemMemo
            $active={activeSection === SECTIONS.PRICING}
            onClick={() => handleNavClick(SECTIONS.PRICING)}
          >
            Pricing
          </NavItemMemo>

        </NavMenu>
      </HeaderLeft>

      <HeaderRight>
        <ThemeSwitch isDark={theme === "dark"} onToggle={toggleTheme} />

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

              <UserMenuItem
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenChangePassword();
                }}
              >
                <LockIcon />
                Change Password
              </UserMenuItem>

              <UserMenuDivider />

              <UserMenuItem onClick={handleLogout} $danger>
                <LogoutIcon />
                Logout
              </UserMenuItem>
            </UserMenuDropdown>
          </UserMenuWrapper>
        ) : (
          <NavItemMemo $active={false} onClick={onOpenAuthModal}>
            Login
          </NavItemMemo>
        )}

        <MobileToggle onClick={toggleMenu}>☰</MobileToggle>
      </HeaderRight>

      {/* Mobile Navigation Menu */}
      <NavMenuMobile $open={isOpen}>
        <NavItemMemo
          $active={activeSection === SECTIONS.HOME}
          onClick={() => handleNavClick(SECTIONS.HOME)}
        >
          Home
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.FEATURES}
          onClick={() => handleNavClick(SECTIONS.FEATURES)}
        >
          Features
        </NavItemMemo>
        <NavItemMemo
          $active={activeSection === SECTIONS.PRICING}
          onClick={() => handleNavClick(SECTIONS.PRICING)}
        >
          Pricing
        </NavItemMemo>
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

              <UserMenuItem
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenChangePassword();
                }}
              >
                <LockIcon />
                Change Password
              </UserMenuItem>

              <UserMenuDivider />

              <UserMenuItem onClick={handleLogout} $danger>
                <LogoutIcon />
                Logout
              </UserMenuItem>
            </UserMenuDropdown>
          </UserMenuWrapper>
        ) : (
          <NavItemMemo $active={false} onClick={onOpenAuthModal}>
            Login
          </NavItemMemo>
        )}
      </NavMenuMobile>
    </HeaderWrapper>
  );
}

export default memo(Header);

