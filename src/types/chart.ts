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
    name: string;
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

export interface SynastryAspect {
    id?: string;
    person1_planet: string;
    person2_planet: string;
    type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
    angle: number;
    orb: number;
}

export interface SynastryData {
    id: string;
    person1: Subject;
    person2: Subject;
    person1_planets: Planet[];
    person2_planets: Planet[];
    person1_houses: House[];
    person2_houses: House[];
    person1_angles: Angle[];
    person2_angles: Angle[];
    aspects: SynastryAspect[];
}

export interface ChartRequest {
    name: string;
    birthDate: string;
    birthTime: string;
    city: string;
    country: string;
}

export const ZODIAC_SIGNS: Record<string, { symbol: string; color: string; element: string; vi: string }> = {
    Aries: { symbol: '♈', color: '#f97316', element: 'Fire', vi: 'Bạch Dương' },
    Taurus: { symbol: '♉', color: '#22c55e', element: 'Earth', vi: 'Kim Ngưu' },
    Gemini: { symbol: '♊', color: '#38bdf8', element: 'Air', vi: 'Song Tử' },
    Cancer: { symbol: '♋', color: '#a855f7', element: 'Water', vi: 'Cự Giải' },
    Leo: { symbol: '♌', color: '#f97316', element: 'Fire', vi: 'Sư Tử' },
    Virgo: { symbol: '♍', color: '#22c55e', element: 'Earth', vi: 'Xử Nữ' },
    Libra: { symbol: '♎', color: '#38bdf8', element: 'Air', vi: 'Thiên Bình' },
    Scorpio: { symbol: '♏', color: '#a855f7', element: 'Water', vi: 'Bọ Cạp' },
    Sagittarius: { symbol: '♐', color: '#f97316', element: 'Fire', vi: 'Nhân Mã' },
    Capricorn: { symbol: '♑', color: '#22c55e', element: 'Earth', vi: 'Ma Kết' },
    Aquarius: { symbol: '♒', color: '#38bdf8', element: 'Air', vi: 'Bảo Bình' },
    Pisces: { symbol: '♓', color: '#a855f7', element: 'Water', vi: 'Song Ngư' },
};

export const PLANET_SYMBOLS: Record<string, string> = {
    Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
    Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇',
    Chiron: '⚷', 'North Node': '☊', 'South Node': '☋',
};

export const PLANET_NAMES_VI: Record<string, string> = {
    Sun: 'Mặt Trời', Moon: 'Mặt Trăng', Mercury: 'Thủy Tinh', Venus: 'Kim Tinh', Mars: 'Hỏa Tinh',
    Jupiter: 'Mộc Tinh', Saturn: 'Thổ Tinh', Uranus: 'Thiên Vương Tinh', Neptune: 'Hải Vương Tinh', Pluto: 'Diêm Vương Tinh',
    Chiron: 'Chiron', 'North Node': 'Bắc Giao Điểm', 'South Node': 'Nam Giao Điểm', Ascendant: 'Cung Mọc'
};

export const ASPECT_SYMBOLS: Record<string, string> = {
    conjunction: '☌',
    opposition: '☍',
    trine: '△',
    square: '□',
    sextile: '⚹',
};

export const ASPECT_NAMES_VI: Record<string, string> = {
    conjunction: 'Trùng Tụ',
    opposition: 'Đối Đỉnh',
    trine: 'Tam Hợp',
    square: 'Vuông Góc',
    sextile: 'Lục Hợp',
};

export const ASPECT_COLORS: Record<string, string> = {
    conjunction: '#ffd93d',
    opposition: '#ff6b8a',
    trine: '#6bcbff',
    square: '#ff4757',
    sextile: '#50fa7b',
};

export const ZODIAC_ORDER = Object.keys(ZODIAC_SIGNS);
