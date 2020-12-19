'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Task.belongsTo(models.Status, {
        foreignKey: 'status_id',
        as: 'status'
      });
    }
  };
  Task.init({
    content: DataTypes.STRING,
    due_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Task;
};