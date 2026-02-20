// SpaceButton Component - Animated CTA button with cosmic effects

import { useRef, useState, useCallback, forwardRef, useImperativeHandle, memo } from "react";
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

interface SpaceButtonProps {
  onClick?: () => void;
}

export const SpaceButton = forwardRef<HTMLButtonElement, SpaceButtonProps>(function SpaceButton({ onClick }, ref) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [waves, setWaves] = useState<number[]>([]);

  // Expose the button ref to parent components
  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  // Memoize mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  }, []);

  // Memoize touch move handler
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const touch = e.touches[0];
    const rect = btn.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  }, []);

  // Memoize mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0,0) scale(1)";
    }
  }, []);

  // Memoize touch end handler
  const handleTouchEnd = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0,0) scale(1)";
    }
  }, []);

  // Memoize click handler
  const handleClick = useCallback(() => {
    const id = Date.now();
    setWaves((prev) => [...prev, id]);
    setTimeout(() => {
      setWaves((prev) => prev.filter((x) => x !== id));
    }, 800);
    
    // Call the onClick prop if provided
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  // Combine refs
  const combinedRef = useCallback((element: HTMLButtonElement | null) => {
    (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = element;
    }
  }, [ref]);

  return (
    <WrapperBH>
      <ButtonBH
        ref={combinedRef}
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
});

