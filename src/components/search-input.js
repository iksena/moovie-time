import TMDBContext from '@/contexts/tmdb-context';
import { searchLibraries } from '@/lib/tmdb';
import React, { useContext, useState } from 'react';

const _handleSearch = async (query, setResults, tmdb) => {
  setTimeout(async () => {
    const response = await searchLibraries({
      query,
      baseUrl: tmdb.baseUrl,
      apiKey: tmdb.apiKey,
    });
    const searchResult = response?.results ?? [];
    setResults(searchResult.slice(0, 5));
  }, 300);
};

function SearchInput() {
  const tmdb = useContext(TMDBContext);
  const [inputValue, setInputValue] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    _handleSearch(query, setAutocompleteOptions, tmdb);
  };

  const handleOptionSelect = (title) => {
    setInputValue(title);
    setAutocompleteOptions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setAutocompleteOptions([])}
        placeholder="Find movie"
        className="bg-black/10 text-neutral-200 font-normal text-base py-2 px-4 rounded-md input-width"
      />
      {autocompleteOptions.length > 0 && (
        <div className="absolute z-10 w-64 mt-2 py-2 rounded-md shadow-lg bg-slate-500 flex flex-col">
          {autocompleteOptions.map(({ id, title }) => (
            <button
              type="button"
              className="px-4 py-2 cursor-pointer hover:bg-neutral-200 text-left"
              key={id}
              onClick={() => handleOptionSelect(title)}
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
