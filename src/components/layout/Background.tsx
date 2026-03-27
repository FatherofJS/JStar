import { memo, useMemo } from "react";
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

const generateShootingStars = () =>
  Array.from({ length: 4 }, (_, i) => {
    const duration = 2.0 + Math.random() * 2.0;

    return {
      id: i,
      top: Math.random() * 50 + 5,
      left: Math.random() * 100,
      delay: -(Math.random() * duration),
      duration,
      width: 120 + Math.random() * 60,
    };
  });

const SHOOTING_STARS = generateShootingStars();

export function Background() {
  const shootingStars = useMemo(() => SHOOTING_STARS, []);

  return (
    <BackgroundWrapper>
      <NebulaLayer>
        <div
          style={{
            position: "absolute",
            inset: "-12%",
            background:
              "radial-gradient(ellipse at 22% 28%, rgba(147, 51, 234, 0.22) 0%, rgba(126, 34, 206, 0.12) 34%, transparent 62%)",
            animation: "nebulaPulse 18s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-12%",
            background:
              "radial-gradient(ellipse at 74% 58%, rgba(59, 130, 246, 0.18) 0%, rgba(37, 99, 235, 0.1) 34%, transparent 62%)",
            animation: "nebulaPulse 22s ease-in-out infinite 3s",
          }}
        />
      </NebulaLayer>

      <AuroraLayer />

      <StarsLayer />
      <StarsLayer2 />
      <StarsLayer3 />

      <StarField>
        <CosmicGlow />
      </StarField>

      <GrainOverlay />

      {shootingStars.map((star) => (
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
