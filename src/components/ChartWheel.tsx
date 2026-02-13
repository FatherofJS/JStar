import { useState } from 'react';
import { MOCK_CHART } from '../data/mockData';
import {
    ZODIAC_SIGNS, ZODIAC_ORDER, ASPECT_COLORS,
    PLANET_SYMBOLS,
} from '../types/chart';
import type { Planet } from '../types/chart';

import {
    IconZodiacAries, IconZodiacTaurus, IconZodiacGemini, IconZodiacCancer,
    IconZodiacLeo, IconZodiacVirgo, IconZodiacLibra, IconZodiacScorpio,
    IconZodiacSagittarius, IconZodiacCapricorn, IconZodiacAquarius, IconZodiacPisces,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import './ChartWheel.css';

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
        case 'Sun': return <svg {...svgProps}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="1.5" fill={color} stroke="none" /></svg>;
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

export function ChartWheel() {
    const { planets, houses, aspects } = MOCK_CHART;

    const size = 700;
    const cx = size / 2;
    const cy = size / 2;

    const outerRing = size * 0.4;         // = 280px
    const nameRadius = size * 0.42;        // = 294px (just outside outerRing)
    const zodiacIconRadius = outerRing * 0.925;  // = 259px
    const zodiacInner = outerRing * 0.85;   // = 238px
    const planetRing = outerRing * 0.77;   // = 216px
    const houseRingOuter = outerRing * 0.58;   // = 162px
    const houseRingInner = outerRing * 0.50;   // = 140px
    const aspectRadius = outerRing * 0.50;   // = 140px

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

    const [tooltip, setTooltip] = useState<{ x: number; y: number; planet: Planet } | null>(null);
    const [scale, setScale] = useState(1);

    function handleZoom(delta: number) {
        setScale(prev => Math.max(0.75, Math.min(3, prev + delta)));
    }

    /**
     * Find the (x, y) position of a planet or angle on the inner aspect ring.
     * Used to draw the endpoint of aspect lines.
     */
    function getAspectPosition(bodyName: string) {
        const planet = planets.find(p => p.name === bodyName);
        if (planet) return toXY(planet.longitude, aspectRadius);
        if (bodyName === 'Ascendant') return toXY(houses[0]?.cusp || 0, aspectRadius);
        if (bodyName === 'Midheaven (MC)' || bodyName === 'Midheaven')
            return toXY(houses[9]?.cusp || 0, aspectRadius);
        return null;
    }

    const tooltipStyle = tooltip ? {
        left: `${(tooltip.x / size) * 100}%`,
        top: `${(tooltip.y / size) * 100}%`,
        transform: `translate(${tooltip.x > cx ? '-100%' : '10px'}, ${tooltip.y > cy ? '-100%' : '10px'})`,
    } : {};

    return (
        <div className="chart-wheel-container">

            {/* Zoom controls */}
            <div className="chart-controls">
                <button onClick={() => handleZoom(0.1)}>+</button>
                <button onClick={() => handleZoom(-0.1)}>−</button>
                <button onClick={() => setScale(1)}>⟳</button>
            </div>

            {/* Tooltip — shows planet info on hover */}
            {tooltip && (
                <div className="planet-tooltip" style={tooltipStyle}>
                    <div className="tooltip-header">
                        {PLANET_SYMBOLS[tooltip.planet.name]} {tooltip.planet.name}
                    </div>
                    <div className="tooltip-row">
                        <span>Sign:</span>
                        <span style={{ color: getSignColor(tooltip.planet.sign) }}>
                            {ZODIAC_SIGNS[tooltip.planet.sign]?.symbol} {tooltip.planet.sign}
                        </span>
                    </div>
                    <div className="tooltip-row">
                        <span>Degree:</span>
                        <span>
                            {Math.floor(tooltip.planet.signDegree)}°
                            {Math.floor((tooltip.planet.signDegree % 1) * 60)}'
                        </span>
                    </div>
                    <div className="tooltip-row">
                        <span>House:</span>
                        <span>{tooltip.planet.house}</span>
                    </div>
                    {tooltip.planet.retrograde && (
                        <div className="tooltip-retrograde">℞ Retrograde</div>
                    )}
                </div>
            )}

            {/* ═══ SVG CHART ═══ */}
            <div className="chart-viewport"
                onWheel={(e) => { e.preventDefault(); handleZoom(e.deltaY > 0 ? -0.05 : 0.05); }}
            >
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    style={{
                        width: '100%', height: '100%',
                        maxWidth: size, maxHeight: size,
                        transform: `scale(${scale})`,
                    }}
                >

                    {/* ══════════════════════════════════════════════
                        LAYER 0: SIGN NAMES (outermost text ring)
                        Each of the 12 zodiac signs gets its name
                        centered in its 30° sector, rotated tangentially.
                        ══════════════════════════════════════════════ */}
                    {ZODIAC_ORDER.map((sign, i) => {
                        const midAngle = i * 30 + 15;
                        const pos = toXY(midAngle, nameRadius);
                        const rot = getTangentRotation(midAngle);

                        return (
                            <text key={`name-${sign}`}
                                x={pos.x} y={pos.y}
                                fill="rgba(255,255,255,0.35)"
                                fontSize={11} fontWeight={700} letterSpacing="2.5px"
                                textAnchor="middle" dominantBaseline="middle"
                                transform={`rotate(${rot}, ${pos.x}, ${pos.y})`}
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {sign.toUpperCase()}
                            </text>
                        );
                    })}

                    {/* ══════════════════════════════════════════════
                        LAYER 1: ZODIAC BAND (outer + inner rings)
                        Two concentric circles form a "band". Inside the
                        band: sign divider lines and zodiac icons.
                        ══════════════════════════════════════════════ */}
                    <circle cx={cx} cy={cy} r={outerRing} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={2.5} />
                    <circle cx={cx} cy={cy} r={zodiacInner} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />

                    {ZODIAC_ORDER.map((sign, i) => {
                        const startAngle = i * 30;
                        const midAngle = startAngle + 15;
                        const iconPos = toXY(midAngle, zodiacIconRadius);
                        const divStart = toXY(startAngle, zodiacInner);
                        const divEnd = toXY(startAngle, outerRing);
                        const ZodiacIcon = ZODIAC_ICONS[sign];
                        const iconSize = 30;
                        const color = getSignColor(sign);

                        return (
                            <g key={sign}>
                                {/* Divider line between signs */}
                                <line x1={divStart.x} y1={divStart.y} x2={divEnd.x} y2={divEnd.y}
                                    stroke="rgba(255,255,255,0.2)" strokeWidth={1} />

                                {/* Zodiac icon */}
                                <foreignObject
                                    x={iconPos.x - iconSize / 2} y={iconPos.y - iconSize / 2}
                                    width={iconSize} height={iconSize}
                                    style={{ overflow: 'visible' }}
                                >
                                    {ZodiacIcon && <ZodiacIcon size={iconSize} color={color} stroke={1.75} />}
                                </foreignObject>
                            </g>
                        );
                    })}

                    {/* ══════════════════════════════════════════════
                        LAYER 2: PLANETS
                        Each planet is drawn as a circle with an SVG
                        icon inside. Hovering shows a tooltip.
                        ══════════════════════════════════════════════ */}
                    {planets.map((planet) => {
                        const pos = toXY(planet.longitude, planetRing);
                        const color = getSignColor(planet.sign);
                        const iconSize = 18;

                        return (
                            <g key={planet.name} className="planet-symbol"
                                onMouseEnter={() => setTooltip({ x: pos.x, y: pos.y, planet })}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                {/* Background circle */}
                                <circle cx={pos.x} cy={pos.y} r={14}
                                    fill="rgba(12,16,24,0.85)"
                                    stroke={color} strokeWidth={1.5} strokeOpacity={0.3}
                                    className="planet-ring"
                                />

                                {/* Planet SVG icon (rendered inside foreignObject for HTML-in-SVG) */}
                                <foreignObject
                                    x={pos.x - iconSize / 2} y={pos.y - iconSize / 2}
                                    width={iconSize} height={iconSize}
                                    style={{ overflow: 'visible', cursor: 'pointer' }}
                                >
                                    <PlanetIcon name={planet.name} size={iconSize} color={color} />
                                </foreignObject>

                                {/* "R" badge for retrograde planets */}
                                {planet.retrograde && (
                                    <text x={pos.x + 11} y={pos.y - 9}
                                        fill={color} fontSize={7} fontWeight={700}>R</text>
                                )}
                            </g>
                        );
                    })}

                    {/* ══════════════════════════════════════════════
                        LAYER 3: HOUSES
                        12 houses divide the chart. House cusps are thin
                        lines; angular houses (1,4,7,10) are bolder.
                        ══════════════════════════════════════════════ */}
                    <circle cx={cx} cy={cy} r={houseRingOuter} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
                    <circle cx={cx} cy={cy} r={houseRingInner} fill="#0a0e17" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />

                    {houses.map((house) => {
                        const innerPos = toXY(house.cusp, houseRingInner);
                        const outerPos = toXY(house.cusp, zodiacInner);

                        const midAngle = house.cusp + house.size / 2;
                        const labelPos = toXY(midAngle, (houseRingOuter + houseRingInner) / 2);
                        const isAngular = [1, 4, 7, 10].includes(house.id);

                        return (
                            <g key={`house-${house.id}`}>
                                <line x1={innerPos.x} y1={innerPos.y} x2={outerPos.x} y2={outerPos.y}
                                    stroke={isAngular ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)'}
                                    strokeWidth={isAngular ? 2.0 : 1.0}
                                />
                                <text x={labelPos.x} y={labelPos.y}
                                    fill="rgba(255,255,255,0.4)"
                                    fontSize={10} fontWeight={800}
                                    textAnchor="middle" dominantBaseline="middle">
                                    {house.id}
                                </text>
                            </g>
                        );
                    })}

                    {/* Angle labels: AC (Ascendant), MC (Midheaven), DC, IC */}
                    {[
                        { idx: 0, label: 'AC', color: '#ff6b8a' },
                        { idx: 9, label: 'MC', color: '#6bcbff' },
                        { idx: 6, label: 'DC', color: '#bb8fce' },
                        { idx: 3, label: 'IC', color: '#ffd93d' },
                    ].map(({ idx, label, color }) => {
                        if (!houses[idx]) return null;
                        const pos = toXY(houses[idx].cusp, houseRingInner - 15);
                        return (
                            <text key={label} x={pos.x} y={pos.y}
                                fill={color} fontSize={10} fontWeight={700}
                                textAnchor="middle" dominantBaseline="middle"
                                style={{ letterSpacing: '1px' }}>
                                {label}
                            </text>
                        );
                    })}

                    {/* ══════════════════════════════════════════════
                        LAYER 4: ASPECT LINES
                        Lines connecting planets that form angular
                        relationships (trine=120°, square=90°, etc.)
                        Each aspect type has its own color.
                        ══════════════════════════════════════════════ */}
                    <circle cx={cx} cy={cy} r={aspectRadius}
                        fill="none" stroke="rgba(255,255,255,0.06)"
                        strokeWidth={0.5} strokeDasharray="2,4" />

                    {aspects.map((aspect, i) => {
                        const pos1 = getAspectPosition(aspect.planet1);
                        const pos2 = getAspectPosition(aspect.planet2);
                        if (!pos1 || !pos2) return null;

                        const color = ASPECT_COLORS[aspect.type] || '#666';

                        return (
                            <line key={`aspect-${i}`}
                                x1={pos1.x} y1={pos1.y}
                                x2={pos2.x} y2={pos2.y}
                                stroke={color} strokeWidth={1.2} opacity={0.5}
                            />
                        );
                    })}

                </svg>
            </div>
        </div>
    );
}
