// Main App - Layout skeleton
// DO NOT EDIT during Sprint One except to add routing state

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InfoPanel } from './components/InfoPanel';
import { PlanetTable } from './components/PlanetTable';
import { ChartWheel } from './components/ChartWheel';
import { HousePanel } from './components/HousePanel';
import { AspectPanel } from './components/AspectPanel';
import { BirthForm } from './components/BirthForm';
import LandingPage from './components/LandingPage';
import { Background } from './components/Background';
import './App.css';

function App() {
  // TODO: Add state to toggle between landing page and chart view
  const showLanding = true; // Set to true to test landing page

  return (
    <>
      {/* Global Background - available for all views */}
      <Background showShootingStars={showLanding} />
      
      {showLanding ? (
        <LandingPage />
      ) : (
        <div className="app-container">
          <Sidebar />

          <div className="main-area">
            <Header />

            <div className="content-grid">
              <aside className="left-panel">
                <InfoPanel />
                <PlanetTable />
              </aside>

              <main className="chart-area">
                <ChartWheel />
              </main>

              <aside className="right-panel">
                <HousePanel />
                <AspectPanel />
              </aside>
            </div>
          </div>

          <BirthForm />
        </div>
      )}
    </>
  );
}

export default App;

