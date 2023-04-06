import MovieItem from './movie-item';

function MovieGrid({ movies }) {
  const movieList = movies?.results ?? [];

  return (
    <div className="grid grid-cols-5 gap-x-6 gap-y-8">
      {movieList.map((movie) => <MovieItem key={movie.title} {...movie} />)}
    </div>
  );
}

export default MovieGrid;
