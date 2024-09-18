const { Tag, Card } = require ('../models');

const tagController = {
  async getAllTags(req, res){
    try{
      // on s'appuie sur la couche Model pour récupérer les données
      const tags = await Tag.findAll({        
        order: [
          ['name', 'ASC'],
        ],
      });

      // renvoie une réponse concenant les données au format json dans une réponse avec un code réponse 200.
      res.status(200).json(tags);

      // ou :
      //res.json(tags);
      // car 200 est le code de retour par défaut pour express.
    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }
  },
  async getOneTag(req, res){
    try{
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId);

      if (!tag){
        return res.status(404).json({ message: `tag with id ${tagId} not found.`});
      }

      res.status(200).json(tag);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }   
  },
  async deleteOneTag(req, res){
    try{
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId);

      if (!tag){
        return res.status(404).json({ message: `tag with id ${tagId} not found.`});
      }

      await tag.destroy();

      res.status(204).json();

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }   
  },
  async createOneTag(req, res){
    
    try{
      const { name, color } = req.body;    

      const tag = {};

      if (name === undefined || name === ""){
        return res.status(400).json({ message: 'name is mandatory'});
      }

      tag.name = name;

      if (color){
        tag.color = color;
      }

      const newTag = await Tag.create(tag);

      res.status(201).json(newTag);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  

  },
  async updateOneTag(req, res){
    try{
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId);

      if (!tag){
        return res.status(404).json({ message: `tag with id ${tagId} not found.`});
      }

      const { name, color } = req.body;    

      // on veut, si il est fournit un nom non vide
      if (name !== undefined && name === ""){
        return res.status(400).json({ message: 'name should not be an empty string'});
      }

      // on s'est assuré que la requête est bien formée,
      // on se lance dans la mise à jour
      if (name){
        tag.name = name;
      }

      if (color){
        tag.color = color;
      }

      await tag.save();

      res.status(200).json(tag);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  
  },

  async addTagToCard(req, res){
    try{
      const cardId = req.params.id;
      const card = await Card.findByPk(cardId);

      if (!card){
        return res.status(404).json({ message: `card with id ${cardId} not found.`});
      }

      const tagId = req.body.tag_id;

      const tag = await Tag.findByPk(tagId);

      if (!tag){
        return res.status(404).json({ message: `tag with id ${tagId} not found.`});
      }

      // On utilise les méthode mixin offerte automatiquement par sequelize pour
      // gérer les associations entre entités.
      // cf https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
      await card.addTag(tag);

      const cardWithTags = await Card.findByPk(cardId, { include: 'tags'});

      res.status(200).json(cardWithTags);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }
  },

  async deleteTagToCard(req, res){
    const cardId = req.params.card_id;
      const card = await Card.findByPk(cardId);

      if (!card){
        return res.status(404).json({ message: `card with id ${cardId} not found.`});
      }

      const tagId = req.params.tag_id;

      const tag = await Tag.findByPk(tagId);

      if (!tag){
        return res.status(404).json({ message: `tag with id ${tagId} not found.`});
      }

      await card.removeTag(tag);

      const cardWithTags = await Card.findByPk(cardId, { include: 'tags'});

      res.status(200).json(cardWithTags);
  },
};

module.exports = tagController;