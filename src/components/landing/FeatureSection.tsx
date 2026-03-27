import { useState } from "react";
import type { FeatureItem } from "../../data/landingData";
import { ImageZoomModal } from "../ui/ImageZoomModal";
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
    reversed = false,
    glowColor = "blue",
  } = feature;

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
        data-section={feature.id} 
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

function FeatureSectionAlt({ feature }: FeatureSectionProps) {
  console.count(`🟡 FeatureSectionAlt[${feature.id}] render`);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  
  const {
    title,
    description,
    items,
    imageSrc,
    imageAlt,
    badge,
    reversed = false,
    glowColor = "blue",
  } = feature;

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
        data-section={feature.id} 
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

function AIInterpretationSection({ feature }: FeatureSectionProps) {
  const {
    title,
    description,
    items,
    badge,
  } = feature;

  return (
    <SectionContainer 
      data-section={feature.id} 
      className="zoom-section"
    >
      <MaxWidthContainer>
        <GridTwoColumns>
          <FeatureContent>
            <FeatureBadge>
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
export type { FeatureItem } from "../../data/landingData";

