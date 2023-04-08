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

export const LIBRARY_GENRES = {
  action: {
    movieId: 28,
    tvId: 10759,
    name: 'Action',
    value: 'action',
  },
  adventure: {
    movieId: 12,
    tvId: 10759,
    name: 'Adventure',
    value: 'adventure',
  },
  animation: {
    movieId: 16,
    tvId: 16,
    name: 'Animation',
    value: 'animation',
  },
  comedy: {
    movieId: 35,
    tvId: 35,
    name: 'Comedy',
    value: 'comedy',
  },
  crime: {
    movieId: 80,
    tvId: 80,
    name: 'Crime',
    value: 'crime',
  },
  documentary: {
    movieId: 99,
    tvId: 99,
    name: 'Documentary',
    value: 'documentary',
  },
  drama: {
    movieId: 18,
    tvId: 18,
    name: 'Drama',
    value: 'drama',
  },
  family: {
    movieId: 10751,
    tvId: 10751,
    name: 'Family',
    value: 'family',
  },
  fantasy: {
    movieId: 14,
    tvId: 10765,
    name: 'Fantasy',
    value: 'fantasy',
  },
  history: {
    movieId: 36,
    tvId: 10768,
    name: 'History',
    value: 'history',
  },
  horror: {
    movieId: 27,
    tvId: 10766,
    name: 'Horror',
    value: 'horror',
  },
};

export const getLibraries = async (
  page = 1,
  sortBy = MOVIE_LIST.POPULAR_DESC,
  type = LIBRARY_TYPE.MOVIE,
  withGenres = '',
) => {
  const params = new URLSearchParams({
    api_key: constants.TMDB_API_KEY,
    sort_by: sortBy,
    page,
    language: 'en-US',
    with_genres: withGenres,
  });
  const url = `${constants.TMDB_BASE_URL}/discover/${type}?${params}`;
  const response = await fetcher(url);

  return response;
};

export const getLibraryDetail = async (
  id,
  type = LIBRARY_TYPE.MOVIE,
) => {
  const params = new URLSearchParams({
    api_key: constants.TMDB_API_KEY,
    language: 'en-US',
  });
  const url = `${constants.TMDB_BASE_URL}/${type}/${id}?${params}`;
  const response = await fetcher(url);

  return response;
};

export const getLibraryReviews = async (
  id,
  type = LIBRARY_TYPE.MOVIE,
  page = 1,
) => {
  const params = new URLSearchParams({
    api_key: constants.TMDB_API_KEY,
    language: 'en-US',
    page,
  });
  const url = `${constants.TMDB_BASE_URL}/${type}/${id}/reviews?${params}`;
  const response = await fetcher(url);

  return response?.results ?? [];
};

export const getLibraryRecommendations = async (
  id,
  type = LIBRARY_TYPE.MOVIE,
  page = 1,
) => {
  const params = new URLSearchParams({
    api_key: constants.TMDB_API_KEY,
    language: 'en-US',
    page,
  });
  const url = `${constants.TMDB_BASE_URL}/${type}/${id}/recommendations?${params}`;
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

export const getImage = (path, size = 'w500') => {
  if (!path) return '/poster.png';
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};
