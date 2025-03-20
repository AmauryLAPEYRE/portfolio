// src/components/Footer.js
import React from 'react';
import { Cpu, Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">© 2025 Amaury LAPEYRE</p>
          </div>
          
          <div className="flex items-center bg-primary-500/20 rounded-full px-4 py-2 border border-primary-500/30">
            <Cpu size={16} className="text-primary-400 mr-2" />
            <span className="text-sm text-primary-300">Ce portfolio a été développé avec l'assistance de l'IA</span>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm text-gray-400 mr-2">Réalisé avec</span>
            <Heart size={14} className="text-red-400 mr-1" />
            <span className="text-sm text-gray-400 mr-2">et</span>
            <Code size={14} className="text-blue-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;