import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Calendar, Award, BookOpen, MapPin, Briefcase } from 'lucide-react';

// Animation pour les éléments au scroll
const useScrollAnimation = () => {
  const [animatedElements, setAnimatedElements] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return animatedElements;
};

const Education = () => {
  const { education, loading } = useContent();
  const animatedElements = useScrollAnimation();

  // Fonction pour obtenir l'icône correspondante au type de formation
  const getEducationIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('licence') || lowerTitle.includes('master')) {
      return <Award size={24} className="text-white" />;
    } else if (lowerTitle.includes('formation')) {
      return <BookOpen size={24} className="text-white" />;
    } else if (lowerTitle.includes('bac')) {
      return <Award size={24} className="text-white" />;
    } else {
      return <BookOpen size={24} className="text-white" />;
    }
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
      <div className="container mx-auto px-4 pt-24 pb-16">
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 dark:text-white mb-4">
            Parcours de Formation
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Mon parcours éducatif et les compétences acquises à travers mes différentes formations.
          </p>
        </header>

        {/* Timeline moderne et professionnelle */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Ligne verticale du timeline pour desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary-400 to-primary-600 hidden md:block"></div>

            {/* Éléments de la timeline */}
            {education.map((item, index) => (
              <div 
                key={item.id || index} 
                id={`education-${index}`}
                className={`scroll-animate mb-16 md:mb-24 md:flex items-stretch ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${
                  animatedElements.includes(`education-${index}`) 
                    ? 'opacity-100 transform translate-x-0 transition-all duration-1000' 
                    : `opacity-0 transform ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'} transition-all duration-1000`
                }`}
              >
                {/* Date marker pour desktop */}
                <div className="hidden md:flex md:w-1/2 justify-center items-center pb-8">
                  <div className="px-4 py-2 bg-white dark:bg-secondary-800 text-secondary-800 dark:text-white rounded-lg shadow-md border border-gray-100 dark:border-secondary-700 font-bold">
                    {item.year}
                  </div>
                </div>

                {/* Ligne et icône de connexion pour desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-secondary-800 border-4 border-primary-500 z-10"></div>

                {/* Contenu */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-card overflow-hidden h-full transition-all duration-300 hover:shadow-card-hover border-l-4 border-primary-500">
                    <div className="p-6">
                      {/* Mobile header avec date */}
                      <div className="flex items-center md:hidden mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                          {getEducationIcon(item.title)}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-gray-600 dark:text-gray-300">{item.year}</div>
                        </div>
                      </div>

                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-secondary-800 dark:text-white mb-2">{item.school}</h3>
                          <div className="flex items-center mb-3 text-primary-600 dark:text-primary-400">
                            <Award size={16} className="mr-2" />
                            <p className="font-medium">{item.title}</p>
                          </div>
                          
                          <div className="flex items-start mb-5">
                            <MapPin size={16} className="text-neutral-500 dark:text-neutral-400 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                              {item.location || "France"}
                            </p>
                          </div>

                          {item.details && (
                            <div className="bg-gray-50 dark:bg-secondary-700/50 rounded-lg p-4 mb-4">
                              <p className="text-neutral-700 dark:text-neutral-300 text-sm">{item.details}</p>
                            </div>
                          )}
                        </div>

                        {/* Compétences acquises - Même design pour toutes les formations */}
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-secondary-700">
                          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                            Compétences acquises
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {/* Ces tags utilisent maintenant une couleur harmonisée */}
                            {item.title.toLowerCase().includes('développeur') && (
                              <>
                                <span className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full">Développement Web</span>
                                <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">JavaScript</span>
                                <span className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full">React</span>
                              </>
                            )}
                            {item.title.toLowerCase().includes('prépa') && (
                              <>
                                <span className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full">Algorithmique</span>
                                <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">Bases de données</span>
                                <span className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full">HTML/CSS</span>
                              </>
                            )}
                            {item.title.toLowerCase().includes('technicien menuisier') && (
                              <>
                                <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">CAO/DAO</span>
                                <span className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full">Gestion de projet</span>
                                <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">Techniques de fabrication</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section complémentaire */}
        <div className="mt-16 mb-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-card p-8 border-l-4 border-secondary-500">
            <h2 className="text-2xl font-bold text-secondary-800 dark:text-white mb-6 flex items-center">
              <Briefcase className="mr-3 text-primary-500" size={24} />
              Formation continue
            </h2>
            
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              En plus de mes formations académiques, je me forme continuellement aux nouvelles technologies et méthodologies à travers des plateformes en ligne, des workshops et des projets personnels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-secondary-700/30 p-5 rounded-lg border-l-4 border-primary-500">
                <h3 className="font-bold text-secondary-700 dark:text-white mb-3">Certifications en ligne</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Formations spécialisées pour approfondir mes compétences techniques
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/30 p-5 rounded-lg border-l-4 border-secondary-500">
                <h3 className="font-bold text-secondary-700 dark:text-white mb-3">Veille technologique</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Suivi des dernières avancées et bonnes pratiques du secteur
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/30 p-5 rounded-lg border-l-4 border-primary-500">
                <h3 className="font-bold text-secondary-700 dark:text-white mb-3">Projets personnels</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Application concrète des connaissances dans des projets innovants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;