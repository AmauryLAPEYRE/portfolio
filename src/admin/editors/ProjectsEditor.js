// src/admin/editors/ProjectsEditor.js
import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Cpu } from 'lucide-react';
import GenericEditor from '../../components/admin/GenericEditor';
import { ItemCard } from '../../components/common/UIComponents';

// Liste des catégories disponibles
const availableCategories = [
  { id: 'web', label: 'Web' },
  { id: 'dev', label: 'Développement' },
  { id: 'support', label: 'Support IT' },
  { id: 'admin', label: 'Administration' },
  { id: 'ai', label: 'IA' }
];

// Liste des couleurs disponibles
const availableColors = [
  { id: 'bg-blue-500', label: 'Bleu', value: '#3b82f6' },
  { id: 'bg-green-500', label: 'Vert', value: '#10b981' },
  { id: 'bg-purple-500', label: 'Violet', value: '#8b5cf6' },
  { id: 'bg-yellow-500', label: 'Jaune', value: '#f59e0b' },
  { id: 'bg-red-500', label: 'Rouge', value: '#ef4444' },
  { id: 'bg-pink-500', label: 'Rose', value: '#ec4899' },
  { id: 'bg-indigo-500', label: 'Indigo', value: '#6366f1' },
  { id: 'bg-orange-500', label: 'Orange', value: '#f97316' }
];

const ProjectsEditor = () => {
  const { projects, addProject, updateProject, deleteProject } = useContent();

  // Créer un nouvel objet projet vide
  const createNewProject = () => ({
    id: Date.now().toString(),
    title: '',
    description: '',
    categories: [],
    technologies: [],
    metrics: '',
    link: '',
    github: '',
    color: 'bg-blue-500',
    chartData: [50, 50, 50, 50],
    details: {
      problem: '',
      solution: '',
      aiAssisted: false,
      aiContribution: ''
    }
  });

  // Rendu du formulaire d'édition de projet
  const renderProjectForm = (project, setProject) => {
    // Fonction pour mettre à jour un champ spécifique
    const updateField = (name, value) => {
      if (name.startsWith('details.')) {
        const detailField = name.split('.')[1];
        setProject({
          ...project,
          details: {
            ...project.details,
            [detailField]: value
          }
        });
      } else {
        setProject({
          ...project,
          [name]: value
        });
      }
    };

    // Gestion des catégories
    const handleCategoryChange = (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setProject({
          ...project,
          categories: [...project.categories, value]
        });
      } else {
        setProject({
          ...project,
          categories: project.categories.filter(cat => cat !== value)
        });
      }
    };

    // Gestion des technologies
    const handleTechnologiesChange = (e) => {
      const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
      setProject({
        ...project,
        technologies
      });
    };

    // Gestion des données du graphique
    const handleChartDataChange = (index, value) => {
      const newChartData = [...project.chartData];
      newChartData[index] = parseInt(value) || 0;
      setProject({
        ...project,
        chartData: newChartData
      });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Métriques / Résultats</label>
            <input
              type="text"
              value={project.metrics}
              onChange={(e) => updateField('metrics', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="ex: +20% productivité"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={project.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
            <div className="space-y-2">
              {availableCategories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={project.categories.includes(category.id)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category.id}`}>{category.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
            <input
              type="text"
              value={project.technologies.join(', ')}
              onChange={handleTechnologiesChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="HTML, CSS, JavaScript, etc. (séparés par des virgules)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien du projet</label>
            <input
              type="url"
              value={project.link}
              onChange={(e) => updateField('link', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien GitHub</label>
            <input
              type="url"
              value={project.github}
              onChange={(e) => updateField('github', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du projet</label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map(color => (
              <div 
                key={color.id} 
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  project.color === color.id ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => updateField('color', color.id)}
                title={color.label}
              ></div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Données du graphique (valeurs entre 0 et 100)
          </label>
          <div className="grid grid-cols-4 gap-4">
            {project.chartData.map((value, index) => (
              <div key={index}>
                <label className="block text-xs text-gray-500 mb-1">Valeur {index + 1}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleChartDataChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Détails supplémentaires</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Problématique</label>
              <textarea
                value={project.details.problem}
                onChange={(e) => updateField('details.problem', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
              <textarea
                value={project.details.solution}
                onChange={(e) => updateField('details.solution', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
            <div className="flex items-start">
              <Cpu size={20} className="text-blue-500 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-blue-800">Contribution de l'IA</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Indiquez si ce projet a été assisté par l'IA et comment elle a contribué à sa réalisation.
                </p>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="aiAssisted"
                checked={project.details.aiAssisted}
                onChange={(e) => updateField('details.aiAssisted', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="aiAssisted" className="font-medium">Ce projet a été assisté par l'IA</label>
            </div>

            {project.details.aiAssisted && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Décrivez la contribution de l'IA
                </label>
                <textarea
                  value={project.details.aiContribution}
                  onChange={(e) => updateField('details.aiContribution', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="Ex: Génération de code, optimisation, suggestions de design..."
                ></textarea>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Rendu d'un élément projet dans la liste
  const renderProjectItem = (project) => (
    <ItemCard color={project.color.replace('bg-', '')}>
      <div className={`h-2 ${project.color}`}></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
          <div className={`${project.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm`}>
            {project.id}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.map((tech, index) => (
              <span key={index} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600">
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {project.details && project.details.aiAssisted && (
          <div className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-full inline-flex items-center mb-3">
            <Cpu size={12} className="mr-1" />
            Assisté par IA
          </div>
        )}
      </div>
    </ItemCard>
  );

  return (
    <GenericEditor
      title="Projets"
      items={projects}
      onAdd={addProject}
      onUpdate={updateProject}
      onDelete={deleteProject}
      renderForm={renderProjectForm}
      renderItem={renderProjectItem}
      createNewItem={createNewProject}
    />
  );
};

export default ProjectsEditor;