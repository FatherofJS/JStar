// CHART DATA TYPES - Shared across all components

export interface Planet {
    id?: string;
    name: string;
    symbol: string;
    sign: string;
    signDegree: number;
    longitude: number;
    house: number;
    speed: number;
    retrograde: boolean;
}

export interface House {
    id: number;
    sign: string;
    cusp: number;
    signDegree: number;
    size: number;
}

export interface Aspect {
    id?: string;
    planet1: string;
    planet2: string;
    type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
    angle: number;
    orb: number;
    applying: boolean;
}

export interface Angle {
    id?: string;
    name: string;       // "Ascendant", "Midheaven", "Descendant", "Imum Coeli"
    longitude: number;
    sign: string;
    signDegree: number;
}

export interface Subject {
    name: string;
    birthDate: string;
    birthTime: string;
    location: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface ChartData {
    id: string;
    subject: Subject;
    planets: Planet[];
    houses: House[];
    aspects: Aspect[];
    angles: Angle[];
}

export interface ChartRequest {
    name: string;
    birthDate: string;   // YYYY-MM-DD
    birthTime: string;   // HH:MM
    city: string;
    country: string;
}

// ZODIAC DATA
export const ZODIAC_SIGNS: Record<string, { symbol: string; color: string; element: string }> = {
    Aries: { symbol: '♈', color: '#f97316', element: 'Fire' },
    Taurus: { symbol: '♉', color: '#22c55e', element: 'Earth' },
    Gemini: { symbol: '♊', color: '#38bdf8', element: 'Air' },
    Cancer: { symbol: '♋', color: '#a855f7', element: 'Water' },
    Leo: { symbol: '♌', color: '#f97316', element: 'Fire' },
    Virgo: { symbol: '♍', color: '#22c55e', element: 'Earth' },
    Libra: { symbol: '♎', color: '#38bdf8', element: 'Air' },
    Scorpio: { symbol: '♏', color: '#a855f7', element: 'Water' },
    Sagittarius: { symbol: '♐', color: '#f97316', element: 'Fire' },
    Capricorn: { symbol: '♑', color: '#22c55e', element: 'Earth' },
    Aquarius: { symbol: '♒', color: '#38bdf8', element: 'Air' },
    Pisces: { symbol: '♓', color: '#a855f7', element: 'Water' },
};

export const PLANET_SYMBOLS: Record<string, string> = {
    Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
    Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇',
    Chiron: '⚷', 'North Node': '☊', 'South Node': '☋',
};

export const ASPECT_SYMBOLS: Record<string, string> = {
    conjunction: '☌',
    opposition: '☍',
    trine: '△',
    square: '□',
    sextile: '⚹',
};

// Note: Aspect and element colors are defined in index.css as CSS variables
// --aspect-conjunction, --aspect-opposition, --aspect-trine, --aspect-square, --aspect-sextile
// --fire, --earth, --air, --water
