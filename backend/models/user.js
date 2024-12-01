'use strict';
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Importando a função para gerar UUID

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID, 
        defaultValue: uuidv4,  
        primaryKey: true,      
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garantir que o email seja único
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
