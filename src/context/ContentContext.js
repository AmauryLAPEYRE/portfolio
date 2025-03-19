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

  // Charger le profil
  const loadProfile = async () => {
    const data = await storageService.getConfig('profile');
    if (data) {
      setProfile(data);
    } else {
      setProfile(defaultData.profile);
      // Sauvegarder les données par défaut
      await storageService.saveConfig('profile', defaultData.profile);
    }
  };

  // Charger les projets
  const loadProjects = async () => {
    const data = await storageService.getCollection('projects');
    if (data && data.length > 0) {
      setProjects(data);
    } else {
      setProjects(defaultData.projects);
      // Sauvegarder les données par défaut
      await storageService.saveCollection('projects', defaultData.projects);
    }
  };

  // Charger les expériences
  const loadExperiences = async () => {
    const data = await storageService.getCollection('experiences');
    if (data && data.length > 0) {
      setExperiences(data);
    } else {
      setExperiences(defaultData.experiences);
      // Sauvegarder les données par défaut
      await storageService.saveCollection('experiences', defaultData.experiences);
    }
  };

  // Charger les compétences
  const loadSkills = async () => {
    const data = await storageService.getCollection('skills');
    if (data && data.length > 0) {
      setSkills(data);
    } else {
      setSkills(defaultData.skills);
      // Sauvegarder les données par défaut
      await storageService.saveCollection('skills', defaultData.skills);
    }
  };

  // Charger la formation
  const loadEducation = async () => {
    const data = await storageService.getCollection('education');
    if (data && data.length > 0) {
      setEducation(data);
    } else {
      setEducation(defaultData.education);
      // Sauvegarder les données par défaut
      await storageService.saveCollection('education', defaultData.education);
    }
  };

  // Charger les centres d'intérêt
  const loadInterests = async () => {
    const data = await storageService.getCollection('interests');
    if (data && data.length > 0) {
      setInterests(data);
    } else {
      setInterests(defaultData.interests);
      // Sauvegarder les données par défaut
      await storageService.saveCollection('interests', defaultData.interests);
    }
  };

  // Charger la section IA
  const loadAiSection = async () => {
    const data = await storageService.getConfig('aiSection');
    if (data) {
      setAiSection(data);
    } else {
      setAiSection(defaultData.aiSection);
      // Sauvegarder les données par défaut
      await storageService.saveConfig('aiSection', defaultData.aiSection);
    }
  };

  // Mettre à jour le profil
  const updateProfile = async (newData) => {
    try {
      await storageService.saveConfig('profile', newData);
      setProfile(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Mettre à jour les projets
  const updateProjects = async (newData) => {
    try {
      await storageService.saveCollection('projects', newData);
      setProjects(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Ajouter un projet
  const addProject = async (project) => {
    try {
      // Générer un ID unique si non spécifié
      const newProject = {
        ...project,
        id: project.id || Date.now().toString()
      };
      
      const updatedProjects = [...projects, newProject];
      await storageService.saveCollection('projects', updatedProjects);
      setProjects(updatedProjects);
      return newProject;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Mettre à jour un projet spécifique
  const updateProject = async (id, updatedData) => {
    try {
      const updatedProjects = projects.map(project => 
        project.id.toString() === id.toString() ? { ...project, ...updatedData } : project
      );
      
      await storageService.saveCollection('projects', updatedProjects);
      setProjects(updatedProjects);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Supprimer un projet
  const deleteProject = async (id) => {
    try {
      const updatedProjects = projects.filter(project => project.id.toString() !== id.toString());
      await storageService.saveCollection('projects', updatedProjects);
      setProjects(updatedProjects);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Mettre à jour les expériences
  const updateExperiences = async (newData) => {
    try {
      await storageService.saveCollection('experiences', newData);
      setExperiences(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Mettre à jour les compétences
  const updateSkills = async (newData) => {
    try {
      await storageService.saveCollection('skills', newData);
      setSkills(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Mettre à jour la formation
  const updateEducation = async (newData) => {
    try {
      await storageService.saveCollection('education', newData);
      setEducation(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Mettre à jour les centres d'intérêt
  const updateInterests = async (newData) => {
    try {
      await storageService.saveCollection('interests', newData);
      setInterests(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Mettre à jour la section IA
  const updateAiSection = async (newData) => {
    try {
      await storageService.saveConfig('aiSection', newData);
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
      await storageService.saveConfig('profile', defaultData.profile);
      await storageService.saveCollection('projects', defaultData.projects);
      await storageService.saveCollection('experiences', defaultData.experiences);
      await storageService.saveCollection('skills', defaultData.skills);
      await storageService.saveCollection('education', defaultData.education);
      await storageService.saveCollection('interests', defaultData.interests);
      await storageService.saveConfig('aiSection', defaultData.aiSection);
      
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