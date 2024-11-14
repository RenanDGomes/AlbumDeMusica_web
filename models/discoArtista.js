"use strict";

module.exports = (sequelize, DataTypes) => {
  const DiscoArtista = sequelize.define(
    "DiscoArtista",
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
      artistaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Artista', 
          key: 'id',
        },
      },
    },
    {
      tableName: "discoartista",
      timestamps: false,  
    }
  );

  return DiscoArtista;
};
