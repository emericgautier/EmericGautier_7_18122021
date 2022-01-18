# Groupomania
Projet 7 : création d'un réseau social d'entreprise.

## Stack technique :

- Base de données : MySql.
- Serveur : NodeJs. Express.
- Framework Javascript : VueJS

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