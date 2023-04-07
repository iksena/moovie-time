import { LIBRARY_SORT } from '@/lib/tmdb';
import { useRouter } from 'next/router';
import Dropdown from './dropdown';

function Checkbox({ children, isChecked, onCheck }) {
  return (
    <div className="p-4">
      <label className="flex flex-row items-center text-neutral-200 justify-between" htmlFor={`checkbox-${children}`}>
        {children}
        <input
          className="h-4 w-4 rounded-sm border-2 border-white bg-white/20"
          type="checkbox"
          id={`checkbox-${children}`}
          checked={isChecked}
          onChange={onCheck}
        />
      </label>
    </div>
  );
}
function FilterLibrary() {
  const router = useRouter();
  const [currentPath] = router.asPath.split('?');

  return (
    <div className="rounded-lg bg-neutral-800">
      <div className="text-neutral-200 font-semibold text-base text-left p-4">Sort Result By</div>
      <div className="border-[1px] border-white/5 w-full" />
      <div className="p-4">
        <Dropdown
          options={LIBRARY_SORT}
          onSelect={(option) => router.push(`${currentPath}?sortBy=${option}`)}
        >
          Popularity
        </Dropdown>
      </div>
      <div className="border-[1px] border-white/5 w-full" />
      <div className="text-neutral-200 font-semibold text-base text-left p-4">Genres</div>
      <div className="border-[1px] border-white/5 w-full" />
      <Checkbox>Action</Checkbox>
    </div>
  );
}

export default FilterLibrary;
