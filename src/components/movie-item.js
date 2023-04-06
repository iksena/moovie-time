import Image from 'next/image';
import format from 'date-fns/format';

import { getImage } from '@/lib/tmdb';

function MovieItem({
  poster_path, vote_average, title, release_date,
}) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Image
          src={getImage(poster_path)}
          alt={`Poster image of ${title}`}
          placeholder="blur"
          blurDataURL="/poster.png"
          className="object-cover overflow-hidden w-80"
          width={220}
          height={330}
        />
        <span className="absolute top-0 right-0 bg-neutral-800/80 text-neutral-200 font-bold p-1">
          {vote_average}
        </span>
      </div>
      <div className="flex flex-col whitespace-pre-wrap break-words">
        <span className="text-base text-neutral-200 font-semibold mt-3">{title}</span>
        <span className="text-sm text-moovie-subtitle font-normal mt-1">{format(new Date(release_date || 0), 'yyyy')}</span>
      </div>
    </div>
  );
}

export default MovieItem;
