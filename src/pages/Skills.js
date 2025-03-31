import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { 
  Cpu, CheckCircle, Award, Briefcase, Zap, Monitor, 
  Database, Server, Code, Terminal, Globe, 
  User, MessageSquare, Clock, Settings, FileSpreadsheet
} from 'lucide-react';

const Skills = () => {
  const { skills, profile, loading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mappings d'icônes pour différentes compétences
  const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();
    if (name.includes('office') || name.includes('windows')) 
      return <Monitor size={20} className="text-primary-500" />;
    if (name.includes('active directory') || name.includes('sccm')) 
      return <Server size={20} className="text-primary-500" />;
    if (name.includes('sql') || name.includes('base de données')) 
      return <Database size={20} className="text-primary-500" />;
    if (name.includes('html') || name.includes('css') || name.includes('javascr')) 
      return <Code size={20} className="text-primary-500" />;
    if (name.includes('linux') || name.includes('bash')) 
      return <Terminal size={20} className="text-primary-500" />;
    if (name.includes('travail') || name.includes('communic')) 
      return <MessageSquare size={20} className="text-primary-500" />;
    if (name.includes('organisation')) 
      return <Clock size={20} className="text-primary-500" />;
    if (name.includes('français') || name.includes('anglais') || name.includes('espagnol')) 
      return <Globe size={20} className="text-primary-500" />;
    
    // Icône par défaut
    return <Settings size={20} className="text-primary-500" />;
  };

  // Obtenir le badge correspondant au niveau
  const getSkillLevelBadge = (level) => {
    if (level >= 90) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
          <CheckCircle size={12} className="mr-1" />
          Expert
        </span>
      );
    } else if (level >= 80) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <CheckCircle size={12} className="mr-1" />
          Avancé
        </span>
      );
    } else if (level >= 65) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          <CheckCircle size={12} className="mr-1" />
          Intermédiaire
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          <CheckCircle size={12} className="mr-1" />
          Débutant
        </span>
      );
    }
  };

  // Exemples concrets pour chaque compétence
  const getSkillExamples = (skillName) => {
    const name = skillName.toLowerCase();
    
    // Retourne un ou deux exemples concrets pour chaque compétence
    if (name.includes('office 365')) 
      return ["Administration de la suite complète", "Gestion des licences et des utilisateurs"];
    if (name.includes('active directory')) 
      return ["Création/gestion des comptes et groupes", "Politiques de sécurité et permissions"];
    if (name.includes('sccm')) 
      return ["Déploiement d'images système", "Distribution de logiciels à distance"];
    if (name.includes('glpi') || name.includes('jira'))
      return ["Suivi des tickets", "Gestion des inventaires"];
    if (name.includes('html') || name.includes('css')) 
      return ["Création d'interfaces responsive", "Adaptation de templates"];
    if (name.includes('javascript')) 
      return ["Développement de fonctionnalités front-end", "Manipulation du DOM"];
    if (name.includes('sql')) 
      return ["Requêtes complexes", "Optimisation de bases de données"];
    if (name.includes('bash')) 
      return ["Automatisation de tâches système", "Scripts de maintenance"];
    if (name.includes('php')) 
      return ["Développement d'applications web", "Intégration avec Symfony"];
    if (name.includes('windows')) 
      return ["Administration complète", "Résolution de problèmes avancés"];
    if (name.includes('linux')) 
      return ["Configuration de serveurs", "Gestion des services"];
    if (name.includes('français')) 
      return ["Communication professionnelle", "Documentation technique"];
    if (name.includes('anglais')) 
      return ["Documentation technique", "Support utilisateur"];
    if (name.includes('espagnol')) 
      return ["Compréhension de base", "Conversations simples"];
    if (name.includes('travail en équipe')) 
      return ["Projets collaboratifs", "Partage de connaissances"];
    if (name.includes('communication')) 
      return ["Explication de concepts techniques", "Formations utilisateurs"];
    if (name.includes('organisation')) 
      return ["Gestion de plusieurs projets", "Priorisation des tâches"];
    
    // Exemple par défaut
    return ["Application dans divers contextes"];
  };

  // Obtenir des projets associés (exemples fictifs basés sur les compétences)
  const getRelatedProjects = (skillName) => {
    const name = skillName.toLowerCase();
    
    if (name.includes('office') || name.includes('active directory')) 
      return ["Suite d'Outils d'Automatisation IT"];
    if (name.includes('html') || name.includes('css') || name.includes('javascr')) 
      return ["TimeTrack", "Centurion"];
    if (name.includes('sql') || name.includes('base')) 
      return ["Calendrier de Congés"];
    if (name.includes('bash') || name.includes('linux')) 
      return ["Suite d'Outils d'Automatisation IT"];
    
    return [];
  };

  // Filtrage des compétences par catégorie
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(group => group.category.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 dark:text-white mb-4">Compétences professionnelles</h1>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Une vue d'ensemble de mes compétences techniques et personnelles avec des exemples concrets de leur application.
            </p>
          </header>
          
          {/* Section spéciale IA Skills */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg mb-16 overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white p-3 rounded-full">
                  <Cpu size={28} className="text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold">Compétences de développement assisté par IA</h2>
              </div>
              
              <p className="mb-8">
                En tant que technicien support, j'ai développé un ensemble unique de compétences combinant mon expertise en support avec les capacités de l'IA pour créer des solutions techniques sans être développeur expert.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="font-bold mb-3 text-white flex items-center gap-2">
                    <Award size={16} />
                    Prompt Engineering
                  </h3>
                  <p className="text-sm mb-2">Formulation précise de requêtes pour l'IA</p>
                  <div className="text-xs text-white/80 mt-1">
                    <span className="block mb-1">→ Structuration des requêtes complexes</span>
                    <span className="block">→ Optimisation pour des résultats ciblés</span>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="font-bold mb-3 text-white flex items-center gap-2">
                    <Code size={16} />
                    Intégration Code IA
                  </h3>
                  <p className="text-sm mb-2">Adaptation du code généré par l'IA</p>
                  <div className="text-xs text-white/80 mt-1">
                    <span className="block mb-1">→ Fusion de modules générés par IA</span>
                    <span className="block">→ Personnalisation pour besoins spécifiques</span>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="font-bold mb-3 text-white flex items-center gap-2">
                    <Zap size={16} />
                    Debugging avec IA
                  </h3>
                  <p className="text-sm mb-2">Résolution de problèmes assistée</p>
                  <div className="text-xs text-white/80 mt-1">
                    <span className="block mb-1">→ Diagnostic avancé des erreurs</span>
                    <span className="block">→ Optimisation des performances</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filtres de catégorie */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-secondary-600 text-white shadow-md' 
                  : 'bg-white dark:bg-secondary-800 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-secondary-700'
              }`}
            >
              Toutes les compétences
            </button>
            {skills.map(group => (
              <button
                key={group.category}
                onClick={() => setSelectedCategory(group.category.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === group.category.toLowerCase() 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-white dark:bg-secondary-800 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-secondary-700'
                }`}
              >
                {group.category}
              </button>
            ))}
          </div>
          
          {/* Affichage des compétences par groupe - NOUVELLE APPROCHE */}
          <div className="space-y-12">
            {filteredSkills.map((group, groupIndex) => (
              <div key={group.id || groupIndex} className="bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-secondary-700 flex items-center">
                  <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center bg-primary-500">
                    {group.category === 'Outils' ? <Settings size={20} className="text-white" /> :
                     group.category === 'Développement' ? <Code size={20} className="text-white" /> :
                     group.category === 'Systèmes' ? <Server size={20} className="text-white" /> :
                     group.category === 'Langues' ? <Globe size={20} className="text-white" /> :
                     group.category === 'Soft Skills' ? <User size={20} className="text-white" /> :
                     <Briefcase size={20} className="text-white" />}
                  </div>
                  <h2 className="text-xl font-bold text-secondary-800 dark:text-white">{group.category}</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {group.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-5 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            {getSkillIcon(skill.name)}
                            <h3 className="ml-2 text-lg font-semibold text-secondary-800 dark:text-white">
                              {skill.name}
                            </h3>
                          </div>
                          {getSkillLevelBadge(skill.level)}
                        </div>
                        
                        {/* Exemples concrets d'utilisation */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Applications concrètes:
                          </h4>
                          <ul className="space-y-1">
                            {getSkillExamples(skill.name).map((example, i) => (
                              <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                                <span className="text-primary-500 mr-2">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Projets associés s'il y en a */}
                        {getRelatedProjects(skill.name).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-secondary-600">
                            <h4 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                              Utilisé dans les projets:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {getRelatedProjects(skill.name).map((project, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300"
                                >
                                  <Briefcase size={10} className="mr-1" />
                                  {project}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section complémentaire avec des informations sur l'apprentissage */}
      <div className="bg-gradient-to-r from-secondary-700 to-secondary-800 py-16 text-white mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Approche d'apprentissage continu</h2>
            <p className="text-neutral-200 mb-8">
              Le monde de la technologie évolue rapidement. Je me forme constamment avec une approche orientée résultats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm flex flex-col items-center">
                <FileSpreadsheet size={24} className="text-primary-400 mb-3" />
                <h3 className="font-bold mb-2">Apprentissage ciblé</h3>
                <p className="text-sm text-white/80 text-center">Acquisition de compétences basée sur les besoins concrets rencontrés sur le terrain</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm flex flex-col items-center">
                <Zap size={24} className="text-primary-400 mb-3" />
                <h3 className="font-bold mb-2">Application pratique</h3>
                <p className="text-sm text-white/80 text-center">Mise en œuvre immédiate des connaissances dans des projets réels</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm flex flex-col items-center">
                <Cpu size={24} className="text-primary-400 mb-3" />
                <h3 className="font-bold mb-2">Collaboration avec l'IA</h3>
                <p className="text-sm text-white/80 text-center">Utilisation de l'IA comme partenaire d'apprentissage pour accélérer la montée en compétence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;