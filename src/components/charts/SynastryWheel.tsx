import { useState, useRef, useEffect } from 'react';
import {
    ZODIAC_SIGNS, ZODIAC_ORDER, ASPECT_COLORS,
    PLANET_SYMBOLS, ASPECT_SYMBOLS,
    PLANET_NAMES_VI, ASPECT_NAMES_VI
} from '../../types/chart';
import type { Planet, SynastryData, SynastryAspect } from '../../types/chart';

import { useTheme } from "../../theme";
import { ZODIAC_ICONS, PlanetIcon, getSignColor, normalizeAngle, formatDegree } from './chartUtils';
import './SynastryWheel.css';


export function SynastryWheel({ data }: { data: SynastryData }) {
    const { person1_planets, person2_planets, person1_houses, aspects } = data;
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const palette = {
        signName: isLight ? 'rgba(15, 23, 42, 0.84)' : 'rgba(255,255,255,0.5)',
        outerRing: isLight ? 'rgba(30, 41, 59, 0.62)' : 'rgba(255,255,255,0.38)',
        innerRing: isLight ? 'rgba(51, 65, 85, 0.48)' : 'rgba(255,255,255,0.26)',
        divider: isLight ? 'rgba(30, 41, 59, 0.44)' : 'rgba(255,255,255,0.28)',
        houseRing: isLight ? 'rgba(51, 65, 85, 0.42)' : 'rgba(255,255,255,0.22)',
        angularLine: isLight ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255,255,255,0.5)',
        houseLine: isLight ? 'rgba(51, 65, 85, 0.38)' : 'rgba(255,255,255,0.2)',
        houseLabel: isLight ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255,255,255,0.54)',
        aspectGuide: isLight ? 'rgba(51, 65, 85, 0.24)' : 'rgba(255,255,255,0.12)',
        person1Color: '#ff6b8a',
        person2Color: '#6bcbff',
    };

    const size = 800;
    const cx = size / 2;
    const cy = size / 2;

    const outerRadius = size * 0.4;
    const nameRadius = size * 0.42;
    const zodiacIconRadius = outerRadius * 0.925;
    const zodiacInnerRadius = outerRadius * 0.85;

    const p2PlanetRadius = outerRadius * 0.77;
    const p2RingInner = outerRadius * 0.68;

    const p1PlanetRadius = outerRadius * 0.60;
    const p1RingInner = outerRadius * 0.52;

    const houseOuterRadius = p1RingInner;
    const innerRadius = outerRadius * 0.44;

    const ascendant = person1_houses[0]?.cusp || 0;

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

    const [hoveredPlanet, setHoveredPlanet] = useState<{ x: number; y: number; planet: Planet; planets: Planet[], person: number } | null>(null);
    const [hoveredAspect, setHoveredAspect] = useState<{ x: number; y: number; aspect: SynastryAspect } | null>(null);
    const [scale, setScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

    const zoom = (delta: number) => setScale(prev => Math.max(0.75, Math.min(3, prev + delta)));

    const viewportRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            zoom(e.deltaY > 0 ? -0.01 : 0.01);
        };
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    const drag = {
        start: (e: React.MouseEvent) => {
            dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, origX: panOffset.x, origY: panOffset.y };
            setIsDragging(true);
        },
        move: (e: React.MouseEvent) => {
            if (!dragRef.current.dragging) return;
            setPanOffset({
                x: dragRef.current.origX + (e.clientX - dragRef.current.startX),
                y: dragRef.current.origY + (e.clientY - dragRef.current.startY),
            });
        },
        end: () => {
            dragRef.current.dragging = false;
            setIsDragging(false);
        },
    };

    const p1AspectEndpoints: Record<string, { x: number; y: number }> = {};
    const p2AspectEndpoints: Record<string, { x: number; y: number }> = {};
    person1_planets.forEach(p => p1AspectEndpoints[p.name] = toXY(p.longitude, innerRadius));
    person2_planets.forEach(p => p2AspectEndpoints[p.name] = toXY(p.longitude, innerRadius));

    const p1Anchors = person1_planets.map((planet) => ({
        planet,
        pos: toXY(planet.longitude, p1PlanetRadius),
    }));
    const p2Anchors = person2_planets.map((planet) => ({
        planet,
        pos: toXY(planet.longitude, p2PlanetRadius),
    }));

    const getHoveredPlanetCluster = (targetPlanet: Planet, personIdx: number) => {
        const anchors = personIdx === 1 ? p1Anchors : p2Anchors;
        const target = anchors.find(({ planet }) => planet.name === targetPlanet.name);
        if (!target) return null;

        const cluster = anchors.filter(({ pos }) => {
            const dx = pos.x - target.pos.x;
            const dy = pos.y - target.pos.y;
            return Math.hypot(dx, dy) <= 28;
        });

        const anchor = cluster.reduce(
            (acc, item) => ({
                x: acc.x + item.pos.x,
                y: acc.y + item.pos.y,
            }),
            { x: 0, y: 0 }
        );

        return {
            x: anchor.x / cluster.length,
            y: anchor.y / cluster.length,
            planet: target.planet,
            planets: cluster.map(({ planet }) => planet),
            person: personIdx
        };
    };

    const tipAnchor = hoveredAspect || hoveredPlanet;
    const tooltipStyle = tipAnchor ? {
        left: `${(tipAnchor.x / size) * 100}%`,
        top: `${(tipAnchor.y / size) * 100}%`,
        transform: `translate(${tipAnchor.x > cx ? '-100%' : '10px'}, ${tipAnchor.y > cy ? '-100%' : '10px'})`,
    } : {};

    return (
        <div className="synastry-wheel-container" style={{ width: "fit-content", margin: "0 auto", position: "relative" }}>
            <div className="chart-controls">
                <button onClick={() => zoom(0.1)}>+</button>
                <button onClick={() => zoom(-0.1)}>−</button>
                <button onClick={() => { setScale(1); setPanOffset({ x: 0, y: 0 }); }}>⟳</button>
            </div>

            <div className="synastry-legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ background: palette.person1Color }}></div>
                    <span>{data.person1.name || 'Person 1'}</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ background: palette.person2Color }}></div>
                    <span>{data.person2.name || 'Person 2'}</span>
                </div>
            </div>

            {(hoveredPlanet || hoveredAspect) && (
                <div className="synastry-tooltip" style={tooltipStyle}>
                    {hoveredPlanet && !hoveredAspect && (
                        <>
                            <div className="tooltip-header">
                                {PLANET_SYMBOLS[hoveredPlanet.planets[0].name]} {PLANET_NAMES_VI[hoveredPlanet.planets[0].name] || hoveredPlanet.planets[0].name}
                                <span style={{ marginLeft: '4px', fontSize: '10px', color: hoveredPlanet.person === 1 ? palette.person1Color : palette.person2Color }}>
                                    (P{hoveredPlanet.person})
                                </span>
                            </div>
                            <div className="tooltip-row">
                                <span>Cung hoàng đạo:</span>
                                <span style={{ color: getSignColor(hoveredPlanet.planets[0].sign) }}>
                                    {ZODIAC_SIGNS[hoveredPlanet.planets[0].sign]?.symbol} {ZODIAC_SIGNS[hoveredPlanet.planets[0].sign]?.vi || hoveredPlanet.planets[0].sign}
                                </span>
                            </div>
                            <div className="tooltip-row">
                                <span>Độ:</span>
                                <span>{Math.floor(hoveredPlanet.planet.signDegree)}°{Math.floor((hoveredPlanet.planet.signDegree % 1) * 60)}'</span>
                            </div>
                            {hoveredPlanet.planets[0].retrograde && (
                                <div className="tooltip-retrograde">℞ Đi lùi (Retrograde)</div>
                            )}
                            {hoveredPlanet.planets.length > 1 && (
                                <>
                                    <div className="tooltip-header" style={{ marginTop: '8px' }}>
                                        Cùng vị trí
                                    </div>
                                    {hoveredPlanet.planets.map((planet, index) => (
                                        <div key={planet.name} className="tooltip-stack-card" style={{ marginBottom: index === hoveredPlanet.planets.length - 1 ? 0 : '8px' }}>
                                            <div className="tooltip-row">
                                                <span>Hành tinh:</span>
                                                <span>{PLANET_SYMBOLS[planet.name]} {PLANET_NAMES_VI[planet.name] || planet.name}</span>
                                            </div>
                                            <div className="tooltip-row">
                                                <span>Cung hoàng đạo:</span>
                                                <span style={{ color: getSignColor(planet.sign) }}>
                                                    {ZODIAC_SIGNS[planet.sign]?.symbol} {ZODIAC_SIGNS[planet.sign]?.vi || planet.sign}
                                                </span>
                                            </div>
                                            <div className="tooltip-row">
                                                <span>Độ:</span>
                                                <span>{formatDegree(planet.signDegree)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                    {hoveredAspect && !hoveredPlanet && (
                        <>
                            <div className="tooltip-header" style={{ color: ASPECT_COLORS[hoveredAspect.aspect.type] }}>
                                                {ASPECT_SYMBOLS[hoveredAspect.aspect.type]} {ASPECT_NAMES_VI[hoveredAspect.aspect.type] || hoveredAspect.aspect.type.charAt(0).toUpperCase() + hoveredAspect.aspect.type.slice(1)}
                            </div>
                            <div className="tooltip-row">
                                <span>Hành tinh:</span>
                                <span>
                                    <span style={{ color: palette.person1Color }}>{PLANET_SYMBOLS[hoveredAspect.aspect.person1_planet] || hoveredAspect.aspect.person1_planet}</span> ↔
                                    <span style={{ color: palette.person2Color }}> {PLANET_SYMBOLS[hoveredAspect.aspect.person2_planet] || hoveredAspect.aspect.person2_planet}</span>
                                </span>
                            </div>
                            <div className="tooltip-row">
                                <span>Góc Chiếu:</span>
                                <span>{hoveredAspect.aspect.angle.toFixed(1)}°</span>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="synastry-viewport" ref={viewportRef} onMouseDown={drag.start} onMouseMove={drag.move} onMouseUp={drag.end} onMouseLeave={drag.end} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size, maxWidth: '100%', transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})` }}>

                    {ZODIAC_ORDER.map((sign, i) => {
                        const midAngle = i * 30 + 15;
                        const pos = toXY(midAngle, nameRadius);
                        const rot = getTangentRotation(midAngle);
                        return (
                            <text key={`name-${sign}`} x={pos.x} y={pos.y} fill={palette.signName} fontSize={11.5} fontWeight={800} letterSpacing="2.2px" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${rot}, ${pos.x}, ${pos.y})`} style={{ fontFamily: 'Inter, sans-serif' }}>
                                {(ZODIAC_SIGNS[sign]?.vi || sign).toUpperCase()}
                            </text>
                        );
                    })}

                    <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke={palette.outerRing} strokeWidth={isLight ? 3.4 : 3} />
                    <circle cx={cx} cy={cy} r={zodiacInnerRadius} fill="none" stroke={palette.innerRing} strokeWidth={isLight ? 2.8 : 2.4} />

                    {ZODIAC_ORDER.map((sign, i) => {
                        const startAngle = i * 30;
                        const midAngle = startAngle + 15;
                        const iconPos = toXY(midAngle, zodiacIconRadius);
                        const divStart = toXY(startAngle, zodiacInnerRadius);
                        const divEnd = toXY(startAngle, outerRadius);
                        const ZodiacIcon = ZODIAC_ICONS[sign];
                        const iconSize = 30;
                        const color = getSignColor(sign);

                        return (
                            <g key={sign}>
                                <line x1={divStart.x} y1={divStart.y} x2={divEnd.x} y2={divEnd.y} stroke={palette.divider} strokeWidth={isLight ? 1.5 : 1.3} />
                                <foreignObject x={iconPos.x - iconSize / 2} y={iconPos.y - iconSize / 2} width={iconSize} height={iconSize} style={{ overflow: 'visible' }}>
                                    {ZodiacIcon && <ZodiacIcon size={iconSize} color={color} stroke={1.75} />}
                                </foreignObject>
                            </g>
                        );
                    })}

                    <circle cx={cx} cy={cy} r={p2RingInner} fill="none" stroke={palette.divider} strokeWidth={1} strokeDasharray="4 4" />
                    {p2Anchors.map(({ planet, pos }, i) => {
                        const size = 20;
                        return (
                            <g key={`p2-${planet.name}-${i}`} className="planet-symbol"
                                onMouseEnter={() => { const cluster = getHoveredPlanetCluster(planet, 2); if (cluster) setHoveredPlanet(cluster); }}
                                onMouseLeave={() => setHoveredPlanet(null)}>
                                <circle cx={pos.x} cy={pos.y} r={14} fill="transparent" />
                                <circle className="planet-ring" cx={pos.x} cy={pos.y} r={12} fill="none" stroke={palette.person2Color} strokeWidth={1.5} opacity={0.6} strokeOpacity={0.6} />
                                <foreignObject x={pos.x - size / 2} y={pos.y - size / 2} width={size} height={size} style={{ pointerEvents: 'none' }}>
                                    <PlanetIcon name={planet.name} size={size} color={palette.person2Color} />
                                </foreignObject>
                            </g>
                        );
                    })}

                    <circle cx={cx} cy={cy} r={p1RingInner} fill="none" stroke={palette.divider} strokeWidth={1.5} />
                    {p1Anchors.map(({ planet, pos }, i) => {
                        const size = 20;
                        return (
                            <g key={`p1-${planet.name}-${i}`} className="planet-symbol"
                                onMouseEnter={() => { const cluster = getHoveredPlanetCluster(planet, 1); if (cluster) setHoveredPlanet(cluster); }}
                                onMouseLeave={() => setHoveredPlanet(null)}>
                                <circle cx={pos.x} cy={pos.y} r={14} fill="transparent" />
                                <circle className="planet-ring" cx={pos.x} cy={pos.y} r={12} fill="none" stroke={palette.person1Color} strokeWidth={1.5} opacity={0.6} strokeOpacity={0.6} />
                                <foreignObject x={pos.x - size / 2} y={pos.y - size / 2} width={size} height={size} style={{ pointerEvents: 'none' }}>
                                    <PlanetIcon name={planet.name} size={size} color={palette.person1Color} />
                                </foreignObject>
                            </g>
                        );
                    })}

                    <circle cx={cx} cy={cy} r={houseOuterRadius} fill="none" stroke={palette.houseRing} strokeWidth={isLight ? 2.5 : 2} />
                    {person1_houses.map((house, i) => {
                        const startObj = house.cusp;
                        const endObj = person1_houses[(i + 1) % 12].cusp;
                        let midAngle = (startObj + endObj) / 2;
                        if (startObj > endObj) { midAngle = ((startObj + endObj + 360) / 2) % 360; }

                        const isAngular = [1, 4, 7, 10].includes(i + 1);
                        const start = toXY(startObj, innerRadius);
                        const end = toXY(startObj, houseOuterRadius);
                        const labelPos = toXY(midAngle, houseOuterRadius - 12);
                        const labelRot = getTangentRotation(midAngle);

                        return (
                            <g key={`house-${i}`}>
                                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={isAngular ? palette.angularLine : palette.houseLine} strokeWidth={isAngular ? 2 : 1} strokeDasharray={isAngular ? 'none' : '4 4'} />
                                <text x={labelPos.x} y={labelPos.y} fill={palette.houseLabel} fontSize={11} fontWeight={600} textAnchor="middle" dominantBaseline="middle" transform={`rotate(${labelRot}, ${labelPos.x}, ${labelPos.y})`}>
                                    {i + 1}
                                </text>
                            </g>
                        );
                    })}

                    <g className="aspect-lines">
                        {aspects.map((aspect, i) => {
                            // Filter: only major aspects between core planets
                            const validPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Ascendant'];
                            const validAspectTypes = ['conjunction', 'trine', 'sextile', 'square', 'opposition'];

                            if (!validAspectTypes.includes(aspect.type.toLowerCase())) return null;
                            if (!validPlanets.includes(aspect.person1_planet)) return null;
                            if (!validPlanets.includes(aspect.person2_planet)) return null;
                            if (aspect.orb > 7) return null;

                            const p1Pos = p1AspectEndpoints[aspect.person1_planet];
                            const p2Pos = p2AspectEndpoints[aspect.person2_planet];
                            if (!p1Pos || !p2Pos) return null;

                            const hitX = (p1Pos.x + p2Pos.x) / 2;
                            const hitY = (p1Pos.y + p2Pos.y) / 2;

                            return (
                                <g key={`aspect-${i}`}>
                                    <line
                                        x1={p1Pos.x} y1={p1Pos.y} x2={p2Pos.x} y2={p2Pos.y}
                                        stroke={ASPECT_COLORS[aspect.type] || 'rgba(128,128,128,0.3)'}
                                        strokeWidth={hoveredAspect?.aspect === aspect ? 2.5 : 1}
                                        opacity={hoveredAspect ? (hoveredAspect.aspect === aspect ? 1 : 0.1) : 0.6}
                                        onMouseEnter={() => setHoveredAspect({ x: hitX, y: hitY, aspect })}
                                        onMouseLeave={() => setHoveredAspect(null)}
                                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                    />
                                    <line
                                        x1={p1Pos.x} y1={p1Pos.y} x2={p2Pos.x} y2={p2Pos.y}
                                        stroke="transparent"
                                        strokeWidth={15}
                                        onMouseEnter={() => setHoveredAspect({ x: hitX, y: hitY, aspect })}
                                        onMouseLeave={() => setHoveredAspect(null)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
}
