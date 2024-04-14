import { useState, useEffect } from 'react';
import { getPokemonTypeList, mapPokemonTypeList } from '../api';

const usePokemonTypeList = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getPokemonTypeList()
      .then(apiTypes => {
        const mapTypes = mapPokemonTypeList(apiTypes)
        setTypes(mapTypes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon types:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { types, loading, error };
}

export default usePokemonTypeList;
