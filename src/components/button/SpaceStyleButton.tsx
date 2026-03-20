// SpaceStyleButton Component - Animated gradient button with star effects

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpaceStyleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const animStar = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-135rem);
  }
`;

const animStarRotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
`;

const gradient_301 = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse_3011 = keyframes`
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

const StyledWrapper = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16rem;
    overflow: hidden;
    height: 3.6rem;
    background-size: 300% 300%;
    cursor: pointer;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
    animation: ${gradient_301} 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(
        137.48deg,
        #ffdb3b 10%,
        #fe53bb 45%,
        #8f51ea 67%,
        #0044ff 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  #container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: background-color 0.3s ease;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
  }

  strong {
    z-index: 2;
    font-family: 'Avalors Personal Use', sans-serif;
    font-size: 14px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }

  #glow {
    position: absolute;
    display: flex;
    width: 15rem;
  }

  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: ${pulse_3011} 4s infinite;
    z-index: -1;
  }

  .circle:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
  }

  .circle:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
  }

  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }

  .btn:active .circle {
    background: #fe53bb;
  }

  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  #stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: ${animStarRotate} 90s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  #stars::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: ${animStar} 60s linear infinite;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }

  @media (max-width: 480px) {
    .btn {
      width: 14rem;
      height: 3.2rem;
    }
    strong {
      font-size: 12px;
    }
    #glow {
      width: 13rem;
    }
  }

  @media (max-width: 1280px), (prefers-reduced-motion: reduce) {
    .btn {
      animation: none;
      backdrop-filter: none;
    }

    #container-stars {
      display: none;
      backdrop-filter: none;
    }

    #glow {
      display: none;
    }

    .circle {
      animation: none;
      filter: blur(1rem);
    }

    .btn:hover {
      transform: none;
    }
  }

  [data-performance-mode="reduced"] & {
    .btn {
      animation: none;
      backdrop-filter: none;
    }

    #container-stars,
    #glow {
      display: none;
    }

    .btn:hover {
      transform: none;
    }
  }
`;

export const SpaceStyleButton: React.FC<SpaceStyleButtonProps> = ({ onClick, children }) => {
  return (
    <StyledWrapper>
      <button type="button" className="btn" onClick={onClick}>
        <strong>{children}</strong>
        <div id="container-stars">
          <div id="stars" />
        </div>
        <div id="glow">
          <div className="circle" />
          <div className="circle" />
        </div>
      </button>
    </StyledWrapper>
  );
};

export default SpaceStyleButton;

