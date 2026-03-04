// ChartViewPage — Full-width chart wheel, no tables
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { ChartWheel } from './ChartWheel';
import { MOCK_CHART } from '../data/mockData';
import { API, getApiEndpoint } from '../constants';
import type { ChartData } from '../types/chart';
import '../App.css';

interface BirthState {
    birthDate?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    name?: string;
    chartData?: ChartData;
}

export default function ChartViewPage() {
    const location = useLocation();
    const [chartData, setChartData] = useState<ChartData>(MOCK_CHART);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isClosed] = useState(false);

    // Fetch chart from backend when navigated with birth data
    useEffect(() => {
        const state = location.state as BirthState | null;
        if (!state) return;

        if (state.chartData) {
            setChartData({
                ...state.chartData,
                aspects: state.chartData.aspects.map((a: any) => ({ ...a, applying: a.applying ?? false })),
            });
            return;
        }

        if (state.birthDate && state.latitude !== undefined) {
            setLoading(true);
            setError(null);

            fetch(getApiEndpoint(API.CHART), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: state.name || 'User',
                    date: state.birthDate,
                    time: state.birthTime || '12:00',
                    latitude: state.latitude,
                    longitude: state.longitude || 0,
                    timezone: state.timezone || 'UTC',
                }),
            })
                .then(res => {
                    if (!res.ok) throw new Error(`Server error: ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    setChartData({
                        ...data,
                        aspects: (data.aspects || []).map((a: any) => ({ ...a, applying: a.applying ?? false })),
                    });
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [location.state]);

    return (
        <div className="chart-page">
            <Header isClosed={isClosed} />

            {loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' }}>
                    <p style={{ fontSize: '1.2rem' }}>✨ Calculating your cosmic chart...</p>
                </div>
            )}

            {error && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: '#ff6b6b', marginBottom: '8px' }}>⚠️ {error}</p>
                    <button onClick={() => setError(null)}
                        style={{ padding: '6px 16px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Dismiss
                    </button>
                </div>
            )}

            {!loading && (
                <div className="chart-wheel-container">
                    <ChartWheel data={chartData} />
                </div>
            )}
        </div>
    );
}
