import React, { useState } from 'react';

function Dropdown({ options, onSelect, children }) {
  const [optionText, setOptionText] = useState(children);
  const [optionsShown, showOptions] = useState(false);
  const handleSelect = (value, option) => () => {
    onSelect(value);
    setOptionText(option);
    showOptions(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="text-left px-4 py-3 rounded bg-[#2F363F] text-neutral-200 w-full cursor-pointer"
        onClick={() => showOptions((prevShown) => !prevShown)}
      >
        {optionText}
      </button>
      {(options?.length > 0 && optionsShown) && (
        <div className="absolute z-10 w-64 mt-2 py-2 rounded-md shadow-lg bg-[#111419] flex flex-col">
          {options.map(({ value, option }) => (
            <button
              type="button"
              className="px-4 py-2 cursor-pointer hover:bg-[#2F363F] text-left text-neutral-200"
              key={value}
              onClick={handleSelect(value, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
