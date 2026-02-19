// ZodiacCinematic Component - Animated zodiac constellation visualization

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
} from "../data/zodiacData";
import { useTheme } from "../contexts/ThemeContext";

// Memoize star data to prevent recalculation on every render
const useStarData = (zodiacName: string) => {
  return useMemo(() => {
    const intensity = Math.random();
    const size = intensity > 0.7 ? 1.4 : intensity > 0.4 ? 1 : 0.6;
    return { intensity, size };
  }, [zodiacName]);
};

export function ZodiacCinematic() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const lastMouseMove = useRef(0);
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const current = zodiac[index];
  const map = constellationMap[current.name];
  
  // Memoize star data for current zodiac
  const starData = useStarData(current.name);

  // Cycle through zodiac signs every 12 seconds
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % zodiac.length),
      12000
    );
    return () => clearInterval(interval);
  }, []);

  // Memoize mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastMouseMove.current < 50) return;
    lastMouseMove.current = now;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  // Memoize touch move handler
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastMouseMove.current < 50) return;
    lastMouseMove.current = now;

    const el = ref.current;
    if (!el) return;

    const touch = e.touches[0];
    const rect = el.getBoundingClientRect();
    const x = (touch.clientX - rect.left - rect.width / 2) / 30;
    const y = (touch.clientY - rect.top - rect.height / 2) / 30;
    el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  // Memoize mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "rotateY(0) rotateX(0)";
    }
  }, []);

  // Memoize touch end handler
  const handleTouchEnd = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "rotateY(0) rotateX(0)";
    }
  }, []);

  return (
    <ZodiacWrapper>
      <ConstellationContainer
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
          {/* Render constellation lines - hidden in light mode */}
          {!isLightMode && map.lines.map(([a, b], i) => {
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

          {/* Render constellation stars - hidden in light mode */}
          {!isLightMode && map.stars.map((s, i) => (
            <GalaxyStar
              key={`star-${i}-${current.name}`}
              cx={s.x}
              cy={s.y}
              r={starData.size}
              intensity={starData.intensity}
            />
          ))}
        </ConstellationSVG>

        <ZodiacName>{current.name}</ZodiacName>
      </ConstellationContainer>
    </ZodiacWrapper>
  );
}

