import { MOCK_CHART } from '../data/mockData.ts';
import { ZODIAC_SIGNS } from '../types/chart.ts';

export function HousePanel() {
    const formatDegree = (degree: number): string => {
        const d = Math.floor(degree);
        const minFloat = (degree - d) * 60;
        const m = Math.floor(minFloat);
        const s = Math.floor((minFloat - m) * 60);
        return `${d}° ${m}' ${s}"`;
    };

    // Get zodiac symbol from sign name
    const getZodiacSymbol = (sign: string): string => {
        const zodiacMap: { [key: string]: string } = {
            'Aries': '♈',
            'Taurus': '♉',
            'Gemini': '♊',
            'Cancer': '♋',
            'Leo': '♌',
            'Virgo': '♍',
            'Libra': '♎',
            'Scorpio': '♏',
            'Sagittarius': '♐',
            'Capricorn': '♑',
            'Aquarius': '♒',
            'Pisces': '♓'
        };
        return zodiacMap[sign] || '';
    };

    // Get house label
    const getHouseLabel = (id: number): string => {
        const labels = [
            'First House:',
            'Second House:',
            'Third House:',
            'Fourth House:',
            'Fifth House:',
            'Sixth House:',
            'Seventh House:',
            'Eighth House:',
            'Ninth House:',
            'Tenth House:',
            'Eleventh House:',
            'Twelfth House:'
        ];
        return labels[id - 1] || '';
    };

    return (
        <div className="house-panel">
            <div className="house-panel-header">
                <h3>Natal Houses</h3>
                <button className="collapse-btn">▼</button>
            </div>

            <div className="house-list">
                {MOCK_CHART.houses.map((house) => (
                    <div key={house.id} className="house-row">
                        <span className="house-label">{getHouseLabel(house.id)}</span>
                        <div className="house-sign-box">
                            <span className="zodiac-symbol">{getZodiacSymbol(house.sign)}</span>
                        </div>
                        <span className="house-degree">{formatDegree(house.signDegree)}</span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .house-panel {
                    background: rgba(15, 20, 35, 0.95);
                    border: 1px solid rgba(80, 100, 150, 0.3);
                    border-radius: 8px;
                    padding: 12px;
                    min-width: 240px;
                    max-width: 280px;
                }

                .house-panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid rgba(80, 100, 150, 0.2);
                }

                .house-panel-header h3 {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 600;
                    color: #ffffff;
                    letter-spacing: 0.2px;
                }

                .collapse-btn {
                    background: transparent;
                    border: none;
                    color: #7080a0;
                    cursor: pointer;
                    font-size: 11px;
                    padding: 2px 4px;
                    transition: color 0.2s ease;
                }

                .collapse-btn:hover {
                    color: #ffffff;
                }

                .house-list {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .house-row {
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                    gap: 8px;
                    align-items: center;
                    padding: 4px 6px;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }

                .house-row:hover {
                    background: rgba(80, 100, 150, 0.15);
                }

                .house-label {
                    font-size: 11px;
                    color: #a0b0d0;
                    font-weight: 400;
                }

                .house-sign-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 22px;
                    height: 22px;
                    background: rgba(70, 80, 140, 0.4);
                    border-radius: 4px;
                    border: 1px solid rgba(100, 120, 180, 0.3);
                }

                .zodiac-symbol {
                    font-size: 14px;
                    color: #6b7bff;
                }

                .house-degree {
                    font-size: 10px;
                    color: #c8d5e8;
                    font-family: 'Courier New', Consolas, monospace;
                    text-align: right;
                    min-width: 70px;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}