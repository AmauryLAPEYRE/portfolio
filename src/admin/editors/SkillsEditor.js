// src/admin/editors/SkillsEditor.js
import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, Plus, X, Edit, Trash, Check, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';

const SkillsEditor = () => {
  const { skills, updateSkills, profile, loading, error } = useContent();
  const [skillGroups, setSkillGroups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGroupIndex, setEditingGroupIndex] = useState(-1);
  const [editingItemIndex, setEditingItemIndex] = useState(-1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState(''); // 'group' ou 'item'
  const [deleteIndices, setDeleteIndices] = useState({ groupIndex: -1, itemIndex: -1 });
  const [successMessage, setSuccessMessage] = useState('');
  const [currentForm, setCurrentForm] = useState({
    categoryName: '',
    skillName: '',
    skillLevel: 75
  });

  // Initialisation des données
  React.useEffect(() => {
    if (skills) {
      setSkillGroups([...skills]);
    }
  }, [skills]);

  // Ajouter un nouveau groupe de compétences
  const addNewGroup = () => {
    setCurrentForm({
      categoryName: '',
      skillName: '',
      skillLevel: 75
    });
    setEditingGroupIndex(skillGroups.length);
    setEditingItemIndex(-1);
    setIsEditing(true);
  };

  // Modifier un groupe existant
  const editGroup = (groupIndex) => {
    setCurrentForm({
      categoryName: skillGroups[groupIndex].category,
      skillName: '',
      skillLevel: 75
    });
    setEditingGroupIndex(groupIndex);
    setEditingItemIndex(-1);
    setIsEditing(true);
  };

  // Ajouter une compétence à un groupe
  const addSkillToGroup = (groupIndex) => {
    setCurrentForm({
      categoryName: skillGroups[groupIndex].category,
      skillName: '',
      skillLevel: 75
    });
    setEditingGroupIndex(groupIndex);
    setEditingItemIndex(-2); // -2 signifie nouvelle compétence
    setIsEditing(true);
  };

  // Modifier une compétence existante
  const editSkill = (groupIndex, itemIndex) => {
    const skill = skillGroups[groupIndex].items[itemIndex];
    setCurrentForm({
      categoryName: skillGroups[groupIndex].category,
      skillName: skill.name,
      skillLevel: skill.level
    });
    setEditingGroupIndex(groupIndex);
    setEditingItemIndex(itemIndex);
    setIsEditing(true);
  };

  // Gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentForm({
      ...currentForm,
      [name]: name === 'skillLevel' ? parseInt(value, 10) : value
    });
  };

  // Préparer la suppression
  const prepareDelete = (type, groupIndex, itemIndex = -1) => {
    setDeleteType(type);
    setDeleteIndices({ groupIndex, itemIndex });
    setShowDeleteConfirm(true);
  };

  // Confirmer la suppression
  const confirmDelete = () => {
    const { groupIndex, itemIndex } = deleteIndices;
    let updatedGroups = [...skillGroups];
    
    if (deleteType === 'group') {
      updatedGroups = updatedGroups.filter((_, index) => index !== groupIndex);
    } else if (deleteType === 'item') {
      updatedGroups[groupIndex].items = updatedGroups[groupIndex].items.filter((_, index) => index !== itemIndex);
    }
    
    setSkillGroups(updatedGroups);
    setShowDeleteConfirm(false);
    saveData(updatedGroups);
  };

  // Réorganiser les compétences (monter/descendre)
  const moveSkill = (groupIndex, itemIndex, direction) => {
    const updatedGroups = [...skillGroups];
    const items = [...updatedGroups[groupIndex].items];
    
    if (direction === 'up' && itemIndex > 0) {
      [items[itemIndex], items[itemIndex - 1]] = [items[itemIndex - 1], items[itemIndex]];
    } else if (direction === 'down' && itemIndex < items.length - 1) {
      [items[itemIndex], items[itemIndex + 1]] = [items[itemIndex + 1], items[itemIndex]];
    }
    
    updatedGroups[groupIndex].items = items;
    setSkillGroups(updatedGroups);
  };

  // Réorganiser les groupes
  const moveGroup = (groupIndex, direction) => {
    const updatedGroups = [...skillGroups];
    
    if (direction === 'up' && groupIndex > 0) {
      [updatedGroups[groupIndex], updatedGroups[groupIndex - 1]] = [updatedGroups[groupIndex - 1], updatedGroups[groupIndex]];
    } else if (direction === 'down' && groupIndex < updatedGroups.length - 1) {
      [updatedGroups[groupIndex], updatedGroups[groupIndex + 1]] = [updatedGroups[groupIndex + 1], updatedGroups[groupIndex]];
    }
    
    setSkillGroups(updatedGroups);
  };

  // Sauvegarder les données
  const saveData = async (dataToSave = skillGroups) => {
    try {
      await updateSkills(dataToSave);
      setSuccessMessage('Compétences mises à jour avec succès !');
      
      // Effacer le message après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour des compétences:', err);
    }
  };

  // Sauvegarder le formulaire
  const saveForm = () => {
    const updatedGroups = [...skillGroups];
    
    // Nouveau groupe
    if (editingGroupIndex === skillGroups.length) {
      updatedGroups.push({
        id: Date.now().toString(),
        category: currentForm.categoryName,
        items: []
      });
    } 
    // Modification d'un groupe existant
    else if (editingItemIndex === -1) {
      updatedGroups[editingGroupIndex].category = currentForm.categoryName;
    } 
    // Nouvelle compétence
    else if (editingItemIndex === -2) {
      updatedGroups[editingGroupIndex].items.push({
        name: currentForm.skillName,
        level: currentForm.skillLevel
      });
    } 
    // Modification d'une compétence existante
    else {
      updatedGroups[editingGroupIndex].items[editingItemIndex] = {
        name: currentForm.skillName,
        level: currentForm.skillLevel
      };
    }
    
    setSkillGroups(updatedGroups);
    setIsEditing(false);
    saveData(updatedGroups);
  };

  // Annuler les modifications
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingGroupIndex(-1);
    setEditingItemIndex(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Compétences</h2>
        {!isEditing && (
          <button
            onClick={addNewGroup}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Ajouter une catégorie</span>
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
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            {editingGroupIndex === skillGroups.length 
              ? 'Ajouter une catégorie de compétences' 
              : editingItemIndex === -1 
                ? `Modifier la catégorie "${skillGroups[editingGroupIndex]?.category}"`
                : editingItemIndex === -2
                  ? `Ajouter une compétence à "${skillGroups[editingGroupIndex]?.category}"`
                  : `Modifier la compétence "${skillGroups[editingGroupIndex]?.items[editingItemIndex]?.name}"`
            }
          </h3>
          
          {/* Formulaire pour groupe */}
          {(editingItemIndex === -1 || editingGroupIndex === skillGroups.length) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la catégorie</label>
              <input
                type="text"
                name="categoryName"
                value={currentForm.categoryName}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ex: Développement"
                required
              />
            </div>
          )}

          {/* Formulaire pour compétence */}
          {(editingItemIndex >= 0 || editingItemIndex === -2) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la compétence</label>
                <input
                  type="text"
                  name="skillName"
                  value={currentForm.skillName}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="ex: JavaScript"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau ({currentForm.skillLevel}%)
                </label>
                <input
                  type="range"
                  name="skillLevel"
                  min="1"
                  max="100"
                  value={currentForm.skillLevel}
                  onChange={handleFormChange}
                  className="w-full"
                />
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${currentForm.skillLevel}%`, backgroundColor: profile?.colors?.primary || '#fd9d3e' }}
                      className="shadow-none flex flex-col justify-center rounded transition-all duration-300"
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
              <span>Annuler</span>
            </button>
            <button
              type="button"
              onClick={saveForm}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {skillGroups.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Aucune compétence n'a encore été ajoutée.</p>
              <button
                onClick={addNewGroup}
                className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Ajouter votre première catégorie de compétences</span>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {skillGroups.map((group, groupIndex) => (
                <div 
                  key={group.id || groupIndex} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-800">{group.category}</h3>
                      <div className="ml-4 flex space-x-1">
                        <button
                          onClick={() => editGroup(groupIndex)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Modifier la catégorie"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => prepareDelete('group', groupIndex)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          title="Supprimer la catégorie"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => moveGroup(groupIndex, 'up')}
                        disabled={groupIndex === 0}
                        className={`p-1 ${groupIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800'}`}
                        title="Déplacer vers le haut"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveGroup(groupIndex, 'down')}
                        disabled={groupIndex === skillGroups.length - 1}
                        className={`p-1 ${groupIndex === skillGroups.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800'}`}
                        title="Déplacer vers le bas"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button
                        onClick={() => addSkillToGroup(groupIndex)}
                        className="ml-2 px-2 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    {group.items && group.items.length > 0 ? (
                      <div className="space-y-4">
                        {group.items.map((skill, itemIndex) => (
                          <div key={itemIndex} className="group">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <span className="text-gray-800">{skill.name}</span>
                                <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                  <button
                                    onClick={() => editSkill(groupIndex, itemIndex)}
                                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                    title="Modifier la compétence"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => prepareDelete('item', groupIndex, itemIndex)}
                                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                    title="Supprimer la compétence"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => moveSkill(groupIndex, itemIndex, 'up')}
                                  disabled={itemIndex === 0}
                                  className={`p-0.5 ${itemIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                                  title="Déplacer vers le haut"
                                >
                                  <ChevronUp size={14} />
                                </button>
                                <button
                                  onClick={() => moveSkill(groupIndex, itemIndex, 'down')}
                                  disabled={itemIndex === group.items.length - 1}
                                  className={`p-0.5 ${itemIndex === group.items.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                                  title="Déplacer vers le bas"
                                >
                                  <ChevronDown size={14} />
                                </button>
                                <span className="text-gray-500 text-sm w-8 text-right">{skill.level}%</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${skill.level}%`,
                                  backgroundColor: profile?.colors?.primary || '#fd9d3e'
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-2 italic">
                        Aucune compétence dans cette catégorie
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-700 mb-6">
              {deleteType === 'group' 
                ? `Êtes-vous sûr de vouloir supprimer la catégorie "${skillGroups[deleteIndices.groupIndex].category}" et toutes ses compétences ?` 
                : `Êtes-vous sûr de vouloir supprimer la compétence "${skillGroups[deleteIndices.groupIndex].items[deleteIndices.itemIndex].name}" ?`
              }
              <br /><br />
              Cette action ne peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsEditor;