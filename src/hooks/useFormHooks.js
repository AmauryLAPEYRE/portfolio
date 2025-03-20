// src/hooks/useFormHooks.js
import { useState } from 'react';
import storageService from '../services/storageService';

/**
 * Hook pour gérer les formulaires
 */
export const useForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  
  // Gestionnaire pour les champs simples
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Gérer les champs imbriqués comme contact.email
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };
  
  // Fonction pour mettre à jour directement un champ
  const updateField = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData(initialData);
  };
  
  return {
    formData,
    setFormData,
    handleInputChange,
    updateField,
    resetForm
  };
};

/**
 * Hook pour gérer les collections CRUD
 */
export const useCollection = (collectionName) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Charger les données
  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await storageService.getCollection(collectionName);
      setItems(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(`Erreur lors du chargement de ${collectionName}:`, err);
    } finally {
      setLoading(false);
    }
  };
  
  // Ajouter un nouvel élément
  const addItem = async (item) => {
    try {
      // Générer un ID si nécessaire
      const newItem = { ...item, id: item.id || Date.now().toString() };
      const newItems = [...items, newItem];
      await storageService.saveCollection(collectionName, newItems);
      setItems(newItems);
      setMessage({ type: 'success', text: 'Élément ajouté avec succès !' });
      return true;
    } catch (err) {
      setError(err.message);
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout de l\'élément' });
      return false;
    }
  };
  
  // Mettre à jour un élément
  const updateItem = async (id, updatedItem) => {
    try {
      const index = items.findIndex(item => item.id.toString() === id.toString());
      if (index !== -1) {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], ...updatedItem };
        await storageService.saveCollection(collectionName, newItems);
        setItems(newItems);
        setMessage({ type: 'success', text: 'Élément mis à jour avec succès !' });
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour de l\'élément' });
      return false;
    }
  };
  
  // Supprimer un élément
  const deleteItem = async (id) => {
    try {
      const newItems = items.filter(item => item.id.toString() !== id.toString());
      await storageService.saveCollection(collectionName, newItems);
      setItems(newItems);
      setMessage({ type: 'success', text: 'Élément supprimé avec succès !' });
      return true;
    } catch (err) {
      setError(err.message);
      setMessage({ type: 'error', text: 'Erreur lors de la suppression de l\'élément' });
      return false;
    }
  };
  
  // Mettre à jour toute la collection
  const updateItems = async (newItems) => {
    try {
      await storageService.saveCollection(collectionName, newItems);
      setItems(newItems);
      setMessage({ type: 'success', text: 'Collection mise à jour avec succès !' });
      return true;
    } catch (err) {
      setError(err.message);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour de la collection' });
      return false;
    }
  };
  
  // Effacer le message après un certain temps
  const clearMessage = () => {
    setMessage({ type: '', text: '' });
  };
  
  return {
    items,
    loading,
    error,
    message,
    loadItems,
    addItem,
    updateItem,
    deleteItem,
    updateItems,
    clearMessage
  };
};