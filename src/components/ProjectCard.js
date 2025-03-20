// src/components/ProjectCard.js - Mise à jour pour afficher le badge Professionnel/Personnel
import React from 'react';
import { Link } from 'react-router-dom';
import IaBadge from '../components/IaBadge';
import { Briefcase, User } from 'lucide-react';

/**
 * Carte de projet harmonisée avec distinction Professionnel/Personnel
 */
const ProjectCard = ({ project }) => {
  // Déterminer le style en fonction du type de projet
  const getProjectTypeBadge = () => {
    if (project.type === 'professional') {
      return (
        <div className="text-xs bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full flex items-center">
          <Briefcase size={12} className="mr-1" />
          DCS EASYWARE
        </div>
      );
    } else if (project.type === 'personal') {
      return (
        <div className="text-xs bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-200 px-2 py-1 rounded-full flex items-center">
          <User size={12} className="mr-1" />
          Personnel
        </div>
      );
    }
    return null;
  };

  return (
    <Link
      to={`/projets/${project.id}`}
      className={`block bg-white dark:bg-secondary-800 rounded-xl shadow-md hover:shadow-lg 
                transition-all duration-300 overflow-hidden border-l-4 
                ${project.type === 'professional' ? 'border-blue-500' : 'border-green-500'}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{project.title}</h3>
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex gap-2 mt-1 flex-wrap">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="text-xs text-neutral-600 dark:text-neutral-400">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className={`${project.type === 'professional' ? 'bg-blue-500' : 'bg-green-500'} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm`}>
            <span className="text-sm font-medium">{project.id}</span>
          </div>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Résultats</p>
            <p className="text-lg font-bold text-secondary-800 dark:text-neutral-200">
              {project.metrics}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {getProjectTypeBadge()}
            
            {project.details && project.details.aiAssisted && (
              <IaBadge size="sm" pulse={true} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;