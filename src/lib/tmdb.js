import constants from './constants';
import fetcher from './fetcher';

export const LIBRARY_TYPE = {
  MOVIE: 'movie',
  TV: 'tv',
};

export const MOVIE_LIST = {
  POPULAR_ASC: 'popularity.asc',
  POPULAR_DESC: 'popularity.desc',
  DATE_ASC: 'release_date.desc',
  DATE_DESC: 'release_date.desc',
  RATE_ASC: 'vote_average.desc',
  RATE_DESC: 'vote_average.desc',
};

export const getLibraries = async (
  page = 1,
  sortBy = MOVIE_LIST.POPULAR_ASC,
  type = LIBRARY_TYPE.MOVIE,
) => {
  const params = new URLSearchParams({
    api_key: constants.TMDB_API_KEY,
    sort_by: sortBy,
    page,
    language: 'en-US',
  });
  const url = `${constants.TMDB_BASE_URL}/discover/${type}?${params}`;
  const response = await fetcher(url);

  return response;
};

export const searchLibraries = async ({
  query,
  baseUrl = constants.TMDB_BASE_URL,
  apiKey = constants.TMDB_API_KEY,
  page = 1,
  type = LIBRARY_TYPE.MOVIE,
}) => {
  const params = new URLSearchParams({
    api_key: apiKey,
    query,
    page,
    language: 'en-US',
  });
  const url = `${baseUrl}/search/${type}?${params}`;
  const movies = await fetcher(url);

  return movies;
};

export const getImage = (path, width = 500) => {
  if (!path) return '/poster.png';
  return `https://image.tmdb.org/t/p/w${width}/${path}`;
};
