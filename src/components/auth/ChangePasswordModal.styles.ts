// Change Password Modal Styles

import styled, { keyframes } from "styled-components";

// =============================================================================
// KEYFRAMES
// =============================================================================

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// =============================================================================
// MODAL OVERLAY
// =============================================================================

export const ModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  /* Click outside to close */
  cursor: pointer;
`;

// =============================================================================
// MODAL CONTAINER
// =============================================================================

export const ModalContainer = styled.div<{ $open: boolean }>`
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(20px)')};
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  
  /* Allow clicks inside modal */
  cursor: default;
`;

// =============================================================================
// MODAL HEADER
// =============================================================================

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-inverse);
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-inverse);
  }
`;

// =============================================================================
// SUCCESS MESSAGE
// =============================================================================

export const SuccessMessage = styled.div`
  color: #4ade80;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: ${fadeIn} 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

// =============================================================================
// FORM
// =============================================================================

export const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputLabel = styled.label`
  font-size: 13px;
  color: var(--text-secondary);
`;

export const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--hero-gradient-start);
    box-shadow: 0 0 0 3px rgba(120, 140, 255, 0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

// =============================================================================
// ERROR MESSAGE
// =============================================================================

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 13px;
  text-align: center;
  padding: 8px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  animation: ${fadeIn} 0.2s ease;
`;

// =============================================================================
// SUBMIT BUTTON
// =============================================================================

export const SubmitButton = styled.button`
  padding: 14px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #787cff, #a85aff);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(120, 140, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

