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
    


    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 40);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const stars = useMemo(
        () =>
            Array.from({ length: 5 }, (_, i) => ({
                id: i,
                top: Math.random() * 70,
                left: Math.random() * 100,
                delay: Math.random() * 12,
                duration: 3 + Math.random() * 4,
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
            {
                threshold: 0.55,
                rootMargin: "-10% 0px -10% 0px",
            }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (ref: any) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    };

    return (
        <Wrapper>
            <DynamicIsland $scrolled={isScrolled} $open={isOpen}>
                <MobileToggle onClick={() => setIsOpen(!isOpen)}>☰</MobileToggle>

                <NavContainer $open={isOpen}>
                    <NavItem $active={active === "home"} onClick={() => scrollTo(heroRef)}>Home</NavItem>
                    <NavItem $active={active === "about"} onClick={() => scrollTo(aboutRef)}>About</NavItem>
                    <NavItem $active={active === "chart"} onClick={() => scrollTo(chartRef)}>Chart</NavItem>
                    <NavItem $active={active === "forecast"} onClick={() => scrollTo(forecastRef)}>Forecast</NavItem>
                </NavContainer>
            </DynamicIsland>

            <Galaxy $active={active === "home"}>

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

            <SectionHero ref={heroRef} data-section="home" className="zoom-section zoom-in">
                <Content>
                    <h1>
                        <span>JSTAR</span>
                        <br /> KNOW YOUR STAR
                    </h1>

                    <p>
                        CHOOSE YOUR DAY OF BIRTH TO SEE YOUR PERSONALIZED ASTROLOGY CHART AND INSIGHTS.
                    </p>

                    <Actions>
                        <SpaceButton />
                    </Actions>
                </Content>
            </SectionHero>

            <Section ref={aboutRef} data-section="about" className="zoom-section">
                <GlassBox>
                    <h2>About JSTAR</h2>
                    <p>Discover your cosmic identity through personalized birth charts and AI-powered astrology.</p>
                </GlassBox>
            </Section>

            <Section ref={chartRef} data-section="chart" className="zoom-section">
                <GlassBox>
                    <h2>Birth Chart Analysis</h2>
                    <p>Explore your planetary alignment and destiny path.</p>
                </GlassBox>
            </Section>

            <Section ref={forecastRef} data-section="forecast" className="zoom-section">
                <GlassBox>
                    <h2>Cosmic Forecast</h2>
                    <p>Get personalized astrological predictions for your future.</p>
                </GlassBox>
            </Section>
        </Wrapper>
    );
}



const shoot = keyframes`
  0% { transform: translate(0,0) rotate(-45deg); opacity:0; }
  10% { opacity:1; }
  100% { transform: translate(-700px,700px) rotate(-45deg); opacity:0; }
`;

const zoomIn = keyframes`
  from { transform: scale(0.9); opacity:0; filter: blur(8px); }
  to { transform: scale(1); opacity:1; filter: blur(0); }
`;

const zoomOut = keyframes`
  from { transform: scale(1); opacity:1; }
  to { transform: scale(0.95); opacity:0.5; }
`;



const Wrapper = styled.div`
  min-height: 400vh;
  background: radial-gradient(circle at 30% 20%, #11163a, #000);
  color: white;
  overflow-x: hidden;

  .zoom-in { animation: ${zoomIn} 0.8s ease forwards; }
  .zoom-out { animation: ${zoomOut} 0.6s ease forwards; }
`;

const DynamicIsland = styled.div<{ $scrolled: boolean; $open: boolean }>`
  position: fixed;
  top: ${({ $scrolled }) => ($scrolled ? "14px" : "30px")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ $scrolled }) => ($scrolled ? "52px" : "70px")};
  width: ${({ $open, $scrolled }) =>
        $open ? "280px" : $scrolled ? "fit-content" : "540px"};

  padding: 0 35px;
  border-radius: ${({ $open }) => ($open ? "30px" : "999px")};

  background: rgba(20, 25, 70, 0.7);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.1);

  box-shadow: 0 10px 40px rgba(0,0,0,0.6);

  transition: all 0.5s cubic-bezier(.22,1,.36,1);

  @media (max-width: 768px) {
    flex-direction: column;
    width: ${({ $open }) => ($open ? "260px" : "60px")};
    height: ${({ $open }) => ($open ? "auto" : "52px")};
    padding: ${({ $open }) => ($open ? "20px" : "0")};
  }
`;

const MobileToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 20px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
  }
`;

const NavContainer = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 35px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 12px;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-height: ${({ $open }) => ($open ? "240px" : "0")};
    overflow: hidden;
    transition: all 0.4s ease;
  }
`;

const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 2px;
  color: ${({ $active }) => ($active ? "#7aa2ff" : "white")};
  transition: 0.3s;

  &:hover {
    color: #7aa2ff;
    text-shadow: 0 0 15px rgba(122,162,255,0.9);
  }
`;
const Galaxy = styled.div<{ $active: boolean }>`
  position: fixed;
  inset: 0;
  pointer-events: none;
  transition: filter .6s ease;

  filter: ${({ $active }) => ($active ? "brightness(1.3) blur(1px)" : "none")};

  .shooting-star {
    position: absolute;
    width: 220px;
    height: 3px;
    background: linear-gradient(90deg,#fff,transparent);
    animation: ${shoot} linear infinite;
    transition: transform .6s ease;
  }
`;


const SectionHero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 0 10vw;
  max-width: 900px;

  h1 { font-size: clamp(42px,6vw,80px); }
  span { color:#7aa2ff; }
  p { margin-top:20px; opacity:0.85; }
`;

const Actions = styled.div`
  margin-top: 35px;
`;

const GlassBox = styled.div`
  width: 80%;
  padding: 60px;
  border-radius: 28px;
  background: rgba(20,25,60,0.55);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
`;




const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
`;

const vortexSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(360deg) scale(1.1); }
`;

const shockwaveAnim = keyframes`
  0% { opacity:.8; transform: scale(.3); }
  100% { opacity:0; transform: scale(3.2); }
`;

const glowPulse = keyframes`
  0%,100% { opacity:.5; }
  50% { opacity:1; }
`;

const WrapperBH = styled.div`
  display: inline-block;
  position: relative;
`;

const ButtonBH = styled.button`
  position: relative;
  overflow: hidden;

  width: 16rem;
  height: 3.6rem;
  border-radius: 60px;
  border: none;
  cursor: pointer;

  color: white;
  font-weight: 600;
  letter-spacing: 1px;

  background: radial-gradient(circle at center, #000 30%, #050a2a 70%);
  box-shadow:
    0 0 50px rgba(90,120,255,.9),
    inset 0 0 30px rgba(0,0,0,1);

  transition: transform .25s cubic-bezier(.22,1,.36,1);

  &:active {
    transform: scale(.94);
  }
`;

const Vortex = styled.div`
  position: absolute;
  inset: -45%;
  border-radius: 50%;

  background: conic-gradient(
    from 0deg,
    // rgba(90,120,255,.8),
    // rgba(140,80,255,.8),
    // rgba(0,200,255,.8),
    // rgba(90,120,255,.8)
  );

  filter: blur(45px);
  animation: ${vortexSpin} 6s linear infinite;
  z-index: -1;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 60px;

  background: radial-gradient(circle, rgba(255,255,255,.25), transparent 60%);
  animation: ${glowPulse} 3s ease-in-out infinite;
`;

const Shockwave = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 140px;
  height: 140px;

  border-radius: 50%;
  border: 2px solid rgba(120,160,255,.8);

  transform: translate(-50%, -50%);
  animation: ${shockwaveAnim} .8s ease-out forwards;
  pointer-events: none;
`;

const Particle = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(160,180,255,.9);
  border-radius: 50%;
  animation: ${orbit} 6s linear infinite;
`;

const SpaceButton = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [waves, setWaves] = useState<number[]>([]);

    const handleMove = (e: React.MouseEvent) => {
        const btn = ref.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
    };

    const reset = () => {
        if (ref.current) {
            ref.current.style.transform = "translate(0,0) scale(1)";
        }
    };

    const click = () => {
        const id = Date.now();
        setWaves((w) => [...w, id]);
        setTimeout(() => {
            setWaves((w) => w.filter((x) => x !== id));
        }, 800);
    };

    return (
        <WrapperBH>
            <Vortex />

            <ButtonBH
                ref={ref}
                onMouseMove={handleMove}
                onMouseLeave={reset}
                onClick={click}
            >
                SEE YOUR STAR
                <Glow />

                {waves.map((id) => (
                    <Shockwave key={id} />
                ))}

                <Particle style={{ top: "10%", left: "10%" }} />
                <Particle style={{ top: "80%", left: "20%", animationDuration: "7s" }} />
                <Particle style={{ top: "40%", left: "85%", animationDuration: "5s" }} />
            </ButtonBH>
        </WrapperBH>
    );
};


