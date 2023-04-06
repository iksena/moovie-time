import constants from './constants';
import fetcher from './fetcher';

export const MOVIE_LIST = {
  POPULAR_ASC: 'popularity.asc',
  POPULAR_DESC: 'popularity.desc',
  DATE_ASC: 'release_date.desc',
  DATE_DESC: 'release_date.desc',
  RATE_ASC: 'vote_average.desc',
  RATE_DESC: 'vote_average.desc',
};

export const getMovies = async (sortBy = MOVIE_LIST.POPULAR_ASC, page = 1) => {
  const params = new URLSearchParams({
    api_key: constants.TMDB_API_KEY,
    sort_by: sortBy,
    page,
    language: 'en-US',
    include_adult: true,
  });
  const url = `${constants.TMDB_BASE_URL}/discover/movie/?${params}`;
  const movies = await fetcher(url);

  return movies;
};

export const getImage = (path, width = 500) => {
  if (!path) return '/poster.png';
  return `https://image.tmdb.org/t/p/w${width}/${path}`;
};
