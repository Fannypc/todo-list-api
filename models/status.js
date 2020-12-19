'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Task, {
        foreignKey: 'status_id',
        as: 'status'
      })
    }
  };
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'status',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Status;
};