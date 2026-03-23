import styled from "styled-components";
import Earth from "./Earth.jpg";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="section-banner"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .section-banner {
    height: 180px;
    width: 180px;
    position: relative;
    background-image: url(${Earth});
    background-size: cover;
    background-position: left;
    border-radius: 50%;
    animation: earthRotate 30s linear 0s infinite;
    will-change: background-position;
    box-shadow:
      0px 0 20px RGBA(255, 255, 255, 0.2),
      -5px 0px 8px #c3f4ff inset,
      15px 2px 25px #000 inset,
      -24px -2px 34px #c3f4ff99 inset,
      250px 0px 44px #00000066 inset,
      150px 0px 38px #000000aa inset;
  }
  @keyframes earthRotate {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 288px 0;
    }
  }
`;

export default Card;
