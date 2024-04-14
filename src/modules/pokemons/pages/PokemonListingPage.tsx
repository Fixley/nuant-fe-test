import usePokemonList from "../hooks/usePokemonList";
import usePokemonTypeList from "../hooks/usePokemonTypeList";

const PokemonListingPage = () => {
  const { pokemons, loading, error } = usePokemonList();
  const { types, loading: typesLoading, error: typesError } = usePokemonTypeList();
  console.log({
    pokemons,
    loading,
    error,
  });

  console.log({
    types,
    typesLoading,
    typesError,
  });

  return <div>PokemonListingPage</div>;
};

export default PokemonListingPage;