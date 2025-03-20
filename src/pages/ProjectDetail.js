// src/pages/ProjectDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { 
  ArrowLeft, Link as LinkIcon, Github, Cpu, Calendar, 
  BarChart, ChevronRight, Globe, Clock, User, Briefcase
} from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, loading } = useContent();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && projects) {
      // Trouver le projet correspondant à l'ID
      const foundProject = projects.find(p => p.id.toString() === id);
      
      if (foundProject) {
        setProject(foundProject);
        
        // Trouver des projets similaires (même catégorie)
        if (foundProject.categories && foundProject.categories.length > 0) {
          const related = projects
            .filter(p => 
              p.id !== foundProject.id && 
              p.categories.some(cat => foundProject.categories.includes(cat))
            )
            .slice(0, 3); // Limiter à 3 projets similaires
          
          setRelatedProjects(related);
        }
      } else {
        // Projet non trouvé, rediriger vers la liste des projets
        navigate('/projets');
      }
    }
  }, [id, projects, loading, navigate]);

  if (loading || !project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Bouton retour */}
        <Link
          to="/projets"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Retour aux projets
        </Link>
        
        {/* En-tête du projet */}
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md overflow-hidden mb-8 border-l-4 border-primary-500">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center">
                <div className={`${project.type === 'professional' ? 'bg-blue-500' : 'bg-green-500'} w-14 h-14 rounded-full flex items-center justify-center text-white mr-4 shadow-md`}>
                  <span className="text-xl font-bold">{project.id}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-secondary-800 dark:text-white">{project.title}</h1>
                  <div className="flex items-center mt-2">
                    {project.type === 'professional' ? (
                      <div className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-lg text-sm">
                        <Briefcase size={16} className="mr-2" />
                        <span className="font-medium">Projet professionnel</span>
                      </div>
                    ) : (
                      <div className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-200 rounded-lg text-sm">
                        <User size={16} className="mr-2" />
                        <span className="font-medium">Projet personnel</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.categories && project.categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {category === 'web' ? 'Web' : 
                         category === 'dev' ? 'Développement' :
                         category === 'support' ? 'Support IT' :
                         category === 'admin' ? 'Administration' :
                         category === 'ai' ? 'IA' : category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {project.metrics && (
                <div className="bg-gray-100 dark:bg-secondary-700 px-4 py-2 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Résultats</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{project.metrics}</div>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">{project.description}</p>
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary-800 dark:text-gray-200 mb-3">Technologies utilisées</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {project.details.problem && (
                  <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg border-l-4 border-secondary-500">
                    <h3 className="font-bold text-secondary-800 dark:text-gray-200 mb-2">Problématique</h3>
                    <p className="text-gray-600 dark:text-gray-300">{project.details.problem}</p>
                  </div>
                )}
                
                {project.details.solution && (
                  <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg border-l-4 border-primary-500">
                    <h3 className="font-bold text-secondary-800 dark:text-gray-200 mb-2">Solution</h3>
                    <p className="text-gray-600 dark:text-gray-300">{project.details.solution}</p>
                  </div>
                )}
              </div>
            )}
            
            {project.details && project.details.aiAssisted && (
              <div className="bg-secondary-50 dark:bg-secondary-700/50 p-5 rounded-lg mb-8 border border-secondary-200 dark:border-secondary-600 border-l-4 border-l-primary-500">
                <div className="flex items-start">
                  <Cpu size={24} className="text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-secondary-800 dark:text-gray-200 mb-2">Projet assisté par IA</h3>
                    <p className="text-secondary-700 dark:text-gray-300">{project.details.aiContribution}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Section sur le processus de développement avec l'IA */}
            {project.details && project.details.aiAssisted && (
              <div className="bg-secondary-50 dark:bg-secondary-700/30 p-6 rounded-lg mb-8 border border-dashed border-primary-500">
                <h3 className="font-bold text-xl text-secondary-800 dark:text-gray-100 mb-4 flex items-center">
                  <Cpu size={20} className="text-primary-500 mr-2" />
                  Comment ce projet a été réalisé avec l'IA
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mr-3 mt-1">
                      <span className="flex items-center justify-center h-6 w-6 text-primary-700 dark:text-primary-300 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-700 dark:text-gray-200">Identification du besoin</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {project.type === 'professional' 
                          ? "J'ai identifié un problème ou un besoin lors de mes missions d'assistance technique chez un client."
                          : "J'ai identifié un besoin personnel que je souhaitais résoudre avec une application."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mr-3 mt-1">
                      <span className="flex items-center justify-center h-6 w-6 text-primary-700 dark:text-primary-300 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-700 dark:text-gray-200">Conception avec l'IA</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">J'ai expliqué le besoin à l'IA qui m'a aidé à concevoir la structure de la solution.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mr-3 mt-1">
                      <span className="flex items-center justify-center h-6 w-6 text-primary-700 dark:text-primary-300 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-700 dark:text-gray-200">Génération de code</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">L'IA a généré le code de base que j'ai adapté à mes besoins spécifiques.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mr-3 mt-1">
                      <span className="flex items-center justify-center h-6 w-6 text-primary-700 dark:text-primary-300 font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-700 dark:text-gray-200">Tests et améliorations</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">J'ai testé la solution et, avec l'aide de l'IA, corrigé les bugs et amélioré l'expérience utilisateur.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mr-3 mt-1">
                      <span className="flex items-center justify-center h-6 w-6 text-primary-700 dark:text-primary-300 font-bold">5</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-700 dark:text-gray-200">Déploiement</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {project.type === 'professional' 
                          ? "J'ai déployé la solution auprès du client, permettant de résoudre efficacement le problème initial."
                          : "J'ai déployé l'application pour mon usage personnel, résolvant efficacement mon besoin initial."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-600">
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {project.type === 'professional' 
                      ? "Ce projet démontre comment un technicien support peut utiliser l'IA pour développer des solutions sur mesure répondant aux besoins spécifiques des clients."
                      : "Ce projet personnel démontre comment l'IA permet de développer des applications sophistiquées sans expertise approfondie en programmation."}
                  </p>
                </div>
              </div>
            )}
            
            {/* Graphique/Métriques */}
            {project.chartData && project.chartData.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary-800 dark:text-gray-200 mb-3">Métriques du projet</h2>
                <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg">
                  <div className="flex justify-between items-end h-48">
                    {project.chartData.map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`${project.type === 'professional' ? 'bg-blue-500' : 'bg-green-500'} w-12 rounded-t-lg transition-all duration-700`}
                          style={{ height: `${value}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">Métrique {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Liens externes */}
            <div className="flex flex-wrap gap-4">
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 ${project.type === 'professional' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-lg transition-colors`}
                >
                  <Globe size={18} />
                  <span>Voir le projet</span>
                </a>
              )}
              
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-secondary-800 hover:bg-secondary-900 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Github size={18} />
                  <span>Code source</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Projets similaires */}
        {relatedProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary-800 dark:text-gray-200 mb-4">Projets similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relProj) => (
                <Link 
                  to={`/projets/${relProj.id}`} 
                  key={relProj.id}
                  className={`bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 ${relProj.type === 'professional' ? 'border-blue-500' : 'border-green-500'}`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-secondary-800 dark:text-gray-200">{relProj.title}</h3>
                      <div className={`${relProj.type === 'professional' ? 'bg-blue-500' : 'bg-green-500'} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}>
                        {relProj.id}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">{relProj.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;