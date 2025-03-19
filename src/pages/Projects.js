// src/pages/Projects.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { Cpu } from 'lucide-react';
import IaBadge from '../components/IaBadge';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects, loading } = useContent();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'web', name: 'Web' },
    { id: 'dev', name: 'Développement' },
    { id: 'support', name: 'Support IT' },
    { id: 'admin', name: 'Administration' },
    { id: 'ai', name: 'IA' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

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
        
        {/* Filtres */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full ${
                  filter === category.id 
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-[1.02] transition-all duration-300 border-l-4 border-primary-500"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{project.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {project.technologies && project.technologies.map((tech, index) => (
                        <span key={index} className="text-xs text-gray-500 dark:text-gray-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <span className="text-sm font-medium">
                      {project.id}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">{project.description}</p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Résultats</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{project.metrics}</p>
                  </div>
                  {project.details && project.details.aiAssisted && (
                    <div className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 px-2 py-1 rounded-full flex items-center">
                      <Cpu size={12} className="mr-1" />
                      IA
                    </div>
                  )}
                </div>
              </div>
            </ProjectCard >
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;