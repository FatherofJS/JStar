import styled from "styled-components";
import { IconMessageCircle2, IconX } from "@tabler/icons-react";

const FAB = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  cursor: pointer;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 14px 30px rgba(99, 102, 241, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(90deg)' : 'rotate(0)'};
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    opacity: ${({ $isOpen }) => $isOpen ? 0 : 1}; /* Hide FAB completely when open on mobile since it goes full screen */
    pointer-events: ${({ $isOpen }) => $isOpen ? 'none' : 'auto'};
  }
`;

interface ChatFABProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatFAB({ isOpen, onClick }: ChatFABProps) {
  return (
    <FAB $isOpen={isOpen} onClick={onClick}>
      {isOpen ? <IconX size={28} /> : <IconMessageCircle2 size={28} />}
    </FAB>
  );
}
