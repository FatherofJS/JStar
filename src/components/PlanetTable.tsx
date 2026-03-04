import React, { useState } from 'react';
import './PlanetTable.css';
import type { ChartData } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';

interface PlanetTableProps {
    chartData: ChartData;
}

export const PlanetTable: React.FC<PlanetTableProps> = ({ chartData = MOCK_CHART }) => {
    const { planets, angles } = chartData;
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getZodiacSymbol = (sign: string): string => {
    const zodiacSymbols: Record<string, string> = {
        'Aries': '♈',
        'Taurus': '♉',
        'Gemini': '♊',
        'Cancer': '♋',
        'Leo': '♌',
        'Virgo': '♍',
        'Libra': '♎',
        'Scorpio': '♏',
        'Sagittarius': '♐',
        'Capricorn': '♑',
        'Aquarius': '♒',
        'Pisces': '♓'
    };
    return zodiacSymbols[sign] || '';
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
        <div className="planet-table-container">
            <div className="planet-table-header" onClick={toggleExpanded}>
                <h3 className="table-title">Natal Points</h3>
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

            <div className={`planet-table-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <table className="planet-table">
                    <tbody>
                        {allPoints.map((point, index) => (
                            <tr key={point.id || index} className="planet-row">
                                <td className="planet-name">{point.name}:</td>
                                <td className="planet-position">
                                    <span className="position-indicator">{getZodiacSymbol(point.sign)}</span>
                                    {formatDegree(point.signDegree)}
                                </td>
                                <td className="planet-house">{getHouseOrdinal(point.house)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

//export default PlanetTable;