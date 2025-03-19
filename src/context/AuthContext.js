// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { isFirebaseAvailable, auth } from '../services/firebase';
import storageService from '../services/storageService';

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

  // Configuration pour l'authentification locale (sans Firebase)
  const LOCAL_AUTH_KEY = 'portfolio_auth_user';
  const LOCAL_ADMIN_CONFIG = 'portfolio_admin_config';

  // Système de secours pour l'authentification si Firebase n'est pas disponible
  const setupLocalAuth = async () => {
    // Vérifier si un compte admin existe déjà
    const adminConfig = await storageService.getConfig('adminUser');
    if (!adminConfig) {
      // Créer un compte admin par défaut (à modifier après la première connexion)
      await storageService.saveConfig('adminUser', {
        email: 'admin@example.com',
        // Le mot de passe est hashé de manière simple pour une sécurité minimale
        passwordHash: hashPassword('admin123')
      });
      console.info('Compte admin par défaut créé: admin@example.com / admin123');
    }
  };

  // Fonction simple de hachage (à titre d'exemple uniquement - non sécurisée pour un usage réel)
  const hashPassword = (password) => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Conversion en 32bit integer
    }
    return hash.toString();
  };

  // Connexion
  const signIn = async (email, password) => {
    setError('');
    try {
      if (isFirebaseAvailable()) {
        // Connexion via Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredential.user);
        return userCredential.user;
      } else {
        // Connexion locale
        const adminConfig = await storageService.getConfig('adminUser');
        if (adminConfig && adminConfig.email === email && adminConfig.passwordHash === hashPassword(password)) {
          const user = { email, uid: 'local-admin' };
          setCurrentUser(user);
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
          return user;
        } else {
          throw new Error('Identifiants invalides');
        }
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      if (isFirebaseAvailable()) {
        // Déconnexion Firebase
        await firebaseSignOut(auth);
      } else {
        // Déconnexion locale
        localStorage.removeItem(LOCAL_AUTH_KEY);
        setCurrentUser(null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Créer un compte (uniquement dans Firebase ou pour le premier setup)
  const createAccount = async (email, password) => {
    setError('');
    try {
      if (isFirebaseAvailable()) {
        // Création de compte Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } else {
        // Mise à jour du compte admin local
        await storageService.saveConfig('adminUser', {
          email,
          passwordHash: hashPassword(password)
        });
        const user = { email, uid: 'local-admin' };
        setCurrentUser(user);
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
        return user;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Changer le mot de passe admin (uniquement pour l'authentification locale)
  const changePassword = async (newPassword) => {
    if (!isFirebaseAvailable() && currentUser) {
      try {
        const adminConfig = await storageService.getConfig('adminUser');
        if (adminConfig) {
          await storageService.saveConfig('adminUser', {
            ...adminConfig,
            passwordHash: hashPassword(newPassword)
          });
          return true;
        }
        return false;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    } else {
      setError('Cette fonction n\'est disponible qu\'en mode local.');
      return false;
    }
  };

  // Initialisation et observateur de l'état d'authentification
  useEffect(() => {
    let unsubscribe;

    const initAuth = async () => {
      try {
        if (isFirebaseAvailable()) {
          // Observer l'état d'authentification Firebase
          unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
          });
        } else {
          // Configuration de l'authentification locale
          await setupLocalAuth();
          
          // Vérifier si un utilisateur est déjà connecté
          const savedUser = localStorage.getItem(LOCAL_AUTH_KEY);
          if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur d\'initialisation de l\'authentification:', err);
        setLoading(false);
      }
    };

    initAuth();

    // Nettoyage de l'observateur au démontage
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Valeur fournie par le contexte
  const value = {
    currentUser,
    signIn,
    signOut,
    createAccount,
    changePassword,
    error,
    isFirebaseAuth: isFirebaseAvailable()
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;