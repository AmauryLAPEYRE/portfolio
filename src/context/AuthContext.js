// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Connexion
  const signIn = async (email, password) => {
    setError('');
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Changer le mot de passe admin
  const changePassword = async (newPassword) => {
    try {
      const success = await authService.changePassword(newPassword);
      return success;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Vérifier l'état de l'authentification au chargement
  useEffect(() => {
    // Configurer le compte admin par défaut s'il n'existe pas
    authService.setupDefaultAdmin();
    
    // Vérifier si un utilisateur est déjà connecté
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Valeur fournie par le contexte
  const value = {
    currentUser,
    signIn,
    signOut,
    changePassword,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;