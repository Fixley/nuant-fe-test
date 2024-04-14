import { useState, useEffect } from 'react';
import { getPokemonListWithDetails, mapPokemonList } from '../api';
import { Pokemon } from 'pokenode-ts';

interface UsePokemonListProps {
  pokemons: Pokemon[]; 
  loading: boolean; 
  error: Error | null;
}

const usePokemonList = (searchTerm: string): UsePokemonListProps => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log({ searchTerm })
    setLoading(true);
    setError(null);
    getPokemonListWithDetails(searchTerm)
      .then(apiPokemons => {
        console.log({ apiPokemons })
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
  }, [searchTerm]);

  return { pokemons, loading, error };
};

export default usePokemonList;
