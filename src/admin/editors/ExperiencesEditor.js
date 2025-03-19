// src/admin/editors/ExperiencesEditor.js
import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, X, Edit, Trash, Check, AlertTriangle, Cpu } from 'lucide-react';

const ExperiencesEditor = () => {
  const { experiences, updateExperiences, loading, error } = useContent();
  const [formData, setFormData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [currentDetails, setCurrentDetails] = useState([]);
  const [newDetail, setNewDetail] = useState('');

  // Liste des couleurs disponibles
  const availableColors = [
    { id: 'bg-orange-400', label: 'Orange', value: '#fb923c' },
    { id: 'bg-blue-400', label: 'Bleu', value: '#60a5fa' },
    { id: 'bg-green-400', label: 'Vert', value: '#4ade80' },
    { id: 'bg-purple-400', label: 'Violet', value: '#a78bfa' },
    { id: 'bg-yellow-400', label: 'Jaune', value: '#facc15' },
    { id: 'bg-red-400', label: 'Rouge', value: '#f87171' },
    { id: 'bg-indigo-400', label: 'Indigo', value: '#818cf8' },
    { id: 'bg-teal-400', label: 'Teal', value: '#2dd4bf' }
  ];

  // Initialisation des données
  React.useEffect(() => {
    if (experiences) {
      setFormData([...experiences]);
    }
  }, [experiences]);

  // Démarrer la modification d'un élément
  const startEditing = (index) => {
    setEditIndex(index);
    setCurrentDetails(formData[index].details || []);
    setIsEditing(true);
  };

  // Ajouter un nouvel élément
  const addNewItem = () => {
    const newExperience = {
      id: Date.now().toString(),
      period: '',
      company: '',
      location: '',
      title: '',
      details: [],
      color: 'bg-blue-400',
      aiAssisted: false,
      aiDetails: ''
    };
    
    setFormData([...formData, newExperience]);
    setEditIndex(formData.length);
    setCurrentDetails([]);
    setIsEditing(true);
  };

  // Gestionnaire de changement pour les champs principaux
  const handleFieldChange = (name, value) => {
    const updatedData = [...formData];
    
    if (name === 'aiAssisted') {
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        aiAssisted: !updatedData[editIndex].aiAssisted
      };
    } else {
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        [name]: value
      };
    }
    
    setFormData(updatedData);
  };

  // Gérer les détails
  const addDetail = () => {
    if (newDetail.trim() === '') return;
    
    setCurrentDetails([...currentDetails, newDetail.trim()]);
    
    // Mise à jour des données du formulaire
    const updatedData = [...formData];
    updatedData[editIndex] = {
      ...updatedData[editIndex],
      details: [...currentDetails, newDetail.trim()]
    };
    setFormData(updatedData);
    
    setNewDetail('');
  };

  const removeDetail = (detailIndex) => {
    const updatedDetails = currentDetails.filter((_, index) => index !== detailIndex);
    setCurrentDetails(updatedDetails);
    
    // Mise à jour des données du formulaire
    const updatedData = [...formData];
    updatedData[editIndex] = {
      ...updatedData[editIndex],
      details: updatedDetails
    };
    setFormData(updatedData);
  };

  // Confirmation de suppression
  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  // Suppression d'un élément
  const deleteItem = () => {
    if (deleteIndex >= 0) {
      const updatedData = formData.filter((_, index) => index !== deleteIndex);
      setFormData(updatedData);
      setShowDeleteConfirm(false);
      setDeleteIndex(-1);
      
      // Enregistrement immédiat après suppression
      saveData(updatedData);
    }
  };

  // Enregistrement des données
  const saveData = async (dataToSave = formData) => {
    try {
      await updateExperiences(dataToSave);
      setSuccessMessage('Expériences mises à jour avec succès !');
      setIsEditing(false);
      setEditIndex(-1);
      
      // Effacer le message après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour des expériences:', err);
    }
  };

  // Annuler les modifications
  const cancelEdit = () => {
    setIsEditing(false);
    setEditIndex(-1);
    setCurrentDetails([]);
    // Réinitialiser les données
    setFormData([...experiences]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Expériences</h2>
        {!isEditing && (
          <button
            onClick={addNewItem}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Ajouter une expérience</span>
          </button>
        )}
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
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            {editIndex === formData.length - 1 && formData[editIndex].period === '' 
              ? 'Ajouter une expérience' 
              : 'Modifier l\'expérience'
            }
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
              <input
                type="text"
                value={formData[editIndex]?.period || ''}
                onChange={(e) => handleFieldChange('period', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: 2022 - 2024"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input
                type="text"
                value={formData[editIndex]?.location || ''}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: Lyon"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input
                type="text"
                value={formData[editIndex]?.company || ''}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: DCS EASYWARE"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input
                type="text"
                value={formData[editIndex]?.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: Technicien support informatique"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Détails et responsabilités</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Ajouter un détail..."
                />
                <button
                  type="button"
                  onClick={addDetail}
                  disabled={!newDetail.trim()}
                  className={`${
                    !newDetail.trim()
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white px-3 py-2 rounded-md transition-colors`}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                {currentDetails.length === 0 ? (
                  <p className="text-gray-500 text-center italic">Aucun détail ajouté</p>
                ) : (
                  <ul className="space-y-2">
                    {currentDetails.map((detail, index) => (
                      <li key={index} className="flex items-start justify-between group">
                        <div className="flex items-start flex-1">
                          <div className="min-w-4 mt-1.5 mr-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDetail(index)}
                          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
            <div className="flex flex-wrap gap-3">
              {availableColors.map(color => (
                <div 
                  key={color.id} 
                  className={`w-8 h-8 rounded-full cursor-pointer ${
                    formData[editIndex]?.color === color.id ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleFieldChange('color', color.id)}
                  title={color.label}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="aiAssisted"
                checked={formData[editIndex]?.aiAssisted || false}
                onChange={() => handleFieldChange('aiAssisted')}
                className="mr-2"
              />
              <label htmlFor="aiAssisted" className="font-medium flex items-center">
                <Cpu size={16} className="mr-1 text-blue-600" />
                Cette expérience a été assistée par l'IA
              </label>
            </div>

            {formData[editIndex]?.aiAssisted && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Décrivez la contribution de l'IA
                </label>
                <textarea
                  value={formData[editIndex]?.aiDetails || ''}
                  onChange={(e) => handleFieldChange('aiDetails', e.target.value)}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Assistance pour l'optimisation du code et génération de contenus"
                ></textarea>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
              <span>Annuler</span>
            </button>
            <button
              type="button"
              onClick={() => saveData()}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Aucune expérience n'a encore été ajoutée.</p>
              <button
                onClick={addNewItem}
                className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Ajouter votre première expérience</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 ${item.color}`}></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold">{item.company}</h3>
                          {item.aiAssisted && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-flex items-center">
                              <Cpu size={12} className="mr-1" />
                              IA
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{item.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>{item.period}</span>
                          {item.location && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{item.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(index)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => confirmDelete(index)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          title="Supprimer"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {item.details && item.details.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Détails</h4>
                        <ul className="space-y-1">
                          {item.details.map((detail, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <div className="min-w-4 mt-1.5 mr-3">
                                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                              </div>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.aiAssisted && item.aiDetails && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-blue-600">
                          <span className="font-medium">IA utilisée :</span> {item.aiDetails}
                        </p>
                      </div>
                    )}
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
              Êtes-vous sûr de vouloir supprimer cette expérience ? Cette action ne peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={deleteItem}
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

export default ExperiencesEditor;