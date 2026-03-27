import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SynastryWheel } from "../components/charts/SynastryWheel";
import { ChatPopup } from "../components/chat/ChatPopup";
import { ChatFAB } from "../components/chat/ChatFAB";
import { SynastryInfoPanel } from "../components/panels/SynastryInfoPanel";
import { GuidedTour } from "../components/ui/GuidedTour";
import { synastryTourSteps } from "../data/tourSteps";
import Layout from "../components/layout/Layout";
import { API, getApiEndpoint } from "../constants";
import type { SynastryData, Subject } from "../types/chart";
import { useTheme } from "../theme";
import { Background } from "../components/layout/Background";
interface SynastryState {
  person1: Subject;
  person2: Subject;
}

const ChartPageWrapper = styled.div<{ $isLight: boolean }>`
  min-height: calc(100dvh - 80px);
  padding: 20px;
  background: transparent;

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

const LoadingOverlay = styled.div<{ $isLight: boolean }>`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ $isLight }) =>
    $isLight
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(10, 14, 23, 0.8)"};
  backdrop-filter: blur(12px);
  z-index: 100;
  color: ${({ $isLight }) => ($isLight ? "#1e293b" : "#fff")};
`;

const LoadingSpinner = styled.div<{ $isLight: boolean }>`
  width: 50px;
  height: 50px;
  border: 4px solid ${({ $isLight }) => ($isLight ? "rgba(99, 102, 241, 0.2)" : "rgba(129, 140, 248, 0.2)")};
  border-top-color: ${({ $isLight }) => ($isLight ? "#4f46e5" : "#818cf8")};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  letter-spacing: 1px;
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
  padding: 18px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const WheelFrame = styled.div<{ $isLight: boolean }>`
  position: relative;
  background: transparent;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;


const SYNASTRY_CACHE_KEY = "jstar_synastry_cache";

function isValidSynastryData(data: unknown): data is SynastryData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    d.person1 != null &&
    d.person2 != null &&
    Array.isArray(d.person1_planets) &&
    Array.isArray(d.person2_planets) &&
    Array.isArray(d.aspects)
  );
}

function loadCachedSynastry(): SynastryData | null {
  try {
    const raw = sessionStorage.getItem(SYNASTRY_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidSynastryData(parsed) ? parsed : null;
  } catch {
    sessionStorage.removeItem(SYNASTRY_CACHE_KEY);
    return null;
  }
}

function saveSynastryToCache(data: SynastryData) {
  try {
    sessionStorage.setItem(SYNASTRY_CACHE_KEY, JSON.stringify(data));
  } catch {
    /* quota exceeded — silently ignore */
  }
}

export default function SynastryViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  const locationState = location.state as SynastryState | null;
  const cachedData = !locationState ? loadCachedSynastry() : null;
  const [chartData, setChartData] = useState<SynastryData | null>(cachedData);
  const [loading, setLoading] = useState(!!locationState);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  useEffect(() => {
    const handler = () => setIsTourActive(true);
    window.addEventListener('jstar-start-tour', handler);
    return () => window.removeEventListener('jstar-start-tour', handler);
  }, []);

  useEffect(() => {
    // If no state from navigation AND no cached data, redirect
    if (!locationState || !locationState.person1 || !locationState.person2) {
      if (!cachedData) {
        navigate('/star-chart');
      }
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
        saveSynastryToCache(data);
      } catch (err) {
        console.error('Error fetching synastry chart:', err);
        setError(err instanceof Error ? err.message : 'Failed to calculate chart');
      } finally {
        setLoading(false);
      }
    };

    fetchSynastry();
  }, [locationState, navigate, cachedData]);

  return (
    <Layout>
      <Background />
      <ChartPageWrapper $isLight={isLight}>
        <ContentContainer>
          {loading ? (
            <LoadingOverlay $isLight={isLight}>
              <LoadingSpinner $isLight={isLight} />
              <LoadingText>Đang căn chỉnh các vì sao...</LoadingText>
              <p style={{ marginTop: 8, fontSize: '0.9rem', opacity: 0.8 }}>
                Đang tính vị trí hành tinh cho {locationState?.person1?.name} và {locationState?.person2?.name}
              </p>
            </LoadingOverlay>
          ) : error ? (
            <StatusPanel $isLight={isLight}>
              <ErrorText $isLight={isLight}>{error}</ErrorText>
              <DismissButton onClick={() => navigate('/star-chart')}>
                Thử lại
              </DismissButton>
            </StatusPanel>
          ) : chartData ? (
            <>
              <WheelStage $isLight={isLight} data-tour="synastry-chart">
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
              <GuidedTour
                steps={synastryTourSteps}
                storageKey="synastry-tour"
                isActive={isTourActive}
                onComplete={() => setIsTourActive(false)}
                onStepChange={(i) => {
                  if (i === synastryTourSteps.length - 1) setIsChatOpen(true);
                  else setIsChatOpen(false);
                }}
              />
            </>
          ) : null}
        </ContentContainer>
      </ChartPageWrapper>
    </Layout>
  );
}
