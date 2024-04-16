import usePokemonTypeList from "../hooks/usePokemonTypeList";

const PokemonSelect = ({
  type,
  onChange,
}: {
  type: string;
  onChange: (value: string) => void;
}) => {
  const { types, loading, error } = usePokemonTypeList();
  const hasOptions = !loading || !error || types.length > 0;


  return (
    <div className="w-full sm:w-auto">
      <label htmlFor="pokemon-filter" className="sr-only">
        Filter by Type
      </label>
      <div className="w-full sm:w-auto relative">
        <select
          id="pokemon-filter"
          className="w-full pl-4 pr-10 py-2 border rounded-md shadow-sm appearance-none bg-white text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 capitalize"
          value={type}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Types</option>
          {hasOptions && types.map((typeOption) => (
            <option key={typeOption} value={typeOption}>
              {typeOption}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pr-3">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.408 0.418-1.069 0.418-1.477 0l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PokemonSelect;
