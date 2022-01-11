const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});

const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "images/profile_placeholder.png"
    },
    bannerUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Bienvenue dans votre Espace Personnel ! Vous pouvez éditer votre profil en cliquant sur le bouton à droite."
    },
    role: {
      type: DataTypes.STRING,
      alloNull: true,
      defaultValue: "user"
    }
  }, {
    // Other model options
    modelName: 'user',
    tableName: 'users',
    sequelize
  });


  module.exports = User