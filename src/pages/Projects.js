// src/pages/Projects.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Cpu, Briefcase, User } from 'lucide-react';
import IaBadge from '../components/IaBadge';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects, loading } = useContent();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'professional', 'personal', 'all'

  // Catégories adaptées pour les projets
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'web', name: 'Web' },
    { id: 'dev', name: 'Développement' },
    { id: 'ai', name: 'IA' },
    { id: 'support', name: 'Support IT' }
  ];

  // Filtrage des projets selon les deux critères
  const filteredProjects = projects.filter(project => {
    const matchesCategory = categoryFilter === 'all' || project.categories.includes(categoryFilter);
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    return matchesCategory && matchesType;
  });

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
        <h1 className="text-3xl font-bold mb-8 text-secondary-800 dark:text-white">Mes Projets</h1>
        
        {/* Filtres de type (Professionnel/Personnel) */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-5 py-3 rounded-lg ${
                typeFilter === 'all' 
                  ? 'bg-secondary-500 text-white' 
                  : 'bg-white text-secondary-700 dark:bg-secondary-800 dark:text-gray-300'
              } shadow-md whitespace-nowrap transition-colors flex items-center gap-2`}
            >
              <span>Tous les projets</span>
            </button>
            <button
              onClick={() => setTypeFilter('professional')}
              className={`px-5 py-3 rounded-lg ${
                typeFilter === 'professional' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-secondary-700 dark:bg-secondary-800 dark:text-gray-300'
              } shadow-md whitespace-nowrap transition-colors flex items-center gap-2`}
            >
              <Briefcase size={18} />
              <span>Projets professionnels</span>
            </button>
            <button
              onClick={() => setTypeFilter('personal')}
              className={`px-5 py-3 rounded-lg ${
                typeFilter === 'personal' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-secondary-700 dark:bg-secondary-800 dark:text-gray-300'
              } shadow-md whitespace-nowrap transition-colors flex items-center gap-2`}
            >
              <User size={18} />
              <span>Projets personnels</span>
            </button>
          </div>
        </div>
        
        {/* Filtres par catégorie */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-full ${
                  categoryFilter === category.id 
                    ? 'bg-primary-500 text-white dark:bg-primary-600' 
                    : 'bg-white text-secondary-700 dark:bg-secondary-800 dark:text-gray-300'
                } shadow-sm whitespace-nowrap transition-colors`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Grille de projets */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8 text-center">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Aucun projet ne correspond à ces filtres pour le moment.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setCategoryFilter('all')}
                className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
              >
                Réinitialiser la catégorie
              </button>
              <button
                onClick={() => setTypeFilter('all')}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Voir tous les types
              </button>
            </div>
          </div>
        )}

        {/* Sections d'information sur les projets professionnels vs personnels */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section professionnelle */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                <Briefcase size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-secondary-800 dark:text-white mb-2">
                  Projets professionnels
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Solutions développées dans le cadre de mon travail avec l'assistance de l'IA, 
                  démontrant comment je peux créer des outils sur mesure pour répondre aux 
                  problématiques spécifiques des clients.
                </p>
              </div>
            </div>
          </div>
          
          {/* Section personnelle */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                <User size={24} className="text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-secondary-800 dark:text-white mb-2">
                  Projets personnels
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Applications et outils créés sur mon temps libre pour répondre à des besoins personnels,
                  également développés avec l'assistance de l'IA pour explorer de nouvelles technologies
                  et solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section sur l'IA */}
        <div className="mt-8 bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full">
              <Cpu size={24} className="text-primary-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-800 dark:text-white mb-2">
                L'IA comme assistant de développement
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tous ces projets, qu'ils soient professionnels ou personnels, démontrent comment l'IA peut aider 
                à créer des solutions techniques sans expertise approfondie en développement. Cette approche permet
                aux techniciens support de valoriser leurs compétences et de créer des solutions adaptées aux besoins
                spécifiques rencontrés.
              </p>
              <Link 
                to="/projets-ia"
                className="inline-flex items-center text-primary-500 hover:text-primary-600"
              >
                En savoir plus sur le développement assisté par IA
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;