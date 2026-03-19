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
  const [allowTiltInteraction, setAllowTiltInteraction] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pendingTransformRef = useRef("rotateY(0deg) rotateX(0deg)");
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

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1001px)"
    );

    const updateInteractionMode = () => {
      setAllowTiltInteraction(mediaQuery.matches);
    };

    updateInteractionMode();
    mediaQuery.addEventListener("change", updateInteractionMode);

    return () => {
      mediaQuery.removeEventListener("change", updateInteractionMode);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Batch pointer-driven transforms into animation frames to keep hover smooth.
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowTiltInteraction) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 40;
    const y = (e.clientY - rect.top - rect.height / 2) / 40;
    pendingTransformRef.current = `rotateY(${x}deg) rotateX(${-y}deg)`;

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = pendingTransformRef.current;
      }
      frameRef.current = null;
    });
  }, [allowTiltInteraction]);

  const handleMouseLeave = useCallback(() => {
    if (!allowTiltInteraction) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (ref.current) {
      ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  }, [allowTiltInteraction]);

  return (
    <ZodiacWrapper>
      <ConstellationContainer
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <DeepGlow
          color="rgba(120,140,255,0.2)"
          style={{ filter: "blur(72px)", opacity: 0.24 }}
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

