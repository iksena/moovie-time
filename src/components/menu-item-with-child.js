import Link from 'next/link';
import React from 'react';

function MenuItemWithChild({ title, items }) {
  return (
    <div className="relative group">
      <button
        className="font-semibold text-sm text-neutral-200 hover:bg-black/80 p-2"
        type="button"
      >
        {title}
      </button>

      {items && (
        <ul className="absolute z-10 top-full left-0 bg-white border rounded-md shadow-lg hidden group-hover:block">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.url}
                className="block px-4 py-2 text-[#1E232B] font-semibold text-xs hover:bg-gray-100"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuItemWithChild;
