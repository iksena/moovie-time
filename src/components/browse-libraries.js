import Head from 'next/head';
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

function BrowseLibraries({ movies, type }) {
  const title = type === 'tv' ? 'TVs' : 'Movies';
  return (
    <div className="bg-moovie-background">
      <Head>
        <title>{`${title} - Moovie Time Perqara`}</title>
        <meta name="description" content={`Browse ${title} at Moovie Time Perqara`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopMenu />
      <main className="relative">
        <div className="absolute top-0 bg-white/5 h-80 w-full" />
        <Title title={title} />
        <div className="flex flex-row px-32 relative">
          <div className="sticky left-0 top-0 basis-1/4 mr-8"><FilterLibrary /></div>
          <div className="basis-3/4"><MovieGrid movies={movies} col={4} type={type} /></div>
        </div>
      </main>
    </div>
  );
}

export default BrowseLibraries;
