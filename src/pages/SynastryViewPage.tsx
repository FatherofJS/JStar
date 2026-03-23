import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SynastryWheel } from "../components/charts/SynastryWheel";
import { ChatPopup } from "../components/chat/ChatPopup";
import { ChatFAB } from "../components/chat/ChatFAB";
import { SynastryInfoPanel } from "../components/panels/SynastryInfoPanel";
import Layout from "../components/layout/Layout";
import { API, getApiEndpoint } from "../constants";
import type { SynastryData, Subject } from "../types/chart";
import { useTheme } from "../theme";

interface SynastryState {
  person1: Subject;
  person2: Subject;
}

const ChartPageWrapper = styled.div<{ $isLight: boolean }>`
  min-height: calc(100dvh - 80px);
  padding: 20px;
  background: ${({ $isLight }) =>
    $isLight
      ? "linear-gradient(180deg, rgba(224, 242, 254, 0.96) 0%, rgba(255, 255, 255, 0.98) 100%)"
      : "transparent"};

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const StatusPanel = styled.div<{ $isLight: boolean }>`
  margin: 24px auto 0;
  max-width: 720px;
  text-align: center;
  padding: 24px 28px;
  color: ${({ $isLight }) =>
    $isLight ? "var(--text-secondary)" : "rgba(255,255,255,0.7)"};
  background: ${({ $isLight }) =>
    $isLight
      ? "rgba(255, 255, 255, 0.82)"
      : "rgba(12, 16, 24, 0.55)"};
  border: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(99, 102, 241, 0.14)" : "rgba(255,255,255,0.08)"};
  border-radius: 20px;
  box-shadow: ${({ $isLight }) =>
    $isLight
      ? "0 18px 40px rgba(148, 163, 184, 0.18)"
      : "0 18px 40px rgba(0, 0, 0, 0.28)"};
  backdrop-filter: blur(14px);
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
`;

const ErrorText = styled.p<{ $isLight: boolean }>`
  color: ${({ $isLight }) => ($isLight ? "#dc2626" : "#ff9b9b")};
  margin-bottom: 8px;
`;

const DismissButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 16px;
`;

const WheelStage = styled.div<{ $isLight: boolean }>`
  min-height: calc(100dvh - 120px);
  padding: 18px;
  border-radius: 30px;
  background: ${({ $isLight }) =>
    $isLight
      ? "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(236, 245, 255, 0.94))"
      : "linear-gradient(180deg, rgba(16, 22, 36, 0.96), rgba(9, 13, 22, 0.94))"};
  border: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(148, 163, 184, 0.28)" : "rgba(129, 140, 248, 0.14)"};
  box-shadow: ${({ $isLight }) =>
    $isLight
      ? "0 24px 60px rgba(148, 163, 184, 0.18), inset 0 1px 0 rgba(255,255,255,0.75)"
      : "0 28px 60px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.05)"};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${({ $isLight }) =>
      $isLight
        ? "radial-gradient(circle at top, rgba(99, 102, 241, 0.12), transparent 42%), linear-gradient(135deg, rgba(255,255,255,0.6), transparent 45%)"
        : "radial-gradient(circle at top, rgba(99, 102, 241, 0.18), transparent 38%), linear-gradient(135deg, rgba(129, 140, 248, 0.08), transparent 48%)"};
  }

  @media (max-width: 768px) {
    height: calc(100dvh - 104px);
    padding: 12px;
    border-radius: 20px;
  }
`;

const WheelFrame = styled.div<{ $isLight: boolean }>`
  position: relative;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: transparent;
  border: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(148, 163, 184, 0.2)" : "rgba(255,255,255,0.08)"};
  box-shadow: ${({ $isLight }) =>
    $isLight
      ? "inset 0 1px 0 rgba(255,255,255,0.85), 0 14px 32px rgba(148, 163, 184, 0.14)"
      : "inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 36px rgba(0, 0, 0, 0.24)"};

  &::after {
    content: "";
    position: absolute;
    inset: 14px;
    border-radius: 20px;
    pointer-events: none;
    border: 1px solid
      ${({ $isLight }) =>
        $isLight ? "rgba(99, 102, 241, 0.08)" : "rgba(129, 140, 248, 0.1)"};
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;


export default function SynastryViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  const locationState = location.state as SynastryState | null;
  const [chartData, setChartData] = useState<SynastryData | null>(null);
  const [loading, setLoading] = useState(!!locationState);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!locationState || !locationState.person1 || !locationState.person2) {
      navigate('/star-chart');
      return;
    }

    const fetchSynastry = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(getApiEndpoint(API.SYNASTRY), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          },
          body: JSON.stringify({
            person1: {
              name: locationState.person1.name || "User",
              date: locationState.person1.birthDate,
              time: locationState.person1.birthTime || "12:00",
              latitude: locationState.person1.latitude,
              longitude: locationState.person1.longitude || 0,
              city: (locationState.person1 as any).city || "Unknown",
              country: (locationState.person1 as any).country || "",
              timezone: locationState.person1.timezone || "UTC"
            },
            person2: {
              name: locationState.person2.name || "User",
              date: locationState.person2.birthDate,
              time: locationState.person2.birthTime || "12:00",
              latitude: locationState.person2.latitude,
              longitude: locationState.person2.longitude || 0,
              city: (locationState.person2 as any).city || "Unknown",
              country: (locationState.person2 as any).country || "",
              timezone: locationState.person2.timezone || "UTC"
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to calculate synastry chart');
        }

        const data: SynastryData = await response.json();
        setChartData(data);
      } catch (err) {
        console.error('Error fetching synastry chart:', err);
        setError(err instanceof Error ? err.message : 'Failed to calculate chart');
      } finally {
        setLoading(false);
      }
    };

    fetchSynastry();
  }, [locationState, navigate]);

  return (
    <Layout>
      <ChartPageWrapper $isLight={isLight}>
        <ContentContainer>
          {loading ? (
            <StatusPanel $isLight={isLight}>
              <LoadingText>Aligning the stars...</LoadingText>
              <p style={{ marginTop: 8, fontSize: '0.9rem', opacity: 0.8 }}>
                Calculating planetary positions for {locationState?.person1?.name} and {locationState?.person2?.name}
              </p>
            </StatusPanel>
          ) : error ? (
            <StatusPanel $isLight={isLight}>
              <ErrorText $isLight={isLight}>{error}</ErrorText>
              <DismissButton onClick={() => navigate('/star-chart')}>
                Try Again
              </DismissButton>
            </StatusPanel>
          ) : chartData ? (
            <>
              <WheelStage $isLight={isLight}>
                <WheelFrame $isLight={isLight}>
                  <SynastryWheel data={chartData} />
                </WheelFrame>
              </WheelStage>
              <SynastryInfoPanel data={chartData} isLight={isLight} />
              <ChatPopup 
                chartData={chartData} 
                chartType="synastry" 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
              />
              <ChatFAB 
                isOpen={isChatOpen} 
                onClick={() => setIsChatOpen(!isChatOpen)} 
              />
            </>
          ) : null}
        </ContentContainer>
      </ChartPageWrapper>
    </Layout>
  );
}
