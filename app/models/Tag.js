const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize-client');

class Tag extends Model {}

Tag.init({  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
}, {  
  sequelize,
  modelName: 'Tag',
  tableName: 'tag',
});

module.exports = Tag;