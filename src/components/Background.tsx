// Background Component - Simplified for performance
import { useMemo } from "react";
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
} from "../styles/Background.styles";

// Generate shooting star data
const generateShootingStars = () =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: Math.random() * 70,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 3 + Math.random() * 4,
  }));

// Pre-generate shooting stars (computed once at module load)
const SHOOTING_STARS = generateShootingStars();

interface BackgroundProps {
  showShootingStars?: boolean;
}

export function Background({ showShootingStars = true }: BackgroundProps) {
  // Memoize shooting stars to prevent recreation
  const shootingStars = useMemo(() => SHOOTING_STARS, []);
  
  return (
    <BackgroundWrapper>
      {/* Nebula drifting effect */}
      <NebulaLayer />
      
      {/* Aurora wave effect - hidden for performance */}
      <AuroraLayer />
      
      {/* Static star layers - simplified */}
      <StarsLayer />
      <StarsLayer2 />
      <StarsLayer3 />
      
      {/* Static star field without scroll parallax */}
      <StarField>
        <CosmicGlow />
      </StarField>
      
      {/* Grain overlay - hidden for performance */}
      <GrainOverlay />
      
      {/* Shooting stars - reduced count */}
      {showShootingStars &&
        shootingStars.map((star) => (
          <ShootingStar
            key={star.id}
            $top={star.top}
            $left={star.left}
            $delay={star.delay}
            $duration={star.duration}
          />
        ))}
    </BackgroundWrapper>
  );
}

