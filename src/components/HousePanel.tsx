import React, { useState } from 'react';
import './HousePanel.css';
import type { ChartData } from '../types/chart';

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
        <div className="house-panel-container">
            <div className="house-panel-header" onClick={toggleExpanded}>
                <h3 className="panel-title">Natal Houses</h3>
                <button className="menu-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
                        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                        <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
                    </svg>
                </button>
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
                                    <span className="house-indicator"></span>
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

export default HousePanel;
