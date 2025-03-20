// src/context/ContentContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import storageService from '../services/storageService';
import defaultData from '../data/defaultData';

// Création du contexte
const ContentContext = createContext();

// Hook personnalisé pour utiliser le contexte de contenu
export const useContent = () => {
  return useContext(ContentContext);
};

// Fournisseur du contexte de contenu
export const ContentProvider = ({ children }) => {
  // États pour chaque type de contenu
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [interests, setInterests] = useState([]);
  const [aiSection, setAiSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialiser les données
  const initializeData = async () => {
    try {
      // Charger les données depuis le stockage ou utiliser les valeurs par défaut
      await loadProfile();
      await loadProjects();
      await loadExperiences();
      await loadSkills();
      await loadEducation();
      await loadInterests();
      await loadAiSection();
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de l\'initialisation des données:', err);
      setError('Impossible de charger les données du portfolio.');
      setLoading(false);
    }
  };

  // Fonctions de chargement pour chaque type de données
  const loadProfile = async () => {
    const data = storageService.getConfig('profile');
    if (data) {
      setProfile(data);
    } else {
      setProfile(defaultData.profile);
      // Sauvegarder les données par défaut
      storageService.saveConfig('profile', defaultData.profile);
    }
  };

  const loadProjects = async () => {
    const data = storageService.getCollection('projects');
    if (data && data.length > 0) {
      setProjects(data);
    } else {
      setProjects(defaultData.projects);
      // Sauvegarder les données par défaut
      storageService.saveCollection('projects', defaultData.projects);
    }
  };

  const loadExperiences = async () => {
    const data = storageService.getCollection('experiences');
    if (data && data.length > 0) {
      setExperiences(data);
    } else {
      setExperiences(defaultData.experiences);
      // Sauvegarder les données par défaut
      storageService.saveCollection('experiences', defaultData.experiences);
    }
  };

  const loadSkills = async () => {
    const data = storageService.getCollection('skills');
    if (data && data.length > 0) {
      setSkills(data);
    } else {
      setSkills(defaultData.skills);
      // Sauvegarder les données par défaut
      storageService.saveCollection('skills', defaultData.skills);
    }
  };

  const loadEducation = async () => {
    const data = storageService.getCollection('education');
    if (data && data.length > 0) {
      setEducation(data);
    } else {
      setEducation(defaultData.education);
      // Sauvegarder les données par défaut
      storageService.saveCollection('education', defaultData.education);
    }
  };

  const loadInterests = async () => {
    const data = storageService.getCollection('interests');
    if (data && data.length > 0) {
      setInterests(data);
    } else {
      setInterests(defaultData.interests);
      // Sauvegarder les données par défaut
      storageService.saveCollection('interests', defaultData.interests);
    }
  };

  const loadAiSection = async () => {
    const data = storageService.getConfig('aiSection');
    if (data) {
      setAiSection(data);
    } else {
      setAiSection(defaultData.aiSection);
      // Sauvegarder les données par défaut
      storageService.saveConfig('aiSection', defaultData.aiSection);
    }
  };

  // Fonctions de mise à jour pour chaque type de données
  const updateProfile = async (newData) => {
    try {
      storageService.saveConfig('profile', newData);
      setProfile(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateProjects = async (newData) => {
    try {
      storageService.saveCollection('projects', newData);
      setProjects(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const addProject = async (project) => {
    try {
      // Générer un ID unique si non spécifié
      const newProject = {
        ...project,
        id: project.id || Date.now().toString()
      };
      
      const updatedProjects = [...projects, newProject];
      storageService.saveCollection('projects', updatedProjects);
      setProjects(updatedProjects);
      return newProject;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const updateProject = async (id, updatedData) => {
    try {
      const updatedProjects = projects.map(project => 
        project.id.toString() === id.toString() ? { ...project, ...updatedData } : project
      );
      
      storageService.saveCollection('projects', updatedProjects);
      setProjects(updatedProjects);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteProject = async (id) => {
    try {
      const updatedProjects = projects.filter(project => project.id.toString() !== id.toString());
      storageService.saveCollection('projects', updatedProjects);
      setProjects(updatedProjects);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateExperiences = async (newData) => {
    try {
      storageService.saveCollection('experiences', newData);
      setExperiences(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateSkills = async (newData) => {
    try {
      storageService.saveCollection('skills', newData);
      setSkills(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateEducation = async (newData) => {
    try {
      storageService.saveCollection('education', newData);
      setEducation(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateInterests = async (newData) => {
    try {
      storageService.saveCollection('interests', newData);
      setInterests(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateAiSection = async (newData) => {
    try {
      storageService.saveConfig('aiSection', newData);
      setAiSection(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Réinitialiser toutes les données
  const resetToDefaults = async () => {
    try {
      // Réinitialiser chaque section avec les données par défaut
      storageService.saveConfig('profile', defaultData.profile);
      storageService.saveCollection('projects', defaultData.projects);
      storageService.saveCollection('experiences', defaultData.experiences);
      storageService.saveCollection('skills', defaultData.skills);
      storageService.saveCollection('education', defaultData.education);
      storageService.saveCollection('interests', defaultData.interests);
      storageService.saveConfig('aiSection', defaultData.aiSection);
      
      // Recharger les données
      setProfile(defaultData.profile);
      setProjects(defaultData.projects);
      setExperiences(defaultData.experiences);
      setSkills(defaultData.skills);
      setEducation(defaultData.education);
      setInterests(defaultData.interests);
      setAiSection(defaultData.aiSection);
      
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Initialiser les données au montage
  useEffect(() => {
    initializeData();
  }, []);

  // Valeur fournie par le contexte
  const value = {
    profile,
    projects,
    experiences,
    skills,
    education,
    interests,
    aiSection,
    loading,
    error,
    updateProfile,
    updateProjects,
    addProject,
    updateProject,
    deleteProject,
    updateExperiences,
    updateSkills,
    updateEducation,
    updateInterests,
    updateAiSection,
    resetToDefaults
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;