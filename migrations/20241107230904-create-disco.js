'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genero', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable('artista', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable('disco', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anoLancamento: {
        type: Sequelize.INTEGER,
      },
      capa: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });

    await queryInterface.createTable('faixa', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duracao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'disco',  
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      generoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genero',  
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('discoartista', {
      artistaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'artista',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      discoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'disco',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('artistagenero', {
      artistaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'artista',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      generoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genero',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('discogenero', {
      discoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'disco',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      generoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genero',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('discogenero');
    await queryInterface.dropTable('artistagenero');
    await queryInterface.dropTable('discoartista');
    await queryInterface.dropTable('faixa');
    await queryInterface.dropTable('genero');
    await queryInterface.dropTable('disco');
    await queryInterface.dropTable('artista');
  },
};
