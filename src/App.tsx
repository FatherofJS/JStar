// Main App - Layout skeleton
// DO NOT EDIT during Sprint One except to add routing state

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import StarChartPage from './components/StarChartPage';
import { Background } from './components/Background';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Background showShootingStars={true} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/star-chart" element={<StarChartPage />} />
            <Route path="/your-star" element={<StarChartPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

