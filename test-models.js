require ('dotenv').config();

const { List, Card, Tag } = require ('./app/models');

async function main(){
  const lists = await List.findAll();

  for (const list of lists){
    console.log(list.name);
  }


  const cards = await Card.findAll({ include: 'list' });

  for (const card of cards){
    console.log(`${card.content} - ${card.list.name}`);
  }

  const tags = await Tag.findAll({ include: 'cards' });

  for (const tag of tags){
    console.log(`- ${tag.name}:`);
    for (const card of tag.cards){
      console.log(`    ${card.content}`);
    }
  }



}

main();