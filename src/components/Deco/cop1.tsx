import React from 'react';
import styled from 'styled-components';












interface ThemeSwitchProps {
    isDark: boolean;
    onToggle: () => void;
}

const Switch: React.FC<ThemeSwitchProps> = ({ isDark, onToggle }) => {
    return (
        <StyledWrapper onClick={onToggle}>
            <label className="bb8-toggle">
                <input
                    className="bb8-toggle__checkbox"
                    type="checkbox"
                    checked={!isDark}
                    onChange={onToggle}
                />
                <div className="bb8-toggle__container">
                    <div className="bb8-toggle__scenery">
                        <div className="bb8-toggle__star" />
                        <div className="bb8-toggle__star" />
                        <div className="bb8-toggle__star" />
                        <div className="bb8-toggle__star" />
                        <div className="bb8-toggle__star" />
                        <div className="bb8-toggle__star" />
                        <div className="bb8-toggle__star" />
                        <div className="tatto-1" />
                        <div className="tatto-2" />
                        <div className="gomrassen" />
                        <div className="hermes" />
                        <div className="chenini" />
                        <div className="bb8-toggle__cloud" />
                        <div className="bb8-toggle__cloud" />
                        <div className="bb8-toggle__cloud" />
                    </div>
                    <div className="bb8">
                        <div className="bb8__head-container">
                            <div className="bb8__antenna" />
                            <div className="bb8__antenna" />
                            <div className="bb8__head" />
                        </div>
                        <div className="bb8__body" />
                    </div>
                    <div className="artificial__hidden">
                        <div className="bb8__shadow" />
                    </div>
                </div>
            </label>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  cursor: pointer;
  
  /* REMASTERED */
  /* RTX-ON */
  /* completely redone toggle and droid */

  .bb8-toggle {
    --toggle-size: 14px;
    /* finally I removed the scale now everything depends on the font-size */
    /* --margin-top-for-head: 1.75em; */
    /* it's just in case 👆 */
    --toggle-width: 52px;
    --toggle-height: 28px;
    --toggle-offset: calc((var(--toggle-height) - var(--bb8-diameter)) / 2);
    --toggle-bg: linear-gradient(#2c4770, #070e2b 35%, #628cac 50% 70%, #a6c5d4)
      no-repeat;
    --bb8-diameter: 22px;
    --radius: 99em;
    --transition: 0.4s;
    --accent: #de7d2f;
    --bb8-bg: #fff;
  }

  .bb8-toggle,
  .bb8-toggle *,
  .bb8-toggle *::before,
  .bb8-toggle *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .bb8-toggle {
    cursor: pointer;
    margin-top: var(--margin-top-for-head);
    font-size: var(--toggle-size);
  }

  .bb8-toggle__checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
  }

  .bb8-toggle__container {
    width: var(--toggle-width);
    height: var(--toggle-height);
    background: var(--toggle-bg);
    background-size: 100% calc(var(--toggle-height) * 2);
    background-position-y: calc(var(--toggle-height) * -0.5);
    border-radius: var(--radius);
    position: relative;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .bb8 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    top: calc(var(--toggle-offset) - 8px + 1px);
    left: var(--toggle-offset);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    z-index: 2;
  }

  .bb8__head-container {
    position: relative;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    z-index: 2;
    -webkit-transform-origin: 6px 18px;
    -ms-transform-origin: 6px 18px;
    transform-origin: 6px 18px;
  }

  .bb8__head {
    overflow: hidden;
    margin-bottom: -1px;
    width: 12px;
    height: 8px;
    background: linear-gradient(
        transparent 1px,
        dimgray 1px 5px,
        transparent 5px 6px,
        var(--accent) 6px 8px,
        transparent 8px 21px,
        silver 21px 23px,
        transparent 23px
      ),
      linear-gradient(
        45deg,
        transparent 3px,
        var(--bb8-bg) 3px 20px,
        transparent 20px
      ),
      linear-gradient(
        -45deg,
        transparent 3px,
        var(--bb8-bg) 3px 20px,
        transparent 20px
      ),
      linear-gradient(var(--bb8-bg) 20px, transparent 20px);
    border-radius: var(--radius) var(--radius) 0 0;
    position: relative;
    z-index: 1;
    -webkit-filter: drop-shadow(0 1px 2px gray);
    filter: drop-shadow(0 1px 2px gray);
  }

  .bb8__head::before {
    content: "";
    position: absolute;
    width: 3px;
    height: 3px;
    background: radial-gradient(
        2px circle at 1px 2px,
        red,
        transparent
      ),
      radial-gradient(
        2px circle at 2px 1px,
        var(--bb8-bg) 50%,
        transparent 100%
      ),
      linear-gradient(45deg, #000 3px, dimgray 5px 6px, #000 8px);
    border-radius: var(--radius);
    top: 2px;
    left: 50%;
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    transform: translate(-50%);
    -webkit-box-shadow: 0 0 0 1px lightgray, 3px 1px 0 -2px,
      3px 1px 0 -1px var(--bb8-bg), 3px 1px 0 -0.5px;
    box-shadow: 0 0 0 1px lightgray, 3px 1px 0 -2px,
      3px 1px 0 -1px var(--bb8-bg), 3px 1px 0 -0.5px;
    z-index: 1;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .bb8__head::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      var(--accent) 2px,
      transparent 2px 3px,
      var(--accent) 3px 5px,
      transparent 5px 6px,
      var(--accent) 6px 15px,
      transparent 15px 16px,
      var(--accent) 16px 18px,
      transparent 18px 30px,
      var(--accent) 30px 32px,
      transparent 32px 33px,
      var(--accent) 33px 36px,
      transparent 36px 37px,
      var(--accent) 37px 38px,
      transparent 38px 39px,
      var(--accent) 39px
    );
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .bb8__antenna {
    position: absolute;
    -webkit-transform: translateY(-90%);
    -ms-transform: translateY(-90%);
    transform: translateY(-90%);
    width: 1px;
    border-radius: var(--radius) var(--radius) 0 0;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .bb8__antenna:nth-child(1) {
    height: 5px;
    right: 5px;
    background: linear-gradient(#000 3px, silver 3px);
  }

  .bb8__antenna:nth-child(2) {
    height: 2px;
    left: 50%;
    -webkit-transform: translate(-50%, -90%);
    -ms-transform: translate(-50%, -90%);
    transform: translate(-50%, -90%);
    background: silver;
  }

.bb8__body {
  width: var(--bb8-diameter);
  height: var(--bb8-diameter);
  background: var(--bb8-bg);
  border-radius: var(--radius);
    position: relative;
    overflow: hidden;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    z-index: 1;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    background: linear-gradient(
        -90deg,
        var(--bb8-bg) 4%,
        var(--accent) 4% 10%,
        transparent 10% 90%,
        var(--accent) 90% 96%,
        var(--bb8-bg) 96%
      ),
      linear-gradient(
        var(--bb8-bg) 4%,
        var(--accent) 4% 10%,
        transparent 10% 90%,
        var(--accent) 90% 96%,
        var(--bb8-bg) 96%
      ),
      linear-gradient(
        to right,
        transparent 11px,
        silver 11px 11.5px,
        transparent 11.5px
      ),
      linear-gradient(
        transparent 11px,
        silver 11px 11.5px,
        transparent 11.5px
      );
    background-color: var(--bb8-bg);
  }

  .bb8__body::after {
    content: "";
    bottom: 8px;
    left: 3px;
    position: absolute;
    width: 1px;
    height: 1px;
    background: rgb(236, 236, 236);
    color: rgb(236, 236, 236);
    border-radius: 50%;
    -webkit-box-shadow: 5px 5px, 0 -7px, 5px -12px,
      12px -12px, 17px -7px, 17px 0, 12px 5px;
    box-shadow: 5px 5px, 0 -7px, 5px -12px, 12px -12px, 17px -7px, 17px 0, 12px 5px;
  }

  .bb8__body::before {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    border-radius: 50%;
    z-index: 0.1;
    overflow: hidden;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border: 2px solid var(--accent);
    background: radial-gradient(
        5px circle at center,
        rgb(236, 236, 236) 50%,
        transparent 51%
      ),
      radial-gradient(
        6px circle at center,
        var(--bb8-bg) 50%,
        transparent 51%
      ),
      linear-gradient(
        -90deg,
        transparent 42%,
        var(--accent) 42% 58%,
        transparent 58%
      ),
      linear-gradient(var(--bb8-bg) 42%, var(--accent) 42% 58%, var(--bb8-bg) 58%);
  }

  .artificial__hidden {
    position: absolute;
    border-radius: inherit;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bb8__shadow {
    content: "";
    width: var(--bb8-diameter);
    height: 20%;
    border-radius: 50%;
    background: #3a271c;
    -webkit-box-shadow: 2px 0 20px #3a271c;
    box-shadow: 2px 0 20px #3a271c;
    opacity: 0.25;
    position: absolute;
    bottom: 0;
    left: calc(var(--toggle-offset) - 5px);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    -webkit-transform: skew(-70deg);
    -ms-transform: skew(-70deg);
    transform: skew(-70deg);
    z-index: 1;
  }

  .bb8-toggle__scenery {
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    position: relative;
    border-radius: inherit;
  }

  .bb8-toggle__scenery::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    background: #b18d71;
    z-index: 1;
  }

  .bb8-toggle__cloud {
    z-index: 1;
    position: absolute;
    border-radius: 50%;
  }

  .bb8-toggle__cloud:nth-last-child(1) {
    width: 5px;
    height: 4px;
    right: 10px;
    top: 15px;
    background: linear-gradient(to top right, #ffffffae, #ffffffae);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .bb8-toggle__cloud:nth-last-child(2) {
    top: 3px;
    right: 22px;
    width: 5px;
    height: 2px;
    background: #dfdedeae;
    -webkit-transition: 0.6s;
    -o-transition: 0.6s;
    transition: 0.6s;
  }

  .bb8-toggle__cloud:nth-last-child(3) {
    top: 6px;
    right: 5px;
    width: 5px;
    height: 2px;
    background: #ffffffae;
    -webkit-transition: 0.8s;
    -o-transition: 0.8s;
    transition: 0.8s;
  }

  .gomrassen,
  .hermes,
  .chenini {
    position: absolute;
    border-radius: var(--radius);
    background: linear-gradient(#fff, #6e8ea2);
    top: 100%;
  }

  .gomrassen {
    left: 5px;
    width: 10px;
    height: 10px;
    -webkit-box-shadow: 0 0 1px #ffffff52, 0 0 1px #6e8ea24b;
    box-shadow: 0 0 1px #ffffff52, 0 0 1px #6e8ea24b;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .gomrassen::before,
  .gomrassen::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    -webkit-box-shadow: inset 0 0 1px rgb(140, 162, 169);
    box-shadow: inset 0 0 1px rgb(140, 162, 169);
    background: rgb(184, 196, 200);
  }

  .gomrassen::before {
    left: 2px;
    top: 2px;
    width: 2px;
    height: 2px;
  }

  .gomrassen::after {
    width: 1px;
    height: 1px;
    left: 6px;
    top: 4px;
  }

  .hermes {
    left: 17px;
    width: 3px;
    height: 3px;
    -webkit-box-shadow: 0 0 1px #ffffff52, 0 0 1px #6e8ea24b;
    box-shadow: 0 0 1px #ffffff52, 0 0 1px #6e8ea24b;
    -webkit-transition: 0.6s;
    -o-transition: 0.6s;
    transition: 0.6s;
  }

  .chenini {
    left: 22px;
    width: 3px;
    height: 3px;
    -webkit-box-shadow: 0 0 1px #ffffff52, 0 0 1px #6e8ea24b;
    box-shadow: 0 0 1px #ffffff52, 0 0 1px #6e8ea24b;
    -webkit-transition: 0.8s;
    -o-transition: 0.8s;
    transition: 0.8s;
  }

  .tatto-1,
  .tatto-2 {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: var(--radius);
  }

  .tatto-1 {
    background: #fefefe;
    right: 15px;
    top: 3px;
    -webkit-box-shadow: 0 0 2px #fdf4e1;
    box-shadow: 0 0 2px #fdf4e1;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .tatto-2 {
    background: linear-gradient(#e6ac5c, #d75449);
    right: 6px;
    top: 11px;
    -webkit-box-shadow: 0 0 2px #e6ad5c3d, 0 0 2px #d755494f;
    box-shadow: 0 0 2px #e6ad5c3d, 0 0 2px #d755494f;
    -webkit-transition: 0.7s;
    -o-transition: 0.7s;
    transition: 0.7s;
  }

  .bb8-toggle__star {
    position: absolute;
    width: 1px;
    height: 1px;
    background: #fff;
    border-radius: var(--radius);
    -webkit-filter: drop-shadow(0 0 1px #fff);
    filter: drop-shadow(0 0 1px #fff);
    color: #fff;
    top: 100%;
  }

  .bb8-toggle__star:nth-child(1) {
    left: 18px;
    -webkit-box-shadow: 6px 5px, -6px 12px, 0 6px, 9px 3px, -15px 9px, 6px 14px;
    box-shadow: 6px 5px, -6px 12px, 0 6px, 9px 3px, -15px 9px, 6px 14px;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
  }

  .bb8-toggle__star:nth-child(2) {
    left: 23px;
    -webkit-box-shadow: 3px 0, 0 3px, -3px -3px, 3px 5px, -15px 6px, 6px -8px;
    box-shadow: 3px 0, 0 3px, -3px -3px, 3px 5px, -15px 6px, 6px -8px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
  }

  .bb8-toggle__star:nth-child(3) {
    left: 26px;
    -webkit-box-shadow: -3px -3px, -11px 6px, -11px 0,
      -18px -3px, -15px -3px, -12px -2px, 4px -3px;
    box-shadow: -3px -3px, -11px 6px, -11px 0, -18px -3px, -15px -3px, -12px -2px, 4px -3px;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  .bb8-toggle__star:nth-child(4) {
    left: 9px;
    width: 2px;
    height: 2px;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
  }

  .bb8-toggle__star:nth-child(5) {
    left: 25px;
    width: 2px;
    height: 2px;
    -webkit-transition: 0.6s;
    -o-transition: 0.6s;
    transition: 0.6s;
  }

  .bb8-toggle__star:nth-child(6) {
    left: 12px;
    width: 2px;
    height: 2px;
    -webkit-transition: 0.7s;
    -o-transition: 0.7s;
    transition: 0.7s;
  }

  .bb8-toggle__star:nth-child(7) {
    left: 17px;
    width: 2px;
    height: 2px;
    -webkit-transition: 0.8s;
    -o-transition: 0.8s;
    transition: 0.8s;
  }

  /* actions */

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(1) {
    top: 3px;
  }

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(2) {
    top: 9px;
  }

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(3) {
    top: 6px;
  }

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(4) {
    top: 17px;
  }

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(5) {
    top: 17px;
  }

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(6) {
    top: 2px;
  }

  .bb8-toggle__checkbox:checked
    + .bb8-toggle__container
    .bb8-toggle__star:nth-child(7) {
    top: 9px;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__cloud {
    right: -100%;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .gomrassen {
    top: 5px;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .hermes {
    top: 12px;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .chenini {
    top: 14px;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container {
    background-position-y: 0;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .tatto-1 {
    top: 100%;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .tatto-2 {
    top: 100%;
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8 {
    left: calc(100% - var(--bb8-diameter) - var(--toggle-offset));
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8__shadow {
    left: calc(100% - var(--bb8-diameter) - var(--toggle-offset) + 5px);
    -webkit-transform: skew(70deg);
    -ms-transform: skew(70deg);
    transform: skew(70deg);
  }

  .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8__body {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(225deg);
  }

  .bb8-toggle__checkbox:hover + .bb8-toggle__container .bb8__head::before {
    left: 100%;
  }

  .bb8-toggle__checkbox:not(:checked):hover
    + .bb8-toggle__container
    .bb8__antenna:nth-child(1) {
    right: 8px;
  }

  .bb8-toggle__checkbox:hover
    + .bb8-toggle__container
    .bb8__antenna:nth-child(2) {
    left: 5px;
  }

  .bb8-toggle__checkbox:hover + .bb8-toggle__container .bb8__head::after {
    background-position: 7px 0;
  }

  .bb8-toggle__checkbox:checked:hover
    + .bb8-toggle__container
    .bb8__head::before {
    left: 0;
  }

  .bb8-toggle__checkbox:checked:hover
    + .bb8-toggle__container
    .bb8__antenna:nth-child(2) {
    left: calc(100% - 5px);
  }

  .bb8-toggle__checkbox:checked:hover + .bb8-toggle__container .bb8__head::after {
    background-position: -7px 0;
  }

  .bb8-toggle__checkbox:active + .bb8-toggle__container .bb8__head-container {
    -webkit-transform: rotate(25deg);
    -ms-transform: rotate(25deg);
    transform: rotate(25deg);
  }

  .bb8-toggle__checkbox:checked:active
    + .bb8-toggle__container
    .bb8__head-container {
    -webkit-transform: rotate(-25deg);
    -ms-transform: rotate(-25deg);
    transform: rotate(-25deg);
  }

  .bb8:hover .bb8__head::before,
  .bb8:hover .bb8__antenna:nth-child(2) {
    left: 50% !important;
  }

  .bb8:hover .bb8__antenna:nth-child(1) {
    right: 5px !important;
  }

  .bb8:hover .bb8__head::after {
    background-position: 0 0 !important;
  }
`;

export default Switch;
