// AuthModal styled components with premium cosmic theme
import styled, { keyframes } from "styled-components";

// Premium animations
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const modalEnter = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const modalExit = keyframes`
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
`;

const inputFocus = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(124, 140, 255, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(124, 140, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(124, 140, 255, 0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
`;

const starGlow = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

// Main modal overlay with blur backdrop
export const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 15, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? modalExit : modalEnter)} 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
`;

// Premium modal container with cosmic theme
export const ModalContainer = styled.div<{ $isClosing: boolean }>`
  position: relative;
  width: 90%;
  max-width: 440px;
  background: linear-gradient(160deg, 
    rgba(20, 22, 40, 0.98) 0%, 
    rgba(10, 12, 25, 0.98) 50%,
    rgba(15, 18, 35, 0.98) 100%
  );
  border-radius: 28px;
  border: 1px solid rgba(124, 140, 255, 0.15);
  box-shadow: 
    0 30px 100px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(124, 140, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(124, 140, 255, 0.3), 
      transparent
    );
  }

  animation: ${({ $isClosing }) => ($isClosing ? modalExit : 'none')} 0.35s ease forwards;
  animation-delay: ${({ $isClosing }) => ($isClosing ? '0s' : '0.1s')};
`;

// Decorative cosmic background elements
export const CosmicBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at 30% 20%,
      rgba(124, 140, 255, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 70% 80%,
      rgba(192, 132, 252, 0.05) 0%,
      transparent 40%
    );
  }
`;

export const Star = styled.div<{ $top: string; $left: string; $size: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: white;
  border-radius: 50%;
  animation: ${starGlow} ${({ $size }) => 2 + $size / 2}s ease-in-out infinite;
  animation-delay: ${({ $size }) => $size * 0.3}s;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: rotate(90deg) scale(1.05);
    border-color: rgba(124, 140, 255, 0.3);
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  padding: 36px 36px 20px;
  position: relative;
`;

export const Logo = styled.div`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 6px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 25%, #818cf8 50%, #a5b4fc 75%, #c4b5fd 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${shimmer} 4s linear infinite;
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

export const TabContainer = styled.div`
  display: flex;
  margin: 0 28px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 14px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  background: ${({ $active }) => ($active 
    ? 'linear-gradient(135deg, rgba(124, 140, 255, 0.25), rgba(124, 140, 255, 0.15))' 
    : 'transparent'
  )};
  color: ${({ $active }) => ($active ? 'white' : 'rgba(255, 255, 255, 0.4)')};
  border: 1px solid ${({ $active }) => ($active 
    ? 'rgba(124, 140, 255, 0.3)' 
    : 'transparent'
  )};

  &:hover {
    color: white;
    background: ${({ $active }) => ($active 
      ? 'linear-gradient(135deg, rgba(124, 140, 255, 0.25), rgba(124, 140, 255, 0.15))' 
      : 'rgba(255, 255, 255, 0.05)'
    )};
  }
`;

export const Form = styled.form`
  padding: 0 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const InputLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  &:focus {
    outline: none;
    border-color: rgba(124, 140, 255, 0.5);
    background: rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 0 4px rgba(124, 140, 255, 0.1), 0 0 30px rgba(124, 140, 255, 0.08);
    animation: ${inputFocus} 0.6s ease;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
  background-size: 200% auto;
  color: white;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 35px rgba(99, 102, 241, 0.4);
    background-position: right center;
    
    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.08), 
      transparent
    );
  }

  span {
    color: rgba(255, 255, 255, 0.3);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialButton = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ErrorMessage = styled.span<{ $shake?: boolean }>`
  display: block;
  color: #f87171;
  font-size: 12px;
  margin-top: 6px;
  font-weight: 500;
  animation: ${({ $shake }) => ($shake ? shake : 'none')} 0.5s ease;
`;

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: rgba(124, 140, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-align: right;
  width: 100%;
  margin-top: 4px;
  transition: color 0.3s ease;
  align-self: flex-end;

  &:hover {
    color: rgba(124, 140, 255, 0.9);
    text-decoration: underline;
  }
`;

export const Footer = styled.div`
  text-align: center;
  padding: 0 32px 24px;
  color: rgba(255, 255, 255, 0.35);
  font-size: 13px;
  
  a {
    color: rgba(124, 140, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
`;

