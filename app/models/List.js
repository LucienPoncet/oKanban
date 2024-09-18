const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize-client');

class List extends Model {}

List.init({  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'List',
  tableName: 'list',
});

module.exports = List;