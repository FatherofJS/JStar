import { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function LandingPage() {
    const heroRef = useRef<any>(null);
    const aboutRef = useRef<any>(null);
    const chartRef = useRef<any>(null);
    const forecastRef = useRef<any>(null);

    const [active, setActive] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // 🔥 Scroll behavior improved
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

    // 🌌 Premium star generation
    const stars = useMemo(
        () =>
            Array.from({ length: 6 }, (_, i) => ({
                id: i,
                top: Math.random() * 80,
                left: Math.random() * 100,
                delay: Math.random() * 8,
                duration: 3 + Math.random() * 3,
            })),
        []
    );

    // 🎯 Smooth section tracking
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
            { threshold: 0.6 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    function scrollTo(ref: any) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    }

    return (
        <Wrapper>
            <DynamicIsland $scrolled={isScrolled} $open={isOpen}>
                <MobileToggle onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </MobileToggle>

                <NavContainer $open={isOpen}>
                    <NavItem $active={active === "home"} onClick={() => scrollTo(heroRef)}>
                        Home
                    </NavItem>

                    <NavItem $active={active === "about"} onClick={() => scrollTo(aboutRef)}>
                        About
                    </NavItem>

                    <NavItem $active={active === "chart"} onClick={() => scrollTo(chartRef)}>
                        Chart
                    </NavItem>

                    <NavItem
                        $active={active === "forecast"}
                        onClick={() => scrollTo(forecastRef)}
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
                        CHOOSE YOUR DAY OF BIRTH TO SEE YOUR PERSONALIZED ASTROLOGY CHART
                        AND INSIGHTS.
                    </p>

                    <Actions>
                        <SpaceButton />
                    </Actions>
                </Content>
            </SectionHero>

            <SectionAbout ref={aboutRef} data-section="about" className="zoom-section">
                <AboutBox>
                    <h2>About JSTAR</h2>
                    <p>
                        Discover your cosmic identity through personalized birth charts and
                        intelligent astrology analysis.
                    </p>
                </AboutBox>
            </SectionAbout>

            <SectionExtra ref={chartRef} data-section="chart" className="zoom-section">
                <AboutBox>
                    <h2>Birth Chart Analysis</h2>
                    <p>Explore your planetary alignment and destiny path.</p>
                </AboutBox>
            </SectionExtra>

            <SectionExtra
                ref={forecastRef}
                data-section="forecast"
                className="zoom-section"
            >
                <AboutBox>
                    <h2>Cosmic Forecast</h2>
                    <p>Get personalized astrological predictions for your future.</p>
                </AboutBox>
            </SectionExtra>
        </Wrapper>
    );
}

const shoot = keyframes`
  0% { transform: translate(0,0) rotate(-45deg); opacity: 0; }
  5% { opacity: 1; }
  100% { transform: translate(-600px,600px) rotate(-45deg); opacity: 0; }
`;

const zoomScrollIn = keyframes`
  from { transform: scale(0.92); opacity: 0; filter: blur(8px); }
  to { transform: scale(1); opacity: 1; filter: blur(0); }
`;

const zoomScrollOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.94); opacity: 0.5; }
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
    animation: ${zoomScrollIn} 0.9s ease forwards;
  }

  .zoom-out {
    animation: ${zoomScrollOut} 0.7s ease forwards;
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

  height: ${({ $scrolled }) => ($scrolled ? "50px" : "65px")};
  width: ${({ $open, $scrolled }) =>
        $open ? "280px" : $scrolled ? "fit-content" : "520px"};

  padding: ${({ $scrolled }) => ($scrolled ? "0 28px" : "0 45px")};

  border-radius: ${({ $open }) => ($open ? "28px" : "999px")};

  background: rgba(15, 20, 50, 0.75);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.12);

  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  transition: all 0.5s cubic-bezier(.22,1,.36,1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    width: ${({ $open }) => ($open ? "260px" : "58px")};
    height: ${({ $open }) => ($open ? "auto" : "50px")};
    padding: ${({ $open }) => ($open ? "20px 20px 25px" : "0")};
  }
`;


const MobileToggle = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    width: 58px;
    height: 50px;
    align-items: center;
    justify-content: center;
  }
`;

const NavContainer = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 38px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;

    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "250px" : "0")};

    overflow: hidden;
    transition: all 0.4s ease;
  }
`;


const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  position: relative;
  font-size: 14px;
  letter-spacing: 2px;
  color: ${({ $active }) => ($active ? "#7aa2ff" : "white")};
  transition: 0.3s;

  &:hover {
    color: #7aa2ff;
    text-shadow: 0 0 12px rgba(122,162,255,0.8);
  }
`;

const Galaxy = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;

  .shooting-star {
    position: absolute;
    width: 220px;
    height: 3px;
    background: linear-gradient(90deg,#fff,transparent);
    animation: ${shoot} linear infinite;
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
`;

const SpaceButton = () => (
    <StyledWrapper>
        <button type="button" className="btn">
            <strong>GET START</strong>
        </button>
    </StyledWrapper>
);
