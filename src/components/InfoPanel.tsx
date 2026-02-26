import React, { useState } from 'react';
import './InfoPanel.css';
import type { ChartData } from '../types/chart';

interface InfoPanelProps {
    chartData: ChartData;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ chartData }) => {
    const { subject } = chartData;
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDateTime = (date: string, time: string) => {
        const parts = date.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]} ${time}`;
        }
        return `${date} ${time}`;
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const name = subject?.name || 'Your Chart';
    const birthDate = subject?.birthDate || '';
    const birthTime = subject?.birthTime || '';
    const location = subject?.location || 'Unknown';
    const timezone = subject?.timezone || 'UTC';
    const latitude = subject?.latitude || 0;
    const longitude = subject?.longitude || 0;

    return (
        <div className="info-panel-container">
            <div className="info-panel-header" onClick={toggleExpanded}>
                <div className="header-content">
                    <h2 className="panel-title">{name}</h2>
                    <span className="panel-subtitle">Birth chart</span>
                </div>
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

            <div className={`info-panel-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="info-section">
                    <h3 className="section-title">Birth date and time</h3>
                    <p className="section-content">
                        {formatDateTime(birthDate, birthTime)}
                    </p>
                </div>

                <div className="info-section">
                    <h3 className="section-title">Birth place</h3>
                    <p className="section-content">{location}</p>
                    <p className="section-detail">Timezone: {timezone}</p>
                    <p className="section-detail">Latitude: {latitude.toFixed(6)}°</p>
                    <p className="section-detail">Longitude: {longitude.toFixed(6)}°</p>
                </div>

                <div className="info-section">
                    <h3 className="section-title">Chart details</h3>
                    <p className="section-detail">Perspective: Apparent Geocentric</p>
                    <p className="section-detail">House System: Placidus</p>
                </div>

                <div className="info-section moon-phase">
                    <h3 className="section-title">Moon Phase</h3>
                    <p className="section-detail">Phase Day: 28</p>
                    <p className="section-detail moon-phase-text">
                        Waning Crescent <span className="moon-icon">🌘</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;
