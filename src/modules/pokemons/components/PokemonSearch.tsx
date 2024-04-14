import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const PokemonSearch = ({
  term,
  onChange,
}: {
  term: string;
  onChange: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(term);

  const debouncedChange = debounce(onChange, 1000);

  useEffect(() => {
    debouncedChange(inputValue);
    console.log(inputValue);
    return () => debouncedChange.cancel();
  }, [inputValue, debouncedChange]);

  return (
    <div className="w-full sm:w-auto relative">
      <input
        type="search"
        id="pokemon-search"
        className="w-full pl-4 pr-10 py-2 border rounded-md shadow-sm  bg-white text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Search by name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          onClick={() => setInputValue('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg
            className="h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PokemonSearch;
