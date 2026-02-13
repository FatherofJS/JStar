import { MOCK_CHART } from '../data/mockData.ts';

export function InfoPanel() {
    const { subject } = MOCK_CHART;

  // Format date and time 
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    return `${formatDate(dateStr)} ${timeStr}`;
  };

  // Calculate moon phase 
  const getMoonPhase = () => {
    const birthDate = new Date(subject.birthDate);
    const dayOfMonth = birthDate.getDate();
    
    if (dayOfMonth < 7) return { phase: 'Waxing Crescent', day: dayOfMonth };
    if (dayOfMonth < 14) return { phase: 'First Quarter', day: dayOfMonth };
    if (dayOfMonth < 21) return { phase: 'Waning Gibbous', day: dayOfMonth };
    return { phase: 'Waning Crescent', day: dayOfMonth };
  };

  const moonPhase = getMoonPhase();

  return (
    <div className="info-panel">
      {/* Header */}
      <div className="info-panel-header">
        <div className="header-content">
          <h3 className="chart-title">Now</h3>
          <span className="chart-subtitle">Birth chart</span>
        </div>
        <button className="dropdown-btn" aria-label="Options">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path 
              d="M4 6L8 10L12 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Birth Date and Time */}
      <div className="info-section">
        <h4 className="section-title">Birth date and time</h4>
        <p className="section-value">
          {formatDateTime(subject.birthDate, subject.birthTime)}
        </p>
      </div>

      {/* Birth Place */}
      <div className="info-section">
        <h4 className="section-title">Birth place</h4>
        <p className="section-value location">{subject.location}</p>
        <div className="location-details">
          <p className="section-detail">Timezone: {subject.timezone}</p>
          <p className="section-detail">
            Latitude: {Math.abs(subject.latitude).toFixed(6)}°
            {subject.latitude >= 0 ? 'N' : 'S'}
          </p>
          <p className="section-detail">
            Longitude: {Math.abs(subject.longitude).toFixed(6)}°
            {subject.longitude >= 0 ? 'E' : 'W'}
          </p>
        </div>
      </div>

      {/* Chart Details */}
      <div className="info-section">
        <h4 className="section-title">Chart details</h4>
        <p className="section-detail">Perspective: Apparent Geocentric</p>
        <p className="section-detail">House System: Placidus</p>
      </div>

      {/* Moon Phase */}
      <div className="info-section">
        <h4 className="section-title">Moon Phase</h4>
        <p className="section-detail">Phase Day: {moonPhase.day}</p>
        <div className="moon-phase-display">
          <span className="phase-text">{moonPhase.phase}</span>
          <div className="moon-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="#8B7355" opacity="0.8"/>
              <circle cx="10" cy="10" r="8" fill="#2a2d3e" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}