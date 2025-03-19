// src/services/firebase.js optimisé
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Configuration Firebase avec les variables d'environnement
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Vérifier que les variables d'environnement nécessaires sont définies
const allKeysPresent = Object.values(firebaseConfig).every(value => value !== undefined && value !== '');

// Initialiser Firebase seulement si toutes les variables d'env sont présentes
let app, auth, db, analytics;

try {
  if (allKeysPresent) {
    // Initialiser Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Configurer la persistance de l'authentification
    setPersistence(auth, browserLocalPersistence)
      .catch(error => {
        console.error('Erreur de configuration de la persistance auth:', error);
      });
    
    // Configurer la persistance Firestore pour le mode hors ligne
    if (typeof window !== 'undefined' && window.indexedDB) {
      enableIndexedDbPersistence(db)
        .catch(error => {
          if (error.code === 'failed-precondition') {
            console.warn('La persistance n\'a pas pu être activée car plusieurs onglets sont ouverts');
          } else if (error.code === 'unimplemented') {
            console.warn('Le navigateur ne prend pas en charge la persistance');
          } else {
            console.error('Erreur lors de l\'activation de la persistance:', error);
          }
        });
    }
    
    // Analytics ne fonctionne que dans un environnement de navigateur
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
      // Enregistrer un événement pour le chargement de l'application
      logEvent(analytics, 'app_initialized');
    }
    
    console.log('Firebase initialized successfully');
  } else {
    console.warn('Configuration Firebase incomplète. Les variables d\'environnement sont manquantes.');
  }
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Firebase:', error);
}

// Fonction pour journaliser les événements Analytics
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
      return true;
    } catch (error) {
      console.error('Erreur lors de la journalisation de l\'événement:', error);
      return false;
    }
  }
  return false;
};

export { app, auth, db, analytics };

// Fonction utilitaire pour vérifier si Firebase est disponible
export const isFirebaseAvailable = () => {
  return app !== undefined && auth !== undefined && db !== undefined;
};