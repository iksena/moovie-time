import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import TMDBContext from '@/contexts/tmdb-context';
import { getLibraries } from '@/lib/tmdb';
import FilterLibrary from './filter-library';
import MovieGrid from './movie-grid';
import TopMenu from './top-menu';

function Title({ title }) {
  return (
    <div className="px-32 pt-20">
      <div className="w-32 h-1 top-0 mb-3 bg-moovie-red" />
      <div className="flex flex-row justify-between mb-12 mt-0.5">
        <span className="font-semibold text-4xl text-neutral-200">{title}</span>
      </div>
    </div>
  );
}

function BrowseLibraries({
  movies, type, sortBy, withGenres,
}) {
  const title = type === 'tv' ? 'TVs' : 'Movies';
  const { baseUrl, apiKey } = useContext(TMDBContext);
  const [movieList, setMovieList] = useState(movies?.results ?? []);
  console.log(movieList);
  const [page, setPage] = useState(movies.page);

  useEffect(() => {
    setMovieList(movies?.results ?? []);
  }, [movies]);

  const _fetchMovies = async () => {
    const nextPage = page + 1;
    const response = await getLibraries({
      page: nextPage, baseUrl, apiKey, sortBy, type, withGenres,
    });
    setMovieList((prevMovies) => [...prevMovies, ...(response?.results ?? [])]);
    setPage(response?.page ?? page);
  };

  return (
    <div className="bg-moovie-background">
      <Head>
        <title>{`${title} - Moovie Time Perqara`}</title>
        <meta name="description" content={`Browse ${title} at Moovie Time Perqara`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopMenu />
      <main className="relative pb-24">
        <div className="absolute top-0 bg-white/5 h-80 w-full" />
        <Title title={title} />
        <div className="flex flex-row px-32 relative mb-16">
          <div className="sticky left-0 top-0 basis-1/4 mr-8"><FilterLibrary /></div>
          <div className="basis-3/4"><MovieGrid movies={movieList} col={4} type={type} /></div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-large px-4 py-2 text-neutral-200 font-semibold bg-moovie-red hover:bg-black/20"
            onClick={_fetchMovies}
          >
            Load more
          </button>
        </div>
      </main>
    </div>
  );
}

export default BrowseLibraries;
