// ImageZoomModal Component - Hiển thị ảnh to khi click

import { useEffect, useCallback } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.3s ease;
  padding: 16px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ZoomedImage = styled.img`
  max-width: 90vw;
  max-height: 90dvh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: scaleIn 0.3s ease;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: calc(100dvh - 88px);
    border-radius: 12px;
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: max(12px, env(safe-area-inset-top));
    right: 12px;
  }
`;

interface ImageZoomModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageZoomModal({ src, alt, onClose }: ImageZoomModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  return (
    <Overlay onClick={onClose}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <ZoomedImage src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
    </Overlay>
  );
}
