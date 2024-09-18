const List = require ('./List');
const Card = require ('./Card');
const Tag = require ('./Tag');

// List <--> CARD en One-to-Many
List.hasMany(Card, {
  as: 'cards',
  foreignKey: 'list_id',
});

Card.belongsTo(List, {
  as: 'list',
  foreignKey: 'list_id',
});

// CARD <--> LABEL en Many-to-Many
Card.belongsToMany(Tag, { 
  through: 'card_has_tag', 
  foreignKey: 'card_id', 
  as: 'tags',
  timestamps: false, 
  createdAt: 'created_at', 
});

Tag.belongsToMany(Card, { 
  through: 'card_has_tag',
  foreignKey: 'tag_id',
  as: 'cards',
  timestamps: false, 
  createdAt: 'created_at', 
});


module.exports = {
  List,
  Card,
  Tag,
}
