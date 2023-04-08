import { useRouter } from 'next/router';

import { LIBRARY_GENRES, LIBRARY_SORT } from '@/lib/tmdb';
import { arrayToQuery, castArray } from '@/lib/utils';
import Dropdown from './dropdown';
import Checkbox from './checkbox';

function FilterLibrary() {
  const router = useRouter();
  const [currentPath] = router.asPath.split('?');
  const { genre, sortBy } = router.query;

  const handleCheckGenre = (genreValue) => (event) => {
    const isChecked = event.target.checked;
    const path = sortBy ? `${currentPath}?sortBy=${sortBy}&` : `${currentPath}?`;
    if (!genre && isChecked) {
      return router.push(`${path}genre=${genreValue}`);
    }

    const currentGenres = castArray(genre);
    if (isChecked) {
      currentGenres.push(genreValue);
      return router.push(`${path}${arrayToQuery(currentGenres, 'genre')}`);
    }
    const selectedGenres = currentGenres.filter((value) => value !== genreValue);
    return router.push(`${path}${arrayToQuery(selectedGenres, 'genre')}`);
  };

  return (
    <div className="rounded-lg bg-gradient-to-b from-[#0E1723] to-[#1E232A]">
      <div className="text-neutral-200 font-semibold text-base text-left p-4">Sort Result By</div>
      <div className="border-[1px] border-white/5 w-full" />
      <div className="p-4">
        <Dropdown
          options={LIBRARY_SORT}
          onSelect={(option) => router.push(`${currentPath}?sortBy=${option}`)}
        >
          Popularity
        </Dropdown>
      </div>
      <div className="border-[1px] border-white/5 w-full" />
      <div className="text-neutral-200 font-semibold text-base text-left p-4">Genres</div>
      <div className="border-[1px] border-white/5 w-full" />
      {Object.values(LIBRARY_GENRES).map((genreItem) => (
        <Checkbox
          key={genreItem.movieId}
          onCheck={handleCheckGenre(genreItem.value)}
          isChecked={castArray(genre).includes(genreItem.value)}
        >
          {genreItem.name}
        </Checkbox>
      ))}
    </div>
  );
}

export default FilterLibrary;
