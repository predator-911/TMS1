import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { GeneratePage } from './pages/GeneratePage';
import { EncodePage } from './pages/EncodePage';
import { DecodePage } from './pages/DecodePage';
import { GuidePage } from './pages/GuidePage';
import { AboutPage } from './pages/AboutPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={navigate} />
      <main>
        {currentPath === '/' && (
          <>
            <Hero />
            <Features />
          </>
        )}
        {currentPath === '/generate' && <GeneratePage />}
        {currentPath === '/encode' && <EncodePage />}
        {currentPath === '/decode' && <DecodePage />}
        {currentPath === '/guide' && <GuidePage />}
        {currentPath === '/about' && <AboutPage />}
      </main>
    </div>
  );
}

export default App;