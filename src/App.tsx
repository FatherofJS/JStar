// Main App - Layout skeleton
// DO NOT EDIT during Sprint One except to add routing state
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { InfoPanel } from "./components/InfoPanel";
import { PlanetTable } from "./components/PlanetTable";
import { ChartWheel } from "./components/ChartWheel";
import { HousePanel } from "./components/HousePanel";
import { AspectPanel } from "./components/AspectPanel";
import { BirthForm } from "./components/BirthForm";
import { LandingPage } from "./components/LandingPage";
import "./App.css";
function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="*"
          element={
            <>
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
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
