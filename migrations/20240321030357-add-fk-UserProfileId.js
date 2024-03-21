'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Profiles', 'UserProfileId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id'
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Profiles', 'UserProfileId')
  }
};
