import Image from 'next/image';
import { format } from 'date-fns';
import Head from 'next/head';

import { getImage } from '@/lib/tmdb';
import { formatUsd, formatYear } from '@/lib/utils';
import MovieGrid from './movie-grid';
import TopMenu from './top-menu';

function DetailText({ title, value }) {
  return (
    <div className="flex flex-col mr-8">
      <span className="font-medium text-xs text-white/50 mb-1">{title}</span>
      <span className="font-medium text-xs text-white">{value}</span>
    </div>
  );
}

function Properties({
  vote_average, vote_count, status, spoken_languages, budget, production_companies,
}) {
  return (
    <div className="flex flex-row mt-8">
      <Image
        src="/star.svg"
        alt="star"
        width={32}
        height={32}
        priority
      />
      <h1 className="font-semibold text-4xl text-neutral-200 mx-3">{vote_average}</h1>
      <DetailText title="USER SCORE" value={`${vote_count} VOTES`} />
      <div className="border-white/20 h-10 mr-8 border-r-[1px]" />
      <DetailText title="STATUS" value={status?.toUpperCase() ?? ''} />
      <div className="border-white/20 h-10 mr-8 border-r-[1px]" />
      <DetailText title="LANGUAGE" value={spoken_languages?.[0]?.english_name?.toUpperCase() ?? 'UNKNOWN'} />
      <div className="border-white/20 h-10 mr-8 border-r-[1px]" />
      <DetailText title="BUDGET" value={formatUsd(budget)} />
      <div className="border-white/20 h-10 mr-8 border-r-[1px]" />
      <DetailText title="PRODUCTION" value={production_companies?.[0]?.name ?? 'UNKNOWN'} />
    </div>
  );
}

function Detail({ movieDetail }) {
  const genres = (movieDetail.genres?.map((item) => item.name) ?? ['No Genre']).join(', ');

  return (
    <div className="absolute top-44 left-32 flex flex-row">
      <Image
        src={getImage(movieDetail.poster_path)}
        alt={`Poster image of ${movieDetail.title ?? movieDetail.name}`}
        placeholder="blur"
        blurDataURL="/poster.png"
        className="object-cover overflow-hidden w-80 min-w-[220px] max-w-[220px]"
        width={220}
        height={330}
      />
      <div className="ml-8 mt-5">
        <h2 className="font-medium text-2xl text-neutral-200">{formatYear((movieDetail.release_date || movieDetail.first_air_date) || 0)}</h2>
        <h1 className="font-semibold text-4xl text-neutral-200 mt-1">{movieDetail.title ?? movieDetail.name}</h1>
        <span className="font-medium text-neutral-200 mt-1">{genres}</span>
        <Properties {...movieDetail} />
        <div className="mt-12 w-1/2">
          <h3 className="font-semibold text-sm text-moovie-red">OVERVIEW</h3>
          <span className="font-normal text-sm mt-2 whitespace-pre-wrap break-words text-ellipsis line-clamp-3">{movieDetail.overview}</span>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  author_details, author, updated_at, content,
}) {
  const name = author_details.name || author;
  return (
    <div className="bg-[#F9F9F9] p-5 rounded-2xl">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <div className="rounded-full mr-6">
            <Image
              src={getImage(author_details.avatar_path, 'w200')}
              alt={name}
              placeholder="blur"
              blurDataURL="/profile.png"
              className="rounded-full object-cover w-12 h-12"
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#1E232A]">{name}</span>
            <span className="text-[#666666]">{format(new Date(updated_at), 'MMMM dd, yyyy')}</span>
          </div>
        </div>
        <div className="rounded-lg bg-[#C4C4C447]/20 p-2 flex flex-row">
          <Image
            className="self-start"
            src="/star.svg"
            alt="star"
            width={17}
            height={17}
            priority
          />
          <h1 className="font-semibold text-4xl">{author_details.rating || 'N/A'}</h1>
        </div>
      </div>
      <span className="text-sm text-ellipsis italic mt-6">
        {content}
      </span>
    </div>
  );
}

function MovieDetail({
  movieDetail, reviews, recommendations, type,
}) {
  return (
    <div className="bg-white">
      <Head>
        <title>{`${movieDetail.title || movieDetail.name} - Moovie Time Perqara`}</title>
        <meta name="description" content={`See detail of ${movieDetail.title} at Moovie Time Perqara`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed z-50 w-full top-0"><TopMenu /></div>
      <main className="relative">
        <div className="relative overflow-hidden w-full h-[45vh]">
          <Image
            src={getImage(movieDetail.backdrop_path, 'original')}
            alt={`Backdrop image of ${movieDetail.title}`}
            placeholder="blur"
            blurDataURL="/backdrop.png"
            className="object-cover w-full h-[45vh]"
            width={1440}
            height={500}
          />
          <div className="absolute bottom-0 w-full h-16 bg-black/50" />
          <div className="absolute inset-0 w-full h-full bg-black/60" />
        </div>
        <Detail movieDetail={movieDetail} />
        <div className="px-32 mt-48">
          <h3 className="font-semibold text-sm text-moovie-red mb-6">REVIEWS</h3>
          <div className="grid grid-cols-2 gap-8">
            {reviews.map((review) => <ReviewCard key={review.id} {...review} />)}
          </div>
        </div>
        <div className="mt-14 py-12 px-32 bg-[#1e232b]">
          <h3 className="font-semibold text-white mb-8">RECOMMENDATIONS</h3>
          <MovieGrid movies={recommendations?.results ?? []} type={type} />
        </div>
      </main>
    </div>
  );
}

export default MovieDetail;
