// src/data/experiences.js
export const experiences = [
  {
    id: 1,
    period: "2022 - 2025",
    company: "DCS EASYWARE",
    location: "Lyon",
    title: "Technicien support informatique",
    details: [
      "Administration des adresses IP sur le DHCP pour les imprimantes",
      "Traitement des incidents sur les imprimantes via serveur d'impression",
      "Paramétrage des téléphones mobiles et fixes avec Mitel",
      "Gestion des utilisateurs sous Office 365 et administration Active Directory",
      "Administration de l'antivirus F-Secure",
      "Masterisation des postes avec Windows",
      "Configuration des équipements réseau (VLAN, switch)",
      "Gestion du parc informatique (Chromebook, PC, Wyse)",
      "Développement de mini-applications avec l'aide de l'IA pour optimiser certains processus clients"
    ],
    color: "bg-orange-400",
    aiAssisted: false
  },
  {
    id: 2,
    period: "2021",
    company: "VIVATICKET",
    location: "Poitiers",
    title: "Technicien support fonctionnel",
    details: [
      "Gestion des demandes / Assistance technique auprès des utilisateurs",
      "Analyse des requêtes SQL en BDD et résolution des anomalies"
    ],
    color: "bg-blue-400",
    aiAssisted: false
  },
  {
    id: 3,
    period: "2019 - 2021",
    company: "KAIRIOS",
    location: "Lyon",
    title: "Développeur web",
    details: [
      "Réalisation de sites vitrines / e-commerce sous WordPress",
      "Développement de logiciel métier en PHP (symfony) - JS",
      "Création et intégration de maquettes web avec Adobe XD"
    ],
    color: "bg-green-400",
    aiAssisted: false  // Changé de true à false pour retirer le badge IA
  }
];