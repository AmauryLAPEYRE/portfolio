// src/admin/editors/AiSectionEditor.js
import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, X, Edit, Trash, Check, AlertTriangle } from 'lucide-react';

const AiSectionEditor = () => {
  const { aiSection, updateAiSection, loading, error } = useContent();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingTool, setEditingTool] = useState(null);
  const [editingExample, setEditingExample] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState(null);

  // Icônes disponibles pour les outils
  const availableIcons = [
    { id: 'code', name: 'Code' },
    { id: 'layout', name: 'Interface' },
    { id: 'search', name: 'Recherche' },
    { id: 'repeat', name: 'Automatisation' },
    { id: 'cpu', name: 'IA' }
  ];

  // Initialiser le formulaire lorsque les données sont chargées
  useEffect(() => {
    if (aiSection) {
      setFormData({ ...aiSection });
    }
  }, [aiSection]);

  // Gestionnaires d'événements pour le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Gérer les champs imbriqués
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateAiSection(formData);
      setSuccessMessage('La section IA a été mise à jour avec succès !');
      setIsEditing(false);
      
      // Effacer le message de succès après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la section IA:', err);
    }
  };

  // Gestion des bénéfices
  const addBenefit = () => {
    if (!editingBenefit) return;
    
    const updatedBenefits = [...formData.benefits, editingBenefit];
    setFormData({
      ...formData,
      benefits: updatedBenefits
    });
    
    setEditingBenefit('');
  };

  const removeBenefit = (index) => {
    const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      benefits: updatedBenefits
    });
  };

  // Gestion des outils
  const addTool = () => {
    if (!editingTool || !editingTool.name || !editingTool.description || !editingTool.icon) return;
    
    const updatedTools = [...formData.tools, editingTool];
    setFormData({
      ...formData,
      tools: updatedTools
    });
    
    setEditingTool(null);
  };

  const removeTool = (index) => {
    const updatedTools = formData.tools.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tools: updatedTools
    });
  };

  const startEditingTool = () => {
    setEditingTool({
      name: '',
      description: '',
      icon: 'code'
    });
  };

  const handleToolInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTool({
      ...editingTool,
      [name]: value
    });
  };

  // Gestion des exemples
  const addExample = () => {
    if (!editingExample) return;
    
    const updatedExamples = [...formData.showcase.examples, editingExample];
    setFormData({
      ...formData,
      showcase: {
        ...formData.showcase,
        examples: updatedExamples
      }
    });
    
    setEditingExample('');
  };

  const removeExample = (index) => {
    const updatedExamples = formData.showcase.examples.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      showcase: {
        ...formData.showcase,
        examples: updatedExamples
      }
    });
  };

  if (loading || !formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion de la Section IA</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${
            isEditing 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-orange-600 hover:bg-orange-700'
          } text-white px-4 py-2 rounded-lg transition-colors`}
        >
          {isEditing ? 'Annuler' : 'Modifier la section IA'}
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex items-center">
            <Check size={18} className="text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">Informations générales</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la section</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Bénéfices de l'IA</h3>
            
            <ul className="space-y-2 mb-4">
              {formData.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                  <span>{benefit}</span>
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                type="text"
                value={editingBenefit || ''}
                onChange={(e) => setEditingBenefit(e.target.value)}
                placeholder="Nouveau bénéfice..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addBenefit}
                disabled={!editingBenefit}
                className={`${
                  !editingBenefit
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white px-3 py-2 rounded-md transition-colors`}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Outils IA</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {formData.tools.map((tool, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{tool.name}</h4>
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                  <div className="text-xs text-gray-500">Icône: {tool.icon}</div>
                </div>
              ))}
            </div>

            {editingTool ? (
              <div className="bg-white p-4 rounded-md shadow-sm border border-blue-200 mb-4">
                <h4 className="font-medium mb-3">Ajouter un nouvel outil</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'outil</label>
                    <input
                      type="text"
                      name="name"
                      value={editingTool.name}
                      onChange={handleToolInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="ex: Assistants IA de codage"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editingTool.description}
                      onChange={handleToolInputChange}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="ex: Utilisation d'outils comme GitHub Copilot..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                    <select
                      name="icon"
                      value={editingTool.icon}
                      onChange={handleToolInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon.id} value={icon.id}>{icon.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingTool(null)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={addTool}
                      disabled={!editingTool.name || !editingTool.description}
                      className={`${
                        !editingTool.name || !editingTool.description
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white px-3 py-1 rounded-md transition-colors`}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEditingTool}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Ajouter un outil
              </button>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Showcase</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre du showcase</label>
                <input
                  type="text"
                  name="showcase.title"
                  value={formData.showcase.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description du showcase</label>
                <textarea
                  name="showcase.description"
                  value={formData.showcase.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-700 mb-2">Exemples</h4>
            <ul className="space-y-2 mb-4">
              {formData.showcase.examples.map((example, index) => (
                <li key={index} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                  <span>{example}</span>
                  <button
                    type="button"
                    onClick={() => removeExample(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                type="text"
                value={editingExample || ''}
                onChange={(e) => setEditingExample(e.target.value)}
                placeholder="Nouvel exemple..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addExample}
                disabled={!editingExample}
                className={`${
                  !editingExample
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white px-3 py-2 rounded-md transition-colors`}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Appel à l'action</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  name="callToAction.title"
                  value={formData.callToAction.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="callToAction.description"
                  value={formData.callToAction.description}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton</label>
                  <input
                    type="text"
                    name="callToAction.buttonText"
                    value={formData.callToAction.buttonText}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lien du bouton</label>
                  <input
                    type="text"
                    name="callToAction.buttonLink"
                    value={formData.callToAction.buttonLink}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="ex: #contact"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{formData.title}</h3>
            <p className="text-gray-600 mb-6">{formData.description}</p>
            
            <h4 className="font-medium text-gray-700 mb-3">Bénéfices de l'IA</h4>
            <ul className="space-y-2 mb-6">
              {formData.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="bg-orange-100 text-orange-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-medium">
                    {index + 1}
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium text-gray-700 mb-3">Outils IA</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {formData.tools.map((tool, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h5 className="font-medium mb-1">{tool.name}</h5>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium text-gray-700 mb-3">Showcase: {formData.showcase.title}</h4>
            <p className="text-gray-600 mb-3">{formData.showcase.description}</p>
            <ul className="space-y-1 mb-6">
              {formData.showcase.examples.map((example, index) => (
                <li key={index} className="text-gray-600 pl-4 border-l-2 border-orange-300">{example}</li>
              ))}
            </ul>
            
            <h4 className="font-medium text-gray-700 mb-2">Appel à l'action</h4>
            <div className="bg-orange-50 p-4 rounded-md">
              <h5 className="font-medium text-orange-800 mb-1">{formData.callToAction.title}</h5>
              <p className="text-sm text-orange-700 mb-2">{formData.callToAction.description}</p>
              <div className="text-sm font-medium">
                Bouton: {formData.callToAction.buttonText} → {formData.callToAction.buttonLink}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiSectionEditor;