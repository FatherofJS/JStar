// Background Component - Beautiful cosmic background with vibrant nebula
import { memo, useEffect, useMemo, useState } from "react";
import {
  BackgroundWrapper,
  NebulaLayer,
  AuroraLayer,
  StarField,
  CosmicGlow,
  GrainOverlay,
  ShootingStar,
  StarsLayer,
  StarsLayer2,
  StarsLayer3,
} from "./Background.styles";

// Generate shooting star data - more random falling stars like astrologerstudio.com
const generateShootingStars = () =>
  Array.from({ length: 4 }, (_, i) => {
    const duration = 1.5 + Math.random() * 2.5;

    return {
      id: i,
      top: Math.random() * 50 + 5,
      left: Math.random() * 100,
      // Negative delay lets each star start mid-flight immediately on first paint.
      delay: -(Math.random() * duration),
      duration,
      width: 60 + Math.random() * 80,
    };
  });

// Pre-generate shooting stars
const SHOOTING_STARS = generateShootingStars();

interface BackgroundProps {
  showShootingStars?: boolean;
  forceReducedMotion?: boolean;
}

export function Background({
  showShootingStars = true,
  forceReducedMotion = false,
}: BackgroundProps) {
  const shootingStars = useMemo(() => SHOOTING_STARS, []);
  const [allowMotionEffects, setAllowMotionEffects] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 1280px), (hover: none), (pointer: coarse)"
    );

    const updateMotionPreference = () => {
      setAllowMotionEffects(!mediaQuery.matches && !forceReducedMotion);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, [forceReducedMotion]);

  const shouldShowShootingStars = showShootingStars && allowMotionEffects;

  return (
    <BackgroundWrapper>
      {/* Keep some depth, but avoid stacking too many blurred animated layers */}
      <NebulaLayer>
        <div
          style={{
            position: "absolute",
            inset: "-12%",
            background:
              "radial-gradient(ellipse at 22% 28%, rgba(147, 51, 234, 0.22) 0%, rgba(126, 34, 206, 0.12) 34%, transparent 62%)",
            animation: forceReducedMotion
              ? undefined
              : "nebulaPulse 18s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-12%",
            background:
              "radial-gradient(ellipse at 74% 58%, rgba(59, 130, 246, 0.18) 0%, rgba(37, 99, 235, 0.1) 34%, transparent 62%)",
            animation: forceReducedMotion
              ? undefined
              : "nebulaPulse 22s ease-in-out infinite 3s",
          }}
        />
      </NebulaLayer>

      {/* Aurora wave effect - hidden */}
      <AuroraLayer />

      {/* Star layers */}
      <StarsLayer />
      <StarsLayer2 />
      <StarsLayer3 />

      {/* Star field */}
      <StarField>
        <CosmicGlow />
      </StarField>

      {/* Grain overlay - hidden */}
      <GrainOverlay />

      {/* Shooting stars - more frequent like astrologerstudio.com */}
      {shouldShowShootingStars &&
        shootingStars.map((star) => (
          <ShootingStar
            key={star.id}
            $top={star.top}
            $left={star.left}
            $delay={star.delay}
            $duration={star.duration}
            style={{ width: star.width }}
          />
        ))}
    </BackgroundWrapper>
  );
}

export default memo(Background);
