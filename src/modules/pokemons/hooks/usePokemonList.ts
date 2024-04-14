import { useState, useEffect } from 'react';
import { getPokemonListWithDetails, mapPokemonList } from '../api';
import { Pokemon } from 'pokenode-ts';

interface UsePokemonListProps {
  pokemons: Pokemon[]; 
  loading: boolean; 
  error: Error | null;
}

const usePokemonList = (): UsePokemonListProps => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPokemonListWithDetails()
      .then(apiPokemons => {
        if (apiPokemons !== null) {
          const mapPokemons = mapPokemonList(apiPokemons);
          setPokemons(mapPokemons);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon list:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { pokemons, loading, error };
};

export default usePokemonList;
