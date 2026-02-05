# Test Cepal Data - Vitrine de Lunettes 3D

Ce projet est une application Next.js de démonstration pour une vitrine de lunettes en ligne, intégrant une visualisation 3D interactive et une gestion de base de données avec Prisma.

## 🚀 Fonctionnalités

- **Catalogue de Produits** : Affichage d'une liste de montures avec prix et détails.
- **Visualisation 3D Interactive** :
  - Intégration de modèles 3D (GLTF/GLB) avec `react-three-fiber`.
  - Chargement paresseux (Lazy loading) pour des performances optimales.
  - **Personnalisation en temps réel** : Changement dynamique de la couleur de la monture et du type de verres (couleur/opacité).
- **Page Détail Produit** :
  - Informations complètes (Dimensions, Matériaux, Description).
  - Sélection de configurations (Couleurs, Verres).
- **API REST** : Endpoints pour récupérer les données des produits.
- **Base de Données** : Gestion des données avec PostgreSQL et Prisma ORM.

## 🛠 Technologies

- **Frontend** : [Next.js 15+](https://nextjs.org/), React 19, Tailwind CSS.
- **3D** : [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [React Three Drei](https://github.com/pmndrs/drei).
- **Backend / DB** : [Prisma ORM](https://www.prisma.io/), PostgreSQL.
- **Langage** : TypeScript.

## 📋 Prérequis

- Node.js (v18 ou supérieur recommandé)
- npm ou yarn
- Une base de données PostgreSQL (locale ou hébergée).

## ⚙️ Installation

1. **Cloner le projet** :

   ```bash
   git clone https://github.com/ace34TT/test-cepal-data
   cd test_cepal_data
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine du projet et ajoutez votre URL de connexion à la base de données :
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/nom_de_la_db?schema=public"
   ```

## 🗄️ Base de Données

1. **Générer le client Prisma** :

   ```bash
   npx prisma generate
   ```

2. **Appliquer les migrations** (création des tables) :

   ```bash
   npx prisma db push
   # ou pour une migration formelle
   npx prisma migrate dev
   ```

3. **Peupler la base de données (Seed)** :
   Le projet inclut un script de seed pour insérer des données de test (produits, configurations 3D).
   ```bash
   npx prisma db seed
   ```

## ▶️ Lancement

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📚 Documentation de l'API

Cette section décrit les points de terminaison (endpoints) disponibles pour interagir avec les données des produits.

### 1. Récupérer toutes les montures

**Endpoint :** `GET /api/frames`

Récupère la liste de toutes les montures disponibles.

**Réponse (200 OK) :**

```json
[
  {
    "id": "frame-001",
    "name": "Monture Optima Classic",
    "brand": "Optima",
    "price": 120000,
    "currency": "MGA",
    "isAvailable": true,
    "thumbnail": "/images/frames/optima-classic.png"
  },
  ...
]
```

### 2. Récupérer une monture par ID

**Endpoint :** `GET /api/frames/{id}`

Récupère les détails complets d'une monture, y compris ses configurations et paramètres 3D.

**Paramètres URL :**

- `id` : L'identifiant unique de la monture (ex: `frame-002`).

**Réponse (200 OK) :**

```json
{
  "id": "frame-002",
  "name": "Monture Vision Pro",
  "brand": "Vision",
  "description": "Monture moderne avec design premium...",
  "price": 150000,
  "currency": "MGA",
  "isAvailable": true,
  "materials": ["Titane"],
  "dimensions": { "width": 142, "bridge": 19, "unit": "mm" },
  "configurations": {
    "frameColors": [{ "id": "silver", "label": "Argent", "hex": "#c0c0c0" }],
    "lensTypes": [
      {
        "id": "blue-light",
        "label": "Filtre lumière bleue",
        "price": 45000,
        "color": "#E0FFE0"
      }
    ]
  },
  "threeD": {
    "modelUrl": "/models/glasses_09.glb",
    "scale": 1,
    "camera": { "fov": 45, "position": { "x": 0, "y": 0.3, "z": 2.7 } }
  }
}
```

## 📁 Structure du Projet

- `src/app` : Pages et routes de l'application (Next.js App Router).
- `src/app/api` : Routes API.
- `src/components` : Composants React réutilisables (ProductCard, ProductList, etc.).
- `src/components/3d` : Composants liés à la 3D (`Scene`, `Model`).
- `src/lib` : Utilitaires et configuration (Prisma client).
- `prisma` : Schéma de base de données et données de seed.
- `public` : Assets statiques (Images, Modèles 3D).

---

_Projet réalisé pour démonstration technique._
