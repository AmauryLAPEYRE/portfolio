// src/components/ThemeToggle.js
import React, { memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

// Composant optimisé avec memo pour éviter les rendus inutiles
const ThemeToggle = memo(() => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
          : 'bg-gray-100 hover:bg-gray-200 text-blue-800'
      }`}
      aria-label={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
      title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
});

export default ThemeToggle;