import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
`;

export const SpotlightHole = styled.div.attrs<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $borderRadius?: string;
}>((props) => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    width: `${props.$width}px`,
    height: `${props.$height}px`,
    borderRadius: props.$borderRadius || '14px',
  },
}))`
  position: fixed;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.65), 0 0 0 3px rgba(129, 140, 248, 0.5);
  z-index: 9999;
  pointer-events: none;
  touch-action: none;
`;

export const Tooltip = styled.div.attrs<{
  $top: number;
  $left: number;
}>((props) => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
  },
}))`
  position: fixed;
  z-index: 10000;
  width: 380px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  background: rgba(30, 41, 59, 1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: 18px;
  padding: 24px;
  backdrop-filter: blur(20px);
  pointer-events: auto;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 0 48px rgba(99, 102, 241, 0.08);

  [data-theme="light"] & {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(99, 102, 241, 0.18);
    box-shadow:
      0 24px 64px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(99, 102, 241, 0.06) inset;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    padding: 18px 20px;
  }
`;

export const TooltipTitle = styled.h4`
  font-size: 18px;
  font-weight: 800;
  color: #e2e8f0;
  margin: 0 0 10px;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 8px;

  [data-theme="light"] & {
    color: #1e293b;
  }
`;

export const TooltipDescription = styled.p`
  font-size: 14px;
  line-height: 1.75;
  color: #94a3b8;
  margin: 0 0 20px;
  white-space: pre-wrap;

  [data-theme="light"] & {
    color: #475569;
  }
`;

export const TooltipFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StepDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const StepDot = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => $active ? '18px' : '6px'};
  height: 6px;
  border-radius: 3px;
  background: ${({ $active }) => $active
    ? '#8b5cf6'
    : 'rgba(148, 163, 184, 0.25)'};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const TourButton = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${({ $primary }) =>
    $primary ? 'none' : '1px solid rgba(148, 163, 184, 0.15)'};
  background: ${({ $primary }) =>
    $primary
      ? '#7c3aed'
      : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ $primary }) =>
    $primary ? '#ffffff' : '#94a3b8'};

  &:hover {
    background: ${({ $primary }) =>
    $primary
      ? '#6d28d9'
      : 'rgba(255, 255, 255, 0.1)'};
    color: ${({ $primary }) =>
    $primary ? '#ffffff' : '#e2e8f0'};
  }

  &:active {
    transform: translateY(1px);
  }

  [data-theme="light"] & {
    background: ${({ $primary }) =>
    $primary
      ? '#7c3aed'
      : '#f8fafc'};
    border-color: ${({ $primary }) =>
    $primary ? 'transparent' : 'rgba(148, 163, 184, 0.2)'};
    color: ${({ $primary }) =>
    $primary ? '#ffffff' : '#475569'};

    &:hover {
      background: ${({ $primary }) =>
    $primary
      ? '#6d28d9'
      : '#f1f5f9'};
      color: ${({ $primary }) =>
    $primary ? '#ffffff' : '#1e293b'};
    }
  }
`;

export const HelpButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
  }

  [data-theme="light"] & {
    background: rgba(99, 102, 241, 0.08);
    color: #6366f1;
    border-color: rgba(99, 102, 241, 0.15);

    &:hover {
      background: rgba(99, 102, 241, 0.15);
    }
  }
`;
