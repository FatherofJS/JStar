// Background Component - Reusable cosmic background for all views
import { useRef, useEffect } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
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
  const { scrollY } = useScrollPosition();
  const lastScrollY = useRef(0);
  
  // Use ref to throttle scroll updates for the star field
  useEffect(() => {
    lastScrollY.current = scrollY;
  }, [scrollY]);
  
  // Only update star field transform periodically to reduce re-renders
  const displayScrollY = Math.round(scrollY / 10) * 10;
  
  return (
    <BackgroundWrapper>
      {/* Nebula drifting effect */}
      <NebulaLayer />
      
      {/* Aurora wave effect */}
      <AuroraLayer />
      
      {/* Scrolling stars layers */}
      <StarsLayer />
      <StarsLayer2 />
      <StarsLayer3 />
      
      {/* Star field with scroll-based viewing angle - throttled */}
      <StarField $scrollY={displayScrollY}>
        <CosmicGlow />
      </StarField>
      
      {/* Grain overlay */}
      <GrainOverlay />
      
      {/* Shooting stars */}
      {showShootingStars &&
        SHOOTING_STARS.map((star) => (
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

