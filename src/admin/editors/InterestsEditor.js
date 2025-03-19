// src/admin/editors/InterestsEditor.js
import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, X, Edit, Trash, Check, AlertTriangle, Music, Dumbbell, Code, Cpu } from 'lucide-react';

const InterestsEditor = () => {
  const { interests, updateInterests, loading, error } = useContent();
  const [formData, setFormData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  // Liste des couleurs disponibles
  const availableColors = [
    { id: 'bg-purple-500', label: 'Violet', value: '#8b5cf6' },
    { id: 'bg-green-500', label: 'Vert', value: '#10b981' },
    { id: 'bg-blue-500', label: 'Bleu', value: '#3b82f6' },
    { id: 'bg-yellow-500', label: 'Jaune', value: '#f59e0b' },
    { id: 'bg-red-500', label: 'Rouge', value: '#ef4444' },
    { id: 'bg-pink-500', label: 'Rose', value: '#ec4899' },
    { id: 'bg-indigo-500', label: 'Indigo', value: '#6366f1' },
    { id: 'bg-orange-500', label: 'Orange', value: '#f97316' }
  ];

  // Liste des icônes disponibles
  const availableIcons = [
    { id: 'music', label: 'Musique', component: <Music size={20} /> },
    { id: 'dumbbell', label: 'Sport', component: <Dumbbell size={20} /> },
    { id: 'code', label: 'Développement', component: <Code size={20} /> },
    { id: 'cpu', label: 'Technologie', component: <Cpu size={20} /> }
  ];

  // Initialisation des données
  React.useEffect(() => {
    if (interests) {
      setFormData([...interests]);
    }
  }, [interests]);

  // Démarrer la modification d'un élément
  const startEditing = (index) => {
    setEditIndex(index);
    setIsEditing(true);
  };

  // Ajouter un nouvel élément
  const addNewItem = () => {
    const newInterest = {
      id: Date.now().toString(),
      name: '',
      icon: 'music',
      details: '',
      color: 'bg-purple-500'
    };
    
    setFormData([...formData, newInterest]);
    setEditIndex(formData.length);
    setIsEditing(true);
  };

  // Gestionnaire de changement pour les champs
  const handleFieldChange = (name, value) => {
    const updatedData = [...formData];
    updatedData[editIndex] = {
      ...updatedData[editIndex],
      [name]: value
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
      await updateInterests(dataToSave);
      setSuccessMessage('Centres d\'intérêt mis à jour avec succès !');
      setIsEditing(false);
      setEditIndex(-1);
      
      // Effacer le message après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour des centres d\'intérêt:', err);
    }
  };

  // Annuler les modifications
  const cancelEdit = () => {
    setIsEditing(false);
    setEditIndex(-1);
    // Réinitialiser les données
    setFormData([...interests]);
  };

  // Obtenir l'icône correspondante
  const getIconComponent = (iconName) => {
    const icon = availableIcons.find(icon => icon.id === iconName);
    return icon ? icon.component : <Music size={20} />;
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
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Centres d'Intérêt</h2>
        {!isEditing && (
          <button
            onClick={addNewItem}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Ajouter un centre d'intérêt</span>
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
            {editIndex === formData.length - 1 && formData[editIndex].name === '' 
              ? 'Ajouter un centre d\'intérêt' 
              : 'Modifier le centre d\'intérêt'
            }
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={formData[editIndex]?.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="ex: Musique"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData[editIndex]?.details || ''}
              onChange={(e) => handleFieldChange('details', e.target.value)}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Décrivez ce centre d'intérêt..."
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icône</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableIcons.map(icon => (
                <div 
                  key={icon.id} 
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                    formData[editIndex]?.icon === icon.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleFieldChange('icon', icon.id)}
                >
                  <div className="flex items-center">
                    <div className="mr-2">
                      {icon.component}
                    </div>
                    <span>{icon.label}</span>
                  </div>
                  {formData[editIndex]?.icon === icon.id && (
                    <Check size={16} className="text-blue-500" />
                  )}
                </div>
              ))}
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
              <p className="text-gray-500 mb-4">Aucun centre d'intérêt n'a encore été ajouté.</p>
              <button
                onClick={addNewItem}
                className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Ajouter votre premier centre d'intérêt</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 ${item.color}`}></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white`}>
                          {getIconComponent(item.icon)}
                        </div>
                        <h3 className="text-lg font-bold">{item.name}</h3>
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
                    <p className="mt-3 text-gray-600">{item.details}</p>
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
              Êtes-vous sûr de vouloir supprimer ce centre d'intérêt ? Cette action ne peut pas être annulée.
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

export default InterestsEditor;