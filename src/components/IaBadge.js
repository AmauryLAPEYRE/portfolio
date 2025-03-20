// src/components/IaBadge.js
import React from 'react';
import { Cpu } from 'lucide-react';

const IaBadge = ({ size = 'sm', text = 'Développé avec IA', pulse = true }) => {
  // Déterminer les classes en fonction de la taille
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1.5'
  };
  
  // Calculer la taille de l'icône
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 16 : 18;
  
  // Classes de base et conditionnelles
  const baseClasses = 'inline-flex items-center gap-1 rounded-full text-white font-medium';
  const animationClass = pulse ? 'animate-pulse-accent' : '';
  const bgColorClass = 'bg-accent'; // Utilise var(--accent) défini dans notre CSS
  
  return (
    <div className="relative inline-block">
      <span className={`${baseClasses} ${sizeClasses[size]} ${bgColorClass} ${animationClass}`}
            style={{ 
              animation: pulse ? 'pulse-accent 2s infinite' : 'none',
              backgroundColor: '#3182CE' // Bleu électrique
            }}>
        <Cpu size={iconSize} />
        {text}
      </span>
      {size !== 'sm' && (
        <span className="absolute -bottom-6 left-0 right-0 text-xs text-center text-gray-500 dark:text-gray-400">
          Technicien ⟶ Développeur
        </span>
      )}
    </div>
  );
};

export default IaBadge;