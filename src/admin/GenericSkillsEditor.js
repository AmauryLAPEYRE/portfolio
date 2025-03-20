// src/components/admin/GenericSkillsEditor.js
import React from 'react';
import { useContent } from '../../context/ContentContext';

const GenericSkillsEditor = () => {
  const { skills, updateSkills } = useContent();
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Compétences</h2>
      <p className="text-gray-600">
        Éditeur temporaire pour les compétences. Les données sont correctement sauvegardées en mémoire.
      </p>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Cette section a été simplifiée et continuera à fonctionner avec les données existantes.
          Pour modifier les compétences, utilisez le panneau d'administration complet.
        </p>
      </div>
    </div>
  );
};

export default GenericSkillsEditor;