import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StarChartPage from './pages/StarChartPage';
import ChartViewPage from './pages/ChartViewPage';
import SynastryViewPage from './pages/SynastryViewPage';
import GalleryPage from './pages/GalleryPage';
import BoardPage from './pages/BoardPage';
import SynastryBoardPage from './pages/SynastryBoardPage';
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
          <Route path="/board" element={<BoardPage />} />
          <Route path="/synastry-board" element={<SynastryBoardPage />} />
        </Routes>
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
