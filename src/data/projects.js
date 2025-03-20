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
        aiContribution: "Cette application a été entièrement développée avec l'assistance de l'IA, qui a généré le code de base, suggéré des fonctionnalités et aidé à résoudre les bugs. Sans connaissance approfondie de JavaScript, j'ai pu créer une application complète et fonctionnelle."
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
        problem: "Gestion manuelle complexe des adresses IP des imprimantes chez un client",
        solution: "Outil d'automatisation et centralisation de la gestion des adresses IP",
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
        problem: "Processus de gestion des utilisateurs inefficace et risques de sécurité chez un client",
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
        aiContribution: "L'IA a permis de générer des sections entières de code CSS et PHP sans expertise approfondie, ainsi que d'optimiser le contenu SEO. Cette approche a considérablement accéléré le développement et amélioré la qualité finale."
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
        problem: "Performances faibles et erreurs dans les requêtes SQL chez un client",
        solution: "Outil d'analyse et d'optimisation des requêtes",
        aiAssisted: true,
        aiContribution: "En tant que technicien support sans expertise approfondie en SQL, l'IA m'a permis d'analyser et d'optimiser des requêtes complexes, identifiant des problèmes que je n'aurais pas pu détecter seul. L'outil créé a permis d'améliorer les performances de la base de données du client de manière significative."
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
        problem: "Besoins spécifiques d'un client nécessitant des applications sur mesure",
        solution: "Développement d'applications métier avec Symfony",
        aiAssisted: true,
        aiContribution: "Sans connaissance approfondie du framework Symfony, j'ai pu développer une application complète grâce à l'IA qui m'a guidé à chaque étape. Elle a généré la structure, les contrôleurs, et m'a aidé à comprendre les concepts clés. Ce qui aurait pris des mois d'apprentissage a été réalisé en quelques semaines."
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
        aiContribution: "Ce projet démontre le potentiel maximal de l'IA comme co-développeur. En connaissant seulement les bases de Python, j'ai développé un assistant qui automatise plusieurs tâches répétitives. L'IA a généré 90% du code, expliqué les concepts avancés et suggéré des améliorations que je n'aurais jamais pu concevoir seul."
      }
    }
  ];