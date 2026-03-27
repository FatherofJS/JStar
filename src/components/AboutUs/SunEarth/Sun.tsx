import styled from "styled-components";
import sun from "./sun.webp";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="section-banner-sun"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .section-banner-sun {
    height: 280px;
    width: 280px;
    position: relative;
    background-image: url(${sun});
    background-size: cover;
    background-position: left;
    border-radius: 50%;
    animation: sunRotate 60s linear 0s infinite;
    will-change: background-position;
    box-shadow:
      0px 0px 40px 20px RGBA(255, 140, 0, 0.8),
      -5px 0px 10px 1px #ffb453 inset,
      15px 2px 40px 20px #bb6d01c5 inset,
      -24px -2px 50px 25px #ffa265c2 inset,
      150px 0px 80px 35px #c55f00aa inset;
  }

  @keyframes sunRotate {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 560px 0;
    }
  }
`;

export default Card;
