# oKanban

Réalisation d'un projet d'application de type Kanban (avec ajout, modification et suppression des différentes tâches, listées par catégories) lors d'un exercice de fin de leçon de ma formation avec l'école O'Clock :

- Une partie front fait en HTML/CSS/JS et sa consctruction avec _Vite_,
- Une partie back API avec Express et Sequelize (création de Models), en utilisant Postgresql pour la base de données.

Pour lancer les deux serveurs, npm run dev:front et npm run dev:back.

## Implémentation

- On souhaite créer une application de type Kanban où il est possible de créer des cartes à l'intérieur de listes.
- L'utilisateur peut créer autant de listes qu'il désire et mettre autant de cartes à l'intérieur de ces listes.
- Chaque liste dispose d'un nom.
- Chaque carte dispose d'un titre, d'une position au sein de la liste, d'une couleur et d'un ou plusieurs label(s).

### Cartes

Voici les routes existantes pour les cartes :

- GET `/lists/:id/cards` : renvoie toutes les cartes d'une liste. Chaque carte porte les tags qui lui sont associés.
- GET `/cards/:id` : renvoie les détails de la carte demandée, avec les tags qui lui sont associés.
- POST `/cards` : crée une nouvelle carte.
- PATCH `/cards/:id` : modifie une carte (ou 404).
- DELETE `/cards/:id` : supprimer une carte (ou 404).

### Tags

Voici les routes existantes pour les tags :

- GET `/tags` : renvoie tous les tags.
- POST `/tags` : crée un nouveau tag.
- PATCH `/tags/:id` : modifie le tag ciblé (ou 404).
- DELETE `/tags/:id` : supprime un tag.
- POST `/cards/:id/tag` : associe un tag à la carte ciblée.
- DELETE `/cards/:card_id/tag/:tag_id` : supprime l'association entre le tag et la carte.

---

Utilisation du logiciel Insomnia pour tester les routes :

- [Insomnia](https://support.insomnia.rest/article/23-installation#ubuntu)
