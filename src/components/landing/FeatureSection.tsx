// FeatureSection Component - Reusable feature section with image and content

import { useState } from "react";
import type { FeatureItem } from "../../data/landingFeatures";
import { ImageZoomModal } from "../ImageZoomModal";
import {
  SectionContainer,
  SectionContainerAlt,
  MaxWidthContainer,
  GridTwoColumns,
  FeatureContent,
  FeatureContentReversed,
  FeatureImageWrapper,
  FeatureImageCard,
  FeatureImage,
  FeatureImageOverlay,
  ZoomHint,
  FeatureGlow,
  FeatureGlowPurple,
  SectionTitle,
  GradientText,
  SectionDescription,
  FeatureBadge,
  FeatureList,
  FeatureListItem,
} from "./styles/FeatureSection.styles.ts";

// SVG Icons
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
    <path d="M2 12h20"/>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
    <path d="M20 2v4"/>
    <path d="M22 4h-4"/>
    <circle cx="4" cy="20" r="2"/>
  </svg>
);

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" x2="16.65" y1="21" y2="16.65"/>
    <line x1="11" x2="11" y1="8" y2="14"/>
    <line x1="8" x2="14" y1="11" y2="11"/>
  </svg>
);

interface FeatureSectionProps {
  feature: FeatureItem;
}

function FeatureSection({ feature }: FeatureSectionProps) {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  
  const {
    title,
    description,
    items,
    imageSrc,
    imageAlt,
    badge,
    badgeIcon = "chart",
    reversed = false,
    glowColor = "blue",
  } = feature;

  const BadgeIcon = badgeIcon === "sparkles" ? SparklesIcon : ChartIcon;

  const ContentComponent = reversed ? FeatureContentReversed : FeatureContent;
  const GlowComponent = glowColor === "purple" ? FeatureGlowPurple : FeatureGlow;

  const handleImageClick = () => {
    if (imageSrc) {
      setZoomImage({ src: imageSrc, alt: imageAlt });
    }
  };

  return (
    <>
      <SectionContainer 
        data-section={badge?.toLowerCase().replace(/\s+/g, "-")} 
        className="zoom-section"
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            {reversed ? (
              <>
                <FeatureImageWrapper>
                  <GlowComponent $position="left" />
                  <FeatureImageCard onClick={handleImageClick}>
                    <FeatureImage 
                      src={imageSrc} 
                      alt={imageAlt}
                      loading="lazy"
                    />
                    <FeatureImageOverlay className="feature-overlay">
                      <ZoomHint>
                        <ZoomInIcon />
                        Zoom
                      </ZoomHint>
                    </FeatureImageOverlay>
                  </FeatureImageCard>
                </FeatureImageWrapper>
                <ContentComponent>
                  {badge && (
                    <FeatureBadge>
                      <BadgeIcon />
                      {badge}
                    </FeatureBadge>
                  )}
                  <SectionTitle>
                    {title.split(" ").map((word, i) => 
                      i === title.split(" ").length - 1 && title.includes("GradientText".toLowerCase()) ? (
                        <GradientText key={i}>{word}</GradientText>
                      ) : i === title.split(" ").length - 1 ? (
                        <GradientText key={i}>{word}</GradientText>
                      ) : (
                        `${word} `
                      )
                    )}
                  </SectionTitle>
                  <SectionDescription>{description}</SectionDescription>
                  <FeatureList>
                    {items.map((item, index) => (
                      <FeatureListItem key={index}>{item}</FeatureListItem>
                    ))}
                  </FeatureList>
                </ContentComponent>
              </>
            ) : (
              <>
                <ContentComponent>
                  {badge && (
                    <FeatureBadge>
                      <BadgeIcon />
                      {badge}
                    </FeatureBadge>
                  )}
                  <SectionTitle>
                    {title}
                  </SectionTitle>
                  <SectionDescription>{description}</SectionDescription>
                  <FeatureList>
                    {items.map((item, index) => (
                      <FeatureListItem key={index}>{item}</FeatureListItem>
                    ))}
                  </FeatureList>
                </ContentComponent>
                <FeatureImageWrapper>
                  <GlowComponent $position={reversed ? "left" : "right"} />
                  <FeatureImageCard onClick={handleImageClick}>
                    <FeatureImage 
                      src={imageSrc} 
                      alt={imageAlt}
                      loading="lazy"
                    />
                    <FeatureImageOverlay className="feature-overlay">
                      <ZoomHint>
                        <ZoomInIcon />
                        Zoom
                      </ZoomHint>
                    </FeatureImageOverlay>
                  </FeatureImageCard>
                </FeatureImageWrapper>
              </>
            )}
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainer>
      
      {zoomImage && (
        <ImageZoomModal
          src={zoomImage.src}
          alt={zoomImage.alt}
          onClose={() => setZoomImage(null)}
        />
      )}
    </>
  );
}

// Alternate version with background
function FeatureSectionAlt({ feature }: FeatureSectionProps) {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  
  const {
    title,
    description,
    items,
    imageSrc,
    imageAlt,
    badge,
    badgeIcon = "chart",
    reversed = false,
    glowColor = "blue",
  } = feature;

  const BadgeIcon = badgeIcon === "sparkles" ? SparklesIcon : ChartIcon;
  const ContentComponent = reversed ? FeatureContentReversed : FeatureContent;
  const GlowComponent = glowColor === "purple" ? FeatureGlowPurple : FeatureGlow;

  const handleImageClick = () => {
    if (imageSrc) {
      setZoomImage({ src: imageSrc, alt: imageAlt });
    }
  };

  return (
    <>
      <SectionContainerAlt 
        data-section={badge?.toLowerCase().replace(/\s+/g, "-")} 
        className="zoom-section"
      >
        <MaxWidthContainer>
          <GridTwoColumns>
            {reversed ? (
              <>
                <FeatureImageWrapper>
                  <GlowComponent $position="left" />
                  <FeatureImageCard onClick={handleImageClick}>
                    <FeatureImage 
                      src={imageSrc} 
                      alt={imageAlt}
                      loading="lazy"
                    />
                    <FeatureImageOverlay className="feature-overlay">
                      <ZoomHint>
                        <ZoomInIcon />
                        Zoom
                      </ZoomHint>
                    </FeatureImageOverlay>
                  </FeatureImageCard>
                </FeatureImageWrapper>
                <ContentComponent>
                  {badge && (
                    <FeatureBadge>
                      <BadgeIcon />
                      {badge}
                    </FeatureBadge>
                  )}
                  <SectionTitle>
                    {title}
                  </SectionTitle>
                  <SectionDescription>{description}</SectionDescription>
                  <FeatureList>
                    {items.map((item, index) => (
                      <FeatureListItem key={index}>{item}</FeatureListItem>
                    ))}
                  </FeatureList>
                </ContentComponent>
              </>
            ) : (
              <>
                <ContentComponent>
                  {badge && (
                    <FeatureBadge>
                      <BadgeIcon />
                      {badge}
                    </FeatureBadge>
                  )}
                  <SectionTitle>
                    {title}
                  </SectionTitle>
                  <SectionDescription>{description}</SectionDescription>
                  <FeatureList>
                    {items.map((item, index) => (
                      <FeatureListItem key={index}>{item}</FeatureListItem>
                    ))}
                  </FeatureList>
                </ContentComponent>
                <FeatureImageWrapper>
                  <GlowComponent $position={reversed ? "left" : "right"} />
                  <FeatureImageCard onClick={handleImageClick}>
                    <FeatureImage 
                      src={imageSrc} 
                      alt={imageAlt}
                      loading="lazy"
                    />
                    <FeatureImageOverlay className="feature-overlay">
                      <ZoomHint>
                        <ZoomInIcon />
                        Zoom
                      </ZoomHint>
                    </FeatureImageOverlay>
                  </FeatureImageCard>
                </FeatureImageWrapper>
              </>
            )}
          </GridTwoColumns>
        </MaxWidthContainer>
      </SectionContainerAlt>
      
      {zoomImage && (
        <ImageZoomModal
          src={zoomImage.src}
          alt={zoomImage.alt}
          onClose={() => setZoomImage(null)}
        />
      )}
    </>
  );
}

// AI Interpretation section with custom content
function AIInterpretationSection({ feature }: FeatureSectionProps) {
  const {
    title,
    description,
    items,
    badge,
    badgeIcon = "sparkles",
  } = feature;

  const BadgeIcon = badgeIcon === "sparkles" ? SparklesIcon : ChartIcon;

  return (
    <SectionContainer 
      data-section={badge?.toLowerCase().replace(/\s+/g, "-")} 
      className="zoom-section"
    >
      <MaxWidthContainer>
        <GridTwoColumns>
          <FeatureContent>
            <FeatureBadge>
              <BadgeIcon />
              {badge}
            </FeatureBadge>
            <SectionTitle>
              {title}
            </SectionTitle>
            <SectionDescription>{description}</SectionDescription>
            <FeatureList>
              {items.map((item, index) => (
                <FeatureListItem key={index}>{item}</FeatureListItem>
              ))}
            </FeatureList>
          </FeatureContent>
          <FeatureImageWrapper>
            <FeatureGlow $position="right" />
            <FeatureImageCard style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                <br />
                <span style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--text-primary)', animation: 'pulse 1s ease-in-out infinite' }}></span>
              </div>
            </FeatureImageCard>
          </FeatureImageWrapper>
        </GridTwoColumns>
      </MaxWidthContainer>
    </SectionContainer>
  );
}

export { FeatureSection, FeatureSectionAlt, AIInterpretationSection };
export type { FeatureItem } from "../../data/landingFeatures";

