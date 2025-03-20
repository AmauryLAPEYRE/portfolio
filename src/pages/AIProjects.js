// src/pages/AIProjects.js
import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Cpu, ExternalLink, ChevronRight, Code, Layout, Search, 
  Repeat, Github, Zap, Lightbulb, Clock, Sparkles, User, Briefcase
} from 'lucide-react';
import Navigation from '../components/Navigation';
import IaBadge from '../components/IaBadge';

const AIProjects = () => {
  const { projects, aiSection, loading } = useContent();

  // Filtrer les projets assistés par IA et les séparer par type
  const aiProjects = projects.filter(project => 
    project.details && project.details.aiAssisted
  );

  const professionalProjects = aiProjects.filter(project => project.type === 'professional');
  const personalProjects = aiProjects.filter(project => project.type === 'personal');

  // Fonction pour obtenir l'icône appropriée
  const getToolIcon = (iconName, size = 24) => {
    switch (iconName) {
      case 'code':
        return <Code size={size} />;
      case 'layout':
        return <Layout size={size} />;
      case 'search':
        return <Search size={size} />;
      case 'repeat':
        return <Repeat size={size} />;
      default:
        return <Cpu size={size} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 pt-20 pb-16">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary-800 to-secondary-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-secondary-700 bg-opacity-50 p-3 rounded-full mb-6">
              <Cpu size={32} className="text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{aiSection.title}</h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              {aiSection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bénéfices de l'IA */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-secondary-800 dark:text-white mb-8">Avantages de l'IA pour le développement</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiSection.benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start bg-gray-50 dark:bg-secondary-700 p-6 rounded-xl hover:shadow-md transition-shadow border-l-4 border-primary-500"
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-2 mr-4">
                    {index % 4 === 0 ? <Zap size={24} className="text-primary-600 dark:text-primary-400" /> :
                     index % 4 === 1 ? <Lightbulb size={24} className="text-primary-600 dark:text-primary-400" /> :
                     index % 4 === 2 ? <Clock size={24} className="text-primary-600 dark:text-primary-400" /> :
                     <Sparkles size={24} className="text-primary-600 dark:text-primary-400" />}
                  </div>
                  <p className="text-secondary-700 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projets assistés par IA */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-secondary-800 dark:text-white mb-8">Projets assistés par IA</h2>
        
        {/* Projets professionnels */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <Briefcase size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-800 dark:text-white">Projets professionnels</h3>
          </div>
          
          {professionalProjects.length === 0 ? (
            <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8 text-center">
              <p className="text-xl text-gray-500">Aucun projet professionnel assisté par IA n'a encore été ajouté.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {professionalProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-blue-500"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{project.title}</h3>
                      <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
                        <Cpu size={18} />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="inline-block bg-gray-100 dark:bg-secondary-700 text-xs px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="bg-secondary-50 dark:bg-secondary-700/50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-secondary-800 dark:text-gray-200 mb-2">Contribution de l'IA</h4>
                      <p className="text-secondary-700 dark:text-gray-300 text-sm">{project.details.aiContribution}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Voir le projet
                        </a>
                      )}
                      
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm bg-secondary-700 hover:bg-secondary-800 text-white px-3 py-2 rounded-md transition-colors"
                        >
                          <Github size={14} className="mr-1" />
                          Code source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Projets personnels */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <User size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-800 dark:text-white">Projets personnels</h3>
          </div>
          
          {personalProjects.length === 0 ? (
            <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8 text-center">
              <p className="text-xl text-gray-500">Aucun projet personnel assisté par IA n'a encore été ajouté.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {personalProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-green-500"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{project.title}</h3>
                      <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
                        <Cpu size={18} />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="inline-block bg-gray-100 dark:bg-secondary-700 text-xs px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="bg-secondary-50 dark:bg-secondary-700/50 p-4 rounded-lg mb-4 border-l-4 border-green-500">
                      <h4 className="font-semibold text-secondary-800 dark:text-gray-200 mb-2">Contribution de l'IA</h4>
                      <p className="text-secondary-700 dark:text-gray-300 text-sm">{project.details.aiContribution}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Voir le projet
                        </a>
                      )}
                      
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm bg-secondary-700 hover:bg-secondary-800 text-white px-3 py-2 rounded-md transition-colors"
                        >
                          <Github size={14} className="mr-1" />
                          Code source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Avantages pour les entreprises */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-secondary-800 dark:text-white mb-6">Avantages pour les entreprises</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-secondary-700/50 p-5 rounded-lg border-l-4 border-primary-500">
                <h3 className="font-bold text-secondary-800 dark:text-white mb-3">Proposition de valeur enrichie</h3>
                <p className="text-gray-600 dark:text-gray-300">Offrir aux clients des solutions sur mesure développées rapidement par les techniciens sur site.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/50 p-5 rounded-lg border-l-4 border-secondary-500">
                <h3 className="font-bold text-secondary-800 dark:text-white mb-3">Valorisation des compétences</h3>
                <p className="text-gray-600 dark:text-gray-300">Permettre aux techniciens support de développer leurs compétences et d'apporter plus de valeur.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/50 p-5 rounded-lg border-l-4 border-primary-500">
                <h3 className="font-bold text-secondary-800 dark:text-white mb-3">Différenciation concurrentielle</h3>
                <p className="text-gray-600 dark:text-gray-300">Se démarquer des autres ESN en intégrant l'IA comme levier d'innovation dans les services de support.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/50 p-5 rounded-lg border-l-4 border-secondary-500">
                <h3 className="font-bold text-secondary-800 dark:text-white mb-3">Réduction des coûts</h3>
                <p className="text-gray-600 dark:text-gray-300">Développer des solutions sans avoir à embaucher des développeurs spécialisés ou externaliser.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/50 p-5 rounded-lg border-l-4 border-primary-500">
                <h3 className="font-bold text-secondary-800 dark:text-white mb-3">Satisfaction client accrue</h3>
                <p className="text-gray-600 dark:text-gray-300">Répondre plus rapidement et efficacement aux besoins spécifiques des clients.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-secondary-700/50 p-5 rounded-lg border-l-4 border-secondary-500">
                <h3 className="font-bold text-secondary-800 dark:text-white mb-3">Modèle reproductible</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ce portfolio est lui-même la preuve du concept : créé avec l'IA, il démontre comment les techniciens support peuvent développer des solutions complètes et professionnelles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outils IA */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-secondary-700 to-secondary-600 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8">Outils IA que j'utilise</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {aiSection.tools.map((tool, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all border-l-4 border-primary-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-500/30 rounded-full p-2 mr-3">
                      {getToolIcon(tool.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                  </div>
                  <p className="text-gray-200">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ce que l'IA permet */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-secondary-800 dark:text-white mb-3">{aiSection.showcase.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{aiSection.showcase.description}</p>
            
            <div className="space-y-4">
              {aiSection.showcase.examples.map((example, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-600 transition-colors border-l-4 border-primary-500"
                >
                  <ChevronRight size={20} className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Une nouvelle perspective professionnelle</h2>
            <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Cette approche, accessible à tous, constitue une véritable valeur ajoutée pour toute personne souhaitant concrétiser un projet, que ce soit de manière autonome ou dans un cadre professionnel.
            </p>
            
            <a 
              href="#contact"
              className="inline-flex items-center bg-white text-primary-600 font-bold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
            >
              Découvrir le potentiel
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProjects;