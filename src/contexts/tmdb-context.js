import constants from '@/lib/constants';
import { createContext } from 'react';

const TMDBContext = createContext({
  baseUrl: constants.TMDB_BASE_URL,
  apiKey: constants.TMDB_API_KEY,
});

export default TMDBContext;
