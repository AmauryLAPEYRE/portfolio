// src/index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

// Styles
import './styles/tailwind.css';
import './index.css';
import './styles/animations.css';
// Si vous avez créé le fichier style.css professionnel
import './styles/style.css';

// Composant pour gérer les erreurs globales de l'application
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez enregistrer l'erreur dans un service de rapport d'erreurs
    console.error("Erreur capturée par ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });

    // Enregistrement de l'erreur dans localStorage pour débuggage
    try {
      localStorage.setItem('portfolioLastError', JSON.stringify({
        message: error.message,
        stack: error.stack,
        time: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Erreur lors de la sauvegarde dans localStorage:', e);
    }
  }

  render() {
    if (this.state.hasError) {
      // Afficher une UI de secours
      return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Oups ! Un problème est survenu</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              L'application a rencontré une erreur inattendue. Veuillez actualiser la page ou réessayer ultérieurement.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto max-h-64">
                <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
                  {this.state.error && this.state.error.toString()}
                </p>
                <p className="font-mono text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </p>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors mr-4"
              >
                Actualiser la page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Composant d'application avec gestion des remontées d'erreurs
const AppWithErrorHandling = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Initialisation de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWithErrorHandling />);
