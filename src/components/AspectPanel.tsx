import { MOCK_CHART } from '../data/mockData.ts';
import { ASPECT_COLORS, ASPECT_SYMBOLS } from '../types/chart.ts';

export function AspectPanel() {
    const aspects = MOCK_CHART.aspects;

  // Tạo ma trận hiển thị các khía cạnh giữa các hành tinh
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Ascendant', 'Midheaven (MC)'];
  
  // Tạo map để tra cứu aspects
  const aspectMap = new Map<string, typeof aspects[0]>();
  aspects.forEach(aspect => {
    const key1 = `${aspect.planet1}-${aspect.planet2}`;
    const key2 = `${aspect.planet2}-${aspect.planet1}`;
    aspectMap.set(key1, aspect);
    aspectMap.set(key2, aspect);
  });

  // Lấy ký hiệu aspect
  const getAspectSymbol = (type: string) => {
    switch(type) {
      case 'conjunction': return '☌';
      case 'sextile': return '⚹';
      case 'square': return '□';
      case 'trine': return '△';
      case 'opposition': return '☍';
      default: return '';
    }
  };

  // Lấy màu aspect
  const getAspectColor = (type: string) => {
    switch(type) {
      case 'conjunction': return '#FFD700'; // Gold
      case 'sextile': return '#00CED1'; // Cyan
      case 'square': return '#FF4444'; // Red
      case 'trine': return '#00FF00'; // Green
      case 'opposition': return '#FF1493'; // Pink
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Aspects</h3>
      
      <div className="overflow-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-8 h-8"></th>
              {planets.map((planet, idx) => (
                <th key={idx} className="w-8 h-8 text-xs text-center">
                  {planet === 'Ascendant' ? 'As' : 
                   planet === 'Midheaven (MC)' ? 'Mc' : 
                   planet === 'Sun' ? '☉' :
                   planet === 'Moon' ? '☽' :
                   planet === 'Mercury' ? '☿' :
                   planet === 'Venus' ? '♀' :
                   planet === 'Mars' ? '♂' :
                   planet === 'Jupiter' ? '♃' :
                   planet === 'Saturn' ? '♄' :
                   planet === 'Uranus' ? '♅' :
                   planet === 'Neptune' ? '♆' :
                   planet === 'Pluto' ? '♇' : planet}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planets.map((planet1, rowIdx) => (
              <tr key={rowIdx}>
                <td className="w-8 h-8 text-xs text-right pr-2">
                  {planet1 === 'Ascendant' ? 'As' : 
                   planet1 === 'Midheaven (MC)' ? 'Mc' : 
                   planet1 === 'Sun' ? '☉' :
                   planet1 === 'Moon' ? '☽' :
                   planet1 === 'Mercury' ? '☿' :
                   planet1 === 'Venus' ? '♀' :
                   planet1 === 'Mars' ? '♂' :
                   planet1 === 'Jupiter' ? '♃' :
                   planet1 === 'Saturn' ? '♄' :
                   planet1 === 'Uranus' ? '♅' :
                   planet1 === 'Neptune' ? '♆' :
                   planet1 === 'Pluto' ? '♇' : planet1}
                </td>
                {planets.map((planet2, colIdx) => {
                  // Chỉ hiển thị nửa trên của ma trận 
                  if (colIdx <= rowIdx) {
                    return <td key={colIdx} className="w-8 h-8 bg-gray-800 border border-gray-700"></td>;
                  }
                  
                  const aspect = aspectMap.get(`${planet1}-${planet2}`);
                  
                  return (
                    <td 
                      key={colIdx} 
                      className="w-8 h-8 text-center border border-gray-700 relative cursor-pointer hover:bg-gray-700"
                      title={aspect ? `${planet1} ${aspect.type} ${planet2} (orb: ${aspect.orb}°)` : ''}
                    >
                      {aspect && (
                        <span 
                          className="text-sm font-bold"
                          style={{ color: getAspectColor(aspect.type) }}
                        >
                          {getAspectSymbol(aspect.type)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span style={{ color: getAspectColor('conjunction') }}>☌</span>
          <span>Conjunction</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: getAspectColor('sextile') }}>⚹</span>
          <span>Sextile</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: getAspectColor('square') }}>□</span>
          <span>Square</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: getAspectColor('trine') }}>△</span>
          <span>Trine</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: getAspectColor('opposition') }}>☍</span>
          <span>Opposition</span>
        </div>
      </div>
    </div>
  );
}