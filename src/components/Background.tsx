// Background Component - Reusable cosmic background for all views
import { useScrollPosition } from "../hooks/useScrollPosition";
import {
  BackgroundWrapper,
  NebulaLayer,
  AuroraLayer,
  StarField,
  CosmicGlow,
  GrainOverlay,
  ShootingStar,
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
  
  return (
    <BackgroundWrapper>
      {/* Nebula drifting effect */}
      <NebulaLayer />
      
      {/* Aurora wave effect */}
      <AuroraLayer />
      
      {/* Star field with scroll-based viewing angle */}
      <StarField $scrollY={scrollY}>
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

