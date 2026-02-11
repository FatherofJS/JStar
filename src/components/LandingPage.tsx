import { useEffect, useMemo, useRef } from "react";
import styled, { keyframes } from "styled-components";

export default function LandingPage() {
  const aboutRef = useRef(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 2,
      })),
    []
  );



  useEffect(() => {
    const sections = document.querySelectorAll(".zoom-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("zoom-in");
            entry.target.classList.remove("zoom-out");
          } else {
            entry.target.classList.remove("zoom-in");
            entry.target.classList.add("zoom-out");
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper>
      <Galaxy>
        {stars.map((s) => (
          <span
            key={s.id}
            className="shooting-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </Galaxy>

      
      <SectionHero className="zoom-section zoom-in">
        <Content>
          <h1>
            <span>JSTAR</span>
            <br /> KNOW YOUR STAR
          </h1>

          <p>
            CHOOSE YOUR DAY OF BIRTH TO SEE YOUR PERSONALIZED ASTROLOGY
            CHART AND INSIGHTS.
          </p>

          <Actions>
            <SpaceButton />
          </Actions>
        </Content>
      </SectionHero>

      
      <SectionAbout ref={aboutRef} className="zoom-section">
        <AboutBox>
          <h2>About JSTAR</h2>
          <p>
            JSTAR is a modern astrology platform designed to help you
            discover your cosmic identity through personalized birth charts
            and celestial insights.
          </p>
        </AboutBox>
      </SectionAbout>

      
      <SectionExtra className="zoom-section">
        <AboutBox>
          <h2>Birth Chart Analysis</h2>
          <p>
            Explore your planetary alignment and understand your strengths,
            emotions, and destiny path.
          </p>
        </AboutBox>
      </SectionExtra>

      
      <SectionExtra className="zoom-section">
        <AboutBox>
          <h2>Cosmic Forecast</h2>
          <p>
            Get personalized astrological predictions based on your unique
            birth data.
          </p>
        </AboutBox>
      </SectionExtra>
    </Wrapper>
  );
}



const SpaceButton = () => {
  return (
    <StyledWrapper>
      <button type="button" className="btn">
        <strong>GET START</strong>
        <div className="container-stars">
          <div className="stars" />
        </div>
      </button>
    </StyledWrapper>
  );
};



const shoot = keyframes`
  0% { transform: translate(0,0) rotate(-45deg); opacity: 0 }
  10% { opacity: 1 }
  100% { transform: translate(-320px,320px) rotate(-45deg); opacity: 0 }
`;

const zoomScrollIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
    filter: blur(10px);
  }
  to {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
`;

const zoomScrollOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9);
    opacity: 0.4;
  }
`;



const Wrapper = styled.div`
  min-height: 400vh;
  background: radial-gradient(circle at top, #0b0f2f, #000);
  color: white;
  position: relative;
  overflow-x: hidden;

  .zoom-section {
    transition: transform 0.8s ease, opacity 0.8s ease, filter 0.8s ease;
    will-change: transform, opacity;
  }

  .zoom-in {
    animation: ${zoomScrollIn} 1s ease forwards;
  }

  .zoom-out {
    animation: ${zoomScrollOut} 0.8s ease forwards;
  }
`;

const Galaxy = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  .shooting-star {
    position: absolute;
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, white, rgba(255,255,255,0));
    filter: drop-shadow(0 0 6px white);
    animation: ${shoot} linear infinite;
    will-change: transform, opacity;
  }
`;

const SectionHero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const SectionAbout = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const SectionExtra = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Content = styled.div`
  padding: 0 10vw;
  max-width: 900px;

  h1 {
    font-size: clamp(42px, 6vw, 80px);

    span {
      color: #7aa2ff;
    }
  }

  p {
    max-width: 520px;
    font-size: 18px;
    margin-top: 20px;
    opacity: 0.85;
  }
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 16px;
`;

const AboutBox = styled.div`
  width: 80%;
  padding: 60px;
  border-radius: 24px;
  background: rgba(15,20,50,0.55);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.08);
`;

const StyledWrapper = styled.div`
  position: relative;

  .btn {
    width: 13rem;
    height: 3rem;
    border-radius: 5rem;
    border: double 4px transparent;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(137deg,#ffdb3b,#fe53bb,#8f51ea,#0044ff);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: 0.4s;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  strong {
    font-size: 12px;
    letter-spacing: 4px;
  }

  .container-stars {
    position: absolute;
    inset: 0;
    border-radius: 5rem;
    overflow: hidden;
  }

  .stars {
    width: 200rem;
    height: 200rem;
  }

  .stars::before,
  .stars::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  .stars::before {
    animation: starMove 60s linear infinite;
    opacity: 0.5;
  }

  .stars::after {
    animation: starRotate 90s linear infinite;
  }

  @keyframes starMove {
    from { transform: translateY(0); }
    to { transform: translateY(-135rem); }
  }

  @keyframes starRotate {
    from { transform: rotate(360deg); }
    to { transform: rotate(0); }
  }
`;
