// ZodiacCinematic Component - Animated zodiac constellation visualization

import { useEffect, useRef, useState } from "react";
import {
  ZodiacWrapper,
  ZodiacSymbol,
  ConstellationContainer,
  DeepGlow,
  AuraRing,
  OrbitRing,
  ZodiacName,
  GalaxyStar,
  ConstellationSVG,
  Line,
} from "../styles/LandingPage.styles";
import {
  zodiac,
  zodiacImages,
  constellationMap,
  getStarIntensity,
  getStarSize,
} from "../data/zodiacData";
import type { StarIntensity } from "../data/zodiacData";

export function ZodiacCinematic() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Cycle through zodiac signs every 7 seconds
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % zodiac.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  // Handle mouse movement for 3D parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  // Reset transform on mouse leave
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "rotateY(0) rotateX(0)";
    }
  };

  const current = zodiac[index];
  const map = constellationMap[current.name];

  return (
    <ZodiacWrapper>
      <ConstellationContainer
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <DeepGlow
          color="rgba(120,140,255,.25)"
          style={{ filter: "blur(180px)", opacity: 0.4 }}
        />

        <AuraRing />
        <ZodiacSymbol
          key={`img-${current.name}`}
          src={zodiacImages[current.name]}
          alt={`${current.name} zodiac symbol`}
        />

        <OrbitRing />

        <ConstellationSVG key={current.name} viewBox="0 0 100 100">
          {/* Render constellation lines */}
          {map.lines.map(([a, b], i) => {
            const s1 = map.stars[a];
            const s2 = map.stars[b];

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

          {/* Render constellation stars */}
          {map.stars.map((s, i) => {
            const intensity: StarIntensity = getStarIntensity();
            const size = getStarSize(intensity);

            return (
              <GalaxyStar
                key={`star-${i}-${current.name}`}
                cx={s.x}
                cy={s.y}
                r={size}
                intensity={intensity}
              />
            );
          })}
        </ConstellationSVG>

        <ZodiacName>{current.name}</ZodiacName>
      </ConstellationContainer>
    </ZodiacWrapper>
  );
}

