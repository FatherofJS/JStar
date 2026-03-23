import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ChartWheel } from "../components/charts/ChartWheel";
import { ChatPopup } from "../components/chat/ChatPopup";
import { ChatFAB } from "../components/chat/ChatFAB";
import { NatalInfoPanel } from "../components/panels/NatalInfoPanel";
import Layout from "../components/layout/Layout";
import { API, getApiEndpoint } from "../constants";
import type { Aspect, ChartData } from "../types/chart";
import { useTheme } from "../theme";
import "../App.css";

interface BirthState {
  birthDate?: string;
  birthTime?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  name?: string;
  chartData?: ChartData;
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
`;

const WheelStage = styled.div<{ $isLight: boolean }>`
  min-height: calc(100dvh - 120px);
  padding: 18px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100dvh - 104px);
    padding: 12px;
  }

  @media (max-width: 480px) {
    height: calc(100dvh - 96px);
    padding: 8px;
  }
`;

const WheelFrame = styled.div<{ $isLight: boolean }>`
  position: relative;
  height: 100%;
  background: transparent;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const CHART_CACHE_KEY = "jstar_chart_cache";

function isValidChartData(data: unknown): data is ChartData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return Array.isArray(d.planets) && Array.isArray(d.houses) && Array.isArray(d.aspects);
}

function loadCachedChart(): ChartData | null {
  try {
    const raw = sessionStorage.getItem(CHART_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidChartData(parsed) ? parsed : null;
  } catch {
    sessionStorage.removeItem(CHART_CACHE_KEY);
    return null;
  }
}

function saveChartToCache(data: ChartData) {
  try {
    sessionStorage.setItem(CHART_CACHE_KEY, JSON.stringify(data));
  } catch {
    /* quota exceeded — silently ignore */
  }
}

function normalizeChartData(data: ChartData): ChartData {
  return {
    ...data,
    aspects: data.aspects.map((aspect: Aspect) => ({
      ...aspect,
      applying: aspect.applying ?? false,
    })),
  };
}

export default function ChartViewPage() {
  const location = useLocation();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const locationState = location.state as BirthState | null;
  const stateChartData = useMemo(
    () => (locationState?.chartData ? normalizeChartData(locationState.chartData) : null),
    [locationState]
  );
  const cachedData = useMemo(() => (!locationState ? loadCachedChart() : null), [locationState]);
  const shouldFetchChart =
    Boolean(locationState?.birthDate) &&
    locationState?.latitude !== undefined &&
    !locationState?.chartData;
  const [chartData, setChartData] = useState<ChartData | null>(stateChartData ?? cachedData ?? null);
  const [loading, setLoading] = useState(shouldFetchChart);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const state = locationState;
    if (!state) return;
    if (state.chartData) return;

    if (state.birthDate && state.latitude !== undefined) {
      fetch(getApiEndpoint(API.CHART), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name || "User",
          date: state.birthDate,
          time: state.birthTime || "12:00",
          latitude: state.latitude,
          longitude: state.longitude || 0,
          timezone: state.timezone || "UTC",
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Server error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const normalized = normalizeChartData(data as ChartData);
          setChartData(normalized);
          saveChartToCache(normalized);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [locationState]);

  // Cache chart data passed via navigation state
  useEffect(() => {
    if (stateChartData) {
      saveChartToCache(stateChartData);
    }
  }, [stateChartData]);

  const displayedChartData = stateChartData ?? chartData;

  return (
    <Layout>
      <ChartPageWrapper className="chart-page" $isLight={isLight}>
        {loading && (
          <LoadingOverlay $isLight={isLight}>
            <LoadingSpinner $isLight={isLight} />
            <LoadingText>Calculating your cosmic chart...</LoadingText>
          </LoadingOverlay>
        )}

        {error && (
          <StatusPanel $isLight={isLight}>
            <ErrorText $isLight={isLight}>{error}</ErrorText>
            <DismissButton onClick={() => setError(null)}>
              Dismiss
            </DismissButton>
          </StatusPanel>
        )}

        {!loading && displayedChartData && (
          <ContentContainer>
            <WheelStage $isLight={isLight}>
              <WheelFrame $isLight={isLight}>
                <div className="chart-wheel-container" style={{ height: "100%" }}>
                  <ChartWheel data={displayedChartData!} />
                </div>
              </WheelFrame>
            </WheelStage>
            <NatalInfoPanel data={displayedChartData!} isLight={isLight} />
            <ChatPopup
              chartData={displayedChartData!}
              chartType="natal"
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
            <ChatFAB
              isOpen={isChatOpen}
              onClick={() => setIsChatOpen(!isChatOpen)}
            />
          </ContentContainer>
        )}
      </ChartPageWrapper>
    </Layout>
  );
}
