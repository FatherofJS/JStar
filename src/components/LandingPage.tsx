import { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function LandingPage() {
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const chartRef = useRef(null);
    const forecastRef = useRef(null);

    const [active, setActive] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);

            if (window.innerWidth <= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const stars = useMemo(
        () =>
            Array.from({ length: 8 }, (_, i) => ({
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
                    const id = entry.target.getAttribute("data-section");

                    if (entry.isIntersecting) {
                        entry.target.classList.add("zoom-in");
                        entry.target.classList.remove("zoom-out");
                        if (id) setActive(id);
                    } else {
                        entry.target.classList.remove("zoom-in");
                        entry.target.classList.add("zoom-out");
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    function scrollTo({ ref }: { ref: any; }): void {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    }

    return (
        <Wrapper>

            <DynamicIsland $scrolled={isScrolled} $open={isOpen}>
                <MobileToggle onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </MobileToggle>

                <NavContainer $open={isOpen} $scrolled={isScrolled}>
                    <NavItem
                        $active={active === "home"}
                        $scrolled={isScrolled}
                        onClick={() => scrollTo({ ref: heroRef })}
                    >
                        Home
                    </NavItem>


                    <NavItem
                        $active={active === "about"}
                        $scrolled={isScrolled}
                        onClick={() => scrollTo({ ref: heroRef })}
                    >
                        About
                    </NavItem>


                    <NavItem
                        $active={active === "chart"}
                        onClick={() => scrollTo({ ref: chartRef })}
                    >
                        Chart
                    </NavItem>

                    <NavItem
                        $active={active === "forecast"}
                        $scrolled={isScrolled}
                        onClick={() => scrollTo({ ref: forecastRef })}
                    >
                        Forecast
                    </NavItem>
                </NavContainer>
            </DynamicIsland>


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


            <SectionHero
                ref={heroRef}
                data-section="home"
                className="zoom-section zoom-in"
            >
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


            <SectionAbout
                ref={aboutRef}
                data-section="about"
                className="zoom-section"
            >
                <AboutBox>
                    <h2>About JSTAR</h2>
                    <p>
                        JSTAR is a modern astrology platform designed to help you
                        discover your cosmic identity through personalized birth charts.
                    </p>
                </AboutBox>
            </SectionAbout>


            <SectionExtra
                ref={chartRef}
                data-section="chart"
                className="zoom-section"
            >
                <AboutBox>
                    <h2>Birth Chart Analysis</h2>
                    <p>
                        Explore your planetary alignment and understand your destiny path.
                    </p>
                </AboutBox>
            </SectionExtra>


            <SectionExtra
                ref={forecastRef}
                data-section="forecast"
                className="zoom-section"
            >
                <AboutBox>
                    <h2>Cosmic Forecast</h2>
                    <p>
                        Get personalized astrological predictions based on your birth data.
                    </p>
                </AboutBox>
            </SectionExtra>
        </Wrapper>
    );
}


const shoot = keyframes`
  0% { transform: translate(0,0) rotate(-45deg) scale(0.6); opacity: 0; }
  3% { opacity: 1; }
  100% { transform: translate(-420px,420px) rotate(-45deg) scale(1); opacity: 0; }
`;

const zoomScrollIn = keyframes`
  from { transform: scale(0.9); opacity: 0; filter: blur(10px); }
  to { transform: scale(1); opacity: 1; filter: blur(0); }
`;

const zoomScrollOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.9); opacity: 0.4; }
`;



const Wrapper = styled.div`
  min-height: 400vh;
  background: radial-gradient(circle at top, #0b0f2f, #000);
  color: white;
  overflow-x: hidden;

  .zoom-section {
    transition: transform 0.8s ease, opacity 0.8s ease;
  }

  .zoom-in {
    animation: ${zoomScrollIn} 1s ease forwards;
  }

  .zoom-out {
    animation: ${zoomScrollOut} 0.8s ease forwards;
  }
`;



const DynamicIsland = styled.div<{ $scrolled: boolean; $open: boolean }>`
  position: fixed;
  top: ${({ $scrolled }) => ($scrolled ? "12px" : "25px")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;

  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ $scrolled }) => ($scrolled ? "46px" : "64px")};
  width: ${({ $open, $scrolled }) =>
        $open ? "360px" : $scrolled ? "fit-content" : "520px"};

  padding: ${({ $scrolled }) =>
        $scrolled ? "0 24px" : "0 45px"};

  border-radius: 999px;

  background: rgba(15, 20, 50, 0.65);
  backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.15);

  box-shadow:
    0 8px 40px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.1);

  overflow: visible; /* 🔥 đổi từ hidden */

  transition: all 0.55s cubic-bezier(.22,1,.36,1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    width: ${({ $open }) => ($open ? "280px" : "58px")};
    height: auto;
    padding: ${({ $open }) => ($open ? "15px 20px 20px" : "0")};
  }
`;



const MobileToggle = styled.div`
  display: none;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 46px;
  }
`;

const NavContainer = styled.div<{ $scrolled: boolean; $open: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $scrolled }) => ($scrolled ? "38px" : "38px")};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  

    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "200px" : "0")};
    overflow: hidden;

    transition: all 0.4s ease;
  }
`;



const NavItem = styled.div<{ $active: boolean; $scrolled?: boolean }>`
  cursor: pointer;
  position: relative;

  font-size: ${({ $scrolled }) => ($scrolled ? "12px" : "14px")};
  letter-spacing: 2px;
  font-weight: 500;

  color: ${({ $active }) => ($active ? "#7aa2ff" : "white")};

  transition: all 0.3s ease;

  /* Hover Glow */
  &:hover {
    color: #7aa2ff;
    text-shadow: 0 0 12px rgba(122,162,255,0.8);
  }

  /* Animated Underline */
  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%)
      scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;

    width: 100%;
    height: 2px;

    background: linear-gradient(
      90deg,
      transparent,
      #7aa2ff,
      transparent
    );

    transition: transform 0.35s ease;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;




const Galaxy = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;

  .shooting-star {
    position: absolute;
    width: 200px;
    height: 3px;
    background: linear-gradient(90deg,#fff,transparent);
    animation: ${shoot} linear infinite;
    will-change: transform, opacity, filter;
  }

 
  .shooting-star::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;

    background: radial-gradient(circle, #ffffff 0%, #7aa2ff 60%, transparent 100%);
    box-shadow:
      0 0 10px #ffffff,
      0 0 25px #7aa2ff,
      0 0 45px #4facfe;
  }
`;

const SectionHero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const SectionAbout = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionExtra = styled(SectionAbout)``;

const Content = styled.div`
  padding: 0 10vw;
  max-width: 900px;
  h1 { font-size: clamp(42px, 6vw, 80px); }
  span { color: #7aa2ff; }
  p { margin-top: 20px; opacity: 0.85; }
`;

const Actions = styled.div`
  margin-top: 30px;
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
  .btn {
    width: 13rem;
    height: 3rem;
    border-radius: 5rem;
    border: double 4px transparent;
    cursor: pointer;
    color: white;
    background-image: linear-gradient(#212121,#212121),
      linear-gradient(137deg,#ffdb3b,#fe53bb,#8f51ea,#0044ff);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: 0.4s;
  }

  .btn:hover { transform: scale(1.1); }

  strong { font-size: 12px; letter-spacing: 4px; }
`;

const SpaceButton = () => (
    <StyledWrapper>
        <button type="button" className="btn">
            <strong>GET START</strong>
        </button>
    </StyledWrapper>
);

