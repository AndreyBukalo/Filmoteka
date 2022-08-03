(() => {
  const refs = {
    openModalBtn: document.querySelector("[auth-modal-open]"),
    closeModalBtn: document.querySelector("[auth-modal-close]"),
    modal: document.querySelector("[auth-modal]"),
  };

  if (document.querySelector("[auth-modal-open]") != null) {
   refs.openModalBtn.addEventListener("click", toggleModal);
   refs.closeModalBtn.addEventListener("click", toggleModal);   
  }

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
