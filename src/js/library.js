import { renderPoster } from './api-keys';
import { getGenres,getRealeseYear,getMappedGenres, textSlicer } from './utils';
export const cards = document.querySelector('.card-list');
const btnWatched = document.querySelector('.watched');
const btnQueue = document.querySelector('.queue');

function preStepsBeforeWatched() {
  const watchedListFromStorage = localStorage.getItem('watchedList');
  const arrayWatchedListFromStorage = JSON.parse(watchedListFromStorage);
  btnWatched.classList.add('header-library__btn__is-active');
  btnQueue.classList.remove('header-library__btn__is-active');
  cards.innerHTML = '';
  if (watchedListFromStorage === '[]' || watchedListFromStorage === null) {
    const name =
      '<div class="card-text-no-film"><p>No watched movies added</p></div>';
    cards.innerHTML = name;
  } else {
    createCardsList(arrayWatchedListFromStorage);
  }
}

function preStepsBeforeQueue() {
  const queueListFromStorage = localStorage.getItem('queueList');
  const arrayQueueListFromStorage = JSON.parse(queueListFromStorage);
  btnWatched.classList.remove('header-library__btn__is-active');
  btnQueue.classList.add('header-library__btn__is-active');
  cards.innerHTML = '';
  if (queueListFromStorage === '[]' || queueListFromStorage === null) {
    const name = '<p class="card-text-no-film">No movie added to queue</p>';
    cards.innerHTML = name;
  } else {
    createCardsList(arrayQueueListFromStorage);
  }
}

function createCardsList(movie) {
  const markup = movie
    .map(movie => {
      const {
        id,
        title,
        poster_path,
        genres,
        vote_average,
        release_date,
      } = movie;
      let realeaseYear = '';
      let yearOfRealease = getRealeseYear(realeaseYear, release_date);
      if (release_date === '' || release_date === undefined) {
        yearOfRealease = 'Year:N/A';
      }
      let imgUrl = renderPoster + poster_path;
      if (poster_path === null) {
        imgUrl = 'https://i.postimg.cc/MTBLYYMP/poster-not-available.jpg';
      }
      const slicedTitle = textSlicer(title, 30);
      const movieGenresListArray = getMovieGenresListArray(genres);
      const movieGenresList = getGenres(movieGenresListArray).join(', ');
      return `
            <li class="card-item" tabindex="0" data-id="${id}">
            <img  class="card-item__img" src="${imgUrl}"
            alt="${title}" loading="lazy" data-id="${id}"/>
            <h2 class="card-item__title"  data-id="${id}">${slicedTitle}</h2>
            <p class="card-item__desc"> ${movieGenresList.slice(
              0,
              27
            )} | ${yearOfRealease} | <span class="vote-library">${vote_average.toFixed(
        1
      )}</span> </p>
            </li>
            `;
    })
    .join('');

  cards.insertAdjacentHTML('beforeend', markup);
}

function getMovieGenresListArray(genresIdsListArray) {
  let array = [];
  for (let i = 0; i < genresIdsListArray.length; i += 1) {
    array.push(genresIdsListArray[i].id);
  }
  return array;
}

// ------------------ Функція рендеру сторінки при зміні додаванні/видаленні фільмів у Модальному вікні фільму ---------------------

function reloadAfterModalClose() {
  if (btnWatched.classList.value.includes(`header-library__btn__is-active`)) {
    const watchedListFromStorageModal = localStorage.getItem('watchedList');
    const arrayWatchedListFromStorageModal = JSON.parse(watchedListFromStorageModal);
    if (cards.children.length === 0 || cards.children.length === 1 || arrayWatchedListFromStorageModal.length !== cards.children.length) {
      preStepsBeforeWatched();
    };
  } else if (btnQueue.classList.value.includes(`header-library__btn__is-active`)) {
    const queueListFromStorageModal = localStorage.getItem('queueList');
    const arrayQueueListFromStorageModal = JSON.parse(queueListFromStorageModal);
    if (cards.children.length === 0 || cards.children.length === 1 || arrayQueueListFromStorageModal.length !== cards.children.length) {
      preStepsBeforeQueue();
    };
  };
};

//---Added by Denis for authorized, don't delete please ;) --//
function authorizedOnly() {
  const watchedBtn = document.querySelector('[watch-button]')
  const queueBtn = document.querySelector('[queue-button]')

  watchedBtn.setAttribute('disabled', '') 
  queueBtn.setAttribute('disabled','')
}

function visualization(func) {
  if (JSON.parse(localStorage.getItem('auth')).auth != true) {
    authorizedOnly()
    return
  }
  else {
    func();
  }
}

visualization(preStepsBeforeWatched) 

//---Added by Denis for authorized, don't delete please ;) --//
const modal = document.querySelector('.modal-film-backdrop');
modal.addEventListener('click', reloadAfterModalClose);

//---Changed by Denis for authorized, don't change please ;) --//
btnWatched.addEventListener('click', (event) => {
  console.log('+')
  visualization(preStepsBeforeWatched) 
});
btnQueue.addEventListener('click', (event) => {
  console.log('+')
  visualization(preStepsBeforeQueue)
});