import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const SaveButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideMenu = menuRef.current?.contains(target);
      const clickedInsideButton = buttonRef.current?.contains(target);

      if (!clickedInsideMenu && !clickedInsideButton) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <StyledWrapper>
      <div style={{ position: 'relative' }}>
        <button className="Btn" onClick={toggleMenu} ref={buttonRef}>
          <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
          <span className="icon2" />
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="tooltip">
            <div className="left line">
              <h5 className="text12 text123">Download</h5>
            </div>
            <div className="left space">
              <h5 className="text12 text124">File Types</h5>
              <select className="sesize">
                <option value="png">PNG</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div className="left space">
              <h5 className="text12 text124">Select chart</h5>
              <select className="sesize">
                <option value="natal">Natal Chart</option>
                <option value="synastry">Synastry Chart</option>
              </select>
            </div>
            <h5 className="left text12 buttonD text123">Download</h5>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: rgb(27, 27, 27);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);
  }

  .svgIcon {
    fill: rgb(214, 178, 255);
  }

  .icon2 {
    width: 18px;
    height: 5px;
    border-bottom: 2px solid rgb(182, 143, 255);
    border-left: 2px solid rgb(182, 143, 255);
    border-right: 2px solid rgb(182, 143, 255);
  }


  .Btn:hover {
    background-color: rgb(150, 94, 255);
    transition-duration: .3s;
  }

  .Btn:hover .icon2 {
    border-bottom: 2px solid rgb(235, 235, 235);
    border-left: 2px solid rgb(235, 235, 235);
    border-right: 2px solid rgb(235, 235, 235);
  }

  .Btn:hover .svgIcon {
    fill: rgb(255, 255, 255);
    animation: slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
      opacity: 1;
    }



    
  }`;

export default SaveButton;
