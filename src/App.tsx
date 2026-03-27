import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StarChartPage from './pages/StarChartPage';
import ChartViewPage from './pages/ChartViewPage';
import SynastryViewPage from './pages/SynastryViewPage';
import GalleryPage from './pages/GalleryPage';
import { ThemeProvider } from './theme';
import { SpeedInsights } from "@vercel/speed-insights/react";
import './App.css';

function App() {
  return (
    <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/star-chart" element={<StarChartPage />} />
          <Route path="/chart" element={<ChartViewPage />} />
          <Route path="/synastry" element={<SynastryViewPage />} />
          <Route path="/fatherofjs" element={<GalleryPage />} />
        </Routes>
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
