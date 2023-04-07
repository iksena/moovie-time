import Link from 'next/link';

import SearchInput from './search-input';
import MenuItemWithChild from './menu-item-with-child';

const categoryMenuChildren = [
  { title: 'ACTION', url: '/action' },
  { title: 'ADVENTURE', url: '/ADVENTURE' },
  { title: 'ANIMATION', url: '/ANIMATION' },
  { title: 'COMEDY', url: '/COMEDY' },
  { title: 'CRIME', url: '/CRIME' },
  { title: 'DOCUMENTARY', url: '/DOCUMENTARY' },
  { title: 'DRAMA', url: '/DRAMA' },
  { title: 'FAMILY', url: '/FAMILY' },
  { title: 'FANTASY', url: '/FANTASY' },
  { title: 'HISTORY', url: '/HISTORY' },
  { title: 'HORROR', url: '/HORROR' },
];

function TopMenu() {
  return (
    <nav className="sticky top-0 px-32 bg-white/5 z-50 py-3">
      <div className="flex flex-row justify-between items-center">
        <Link href="/" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">MoovieTime</Link>
        <div><SearchInput /></div>
        <MenuItemWithChild items={categoryMenuChildren} title="CATEGORIES" />
        <Link href="/movies" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">MOVIES</Link>
        <Link href="/tv" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">TV SHOWS</Link>
        <Link href="/" className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2">LOGIN</Link>
      </div>
    </nav>
  );
}

export default TopMenu;
