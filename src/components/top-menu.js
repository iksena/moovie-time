import Link from 'next/link';

import { LIBRARY_GENRES } from '@/lib/tmdb';
import Image from 'next/image';
import SearchInput from './search-input';
import MenuItemWithChild from './menu-item-with-child';

const categoryMenuChildren = [
  { title: 'ACTION', url: `/library/movie?genre=${LIBRARY_GENRES.action.value}` },
  { title: 'ADVENTURE', url: `/library/movie?genre=${LIBRARY_GENRES.adventure.value}` },
  { title: 'ANIMATION', url: `/library/movie?genre=${LIBRARY_GENRES.animation.value}` },
  { title: 'COMEDY', url: `/library/movie?genre=${LIBRARY_GENRES.comedy.value}` },
  { title: 'CRIME', url: `/library/movie?genre=${LIBRARY_GENRES.crime.value}` },
  { title: 'DOCUMENTARY', url: `/library/movie?genre=${LIBRARY_GENRES.documentary.value}` },
  { title: 'DRAMA', url: `/library/movie?genre=${LIBRARY_GENRES.drama.value}` },
  { title: 'FAMILY', url: `/library/movie?genre=${LIBRARY_GENRES.family.value}` },
  { title: 'FANTASY', url: `/library/movie?genre=${LIBRARY_GENRES.fantasy.value}` },
  { title: 'HISTORY', url: `/library/movie?genre=${LIBRARY_GENRES.history.value}` },
  { title: 'HORROR', url: `/library/movie?genre=${LIBRARY_GENRES.horror.value}` },
];

function TopMenu() {
  return (
    <nav className="sticky top-0 px-32 bg-white/5 z-50 py-3">
      <div className="flex flex-row justify-between items-center">
        <Link href="/" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">MoovieTime</Link>
        <div><SearchInput /></div>
        <div className="flex flex-row">
          <Image
            className="mr-2"
            src="/widgets.svg"
            alt="categories"
            width={20}
            height={20}
            priority
          />
          <MenuItemWithChild items={categoryMenuChildren} title="CATEGORIES" />
        </div>
        <Link href="/library/movie" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">MOVIES</Link>
        <Link href="/library/tv" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">TV SHOWS</Link>
        <Link href="/" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">LOGIN</Link>
      </div>
    </nav>
  );
}

export default TopMenu;
