import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { Menu, X, User, Briefcase, Code, Award, BookOpen, Heart, Cpu, Settings } from 'lucide-react';

const Navigation = () => {
  const { profile, loading } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  
  // Surveiller la position de défilement pour les effets visuels
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fermer le menu mobile lorsqu'on change de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Style de menu amélioré avec meilleur contraste
  const headerStyle = {
    backgroundColor: scrollPosition > 10 
      ? 'rgba(44, 62, 80, 0.98)' // Couleur secondaire plus foncée et opaque
      : 'rgba(44, 62, 80, 0.9)', // Couleur secondaire semi-transparente
    boxShadow: scrollPosition > 10 
      ? '0 4px 10px rgba(0, 0, 0, 0.15)' 
      : '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };
  
  // Définir les liens de navigation
  const navLinks = [
    { path: '/', label: 'Accueil', icon: <User size={18} /> },
    { path: '/projets', label: 'Projets', icon: <Briefcase size={18} /> },
    { path: '/experience', label: 'Expérience', icon: <Code size={18} /> },
    { path: '/competences', label: 'Compétences', icon: <Award size={18} /> },
    { path: '/formation', label: 'Formation', icon: <BookOpen size={18} /> },
    { path: '/interets', label: 'Centres d\'intérêt', icon: <Heart size={18} /> },
    { path: '/projets-ia', label: 'Projets IA', icon: <Cpu size={18} /> }
  ];

  if (loading || !profile) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-secondary-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="w-40 h-8 bg-secondary-700 rounded animate-pulse"></div>
          <div className="w-64 h-8 bg-secondary-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 text-white py-3" 
      style={headerStyle}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo et nom */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-secondary-800 font-bold
                      transition-all duration-300 group-hover:scale-110 shadow-md"
            style={{ backgroundColor: '#fd9d3e' }}
          >
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {profile.name.split(' ')[0]}
              <span 
                className="transition-colors"
                style={{ color: '#fd9d3e' }}
              > {profile.name.split(' ')[1]}</span>
            </h1>
            <p className="text-xs text-neutral-200 -mt-1">{profile.title}</p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${location.pathname === link.path
                          ? 'text-white bg-primary-500/70 shadow-inner' 
                          : 'text-neutral-100 hover:text-white hover:bg-secondary-400/50'
                        }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Bouton admin */}
          <Link
            to="/login"
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-neutral-700/80 text-neutral-200 hover:text-white hover:bg-neutral-600 transition-colors"
          >
            <Settings size={18} />
          </Link>
        </nav>

        {/* Bouton menu mobile */}
        <button 
          className="md:hidden text-neutral-200 hover:text-white p-1 rounded-md hover:bg-secondary-400/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary-600 shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors
                            ${location.pathname === link.path
                              ? 'text-white bg-primary-500/70' 
                              : 'text-neutral-200 hover:text-white hover:bg-secondary-400/50'
                            }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Lien admin mobile */}
              <Link
                to="/login"
                className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium text-neutral-200 hover:text-white hover:bg-neutral-600 transition-colors"
              >
                <Settings size={18} />
                <span>Administration</span>
              </Link>
            </nav>
            
            {/* Contact rapide mobile */}
            <div className="mt-6 pt-4 border-t border-neutral-700">
              <div className="flex flex-col space-y-3 text-neutral-300 text-sm">
                <a 
                  href={`mailto:${profile.contact.email}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {profile.contact.email}
                </a>
                {profile.contact.phone && (
                  <a 
                    href={`tel:${profile.contact.phone}`}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {profile.contact.phone}
                  </a>
                )}
                {profile.contact.location && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.contact.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;