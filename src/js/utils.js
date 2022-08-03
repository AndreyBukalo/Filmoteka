import { genres } from './genres.json';
import { cards } from './render-trends';

function getRealeseYear(year, release) {
  if (typeof release !== 'undefined') {
    year = release.slice(0, 4);
    return year;
  }

}

function getMappedGenres(genres) {
  let mappedGenres = genres.map(gen => gen.name).join(', ');
  if (genres.length === 0) {
   return mappedGenres = 'Other';
  }
  return mappedGenres;
}
function getGenres(genresId) {
  let movieGenres = genres.reduce((acc, { id, name }) => {
    if (genresId.includes(id)) {
      acc.push(name);
    }
    return acc;
  }, []);
  if (movieGenres.length > 3 || movieGenres.length === 0) {
    movieGenres = movieGenres.slice(0, 2);
    movieGenres.push('Other');
  }
  return movieGenres;
}

function textSlicer(text, limit) {
  text = text.trim();
  if (text.length <= limit) return text;
  text = text.slice(0, limit);
  return text + '...';
}

export { getGenres, textSlicer, getRealeseYear, getMappedGenres };
