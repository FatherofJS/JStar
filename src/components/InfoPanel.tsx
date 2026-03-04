import React, { useState } from 'react';
import './InfoPanel.css';
import type { ChartData } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';

interface InfoPanelProps {
    chartData: ChartData;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ chartData = MOCK_CHART }) => {
    const { subject } = chartData;
    const [isExpanded, setIsExpanded] = useState(false);

    // Format date and time
    const formatDateTime = (date: string, time: string) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year} ${time}`;
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="info-panel-container">
            {/* Collapsible Header */}
            <div className="info-panel-header" onClick={toggleExpanded}>
                <div className="header-content">
                    <h2 className="panel-title">{subject.name}</h2>
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

            {/* Collapsible Content */}
            <div className={`info-panel-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="info-section">
                    <h3 className="section-title">Birth date and time</h3>
                    <p className="section-content">
                        {formatDateTime(subject.birthDate, subject.birthTime)}
                    </p>
                </div>

                <div className="info-section">
                    <h3 className="section-title">Birth place</h3>
                    <p className="section-content">{subject.location}</p>
                    <p className="section-detail">Timezone: {subject.timezone}</p>
                    <p className="section-detail">Latitude: {subject.latitude.toFixed(6)}°</p>
                    <p className="section-detail">Longitude: {subject.longitude.toFixed(6)}°</p>
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

//export default InfoPanel;