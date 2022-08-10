# Projet 7 - Groupomania
_Projet de la formation développeur web - OpenClassrooms._

### 🎯 Mission
  - Création d'un réseau social d'entreprise.

![logo_groupomania](https://user-images.githubusercontent.com/78208136/183892148-dcd88012-0741-4570-8255-df9be7859689.png)

## 🛠 Stack technique :

- Base de données : MySql.
- Serveur : NodeJs. Express.
- Framework Javascript : VueJS

### ⚡️ Evaluations
1. Authentifier un utilisateur et maintenir sa session
2. Personnaliser le contenu envoyé à un client web
3. Gérer un stockage de données à l'aide de SQL
4. Implémenter un stockage de données sécurisé en utilisant SQL

## Prérequis :

- Installer NodeJs et MySql.
- Cloner le projet sur votre machine.

## Importation de la base de données :

- Dans un serveur MySql, entrez la commande suivante pour créer une nouvelle base de donnéees :
  #### `CREATE DATABASE groupomania;`
  
- Dans le fichier .env, remplacer [DB_PASSWORD] par votre mot de passe root mysql.  

- Importer le fichier database/db.sql avec phpMyAdmin ou la console

## Lancement de l'application :

- Allez dans le dossier backend de l'application :

  - installez les dépendances avec la commande suivante :
    #### `npm install`
  - lancez le serveur avec la commande suivante :
    #### `nodemon server`
    
- Allez dans le dossier frontend de l'application :

  - installez les dépendances avec la commande suivante :
    #### `npm install`
  - lancez l'application avec la commande suivante :
    #### `npm run serve` (http://localhost:8080/)
