import { memo, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Background } from "../components/layout/Background";
import { useLanding } from "../hooks/useLanding";
import { useSectionObserver } from "../hooks/useScroll";
import { featuresData } from "../data/landingData";
// import { SECTIONS } from "../constants";

import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import { AIInterpretationSection, FeatureSection, FeatureSectionAlt } from "../components/landing/FeatureSection";
import DocsSection from "../components/landing/DocsSection";
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

    useEffect(() => {
        if (window.location.hash === '#docs') {
            setTimeout(() => {
                document.querySelector('[data-section="docs"]')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, []);

    const handleGetStarted = useCallback(() => {
        navigate("/star-chart");
    }, [navigate]);

    const featureSections = useMemo(
        () =>
            featuresData.map((feature, index) => {
                if (feature.id === "ai-interpretations" || feature.id === "chatbot") {
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
                showShootingStars={true}
                forceReducedMotion={false}
            />

            <Header activeSection={activeSection} />

            <HeroSection />

            <div data-section="features">
                {featureSections}
            </div>

            <DocsSection />

            <CTASection onGetStarted={handleGetStarted} />

            <Footer />
        </LandingPageShell>
    );
}

export default memo(LandingPage);