import { useState, useEffect } from 'react';
import { getPokemonItemWithDetails, mapPokemonItem, PokemonWithDescription } from '../api';

interface UsePokemonItemProps {
  pokemon: PokemonWithDescription | null;
  loading: boolean;
  error: Error | null;
}

const usePokemonItem = (
  pokemonName: string
): UsePokemonItemProps => {
  const [pokemon, setPokemon] = useState<PokemonWithDescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPokemonItemWithDetails(pokemonName)
      .then((apiPokemon) => {
        const mapPokemon = mapPokemonItem(apiPokemon);
        setPokemon({ ...mapPokemon });
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error(`Error fetching details for ${pokemonName}:`, error);
        setError(error as Error);
        setLoading(false);
      });
  }, [pokemonName]);
  return { pokemon, loading, error };
};

export default usePokemonItem;
