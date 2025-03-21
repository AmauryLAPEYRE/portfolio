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
    description: "Application de simulation d’investissement avec DCA (Dollar Cost Averaging). L’utilisateur peut choisir n’importe quelle action (par exemple Nvidia), définir une somme mensuelle (comme 100 €) et indiquer une période (depuis l’année 2000, par exemple) pour visualiser l’évolution de son investissement. Centurion fournit également des indications sur les avantages et les aspects émotionnels liés à la pratique du DCA, afin de sensibiliser l’investisseur à la discipline et à la régularité d’un tel plan d’investissement",
    type: "personal", // Projet personnel
    categories: ['web', 'dev', 'ai'],
    technologies: ["React", "Tailwind CSS", "Chart.js"],
    image: "/api/placeholder/380/220",
    metrics: "Simulateur DCA",
    link: "https://centurion-two.vercel.app/",
    github: "https://github.com/AmauryLAPEYRE/centurion",
    chartData: [85, 80, 90, 75],
    color: "bg-green-500",
    details: {
      problem: "De nombreux particuliers peinent à se projeter dans une stratégie d’investissement à long terme et subissent les fluctuations émotionnelles liées aux variations du marché. Comment rendre concrète la puissance du DCA sur le long terme ?",
      solution: "Un simulateur qui, en quelques clics, calcule comment aurait évolué un investissement progressif (ex. 100 € chaque mois) sur une action donnée depuis une date précise. L’application met en évidence les atouts du DCA, notamment pour lisser les risques et réduire l’impact des biais émotionnels",
      aiAssisted: true,
      aiContribution: "Ce projet a été développé avec le soutien de plusieurs modèles d’IA. L’architecture, la génération de composants React et les visualisations de données ont été guidées par les suggestions de l’IA, permettant de créer un simulateur d’investissement performant sans expertise préalable poussée en développement web."
    }
  },
  {
    id: 3,
    title: "Calendrier de Congés",
    description: "Application de gestion et visualisation des congés et RTT pour une équipe informatique",
    type: "professional", // Projet développé dans un cadre professionnel
    categories: ['web', 'dev', 'support'],
    technologies: ["React", "Tailwind CSS", "Vercel"],
    image: "/api/placeholder/380/220",
    metrics: "Optimisation des processus d'équipe",
    link: "https://calendrier-sigma.vercel.app/",
    github: "https://github.com/AmauryLAPEYRE/calendrier",
    chartData: [90, 85, 80, 95],
    color: "bg-blue-500",
    details: {
      problem: "L'équipe informatique (développeurs, infrastructure, support) gérait les congés payés et RTT dans un fichier Excel partagé, peu intuitif, peu ergonomique et difficilement lisible",
      solution: "Application web interactive pour visualiser et gérer les congés de l'équipe de façon intuitive et claire, avec un design moderne et des codes couleur pour améliorer la lisibilité",
      aiAssisted: true,
      aiContribution: "Cette application a été développée dans le cadre de mon travail avec l'assistance de l'IA. J'ai pu rapidement créer une interface React intuitive et un système de gestion des congés plus efficace que la solution Excel précédente, en optimisant la visualisation des données et l'expérience utilisateur pour l'ensemble de l'équipe informatique."
    }
  }
];