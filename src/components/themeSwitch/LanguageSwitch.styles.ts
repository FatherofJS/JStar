import styled from "styled-components";

export const LanguageSwitchWrapper = styled.div`
  position: relative;
`;

export const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--nav-item-hover);
    border-color: var(--nav-item-active);
  }
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 150px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 40px var(--shadow-color);
  z-index: 1000;
`;

export const LanguageOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: ${(props) => (props.$active ? "var(--nav-item-hover)" : "transparent")};
  border: none;
  border-radius: 8px;
  color: ${(props) => (props.$active ? "var(--nav-item-active)" : "var(--text-primary)")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--nav-item-hover);
    color: var(--nav-item-active);
  }
`;

