import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import format from 'date-fns/format';

import { getImage } from '@/lib/tmdb';

function ViewButton({ children, href }) {
  return (
    <Link
      href={href}
      className="rounded-large px-4 py-2 text-neutral-200 font-semibold z-10 bg-moovie-red focus:bg-black/20 hover:bg-black/20"
    >
      {children}
    </Link>
  );
}

function PosterHover({
  vote_average,
  genre,
  id,
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-around items-center bg-black/80">
      <span className="text-neutral-200 font-semibold text-2xl">{vote_average}</span>
      <span className="text-neutral-200 font-semibold text-lg">{genre}</span>
      <ViewButton href={`/movies/${id}`}>VIEW</ViewButton>
    </div>
  );
}

function MovieItem(props) {
  const {
    poster_path, vote_average, title, release_date,
  } = props;
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col z-10">
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
          {hover && <PosterHover {...props} genre="Action" />}
        </div>
        <div className="flex flex-col whitespace-pre-wrap break-words">
          <span className="text-base text-neutral-200 font-semibold mt-3">{title}</span>
          <span className="text-sm text-moovie-subtitle font-normal mt-1">{format(new Date(release_date || 0), 'yyyy')}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
