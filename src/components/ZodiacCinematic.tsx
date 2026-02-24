// ZodiacCinematic Component - Optimized for performance

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
} from "./ZodiacCinematic.styles";
import {
  zodiac,
  zodiacImages,
  constellationMap,
} from "../data/zodiacData";
import { useTheme } from "../contexts/ThemeContext";

// Memoize star data to prevent recalculation on every render
const useStarData = (zodiacName: string) => {
  return useMemo(() => {
    // Use a deterministic seed based on zodiac name to generate consistent random values
    const seed = zodiacName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const pseudoRandom = (seed % 100) / 100;
    const intensity = pseudoRandom;
    const size = intensity > 0.7 ? 1.2 : intensity > 0.4 ? 0.8 : 0.5;
    return { intensity, size };
  }, [zodiacName]);
};

export function ZodiacCinematic() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
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

  // Simplified mouse move handler - no throttling for smoother interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 40;
    const y = (e.clientY - rect.top - rect.height / 2) / 40;
    el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
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
      >
        <DeepGlow
          color="rgba(120,140,255,0.2)"
          style={{ filter: "blur(120px)", opacity: 0.3 }}
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

