import React, { useState } from 'react';
import { type ChartData, ASPECT_SYMBOLS } from '../types/chart';
import './AspectPanel.css';

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
        <div className="aspect-panel-container">
            <div className="aspect-panel-header" onClick={() => setIsExpanded(!isExpanded)}>
                <span className="title">Aspects</span>
                <span className={`toggle-icon ${isExpanded ? 'open' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>

            <div className={`aspect-panel-body ${isExpanded ? 'show' : ''}`}>
                <div className="grid-scroll-container">
                    <div className="aspect-grid">
                        {points.map((rowPoint, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="grid-row">
                                {points.map((colPoint, colIndex) => {
                                    if (colIndex < rowIndex) {
                                        const aspect = getAspectSymbol(rowPoint.name, colPoint.name);
                                        return (
                                            <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
                                                {aspect && (
                                                    <span className={`aspect-icon ${aspect.type}`}>
                                                        {aspect.symbol}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    }
                                    if (colIndex === rowIndex) {
                                        return (
                                            <div key={`label-${rowIndex}`} className="grid-cell label-cell">
                                                {rowPoint.symbol}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AspectPanel;
