import axios from 'axios';
import {
  KEY,
  DEFAULT_URL,
  BY_TRENDS,
  BY_SEARCH,
  BY_ID,
  renderPoster,
} from './api-keys';
import { renderTrendCollection, renderOneFilm } from './render-trends';
export { renderMainPage, fetchTrendMovies, fetchBySearchMovies, fetchByID };

// Fetch полной инф-ы по трендам
async function fetchTrendMovies(page = 1) {
  try {
    const { data } = await axios.get(
      `${BY_TRENDS}?api_key=${KEY}&page=${page}&language=en`
    );
    return data;
  } catch (error) {}
}

//Fetch by Search
async function fetchBySearchMovies(formInput, page = 1) {
  try {
    const { data } = await axios.get(
      `${BY_SEARCH}?api_key=${KEY}&query=${formInput}&page=${page}`
    );
    return data;
  } catch (error) {}
}

async function fetchByID(id) {
  try {
    const { data } = await axios.get(`${BY_ID}${id}?api_key=${KEY}`);
    return data;
  } catch (error) {}
}
function renderMainPage() {
  fetchTrendMovies().then(data => {
    renderTrendCollection(data);
  });
}
