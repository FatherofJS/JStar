// Main App - Routing and Layout
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import StarChartPage from './components/StarChartPage';
import ChartViewPage from './components/ChartViewPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/star-chart" element={<StarChartPage />} />
          <Route path="/chart" element={<ChartViewPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
