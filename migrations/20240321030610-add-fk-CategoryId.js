'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'CategoryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Categories',
        },
        key: 'id'
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'CategoryId')
  }
};
