import { LsWatched, LsQueue } from './localstorage';
import { fetchByID } from './api-fetch';
import { cards, renderOneFilm } from './render-trends';
import { hideLoader, showLoader } from './preloader';
let movieId;
cards.addEventListener('click', oneCardRender);
cards.addEventListener('keydown', onEnterKeyDown);

function onEnterKeyDown(e) {
  if (e.key === 'Enter') {
    oneCardRender(e);
  }
}

export function oneCardRender(event) {
  
  if (
    !event.target.classList.contains('card-item__img') &&
    !event.target.classList.contains('card-item__title') &&
    !event.target.classList.contains('card-item')
  ) {
    console.log('return');
    return;
  }
showLoader();
  event.preventDefault();
  movieId = event.target.dataset.id;
  fetchByID(movieId).then(data => {
    showLoader();
    renderOneFilm(data);
    hideLoader();
    const watchedBtn = document.querySelector('.modal-window__btn--watched');
    const queuedBtn = document.querySelector('.modal-window__btn--queue');
    // + оновити класи для watchedBtn
    // + оновити класи для queuedBtn
    watchedBtn.innerHTML = LsWatched.isIncluded(Number(movieId))
      ? 'REMOVE FROM WATCHED'
      : 'ADD TO WATCHED';
    queuedBtn.innerHTML = LsQueue.isIncluded(Number(movieId))
      ? 'REMOVE FROM QUEUE'
      : 'ADD TO QUEUE';
    // + оновити класи для watchedBtn
    // + оновити класи для queuedBtn
    watchedBtn.addEventListener('click', () => {
      if (!LsWatched.isIncluded(Number(movieId))) {
        LsWatched.addItem(data);
        watchedBtn.innerHTML = 'REMOVE FROM WATCHED';
        // + оновити класи для watchedBtn
      } else {
        LsWatched.deleteItem(Number(movieId));
        watchedBtn.innerHTML = 'ADD TO WATCHED';
        // + оновити класи для watchedBtn
      }
    });
    queuedBtn.addEventListener('click', () => {
      if (!LsQueue.isIncluded(Number(movieId))) {
        LsQueue.addItem(data);
        queuedBtn.innerHTML = 'REMOVE FROM QUEUE';
      } else {
        LsQueue.deleteItem(Number(movieId));
        queuedBtn.innerHTML = 'ADD TO QUEUE';
      }
    });
    document.querySelector('.filmModal-btn').focus();
  });
}
