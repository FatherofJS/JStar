// Main App - Layout skeleton
// DO NOT EDIT during Sprint One except to add routing state


import LandingPage from './components/LandingPage';
import { Background } from './components/Background';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  // TODO: Add state to toggle between landing page and chart view
  const showLanding = true; // Set to true to test landing page

  return (
    <ThemeProvider>
      {/* Global Background - available for all views */}
      <Background showShootingStars={showLanding} />
      
      {showLanding ? (
        <LandingPage />
      ) : (
        <div className="app-container">
          
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;

