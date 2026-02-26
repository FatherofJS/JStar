import React, { useState } from 'react';
import type { ChartData } from '../types/chart';
import {
    PlanetTableContainer,
    PlanetTableHeader,
    TableTitle,
    ExpandButton,
    PlanetTableContent,
    PlanetTable as StyledPlanetTable,
    PlanetRow,
    PlanetCell,
    PlanetName,
    PlanetPosition,
    PositionIndicator,
    PlanetHouse,
} from './PlanetTable.styles';

interface PlanetTableProps {
    chartData: ChartData;
}

const PlanetTable: React.FC<PlanetTableProps> = ({ chartData }) => {
    const { planets, angles } = chartData;
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // Combine planets and angles
    const allPoints = [
        ...planets,
        ...angles.map(a => ({
            id: a.id,
            name: a.name,
            symbol: '',
            sign: a.sign,
            signDegree: a.signDegree,
            longitude: a.longitude,
            house: a.name === 'Ascendant' ? 1 :
                   a.name === 'Midheaven' ? 10 :
                   a.name === 'Descendant' ? 7 : 4,
            speed: 0,
            retrograde: false
        }))
    ];

    // Format degree display
    const formatDegree = (signDegree: number) => {
        const degrees = Math.floor(signDegree);
        const minutes = Math.round((signDegree - degrees) * 60);
        return `${degrees}°${minutes}'`;
    };

    // Get house ordinal
    const getHouseOrdinal = (house: number) => {
        if (house === 11 || house === 12 || house === 13) return `${house}th`;
        const lastDigit = house % 10;
        if (lastDigit === 1) return `${house}st`;
        if (lastDigit === 2) return `${house}nd`;
        if (lastDigit === 3) return `${house}rd`;
        return `${house}th`;
    };

    return (
        <PlanetTableContainer>
            <PlanetTableHeader onClick={toggleExpanded}>
                <TableTitle>Natal Points</TableTitle>
                <ExpandButton $expanded={isExpanded} aria-expanded={isExpanded}>
                    <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 12 12" 
                        fill="none"
                        style={{ 
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }}
                    >
                        <path d="M6 9L3 6L9 6L6 9Z" fill="currentColor"/>
                    </svg>
                </ExpandButton>
            </PlanetTableHeader>

            <PlanetTableContent $expanded={isExpanded}>
                <StyledPlanetTable>
                    <tbody>
                        {allPoints.map((point, index) => (
                            <PlanetRow key={point.id || index}>
                                <PlanetName>{point.name}:</PlanetName>
                                <PlanetPosition>
                                    <PositionIndicator></PositionIndicator>
                                    {formatDegree(point.signDegree)}
                                </PlanetPosition>
                                <PlanetHouse>{getHouseOrdinal(point.house)}</PlanetHouse>
                            </PlanetRow>
                        ))}
                    </tbody>
                </StyledPlanetTable>
            </PlanetTableContent>
        </PlanetTableContainer>
    );
};

export default PlanetTable;
