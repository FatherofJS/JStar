import React, { useState } from 'react';
import type { ChartData } from '../types/chart';
import {
    HousePanelContainer,
    HousePanelHeader,
    PanelTitle,
    MenuButton,
    ExpandButton,
    HousePanelContent,
    HouseTable,
    HouseRow,
    HouseCell,
    HouseNumber,
    HousePosition,
    HouseIndicator,
} from './HousePanel.styles';

interface HousePanelProps {
    chartData: ChartData;
}

const HousePanel: React.FC<HousePanelProps> = ({ chartData }) => {
    const { houses } = chartData;
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // Format degree display
    const formatDegree = (signDegree: number) => {
        const degrees = Math.floor(signDegree);
        const minutes = Math.round((signDegree - degrees) * 60);
        return `${degrees}°${minutes}'${Math.round((signDegree - degrees - minutes/60) * 3600)}"`;
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
        <HousePanelContainer>
            <HousePanelHeader onClick={toggleExpanded}>
                <PanelTitle>Natal Houses</PanelTitle>
                <MenuButton>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
                        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                        <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
                    </svg>
                </MenuButton>
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
            </HousePanelHeader>

            <HousePanelContent $expanded={isExpanded}>
                <HouseTable>
                    <tbody>
                        {houses.map((house) => (
                            <HouseRow key={house.id}>
                                <HouseNumber>{getHouseOrdinal(house.id)} House:</HouseNumber>
                                <HousePosition>
                                    <HouseIndicator></HouseIndicator>
                                    {formatDegree(house.signDegree)}
                                </HousePosition>
                            </HouseRow>
                        ))}
                    </tbody>
                </HouseTable>
            </HousePanelContent>
        </HousePanelContainer>
    );
};

export default HousePanel;
