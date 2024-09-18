import Sortable from 'sortablejs';
import utils from './utils.js';
import cardModule from './cardModule.js';
import api from './api.js';

const listModule = {

  /**
   * Ajout d'une liste dans le DOM
   * @param {Object} list Objet contenant les informations de la liste à créer
   */
  addListToDom(list){

    const listTemplate = document.querySelector("#list-template");
    const newListElement = listTemplate.content.cloneNode(true);

    const newListLitleElement = newListElement.querySelector('[slot="list-name"]');
    newListLitleElement.textContent = list.name;

    const newListIdElement = newListElement.querySelector('[slot="list-id"]');
    newListIdElement.dataset.id= list.id;

    const addCardButtonElement = newListElement.querySelector('[slot="add-card-button"]');
    addCardButtonElement.addEventListener('click', (event) => {

      const clickedButton = event.currentTarget;
      const listElement = clickedButton.closest('[slot="list-id"]');
      const listId = listElement.dataset.id;

      cardModule.openAddCardModal(listId);
    });


    const listContainerElement = document.querySelector('#lists-container');
    listContainerElement.append(newListElement);

    listModule.makeCardsListsSortable(list.id);

    newListLitleElement.addEventListener('click', listModule.openChangeNameListModal);

    const deleteListButtonElement = newListIdElement.querySelector('.has-text-danger');

    deleteListButtonElement.addEventListener('click', listModule.openDeleteListModal);


    if (list.cards){
      for (const card of list.cards){
        cardModule.addCardToDom(card);
      }
    }
  },

  listenToAddListButtonClick(){
    const addListButtonElement = document.querySelector('#addListButton');
    addListButtonElement.addEventListener('click', listModule.openAddListModal);

    const closeElements = document.querySelectorAll('.button.close, .delete.close, .modal-background');

    for (const closeElement of closeElements){
      closeElement.addEventListener('click', utils.closeModals);
    }
  },

  listenToAddListFormSubmit(){
    const addListFormElement = document.querySelector('#add-list-modal form');

    addListFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('soumission du formulaire');

      const addListForm = event.currentTarget;

      const addListFormData = new FormData(addListForm);
      const listData = Object.fromEntries(addListFormData);

      const createdList = await api.createList(listData);

      if (createdList){

        listModule.addListToDom(createdList);


        addListForm.reset();


        utils.closeModals();

        listModule.updateAllListsPosition();
      }
    });
  },

  listenToChangeNameListFormSubmit(){
    const changeNameListFormElement = document.querySelector('#change-list-name-modal form');

    changeNameListFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('soumission du formulaire');

      const changeNameListForm = event.currentTarget;

      const changeNameListFormData = new FormData(changeNameListForm);
      const newNameListData = Object.fromEntries(changeNameListFormData);

      const createdNewNameList = await api.changeList(newNameListData);

      if (createdNewNameList) {

        const listNameElement = document.querySelector(`[slot="list-id"][data-id="${newNameListData.id}"] [slot="list-name"]`);
        listNameElement.textContent = createdNewNameList.name;

        changeNameListForm.reset();

        utils.closeModals();
      }
    });
  },

  listenToDeleteListFormSubmit(){
    const deleteCardFormElement = document.querySelector('#delete-list-modal form');

    deleteCardFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deleteListForm = event.currentTarget;

      const deleteListFormData = new FormData(deleteListForm);

      const list = Object.fromEntries(deleteListFormData);

      const listId = list.id;

      const isListDeleted = await api.deleteList(listId);

      if (isListDeleted){
        const listToDeleteElement = document.querySelector(`[slot="list-id"][data-id="${listId}"]`);
        listToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },


  async getListsFromAPI(){
    const lists = await api.getLists();

    if (lists){
      for (const list of lists){
        listModule.addListToDom(list);
      }
    }
  },

  updateAllListsPosition(){

    const allListsElements = document.querySelectorAll('[slot="list-id"]');

    let count = 1;

    for (const listElement of allListsElements){
      const listId = listElement.dataset.id;
      api.changeList({
        id: listId,
        position: count,
      });
      count++;
    }
  },


  makeListListsSortable(){
    const listContainerElement = document.querySelector('#lists-container');
    Sortable.create(listContainerElement, {
      animation: 150,
      handle: '.message-header',
      onEnd: function () {
        listModule.updateAllListsPosition();
      },
    });


  },

  makeCardsListsSortable(listId){
    const cardsContainer = document.querySelector(`[slot="list-id"][data-id="${listId}"] [slot="list-content"]`);
    Sortable.create(cardsContainer, {
      animation: 150,
      group: 'cards',
      onEnd: function (event) {

        const draggedCardElement = event.item;
        const draggedCardId = draggedCardElement.dataset.id;

        const targetListContentElement = event.to;
        const targetListElement = targetListContentElement.closest('[slot="list-id"]');
        const targetListId = targetListElement.dataset.id;

        api.changeCard({
          id: draggedCardId,
          list_id: targetListId,
        });

        cardModule.updateAllCardsPosition(targetListId);

      },
    });
  },



  openAddListModal(){
    const addListModalElement = document.querySelector('#add-list-modal');
    addListModalElement.classList.add('is-active');
  },



  openChangeNameListModal(event){
    const clickedButton = event.currentTarget;

    const listElement = clickedButton.closest('[slot="list-id"');

    const listId = listElement.dataset.id;

    const changeNameListModalElement = document.querySelector('#change-list-name-modal');
    changeNameListModalElement.classList.add('is-active');

    const inputHiddenIdElement = changeNameListModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = listId;

    const inputTextContentElement = changeNameListModalElement.querySelector('[name="name"]');
    inputTextContentElement.value = clickedButton.textContent;
  },

  openDeleteListModal(event){
    const clickedButton = event.currentTarget;
    const listElement = clickedButton.closest('.list');

    const listId = listElement.dataset.id;
    const listName = listElement.querySelector('[slot="list-name"]').textContent;

    const deleteListModalElement = document.querySelector('#delete-list-modal');
    deleteListModalElement.classList.add('is-active');

    const inputHiddenIdElement = deleteListModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = listId;

    const contentSlotElement = deleteListModalElement.querySelector('[slot="list-name"]');
    contentSlotElement.textContent = listName;

  },


};

export default listModule;
