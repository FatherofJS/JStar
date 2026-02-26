import styled from 'styled-components';
import { ChartWheel } from './ChartWheel';
import PlanetTable from './PlanetTable';
import AspectPanel from './AspectPanel';
import HousePanel from './HousePanel';
import InfoPanel from './InfoPanel';
import type { ChartData } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChartWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Table panels at corners
const TopLeftPanel = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 100;
`;

const TopRightPanel = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
`;

const BottomLeftPanel = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 100;
`;

const BottomRightPanel = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
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
            <ChartWrapper>
                <ChartWheel
                    birthDate={birthDate}
                    birthTime={birthTime}
                    latitude={latitude}
                    longitude={longitude}
                    timezone={timezone}
                    externalChartData={chartData}
                />
                
                {/* 4 tables at 4 corners */}
                <TopLeftPanel>
                    <InfoPanel chartData={chartData} />
                </TopLeftPanel>
                
                <TopRightPanel>
                    <PlanetTable chartData={chartData} />
                </TopRightPanel>
                
                <BottomLeftPanel>
                    <AspectPanel chartData={chartData} />
                </BottomLeftPanel>
                
                <BottomRightPanel>
                    <HousePanel chartData={chartData} />
                </BottomRightPanel>
            </ChartWrapper>
        </Container>
    );
}
