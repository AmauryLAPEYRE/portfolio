# Portfolio Personnel avec Panneau d'Administration

Ce projet est un portfolio personnel moderne et interactif avec un panneau d'administration intégré, permettant une gestion facile du contenu sans avoir à modifier le code source.

![Portfolio Screenshot](screenshot.png)

## 🚀 Fonctionnalités

- **Design moderne et responsive** adapté à tous les appareils
- **Panneau d'administration** sécurisé pour mettre à jour le contenu
- **Animations et transitions** fluides pour une meilleure expérience utilisateur
- **Section dédiée aux projets IA** mettant en valeur l'utilisation de l'IA dans le développement
- **Intégration Firebase** pour l'authentification et le stockage des données
- **Thème personnalisable** avec des couleurs ajustables
- **Mode hors ligne** avec stockage local (fallback si Firebase n'est pas disponible)

## 🛠️ Technologies Utilisées

- **React** - Framework JavaScript pour l'interface utilisateur
- **Firebase** - Authentification, base de données (Firestore) et hébergement
- **Tailwind CSS** - Framework CSS pour le design et la responsive
- **React Router** - Navigation entre les pages
- **Lucide React** - Icônes modernes et légères

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Compte Firebase (pour le déploiement et le stockage en ligne)

## 💻 Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/AmauryLAPEYRE/portfolio.git
cd portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Firebase**
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez vos identifiants Firebase :
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Démarrer en mode développement**
```bash
npm start
```

## 🚢 Déploiement avec Firebase

1. **Construire l'application pour la production**
```bash
npm run build
```

2. **Installer Firebase CLI** (si ce n'est pas déjà fait)
```bash
npm install -g firebase-tools
```

3. **Se connecter à Firebase**
```bash
firebase login
```

4. **Initialiser Firebase dans le projet**
```bash
firebase init
```
   - Sélectionnez Firestore, Hosting et Authentication
   - Pour Hosting, spécifiez `build` comme dossier public
   - Configurez l'application comme single-page app (SPA)

5. **Déployer sur Firebase**
```bash
firebase deploy
```

## 👨‍💻 Panneau d'Administration

Pour accéder au panneau d'administration :

1. Accédez à votre site déployé : `https://votre-projet.web.app/login`
2. Connectez-vous avec le compte administrateur créé dans Firebase Authentication
3. Dans le panneau d'administration, vous pouvez modifier :
   - Votre profil et coordonnées
   - Vos projets et réalisations
   - Vos expériences professionnelles
   - Vos compétences
   - Votre formation
   - Vos centres d'intérêt
   - La section spéciale sur les projets assistés par IA

## 📁 Structure du Projet

```
portfolio/
├── public/                  # Fichiers statiques
├── src/
│   ├── admin/               # Interface d'administration
│   │   ├── editors/         # Éditeurs pour chaque section
│   │   ├── AdminPanel.js    # Panneau principal d'administration
│   │   └── Login.js         # Page de connexion
│   ├── components/          # Composants réutilisables
│   ├── context/             # Contextes React (Auth, Content)
│   ├── data/                # Données par défaut
│   ├── pages/               # Pages principales du portfolio
│   ├── services/            # Services (Firebase, stockage)
│   └── styles/              # Fichiers CSS et styles
├── .env                     # Variables d'environnement
├── firebase.json            # Configuration Firebase
└── package.json             # Dépendances et scripts
```

## 🔍 Personnalisation

### Modification du contenu via l'administration

La façon recommandée de modifier le contenu de votre portfolio est d'utiliser l'interface d'administration intégrée. Connectez-vous à `/login` et utilisez les différents éditeurs pour mettre à jour vos informations.

### Modification du code source

Si vous souhaitez personnaliser le design ou les fonctionnalités au-delà de ce que permet l'interface d'administration :

1. Modifiez les composants React dans le dossier `src/pages` et `src/components`
2. Personnalisez les styles dans le dossier `src/styles`
3. Reconstruisez et redéployez l'application

## 🌟 Assistance IA et Développement

Ce portfolio met en avant comment l'IA peut être utilisée dans le développement web. La section "Projets IA" démontre comment l'intelligence artificielle peut aider à créer des solutions sophistiquées sans être un expert en développement.

Le projet lui-même a été développé avec l'assistance de l'IA pour :
- Génération de composants React
- Structuration de l'architecture
- Optimisation du code
- Résolution des problèmes techniques

Cette approche démontre comment même les personnes avec des connaissances limitées en développement peuvent créer des applications web professionnelles en utilisant l'IA comme co-pilote.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 🙏 Crédits

- Développé par Amaury LAPEYRE
- Design inspiré par les tendances UI/UX modernes
- Icônes par [Lucide Icons](https://lucide.dev/)
- Développé avec l'assistance de Claude AI (Anthropic)

---

Pour toute question ou assistance, contactez-moi à amaury_lapeyre@hotmail.fr