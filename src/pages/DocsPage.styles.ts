import styled from "styled-components";

export const PageShell = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  position: relative;
`;

export const DocsLayout = styled.div`
  display: flex;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 104px 24px 60px;
  gap: 0;
  min-height: 100vh;

  @media (max-width: 900px) {
    flex-direction: column;
    padding-top: 80px;
  }
`;

export const Sidebar = styled.aside`
  position: sticky;
  top: 100px;
  align-self: flex-start;
  width: 250px;
  flex-shrink: 0;
  padding: 20px 16px;
  background: rgba(30, 35, 60, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  [data-theme="light"] & {
    background: rgba(241, 245, 249, 0.85);
    border-color: rgba(148, 163, 184, 0.2);
  }

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    gap: 4px;
    padding: 10px;
    border-radius: 12px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SidebarItem = styled.button<{ $active?: boolean }>`
  all: unset;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#fff" : "var(--text-secondary)")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.4))"
      : "transparent"};
  transition: all 0.2s ease;
  line-height: 1.4;

  &:hover {
    background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.4))"
      : "rgba(255, 255, 255, 0.05)"};
    color: var(--text-primary);
  }

  [data-theme="light"] & {
    color: ${({ $active }) => ($active ? "#fff" : "#475569")};
    background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
      : "transparent"};

    &:hover {
      background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
      : "rgba(99, 102, 241, 0.08)"};
    }
  }

  @media (max-width: 900px) {
    white-space: nowrap;
    padding: 8px 14px;
    font-size: 12px;
  }
`;

export const ContentPanel = styled.main`
  flex: 1;
  min-width: 0;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 900px) {
    margin-left: 0;
    margin-top: 16px;
  }
`;

export const AccordionItem = styled.div`
  scroll-margin-top: 110px;
`;

export const AccordionHeader = styled.button<{ $open: boolean }>`
  all: unset;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 2px solid rgba(120, 140, 255, 0.15);

  [data-theme="light"] & {
    border-bottom-color: rgba(30, 41, 59, 0.12);
  }

  &:hover {
    border-bottom-color: rgba(120, 140, 255, 0.35);

    [data-theme="light"] & {
      border-bottom-color: rgba(99, 102, 241, 0.3);
    }
  }
`;

export const AccordionTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.3px;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

export const Chevron = styled.span<{ $open: boolean }>`
  font-size: 20px;
  color: var(--text-secondary);
  transition: transform 0.25s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  flex-shrink: 0;
  margin-left: 16px;
  display: flex;
  align-items: center;
`;

export const AccordionBody = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "2000px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 0.35s ease, opacity 0.25s ease;
  padding: ${({ $open }) => ($open ? "20px 0 32px" : "0")};
`;

export const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0 0 14px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 1.65;
  }
`;
