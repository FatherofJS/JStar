import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StarChartPage from './pages/StarChartPage';
import ChartViewPage from './pages/ChartViewPage';
import SynastryViewPage from './pages/SynastryViewPage';
import { ThemeProvider } from './theme';
import { SpeedInsights } from "@vercel/speed-insights/react";
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/star-chart" element={<StarChartPage />} />
          <Route path="/chart" element={<ChartViewPage />} />
          <Route path="/synastry" element={<SynastryViewPage />} />
        </Routes>
      </Router>
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
