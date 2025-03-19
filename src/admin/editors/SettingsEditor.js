import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { Save, AlertTriangle, Check, RefreshCw, Key, Edit, Info } from 'lucide-react';

const SettingsEditor = () => {
  const { currentUser, changePassword, isFirebaseAuth } = useAuth();
  const { resetToDefaults } = useContent();
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Gestion du changement de mot de passe
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Vérification des mots de passe
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    
    try {
      setPasswordError('');
      
      if (isFirebaseAuth) {
        // Pour Firebase Auth, la mise à jour du mot de passe nécessite une réauthentification
        // qui n'est pas implémentée ici pour simplifier
        setSuccessMessage('Avec Firebase, veuillez modifier votre mot de passe depuis la console Firebase.');
      } else {
        // Changement de mot de passe local
        const success = await changePassword(newPassword);
        
        if (success) {
          setSuccessMessage('Votre mot de passe a été mis à jour avec succès !');
          setNewPassword('');
          setConfirmPassword('');
          setShowPasswordForm(false);
        } else {
          setPasswordError('Une erreur s\'est produite lors de la mise à jour du mot de passe.');
        }
      }
    } catch (error) {
      setPasswordError('Une erreur s\'est produite : ' + error.message);
    }
  };
  
  // Gestion de la réinitialisation des données
  const handleResetData = async () => {
    try {
      const success = await resetToDefaults();
      
      if (success) {
        setSuccessMessage('Toutes les données ont été réinitialisées avec succès !');
        setShowResetConfirm(false);
      } else {
        setPasswordError('Une erreur s\'est produite lors de la réinitialisation des données.');
      }
    } catch (error) {
      setPasswordError('Une erreur s\'est produite : ' + error.message);
    }
  };
  
  // Effacer le message de succès après quelques secondes
  React.useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Paramètres</h2>
      </div>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex items-center">
            <Check size={18} className="text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {passwordError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-red-500 mr-2" />
            <p className="text-red-700">{passwordError}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Informations du compte */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Informations du compte</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Adresse e-mail</p>
              <p className="font-medium">{currentUser?.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Type d'authentification</p>
              <p className="font-medium">{isFirebaseAuth ? 'Firebase Authentication' : 'Authentification locale'}</p>
            </div>
          </div>
          
          <div className="mt-6">
            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Key size={16} />
                <span>Changer de mot de passe</span>
              </button>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4 bg-gray-50 p-4 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
                  >
                    <Save size={16} />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Réinitialisation des données */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Réinitialisation des données</h3>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <div className="flex items-start">
              <Info size={18} className="text-yellow-500 mt-0.5 mr-2" />
              <div>
                <p className="text-yellow-700 font-medium">Attention</p>
                <p className="text-yellow-700 text-sm">
                  Cette action réinitialisera toutes les données de votre portfolio aux valeurs par défaut.
                  Cette opération ne peut pas être annulée.
                </p>
              </div>
            </div>
          </div>
          
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
            >
              <RefreshCw size={16} />
              <span>Réinitialiser les données</span>
            </button>
          ) : (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-4">
                Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cela remplacera tous vos projets, expériences
                et autres informations par les valeurs par défaut.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleResetData}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                >
                  <RefreshCw size={16} />
                  <span>Confirmer la réinitialisation</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Informations système */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Informations système</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Stockage des données</p>
              <p className="font-medium">{isFirebaseAuth ? 'Firebase Firestore' : 'LocalStorage (navigateur)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Hébergement</p>
              <p className="font-medium">Firebase Hosting</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Version</p>
              <p className="font-medium">1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor;