// SpaceButton Component - Animated CTA button with cosmic effects

import { useRef, useState, useCallback, memo } from "react";
import {
  WrapperBH,
  ButtonBH,
  Glow,
  Shockwave,
  Particle,
} from "../styles/LandingPage.styles";

// Memoize particles to avoid re-renders
const particles = [
  { top: "10%", left: "10%" },
  { top: "80%", left: "20%", animationDuration: "7s" },
  { top: "40%", left: "85%", animationDuration: "5s" },
];

const ParticlesMemo = memo(() => (
  <>
    {particles.map((style, i) => (
      <Particle key={i} style={style} />
    ))}
  </>
));

export function SpaceButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [waves, setWaves] = useState<number[]>([]);

  // Memoize mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  }, []);

  // Memoize touch move handler
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;

    const touch = e.touches[0];
    const rect = btn.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  }, []);

  // Memoize mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0) scale(1)";
    }
  }, []);

  // Memoize touch end handler
  const handleTouchEnd = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0) scale(1)";
    }
  }, []);

  // Memoize click handler
  const handleClick = useCallback(() => {
    const id = Date.now();
    setWaves((prev) => [...prev, id]);
    setTimeout(() => {
      setWaves((prev) => prev.filter((x) => x !== id));
    }, 800);
  }, []);

  return (
    <WrapperBH>
      <ButtonBH
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        SEE YOUR STAR
        <Glow />

        {/* Render shockwave effects */}
        {waves.map((id) => (
          <Shockwave key={id} />
        ))}

        {/* Memoized particles */}
        <ParticlesMemo />
      </ButtonBH>
    </WrapperBH>
  );
}

