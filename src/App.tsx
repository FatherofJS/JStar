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
import { LandingPage } from './components/LandingPage';
import './App.css';

import { useState } from "react";



function App() {



//close sidebar
  const [isClosed, setIsClosed] = useState(false);





  // TODO: Add state to toggle between landing page and chart view
  const showLanding = false; // Set to true to test landing page

  if (showLanding) {
    return <LandingPage />;
  }

  return (
    <div className="app-container">
      <Sidebar isClosed={isClosed} setIsClosed={setIsClosed} />

      <div className="main-area">
        <Header isClosed={isClosed}/>

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
  );
}

export default App;

