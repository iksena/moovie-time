import Link from 'next/link';

import SearchInput from './search-input';

function TopMenu() {
  return (
    <nav className="sticky top-0 px-32 bg-white/5 z-50 py-3">
      <div className="flex flex-row justify-between items-center">
        <div className="font-semibold text-sm text-neutral-200"><Link href="/">Logo</Link></div>
        <div><SearchInput /></div>
        <div className="font-semibold text-sm text-neutral-200">CATEGORIES</div>
        <div className="font-semibold text-sm text-neutral-200">MOVIES</div>
        <div className="font-semibold text-sm text-neutral-200">TV SHOWS</div>
        <div className="font-semibold text-sm text-neutral-200">LOGIN</div>
      </div>
    </nav>
  );
}

export default TopMenu;
