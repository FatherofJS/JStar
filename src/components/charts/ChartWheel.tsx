import { useState, useRef, useEffect } from 'react';
import {
    ZODIAC_SIGNS, ZODIAC_ORDER, ASPECT_COLORS,
    PLANET_SYMBOLS, ASPECT_SYMBOLS,
} from '../../types/chart';
import type { Planet, Aspect, ChartData } from '../../types/chart';

import { useTheme } from "../../theme";
import { ZODIAC_ICONS, PlanetIcon, getSignColor, normalizeAngle, formatDegree } from './chartUtils';
import './ChartWheel.css';


export function ChartWheel({ data }: { data: ChartData }) {
    const { planets, houses, aspects } = data;
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const palette = {
        signName: isLight ? 'rgba(15, 23, 42, 0.84)' : 'rgba(255,255,255,0.5)',
        outerRing: isLight ? 'rgba(30, 41, 59, 0.62)' : 'rgba(255,255,255,0.38)',
        innerRing: isLight ? 'rgba(51, 65, 85, 0.48)' : 'rgba(255,255,255,0.26)',
        divider: isLight ? 'rgba(30, 41, 59, 0.44)' : 'rgba(255,255,255,0.28)',
        planetFill: 'transparent',
        houseRing: isLight ? 'rgba(51, 65, 85, 0.42)' : 'rgba(255,255,255,0.22)',
        innerFill: 'transparent',
        angularLine: isLight ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255,255,255,0.5)',
        houseLine: isLight ? 'rgba(51, 65, 85, 0.38)' : 'rgba(255,255,255,0.2)',
        houseLabel: isLight ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255,255,255,0.54)',
        aspectGuide: isLight ? 'rgba(51, 65, 85, 0.24)' : 'rgba(255,255,255,0.12)',
        angleLabel: isLight ? '#0f172a' : '',
    };

    const size = 700;
    const cx = size / 2;
    const cy = size / 2;

    const outerRadius = size * 0.4;              // = 280px
    const nameRadius = size * 0.42;              // = 294px
    const zodiacIconRadius = outerRadius * 0.925; // = 259px
    const zodiacInnerRadius = outerRadius * 0.85; // = 238px
    const planetRadius = outerRadius * 0.77;     // = 216px
    const houseOuterRadius = outerRadius * 0.58; // = 162px
    const innerRadius = outerRadius * 0.50;      // = 140px (houses + aspects)

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

    const [hoveredPlanet, setHoveredPlanet] = useState<{ x: number; y: number; planet: Planet; planets: Planet[] } | null>(null);
    const [hoveredAspect, setHoveredAspect] = useState<{ x: number; y: number; aspect: Aspect } | null>(null);
    const [scale, setScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

    const zoom = (delta: number) => setScale(prev => Math.max(0.75, Math.min(3, prev + delta)));

    // Attach wheel listener with { passive: false } so preventDefault works
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

    const aspectEndpoints: Record<string, { x: number; y: number }> = {};
    planets.forEach(p => aspectEndpoints[p.name] = toXY(p.longitude, innerRadius));
    aspectEndpoints['Ascendant'] = toXY(houses[0]?.cusp || 0, innerRadius);
    aspectEndpoints['Midheaven'] = toXY(houses[9]?.cusp || 0, innerRadius);
    aspectEndpoints['Midheaven (MC)'] = aspectEndpoints['Midheaven'];

    const planetAnchors = planets.map((planet) => ({
        planet,
        pos: toXY(planet.longitude, planetRadius),
    }));

    const getHoveredPlanetCluster = (targetPlanet: Planet) => {
        const target = planetAnchors.find(({ planet }) => planet.name === targetPlanet.name);
        if (!target) return null;

        const cluster = planetAnchors.filter(({ pos }) => {
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
        };
    };

    const tipAnchor = hoveredAspect || hoveredPlanet;
    const tooltipStyle = tipAnchor ? {
        left: `${(tipAnchor.x / size) * 100}%`,
        top: `${(tipAnchor.y / size) * 100}%`,
        transform: `translate(${tipAnchor.x > cx ? '-100%' : '10px'}, ${tipAnchor.y > cy ? '-100%' : '10px'})`,
    } : {};

    return (
        <div className="chart-wheel-container">

            {/* Zoom */}
            <div className="chart-controls">
                <button onClick={() => zoom(0.1)}>+</button>
                <button onClick={() => zoom(-0.1)}>−</button>
                <button onClick={() => { setScale(1); setPanOffset({ x: 0, y: 0 }); }}>⟳</button>
            </div>

            {/* Tooltip */}
            {(hoveredPlanet || hoveredAspect) && (
                <div className="planet-tooltip" style={tooltipStyle}>
                    {hoveredPlanet && !hoveredAspect && (
                        <>
                            <div className="tooltip-header">
                                {PLANET_SYMBOLS[hoveredPlanet.planets[0].name]} {hoveredPlanet.planets[0].name}
                            </div>
                            <div className="tooltip-row">
                                <span>Sign:</span>
                                <span style={{ color: getSignColor(hoveredPlanet.planets[0].sign) }}>
                                    {ZODIAC_SIGNS[hoveredPlanet.planets[0].sign]?.symbol} {hoveredPlanet.planets[0].sign}
                                </span>
                            </div>
                            <div className="tooltip-row">
                                <span>Degree:</span>
                                <span>
                                    {Math.floor(hoveredPlanet.planet.signDegree)}°
                                    {Math.floor((hoveredPlanet.planet.signDegree % 1) * 60)}'
                                </span>
                            </div>
                            <div className="tooltip-row">
                                <span>House:</span>
                                <span>{hoveredPlanet.planets[0].house}</span>
                            </div>
                            {false && (
                                <>
                                    <div className="tooltip-header" style={{ marginTop: '8px' }}>
                                        Also Here
                                    </div>
                                    {hoveredPlanet!.planets
                                        .filter((planet) => planet.name !== hoveredPlanet!.planet.name)
                                        .map((planet) => (
                                            <div key={planet.name} className="tooltip-row">
                                                <span>{PLANET_SYMBOLS[planet.name]} {planet.name}</span>
                                                <span style={{ color: getSignColor(planet.sign) }}>
                                                    {ZODIAC_SIGNS[planet.sign]?.symbol} {formatDegree(planet.signDegree)}
                                                </span>
                                            </div>
                                        ))}
                                </>
                            )}
                            {hoveredPlanet.planets[0].retrograde && (
                                <div className="tooltip-retrograde">℞ Retrograde</div>
                            )}
                            {hoveredPlanet.planets.length > 1 && (
                                <>
                                    <div className="tooltip-header" style={{ marginTop: '8px' }}>
                                        All In This Stack
                                    </div>
                                    {hoveredPlanet.planets.map((planet, index) => (
                                        <div
                                            key={planet.name}
                                            className="tooltip-stack-card"
                                            style={{
                                                marginBottom: index === hoveredPlanet.planets.length - 1 ? 0 : '8px',
                                            }}
                                        >
                                            <div className="tooltip-row">
                                                <span>Planet:</span>
                                                <span>{PLANET_SYMBOLS[planet.name]} {planet.name}</span>
                                            </div>
                                            <div className="tooltip-row">
                                                <span>Sign:</span>
                                                <span style={{ color: getSignColor(planet.sign) }}>
                                                    {ZODIAC_SIGNS[planet.sign]?.symbol} {planet.sign}
                                                </span>
                                            </div>
                                            <div className="tooltip-row">
                                                <span>Degree:</span>
                                                <span>{formatDegree(planet.signDegree)}</span>
                                            </div>
                                            <div className="tooltip-row">
                                                <span>House:</span>
                                                <span>{planet.house}</span>
                                            </div>
                                            {planet.retrograde && (
                                                <div className="tooltip-retrograde">℞ Retrograde</div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                    {hoveredAspect && (
                        <>
                            <div className="tooltip-header" style={{ color: ASPECT_COLORS[hoveredAspect.aspect.type] }}>
                                {ASPECT_SYMBOLS[hoveredAspect.aspect.type]} {hoveredAspect.aspect.type.charAt(0).toUpperCase() + hoveredAspect.aspect.type.slice(1)}
                            </div>
                            <div className="tooltip-row">
                                <span>Planets:</span>
                                <span>{PLANET_SYMBOLS[hoveredAspect.aspect.planet1] || hoveredAspect.aspect.planet1} ↔ {PLANET_SYMBOLS[hoveredAspect.aspect.planet2] || hoveredAspect.aspect.planet2}</span>
                            </div>
                            <div className="tooltip-row">
                                <span>Angle:</span>
                                <span>{hoveredAspect.aspect.angle.toFixed(1)}°</span>
                            </div>
                            <div className="tooltip-row">
                                <span>Orb:</span>
                                <span>{hoveredAspect.aspect.orb.toFixed(2)}°</span>
                            </div>
                            <div className="tooltip-row">
                                <span>Status:</span>
                                <span>{hoveredAspect.aspect.applying ? 'Applying' : 'Separating'}</span>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* SVG Chart */}
            <div className="chart-viewport"
                ref={viewportRef}
                onMouseDown={drag.start}
                onMouseMove={drag.move}
                onMouseUp={drag.end}
                onMouseLeave={drag.end}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    style={{
                        width: '100%', height: '100%',
                        maxWidth: size, maxHeight: size,
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
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
                                fill={palette.signName}
                                fontSize={11.5} fontWeight={800} letterSpacing="2.2px"
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
                                {/* Divider line between signs */}
                                <line x1={divStart.x} y1={divStart.y} x2={divEnd.x} y2={divEnd.y}
                                    stroke={palette.divider} strokeWidth={isLight ? 1.5 : 1.3} />

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
                        const pos = toXY(planet.longitude, planetRadius);
                        const color = getSignColor(planet.sign);
                        const iconSize = 18;

                        return (
                            <g key={planet.name} className="planet-symbol"
                                onMouseEnter={() => {
                                    const cluster = getHoveredPlanetCluster(planet);
                                    if (cluster) setHoveredPlanet(cluster);
                                }}
                                onMouseLeave={() => setHoveredPlanet(null)}
                            >
                                {/* Background circle */}
                                <circle cx={pos.x} cy={pos.y} r={14}
                                    fill={palette.planetFill}
                                    stroke={color} strokeWidth={isLight ? 1.9 : 1.5} strokeOpacity={isLight ? 0.55 : 0.3}
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
                    <circle cx={cx} cy={cy} r={houseOuterRadius} fill="none" stroke={palette.houseRing} strokeWidth={isLight ? 2.8 : 2.4} />
                    <circle cx={cx} cy={cy} r={innerRadius} fill={palette.innerFill} stroke={palette.houseRing} strokeWidth={isLight ? 2.8 : 2.4} />

                    {houses.map((house, i) => {
                        // Equal 30° sectors for visual display
                        const startAngle = i * 30;
                        const midAngle = startAngle + 15;

                        const innerPos = toXY(startAngle, innerRadius);
                        const outerPos = toXY(startAngle, zodiacInnerRadius);
                        const labelPos = toXY(midAngle, (houseOuterRadius + innerRadius) / 2);
                        const isAngular = [1, 4, 7, 10].includes(house.id);

                        return (
                            <g key={`house-${house.id}`}>
                                <line x1={innerPos.x} y1={innerPos.y} x2={outerPos.x} y2={outerPos.y}
                                    stroke={isAngular ? palette.angularLine : palette.houseLine}
                                    strokeWidth={isAngular ? (isLight ? 2.8 : 2.4) : (isLight ? 1.6 : 1.25)}
                                />
                                <text x={labelPos.x} y={labelPos.y}
                                    fill={palette.houseLabel}
                                    fontSize={10.5} fontWeight={800}
                                    textAnchor="middle" dominantBaseline="middle">
                                    {house.id}
                                </text>
                            </g>
                        );
                    })}

                    {/* Angles: AC (Ascendant), MC (Midheaven), DC, IC */}
                    {[
                        { idx: 0, label: 'AC', color: '#ff6b8a' },
                        { idx: 9, label: 'MC', color: '#6bcbff' },
                        { idx: 6, label: 'DC', color: '#bb8fce' },
                        { idx: 3, label: 'IC', color: '#ffd93d' },
                    ].map(({ idx, label, color }) => {
                        if (!houses[idx]) return null;
                        const pos = toXY(houses[idx].cusp, innerRadius - 15);
                        return (
                            <text key={label} x={pos.x} y={pos.y}
                                fill={isLight ? palette.angleLabel : color} fontSize={10.5} fontWeight={800}
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
                    <circle cx={cx} cy={cy} r={innerRadius}
                        fill="none" stroke={palette.aspectGuide}
                        strokeWidth={isLight ? 1.1 : 0.8} strokeDasharray="2,4" />

                    {aspects.map((aspect, i) => {
                        const pos1 = aspectEndpoints[aspect.planet1];
                        const pos2 = aspectEndpoints[aspect.planet2];
                        if (!pos1 || !pos2) return null;

                        const color = ASPECT_COLORS[aspect.type] || '#666';
                        const midX = (pos1.x + pos2.x) / 2;
                        const midY = (pos1.y + pos2.y) / 2;
                        const isHovered = hoveredAspect?.aspect === aspect;

                        return (
                            <g key={`aspect-${i}`}
                                onMouseEnter={() => setHoveredAspect({ x: midX, y: midY, aspect })}
                                onMouseLeave={() => setHoveredAspect(null)}
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
                                    strokeWidth={isHovered ? 2.8 : 1.55}
                                    opacity={isHovered ? 1 : (hoveredAspect ? 0.18 : 0.68)}
                                    style={{ transition: 'all 0.15s' }}
                                />
                            </g>
                        );
                    })}

                </svg>
            </div>
        </div>
    );
}
