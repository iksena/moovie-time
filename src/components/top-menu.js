import Link from 'next/link';

import SearchInput from './search-input';

function TopMenu() {
  return (
    <nav className="sticky top-0 px-32 bg-white/5 z-50">
      <div className="flex flex-row justify-between">
        <div className="text-red-200"><Link href="/">Logo</Link></div>
        <div><SearchInput /></div>
        <div className="bg-red-200">Categories</div>
        <div className="bg-yellow-200">Movies</div>
        <div className="bg-red-200">TV Shows</div>
        <div className="bg-yellow-200">Login</div>
      </div>
    </nav>
  );
}

export default TopMenu;
