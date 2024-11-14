"use strict";

module.exports = (sequelize, DataTypes) => {
  const Faixa = sequelize.define(
    "Faixa",
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
      duracao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "faixa",
      timestamps: false,
    }
  );

  Faixa.associate = (models) => {
    Faixa.belongsTo(models.Disco, { foreignKey: "discoId", as: "disco" });
    Faixa.belongsTo(models.Genero, { foreignKey: "generoId", as: "genero" });
  };

  return Faixa;
};
