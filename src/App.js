// src/App.js - version modifiée pour inclure le Footer
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';

// Composants chargés immédiatement
import Home from './pages/Home';
import Footer from './components/Footer';

// Chargement paresseux des autres pages
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Education = lazy(() => import('./pages/Education'));
const Interests = lazy(() => import('./pages/Interests'));
const AIProjects = lazy(() => import('./pages/AIProjects'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

const App = () => {
  // État pour suivre l'initialisation de l'application
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Préchargement des modules en arrière-plan
    const preloadModules = async () => {
      // Précharger les modules les plus susceptibles d'être visités
      const preloadPromises = [
        import('./pages/Projects'),
        import('./pages/Experience')
      ];
      
      try {
        await Promise.all(preloadPromises);
        console.log('Modules préchargés avec succès');
      } catch (error) {
        console.error('Erreur lors du préchargement des modules:', error);
      }
    };
    
    // Simuler un temps de chargement pour permettre aux services de s'initialiser
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
      // Précharger les modules après l'initialisation
      preloadModules();
    }, 1000);

    return () => clearTimeout(initTimer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Chargement du portfolio...</p>
      </div>
    );
  }

  return (
    <Router>
      <ThemeProvider>
        <ContentProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Routes publiques */}
                  <Route path="/" element={<Home />} />
                  <Route path="/projets" element={<Projects />} />
                  <Route path="/projets/:id" element={<ProjectDetail />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/competences" element={<Skills />} />
                  <Route path="/formation" element={<Education />} />
                  <Route path="/interets" element={<Interests />} />
                  <Route path="/projets-ia" element={<AIProjects />} />
                  
                  {/* Redirection pour les routes inconnues */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </div>
        </ContentProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;