import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChartWheel } from './ChartWheel';
import PlanetTable from './PlanetTable';
import AspectPanel from './AspectPanel';
import HousePanel from './HousePanel';
import InfoPanel from './InfoPanel';
import type { ChartData } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';
import { useChartApi } from '../hooks/useChartApi';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-height: 100vh;
    position: relative;
    background: rgba(10, 10, 20, 0.95);
`;

const LeftSection = styled.div`
    width: 360px;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    padding-left: 30px;
    max-height: 100vh;
    overflow-y: auto;
    background: rgba(10, 10, 20, 0.95);
    position: relative;
    z-index: 100;
`;

const TableWrapper = styled.div`
    width: 100%;
`;

const CenterSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const ChartWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightSection = styled.div`
    width: 360px;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    padding-right: 30px;
    max-height: 100vh;
    overflow-y: auto;
    background: rgba(10, 10, 20, 0.95);
    position: relative;
    z-index: 100;
`;

interface ChartWheelWithTablesProps {
    birthDate?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    externalChartData?: ChartData | null;
    name?: string;
}

export function ChartWheelWithTables(props: ChartWheelWithTablesProps) {
    const { birthDate, birthTime, latitude, longitude, timezone, externalChartData, name } = props;
    const { chartData: fetchedChartData, loading, error, fetchChart } = useChartApi();
    
    // State để lưu chartData - ưu tiên: externalChartData > fetchedChartData > MOCK_CHART
    const [chartData, setChartData] = useState<ChartData | null>(externalChartData || null);
    
    // Gọi API khi có birthDate và chưa có externalChartData
    useEffect(() => {
        if (birthDate && !externalChartData) {
            fetchChart(birthDate, birthTime || '12:00', latitude || 0, longitude || 0, timezone || 'UTC')
                .then((data) => {
                    if (data) {
                        setChartData(data);
                    }
                });
        }
    }, [birthDate, birthTime, latitude, longitude, timezone, externalChartData, fetchChart]);
    
    // Cập nhật chartData khi có fetched data
    useEffect(() => {
        if (fetchedChartData && !externalChartData) {
            setChartData(fetchedChartData);
        }
    }, [fetchedChartData, externalChartData]);
    
    // Cập nhật chartData khi externalChartData thay đổi
    useEffect(() => {
        if (externalChartData) {
            setChartData(externalChartData);
        }
    }, [externalChartData]);
    
    // Sử dụng MOCK_CHART như fallback cuối cùng khi không có dữ liệu
    const displayChartData = chartData || MOCK_CHART;

    return (
        <Container>
            {/* Left side: Birth Info + Natal Points */}
            <LeftSection>
                <TableWrapper>
                    <InfoPanel chartData={displayChartData} />
                </TableWrapper>
                <TableWrapper>
                    <PlanetTable chartData={displayChartData} />
                </TableWrapper>
            </LeftSection>
            
            {/* Center: ChartWheel */}
            <CenterSection>
                <ChartWrapper>
                    <ChartWheel
                        birthDate={birthDate}
                        birthTime={birthTime}
                        latitude={latitude}
                        longitude={longitude}
                        timezone={timezone}
                        externalChartData={chartData}
                        name={name}
                    />
                </ChartWrapper>
            </CenterSection>
            
            {/* Right side: Natal Houses + Aspect */}
            <RightSection>
                <TableWrapper>
                    <HousePanel chartData={displayChartData} />
                </TableWrapper>
                <TableWrapper>
                    <AspectPanel chartData={displayChartData} />
                </TableWrapper>
            </RightSection>
        </Container>
    );
}
