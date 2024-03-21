'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'ProductId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Products',
        },
        key: 'id'
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'ProductId')
  }
};
