'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('users', [
        {
          name: 'Iqbaal',
          profession: "Admin",
          role: "admin",
          email: "iqbaalpratama789@gmail.com",
          password: await bcrypt.hash("iqbaal123",10),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Mahmud',
          profession: "UI/UX Designer",
          role: "student",
          email: "mahmud@gmail.com",
          password: await bcrypt.hash("mahmud123",10),
          created_at: new Date(),
          updated_at: new Date()
        }], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
  }
};
