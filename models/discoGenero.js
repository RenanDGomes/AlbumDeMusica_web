"use strict";

module.exports = (sequelize, DataTypes) => {
  const DiscoGenero = sequelize.define(
    "DiscoGenero",
    {
      discoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Disco',  
          key: 'id',
        },
      },
      generoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Genero',  
          key: 'id',
        },
      },
    },
    {
      tableName: "discogenero",
      timestamps: false,  
    }
  );

  return DiscoGenero;
};
