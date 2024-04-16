import { useParams, useNavigate, useLocation } from "react-router-dom";
import usePokemonItem from "../hooks/usePokemonItem";
import PokemonCardLarge from "../components/PokemonCardLarge";

function PokemonDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pokemonName } = useParams();
  const { pokemon, loading, error } = usePokemonItem(pokemonName ?? "");

  const onBack = () => {
    const search = location.state?.search;
    const filter = location.state?.filter;
    const searchParams = new URLSearchParams();

    if (search) {
      searchParams.set('search', search);
    }
    if (filter) {
      searchParams.set('filter', filter);
    }

    navigate(`/pokemons?${searchParams.toString()}`, {
      state: {
        scrollPosition: location.state?.scrollPosition,
        search: location.state?.search,
        filter: location.state?.filter
      }
    });
  };

  return (
    <div className="container mx-auto px-4 relative min-h-screen py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-4 mt-8">Pokémon Details</h1>
      </header>
      
      <main className="grid grid-cols-1 gap-4">
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-white text-normal font-bold text-center p-4 rounded bg-gray-800 bg-opacity-50">Loading...</div>
          </div>
        )}
        {error && <div className=" p-4 rounded bg-red-500 overflow-hidden sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <p className="text-white">Error: {error.message}</p>
          </div>}
        {pokemon && <PokemonCardLarge pokemon={pokemon} onBack={onBack} />}

      </main>
    </div>
  );
}

export default PokemonDetailsPage;
