
import { renderPoster } from './api-keys';
import { getGenres, getRealeseYear, getMappedGenres, textSlicer } from './utils';
export const cards = document.querySelector('.card-list');

export function renderTrendCollection(movie) {
 const markup = movie.results
    .map(movie => {
     const { id, title, poster_path, genre_ids, release_date } =
        movie;
      let imgUrl = renderPoster + poster_path;
       if (poster_path === null) {
         imgUrl = 'https://i.postimg.cc/MTBLYYMP/poster-not-available.jpg';
       }
      let realeaseYear = '';
      let yearOfRealease = getRealeseYear(realeaseYear, release_date);
      if (release_date === '' || release_date ===  undefined) {
        yearOfRealease = 'Year:N/A';
      }
      const slicedTitle = textSlicer(title, 30);
      const movieGenresList = getGenres(genre_ids).join(', ');
     
      return `
      <li class="card-item" tabindex="0" data-id="${id}">
      <img  class="card-item__img" src="${imgUrl}"
         alt="${title}" loading="lazy" data-id="${id}"/>
      <div class="movie-meta">
         <h2 class="card-item__title"  data-id="${id}">${slicedTitle}</h2>
         <p class="card-item__desc"> ${movieGenresList} | ${yearOfRealease} </p>
      </div></li>
      `;
    })
    .join('');

  cards.insertAdjacentHTML('beforeend', markup);
}

const filmBackdropEl = document.querySelector('.modal-film-backdrop');
const bodyElement = document.querySelector('body');
export function renderOneFilm(...movie) {
  const markupOneFilm = movie
    .map(movie => {
      const {
        id,
        title,
        poster_path,
        genres,
        overview,
        vote_average,
        vote_count,
        original_title,
        popularity,
        release_date,
      } = movie;
      let imgUrl = renderPoster + poster_path;
      if (poster_path === null) {
        imgUrl = 'https://i.postimg.cc/MTBLYYMP/poster-not-available.jpg';
      };
      const mappedGenres = getMappedGenres(genres)
      let popular = parseInt(popularity);
      if (popularity < 20 ) {
        popular = 'Not available';
      };

      return `
<div class="modal-window__film">
  <div class="modal-window__image">
    <img src="${imgUrl}" 
   alt="${title}" loading="lazy" data-id="${id}" >

  </div>
  <button class="filmModal-btn" type="button">
      X
  </button>
  <div class="modal-window__content">
  <h2 class="modal-window__film--title" data-id="${id}">${title}</h2>
  <div class="modal-window__info">
    <ul class="modal-window__info--list">
      <li class="modal-window__info--content">
        <p class="modal-window__review--text">Vote / Votes</p>
        <p class="modal-window__info--vote-votes"><span class="modal-window__data--vote">${vote_average.toFixed(
          1
        )}</span> / <span class="modal-window__data--votes">${vote_count}</span></p>
      </li>
      <li class="modal-window__info--content">
        <p class="modal-window__review--text">Popularity</p>
        <p class="modal-window__data--popul">${popular}</p>
      </li>
      <li class="modal-window__info--content">
        <p class="modal-window__review--text">Original Title</p>
        <p class="modal-window__data--title">${original_title}</p>
      </li>
      <li class="modal-window__info--content">
        <p class="modal-window__review--text">Genre</p>
        <p class="modal-window__data--genre">${mappedGenres}</p>
      </li>
    </ul>
  </div>
  <h3 class="modal-window__about-film">ABOUT</h3>
  <p class="modal-window__film--overview">${overview}</p>
  <div class="modal-window__buttons">
  <button class="modal-window__btn--watched" type="button">ADD TO WATCHED</button>
  <button class="modal-window__btn--queue" type="button">ADD TO QUEUE</button>
  </div>
  </div>
</div>
`;
    })
    .join('');

  filmBackdropEl.insertAdjacentHTML('afterbegin', markupOneFilm);
  const filmCloseBtn = document.querySelector('.filmModal-btn');
  filmBackdropEl.style.display = 'block';
  bodyElement.style.overflow = 'hidden';
  filmBackdropEl.addEventListener('click', onBackdropClose);
  filmCloseBtn.addEventListener('click', onFilmModalClose);
  window.addEventListener('keydown', onEscClose);
}
function onFilmModalClose(e) {
  filmBackdropEl.innerHTML = '';
  bodyElement.style.overflow = 'scroll';
  filmBackdropEl.style.display = 'none';
  filmBackdropEl.removeEventListener('click', onBackdropClose, false);
  window.removeEventListener('keydown', onEscClose, false);
}
function onBackdropClose(e) {
  if (e.target === filmBackdropEl) {
    onFilmModalClose();
  }
}
function onEscClose(e) {
  if (e.key === 'Escape') {
    onFilmModalClose();
  }
}
