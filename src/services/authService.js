// src/services/authService.js

/**
 * Service d'authentification simple utilisant uniquement localStorage
 * Ce service remplace toutes les fonctionnalités Firebase Auth
 */
class AuthService {
    constructor() {
      this.STORAGE_KEY = 'portfolio_auth_user';
      this.ADMIN_CONFIG = 'portfolio_admin_config';
    }
  
    // Fonction simple de hachage (basique - pour un usage non critique)
    hashPassword(password) {
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Conversion en 32bit integer
      }
      return hash.toString();
    }
  
    // Configurer le compte admin par défaut s'il n'existe pas
    setupDefaultAdmin() {
      if (!localStorage.getItem(this.ADMIN_CONFIG)) {
        localStorage.setItem(this.ADMIN_CONFIG, JSON.stringify({
          email: 'admin@example.com',
          passwordHash: this.hashPassword('admin123')
        }));
        console.info('Compte admin par défaut créé: admin@example.com / admin123');
      }
    }
  
    // Vérifier si un utilisateur est connecté
    getCurrentUser() {
      const savedUser = localStorage.getItem(this.STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    }
  
    // Connecter un utilisateur
    login(email, password) {
      // Vérifier d'abord si le compte admin par défaut est configuré
      this.setupDefaultAdmin();
      
      // Récupérer les infos admin
      const adminConfig = JSON.parse(localStorage.getItem(this.ADMIN_CONFIG));
      
      if (adminConfig && adminConfig.email === email && adminConfig.passwordHash === this.hashPassword(password)) {
        const user = { email, uid: 'local-admin' };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        return user;
      } else {
        throw new Error('Identifiants invalides');
      }
    }
  
    // Déconnecter un utilisateur
    logout() {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    }
  
    // Changer le mot de passe
    changePassword(newPassword) {
      const adminConfig = JSON.parse(localStorage.getItem(this.ADMIN_CONFIG));
      if (adminConfig) {
        adminConfig.passwordHash = this.hashPassword(newPassword);
        localStorage.setItem(this.ADMIN_CONFIG, JSON.stringify(adminConfig));
        return true;
      }
      return false;
    }
  }
  
  const authService = new AuthService();
  export default authService;