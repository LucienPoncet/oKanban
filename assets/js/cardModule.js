import Sortable from 'sortablejs';
import utils from './utils.js';
import api from './api.js';

const cardModule = {

  updateAllCardsPosition(listId){
    const allTargetListCardsElements = document.querySelectorAll(`[slot="list-id"][data-id="${listId}"] .card`);

    let count = 1;

    for (const cardElement of allTargetListCardsElements){
      const cardId = cardElement.dataset.id;
      api.changeCard({
        id: cardId,
        position: count,
      });
      count++;
    }
  },

  /**
   * Ajout d'une carte dans le DOM
   * @param {Object} card Objet contenant les informations de la carte à créer
   */
  addCardToDom(card){


    const cardTemplate = document.querySelector("#card-template");
    const newCardElement = cardTemplate.content.cloneNode(true);

    const newCardContentElement = newCardElement.querySelector('[slot="card-content"]');
    newCardContentElement.textContent = card.content;

    const newCardIdElement = newCardElement.querySelector('[slot="card-id"]');
    newCardIdElement.dataset.id = card.id;

    if (card.color){
      newCardIdElement.style.backgroundColor = card.color;
      newCardIdElement.dataset.color = card.color;
    }

    const listElement = document.querySelector(`[slot="list-id"][data-id="${card.list_id}"]`);

    const cardsContainer = listElement.querySelector('[slot="list-content"]');

    cardsContainer.append(newCardElement);

    Sortable.create(cardsContainer);

    const changeNameCardButtonElement = newCardIdElement.querySelector('.has-text-success');

    changeNameCardButtonElement.addEventListener('click', cardModule.openChangeNameCardModal);


    const deleteCardButtonElement = newCardIdElement.querySelector('.has-text-danger');

    deleteCardButtonElement.addEventListener('click', cardModule.openDeleteCardModal);
  },

  /**
   * Ouverture de la modale d'ajout de carte
   * @param {Number} listId identifiant de la liste où la carte doit être ajouté
   */


  listenToAddCardFormSubmit(){
    const addCardFormElement = document.querySelector('#add-card-modal form');

    addCardFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('soumission du formulaire');

      const addCardForm = event.currentTarget;

      const addCardFormData = new FormData(addCardForm);
      const cardData = Object.fromEntries(addCardFormData);

      const createdCard = await api.createCard(cardData);

      if (createdCard){

        cardModule.addCardToDom(createdCard);

        addCardForm.reset();

        utils.closeModals();

        cardModule.updateAllCardsPosition(cardData.list_id);
      }

    });
  },

  listenToChangeNameCardFormSubmit(){
    const changeNameCardFormElement = document.querySelector('#change-card-name-modal form');

    changeNameCardFormElement.addEventListener('submit', async (event) => {

      event.preventDefault();
      console.log('soumission du formulaire');

      const changeNameCardForm = event.currentTarget;

      const changeNameCardFormData = new FormData(changeNameCardForm);
      const newNameCardData = Object.fromEntries(changeNameCardFormData);

      const createdNewNameCard = await api.changeCard(newNameCardData);

      if (createdNewNameCard){

        const cardElement = document.querySelector(`.card[data-id="${createdNewNameCard.id}"]`);

        cardElement.style.backgroundColor = createdNewNameCard.color;
        cardElement.dataset.color = createdNewNameCard.color;

        const cardNameElement = document.querySelector(`[slot="card-id"][data-id="${newNameCardData.id}"] [slot="card-content"]`);
        cardNameElement.textContent = createdNewNameCard.content;

        utils.closeModals();
      }

    });
  },


  listenToDeleteCardFormSubmit(){
    const deleteCardFormElement = document.querySelector('#delete-card-modal form');

    deleteCardFormElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const deleteCardForm = event.currentTarget;

      const deleteCardFormData = new FormData(deleteCardForm);

      const card = Object.fromEntries(deleteCardFormData);

      const cardId = card.id;

      const isCardDeleted = await api.deleteCard(cardId);

      if (isCardDeleted){
        const cardToDeleteElement = document.querySelector(`[slot="card-id"][data-id="${cardId}"]`);
        cardToDeleteElement.remove();
        utils.closeModals();
      }

    });

  },

  openAddCardModal(listId){
    const addCardModalElement = document.querySelector('#add-card-modal');
    addCardModalElement.classList.add('is-active');

    const listIdInputElement = addCardModalElement.querySelector('[name="list_id"]');
    listIdInputElement.value = listId;
  },


  openChangeNameCardModal(event){
    const clickedButton = event.currentTarget;

    const cardElement = clickedButton.closest('[slot="card-id"]');
    const cardId = cardElement.dataset.id;
    const cardContent = cardElement.querySelector('[slot="card-content"]');

    const changeNameCardModalElement = document.querySelector('#change-card-name-modal');
    changeNameCardModalElement.classList.add('is-active');

    const cardColor = cardElement.dataset.color;


    const inputHiddenIdElement = changeNameCardModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = cardId;

    const inputTextContentElement = changeNameCardModalElement.querySelector('[name="content"]');
    inputTextContentElement.value = cardContent.textContent;

    const colortInputElement = changeNameCardModalElement.querySelector('[name="color"]');
    colortInputElement.value = cardColor;

  },


  openDeleteCardModal(event){
    const clickedButton = event.currentTarget;
    const cardElement = clickedButton.closest('.card');

    const cardId = cardElement.dataset.id;
    const cardContent = cardElement.querySelector('[slot="card-content"]').textContent;

    const deleteCardModalElement = document.querySelector('#delete-card-modal');
    deleteCardModalElement.classList.add('is-active');

    const inputHiddenIdElement = deleteCardModalElement.querySelector('[name="id"]');
    inputHiddenIdElement.value = cardId;

    const contentSlotElement = deleteCardModalElement.querySelector('[slot="card-content"]');
    contentSlotElement.textContent = cardContent;

  },

};

export default cardModule;
