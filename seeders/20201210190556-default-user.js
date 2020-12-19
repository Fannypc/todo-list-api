'use strict';

const users = [{
  first_name: 'Maria',
  last_name: 'Porras',
  email: 'maria@gmail.com',
  password: '123',
  token: 'abcde',
  active: true,
  created_at: new Date(),
  updated_at: new Date()
},{
  first_name: 'Juana',
  last_name: 'Porras',
  email: 'juana@gmail.com',
  password: '1234',
  token: 'abcde',
  active: true,
  created_at: new Date(),
  updated_at: new Date()
}];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
