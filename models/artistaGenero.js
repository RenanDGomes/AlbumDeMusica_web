"use strict";

module.exports = (sequelize, DataTypes) => {
  const ArtistaGenero = sequelize.define(
    "ArtistaGenero",
    {
      artistaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "artista", 
          key: "id",
        },
        onDelete: "CASCADE",
      },
      generoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "genero", 
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "artistagenero", 
      timestamps: false, 
    }
  );

  return ArtistaGenero;
};
