import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, AlertTriangle, Check, Cpu } from 'lucide-react';

const ProfileEditor = () => {
  const { profile, updateProfile, loading, error } = useContent();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Initialiser le formulaire quand les données sont chargées
  React.useEffect(() => {
    if (profile) {
      setFormData({ ...profile });
    }
  }, [profile]);

  // Gestionnaire pour les champs simples
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Gérer les champs imbriqués comme contact.email
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Gestionnaire pour les champs de couleur
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      colors: {
        ...formData.colors,
        [name]: value
      }
    });
  };

  // Gestionnaire pour les champs de liens
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      links: {
        ...formData.links,
        [name]: value
      }
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateProfile(formData);
      setSuccessMessage('Profil mis à jour avec succès !');
      setIsEditing(false);
      
      // Effacer le message après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profil</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Modifier le profil
          </button>
        )}
      </div>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex items-center">
            <Check size={18} className="text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Informations personnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Résumé / À propos</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Coordonnées</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="text"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                <input
                  type="text"
                  name="contact.location"
                  value={formData.contact.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  name="contact.address"
                  value={formData.contact.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Liens</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formData.links.github}
                  onChange={handleLinkChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://github.com/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.links.portfolio}
                  onChange={handleLinkChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com/portfolio"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Personnalisation des couleurs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur principale</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="primary"
                    value={formData.colors.primary}
                    onChange={handleColorChange}
                    className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    name="primary"
                    value={formData.colors.primary}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur secondaire</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="secondary"
                    value={formData.colors.secondary}
                    onChange={handleColorChange}
                    className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    name="secondary"
                    value={formData.colors.secondary}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur d'accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="accent"
                    value={formData.colors.accent}
                    onChange={handleColorChange}
                    className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    name="accent"
                    value={formData.colors.accent}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur de fond</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="background"
                    value={formData.colors.background}
                    onChange={handleColorChange}
                    className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    name="background"
                    value={formData.colors.background}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="#000000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur du texte</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name="text"
                    value={formData.colors.text}
                    onChange={handleColorChange}
                    className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    name="text"
                    value={formData.colors.text}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start gap-6 mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: formData.colors.primary }}
            >
              {formData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{formData.name}</h3>
              <p className="text-gray-600">{formData.title}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">À propos</h4>
              <p className="text-gray-800">{formData.summary}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Contact</h4>
                <ul className="space-y-1">
                  <li className="text-gray-800">{formData.contact.email}</li>
                  <li className="text-gray-800">{formData.contact.phone}</li>
                  <li className="text-gray-800">{formData.contact.location}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Liens</h4>
                <ul className="space-y-1">
                  {formData.links.github && (
                    <li>
                      <a 
                        href={formData.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        GitHub
                      </a>
                    </li>
                  )}
                  {formData.links.portfolio && (
                    <li>
                      <a 
                        href={formData.links.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Portfolio
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Palette de couleurs</h4>
              <div className="flex space-x-3">
                {Object.entries(formData.colors).map(([name, color]) => (
                  <div key={name} className="text-center">
                    <div 
                      className="w-10 h-10 rounded-md mb-1"
                      style={{ backgroundColor: color }}
                    ></div>
                    <p className="text-xs text-gray-500">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditor;