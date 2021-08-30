'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_tokens', {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
      },
      token: {
       type: Sequelize.TEXT,
       allowNull: false
      },
      user_id: {
       type: Sequelize.INTEGER,
       allowNull: false
      },
      created_at: {
       type: Sequelize.DATE,
       allowNull: false
      },
      updated_at: {
       type: Sequelize.DATE,
       allowNull: false
      }
     });
     await queryInterface.addConstraint('refresh_tokens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_REFRESH_TOKENS_USER_ID',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('refresh_tokens');

  }
};
