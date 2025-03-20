import React from 'react';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Briefcase, Cpu, Zap } from 'lucide-react';
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
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-primary-300 dark:bg-primary-800/30 ml-0.5 hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="md:flex">
                  {/* Timeline bullet for desktop */}
                  <div className="absolute left-0 mt-1 w-14 flex justify-center hidden md:block">
                    <div className="w-7 h-7 rounded-full bg-primary-500 shadow-md flex items-center justify-center">
                      <Briefcase size={14} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Time period - desktop */}
                  <div className="md:w-48 pt-2 hidden md:block">
                    <div className="font-bold text-secondary-600 dark:text-secondary-400">{exp.period}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:ml-10 bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden flex-1 hover:shadow-lg transition-all duration-300 border-l-4 border-primary-500">
                    <div className="p-6">
                      {/* Mobile header */}
                      <div className="flex items-center gap-3 md:hidden mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                          <Briefcase size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-secondary-600 dark:text-secondary-400">{exp.period}</div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-500">{exp.location}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{exp.company}</h3>
                          <p className="text-neutral-600 dark:text-neutral-300">{exp.title}</p>
                        </div>
                        <div className="hidden md:block text-right">
                          <div className="text-neutral-500 dark:text-neutral-500">{exp.location}</div>
                          {exp.aiAssisted && (
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
                      
                      {exp.aiAssisted && (
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

        {/* Section DCS EASYWARE & IA */}
        <div className="mt-16 mb-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-secondary-800 to-secondary-700 rounded-xl shadow-card p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Cpu className="mr-3 text-primary-500" size={24} />
              Mon rôle de technicien support augmenté par l'IA
            </h2>
            
            <p className="mb-6">
              Chez DCS EASYWARE, j'ai intégré l'intelligence artificielle à mon rôle de technicien support, ce qui m'a permis de développer des solutions personnalisées pour nos clients sans avoir une expertise approfondie en développement.
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