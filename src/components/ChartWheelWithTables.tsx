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
    width: 100vw;
    min-height: 100vh;
    position: relative;
`;

const ChartSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-width: 0;
    height: 100vh;
    overflow: hidden;
    position: relative;
`;

const TablesSection = styled.div`
    width: 380px;
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
}

export function ChartWheelWithTables(props: ChartWheelWithTablesProps) {
    const { birthDate, birthTime, latitude, longitude, timezone, externalChartData } = props;
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
