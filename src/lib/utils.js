export const arrayToQuery = (array, key) => array.reduce(
  (query, value, index) => query.concat(
    `${key}=${value}${index !== array.length - 1 ? '&' : ''}`,
  ),
  '',
);

export const castArray = (value) => (Array.isArray(value) ? value : [value]);
