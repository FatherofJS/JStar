// Main App - Layout skeleton
// DO NOT EDIT during Sprint One except to add routing state

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from './components/LandingPage';
import StarChartPage from './components/StarChartPage';
import { ChartWheel } from './components/ChartWheel';
import { Background } from './components/background/Background';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Chatbot } from './components/chatbot';
import './App.css';

function ChartWheelWrapper() {
  const location = useLocation();
  const state = location.state as {
    birthDate?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  } | null;
  
  return (
    <ChartWheel 
      birthDate={state?.birthDate}
      birthTime={state?.birthTime}
      latitude={state?.latitude}
      longitude={state?.longitude}
      timezone={state?.timezone}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Background showShootingStars={true} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/star-chart" element={<StarChartPage />} />
              <Route path="/your-star" element={<StarChartPage />} />
              <Route path="/chartwheel" element={<ChartWheelWrapper />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
