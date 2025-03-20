// src/data/projects.js
export const projects = [
  {
    id: 1,
    title: "TimeTrack",
    description: "Application de suivi et calcul automatique des heures supplémentaires pour les RH",
    type: "professional", // Projet développé dans un cadre professionnel
    categories: ['web', 'dev', 'support'],
    technologies: ["HTML", "CSS", "JavaScript", "Excel Automation"],
    image: "/api/placeholder/380/220",
    metrics: "Optimisation RH pour client",
    link: "https://amaurylapeyre.github.io/TimeTrack/",
    github: "https://github.com/AmauryLAPEYRE/TimeTrack",
    chartData: [80, 90, 75, 85],
    color: "bg-blue-500",
    details: {
      problem: "Les RH d'un client passaient un temps considérable à calculer manuellement les heures supplémentaires dans des tableaux Excel partagés, source d'erreurs et de problèmes quand les formules étaient modifiées accidentellement",
      solution: "Application web qui automatise entièrement le calcul des heures supplémentaires sur la base des contrats et génère automatiquement un fichier Excel final avec les résultats précis",
      aiAssisted: true,
      aiContribution: "Cette application a été développée dans le cadre de mon travail avec l'assistance de l'IA. Le code pour l'automatisation des calculs complexes et la génération du fichier Excel a été élaboré avec l'aide de l'IA, permettant de livrer rapidement une solution robuste sans expertise approfondie en JavaScript et dans les APIs Excel."
    }
  },
  {
    id: 2,
    title: "Centurion",
    description: "Application de gestion de budget et suivi financier personnel avec visualisation de données",
    type: "personal", // Projet personnel
    categories: ['web', 'dev', 'ai'],
    technologies: ["React", "Tailwind CSS", "Chart.js"],
    image: "/api/placeholder/380/220",
    metrics: "Gestion financière personnelle",
    link: "https://centurion-two.vercel.app/",
    github: "https://github.com/AmauryLAPEYRE/centurion",
    chartData: [85, 80, 90, 75],
    color: "bg-green-500",
    details: {
      problem: "Difficulté à suivre et gérer ses finances personnelles efficacement",
      solution: "Interface intuitive avec tableaux de bord pour visualiser et gérer son budget personnel",
      aiAssisted: true,
      aiContribution: "Ce projet personnel a été développé avec l'assistance de plusieurs modèles d'IA. L'architecture de l'application, les composants React et les visualisations de données ont été générés avec l'aide de l'IA, me permettant de créer une application de gestion financière sophistiquée sans expertise préalable en React."
    }
  }
  
  /* 
  Structure pour ajouter de nouveaux projets :
  
  PROJET PROFESSIONNEL:
  {
    id: X,
    title: "Nom du projet",
    description: "Brève description",
    type: "professional", // Important: indiquer qu'il s'agit d'un projet professionnel
    categories: ['category1', 'category2'],
    technologies: ["Tech1", "Tech2"],
    image: "/api/placeholder/380/220",
    metrics: "Métrique principale",
    link: "https://lien.com",
    github: "https://github.com/lien",
    chartData: [valeur1, valeur2, valeur3, valeur4],
    color: "bg-color-500",
    details: {
      problem: "Problématique client",
      solution: "Solution apportée pour le client",
      aiAssisted: true/false,
      aiContribution: "Description montrant comment l'IA a aidé à développer cette solution"
    }
  }
  
  PROJET PERSONNEL:
  {
    id: Y,
    title: "Nom du projet",
    description: "Brève description",
    type: "personal", // Important: indiquer qu'il s'agit d'un projet personnel
    categories: ['category1', 'category2'],
    technologies: ["Tech1", "Tech2"],
    image: "/api/placeholder/380/220",
    metrics: "Métrique principale",
    link: "https://lien.com",
    github: "https://github.com/lien",
    chartData: [valeur1, valeur2, valeur3, valeur4],
    color: "bg-color-500",
    details: {
      problem: "Problématique personnelle",
      solution: "Solution personnelle",
      aiAssisted: true/false,
      aiContribution: "Description montrant comment l'IA a aidé sur ce projet personnel"
    }
  }
  */
];