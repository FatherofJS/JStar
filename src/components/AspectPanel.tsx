import React, { useState } from 'react';
import { type ChartData, ASPECT_SYMBOLS } from '../types/chart';
import {
    AspectPanelContainer,
    AspectPanelHeader,
    AspectPanelTitle,
    ToggleIcon,
    AspectPanelBody,
    GridScrollContainer,
    AspectGrid,
    GridRow,
    GridCell,
    LabelCell,
    AspectIcon,
} from './AspectPanel.styles';

interface AspectPanelProps {
    chartData: ChartData;
}

const AspectPanel: React.FC<AspectPanelProps> = ({ chartData }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const points = [
        ...chartData.planets.map(p => ({ name: p.name, symbol: p.symbol })),
        ...chartData.angles.map(a => ({ 
            name: a.name, 
            symbol: a.name === "Ascendant" ? "As" : a.name === "Midheaven" ? "Mc" : "?" 
        }))
    ];

    const getAspectSymbol = (p1: string, p2: string) => {
        const aspect = chartData.aspects.find(a => 
            (a.planet1 === p1 && a.planet2 === p2) || 
            (a.planet1 === p2 && a.planet2 === p1)
        );
        return aspect ? { type: aspect.type, symbol: ASPECT_SYMBOLS[aspect.type] } : null;
    };

    return (
        <AspectPanelContainer>
            <AspectPanelHeader onClick={() => setIsExpanded(!isExpanded)}>
                <AspectPanelTitle>Aspects</AspectPanelTitle>
                <ToggleIcon $isOpen={isExpanded}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </ToggleIcon>
            </AspectPanelHeader>

            <AspectPanelBody $show={isExpanded}>
                <GridScrollContainer>
                    <AspectGrid>
                        {points.map((rowPoint, rowIndex) => (
                            <GridRow key={`row-${rowIndex}`}>
                                {points.map((colPoint, colIndex) => {
                                    if (colIndex < rowIndex) {
                                        const aspect = getAspectSymbol(rowPoint.name, colPoint.name);
                                        return (
                                            <GridCell key={`${rowIndex}-${colIndex}`}>
                                                {aspect && (
                                                    <AspectIcon $aspectType={aspect.type}>
                                                        {aspect.symbol}
                                                    </AspectIcon>
                                                )}
                                            </GridCell>
                                        );
                                    }
                                    if (colIndex === rowIndex) {
                                        return (
                                            <LabelCell key={`label-${rowIndex}`}>
                                                {rowPoint.symbol}
                                            </LabelCell>
                                        );
                                    }
                                    return null;
                                })}
                            </GridRow>
                        ))}
                    </AspectGrid>
                </GridScrollContainer>
            </AspectPanelBody>
        </AspectPanelContainer>
    );
};

export default AspectPanel;
