import { format } from 'date-fns';

import { LIBRARY_GENRES, LIBRARY_TYPE } from './tmdb';

export const arrayToQuery = (array, key) => array.reduce(
  (query, value, index) => query.concat(
    `${key}=${value}${index !== array.length - 1 ? '&' : ''}`,
  ),
  '',
);

export const castArray = (value) => (Array.isArray(value) ? value : [value]);

export const constructGenreString = (genreQuery, type) => {
  if (genreQuery) {
    const currentGenres = castArray(genreQuery);
    return currentGenres.map(
      (genreValue) => (
        (type === LIBRARY_TYPE.TV
          ? LIBRARY_GENRES[genreValue]?.tvId
          : LIBRARY_GENRES[genreValue]?.movieId) ?? ''
      ),
    ).join(',');
  }
  return '';
};

export const formatYear = (date) => format(new Date(date ?? 0), 'yyyy');

export const formatUsd = (number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(number);
};
