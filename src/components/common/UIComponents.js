// src/components/common/UIComponents.js
import React from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';

/**
 * Composant de chargement réutilisable
 */
export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );
};

/**
 * Composant pour les messages d'alerte (succès/erreur)
 */
export const AlertMessage = ({ type, message }) => {
  const isSuccess = type === 'success';
  
  return (
    <div className={`bg-${isSuccess ? 'green' : 'red'}-50 border-l-4 border-${isSuccess ? 'green' : 'red'}-500 p-4 mb-6`}>
      <div className="flex items-center">
        {isSuccess ? (
          <Check size={18} className="text-green-500 mr-2" />
        ) : (
          <AlertTriangle size={18} className="text-red-500 mr-2" />
        )}
        <p className={`text-${isSuccess ? 'green' : 'red'}-700`}>{message}</p>
      </div>
    </div>
  );
};

/**
 * Composant pour les modales de confirmation
 */
export const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Conteneur de section pour les éditeurs
 */
export const EditorSection = ({ title, children, onAdd, isEditing }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {!isEditing && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>+ Ajouter</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

/**
 * Boutons d'action pour les formulaires
 */
export const FormButtons = ({ onCancel, onSubmit }) => {
  return (
    <div className="flex justify-end space-x-3 pt-6">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <X size={18} />
        <span>Annuler</span>
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <span>Enregistrer</span>
      </button>
    </div>
  );
};

/**
 * Carte pour afficher un élément dans une liste (projet, expérience, etc.)
 */
export const ItemCard = ({ children, color = "primary" }) => {
  const colorClasses = {
    primary: "border-primary-500",
    secondary: "border-secondary-500",
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
  };
  
  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-lg shadow-sm overflow-hidden 
                    hover:shadow-md transition-shadow border-l-4 ${colorClasses[color]}`}>
      {children}
    </div>
  );
};