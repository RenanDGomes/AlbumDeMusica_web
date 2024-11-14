"use strict";

module.exports = (sequelize, DataTypes) => {
  const Disco = sequelize.define(
    "Disco",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anoLancamento: {
        type: DataTypes.INTEGER,
      },
      capa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "disco",
      timestamps: false,
    }
  );

  Disco.associate = (models) => {
    Disco.belongsToMany(models.Artista, {
      through: "DiscoArtista",
      as: "artistas",
      foreignKey: "discoId",
    });
    Disco.hasMany(models.Faixa, { foreignKey: "discoId", as: "faixas" });
    Disco.belongsToMany(models.Genero, {
      through: "DiscoGenero",
      as: "generos",
      foreignKey: "discoId",
    });
  };

  return Disco;
};
