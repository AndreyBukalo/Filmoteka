import { hideLoader, showLoader } from './preloader';

const teamBtnEl = document.querySelector('.team-modal-btn');
const bodyEl = document.querySelector('body');
const modalEl = document.querySelector('.team-modal-wraper');
const modalBtnEl = document.querySelector('.teamModal-btn');
const teamBackdrop = document.querySelector('.team-modal-wraper');
teamBtnEl.addEventListener('click', onModalOpen);
modalBtnEl.addEventListener('click', onModalClose);
function onModalOpen(e) {
  showLoader();
  bodyEl.style.overflow = 'hidden';
  modalEl.style.display = 'flex';
  window.addEventListener('keydown', keydownOpen);
  teamBackdrop.addEventListener('click', onBackdropClick);
  setTimeout(hideLoader, 2000);
}
function onModalClose(e) {
  bodyEl.style.overflow = 'scroll';
  modalEl.style.display = 'none';
  window.removeEventListener('keydown', keydownOpen, false);
  teamBackdrop.addEventListener('click', onBackdropClick, false);
}
function keydownOpen(e) {
  if (e.key === 'Escape') {
    onModalClose();
  }
}
function onBackdropClick(e) {
  if (e.target === teamBackdrop) {
    onModalClose();
  }
}
