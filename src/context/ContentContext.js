// src/context/ContentContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { experiences } from '../data/experiences';
import { skills } from '../data/skills';
import { education } from '../data/education';
import { interests } from '../data/interests';
import { aiSection } from '../data/aiSection';

// Création du contexte
const ContentContext = createContext();

// Hook personnalisé pour utiliser le contexte de contenu
export const useContent = () => {
  return useContext(ContentContext);
};

// Fournisseur du contexte de contenu
export const ContentProvider = ({ children }) => {
  // États pour chaque type de contenu
  const [profileData, setProfileData] = useState(profile);
  const [projectsData, setProjectsData] = useState(projects);
  const [experiencesData, setExperiencesData] = useState(experiences);
  const [skillsData, setSkillsData] = useState(skills);
  const [educationData, setEducationData] = useState(education);
  const [interestsData, setInterestsData] = useState(interests);
  const [aiSectionData, setAiSectionData] = useState(aiSection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simuler un chargement de données
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Délai simulé pour l'effet de chargement
  }, []);

  // Valeur fournie par le contexte
  const value = {
    profile: profileData,
    projects: projectsData,
    experiences: experiencesData,
    skills: skillsData,
    education: educationData,
    interests: interestsData,
    aiSection: aiSectionData,
    loading,
    error
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;