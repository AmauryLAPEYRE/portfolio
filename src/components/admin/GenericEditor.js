// src/components/admin/GenericEditor.js
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import { AlertMessage, ConfirmDialog, EditorSection, FormButtons } from '../common/UIComponents';

/**
 * Éditeur générique pour les différentes collections
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre de la section
 * @param {Array} props.items - Liste des éléments
 * @param {Function} props.onAdd - Fonction appelée pour ajouter un élément
 * @param {Function} props.onUpdate - Fonction appelée pour mettre à jour un élément
 * @param {Function} props.onDelete - Fonction appelée pour supprimer un élément
 * @param {Function} props.renderForm - Fonction pour rendre le formulaire d'édition
 * @param {Function} props.renderItem - Fonction pour rendre un élément dans la liste
 * @param {Function} props.createNewItem - Fonction pour créer un nouvel élément vide
 */
const GenericEditor = ({
  title,
  items,
  onAdd,
  onUpdate,
  onDelete,
  renderForm,
  renderItem,
  createNewItem
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Ajouter un nouvel élément
  const handleAddNew = () => {
    const newItem = createNewItem();
    setCurrentItem(newItem);
    setEditIndex(-1);
    setIsEditing(true);
  };

  // Modifier un élément existant
  const handleEdit = (item, index) => {
    setCurrentItem({ ...item });
    setEditIndex(index);
    setIsEditing(true);
  };

  // Préparer la suppression d'un élément
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    try {
      await onDelete(items[deleteIndex].id);
      setMessage({ type: 'success', text: 'Élément supprimé avec succès !' });
      setShowDeleteConfirm(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression de l\'élément.' });
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e && e.preventDefault();
    
    try {
      if (editIndex === -1) {
        // Ajouter un nouvel élément
        await onAdd(currentItem);
      } else {
        // Mettre à jour un élément existant
        await onUpdate(items[editIndex].id, currentItem);
      }
      
      setMessage({ type: 'success', text: 'Données enregistrées avec succès !' });
      setIsEditing(false);
      setCurrentItem(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement des données.' });
    }
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setEditIndex(-1);
  };

  // Effacer le message après un certain temps
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      <EditorSection 
        title={title} 
        onAdd={handleAddNew} 
        isEditing={isEditing}
      >
        {message.text && (
          <AlertMessage type={message.type} message={message.text} />
        )}
        
        {isEditing ? (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800">
              {editIndex === -1 ? `Ajouter un ${title.toLowerCase()}` : `Modifier le ${title.toLowerCase()}`}
            </h3>
            
            <form onSubmit={handleSubmit}>
              {renderForm(currentItem, setCurrentItem)}
              
              <FormButtons onCancel={cancelEdit} onSubmit={handleSubmit} />
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">Aucun élément n'a encore été ajouté.</p>
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  <span>Ajouter votre premier élément</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item, index) => (
                  <div key={item.id || index} className="relative">
                    {renderItem(item)}
                    
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(item, index)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors bg-white rounded-full shadow-sm"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors bg-white rounded-full shadow-sm"
                        title="Supprimer"
                      >
                        <Trash size={18} />
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
          <ConfirmDialog
            title="Confirmer la suppression"
            message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action ne peut pas être annulée."
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </EditorSection>
    </div>
  );
};

export default GenericEditor;