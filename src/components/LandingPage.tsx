import { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const zodiac = [
    { name: "Aries", symbol: "♈", color: "#ff6b6b" },
    { name: "Taurus", symbol: "♉", color: "#4ecdc4" },
    { name: "Gemini", symbol: "♊", color: "#ffd93d" },
    { name: "Cancer", symbol: "♋", color: "#6c5ce7" },
    { name: "Leo", symbol: "♌", color: "#ff9f43" },
    { name: "Virgo", symbol: "♍", color: "#1dd1a1" },
    { name: "Libra", symbol: "♎", color: "#54a0ff" },
    { name: "Scorpio", symbol: "♏", color: "#ee5253" },
    { name: "Sagittarius", symbol: "♐", color: "#f368e0" },
    { name: "Capricorn", symbol: "♑", color: "#00d2d3" },
    { name: "Aquarius", symbol: "♒", color: "#5f27cd" },
    { name: "Pisces", symbol: "♓", color: "#10ac84" },
];
const constellationMap: Record<
  string,
  { stars: { x: number; y: number }[]; lines: [number, number][] }
> = {

  Aries: {
    stars: [
      { x: 20, y: 55 },
      { x: 40, y: 45 },
      { x: 60, y: 50 },
      { x: 80, y: 65 }
    ],
    lines: [[0,1],[1,2],[2,3]]
  },

  Taurus: {
    stars: [
      { x: 20, y: 40 },
      { x: 35, y: 25 },
      { x: 55, y: 35 },
      { x: 70, y: 50 },
      { x: 55, y: 70 },
      { x: 35, y: 60 }
    ],
    lines: [[0,1],[1,2],[2,3],[2,4],[4,5]]
  },

  Gemini: {
    stars: [
      { x: 35, y: 20 },
      { x: 35, y: 80 },
      { x: 65, y: 20 },
      { x: 65, y: 80 },
      { x: 50, y: 50 }
    ],
    lines: [[0,1],[2,3],[0,4],[2,4]]
  },

  Cancer: {
    stars: [
      { x: 35, y: 50 },
      { x: 50, y: 35 },
      { x: 65, y: 50 },
      { x: 50, y: 70 }
    ],
    lines: [[0,1],[1,2],[2,3]]
  },

  Leo: {
    stars: [
      { x: 20, y: 55 },
      { x: 35, y: 40 },
      { x: 55, y: 45 },
      { x: 75, y: 60 },
      { x: 60, y: 75 },
      { x: 40, y: 70 }
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5]]
  },

  Virgo: {
    stars: [
      { x: 30, y: 25 },
      { x: 45, y: 45 },
      { x: 60, y: 55 },
      { x: 75, y: 75 },
      { x: 55, y: 80 }
    ],
    lines: [[0,1],[1,2],[2,3],[2,4]]
  },

  Libra: {
    stars: [
      { x: 25, y: 55 },
      { x: 50, y: 40 },
      { x: 75, y: 55 },
      { x: 50, y: 70 }
    ],
    lines: [[0,1],[1,2],[1,3]]
  },

  Scorpio: {
    stars: [
      { x: 20, y: 40 },
      { x: 35, y: 60 },
      { x: 50, y: 45 },
      { x: 65, y: 65 },
      { x: 80, y: 50 },
      { x: 90, y: 65 }
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5]]
  },

  Sagittarius: {
    stars: [
      { x: 30, y: 30 },
      { x: 45, y: 50 },
      { x: 60, y: 30 },
      { x: 70, y: 70 },
      { x: 50, y: 80 },
      { x: 40, y: 65 }
    ],
    lines: [[0,1],[1,2],[1,3],[3,4],[4,5]]
  },

  Capricorn: {
    stars: [
      { x: 25, y: 60 },
      { x: 40, y: 40 },
      { x: 60, y: 50 },
      { x: 75, y: 70 },
      { x: 55, y: 80 }
    ],
    lines: [[0,1],[1,2],[2,3],[3,4]]
  },

  Aquarius: {
    stars: [
      { x: 25, y: 45 },
      { x: 40, y: 60 },
      { x: 55, y: 45 },
      { x: 70, y: 60 },
      { x: 85, y: 45 }
    ],
    lines: [[0,1],[1,2],[2,3],[3,4]]
  },

  Pisces: {
    stars: [
      { x: 25, y: 50 },
      { x: 45, y: 30 },
      { x: 65, y: 50 },
      { x: 45, y: 70 },
      { x: 85, y: 50 }
    ],
    lines: [[0,1],[1,2],[2,3],[2,4]]
  }

};




const floatSlow = keyframes`
  0% { transform: translateY(-6px) }
  50% { transform: translateY(6px) }
  100% { transform: translateY(-6px) }
`;

const rotateUltraSlow = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;


const drawLine = keyframes`
  0% {
    stroke-dashoffset: 140;
    opacity: .15;
  }
  70% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;








const ZodiacWrapper = styled.div`
  margin-top: 40px;
  height: 440px;
  display:flex;
  align-items:center;
  justify-content:center;
  perspective: 1000px;
`;

const ConstellationContainer = styled.div`
  position: relative;
  width: 420px;
  height: 420px;
  transform-style: preserve-3d;
  transition: transform .25s ease;
  animation: ${floatSlow} 8s ease-in-out infinite;
`;

const DeepGlow = styled.div<{ color:string }>`
  position:absolute;
  inset:0;
  border-radius:50%;
  background: radial-gradient(circle, ${({color})=>color}40, transparent 70%);
  filter: blur(120px);
  opacity:.6;
`;

const AuraRing = styled.div`
  position:absolute;
  width:340px;
  height:340px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,.08);
  animation:${rotateUltraSlow} 90s linear infinite;
`;

const OrbitRing = styled.div`
  position:absolute;
  width:280px;
  height:280px;
  border-radius:50%;
  border:1px dashed rgba(255,255,255,.18);
  animation:${rotateUltraSlow} 40s linear infinite reverse;
`;

const ZodiacName = styled.div`
  position:absolute;
  bottom:-38px;
  width:100%;
  text-align:center;
  letter-spacing:5px;
  font-size:22px;
  opacity:.9;
`;
const GalaxyStar = styled.circle<{ size:number }>`
  fill: rgba(255,255,255,.9);

  filter:
    drop-shadow(0 0 1px rgba(255,255,255,.9))
    drop-shadow(0 0 3px rgba(200,220,255,.8))
    drop-shadow(0 0 8px rgba(160,180,255,.6))
    drop-shadow(0 0 18px rgba(120,140,255,.4))
    drop-shadow(0 0 30px rgba(100,120,255,.25));

  opacity: .9;
`;







const ConstellationSVG = styled.svg`
  width:420px;
  height:420px;
  z-index:2;
`;

const Line = styled.line<{ color:string; delay:number }>`
  stroke:${p=>p.color};
  stroke-width:.8;
  filter: drop-shadow(0 0 8px ${p=>p.color});
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation:${drawLine} 5.5s cubic-bezier(.22,1,.36,1) forwards;
  animation-delay:${p=>p.delay}s;
`;



function ZodiacCinematic() {
  const [index,setIndex]=useState(0);
  const ref = useRef<HTMLDivElement>(null);

useEffect(()=>{
  const i=setInterval(()=>setIndex(p=>(p+1)%zodiac.length),7000);
  return()=>clearInterval(i);
},[]);


  const move=(e:React.MouseEvent)=>{
    const el=ref.current;
    if(!el) return;
    const rect=el.getBoundingClientRect();
    const x=(e.clientX-rect.left-rect.width/2)/20;
    const y=(e.clientY-rect.top-rect.height/2)/20;
    el.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const reset=()=>{ if(ref.current) ref.current.style.transform="rotateY(0) rotateX(0)" };

  const current=zodiac[index];
  const map=constellationMap[current.name];

  return (
    <ZodiacWrapper>
      <ConstellationContainer ref={ref} onMouseMove={move} onMouseLeave={reset}>

        <DeepGlow color={current.color} />

        <AuraRing/>
        <OrbitRing/>

<ConstellationSVG key={current.name} viewBox="0 0 100 100">


  {map.lines.map(([a,b],i)=>{
    const s1=map.stars[a];
    const s2=map.stars[b];

    return (
      <Line
        key={`line-${i}-${current.name}`}
        x1={s1.x}
        y1={s1.y}
        x2={s2.x}
        y2={s2.y}
        color={current.color}
        delay={i * 0.35}
      />
    );
  })}
{map.stars.map((s,i)=>(
  <GalaxyStar
    key={`star-${i}-${current.name}`}
    cx={s.x}
    cy={s.y}
    r={0.6 + Math.random()*0.7}
    size={1}
  />
))}







</ConstellationSVG>



        <ZodiacName>{current.name}</ZodiacName>

      </ConstellationContainer>
    </ZodiacWrapper>
  );
}





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
                <HeroLayout>

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

                    <HeroRight>
                        <ZodiacCinematic />
                    </HeroRight>

                </HeroLayout>
            </SectionHero>


            <Section ref={aboutRef} data-section="about" className="zoom-section">
                <GlassBox>
                    <h2>About JSTAR</h2>
                    <p>
                        Discover your cosmic identity through personalized birth charts and AI-powered astrology.
                    </p>


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
const nebulaDrift = keyframes`
  0% { transform: translate3d(-8%, -6%, 0) scale(1.2); }
  50% { transform: translate3d(8%, 6%, 0) scale(1.25); }
  100% { transform: translate3d(-8%, -6%, 0) scale(1.2); }
`;

const auroraWave = keyframes`
  0% { opacity:.25; transform: translateY(0); }
  50% { opacity:.55; transform: translateY(-60px); }
  100% { opacity:.25; transform: translateY(0); }
`;

const starTwinkle = keyframes`
  0%,100% { opacity:.25; }
  50% { opacity:.7; }
`;

const grainShift = keyframes`
  0% { transform: translate(0,0); }
  100% { transform: translate(-10%,10%); }
`;

const cosmicPulse = keyframes`
  0%,100% { opacity:.35; }
  50% { opacity:.75; }
`;




const Wrapper = styled.div`
  min-height: 400vh;
  color: white;
  overflow-x: hidden;
  position: relative;

  background:
    radial-gradient(circle at 15% 20%, rgba(120,140,255,.25), transparent 45%),
    radial-gradient(circle at 85% 30%, rgba(180,120,255,.22), transparent 50%),
    radial-gradient(circle at 50% 85%, rgba(0,200,255,.18), transparent 55%),
    #01020a;


  &:before {
    content: "";
    position: fixed;
    inset: -25%;
    background:
      radial-gradient(circle at 30% 40%, rgba(140,160,255,.22), transparent 60%),
      radial-gradient(circle at 70% 60%, rgba(200,140,255,.18), transparent 65%),
      radial-gradient(circle at 50% 20%, rgba(0,200,255,.15), transparent 60%);
    filter: blur(160px);
    animation: ${nebulaDrift} 60s ease-in-out infinite;
    z-index: -3;
  }


  &:after {
    content: "";
    position: fixed;
    inset: -10%;
    background: linear-gradient(
      120deg,
      rgba(0,200,255,.12),
      transparent,
      rgba(140,80,255,.12)
    );
    filter: blur(90px);
    animation: ${auroraWave} 20s ease-in-out infinite;
    mix-blend-mode: screen;
    z-index: -2;
  }


  & > *:first-child::before {
    content: "";
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(255,255,255,.02),
      rgba(255,255,255,.02) 1px,
      transparent 2px,
      transparent 3px
    );
    opacity: .15;
    animation: ${grainShift} 10s linear infinite;
    pointer-events: none;
    z-index: -1;
  }

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

  filter: ${({ $active }) => ($active ? "brightness(1.35)" : "brightness(1)")};

 
  &:before {
    content: "";
    position: absolute;
    inset: -10%;
    background-image:
      radial-gradient(1px 1px at 20px 30px, #fff, transparent),
      radial-gradient(1px 1px at 60px 70px, #fff, transparent),
      radial-gradient(1px 1px at 120px 140px, #fff, transparent),
      radial-gradient(1px 1px at 200px 200px, #fff, transparent);
    background-size: 240px 240px;
    opacity: .25;
    animation: ${starTwinkle} 6s ease-in-out infinite;
  }

 
  &:after {
    content: "";
    position: absolute;
    inset: -10%;
    background-image:
      radial-gradient(2px 2px at 80px 90px, rgba(255,255,255,.9), transparent),
      radial-gradient(2px 2px at 160px 40px, rgba(255,255,255,.7), transparent),
      radial-gradient(2px 2px at 200px 120px, rgba(255,255,255,.8), transparent);
    background-size: 300px 300px;
    opacity: .4;
  }

  
  & > div {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(circle at center, rgba(120,160,255,.18), transparent 60%);
    animation: ${cosmicPulse} 12s ease-in-out infinite;
    z-index: -1;
  }

  .shooting-star {
    position: absolute;
    width: 260px;
    height: 3px;
    background: linear-gradient(90deg,#fff,transparent);
    animation: ${shoot} linear infinite;
    filter: drop-shadow(0 0 14px rgba(255,255,255,.9));
  }
`;




const SectionHero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
`;
const HeroLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  gap: 150px;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const HeroRight = styled.div`
  flex-shrink: 0;

  @media (max-width: 900px) {
    margin-top: 40px;
  }
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


