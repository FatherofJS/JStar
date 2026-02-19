// SpaceButton Component - Animated CTA button with cosmic effects

import { useRef, useState } from "react";
import {
  WrapperBH,
  ButtonBH,
  Vortex,
  Glow,
  Shockwave,
  Particle,
} from "../styles/LandingPage.styles";

export function SpaceButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [waves, setWaves] = useState<number[]>([]);

  // Handle mouse movement for subtle button tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  };

  // Reset button position on mouse leave
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0) scale(1)";
    }
  };

  // Add shockwave effect on click
  const handleClick = () => {
    const id = Date.now();
    setWaves((prev) => [...prev, id]);
    setTimeout(() => {
      setWaves((prev) => prev.filter((x) => x !== id));
    }, 800);
  };

  return (
    <WrapperBH>
      <Vortex />

      <ButtonBH
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        SEE YOUR STAR
        <Glow />

        {/* Render shockwave effects */}
        {waves.map((id) => (
          <Shockwave key={id} />
        ))}

        {/* Animated particles */}
        <Particle style={{ top: "10%", left: "10%" }} />
        <Particle
          style={{ top: "80%", left: "20%", animationDuration: "7s" }}
        />
        <Particle
          style={{ top: "40%", left: "85%", animationDuration: "5s" }}
        />
      </ButtonBH>
    </WrapperBH>
  );
}

