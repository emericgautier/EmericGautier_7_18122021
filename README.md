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

- Pour importer le contenu du fichier database/db.sql , entrez la commande suivante, 
  en remplaçant "user" et "password" par les données du fichier .env :

  #### `mysql -u user -p password groupomania < database/db.sql`

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
    #### `yarn serve` (http://localhost:8080/)