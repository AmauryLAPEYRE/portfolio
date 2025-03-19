// src/admin/AdminPanel.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { LogOut, User, Briefcase, Code, BookOpen, Award, Heart, Cpu, Settings } from 'lucide-react';

// Éditeurs pour chaque section
import ProfileEditor from './editors/ProfileEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import ExperiencesEditor from './editors/ExperiencesEditor';
import SkillsEditor from './editors/SkillsEditor';
import EducationEditor from './editors/EducationEditor';
import InterestsEditor from './editors/InterestsEditor';
import AiSectionEditor from './editors/AiSectionEditor';
import SettingsEditor from './editors/SettingsEditor';

const AdminPanel = () => {
  const { currentUser, signOut } = useAuth();
  const { resetToDefaults } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Gestionnaire de déconnexion
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Gestionnaire de réinitialisation du contenu
  const handleReset = async () => {
    const success = await resetToDefaults();
    if (success) {
      setResetDialogOpen(false);
      // Afficher une notification de succès
      alert('Toutes les données ont été réinitialisées avec succès.');
    } else {
      // Afficher une notification d'erreur
      alert('Une erreur est survenue lors de la réinitialisation des données.');
    }
  };

  // Configuration des onglets
  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User size={18} /> },
    { id: 'projects', label: 'Projets', icon: <Briefcase size={18} /> },
    { id: 'experiences', label: 'Expériences', icon: <Code size={18} /> },
    { id: 'skills', label: 'Compétences', icon: <Award size={18} /> },
    { id: 'education', label: 'Formation', icon: <BookOpen size={18} /> },
    { id: 'interests', label: 'Centres d\'intérêt', icon: <Heart size={18} /> },
    { id: 'aiSection', label: 'Section IA', icon: <Cpu size={18} /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête d'administration */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Administration du Portfolio</h1>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Mode Édition</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-300">
              Connecté en tant que <span className="font-semibold">{currentUser?.email}</span>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation principale */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Barre latérale */}
          <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
            <nav>
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate('/')}
                  className="w-full text-left px-4 py-3 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Voir le portfolio
                </button>
                <button
                  onClick={() => setResetDialogOpen(true)}
                  className="w-full text-left px-4 py-3 text-red-600 hover:text-red-800 transition-colors"
                >
                  Réinitialiser le contenu
                </button>
              </div>
            </nav>
          </aside>

          {/* Contenu principal */}
          <main className="flex-1 bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && <ProfileEditor />}
            {activeTab === 'projects' && <ProjectsEditor />}
            {activeTab === 'experiences' && <ExperiencesEditor />}
            {activeTab === 'skills' && <SkillsEditor />}
            {activeTab === 'education' && <EducationEditor />}
            {activeTab === 'interests' && <InterestsEditor />}
            {activeTab === 'aiSection' && <AiSectionEditor />}
            {activeTab === 'settings' && <SettingsEditor />}
          </main>
        </div>
      </div>

      {/* Modal de confirmation de réinitialisation */}
      {resetDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la réinitialisation</h3>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir réinitialiser tout le contenu du portfolio ? Cette action ne peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setResetDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;