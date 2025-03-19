// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Fournisseur du contexte de thème
export const ThemeProvider = ({ children }) => {
  // Vérifier si le mode sombre est déjà enregistré ou si le navigateur le préfère
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Vérifier les préférences du système
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Mode clair par défaut
    return 'light';
  };
  
  const [theme, setTheme] = useState(getInitialTheme);
  
  // Changement de thème
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('portfolioTheme', newTheme);
      return newTheme;
    });
  };
  
  // Écouter les changements de préférences du système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Ne pas changer automatiquement si l'utilisateur a déjà choisi un thème
      if (!localStorage.getItem('portfolioTheme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    // Écouteur d'événement pour les changements de préférences
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Compatibilité avec les anciens navigateurs
      mediaQuery.addListener(handleChange);
    }
    
    // Nettoyage
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Appliquer la classe de thème à l'élément html
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);
  
  // Valeurs exposées par le contexte
  const value = {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;