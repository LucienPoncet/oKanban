// import correspondant à un export par défaut
import config from './config.js';

// import correspondant à un import nommé
import { log } from './utils.js';

const api = {
  /**
   *
   * @returns lists
   */
  async getLists(){
    try{
      // récupération des listes
      const listsResponse = await fetch(`${config.baseUrl}lists`);

      if (!listsResponse.ok){
        alert("Une erreur s'est produite. Merci de revenir plus tard...");
        return;
      }

      log('tout va bien');

      const listsData = await listsResponse.json();
      return listsData;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  /**
   *
   * @param {Object} objet contenant les informations de la liste à créer
   */
  async createList(list){
    try{
      const apiResponse = await fetch(`${config.baseUrl}lists`, {
        method: 'POST', // on veut créer une ressource liste
        body: JSON.stringify(list), // les informations permettant au serveur de créer la liste (nom de la liste) sont encodée au format json dans le corp de la requête
        headers: { // on ajoute une entete à notre requête
          'Content-type': 'application/json', // qui permet de préciser que le corp de la requête est encodé en json (ce qui permettra au serveur de savoir comment la décoder)
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const createdList = responseBody;

      return createdList;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async changeList(list){
    try{
      const apiResponse = await fetch(`${config.baseUrl}lists/${list.id}`, {
        method: 'PATCH',
        body: JSON.stringify(list),
        headers: {
          'Content-type': 'application/json',
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const changedList = responseBody;

      return changedList;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteList(listId){
    try{
      const apiResponse = await fetch(`${config.baseUrl}lists/${listId}`, {
        method:'DELETE',
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async createCard(card){
    try{
      const apiResponse = await fetch(`${config.baseUrl}cards`, {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
          'Content-type': 'application/json',
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
      }

      const createdCard = responseBody;
      return createdCard;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async changeCard(card){
    try{
      const apiResponse = await fetch(`${config.baseUrl}cards/${card.id}`, {
        method: 'PATCH',
        body: JSON.stringify(card),
        headers: {
          'Content-type': 'application/json',
        }
      });

      const responseBody = await apiResponse.json();

      if (!apiResponse.ok){
        alert(responseBody.message);
        return;
      }

      const changedCard = responseBody;

      return changedCard;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

  async deleteCard(cardId){
    try{
      const apiResponse = await fetch(`${config.baseUrl}cards/${cardId}`, {
        method:'DELETE',
      });

      if (!apiResponse.ok){
        const responseBody = await apiResponse.json();
        alert(responseBody.message);
        return;
      }

      return true;
    }catch(error){
      alert("Une erreur inattendue s'est produite. Merci de revenir plus tard...");
    }
  },

};

export default api;
