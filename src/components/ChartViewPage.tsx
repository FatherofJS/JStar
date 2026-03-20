import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ChartWheel } from "./ChartWheel";
import Layout from "./Layout";
import { MOCK_CHART } from "../data/mockData";
import { API, getApiEndpoint } from "../constants";
import type { Aspect, ChartData } from "../types/chart";
import { useTheme } from "../contexts/ThemeContext";
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
`;

const WheelStage = styled.div<{ $isLight: boolean }>`
  height: calc(100dvh - 120px);
  padding: 20px;
  border-radius: 28px;
  background: ${({ $isLight }) =>
    $isLight
      ? "radial-gradient(circle at top, rgba(99, 102, 241, 0.1), transparent 45%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(241,245,249,0.92))"
      : "transparent"};
  border: ${({ $isLight }) =>
    $isLight ? "1px solid rgba(148, 163, 184, 0.2)" : "none"};
  box-shadow: ${({ $isLight }) =>
    $isLight ? "0 24px 60px rgba(148, 163, 184, 0.18)" : "none"};

  @media (max-width: 768px) {
    height: calc(100dvh - 104px);
    padding: 12px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    height: calc(100dvh - 96px);
    padding: 8px;
    border-radius: 16px;
  }
`;

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
  const shouldFetchChart =
    Boolean(locationState?.birthDate) &&
    locationState?.latitude !== undefined &&
    !locationState?.chartData;
  const [chartData, setChartData] = useState<ChartData>(stateChartData ?? MOCK_CHART);
  const [loading, setLoading] = useState(shouldFetchChart);
  const [error, setError] = useState<string | null>(null);

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
          setChartData(normalizeChartData(data as ChartData));
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [locationState]);

  const displayedChartData = stateChartData ?? chartData;

  return (
    <Layout>
      <ChartPageWrapper className="chart-page" $isLight={isLight}>
        {loading && (
          <StatusPanel $isLight={isLight}>
            <LoadingText>Calculating your cosmic chart...</LoadingText>
          </StatusPanel>
        )}

        {error && (
          <StatusPanel $isLight={isLight}>
            <ErrorText $isLight={isLight}>{error}</ErrorText>
            <DismissButton onClick={() => setError(null)}>
              Dismiss
            </DismissButton>
          </StatusPanel>
        )}

        {!loading && (
          <WheelStage $isLight={isLight}>
            <div className="chart-wheel-container" style={{ height: "100%" }}>
              <ChartWheel data={displayedChartData} />
            </div>
          </WheelStage>
        )}
      </ChartPageWrapper>
    </Layout>
  );
}
