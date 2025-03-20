// src/components/admin/GenericExperiencesEditor.js
import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Briefcase, Cpu } from 'lucide-react';
import { ItemCard, AlertMessage } from '../common/UIComponents';

const GenericExperiencesEditor = () => {
  const { experiences, updateExperiences } = useContent();
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  // Charger les données
  useEffect(() => {
    setItems(experiences);
  }, [experiences]);

  // Créer une nouvelle expérience
  const handleAddNew = () => {
    const newItem = {
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
    
    setCurrentItem(newItem);
    setEditIndex(-1);
    setIsEditing(true);
  };

  // Éditer une expérience existante
  const handleEdit = (index) => {
    setCurrentItem({ ...items[index] });
    setEditIndex(index);
    setIsEditing(true);
  };

  // Confirmer la suppression
  const confirmDelete = () => {
    if (deleteIndex >= 0) {
      const newItems = [...items];
      newItems.splice(deleteIndex, 1);
      
      updateExperiences(newItems)
        .then(() => {
          setMessage({ type: 'success', text: 'Expérience supprimée avec succès!' });
          setItems(newItems);
        })
        .catch(() => {
          setMessage({ type: 'error', text: 'Erreur lors de la suppression' });
        });

      setShowDeleteConfirm(false);
      setDeleteIndex(-1);
    }
  };

  // Préparer la suppression
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  // Sauvegarder le formulaire
  const handleSave = () => {
    const newItems = [...items];
    
    if (editIndex === -1) {
      // Ajout d'un nouvel élément
      newItems.push(currentItem);
    } else {
      // Mise à jour d'un élément existant
      newItems[editIndex] = currentItem;
    }
    
    updateExperiences(newItems)
      .then(() => {
        setMessage({ type: 'success', text: 'Données enregistrées avec succès!' });
        setItems(newItems);
        setIsEditing(false);
        setCurrentItem(null);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement' });
      });
  };

  // Mettre à jour les champs du formulaire
  const handleInputChange = (field, value) => {
    setCurrentItem({
      ...currentItem,
      [field]: value
    });
  };

  // Ajouter un détail
  const [newDetail, setNewDetail] = useState('');
  
  const addDetail = () => {
    if (!newDetail.trim()) return;
    
    setCurrentItem({
      ...currentItem,
      details: [...(currentItem.details || []), newDetail.trim()]
    });
    
    setNewDetail('');
  };

  // Supprimer un détail
  const removeDetail = (index) => {
    const newDetails = [...currentItem.details];
    newDetails.splice(index, 1);
    
    setCurrentItem({
      ...currentItem,
      details: newDetails
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Expériences</h2>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>+ Ajouter une expérience</span>
          </button>
        )}
      </div>

      {message.text && (
        <AlertMessage type={message.type} message={message.text} />
      )}

      {isEditing ? (
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            {editIndex === -1 ? 'Ajouter une expérience' : 'Modifier l\'expérience'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
              <input
                type="text"
                value={currentItem?.period || ''}
                onChange={(e) => handleInputChange('period', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: 2022 - 2024"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input
                type="text"
                value={currentItem?.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
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
                value={currentItem?.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: DCS EASYWARE"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input
                type="text"
                value={currentItem?.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
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
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors"
                >
                  +
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                {!currentItem?.details?.length ? (
                  <p className="text-gray-500 text-center italic">Aucun détail ajouté</p>
                ) : (
                  <ul className="space-y-2">
                    {currentItem.details.map((detail, index) => (
                      <li key={index} className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                          <div className="min-w-4 mt-1.5 mr-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDetail(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="aiAssisted"
                checked={currentItem?.aiAssisted || false}
                onChange={(e) => handleInputChange('aiAssisted', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="aiAssisted" className="font-medium flex items-center">
                <Cpu size={16} className="mr-1 text-blue-600" />
                Cette expérience a été assistée par l'IA
              </label>
            </div>

            {currentItem?.aiAssisted && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Décrivez la contribution de l'IA
                </label>
                <textarea
                  value={currentItem?.aiDetails || ''}
                  onChange={(e) => handleInputChange('aiDetails', e.target.value)}
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
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Aucune expérience n'a encore été ajoutée.</p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Ajouter votre première expérience
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div key={item.id || index} className="relative">
                  <ItemCard>
                    <div className={`h-2 ${item.color || 'bg-blue-400'}`}></div>
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
                      </div>
                      
                      {item.details && item.details.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Détails</h4>
                          <ul className="space-y-1">
                            {item.details.map((detail, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <div className="min-w-4 mt-1.5 mr-3">
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                </div>
                                <span className="text-gray-700">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </ItemCard>
                  
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors bg-white rounded-full shadow-sm"
                      title="Modifier"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors bg-white rounded-full shadow-sm"
                      title="Supprimer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
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

export default GenericExperiencesEditor;