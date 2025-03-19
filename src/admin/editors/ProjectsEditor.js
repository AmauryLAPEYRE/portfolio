// src/admin/editors/ProjectsEditor.js
import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Plus, Edit, Trash, Save, X, Info, Cpu } from 'lucide-react';

const ProjectsEditor = () => {
  const { projects, addProject, updateProject, deleteProject } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    categories: [],
    technologies: [],
    metrics: '',
    link: '',
    github: '',
    color: 'bg-blue-500',
    chartData: [0, 0, 0, 0],
    details: {
      problem: '',
      solution: '',
      aiAssisted: false,
      aiContribution: ''
    }
  });

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

  // Gestionnaires d'événements pour le formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('details.')) {
      const detailField = name.split('.')[1];
      setFormData({
        ...formData,
        details: {
          ...formData.details,
          [detailField]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        categories: [...formData.categories, value]
      });
    } else {
      setFormData({
        ...formData,
        categories: formData.categories.filter(cat => cat !== value)
      });
    }
  };

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData({
      ...formData,
      technologies
    });
  };

  const handleChartDataChange = (index, value) => {
    const newChartData = [...formData.chartData];
    newChartData[index] = parseInt(value) || 0;
    setFormData({
      ...formData,
      chartData: newChartData
    });
  };

  // Gestionnaires pour les opérations CRUD
  const handleAddNew = () => {
    // Réinitialiser le formulaire pour un nouveau projet
    setFormData({
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
    setIsEditing(true);
    setCurrentProjectId(null);
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies || []
    });
    setIsEditing(true);
    setCurrentProjectId(project.id);
  };

  const handleDelete = (projectId) => {
    setCurrentProjectId(projectId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteProject(currentProjectId);
    setShowDeleteConfirm(false);
    setCurrentProjectId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentProjectId) {
        // Mise à jour d'un projet existant
        await updateProject(currentProjectId, formData);
      } else {
        // Ajout d'un nouveau projet
        await addProject(formData);
      }
      setIsEditing(false);
      setCurrentProjectId(null);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du projet:', error);
      // Afficher une notification d'erreur
      alert('Une erreur est survenue lors de l\'enregistrement du projet.');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentProjectId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Projets</h2>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Ajouter un projet</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Métriques / Résultats</label>
              <input
                type="text"
                name="metrics"
                value={formData.metrics}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: +20% productivité"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
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
                      checked={formData.categories.includes(category.id)}
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
                name="technologies"
                value={formData.technologies.join(', ')}
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
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien GitHub</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
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
                    formData.color === color.id ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setFormData({ ...formData, color: color.id })}
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
              {formData.chartData.map((value, index) => (
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
                  name="details.problem"
                  value={formData.details.problem}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
                <textarea
                  name="details.solution"
                  value={formData.details.solution}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <div className="flex items-start">
                <Info size={20} className="text-blue-500 mt-0.5 mr-2" />
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
                  name="details.aiAssisted"
                  checked={formData.details.aiAssisted}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="aiAssisted" className="font-medium">Ce projet a été assisté par l'IA</label>
              </div>

              {formData.details.aiAssisted && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Décrivez la contribution de l'IA
                  </label>
                  <textarea
                    name="details.aiContribution"
                    value={formData.details.aiContribution}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Ex: Génération de code, optimisation, suggestions de design..."
                  ></textarea>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
              <span>Annuler</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Aucun projet n'a encore été ajouté.</p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Ajouter votre premier projet</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
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
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        title="Supprimer"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer ce projet ? Cette action ne peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsEditor;