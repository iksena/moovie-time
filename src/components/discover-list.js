import { MOVIE_LIST } from '@/lib/tmdb';
import Link from 'next/link';
import MovieGrid from './movie-grid';

function SortLabel({ children, href, isSelected }) {
  const background = isSelected ? 'bg-moovie-red' : 'bg-black/20';

  return (
    <Link
      href={href}
      className={`
        rounded-large px-4 py-2 text-neutral-200 font-semibold ml-5 z-10 
        ${background} focus:bg-moovie-red hover:bg-moovie-red`}
    >
      {children}
    </Link>
  );
}

function DiscoverList({ movies }) {
  return (
    <div className="px-32 pt-20 pb-32">
      <div className="w-32 h-1 top-0 mb-3 bg-moovie-red" />
      <div className="flex flex-row justify-between mb-12 mt-0.5">
        <span className="font-semibold text-2xl text-neutral-200">Discover Movies</span>
        <div className="flex">
          <SortLabel href={`/?sortBy=${MOVIE_LIST.POPULAR_DESC}`}>Popular</SortLabel>
          <SortLabel href={`/?sortBy=${MOVIE_LIST.DATE_DESC}`}>Release Date</SortLabel>
        </div>
      </div>
      <MovieGrid movies={movies} />
    </div>
  );
}

export default DiscoverList;
