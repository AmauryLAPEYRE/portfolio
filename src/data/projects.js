// src/data/projects.js
export const projects = [
    {
      id: 1,
      title: "TimeTrack",
      description: "Application de suivi du temps et de productivité personnelle",
      categories: ['web', 'dev'],
      technologies: ["HTML", "CSS", "JavaScript"],
      image: "/api/placeholder/380/220",
      metrics: "Projet personnel",
      link: "https://amaurylapeyre.github.io/TimeTrack/",
      github: "https://github.com/AmauryLAPEYRE/TimeTrack",
      chartData: [80, 90, 75, 85],
      color: "bg-blue-500",
      details: {
        problem: "Difficulté à suivre et optimiser son temps quotidien",
        solution: "Interface intuitive permettant de visualiser et analyser l'utilisation du temps",
        aiAssisted: true,
        aiContribution: "Optimisation du code et suggestions d'amélioration de l'UI"
      }
    },
    {
      id: 2,
      title: "Système DHCP",
      description: "Administration et gestion des adresses IP pour les imprimantes",
      categories: ['admin', 'support'],
      technologies: ["DHCP", "Réseau"],
      image: "/api/placeholder/380/220",
      metrics: "Optimisation réseau",
      chartData: [65, 85, 70, 90],
      color: "bg-green-500",
      details: {
        problem: "Gestion manuelle complexe des adresses IP des imprimantes",
        solution: "Automatisation et centralisation de la gestion des adresses IP",
        aiAssisted: false,
        aiContribution: ""
      }
    },
    {
      id: 3,
      title: "Office 365",
      description: "Gestion des utilisateurs et administration Active Directory",
      categories: ['admin', 'support'],
      technologies: ["Office 365", "Active Directory"],
      image: "/api/placeholder/380/220",
      metrics: "Sécurité renforcée",
      chartData: [85, 75, 80, 70],
      color: "bg-purple-500",
      details: {
        problem: "Processus de gestion des utilisateurs inefficace et risques de sécurité",
        solution: "Mise en place de procédures standardisées et renforcement de la sécurité",
        aiAssisted: false,
        aiContribution: ""
      }
    },
    {
      id: 4,
      title: "Sites WordPress",
      description: "Réalisation de sites vitrines et e-commerce",
      categories: ['web', 'dev'],
      technologies: ["WordPress", "HTML/CSS", "PHP"],
      image: "/api/placeholder/380/220",
      metrics: "Expérience KAIRIOS",
      chartData: [70, 85, 75, 90],
      color: "bg-yellow-500",
      details: {
        problem: "Besoin de sites web professionnels et personnalisés pour les clients",
        solution: "Création de sites sur mesure avec WordPress",
        aiAssisted: true,
        aiContribution: "Génération de contenus et aide au SEO"
      }
    },
    {
      id: 5,
      title: "SQL Analyzer",
      description: "Analyse et optimisation de requêtes SQL",
      categories: ['dev', 'support'],
      technologies: ["SQL", "BDD"],
      image: "/api/placeholder/380/220",
      metrics: "Résolution d'anomalies",
      chartData: [60, 80, 75, 85],
      color: "bg-red-500",
      details: {
        problem: "Performances faibles et erreurs dans les requêtes SQL",
        solution: "Outil d'analyse et d'optimisation des requêtes",
        aiAssisted: true,
        aiContribution: "Suggestions d'optimisation et détection des problèmes potentiels"
      }
    },
    {
      id: 6,
      title: "Symfony App",
      description: "Développement d'applications métier en PHP Symfony",
      categories: ['dev', 'web'],
      technologies: ["PHP", "Symfony", "JavaScript"],
      image: "/api/placeholder/380/220",
      metrics: "Solutions sur mesure",
      chartData: [75, 65, 85, 70],
      color: "bg-indigo-500",
      details: {
        problem: "Besoins spécifiques nécessitant des applications sur mesure",
        solution: "Développement d'applications métier avec Symfony",
        aiAssisted: true,
        aiContribution: "Génération de code boilerplate et assistance au débogage"
      }
    },
    {
      id: 7,
      title: "IA Assistant",
      description: "Mini-solution d'assistant virtuel pour automatisation de tâches",
      categories: ['ai', 'dev'],
      technologies: ["Python", "ML"],
      image: "/api/placeholder/380/220",
      metrics: "Projet personnel",
      chartData: [60, 75, 85, 70],
      color: "bg-pink-500",
      details: {
        problem: "Tâches répétitives consommant du temps",
        solution: "Assistant IA pour automatiser les tâches routinières",
        aiAssisted: true,
        aiContribution: "Co-création complète avec des modèles IA"
      }
    }
  ];