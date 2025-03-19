// src/admin/editors/EducationEditor.js
import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, X, Edit, Trash, Check, AlertTriangle } from 'lucide-react';

const EducationEditor = () => {
  const { education, updateEducation, loading, error } = useContent();
  const [formData, setFormData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  // Liste des couleurs disponibles
  const availableColors = [
    { id: 'bg-purple-400', label: 'Violet', value: '#a78bfa' },
    { id: 'bg-indigo-400', label: 'Indigo', value: '#818cf8' },
    { id: 'bg-teal-400', label: 'Teal', value: '#2dd4bf' },
    { id: 'bg-blue-400', label: 'Bleu', value: '#60a5fa' },
    { id: 'bg-green-400', label: 'Vert', value: '#4ade80' },
    { id: 'bg-yellow-400', label: 'Jaune', value: '#facc15' },
    { id: 'bg-red-400', label: 'Rouge', value: '#f87171' },
    { id: 'bg-orange-400', label: 'Orange', value: '#fb923c' }
  ];

  // Initialisation des données
  React.useEffect(() => {
    if (education) {
      setFormData([...education]);
    }
  }, [education]);

  // Gestionnaire de changement de champ
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    
    if (editIndex >= 0) {
      // Modification d'un élément existant
      const updatedData = [...formData];
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        [name]: value
      };
      setFormData(updatedData);
    } else {
      // Nouvel élément
      setFormData([
        ...formData, 
        { 
          id: Date.now().toString(), 
          [name]: value,
          year: '',
          school: '',
          title: '',
          details: '',
          color: 'bg-indigo-400'
        }
      ]);
      setEditIndex(formData.length);
    }
  };

  // Démarrer la modification d'un élément
  const startEditing = (index) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  // Ajouter un nouvel élément
  const addNewItem = () => {
    const newEducation = {
      id: Date.now().toString(),
      year: '',
      school: '',
      title: '',
      details: '',
      color: 'bg-indigo-400'
    };
    
    setFormData([...formData, newEducation]);
    setEditIndex(formData.length);
    setIsEditing(true);
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
      await updateEducation(dataToSave);
      setSuccessMessage('Formation mise à jour avec succès !');
      setIsEditing(false);
      setEditIndex(-1);
      
      // Effacer le message après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la formation:', err);
    }
  };

  // Annuler les modifications
  const cancelEdit = () => {
    setIsEditing(false);
    setEditIndex(-1);
    // Réinitialiser les données
    setFormData([...education]);
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
        <h2 className="text-2xl font-bold text-gray-800">Gestion de la Formation</h2>
        {!isEditing && (
          <button
            onClick={addNewItem}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Ajouter une formation</span>
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
            {editIndex === formData.length - 1 && formData[editIndex].year === '' 
              ? 'Ajouter une formation' 
              : 'Modifier la formation'
            }
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
              <input
                type="text"
                name="year"
                value={formData[editIndex]?.year || ''}
                onChange={(e) => {
                  const updatedData = [...formData];
                  updatedData[editIndex].year = e.target.value;
                  setFormData(updatedData);
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: 2021"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">École / Institution</label>
              <input
                type="text"
                name="school"
                value={formData[editIndex]?.school || ''}
                onChange={(e) => {
                  const updatedData = [...formData];
                  updatedData[editIndex].school = e.target.value;
                  setFormData(updatedData);
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: IT Akademy"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre / Diplôme</label>
            <input
              type="text"
              name="title"
              value={formData[editIndex]?.title || ''}
              onChange={(e) => {
                const updatedData = [...formData];
                updatedData[editIndex].title = e.target.value;
                setFormData(updatedData);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="ex: Licence - développeur full stack"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
            <textarea
              name="details"
              value={formData[editIndex]?.details || ''}
              onChange={(e) => {
                const updatedData = [...formData];
                updatedData[editIndex].details = e.target.value;
                setFormData(updatedData);
              }}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Détails de la formation..."
            ></textarea>
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
                  onClick={() => {
                    const updatedData = [...formData];
                    updatedData[editIndex].color = color.id;
                    setFormData(updatedData);
                  }}
                  title={color.label}
                ></div>
              ))}
            </div>
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
              <p className="text-gray-500 mb-4">Aucune formation n'a encore été ajoutée.</p>
              <button
                onClick={addNewItem}
                className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Ajouter votre première formation</span>
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
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-500">{item.year}</span>
                          <h3 className="text-lg font-bold">{item.school}</h3>
                        </div>
                        <p className="text-gray-600">{item.title}</p>
                        {item.details && (
                          <p className="mt-2 text-sm text-gray-500">{item.details}</p>
                        )}
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
              Êtes-vous sûr de vouloir supprimer cette formation ? Cette action ne peut pas être annulée.
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

export default EducationEditor;