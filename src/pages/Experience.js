import React from 'react';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Cpu } from 'lucide-react';
import IaBadge from '../components/IaBadge';

const Experience = () => {
  const { experiences, loading } = useContent();

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
        <h1 className="text-3xl font-bold mb-8 text-secondary-800 dark:text-white">Expériences Professionnelles</h1>
        
        <div className="relative">
          {/* Timeline line for desktop */}
          <div className="absolute left-[45px] top-0 bottom-0 w-0.5 bg-primary-300 dark:bg-primary-800/30 hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="md:flex">
                  {/* Cercle avec numéro */}
                  <div className="absolute left-[41px] top-6 transform -translate-x-1/2 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-primary-500 shadow-sm flex items-center justify-center text-white font-bold text-sm">
                      {exp.id}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:ml-[80px] bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden flex-1 hover:shadow-lg transition-all duration-300 border-l-4 border-primary-500">
                    <div className="p-6">
                      {/* Mobile header */}
                      <div className="flex items-center gap-3 md:hidden mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                          {exp.id}
                        </div>
                        <div>
                          <div className="font-bold text-secondary-600 dark:text-secondary-400">{exp.period}</div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-500">{exp.location}</div>
                        </div>
                      </div>
                      
                      {/* En-tête desktop */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-4 mb-1">
                            <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{exp.company}</h3>
                            <span className="hidden md:inline-block text-sm font-semibold px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-300">{exp.title}</p>
                        </div>
                        <div className="hidden md:block text-right">
                          <div className="text-neutral-500 dark:text-neutral-500">{exp.location}</div>
                          {exp.aiAssisted && exp.company !== "KAIRIOS" && (
                            <div className="mt-1">
                              <IaBadge size="sm" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <div className="min-w-4 mt-1.5 mr-3">
                              <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                            </div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {exp.aiAssisted && exp.company !== "KAIRIOS" && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-secondary-700 md:hidden">
                          <div className="flex items-center">
                            <IaBadge size="sm" />
                            <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
                              {exp.aiDetails || "Assistance dans certaines tâches"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section IA */}
        <div className="mt-16 mb-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-secondary-800 to-secondary-700 rounded-xl shadow-card p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Cpu className="mr-3 text-primary-500" size={24} />
              Mon rôle de technicien support augmenté par l'IA
            </h2>
            
            <p className="mb-6">
              J'ai intégré l'intelligence artificielle à mon rôle de technicien support, ce qui m'a permis de développer des solutions personnalisées pour nos clients sans avoir une expertise approfondie en développement.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-primary-300 mb-3">Avant l'IA</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Limité aux solutions existantes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Problèmes spécifiques laissés sans solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Dépendance aux équipes de développement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span>Temps de résolution plus long</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-primary-300 mb-3">Avec l'IA</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Création de solutions sur mesure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Résolution de problèmes spécifiques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Autonomie dans le développement de solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Réponse plus rapide aux besoins clients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;