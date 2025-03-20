import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Cpu } from 'lucide-react';

// Nouveau composant pour afficher une compétence
const SkillItem = ({ name, level, color = '#fd9d3e', categoryColor = '#2C3E50', animated = true }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimate(true);
    }
  }, [animated]);

  // Déterminer les badges de niveau
  const getSkillLevel = (level) => {
    if (level >= 90) return { text: 'Expert', bg: 'bg-success' };
    if (level >= 80) return { text: 'Avancé', bg: 'bg-info' };
    if (level >= 65) return { text: 'Intermédiaire', bg: 'bg-primary-500' };
    return { text: 'Débutant', bg: 'bg-secondary-500' };
  };

  const skillLevel = getSkillLevel(level);

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-4 border-l-4" 
         style={{ borderLeftColor: categoryColor }}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold dark:text-white">{name}</h3>
        <span className={`${skillLevel.bg} text-white text-xs px-2 py-1 rounded-full`}>
          {skillLevel.text}
        </span>
      </div>
      
      <div className="relative h-2 bg-gray-200 dark:bg-secondary-700 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: animate ? `${level}%` : '0%',
            backgroundColor: color
          }}
        ></div>
      </div>
      
      {/* Sous-section avec les expériences ou projets associés */}
      <div className="mt-4 pt-2 border-t border-gray-100 dark:border-secondary-700">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div className="font-medium">Niveau {level}/100</div>
        </div>
      </div>
    </div>
  );
};

// Composant principal pour la page des compétences
const Skills = () => {
  const { skills, profile, loading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    // Démarrer l'animation après un court délai
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  // Déterminer la couleur pour chaque catégorie
  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'outils': return '#3182CE'; // Bleu
      case 'développement': return '#fd9d3e'; // Orange
      case 'systèmes': return '#38A169'; // Vert
      case 'langues': return '#805AD5'; // Violet
      case 'soft skills': return '#DD6B20'; // Orange foncé
      default: return '#2C3E50'; // Bleu foncé
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Filtre des compétences par catégorie
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(group => group.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Compétences professionnelles</h1>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Un aperçu de mes compétences techniques et personnelles, développées à travers mes expériences professionnelles et mes projets personnels.
            </p>
          </header>
          
          {/* Section spéciale IA Skills */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg mb-16 overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white p-3 rounded-full">
                  <Cpu size={28} className="text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold">Compétences de développement assisté par IA</h2>
              </div>
              
              <p className="mb-8">
                En tant que technicien support, j'ai développé un ensemble unique de compétences combinant mon expertise en support avec les capacités de l'IA pour créer des solutions techniques sans être développeur expert.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-white">Prompt Engineering</h3>
                  <div className="w-full bg-white/20 h-2 rounded-full mb-1">
                    <div className="bg-white h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-sm">Formuler des requêtes précises pour l'IA</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-white">Intégration Code IA</h3>
                  <div className="w-full bg-white/20 h-2 rounded-full mb-1">
                    <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm">Adapter et combiner le code généré par l'IA</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-white">Debugging avec IA</h3>
                  <div className="w-full bg-white/20 h-2 rounded-full mb-1">
                    <div className="bg-white h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-sm">Résoudre les problèmes avec l'aide de l'IA</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filtres de catégorie */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-secondary-600 text-white shadow-md' 
                  : 'bg-white dark:bg-secondary-800 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-secondary-700'
              }`}
            >
              Toutes les compétences
            </button>
            {skills.map(group => (
              <button
                key={group.category}
                onClick={() => setSelectedCategory(group.category.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === group.category.toLowerCase() 
                    ? 'text-white shadow-md' 
                    : 'bg-white dark:bg-secondary-800 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-secondary-700'
                }`}
                style={{ backgroundColor: selectedCategory === group.category.toLowerCase() ? getCategoryColor(group.category) : '' }}
              >
                {group.category}
              </button>
            ))}
          </div>
          
          {/* Affichage des compétences par groupe */}
          <div className="space-y-12">
            {filteredSkills.map((group, groupIndex) => (
              <div key={group.id || groupIndex} className="bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-secondary-700 flex items-center" 
                     style={{ backgroundColor: `${getCategoryColor(group.category)}15` }}>
                  <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" 
                       style={{ backgroundColor: getCategoryColor(group.category) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-secondary-800 dark:text-white">{group.category}</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {group.items.map((skill, skillIndex) => (
                      <SkillItem 
                        key={skillIndex}
                        name={skill.name}
                        level={skill.level}
                        color={profile?.colors?.primary || getCategoryColor(group.category)}
                        categoryColor={getCategoryColor(group.category)}
                        animated={animateItems}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section complémentaire avec des informations sur l'apprentissage */}
      <div className="bg-gradient-to-r from-secondary-700 to-secondary-800 py-16 text-white mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Apprentissage continu</h2>
            <p className="text-neutral-200 mb-8">
              Le monde de la technologie évolue rapidement. Je me tiens constamment à jour avec les dernières technologies et meilleures pratiques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm w-full sm:w-64">
                <div className="text-4xl font-bold text-primary-400 mb-2">5+</div>
                <div className="text-neutral-200">Années d'expérience</div>
              </div>
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm w-full sm:w-64">
                <div className="text-4xl font-bold text-primary-400 mb-2">10+</div>
                <div className="text-neutral-200">Technologies maîtrisées</div>
              </div>
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm w-full sm:w-64">
                <div className="text-4xl font-bold text-primary-400 mb-2">7+</div>
                <div className="text-neutral-200">Projets réalisés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;