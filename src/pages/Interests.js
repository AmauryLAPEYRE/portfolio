import React from 'react';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Music, Dumbbell, Code, Cpu } from 'lucide-react';

const Interests = () => {
  const { interests, loading } = useContent();

  // Obtenir l'icône appropriée
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'music':
        return <Music size={24} />;
      case 'dumbbell':
        return <Dumbbell size={24} />;
      case 'code':
        return <Code size={24} />;
      case 'cpu':
        return <Cpu size={24} />;
      default:
        return <Music size={24} />;
    }
  };

  // Tous les centres d'intérêt utilisent maintenant les mêmes couleurs
  // basées sur notre palette harmonisée
  const getCardStyle = (index) => {
    // Alternance entre primaire et secondaire pour la bordure
    return index % 2 === 0 
      ? 'border-l-4 border-primary-500' 
      : 'border-l-4 border-secondary-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-secondary-800 dark:text-white">Centres d'Intérêt</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((interest, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden 
                          hover:shadow-lg transition-all duration-300 ${getCardStyle(index)}`}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary-500 bg-opacity-20 w-14 h-14 rounded-full flex items-center justify-center">
                    <div className="text-primary-600 dark:text-primary-400">
                      {getIcon(interest.icon)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{interest.name}</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300">{interest.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interests;