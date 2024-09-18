const { Card } = require ('../models');

const cardController = {
  async getAllCards(req, res){
    try{
      // on utilise le Model Card pour récupérer les données
      const cards = await Card.findAll({
        include: 'tags',
        order: [
          ['position', 'ASC'],
        ],
      });

      // on envoie une réponse concenant les données au format json dans une réponse avec un code 200
      res.status(200).json(cards);
    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }
  },
  async getOneCard(req, res){
    try{
      
      const cardId = req.params.id;
      const card = await Card.findByPk(cardId, {
        include: 'tags',
      });

      if (!card){
        return res.status(404).json({ message: `card with id ${cardId} not found.`});
      }

      res.status(200).json(card);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }   
  },
  async deleteOneCard(req, res){
    try{
      const cardId = req.params.id;
      const card = await Card.findByPk(cardId);

      if (!card){
        return res.status(404).json({ message: `card with id ${cardId} not found.`});
      }

      await card.destroy();

      res.status(204).json();

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }   
  },
  async createOneCard(req, res){
    
    try{
      const { content, position, list_id, color } = req.body;    

      const card = {};

      if (content === undefined || content === ""){
        return res.status(400).json({ message: 'content is mandatory'});
      }

      card.content = content;

      if (color){
        card.color = color;
      }

      let positionInt;
      if (position !== undefined){
        positionInt = Number(position);

        if (isNaN(positionInt)){
          return res.status(400).json({ message: 'position should be an integer'});
        }
        card.position = positionInt;
      }      

      listIdInt = Number(list_id);

      if (isNaN(listIdInt)){
        return res.status(400).json({ message: 'list_id should be an integer'});
      }
      card.list_id = listIdInt;

      const newCard = await Card.create(card);

      res.status(201).json(newCard);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  

  },
  async updateOneCard(req, res){
    try{
      
      const cardId = req.params.id;
      const card = await Card.findByPk(cardId);

      if (!card){
        return res.status(404).json({ message: `card with id ${cardId} not found.`});
      }

      const { content, color, position, list_id } = req.body;    

      // on veut, si elle est fournie, une position de type Number
      let positionInt;
      if (position !== undefined){
        positionInt = Number(position);

        if (isNaN(positionInt)){
          return res.status(400).json({ message: 'position should be an integer'});
        }
      }

      // on veut, si elle est fournie, une list_id de type Number
      let listIdInt;
      if (list_id !== undefined){
        listIdInt = Number(list_id);

        if (isNaN(listIdInt)){
          return res.status(400).json({ message: 'list_id should be an integer'});
        }
      }

      // on veut, si il est fournit un content non vide
      if (content!== undefined && content === ""){
        return res.status(400).json({ message: 'content should not be an empty string'});
      }

      // on au moins, veut soit une position, soit un content, soit un list_id
      if ((position === undefined) && !content && !list_id){
        return res.status(400).json({ message: 'you should provide at least a content, a position or a list_id'});
      }

      // on s'est assuré que la requête est bien formée,
      // on se lance dans la mise à jour
      if (content){
        card.content = content;
      }

      if (color){
        card.color = color;
      }

      if (position || position===0){
        card.position = positionInt;
      }  

      if (list_id){
        card.list_id = listIdInt;
      }  

      await card.save();

      res.status(200).json(card);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  
  }
};

module.exports = cardController;