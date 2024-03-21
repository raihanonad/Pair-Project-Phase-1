'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/profiles.json').map(el=>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
      })

      await queryInterface.bulkInsert('Profiles', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles')
  }
};
