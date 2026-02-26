import { useState, useMemo, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { MOCK_CHART } from '../data/mockData';
import { useChartApi } from '../hooks/useChartApi';
import {
    ZODIAC_SIGNS, ZODIAC_ORDER, ASPECT_COLORS,
    PLANET_SYMBOLS, ASPECT_SYMBOLS,
} from '../types/chart';
import type { Planet, Aspect } from '../types/chart';

import {
    IconZodiacAries, IconZodiacTaurus, IconZodiacGemini, IconZodiacCancer,
    IconZodiacLeo, IconZodiacVirgo, IconZodiacLibra, IconZodiacScorpio,
    IconZodiacSagittarius, IconZodiacCapricorn, IconZodiacAquarius, IconZodiacPisces,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

const pulse = keyframes`
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
`;

const twinkle = keyframes`
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
`;

const DarkBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #0a0a14 0%, #050508 100%);
    z-index: 0;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.04) 0%, transparent 40%);
        pointer-events: none;
    }
`;

const TwinkleStar = styled.div<{ $top: string; $left: string; $size: number; $delay: string }>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${twinkle} 3s ease-in-out infinite;
    animation-delay: ${props => props.$delay};
    pointer-events: none;
`;

const ChartWheelContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;
`;

const ChartTitle = styled.h1`
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 25%, #818cf8 50%, #c4b5fd 75%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 4px;
    text-transform: uppercase;
    animation: ${pulse} 4s ease-in-out infinite;
    z-index: 10;
    text-shadow: 0 0 40px rgba(129, 140, 248, 0.3);
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        letter-spacing: 2px;
    }
`;

const ChartControls = styled.div`
    position: absolute;
    top: 100px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 20;
`;

const ControlButton = styled.button`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid rgba(129, 140, 248, 0.3);
    background: rgba(15, 15, 26, 0.8);
    backdrop-filter: blur(10px);
    color: #c4b5fd;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(99, 102, 241, 0.3);
        border-color: rgba(129, 140, 248, 0.6);
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(129, 140, 248, 0.4);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const ChartWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 700px;
    aspect-ratio: 1;
    
    @media (max-width: 900px) {
        max-width: 95vw;
    }
`;

const ChartViewport = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    
    &:active {
        cursor: grabbing;
    }

    svg {
        overflow: visible;
        filter: drop-shadow(0 0 30px rgba(129, 140, 248, 0.2));
    }
`;

const PlanetTooltip = styled.div<{ $left: string; $top: string; $transform: string }>`
    position: fixed;
    background: linear-gradient(135deg, rgba(15, 15, 26, 0.95) 0%, rgba(30, 30, 50, 0.95) 100%);
    border: 1px solid rgba(129, 140, 248, 0.4);
    border-radius: 16px;
    padding: 14px 18px;
    z-index: 100;
    min-width: 160px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 
        0 10px 40px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(129, 140, 248, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    left: ${props => props.$left};
    top: ${props => props.$top};
    transform: ${props => props.$transform};
    pointer-events: none;
`;

const TooltipHeader = styled.div`
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(129, 140, 248, 0.3);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const TooltipRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    padding: 4px 0;
    color: rgba(255, 255, 255, 0.8);

    span:first-child {
        color: rgba(196, 181, 253, 0.7);
    }
`;

const TooltipRetrograde = styled.div`
    color: #f472b6;
    font-size: 0.75rem;
    margin-top: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const TooltipDivider = styled.hr`
    border: none;
    border-top: 1px solid rgba(129, 140, 248, 0.2);
    margin: 10px 0;
`;

const LoadingWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

const LoadingSpinner = styled.div`
    width: 60px;
    height: 60px;
    border: 3px solid rgba(129, 140, 248, 0.2);
    border-top-color: #818cf8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

const LoadingText = styled.p`
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
`;

const ErrorWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 20px;
`;

const ErrorText = styled.p`
    color: #fca5a5;
    font-size: 1rem;
    text-align: center;
    max-width: 400px;
`;

const ZODIAC_ICONS: Record<string, Icon> = {
    Aries: IconZodiacAries, Taurus: IconZodiacTaurus, Gemini: IconZodiacGemini,
    Cancer: IconZodiacCancer, Leo: IconZodiacLeo, Virgo: IconZodiacVirgo,
    Libra: IconZodiacLibra, Scorpio: IconZodiacScorpio, Sagittarius: IconZodiacSagittarius,
    Capricorn: IconZodiacCapricorn, Aquarius: IconZodiacAquarius, Pisces: IconZodiacPisces,
};

function PlanetIcon({ name, size, color }: { name: string; size: number; color: string }) {
    const svgProps = {
        width: size, height: size, viewBox: '0 0 24 24',
        fill: 'none', stroke: color, strokeWidth: 1.6,
        strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    };

    switch (name) {
        case 'Sun': return <svg {...svgProps} style={{ filter: `drop-shadow(0 0 6px ${color})` }}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="1.5" fill={color} stroke="none" /></svg>;
        case 'Moon': return <svg {...svgProps}><path d="M15 4.5A7.5 7.5 0 1 0 15 19.5 5.5 5.5 0 0 1 15 4.5z" /></svg>;
        case 'Mercury': return <svg {...svgProps}><circle cx="12" cy="11" r="4" /><line x1="12" y1="15" x2="12" y2="22" /><line x1="9" y1="19" x2="15" y2="19" /><path d="M8 7a4 3 0 0 1 8 0" fill="none" /></svg>;
        case 'Venus': return <svg {...svgProps}><circle cx="12" cy="9" r="5" /><line x1="12" y1="14" x2="12" y2="22" /><line x1="9" y1="18.5" x2="15" y2="18.5" /></svg>;
        case 'Mars': return <svg {...svgProps}><circle cx="10" cy="14" r="5" /><line x1="14" y1="10" x2="19" y2="5" /><line x1="15" y1="5" x2="19" y2="5" /><line x1="19" y1="5" x2="19" y2="9" /></svg>;
        case 'Jupiter': return <svg {...svgProps}><path d="M7 4c0 0 6-1 6 4s-6 6-6 6" fill="none" /><line x1="13" y1="4" x2="13" y2="20" /><line x1="8" y1="14" x2="18" y2="14" /></svg>;
        case 'Saturn': return <svg {...svgProps}><line x1="8" y1="3" x2="14" y2="3" /><line x1="11" y1="3" x2="11" y2="10" /><path d="M11 10c0 0 6 0 6 4s-6 4-6 4" fill="none" /><line x1="8" y1="21" x2="14" y2="21" /></svg>;
        case 'Uranus': return <svg {...svgProps}><circle cx="12" cy="18" r="3" /><line x1="12" y1="15" x2="12" y2="4" /><line x1="7" y1="4" x2="7" y2="10" /><line x1="17" y1="4" x2="17" y2="10" /><line x1="7" y1="8" x2="17" y2="8" /></svg>;
        case 'Neptune': return <svg {...svgProps}><line x1="12" y1="22" x2="12" y2="4" /><path d="M6 11l6-7 6 7" fill="none" /><line x1="6" y1="11" x2="18" y2="11" /></svg>;
        case 'Pluto': return <svg {...svgProps}><circle cx="12" cy="7" r="4.5" /><line x1="12" y1="11.5" x2="12" y2="21" /><line x1="8" y1="17" x2="16" y2="17" /></svg>;
        case 'Chiron': return <svg {...svgProps}><circle cx="12" cy="16" r="4" /><line x1="12" y1="12" x2="12" y2="3" /><line x1="12" y1="7" x2="17" y2="3" /><line x1="12" y1="7" x2="17" y2="11" /></svg>;
        case 'North Node': return <svg {...svgProps}><path d="M6 4a6 6 0 0 0 12 0" fill="none" /><line x1="6" y1="4" x2="6" y2="20" /><line x1="18" y1="4" x2="18" y2="20" /></svg>;
        case 'South Node': return <svg {...svgProps}><path d="M6 20a6 6 0 0 1 12 0" fill="none" /><line x1="6" y1="20" x2="6" y2="4" /><line x1="18" y1="20" x2="18" y2="4" /></svg>;
        default: return <svg {...svgProps}><circle cx="12" cy="12" r="6" /></svg>;
    }
}

function getSignColor(sign: string): string {
    return ZODIAC_SIGNS[sign]?.color || '#888';
}

function normalizeAngle(angle: number): number {
    return ((angle % 360) + 360) % 360;
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

interface ChartWheelProps {
    birthDate?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
}

export function ChartWheel({ 
    birthDate, 
    birthTime = '12:00', 
    latitude = 0, 
    longitude = 0, 
    timezone = 'UTC' 
}: ChartWheelProps) {
    const { chartData, loading, error, fetchChart } = useChartApi();
    const [scale, setScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [hoveredPlanets, setHoveredPlanets] = useState<Planet[]>([]);
    const [hoveredAspect, setHoveredAspect] = useState<{ x: number; y: number; aspect: Aspect } | null>(null);
    const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

    // Fetch chart data if birthDate is provided
    useEffect(() => {
        if (birthDate) {
            fetchChart(birthDate, birthTime, latitude, longitude, timezone);
        }
    }, [birthDate, birthTime, latitude, longitude, timezone, fetchChart]);

    // Use fetched data or fall back to mock data
    const chart = chartData || MOCK_CHART;
    const { planets, houses, aspects } = chart;

    const size = 600;
    const cx = size / 2;
    const cy = size / 2;

    const outerRadius = size * 0.4;
    const nameRadius = size * 0.42;
    const zodiacIconRadius = outerRadius * 0.925;
    const zodiacInnerRadius = outerRadius * 0.85;
    const planetRadius = outerRadius * 0.77;
    const houseOuterRadius = outerRadius * 0.58;
    const innerRadius = outerRadius * 0.50;

    const ascendant = houses[0]?.cusp || 0;

    function toXY(longitude: number, radius: number) {
        const adjustedAngle = longitude - ascendant + 180;
        const radians = (adjustedAngle * Math.PI) / 180;
        return {
            x: cx + radius * Math.cos(radians),
            y: cy - radius * Math.sin(radians),
        };
    }

    function getTangentRotation(longitude: number): number {
        const adjusted = normalizeAngle(longitude - ascendant + 180);
        let rot = 90 - adjusted;
        rot = ((rot % 360) + 360) % 360;
        if (rot > 180) rot -= 360;
        if (rot > 90) rot -= 180;
        else if (rot < -90) rot += 180;
        return rot;
    }

    const planetPositions = useMemo(() => {
        return planets.map(planet => ({
            planet,
            ...toXY(planet.longitude, planetRadius)
        }));
    }, [planets, planetRadius, ascendant]);

    const overlappingGroups = useMemo(() => {
        const groups: Planet[][] = [];
        const visited = new Set<string>();

        planets.forEach((planet, i) => {
            if (visited.has(planet.name)) return;

            const group: Planet[] = [planet];
            visited.add(planet.name);

            const pos1 = planetPositions[i];

            planets.forEach((otherPlanet, j) => {
                if (i === j || visited.has(otherPlanet.name)) return;

                const pos2 = planetPositions[j];
                if (distance(pos1.x, pos1.y, pos2.x, pos2.y) < 15) {
                    group.push(otherPlanet);
                    visited.add(otherPlanet.name);
                }
            });

            if (group.length > 0) {
                groups.push(group);
            }
        });

        return groups;
    }, [planets, planetPositions]);

    const zoom = (delta: number) => setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));

    const drag = {
        start: (e: React.MouseEvent) => {
            dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, origX: panOffset.x, origY: panOffset.y };
        },
        move: (e: React.MouseEvent) => {
            if (!dragRef.current.dragging) return;
            setPanOffset({
                x: dragRef.current.origX + (e.clientX - dragRef.current.startX),
                y: dragRef.current.origY + (e.clientY - dragRef.current.startY),
            });
        },
        end: () => { dragRef.current.dragging = false; },
    };

    const aspectEndpoints: Record<string, { x: number; y: number }> = {};
    planets.forEach(p => aspectEndpoints[p.name] = toXY(p.longitude, innerRadius));
    aspectEndpoints['Ascendant'] = toXY(houses[0]?.cusp || 0, innerRadius);
    aspectEndpoints['Midheaven'] = toXY(houses[9]?.cusp || 0, innerRadius);
    aspectEndpoints['Midheaven (MC)'] = aspectEndpoints['Midheaven'];

    const handlePlanetGroupHover = (group: Planet[], _x: number, _y: number, isHovering: boolean) => {
        if (isHovering) {
            setHoveredPlanets(group);
        } else {
            setHoveredPlanets([]);
        }
    };

    const handleAspectHover = (aspect: Aspect, x: number, y: number, isHovering: boolean) => {
        if (isHovering) {
            setHoveredAspect({ x, y, aspect });
        } else {
            setHoveredAspect(null);
        }
    };

    const tooltipX = hoveredPlanets.length > 0 
        ? hoveredPlanets.reduce((sum, p) => {
            const pos = toXY(p.longitude, planetRadius);
            return sum + pos.x;
        }, 0) / hoveredPlanets.length
        : hoveredAspect?.x || 0;

    const tooltipY = hoveredPlanets.length > 0 
        ? hoveredPlanets.reduce((sum, p) => {
            const pos = toXY(p.longitude, planetRadius);
            return sum + pos.y;
        }, 0) / hoveredPlanets.length
        : hoveredAspect?.y || 0;

    const showTooltip = hoveredPlanets.length > 0 || hoveredAspect !== null;

    // Show loading state
    if (loading) {
        return (
            <>
                <DarkBackground>
                    <TwinkleStar $top="10%" $left="15%" $size={2} $delay="0s" />
                    <TwinkleStar $top="20%" $left="80%" $size={1} $delay="0.5s" />
                    <TwinkleStar $top="60%" $left="10%" $size={2} $delay="1s" />
                    <TwinkleStar $top="75%" $left="85%" $size={1} $delay="1.5s" />
                </DarkBackground>
                <LoadingWrapper>
                    <LoadingSpinner />
                    <LoadingText>Calculating your cosmic chart...</LoadingText>
                </LoadingWrapper>
            </>
        );
    }

    // Show error state
    if (error) {
        return (
            <>
                <DarkBackground>
                    <TwinkleStar $top="10%" $left="15%" $size={2} $delay="0s" />
                    <TwinkleStar $top="20%" $left="80%" $size={1} $delay="0.5s" />
                </DarkBackground>
                <ErrorWrapper>
                    <ErrorText>Error: {error}</ErrorText>
                </ErrorWrapper>
            </>
        );
    }

    return (
        <>
            <DarkBackground>
                <TwinkleStar $top="10%" $left="15%" $size={2} $delay="0s" />
                <TwinkleStar $top="20%" $left="80%" $size={1} $delay="0.5s" />
                <TwinkleStar $top="60%" $left="10%" $size={2} $delay="1s" />
                <TwinkleStar $top="75%" $left="85%" $size={1} $delay="1.5s" />
                <TwinkleStar $top="40%" $left="90%" $size={2} $delay="2s" />
                <TwinkleStar $top="85%" $left="20%" $size={1} $delay="0.3s" />
                <TwinkleStar $top="15%" $left="50%" $size={1} $delay="2.5s" />
                <TwinkleStar $top="70%" $left="50%" $size={2} $delay="1.8s" />
            </DarkBackground>
            
            <ChartWheelContainer>
                <ChartTitle>Your Cosmic Chart</ChartTitle>

                <ChartControls>
                    <ControlButton onClick={() => zoom(0.15)} title="Zoom In">+</ControlButton>
                    <ControlButton onClick={() => zoom(-0.15)} title="Zoom Out">−</ControlButton>
                    <ControlButton onClick={() => { setScale(1); setPanOffset({ x: 0, y: 0 }); }} title="Reset">⟳</ControlButton>
                </ChartControls>

                <ChartWrapper>
                    {showTooltip && (
                        <PlanetTooltip
                            $left={`${(tooltipX / size) * 100}%`}
                            $top={`${(tooltipY / size) * 100}%`}
                            $transform={`translate(${tooltipX > cx ? '-100%' : '10px'}, ${tooltipY > cy ? '-100%' : '10px'})`}
                        >
                            {hoveredPlanets.map((planet, idx) => {
                                const isLast = idx === hoveredPlanets.length - 1;
                                return (
                                    <div key={planet.name}>
                                        <TooltipHeader>
                                            <span style={{ fontSize: '1.2rem' }}>{PLANET_SYMBOLS[planet.name]}</span>
                                            {planet.name}
                                        </TooltipHeader>
                                        <TooltipRow>
                                            <span>Sign:</span>
                                            <span style={{ color: getSignColor(planet.sign) }}>
                                                {ZODIAC_SIGNS[planet.sign]?.symbol} {planet.sign}
                                            </span>
                                        </TooltipRow>
                                        <TooltipRow>
                                            <span>Degree:</span>
                                            <span>
                                                {Math.floor(planet.signDegree)}°
                                                {Math.floor((planet.signDegree % 1) * 60)}'
                                            </span>
                                        </TooltipRow>
                                        <TooltipRow>
                                            <span>House:</span>
                                            <span>{planet.house}</span>
                                        </TooltipRow>
                                        {planet.retrograde && (
                                            <TooltipRetrograde>℞ Retrograde</TooltipRetrograde>
                                        )}
                                        {!isLast && hoveredPlanets.length > 1 && <TooltipDivider />}
                                    </div>
                                );
                            })}

                            {hoveredAspect && (
                                <>
                                    {hoveredPlanets.length > 0 && <TooltipDivider />}
                                    <TooltipHeader style={{ color: ASPECT_COLORS[hoveredAspect.aspect.type] }}>
                                        {ASPECT_SYMBOLS[hoveredAspect.aspect.type]} {hoveredAspect.aspect.type.charAt(0).toUpperCase() + hoveredAspect.aspect.type.slice(1)}
                                    </TooltipHeader>
                                    <TooltipRow>
                                        <span>Planets:</span>
                                        <span>{PLANET_SYMBOLS[hoveredAspect.aspect.planet1] || hoveredAspect.aspect.planet1} ↔ {PLANET_SYMBOLS[hoveredAspect.aspect.planet2] || hoveredAspect.aspect.planet2}</span>
                                    </TooltipRow>
                                    <TooltipRow>
                                        <span>Angle:</span>
                                        <span>{hoveredAspect.aspect.angle.toFixed(1)}°</span>
                                    </TooltipRow>
                                    <TooltipRow>
                                        <span>Orb:</span>
                                        <span>{hoveredAspect.aspect.orb.toFixed(2)}°</span>
                                    </TooltipRow>
                                </>
                            )}
                        </PlanetTooltip>
                    )}

                    <ChartViewport
                        onWheel={(e) => { e.preventDefault(); zoom(e.deltaY > 0 ? -0.05 : 0.05); }}
                        onMouseDown={drag.start}
                        onMouseMove={drag.move}
                        onMouseUp={drag.end}
                        onMouseLeave={drag.end}
                    >
                        <svg viewBox={`0 0 ${size} ${size}`} style={{
                            width: '100%', height: '100%',
                            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
                        }}>
                            {ZODIAC_ORDER.map((sign, i) => {
                                const midAngle = i * 30 + 15;
                                const pos = toXY(midAngle, nameRadius);
                                const rot = getTangentRotation(midAngle);

                                return (
                                    <text key={`name-${sign}`}
                                        x={pos.x} y={pos.y}
                                        fill="rgba(255,255,255,0.5)"
                                        fontSize={10} fontWeight={700} letterSpacing="2px"
                                        textAnchor="middle" dominantBaseline="middle"
                                        transform={`rotate(${rot}, ${pos.x}, ${pos.y})`}
                                    >
                                        {sign.toUpperCase()}
                                    </text>
                                );
                            })}

                            <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                            <circle cx={cx} cy={cy} r={zodiacInnerRadius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} />

                            {ZODIAC_ORDER.map((sign, i) => {
                                const startAngle = i * 30;
                                const midAngle = startAngle + 15;
                                const iconPos = toXY(midAngle, zodiacIconRadius);
                                const divStart = toXY(startAngle, zodiacInnerRadius);
                                const divEnd = toXY(startAngle, outerRadius);
                                const ZodiacIcon = ZODIAC_ICONS[sign];
                                const iconSize = 26;
                                const color = getSignColor(sign);

                                return (
                                    <g key={sign}>
                                        <line x1={divStart.x} y1={divStart.y} x2={divEnd.x} y2={divEnd.y}
                                            stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                                        <foreignObject
                                            x={iconPos.x - iconSize / 2} y={iconPos.y - iconSize / 2}
                                            width={iconSize} height={iconSize}
                                            style={{ overflow: 'visible' }}
                                        >
                                            {ZodiacIcon && <ZodiacIcon size={iconSize} color={color} stroke={1.5} />}
                                        </foreignObject>
                                    </g>
                                );
                            })}

                            {overlappingGroups.map((group, groupIdx) => {
                                if (group.length === 1) {
                                    const planet = group[0];
                                    const pos = toXY(planet.longitude, planetRadius);
                                    const color = getSignColor(planet.sign);
                                    const iconSize = 18;

                                    return (
                                        <g key={planet.name}
                                            onMouseEnter={() => handlePlanetGroupHover(group, pos.x, pos.y, true)}
                                            onMouseLeave={() => handlePlanetGroupHover(group, pos.x, pos.y, false)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <circle cx={pos.x} cy={pos.y} r={14}
                                                fill="transparent"
                                                stroke={color} strokeWidth={1.5}
                                                style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                                            />
                                            <foreignObject
                                                x={pos.x - iconSize / 2} y={pos.y - iconSize / 2}
                                                width={iconSize} height={iconSize}
                                                style={{ overflow: 'visible', pointerEvents: 'none' }}
                                            >
                                                <PlanetIcon name={planet.name} size={iconSize} color={color} />
                                            </foreignObject>
                                            {planet.retrograde && (
                                                <text x={pos.x + 10} y={pos.y - 8}
                                                    fill={color} fontSize={7} fontWeight={700}>R</text>
                                            )}
                                        </g>
                                    );
                                } else {
                                    const centerPlanet = group[0];
                                    const pos = toXY(centerPlanet.longitude, planetRadius);
                                    const angleStep = (2 * Math.PI) / group.length;
                                    const offsetRadius = 8;

                                    return (
                                        <g key={`group-${groupIdx}`}
                                            onMouseEnter={() => handlePlanetGroupHover(group, pos.x, pos.y, true)}
                                            onMouseLeave={() => handlePlanetGroupHover(group, pos.x, pos.y, false)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {group.map((planet, planetIdx) => {
                                                const color = getSignColor(planet.sign);
                                                const iconSize = 16;
                                                const angle = angleStep * planetIdx;
                                                const offsetX = Math.cos(angle) * offsetRadius;
                                                const offsetY = Math.sin(angle) * offsetRadius;

                                                return (
                                                    <g key={planet.name} transform={`translate(${offsetX}, ${offsetY})`}>
                                                        <circle cx={pos.x} cy={pos.y} r={12}
                                                            fill="transparent"
                                                            stroke={color} strokeWidth={1.5}
                                                            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                                                        />
                                                        <foreignObject
                                                            x={pos.x - iconSize / 2} y={pos.y - iconSize / 2}
                                                            width={iconSize} height={iconSize}
                                                            style={{ overflow: 'visible', pointerEvents: 'none' }}
                                                        >
                                                            <PlanetIcon name={planet.name} size={iconSize} color={color} />
                                                        </foreignObject>
                                                        {planet.retrograde && (
                                                            <text x={pos.x + 8} y={pos.y - 6}
                                                                fill={color} fontSize={6} fontWeight={700}>R</text>
                                                        )}
                                                    </g>
                                                );
                                            })}
                                        </g>
                                    );
                                }
                            })}

                            <circle cx={cx} cy={cy} r={houseOuterRadius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
                            <circle cx={cx} cy={cy} r={innerRadius} fill="transparent" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />

                            {houses.map((house) => {
                                const innerPos = toXY(house.cusp, innerRadius);
                                const outerPos = toXY(house.cusp, zodiacInnerRadius);
                                const midAngle = house.cusp + house.size / 2;
                                const labelPos = toXY(midAngle, (houseOuterRadius + innerRadius) / 2);
                                const isAngular = [1, 4, 7, 10].includes(house.id);

                                return (
                                    <g key={`house-${house.id}`}>
                                        <line x1={innerPos.x} y1={innerPos.y} x2={outerPos.x} y2={outerPos.y}
                                            stroke={isAngular ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}
                                            strokeWidth={isAngular ? 1.5 : 0.8}
                                        />
                                        <text x={labelPos.x} y={labelPos.y}
                                            fill="rgba(255,255,255,0.4)"
                                            fontSize={10} fontWeight={700}
                                            textAnchor="middle" dominantBaseline="middle">
                                            {house.id}
                                        </text>
                                    </g>
                                );
                            })}

                            {[
                                { idx: 0, label: 'AC', color: '#ff6b8a' },
                                { idx: 9, label: 'MC', color: '#6bcbff' },
                                { idx: 6, label: 'DC', color: '#bb8fce' },
                                { idx: 3, label: 'IC', color: '#ffd93d' },
                            ].map(({ idx, label, color }) => {
                                if (!houses[idx]) return null;
                                const pos = toXY(houses[idx].cusp, innerRadius - 12);
                                return (
                                    <text key={label} x={pos.x} y={pos.y}
                                        fill={color} fontSize={10} fontWeight={700}
                                        textAnchor="middle" dominantBaseline="middle">
                                        {label}
                                    </text>
                                );
                            })}

                            <circle cx={cx} cy={cy} r={innerRadius}
                                fill="none" stroke="rgba(255,255,255,0.06)"
                                strokeWidth={0.5} strokeDasharray="2,3" />

                            {aspects.map((aspect, i) => {
                                const pos1 = aspectEndpoints[aspect.planet1];
                                const pos2 = aspectEndpoints[aspect.planet2];
                                if (!pos1 || !pos2) return null;

                                const color = ASPECT_COLORS[aspect.type] || '#666';
                                const midX = (pos1.x + pos2.x) / 2;
                                const midY = (pos1.y + pos2.y) / 2;

                                return (
                                    <g key={`aspect-${i}`}
                                        onMouseEnter={() => handleAspectHover(aspect, midX, midY, true)}
                                        onMouseLeave={() => handleAspectHover(aspect, midX, midY, false)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <line
                                            x1={pos1.x} y1={pos1.y}
                                            x2={pos2.x} y2={pos2.y}
                                            stroke="transparent" strokeWidth={8}
                                        />
                                        <line
                                            x1={pos1.x} y1={pos1.y}
                                            x2={pos2.x} y2={pos2.y}
                                            stroke={color}
                                            strokeWidth={1.2}
                                            opacity={0.5}
                                        />
                                    </g>
                                );
                            })}
                        </svg>
                    </ChartViewport>
                </ChartWrapper>
            </ChartWheelContainer>
        </>
    );
}
