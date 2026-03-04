import React, { useState } from 'react';
import './HousePanel.css';
import type { ChartData } from '../types/chart';
import { ZODIAC_SIGNS } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';

interface HousePanelProps {
    chartData: ChartData;
}

export const HousePanel: React.FC<HousePanelProps> = ({ chartData = MOCK_CHART }) => {
    const { houses } = chartData;
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // Format degree display
    const formatDegree = (signDegree: number) => {
        const degrees = Math.floor(signDegree);
        const minutesDecimal = (signDegree - degrees) * 60;
        const minutes = Math.floor(minutesDecimal);
        const seconds = Math.round((minutesDecimal - minutes) * 60);
        return `${degrees}°${minutes}'${seconds}"`;
    };

    // Get house ordinal
    const getHouseOrdinal = (house: number): string => {
        const ordinals = [
            'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth',
            'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'
        ];
        return ordinals[house - 1] || `${house}th`;
    };

    return (
        <div className="house-panel-container">
            <div className="house-panel-header" onClick={toggleExpanded}>
                <h3 className="panel-title">Natal Houses</h3>
                <button className="expand-btn" aria-expanded={isExpanded}>
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
                </button>
            </div>

            <div className={`house-panel-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <table className="house-table">
                    <tbody>
                        {houses.map((house) => (
                            <tr key={house.id} className="house-row">
                                <td className="house-number">{getHouseOrdinal(house.id)} House:</td>
                                <td className="house-position">
                                     <span className="house-indicator">{ZODIAC_SIGNS[house.sign]?.symbol}</span>
                                     {formatDegree(house.signDegree)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

//export default HousePanel;