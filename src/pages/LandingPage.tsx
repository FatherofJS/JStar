import { memo, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Background } from "../components/layout/Background";
import { useLanding } from "../hooks/useLanding";
import { useSectionObserver } from "../hooks/useScroll";
import { featuresData } from "../data/landingData";
import { SECTIONS } from "../constants";

import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import { FeatureSection, FeatureSectionAlt, AIInterpretationSection } from "../components/landing/FeatureSection";
import GetStartedSteps from "../components/landing/GetStartedSteps";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

const LandingPageShell = styled.div`
  position: relative;
  overflow-x: clip;
`;

function LandingPage() {
    const navigate = useNavigate();
    const { activeSection } = useSectionObserver();
    const { isReduced } = useLanding();

    useEffect(() => {
        document.documentElement.setAttribute('data-performance-mode', isReduced ? 'reduced' : 'default');
    }, [isReduced]);

    const handleGetStarted = useCallback(() => {
        navigate("/star-chart");
    }, [navigate]);

    const featureSections = useMemo(
        () =>
            featuresData.map((feature, index) => {
                if (feature.id === "ai-interpretations") {
                    return (
                        <AIInterpretationSection
                            key={feature.id}
                            feature={feature}
                        />
                    );
                }

                if (index % 2 === 0) {
                    return (
                        <FeatureSection
                            key={feature.id}
                            feature={feature}
                        />
                    );
                }

                return (
                    <FeatureSectionAlt
                        key={feature.id}
                        feature={feature}
                    />
                );
            }),
        []
    );

    return (
        <LandingPageShell data-performance-mode={isReduced ? "reduced" : "default"}>
            <Background
                showShootingStars={activeSection === SECTIONS.HOME}
                forceReducedMotion={isReduced}
            />

            <Header activeSection={activeSection} />

            <HeroSection />

            {featureSections}

            <GetStartedSteps />

            <CTASection onGetStarted={handleGetStarted} />

            <Footer />
        </LandingPageShell>
    );
}

export default memo(LandingPage);