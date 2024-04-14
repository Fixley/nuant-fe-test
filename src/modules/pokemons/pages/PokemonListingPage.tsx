import { useSearchParams } from "react-router-dom";
import usePokemonList from "../hooks/usePokemonList";
import usePokemonTypeList from "../hooks/usePokemonTypeList";
import PokemonSearch from "../components/PokemonSearch";
import PokemonCardSmall from "../components/PokemonCardSmall";

const PokemonListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";
  const { pokemons, loading, error } = usePokemonList(searchTerm);
  const { types, loading: typesLoading, error: typesError } = usePokemonTypeList();

  const updateSearchParameters = (
    newSearchTerm: string,
  ) => {
    const params = new URLSearchParams();
    if (newSearchTerm) params.set("search", newSearchTerm);
    setSearchParams(params);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    const formattedSearchTerm = newSearchTerm.trim();

    if (formattedSearchTerm && formattedSearchTerm.length > 2) {
      updateSearchParameters(formattedSearchTerm);
    } else {
      updateSearchParameters("");
    }
  };

  console.log({
    types,
    typesLoading,
    typesError,
  });

  return (
    <div className="container mx-auto px-4 relative min-h-screen py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-4 mt-8">Pokémon Listing</h1>
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <PokemonSearch term={searchTerm} onChange={handleSearchChange} />
        </div>
      </header>

      <div className="border-t border-gray-300 mb-6"></div>

      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-white text-normal font-bold text-center p-4 rounded bg-gray-800 bg-opacity-50">
              Loading...
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="text-white p-4 rounded bg-red-500 overflow-hidden sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            No Pokémon found
          </div>
        )}
        {!loading && !error && pokemons.length === 0 && (
          <div className="text-black p-4 rounded bg-white overflow-hidden sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            No Pokémons found for <span className="capitalize font-bold">{searchTerm}</span>
          </div>
        )}
        {!loading &&
          !error &&
          pokemons.length > 0 &&
          pokemons.map((pokemon) => (
            <PokemonCardSmall
              key={pokemon.name}
              pokemon={pokemon}
              searchTerm={searchTerm}
            />
          ))}
      </main>
    </div>
  );
};

export default PokemonListingPage;