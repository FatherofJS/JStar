import { MOCK_CHART } from '../data/mockData.ts';
import { ZODIAC_SIGNS } from '../types/chart.ts';

export function PlanetTable(){
    const planets = MOCK_CHART.planets;

  // Function to format degree notation (e.g., 24°17'52")
  const formatDegree = (longitude: number, signDegree: number) => {
    const degrees = Math.floor(signDegree);
    const minutesDecimal = (signDegree - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.floor((minutesDecimal - minutes) * 60);
    
    return `${degrees}°${minutes}'${seconds}"`;
  };

  // Get house number as ordinal (1st, 2nd, 3rd, etc.)
  const getHouseOrdinal = (house: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = house % 100;
    return house + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  // Define planet order and their display info
  const planetOrder = [
    { id: 'sun', label: 'Sun:', color: '#9B59D6' },
    { id: 'moon', label: 'Moon:', color: '#9B59D6' },
    { id: 'mercury', label: 'Mercury:', color: '#9B59D6' },
    { id: 'venus', label: 'Venus:', color: '#9B59D6' },
    { id: 'mars', label: 'Mars:', color: '#9B59D6' },
    { id: 'jupiter', label: 'Jupiter:', color: '#9B59D6' },
    { id: 'saturn', label: 'Saturn:', color: '#9B59D6' },
    { id: 'uranus', label: 'Uranus:', color: '#9B59D6' },
    { id: 'neptune', label: 'Neptune:', color: '#9B59D6' },
    { id: 'pluto', label: 'Pluto:', color: '#9B59D6' },
    { id: 'north_node', label: 'North Node (T):', color: '#9B59D6' },
    { id: 'south_node', label: 'South Node (T):', color: '#7B68A8' },
    { id: 'ascendant', label: 'Ascendant:', color: '#9B59D6' },
    { id: 'midheaven', label: 'Midheaven (MC):', color: '#9B59D6' },
  ];

  // Get planet data by ID
  const getPlanetData = (id: string) => {
    if (id === 'ascendant') {
      return {
        degree: formatDegree(MOCK_CHART.houses[0].longitude, MOCK_CHART.houses[0].signDegree),
        house: '1th'
      };
    }
    if (id === 'midheaven') {
      return {
        degree: formatDegree(MOCK_CHART.houses[9].longitude, MOCK_CHART.houses[9].signDegree),
        house: '10th'
      };
    }
    
    const planet = planets.find(p => p.id === id);
    if (!planet) return { degree: '', house: '' };
    
    return {
      degree: formatDegree(planet.longitude, planet.signDegree),
      house: getHouseOrdinal(planet.house)
    };
  };

  return (
    <div style={{
      backgroundColor: '#0a0e1a',
      borderRadius: '8px',
      padding: '16px',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      minWidth: '280px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #1a2332'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 600,
          color: '#e0e0e0'
        }}>
          Natal Points
        </h3>
        <span style={{
          fontSize: '18px',
          color: '#666',
          cursor: 'pointer'
        }}>
          ⌄
        </span>
      </div>

      {/* Planet list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {planetOrder.map((item) => {
          const data = getPlanetData(item.id);
          
          return (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 80px 40px',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {/* Planet name */}
              <span style={{
                color: '#a0a0a0',
                fontSize: '12px'
              }}>
                {item.label}
              </span>

              {/* Degree indicator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: item.color,
                  borderRadius: '2px',
                  flexShrink: 0
                }} />
                <span style={{
                  color: '#fff',
                  fontSize: '12px',
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {data.degree}
                </span>
              </div>

              {/* House */}
              <span style={{
                color: '#a0a0a0',
                fontSize: '12px',
                textAlign: 'right'
              }}>
                {data.house}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}