import React, { useState } from 'react';
import type { ChartData } from '../types/chart';
import {
    InfoPanelContainer,
    InfoPanelHeader,
    HeaderContent,
    PanelTitle,
    PanelSubtitle,
    ExpandButton,
    InfoPanelContent,
    InfoSection,
    SectionTitle,
    SectionContent,
    SectionDetail,
    MoonPhaseText,
    MoonIcon,
} from './InfoPanel.styles';

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
        <InfoPanelContainer>
            <InfoPanelHeader onClick={toggleExpanded}>
                <HeaderContent>
                    <PanelTitle>{name}</PanelTitle>
                    <PanelSubtitle>Birth chart</PanelSubtitle>
                </HeaderContent>
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
            </InfoPanelHeader>

            <InfoPanelContent $expanded={isExpanded} $collapsed={!isExpanded}>
                <InfoSection>
                    <SectionTitle>Birth date and time</SectionTitle>
                    <SectionContent>
                        {formatDateTime(birthDate, birthTime)}
                    </SectionContent>
                </InfoSection>

                <InfoSection>
                    <SectionTitle>Birth place</SectionTitle>
                    <SectionContent>{location}</SectionContent>
                    <SectionDetail>Timezone: {timezone}</SectionDetail>
                    <SectionDetail>Latitude: {latitude.toFixed(6)}°</SectionDetail>
                    <SectionDetail>Longitude: {longitude.toFixed(6)}°</SectionDetail>
                </InfoSection>

                <InfoSection>
                    <SectionTitle>Chart details</SectionTitle>
                    <SectionDetail>Perspective: Apparent Geocentric</SectionDetail>
                    <SectionDetail>House System: Placidus</SectionDetail>
                </InfoSection>

                <InfoSection>
                    <SectionTitle>Moon Phase</SectionTitle>
                    <SectionDetail>Phase Day: 28</SectionDetail>
                    <SectionDetail>
                        <MoonPhaseText>
                            Waning Crescent <MoonIcon>🌘</MoonIcon>
                        </MoonPhaseText>
                    </SectionDetail>
                </InfoSection>
            </InfoPanelContent>
        </InfoPanelContainer>
    );
};

export default InfoPanel;
