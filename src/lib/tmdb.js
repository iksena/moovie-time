import constants from './constants';
import fetcher from './fetcher';

export const LIBRARY_TYPE = {
  MOVIE: 'movie',
  TV: 'tv',
};

export const MOVIE_LIST = {
  POPULAR_ASC: 'popularity.asc',
  POPULAR_DESC: 'popularity.desc',
  DATE_ASC: 'release_date.asc',
  DATE_DESC: 'release_date.desc',
  RATE_ASC: 'vote_average.asc',
  RATE_DESC: 'vote_average.desc',
};

export const LIBRARY_SORT = [
  { option: 'Popularity Ascending', value: MOVIE_LIST.POPULAR_ASC },
  { option: 'Popularity Descending', value: MOVIE_LIST.POPULAR_DESC },
  { option: 'Release Date Ascending', value: MOVIE_LIST.DATE_ASC },
  { option: 'Release Date Descending', value: MOVIE_LIST.DATE_DESC },
  { option: 'Rating Ascending', value: MOVIE_LIST.RATE_ASC },
  { option: 'Rating Descending', value: MOVIE_LIST.RATE_DESC },
];

export const getLibraries = async (
  page = 1,
  sortBy = MOVIE_LIST.POPULAR_DESC,
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
