import styled, { keyframes } from "styled-components";

export const DocsWrapper = styled.section`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 24px;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

export const DocsHeading = styled.h2`
  font-size: 36px;
  font-weight: 800;
  text-align: center;
  margin: 0 0 48px;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  @media (max-width: 600px) {
    font-size: 26px;
    margin-bottom: 32px;
  }
`;

export const DocsLayout = styled.div`
  display: flex;
  gap: 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.nav`
  width: 260px;
  flex-shrink: 0;
  padding: 32px 24px;
  background: rgba(28, 26, 48, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: flex-start;
  backdrop-filter: blur(12px);

  [data-theme="light"] & {
    background: rgba(248, 250, 252, 0.85);
    border-color: rgba(148, 163, 184, 0.15);
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    gap: 16px;
    padding: 16px;
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
  padding: 8px 0;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#e2e8f0" : "#64748b")};
  transition: all 0.25s ease;
  line-height: 1.5;

  &:hover {
    color: #f8fafc;
  }

  [data-theme="light"] & {
    color: ${({ $active }) => ($active ? "#0f172a" : "#64748b")};

    &:hover {
      color: #334155;
    }
  }

  @media (max-width: 900px) {
    white-space: nowrap;
    padding: 4px 12px;
    font-size: 14px;
  }
`;

export const ContentBox = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 48px;
  min-height: 400px; /* Base height to visually match typical sidebar height */
  
  background: rgba(28, 26, 48, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  padding: 48px;
  backdrop-filter: blur(12px);

  [data-theme="light"] & {
    background: rgba(255, 255, 255, 0.6);
    border-color: rgba(148, 163, 184, 0.2);
  }

  @media (max-width: 900px) {
    margin-left: 0;
    margin-top: 24px;
    padding: 32px 24px;
    min-height: 300px;
  }
`;

const slideFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedContent = styled.div`
  animation: ${slideFadeIn} 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
`;

export const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 24px;
  letter-spacing: 0.3px;

  [data-theme="light"] & {
    color: #1e293b;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const SectionImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  opacity: 0.9;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  [data-theme="light"] & {
    border-color: rgba(148, 163, 184, 0.2);
  }

  @media (max-width: 600px) {
    max-height: 200px;
    border-radius: 8px;
  }
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #94a3b8;
  margin: 0 0 16px;

  &:last-child {
    margin-bottom: 0;
  }

  [data-theme="light"] & {
    color: #475569;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    line-height: 1.7;
  }
`;
