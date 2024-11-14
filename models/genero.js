"use strict";

module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define(
    "Genero",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "genero",
      timestamps: false,
    }
  );

  Genero.associate = (models) => {
    Genero.belongsToMany(models.Disco, {
      through: "DiscoGenero",
      as: "discos",
      foreignKey: "generoId",
    });
    Genero.belongsToMany(models.Artista, {
      through: "ArtistaGenero",
      as: "artistas",
      foreignKey: "generoId",
    });
    Genero.hasMany(models.Faixa, { foreignKey: "generoId", as: "faixas" });
  };

  return Genero;
};
