// Background Component - Beautiful cosmic background with vibrant nebula
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
  Array.from({ length: 3 }, (_, i) => ({
    id: i,
    top: Math.random() * 60,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 2 + Math.random() * 3,
  }));

// Pre-generate shooting stars
const SHOOTING_STARS = generateShootingStars();

interface BackgroundProps {
  showShootingStars?: boolean;
}

export function Background({ showShootingStars = true }: BackgroundProps) {
  const shootingStars = useMemo(() => SHOOTING_STARS, []);
  
  return (
    <BackgroundWrapper>
      {/* Nebula layers - multiple colorful nebulas */}
      <NebulaLayer>
        <div style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(ellipse at 20% 30%, rgba(147, 51, 234, 0.25) 0%, rgba(126, 34, 206, 0.15) 30%, transparent 60%)',
          animation: 'nebulaPulse 15s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.12) 30%, transparent 60%)',
          animation: 'nebulaPulse 12s ease-in-out infinite 2s',
        }} />
        <div style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(ellipse at 50% 80%, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.1) 30%, transparent 60%)',
          animation: 'nebulaPulse 18s ease-in-out infinite 4s',
        }} />
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
      
      {/* Shooting stars */}
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

