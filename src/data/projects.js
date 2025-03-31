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
    description: "Application de simulation d'investissement avec DCA (Dollar Cost Averaging). L'utilisateur peut choisir n'importe quelle action (par exemple Nvidia), définir une somme mensuelle (comme 100 €) et indiquer une période (depuis l'année 2000, par exemple) pour visualiser l'évolution de son investissement. Centurion fournit également des indications sur les avantages et les aspects émotionnels liés à la pratique du DCA, afin de sensibiliser l'investisseur à la discipline et à la régularité d'un tel plan d'investissement",
    type: "personal", // Projet personnel
    categories: ['web', 'dev', 'ai'],
    technologies: ["React", "Tailwind CSS", "Chart.js"],
    image: "/api/placeholder/380/220",
    metrics: "Simulateur DCA",
    link: "https://centurion-two.vercel.app/",
    github: "https://github.com/AmauryLAPEYRE/centurion",
    color: "bg-green-500",
    details: {
      problem: "De nombreux particuliers peinent à se projeter dans une stratégie d'investissement à long terme et subissent les fluctuations émotionnelles liées aux variations du marché. Comment rendre concrète la puissance du DCA sur le long terme ?",
      solution: "Un simulateur qui, en quelques clics, calcule comment aurait évolué un investissement progressif (ex. 100 € chaque mois) sur une action donnée depuis une date précise. L'application met en évidence les atouts du DCA, notamment pour lisser les risques et réduire l'impact des biais émotionnels",
      aiAssisted: true,
      aiContribution: "Ce projet a été développé avec le soutien de plusieurs modèles d'IA. L'architecture, la génération de composants React et les visualisations de données ont été guidées par les suggestions de l'IA, permettant de créer un simulateur d'investissement performant sans expertise préalable poussée en développement web."
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
    color: "bg-blue-500",
    details: {
      problem: "L'équipe informatique (développeurs, infrastructure, support) gérait les congés payés et RTT dans un fichier Excel partagé, peu intuitif, peu ergonomique et difficilement lisible",
      solution: "Application web interactive pour visualiser et gérer les congés de l'équipe de façon intuitive et claire, avec un design moderne et des codes couleur pour améliorer la lisibilité",
      aiAssisted: true,
      aiContribution: "Cette application a été développée dans le cadre de mon travail avec l'assistance de l'IA. J'ai pu rapidement créer une interface React intuitive et un système de gestion des congés plus efficace que la solution Excel précédente, en optimisant la visualisation des données et l'expérience utilisateur pour l'ensemble de l'équipe informatique."
    }
  },
  {
    id: 4,
    title: "Abona",
    description: "Plateforme de partage d'abonnements avec tarification proratisée flexible permettant aux utilisateurs d'accéder à des services premium (Netflix, Spotify, Disney+, etc.) pour la durée exacte souhaitée, de quelques jours à plusieurs mois",
    type: "personal", // Projet personnel
    categories: ['web', 'dev', 'ai'],
    technologies: ["React", "Firebase", "Tailwind CSS", "Stripe", "Cloud Functions"],
    image: "/api/placeholder/380/220",
    metrics: "Plateforme SaaS complète",
    link: "https://abona-8d0c8.web.app/",
    github: "https://github.com/AmauryLAPEYRE/abona",
    color: "bg-green-500",
    details: {
      problem: "Les abonnements aux services premium (streaming, musique, productivité) sont coûteux pour une personne seule, mais le partage d'abonnements traditionnel manque de flexibilité, obligeant souvent à s'engager pour des périodes fixes d'un mois ou plus",
      solution: "Une plateforme permettant aux utilisateurs de choisir exactement la durée d'abonnement souhaitée avec une tarification proratisée intelligente. Le système calcule automatiquement le prix en fonction de la durée choisie et fournit un accès instantané après paiement",
      aiAssisted: true,
      aiContribution: "Ce projet complexe a été développé avec l'assistance de l'IA pour plusieurs aspects critiques: l'architecture Firebase, l'intégration de Stripe pour les paiements, la mise en place des Cloud Functions, et l'implémentation de l'algorithme de tarification proratisée. L'IA a permis de créer rapidement une plateforme SaaS complète incluant gestion des utilisateurs, paiements sécurisés et tableau de bord administrateur."
    }
  },
  {
    id: 5,
    title: "Innovations Techniques Hors Périmètre",
    description: "Collection d'outils autonomes développés par initiative personnelle pour résoudre des problèmes quotidiens et optimiser le travail des utilisateurs et de l'équipe support",
    type: "professional",
    categories: ['support', 'dev', 'admin'],
    technologies: ["Python", "PowerShell", "VBA", "Bash", "Active Directory", "Office 365"],
    image: "/api/placeholder/380/220",
    metrics: "Initiative personnelle", // Métrique qualitative plutôt que quantitative
    link: "", // Pas de lien car outils internes
    github: "", // Pas de repo GitHub
    color: "bg-blue-500",
    details: {
      problem: "En tant que technicien support, j'ai constaté de nombreuses tâches répétitives et fastidieuses qui n'avaient pas de solution existante, mais qui impactaient significativement la productivité des utilisateurs et de l'équipe IT. Les développeurs n'avaient pas le temps de traiter ces 'petits problèmes', pourtant très impactants au quotidien.",
      solution: "J'ai pris l'initiative d'aller au-delà de mon périmètre officiel en créant une collection d'outils ciblés pour automatiser et simplifier ces tâches. Chaque outil a été développé en réponse à un besoin spécifique observé sur le terrain, en utilisant la technologie la plus adaptée à chaque situation.",
      aiAssisted: true,
      aiContribution: "L'IA a joué un rôle essentiel dans le développement de ces outils, me permettant de créer des solutions techniques complexes malgré l'absence d'expertise approfondie dans certains langages comme le VBA ou Python. Grâce à l'assistance de l'IA, j'ai pu rapidement comprendre les APIs nécessaires, structurer le code efficacement et résoudre les problèmes techniques rencontrés.",
      tools: [
        {
          name: "Outlook Multi-PDF Printer",
          tech: "VBA Outlook",
          description: "Bouton personnalisé pour Outlook permettant d'imprimer automatiquement tous les PDF attachés à un email en un seul clic, éliminant le processus fastidieux d'ouverture et d'impression manuelle de chaque pièce jointe"
        },
        {
          name: "Printer Profile Sync",
          tech: "Bash",
          description: "Script exécutable depuis le bureau qui détecte et synchronise automatiquement toutes les imprimantes disponibles sur le profil de l'utilisateur, résolvant les problèmes récurrents de visibilité des imprimantes"
        },
        {
          name: "Print Monitoring System",
          tech: "Python",
          description: "Outil de surveillance des serveurs d'impression qui détecte et signale les impressions non autorisées pendant les heures non-ouvrées, permettant une meilleure gestion des coûts et de la sécurité"
        },
        {
          name: "AD User Creator GUI",
          tech: "Python/Tkinter",
          description: "Interface graphique simplifiant la création de comptes utilisateurs dans Active Directory et leur synchronisation avec Office 365, transformant un processus complexe en quelques clics intuitifs"
        },
        {
          name: "Client Inventory Tool",
          tech: "PowerShell",
          description: "Script qui collecte et formatte automatiquement les informations d'inventaire du parc informatique client pour faciliter les audits et la planification des mises à jour"
        },
        {
          name: "Email Auto-Sorter",
          tech: "VBA Outlook",
          description: "Système intelligent de tri automatique des emails basé sur le contenu et l'expéditeur, permettant une organisation plus efficace de la boîte de réception selon les priorités établies"
        }
      ],
      impact: [
        "Simplification de nombreux processus manuels répétitifs pour les utilisateurs",
        "Augmentation de la satisfaction des utilisateurs grâce à des solutions rapides à leurs problèmes quotidiens",
        "Démonstration de la valeur ajoutée qu'un technicien support peut apporter au-delà de son périmètre traditionnel",
        "Réorientation de l'équipe IT vers des tâches à plus forte valeur ajoutée",
        "Mise en place d'une culture d'innovation et d'initiative au sein de l'équipe support"
      ]
    }
  }
];