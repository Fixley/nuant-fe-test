import usePokemonItem from "../hooks/usePokemonItem";

const PokemonDetailsPage = () => {
  const { pokemon, loading, error } = usePokemonItem("pikachu");
  console.log({
    pokemon,
    loading,
    error,
  });

  return <div>PokemonDetailsPage</div>;
};

export default PokemonDetailsPage;

