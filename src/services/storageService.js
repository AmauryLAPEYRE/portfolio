// src/services/storageService.js
import { isFirebaseAvailable, db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

// Préfixe pour les clés localStorage
const LS_PREFIX = 'portfolio_';

/**
 * Service abstrait pour gérer le stockage des données
 * Utilisera Firebase si disponible, sinon localStorage
 */
class StorageService {
  // Sauvegarder une collection entière
  async saveCollection(collectionName, data) {
    if (isFirebaseAvailable()) {
      // Implémentation Firebase
      const collectionRef = collection(db, collectionName);
      
      // Approche par traitement en masse
      const batch = [];
      for (const item of data) {
        const docRef = doc(collectionRef, item.id.toString());
        batch.push(setDoc(docRef, item));
      }
      
      await Promise.all(batch);
      return true;
    } else {
      // Implémentation localStorage
      localStorage.setItem(`${LS_PREFIX}${collectionName}`, JSON.stringify(data));
      return true;
    }
  }

  // Récupérer une collection entière
  async getCollection(collectionName) {
    if (isFirebaseAvailable()) {
      // Implémentation Firebase
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      
      const data = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      return data;
    } else {
      // Implémentation localStorage
      const data = localStorage.getItem(`${LS_PREFIX}${collectionName}`);
      return data ? JSON.parse(data) : [];
    }
  }

  // Sauvegarder un document spécifique
  async saveDocument(collectionName, documentId, data) {
    if (isFirebaseAvailable()) {
      // Implémentation Firebase
      const docRef = doc(db, collectionName, documentId.toString());
      await setDoc(docRef, data);
      return true;
    } else {
      // Implémentation localStorage
      const collectionData = await this.getCollection(collectionName);
      const index = collectionData.findIndex(item => item.id.toString() === documentId.toString());
      
      if (index !== -1) {
        collectionData[index] = { ...data, id: documentId };
      } else {
        collectionData.push({ ...data, id: documentId });
      }
      
      localStorage.setItem(`${LS_PREFIX}${collectionName}`, JSON.stringify(collectionData));
      return true;
    }
  }

  // Récupérer un document spécifique
  async getDocument(collectionName, documentId) {
    if (isFirebaseAvailable()) {
      // Implémentation Firebase
      const docRef = doc(db, collectionName, documentId.toString());
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } else {
      // Implémentation localStorage
      const collectionData = await this.getCollection(collectionName);
      return collectionData.find(item => item.id.toString() === documentId.toString()) || null;
    }
  }

  // Mettre à jour un document
  async updateDocument(collectionName, documentId, data) {
    if (isFirebaseAvailable()) {
      // Implémentation Firebase
      const docRef = doc(db, collectionName, documentId.toString());
      await updateDoc(docRef, data);
      return true;
    } else {
      // Implémentation localStorage
      const collectionData = await this.getCollection(collectionName);
      const index = collectionData.findIndex(item => item.id.toString() === documentId.toString());
      
      if (index !== -1) {
        collectionData[index] = { ...collectionData[index], ...data };
        localStorage.setItem(`${LS_PREFIX}${collectionName}`, JSON.stringify(collectionData));
        return true;
      } else {
        return false;
      }
    }
  }

  // Supprimer un document
  async deleteDocument(collectionName, documentId) {
    if (isFirebaseAvailable()) {
      // Implémentation Firebase
      const docRef = doc(db, collectionName, documentId.toString());
      await deleteDoc(docRef);
      return true;
    } else {
      // Implémentation localStorage
      const collectionData = await this.getCollection(collectionName);
      const filteredData = collectionData.filter(item => item.id.toString() !== documentId.toString());
      
      localStorage.setItem(`${LS_PREFIX}${collectionName}`, JSON.stringify(filteredData));
      return true;
    }
  }

  // Sauvegarder des données de configuration
  async saveConfig(configName, data) {
    return this.saveDocument('config', configName, data);
  }

  // Récupérer des données de configuration
  async getConfig(configName) {
    return this.getDocument('config', configName);
  }

  // Réinitialiser le stockage (pour des tests ou des réinitialisations)
  async resetStorage() {
    if (isFirebaseAvailable()) {
      console.warn('La réinitialisation de la base Firebase n\'est pas implémentée ici pour des raisons de sécurité.');
      return false;
    } else {
      // Effacer uniquement les entrées liées au portfolio
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(LS_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    }
  }
}

export default new StorageService();