"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artista = sequelize.define(
    "Artista",
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
      tableName: "artista",
      timestamps: false,
    }
  );

  Artista.associate = (models) => {
    Artista.belongsToMany(models.Disco, {
      through: "DiscoArtista",
      as: "discos",
      foreignKey: "artistaId",
    });
    Artista.belongsToMany(models.Genero, {
      through: "ArtistaGenero",
      as: "generos",
      foreignKey: "artistaId",
    });
  };

  return Artista;
};
