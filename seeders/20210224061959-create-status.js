'use strict';

const status = [
  {
    id: 1,
    name: "Haciendo",
    created_at: "2021-02-23T06:00:00.000Z",
    updated_at: "2021-02-23T06:00:00.000Z"
  },  
  {
    id: 2,
    name: "Terminada",
    created_at: "2021-02-23T06:00:00.000Z",
    updated_at: "2021-02-23T06:00:00.000Z"
  },
  {
    id: 3,
    name: "Pendiente",
    created_at: "2021-02-23T06:00:00.000Z",
    updated_at: "2021-02-23T06:00:00.000Z"
  },
  {
    id: 4,
    name: "Diferida",
    created_at: "2021-02-23T06:00:00.000Z",
    updated_at: "2021-02-23T06:00:00.000Z"
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', status)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {});
  }
};
