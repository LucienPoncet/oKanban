const utils = {
  /**
   * Fermeture des modales actives
   */
  closeModals(){
    const activeModalElements = document.querySelectorAll('.modal.is-active');
    for (const activeModalElement of activeModalElements){
      activeModalElement.classList.remove('is-active');
    }
  },
};

// export nommé
export function log(message){
  console.log(message);
}

// export par défaut
export default utils;
