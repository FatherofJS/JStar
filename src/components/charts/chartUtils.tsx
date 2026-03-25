import { ZODIAC_SIGNS } from '../../types/chart';
import {
    IconZodiacAries, IconZodiacTaurus, IconZodiacGemini, IconZodiacCancer,
    IconZodiacLeo, IconZodiacVirgo, IconZodiacLibra, IconZodiacScorpio,
    IconZodiacSagittarius, IconZodiacCapricorn, IconZodiacAquarius, IconZodiacPisces,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

export const ZODIAC_ICONS: Record<string, Icon> = {
    Aries: IconZodiacAries, Taurus: IconZodiacTaurus, Gemini: IconZodiacGemini,
    Cancer: IconZodiacCancer, Leo: IconZodiacLeo, Virgo: IconZodiacVirgo,
    Libra: IconZodiacLibra, Scorpio: IconZodiacScorpio, Sagittarius: IconZodiacSagittarius,
    Capricorn: IconZodiacCapricorn, Aquarius: IconZodiacAquarius, Pisces: IconZodiacPisces,
};

export function PlanetIcon({ name, size, color }: { name: string; size: number; color: string }) {
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

export function getSignColor(sign: string): string {
    return ZODIAC_SIGNS[sign]?.color || '#888';
}

export function normalizeAngle(angle: number): number {
    let curr = angle;
    while (curr < 0) curr += 360;
    while (curr >= 360) curr -= 360;
    return curr;
}

export function formatDegree(degree: number): string {
    const d = Math.floor(degree);
    const m = Math.floor((degree - d) * 60);
    return `${d}°${m.toString().padStart(2, '0')}'`;
}
