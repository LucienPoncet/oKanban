const { List } = require ('../models');

const listController = {
  async getAllLists(req, res){
    try{
      // on s'appuie sur la couche Model pour récupérer les données
      const lists = await List.findAll({
        include: {
            association: 'cards',
            include: 'tags',
          },
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC'],
        ],
      });

      // renvoie une réponse concenant les données au format json dans une réponse avec un code réponse 200.
      res.status(200).json(lists);

      // ou :
      //res.json(lists);
      // car 200 est le code de retour par défaut pour express.
    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }
  },
  async getOneList(req, res){
    try{
      // plan d'action :
      // - récupèrer l'id demandé (dans l'url)
      // - récupérer la liste qui a cet id
      // - si on la trouve :
          // - renvoyer la liste au format json avec un code 200
      // - sinon :
          // - renvoyer une 404 (not found - je n'ai pas trouvé la liste). 

      const listId = req.params.id;
      const list = await List.findByPk(listId, {
        include: {
            association: 'cards',
            include: 'tags',
          },
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC'],
        ],
      });

      if (!list){
        return res.status(404).json({ message: `list with id ${listId} not found.`});
      }

      res.status(200).json(list);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }   
  },
  async deleteOneList(req, res){
    try{
      const listId = req.params.id;
      const list = await List.findByPk(listId);

      // autre option, on aurait pu supprimer la liste avec cet id sans se soucier qu'elle existe ou pas.
      // List.destroy({ where: { id: listId }});

      if (!list){
        return res.status(404).json({ message: `list with id ${listId} not found.`});
      }

      await list.destroy();

      res.status(204).json();

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }   
  },
  async createOneList(req, res){
    // 2 interlocuteurs, le client et le serveur

    // le client (navigateur / insomnia) demanderait :
    // je veux CREER une LISTE avec pour NOM : "troisième liste" et pour POSITION : 1 !
    // -> 
    // CREER -> verbe HTTP POST
    // LISTE -> url /lists
    // NOM et POSITION : Body de la requête

    // en réponse à cette requête :
    // le serveur (serveur web Node.JS / Express)
    // CREER une LISTE -> router et passe la main au controller pour la mise en oeuvre
    // Récupère le NOM et la POSITON
    // Crée la liste avec ce NOM et cette POSITION
    // retourne les informations de la liste créée avec un statut de réussite (201 - CREATED)
    try{
      
      console.log(req.body);
      
      const { name, position } = req.body;    

      const list = {};

      if (name === undefined || name === ""){
        return res.status(400).json({ message: 'name is mandatory'});
      }

      list.name = name;

      let positionInt;
      if (position !== undefined){
        positionInt = Number(position);

        if (isNaN(positionInt)){
          return res.status(400).json({ message: 'position should be an integer'});
        }
        list.position = positionInt;
      }      

      const newList = await List.create(list);

      res.status(201).json(newList);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  

  },
  async updateOneList(req, res){
    try{
      // plan d'action :
      
      // trouver la liste :
      // - récupére l'id
      // - charger la liste
      // - si elle n'existe pas -> 404

      // vérfier que la requête contient les informations permettant une mise à jour
      // - on a au moins un nom ou une position
      // - la position est un nombre
      // - si problème -> 400

      // la mettre à jour
      // - par l'appel de la méthode save du modele liste

      // informer le client des modifications
      // - renvoyer une réponse avec un code 200,
      // - et les informations de la liste modifiée

      const listId = req.params.id;
      const list = await List.findByPk(listId);

      if (!list){
        return res.status(404).json({ message: `list with id ${listId} not found.`});
      }

      const { name, position } = req.body;    

      // on veut, si elle est fournie, une position de type Number
      let positionInt;
      if (position !== undefined){
        positionInt = Number(position);

        if (isNaN(positionInt)){
          return res.status(400).json({ message: 'position should be an integer'});
        }
      }

      // on veut, si il est fournit un nom non vide
      if (name !== undefined && name === ""){
        return res.status(400).json({ message: 'name should not be an empty string'});
      }

      // on au moins, veut soit une position, soit un nom
      if ((position === undefined) && !name){
        return res.status(400).json({ message: 'you should provide at least a name or a position'});
      }

      // on s'est assuré que la requête est bien formée,
      // on se lance dans la mise à jour
      if (name){
        list.name = name;
      }

      if (position || position===0){
        list.position = positionInt;
      }  

      await list.save();

      res.status(200).json(list);

    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...'});
    }  
  }
};

module.exports = listController;