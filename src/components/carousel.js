import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LIBRARY_GENRES, getImage } from '@/lib/tmdb';
import { formatYear } from '@/lib/utils';

function CarouselItem({
  title, poster_path, vote_average, release_date, genre_ids, overview,
}) {
  const genre = Object.values(LIBRARY_GENRES).find(
    (item) => genre_ids.includes(item.movieId),
  )?.name ?? 'No genre';

  return (
    <div className="relative mx-4 flex flex-row items-center">
      <Image
        src={getImage(poster_path)}
        alt={`Poster image of ${title}`}
        placeholder="blur"
        blurDataURL="/poster.png"
        className="object-cover overflow-hidden min-w-[243px] bg-cover bg-center"
        width={243}
        height={365}
      />
      <div className="flex flex-col p-6 bg-black max-h-80">
        <div className="flex flex-row">
          <Image
            src="/star.svg"
            alt="star"
            width={16}
            height={16}
            priority
          />
          <span className="font-bold text-white text-lg ml-1">{vote_average}</span>
        </div>
        <h1 className="font-medium text-white text-3xl mt-1">{title}</h1>
        <div className="flex flex-row items-center">
          <span className="text-white">{formatYear(release_date)}</span>
          <span className="text-white/50 text-4xl mx-1">·</span>
          <span className="text-white">{genre}</span>
        </div>
        <span className="text-white text-xs line-clamp-6 text-ellipsis">{overview}</span>
      </div>
    </div>
  );
}

function Carousel({ movies }) {
  const movieList = movies?.results ?? [];

  const settings = {
    className: 'center',
    centerPadding: '60px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <Slider {...settings} className="my-14 overflow-hidden">
      {movieList.map((movie) => (
        <CarouselItem key={movie.key} {...movie} />
      ))}
    </Slider>
  );
}

export default Carousel;
