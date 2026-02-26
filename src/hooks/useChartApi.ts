import { useState, useCallback } from 'react';
import type { ChartData } from '../types/chart';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface UseChartApiReturn {
  chartData: ChartData | null;
  loading: boolean;
  error: string | null;
  fetchChart: (birthDate: string, birthTime: string, latitude: number, longitude: number, timezone?: string) => Promise<ChartData | null>;
}

export function useChartApi(): UseChartApiReturn {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChart = useCallback(async (
    birthDate: string,
    birthTime: string,
    latitude: number,
    longitude: number,
    timezone: string = 'UTC'
  ): Promise<ChartData | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chart/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthDate,
          birthTime,
          latitude,
          longitude,
          timezone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to calculate chart');
      }

      const data: ChartData = await response.json();
      setChartData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching chart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    chartData,
    loading,
    error,
    fetchChart,
  };
}
