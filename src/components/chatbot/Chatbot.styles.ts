// Chatbot styled components with cosmic theme
import styled, { keyframes } from "styled-components";

// Animation for floating button
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

// Animation for message appear
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animation for typing indicator
const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

// Chat container fixed at bottom right
export const ChatContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: 'Space Grotesk', 'Inter', sans-serif;

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
  }
`;

// Floating button to toggle chat
export const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  box-shadow: 0 4px 20px rgba(120, 140, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(120, 140, 255, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 28px;
    height: 28px;
    color: white;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

// Chat window container
export const ChatWindow = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 380px;
  max-width: calc(100vw - 48px);
  height: 500px;
  max-height: calc(100vh - 100px);
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.9)')};
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    height: calc(100vh - 120px);
    bottom: 60px;
  }
`;

// Chat header
export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(120, 140, 255, 0.2), rgba(168, 85, 255, 0.2));
  border-bottom: 1px solid var(--glass-border);
`;

export const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChatAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const ChatTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatTitleText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
`;

export const ChatStatus = styled.span`
  font-size: 11px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
  }
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
    color: var(--text-secondary);
  }
`;

// Messages container
export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--glass-border);
    border-radius: 2px;
  }
`;

// Message bubble
export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-inverse);
  white-space: pre-wrap;
  animation: ${slideIn} 0.3s ease;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background: ${({ $isUser }) => 
    $isUser 
      ? 'linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid))' 
      : 'rgba(255, 255, 255, 0.08)'};
  border: 1px solid ${({ $isUser }) => 
    $isUser ? 'transparent' : 'var(--glass-border)'};
  border-bottom-${({ $isUser }) => $isUser ? 'right' : 'left'}-radius: 4px;
`;

// Typing indicator
export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  max-width: 60px;
`;

export const TypingDot = styled.span<{ $delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

// Input area
export const InputArea = styled.form`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid var(--glass-border);
  background: rgba(0, 0, 0, 0.2);
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    border-color: var(--hero-gradient-start);
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-mid));
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 18px;
    height: 18px;
    color: white;
  }
`;

// Welcome message styling
export const WelcomeMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--text-secondary);

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    color: var(--hero-gradient-start);
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-inverse);
    margin-bottom: 8px;
  }

  p {
    font-size: 13px;
    line-height: 1.5;
  }
`;

// Quick reply buttons
export const QuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 16px 12px;
`;

export const QuickReplyButton = styled.button`
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: rgba(120, 140, 255, 0.2);
    border-color: var(--hero-gradient-start);
    color: var(--text-inverse);
  }
`;

