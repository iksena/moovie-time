import { useMemo } from 'react';

import {
  getLibraries,
  getLibraryDetail,
  getLibraryRecommendations,
  getLibraryReviews,
} from '@/lib/tmdb';
import { constructGenreString } from '@/lib/utils';
import constants from '@/lib/constants';
import Footer from '@/components/footer';
import TMDBContext from '@/contexts/tmdb-context';
import BrowseLibraries from '@/components/browse-libraries';
import MovieDetail from '@/components/movie-detail';

export default function Libraries({
  type, baseUrl, apiKey, movies, id, movieDetail, reviews, recommendations,
}) {
  const tmdb = useMemo(() => ({ apiKey, baseUrl }), [baseUrl, apiKey]);

  return (
    <TMDBContext.Provider value={tmdb}>
      {id
        ? (
          <MovieDetail
            movieDetail={movieDetail}
            reviews={reviews}
            recommendations={recommendations}
          />
        )
        : <BrowseLibraries movies={movies} type={type} />}
      <footer className="bg-moovie-background">
        <Footer />
      </footer>
    </TMDBContext.Provider>
  );
}

const _fetchLibraryDetail = async (id, type) => {
  const [movieDetail, reviews, recommendations] = await Promise.all([
    getLibraryDetail(id, type),
    getLibraryReviews(id, type),
    getLibraryRecommendations(id, type),
  ]);

  return {
    movieDetail,
    reviews,
    recommendations,
  };
};

export async function getServerSideProps({ query }) {
  const { paths, sortBy, genre } = query;
  const [type, id = false] = paths;
  const baseUrl = constants.TMDB_BASE_URL;
  const apiKey = constants.TMDB_API_KEY;

  if (id) {
    const {
      movieDetail,
      reviews,
      recommendations,
    } = await _fetchLibraryDetail(id, type);

    return {
      props: {
        movieDetail,
        reviews,
        recommendations,
        baseUrl,
        apiKey,
        type,
        id,
      },
    };
  }

  const genreString = constructGenreString(genre, type);
  const movies = await getLibraries(1, sortBy, type, genreString);

  return {
    props: {
      movies,
      baseUrl,
      apiKey,
      type,
    },
  };
}
