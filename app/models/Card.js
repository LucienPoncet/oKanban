const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize-client');

class Card extends Model {}

Card.init({  
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FFFFFF',
  },

}, {  
  sequelize,
  modelName: 'Card',
  tableName: 'card',
});

module.exports = Card;