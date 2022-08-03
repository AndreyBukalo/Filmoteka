(() => {
  const refs = {
    modal: document.querySelector("[cabinet-modal]"),
  };

  if (document.querySelector('.header__top') != null) {
    document.querySelector('.header__top').addEventListener('click', (event) => {
      if (document.querySelector("[cabinet-modal-open]") != null) {
        document.querySelector("[cabinet-modal-open]").addEventListener("click", toggleModal);
        document.querySelector("[cabinet-modal-close]").addEventListener("click", toggleModal);    
      }  
    })
  }

  if (document.querySelector('.navigation') != null) {
    document.querySelector('.navigation').addEventListener('click', (event) => {
      if (document.querySelector("[cabinet-modal-open]") != null) {
        document.querySelector("[cabinet-modal-open]").addEventListener("click", toggleModal);
        document.querySelector("[cabinet-modal-close]").addEventListener("click", toggleModal);    
      }  
    })
  }

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();