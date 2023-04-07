import React from 'react';

function Dropdown() {
  return (
    <div className="relative p-4">
      <select className="appearance-none bg-white border border-gray-400 py-2 px-4 pr-8 rounded shadow text-gray-700 w-full cursor-pointer outline-none">
        <option>Select an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>

      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <div className="border-t-4 border-r-4 border-b-0 border-l-4 h-4 w-4 inline-block transform rotate-45 -mt-1" />
      </div>
    </div>
  );
}

export default Dropdown;
