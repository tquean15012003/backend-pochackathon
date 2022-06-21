'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestType: {
        type: Sequelize.STRING
      },
      holderID: {
        type: Sequelize.STRING
      },
      issuerID: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.TEXT
      },
      link: {
        type: Sequelize.TEXT
      },
      isdone: {
        type: Sequelize.STRING
      },
      claimID: {
        type: Sequelize.STRING
      },
      holderDID: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Requests');
  }
};