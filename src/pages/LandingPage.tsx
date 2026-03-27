import { memo, useCallback, useMemo, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Background } from "../components/layout/Background";
import { useLanding } from "../hooks/useLanding";
import { featuresData } from "../data/landingData";

import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";

// Lazy load below-the-fold components
const AboutUs = lazy(() => import("../components/AboutUs/AboutUs").then(module => ({ default: module.AboutUs })));
const DocsSection = lazy(() => import("../components/landing/DocsSection"));
const CTASection = lazy(() => import("../components/landing/CTASection"));
const Footer = lazy(() => import("../components/landing/Footer"));
// Note: Feature sections are mapped dynamically, so their lazy versions need to handle the named exports
const AIInterpretationSection = lazy(() => import("../components/landing/FeatureSection").then(module => ({ default: module.AIInterpretationSection })));
const FeatureSection = lazy(() => import("../components/landing/FeatureSection").then(module => ({ default: module.FeatureSection })));
const FeatureSectionAlt = lazy(() => import("../components/landing/FeatureSection").then(module => ({ default: module.FeatureSectionAlt })));

const LandingPageShell = styled.div`
  position: relative;
  overflow-x: clip;
`;

function LandingPage() {
    const navigate = useNavigate();
    useLanding();

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
        <LandingPageShell>
            <Background />

            <Header />

            <HeroSection />

            <Suspense fallback={<div style={{ height: "100vh", opacity: 0 }} />}>
                <div data-section="about" className="zoom-section">
                    <AboutUs />
                </div>

                <div data-section="features">
                    {featureSections}
                </div>

                <div data-section="docs" className="zoom-section">
                    <DocsSection />
                </div>

                <CTASection onGetStarted={handleGetStarted} />

                <Footer />
            </Suspense>
        </LandingPageShell>
    );
}

export default memo(LandingPage);