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
    background: rgba(10, 10, 20, 0.95);
`;

const LeftSection = styled.div`
    width: 280px;
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
    width: 280px;
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
            {/* Left side: Birth Info + Natal Points */}
            <LeftSection>
                <TableWrapper>
                    <InfoPanel chartData={chartData} />
                </TableWrapper>
                <TableWrapper>
                    <PlanetTable chartData={chartData} />
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
                    />
                </ChartWrapper>
            </CenterSection>
            
            {/* Right side: Natal Houses + Aspect */}
            <RightSection>
                <TableWrapper>
                    <HousePanel chartData={chartData} />
                </TableWrapper>
                <TableWrapper>
                    <AspectPanel chartData={chartData} />
                </TableWrapper>
            </RightSection>
        </Container>
    );
}
