// OpenSourceSection Component - Open source information and community

import { memo } from "react";
import {
  OpenSourceSectionWrapper,
  OpenSourceContent,
  OpenSourceBadge,
  OpenSourceTitle,
  OpenSourceDescription,
  OpenSourceCards,
  OpenSourceCard,
  OpenSourceCardTitle,
  OpenSourceCardDesc,
  OpenSourceButtons,
  OpenSourceButton,
  MaxWidthContainer,
} from "./styles/OpenSourceSection.styles.ts";

// SVG Icons
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Card {
  icon: "code" | "heart" | "github";
  title: string;
  description: string;
}

function OpenSourceSection() {
  const cards: Card[] = [
    {
      icon: "code",
      title: "Transparency",
      description: "Our core calculation engine is open for inspection. You know exactly how your charts are calculated.",
    },
    {
      icon: "heart",
      title: "Sustainability",
      description: "Your subscription directly funds the development of free software tools for the entire astrology community.",
    },
    {
      icon: "github",
      title: "Community",
      description: "Join a project that values collaboration. Contribute code, report issues, or suggest features on GitHub.",
    },
  ];

  const getIcon = (iconType: Card["icon"]) => {
    switch (iconType) {
      case "code":
        return <CodeIcon />;
      case "heart":
        return <HeartIcon />;
      case "github":
        return <GithubIcon />;
    }
  };

  return (
    <OpenSourceSectionWrapper data-section="open-source">
      <MaxWidthContainer>
        <OpenSourceContent>
          <OpenSourceBadge>
            <CodeIcon />
            100% Open Source • AGPLv3 License
          </OpenSourceBadge>

          <OpenSourceTitle>
            Professional software with an <span style={{
              background: 'linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Open Source Heart</span>
          </OpenSourceTitle>

          <OpenSourceDescription>
            <strong>JSTAR is fully open source</strong>, licensed under the AGPLv3.
            Built with industry-standard astrology engines used by thousands of developers.
            We believe in transparency and the spirit of libre software.
          </OpenSourceDescription>

          <OpenSourceCards>
            {cards.map((card, index) => (
              <OpenSourceCard key={index}>
                {getIcon(card.icon)}
                <OpenSourceCardTitle>{card.title}</OpenSourceCardTitle>
                <OpenSourceCardDesc>{card.description}</OpenSourceCardDesc>
              </OpenSourceCard>
            ))}
          </OpenSourceCards>

          <OpenSourceButtons>
            <OpenSourceButton
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
            >
              <GithubIcon />
              JSCLUB on GitHub
            </OpenSourceButton>
          </OpenSourceButtons>
        </OpenSourceContent>
      </MaxWidthContainer>
    </OpenSourceSectionWrapper>
  );
}

export default memo(OpenSourceSection);

