// src/services/storageService.js

/**
 * Service de stockage utilisant uniquement localStorage
 * Ce service remplace toutes les fonctionnalités Firebase
 */
class StorageService {
  constructor() {
    this.LS_PREFIX = 'portfolio_';
  }

  // Sauvegarder une collection entière
  saveCollection(collectionName, data) {
    localStorage.setItem(`${this.LS_PREFIX}${collectionName}`, JSON.stringify(data));
    return true;
  }

  // Récupérer une collection entière
  getCollection(collectionName) {
    const data = localStorage.getItem(`${this.LS_PREFIX}${collectionName}`);
    return data ? JSON.parse(data) : [];
  }

  // Sauvegarder un document de configuration
  saveConfig(configName, data) {
    localStorage.setItem(`${this.LS_PREFIX}config_${configName}`, JSON.stringify(data));
    return true;
  }

  // Récupérer un document de configuration
  getConfig(configName) {
    const data = localStorage.getItem(`${this.LS_PREFIX}config_${configName}`);
    return data ? JSON.parse(data) : null;
  }

  // Exporter toutes les données (utile pour la sauvegarde)
  exportAllData() {
    const data = {};
    // Récupérer toutes les entrées du localStorage qui commencent par le préfixe
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.LS_PREFIX)) {
        const shortKey = key.replace(this.LS_PREFIX, '');
        data[shortKey] = JSON.parse(localStorage.getItem(key));
      }
    });
    return data;
  }

  // Importer toutes les données (utile pour la restauration)
  importAllData(data) {
    // D'abord, effacer toutes les données existantes
    this.resetStorage();
    
    // Ensuite, importer les nouvelles données
    Object.keys(data).forEach(key => {
      localStorage.setItem(`${this.LS_PREFIX}${key}`, JSON.stringify(data[key]));
    });
    return true;
  }

  // Réinitialiser le stockage (pour des réinitialisations)
  resetStorage() {
    // Effacer uniquement les entrées liées au portfolio
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.LS_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  }
}

const storageService = new StorageService();
export default storageService;