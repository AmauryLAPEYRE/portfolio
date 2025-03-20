// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Navigation from '../components/Navigation';
import { ExternalLink, Briefcase, Code, Book, Award, Heart, Cpu, Github, Clock } from 'lucide-react';

const Home = () => {
  const { profile, projects, experiences, skills, loading } = useContent();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedElements, setAnimatedElements] = useState([]);
  
  // Tracking scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animation for elements entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimatedElements(prev => [...prev, entry.target.id]);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-secondary-700 to-secondary-800 rounded-xl shadow-xl overflow-hidden mt-4
                      transform hover:scale-[1.01] transition-all duration-300">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <h1 className="text-4xl font-bold text-white mb-4 animate-on-scroll" id="hero-title">
                Bonjour, je suis <span className="text-primary-500">{profile.name.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-300 text-xl mb-6 animate-on-scroll" id="hero-subtitle">
                {profile.title}
              </p>
              <p className="text-gray-400 mb-8 animate-on-scroll" id="hero-desc">
                Ce portfolio démontre comment, en tant que technicien support chez DCS EASYWARE, j'utilise l'intelligence artificielle pour développer des solutions logicielles sans expertise en programmation. Une approche qui pourrait être valorisée auprès de nos clients.
              </p>
              <div className="flex flex-wrap gap-4 animate-on-scroll" id="hero-buttons">
                {profile.links && profile.links.github && (
                  <a 
                    href={profile.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-secondary-600 hover:bg-secondary-500 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                )}
                {profile.links && profile.links.portfolio && (
                  <a 
                    href={profile.links.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                  >
                    <Clock size={18} />
                    TimeTrack
                  </a>
                )}
                <Link
                  to="/projets"
                  className="bg-secondary-500 hover:bg-secondary-400 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors border border-secondary-400"
                >
                  <Briefcase size={18} />
                  Voir mes projets
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 bg-secondary-600 flex items-center justify-center p-8">
              <div className="text-center">
                <div 
                  className="rounded-full w-32 h-32 mx-auto flex items-center justify-center text-secondary-900 text-4xl font-bold mb-4
                         transform hover:rotate-12 transition-transform duration-500 bg-primary-500"
                >
                  {profile.name.charAt(0)}
                </div>
                <div className="text-white space-y-2">
                  {profile.contact && (
                    <>
                      {profile.contact.location && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-300">{profile.contact.location}</span>
                        </div>
                      )}
                      {profile.contact.email && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-300">{profile.contact.email}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8 animate-on-scroll" id="stats-grid">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-primary-500">
            <div className="flex items-center mb-4">
              <Briefcase size={24} className="text-primary-500 mr-3" />
              <h3 className="font-bold text-lg dark:text-white">Expérience</h3>
            </div>
            <p className="text-3xl font-bold text-secondary-800 dark:text-white">5+ ans</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Support IT & Développement</p>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-secondary-500">
            <div className="flex items-center mb-4">
              <Code size={24} className="text-secondary-500 mr-3" />
              <h3 className="font-bold text-lg dark:text-white">Développement</h3>
            </div>
            <p className="text-3xl font-bold text-secondary-800 dark:text-white">Full-stack</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Web & Applications</p>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-primary-500">
            <div className="flex items-center mb-4">
              <Award size={24} className="text-primary-500 mr-3" />
              <h3 className="font-bold text-lg dark:text-white">Support</h3>
            </div>
            <p className="text-3xl font-bold text-secondary-800 dark:text-white">Expert</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Systèmes & Réseaux</p>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-secondary-500">
            <div className="flex items-center mb-4">
              <Book size={24} className="text-secondary-500 mr-3" />
              <h3 className="font-bold text-lg dark:text-white">Formation</h3>
            </div>
            <p className="text-3xl font-bold text-secondary-800 dark:text-white">Licence</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Développeur Full Stack</p>
          </div>
        </div>
        
        {/* Meta Portfolio Section - Comment ce portfolio a été créé */}
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full">
              <Cpu size={24} className="text-primary-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-secondary-800 dark:text-white mb-3">
                Ce portfolio est aussi un projet IA
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                En parfaite cohérence avec sa mission, ce portfolio est lui-même un exemple de développement assisté par IA. 
                Toute sa structure, son design et son code ont été créés grâce à une collaboration entre un technicien support 
                et des modèles d'IA comme Claude et ChatGPT.
              </p>
              
              <div className="bg-secondary-50 dark:bg-secondary-700/30 p-4 rounded-lg border-l-4 border-primary-500">
                <h3 className="font-bold text-secondary-700 dark:text-gray-200 mb-2">Processus de création</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
                  <li>Architecture et conception guidées par l'IA</li>
                  <li>Génération des composants React et de la structure de l'application</li>
                  <li>Design responsive avec Tailwind CSS suggéré par l'IA</li>
                  <li>Debugging et optimisation assistés</li>
                  <li>Contenu et textes co-rédigés avec l'IA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 my-8 animate-on-scroll" id="featured-projects">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-800 dark:text-white">Projets à la une</h2>
              <Link 
                to="/projets"
                className="text-primary-500 hover:text-primary-600 flex items-center gap-1 transition-colors"
              >
                Voir tous les projets
                <ExternalLink size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map(project => (
                <Link 
                  key={project.id} 
                  to={`/projets/${project.id}`}
                  className="bg-gray-50 dark:bg-secondary-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer
                            transform hover:scale-[1.02] transition-transform duration-300 border-l-4 border-primary-500"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-secondary-800 dark:text-white">{project.title}</h3>
                        <div className="flex gap-2 mt-1">
                          {project.technologies && project.technologies.map((tech, index) => (
                            <span key={index} className="text-xs text-gray-500 dark:text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md text-white">
                        <span className="text-sm font-medium">
                          {project.id}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Résultats</p>
                        <p className="text-lg font-bold text-secondary-800 dark:text-white">{project.metrics}</p>
                      </div>
                    </div>

                    {project.link && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-600">
                        <span 
                          className="text-secondary-500 hover:text-secondary-600 dark:text-secondary-400 dark:hover:text-secondary-300 text-sm font-medium flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          Voir le projet
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Featured Experience */}
        {experiences && experiences.length > 0 && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-800 dark:text-white">Expérience récente</h2>
              <Link 
                to="/experience"
                className="text-primary-500 hover:text-primary-600 flex items-center gap-1 transition-colors"
              >
                Voir toutes les expériences
                <ExternalLink size={16} />
              </Link>
            </div>
            
            <div className="bg-gray-50 dark:bg-secondary-700 rounded-xl p-6 border-l-4 border-primary-500">
              <div className="flex items-start gap-4">
                <div className="bg-primary-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">{experiences[0].company}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{experiences[0].title}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>{experiences[0].period}</span>
                      <span className="text-gray-400 dark:text-gray-500">|</span>
                      <span>{experiences[0].location}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 mt-4">
                    {experiences[0].details.slice(0, 3).map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <div className="min-w-4 mt-1.5 mr-3">
                          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Skills Overview */}
        {skills && skills.length > 0 && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-800 dark:text-white">Compétences clés</h2>
              <Link 
                to="/competences"
                className="text-primary-500 hover:text-primary-600 flex items-center gap-1 transition-colors"
              >
                Voir toutes les compétences
                <ExternalLink size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.slice(0, 2).map((skillGroup, index) => (
                <div key={index} className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg border-l-4 border-primary-500">
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-3">{skillGroup.category}</h3>
                  <div className="space-y-3">
                    {skillGroup.items.slice(0, 3).map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-secondary-600 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-primary-500" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI Section Highlight */}
        <div className="bg-gradient-to-r from-secondary-700 to-secondary-800 rounded-xl shadow-md p-6 my-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-secondary-600 bg-opacity-50 p-3 rounded-full">
              <Cpu size={28} className="text-primary-500" />
            </div>
            <h2 className="text-2xl font-bold">L'IA comme co-développeur</h2>
          </div>
          
          <p className="text-gray-200 mb-6">
            Découvrez comment un technicien support peut développer des applications professionnelles avec l'assistance de l'IA, ouvrant de nouvelles perspectives stratégiques pour DCS EASYWARE.
          </p>
          
          <Link 
            to="/projets-ia"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-colors"
          >
            Explorer cette approche innovante
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;