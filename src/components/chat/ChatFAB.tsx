import styled from "styled-components";
import { IconSparkles, IconX } from "@tabler/icons-react";

const FAB = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 9999;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--bg-modifier-hover);
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(90deg)' : 'rotate(0)'};
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 52px;
    height: 52px;
    opacity: ${({ $isOpen }) => $isOpen ? 0 : 1};
    pointer-events: ${({ $isOpen }) => $isOpen ? 'none' : 'auto'};
  }
`;

interface ChatFABProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatFAB({ isOpen, onClick }: ChatFABProps) {
  return (
    <FAB $isOpen={isOpen} onClick={onClick} className="chat-fab-button">
      {isOpen ? <IconX size={26} /> : <IconSparkles size={26} />}
    </FAB>
  );
}
