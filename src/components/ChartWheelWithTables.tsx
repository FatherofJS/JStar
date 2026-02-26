import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChartWheel } from './ChartWheel';
import PlanetTable from './PlanetTable';
import AspectPanel from './AspectPanel';
import HousePanel from './HousePanel';
import InfoPanel from './InfoPanel';
import type { ChartData } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    
    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ChartSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-width: 0;
`;

const TablesSection = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 20px;
    
    @media (max-width: 1200px) {
        width: 100%;
        max-width: 500px;
        padding-right: 0;
    }
`;

interface ChartWheelWithTablesProps {
    birthDate?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    externalChartData?: ChartData | null;
}

export function ChartWheelWithTables({
    birthDate,
    birthTime,
    latitude,
    longitude,
    timezone,
    externalChartData
}: ChartWheelWithTablesProps) {
    // Use external data or mock data for now
    const chartData = externalChartData || MOCK_CHART;

    return (
        <Container>
            <ChartSection>
                <ChartWheel
                    birthDate={birthDate}
                    birthTime={birthTime}
                    latitude={latitude}
                    longitude={longitude}
                    timezone={timezone}
                    externalChartData={chartData}
                />
            </ChartSection>
            
            <TablesSection>
                <InfoPanel chartData={chartData} />
                <PlanetTable chartData={chartData} />
                <AspectPanel chartData={chartData} />
                <HousePanel chartData={chartData} />
            </TablesSection>
        </Container>
    );
}
