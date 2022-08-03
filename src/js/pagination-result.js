import { fetchTrendMovies, fetchBySearchMovies } from './api-fetch';
import createPagination from './pagination';
import { showLoader, hideLoader } from './preloader';
import { renderTrendCollection } from './render-trends';
import { LsCurrent } from './localstorage';

const moviesList = document.querySelector('.card-list');
const searchForm = document.getElementById('search-form');
const searchError = document.querySelector('.header__search-error');

window.addEventListener('load', onPageLoad);

//  Налаштування пагінації при завантаженні трендових фільмів (головної сторінки)
async function onPageLoad() {
  try {
    showLoader();
    const movies = await fetchTrendMovies();
    LsCurrent.setItems(movies.results);

    const instance = createPagination();
    instance.setItemsPerPage(20);
    instance.setTotalItems(movies.total_results);
    instance.movePageTo(movies.page);
    instance.on('afterMove', event => {
      const currentPage = event.page;
      window.scrollTo({ top: 220, behavior: 'smooth' });
      loadMoreTrendMovies(currentPage);
    });
    hideLoader();
  } catch (error) {}
}

async function loadMoreTrendMovies(currentPage) {
  try {
    showLoader();
    const movies = await fetchTrendMovies(currentPage);
    LsCurrent.setItems(movies.results);
    clearPreviousResults();
    renderTrendCollection(movies);
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

// Налаштування пагінації для пошуку фільмів та обробка сабміту форми пошуку

searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;

  if (searchQuery.trim() === '') {
    searchError.classList.remove('is-hidden');
    setTimeout(() => { searchError.classList.add('is-hidden'); }, 5000);
    return;
  } else {
    loadSearchMovies(searchQuery);
  }
}
async function loadSearchMovies(searchQuery) {
  try {
    showLoader();
    const searchMovies = await fetchBySearchMovies(searchQuery, 1);

    if (searchMovies.results.length === 0) {
      hideLoader();
      searchError.classList.remove('is-hidden');
      setTimeout(() => { searchError.classList.add('is-hidden'); }, 5000);
      return; 
    }
    
    clearMoviesList();
    renderTrendCollection(searchMovies);

    const instance = createPagination();
    instance.setItemsPerPage(20);
    instance.setTotalItems(searchMovies.total_results);
    instance.movePageTo(searchMovies.page);

    instance.on('afterMove', event => {
      const currentPage = event.page;
      window.scrollTo({ top: 220, behavior: 'smooth' });
      loadMoreSearchMovies(searchQuery, currentPage);
    });
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

async function loadMoreSearchMovies(searchQuery, currentPage) {
  try {
    showLoader();
    const searchMovies = await fetchBySearchMovies(searchQuery, currentPage);
    clearPreviousResults();
    renderTrendCollection(searchMovies);
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

function clearPreviousResults() {
  if (moviesList.hasChildNodes() === true) {
    moviesList.innerHTML = '';
  }
}
function clearMoviesList() {
  moviesList.innerHTML = '';
}
