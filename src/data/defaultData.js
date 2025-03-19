// src/data/defaultData.js

/**
 * Données par défaut du portfolio
 * Ces données seront utilisées lors de la première initialisation
 * et peuvent être restaurées par l'utilisateur
 */
const defaultData = {
    // Informations du profil
    profile: {
      name: "Amaury LAPEYRE",
      title: "Technicien informatique | Développeur",
      avatar: "", // URL de l'avatar ou initiales
      contact: {
        email: "amaury_lapeyre@hotmail.fr",
        phone: "06 17 82 61 99",
        location: "Lyon, France",
        address: "108 Grande Rue, 69600 Oullins"
      },
      summary: "Actuellement en poste chez un client final, je suis à la recherche de nouvelles opportunités. Passionné par l'informatique et le développement, je combine des compétences techniques en support IT, administration système et développement web pour créer des solutions efficaces.",
      links: {
        github: "https://github.com/AmauryLAPEYRE",
        portfolio: "https://amaurylapeyre.github.io/TimeTrack/"
      },
      colors: {
        primary: "#fd9d3e", // Orange
        secondary: "#3b82f6", // Bleu
        accent: "#10b981", // Vert
        background: "#1a202c", // Fond sombre
        text: "#ffffff" // Texte blanc
      }
    },
  
    // Projets
    projects: [
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
    ],
  
    // Expériences professionnelles
    experiences: [
      {
        id: 1,
        period: "2022 - 2024",
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
          "Gestion du parc informatique (Chromebook, PC, Wyse)"
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
        aiAssisted: true,
        aiDetails: "Assistance pour l'optimisation du code et génération de contenus"
      }
    ],
  
    // Formation
    education: [
      {
        id: 1,
        year: "2021",
        school: "IT Akademy",
        title: "Licence - développeur full stack",
        color: "bg-purple-400",
        details: "Formation complète au développement web et applications"
      },
      {
        id: 2,
        year: "2018",
        school: "IT Akademy",
        title: "Formation initiale - Prépa développeur full stack",
        color: "bg-indigo-400",
        details: "Préparation aux fondamentaux du développement"
      },
      {
        id: 3,
        year: "2012",
        school: "Lycée Auguste Perret",
        title: "Baccalauréat Professionnel - Technicien menuisier agenceur",
        color: "bg-teal-400",
        details: "Formation technique aux métiers du bois"
      }
    ],
  
    // Compétences
    skills: [
      { 
        id: 1,
        category: "Outils", 
        items: [
          { name: "Office 365", level: 90 },
          { name: "Active Directory", level: 85 },
          { name: "SCCM", level: 80 },
          { name: "GLPI - JIRA - TechExcel", level: 75 }
        ] 
      },
      { 
        id: 2,
        category: "Développement", 
        items: [
          { name: "HTML / CSS", level: 85 },
          { name: "JavaScript", level: 80 },
          { name: "SQL", level: 75 },
          { name: "Bash", level: 70 },
          { name: "PHP (Symfony)", level: 75 }
        ] 
      },
      { 
        id: 3,
        category: "Systèmes", 
        items: [
          { name: "Windows", level: 90 },
          { name: "Linux", level: 75 }
        ] 
      },
      { 
        id: 4,
        category: "Langues", 
        items: [
          { name: "Français", level: 100 },
          { name: "Anglais", level: 75 },
          { name: "Espagnol", level: 40 }
        ] 
      },
      { 
        id: 5,
        category: "Soft Skills", 
        items: [
          { name: "Travail en équipe", level: 90 },
          { name: "Communication", level: 85 },
          { name: "Organisation", level: 85 }
        ] 
      }
    ],
  
    // Centres d'intérêt
    interests: [
      {
        id: 1,
        name: "Musique",
        icon: "music",
        details: "Composition de musique électronique avec FL Studio et Piano",
        color: "bg-purple-500"
      },
      {
        id: 2,
        name: "Sport",
        icon: "dumbbell",
        details: "Fitness dans un club de sport",
        color: "bg-green-500"
      },
      {
        id: 3,
        name: "Développement",
        icon: "code",
        details: "Création de mini-solutions pour résoudre des problématiques spécifiques",
        color: "bg-blue-500"
      },
      {
        id: 4,
        name: "Intelligence Artificielle",
        icon: "cpu",
        details: "Exploration des applications pratiques de l'IA",
        color: "bg-yellow-500"
      }
    ],
  
    // Section spéciale IA
    aiSection: {
      title: "Mes Projets assistés par IA",
      description: "Je m'intéresse particulièrement à l'intégration de l'intelligence artificielle dans mes projets. Voici comment j'utilise les outils d'IA pour améliorer mon travail et créer des solutions innovantes, même sans être un expert en développement.",
      benefits: [
        "Accélération du développement grâce à la génération de code par IA",
        "Amélioration de l'UI/UX avec des suggestions intelligentes",
        "Optimisation des performances par analyse automatique du code",
        "Création de contenus et documentation assistée",
        "Résolution plus rapide des problèmes complexes"
      ],
      tools: [
        {
          name: "Assistants IA de codage",
          description: "Utilisation d'outils comme GitHub Copilot et Claude pour générer du code et accélérer le développement",
          icon: "code"
        },
        {
          name: "Générateurs d'UI",
          description: "Création rapide d'interfaces utilisateur avec l'aide de l'IA",
          icon: "layout"
        },
        {
          name: "Outils d'analyse de code",
          description: "Détection des problèmes potentiels et suggestions d'amélioration",
          icon: "search"
        },
        {
          name: "Automatisation de tâches",
          description: "Scripts et workflows automatisés avec assistance IA",
          icon: "repeat"
        }
      ],
      showcase: {
        title: "Ce que l'IA permet de réaliser sans expertise approfondie",
        description: "L'IA démocratise le développement en permettant à chacun de créer des solutions sophistiquées sans nécessiter des années d'expertise technique. Voici comment j'en tire parti:",
        examples: [
          "Création de sites web complets avec interactions complexes",
          "Développement d'applications métier répondant à des besoins spécifiques",
          "Optimisation de bases de données et requêtes SQL",
          "Automatisation de tâches répétitives pour gagner du temps",
          "Création d'interfaces utilisateur intuitives et attractives"
        ]
      },
      callToAction: {
        title: "Intéressé par l'utilisation de l'IA dans vos projets?",
        description: "Je serais ravi de discuter de la façon dont nous pourrions utiliser l'IA pour résoudre vos défis spécifiques et créer des solutions adaptées à vos besoins.",
        buttonText: "Discutons de votre projet",
        buttonLink: "#contact"
      }
    }
  };
  
  export default defaultData;