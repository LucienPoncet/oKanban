import listModule from './listModule.js';
import cardModule from './cardModule.js';

const app = {
  /**
   * Ecoute des actions utilisateur
   */
  listenToUserActions(){
    listModule.listenToAddListButtonClick();
    listModule.listenToAddListFormSubmit();
    listModule.listenToChangeNameListFormSubmit();
    listModule.listenToDeleteListFormSubmit();
    cardModule.listenToAddCardFormSubmit();
    cardModule.listenToChangeNameCardFormSubmit();
    cardModule.listenToDeleteCardFormSubmit();
  },

  /**
   * Initialisation du module app
   */
  async init(){
    await listModule.getListsFromAPI();
    listModule.makeListListsSortable();
    app.listenToUserActions();
  },
};

document.addEventListener('DOMContentLoaded', app.init);
