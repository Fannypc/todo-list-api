'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'user_id',
        as: 'tasks'
      })
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    // underscored: true,
    /* with underscore it changes from camelcase to underscored 
       or we can pass the column's name one by one :*/
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
  });
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    delete values.token;
    return values
  }

  return User;
};