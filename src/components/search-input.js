import React, { useContext, useState } from 'react';

import TMDBContext from '@/contexts/tmdb-context';
import { searchLibraries } from '@/lib/tmdb';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const tmdb = useContext(TMDBContext);
  const [inputValue, setInputValue] = useState('');
  const [selectedSearchId, selectSearchId] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    selectSearchId(false);
    setInputValue(query);
    _handleSearch(query, setAutocompleteOptions, tmdb);
  };

  const handleOptionSelect = (item) => {
    setInputValue(item.title);
    selectSearchId(item.id);
    setAutocompleteOptions([]);
  };

  const handleSubmitSearch = () => {
    if (selectedSearchId) {
      router.push(`/library/movie/${selectedSearchId}`);
      selectSearchId(false);
    }
  };

  return (
    <div className="relative">
      <Image
        className="absolute top-2 left-2 cursor-pointer"
        src="/movie.svg"
        alt="movie"
        width={24}
        height={24}
        onClick={handleSubmitSearch}
        priority
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => event.key === 'Enter' && handleSubmitSearch()}
        placeholder="Find movie"
        className="bg-black/10 text-neutral-200 font-normal text-base py-2 pl-9 pr-4 rounded-md input-width"
      />
      {autocompleteOptions.length > 0 && (
        <div className="absolute z-10 w-64 mt-2 py-2 rounded-md shadow-lg bg-slate-500 flex flex-col">
          {autocompleteOptions.map((item) => (
            <button
              type="button"
              className="px-4 py-2 cursor-pointer hover:bg-black/10 text-left text-neutral-200"
              key={item.id}
              onClick={() => handleOptionSelect(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
      <Image
        className="absolute top-2 right-2 cursor-pointer"
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        onClick={handleSubmitSearch}
        priority
      />
    </div>
  );
}

export default SearchInput;
