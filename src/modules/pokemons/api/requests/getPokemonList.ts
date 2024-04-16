import { AxiosError } from "axios";
import { PokemonClient, Pokemon } from "pokenode-ts";

interface PokemonListConfig {
  searchTerm?: string;
  filterType?: string;
}

const api = new PokemonClient();

const formatApiError = (error: AxiosError): Partial<AxiosError> => {
  return {
    name: "AxiosError",
    message: error.message,
    code: error?.code,
    status: error?.response?.status
  };
};

const fetchPokemonDetails = async (pokemonNames: string[]): Promise<Pokemon[]> => {
  const pokemonPromises = pokemonNames.map(name => api.getPokemonByName(name));
  const results = await Promise.allSettled(pokemonPromises);
  return results.reduce((acc, result) => result.status === 'fulfilled' ? [...acc, result.value] : acc, [] as Pokemon[]);
}

const fetchPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await api.listPokemons();
    const pokemonNames = response.results.map(pokemon => pokemon.name);
    return await fetchPokemonDetails(pokemonNames);
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    return [];
  }
};

const filterByType = async (filterType: string): Promise<Pokemon[]> => {
  const typeDetail = await api.getTypeByName(filterType.toLowerCase());
  const pokemonByType = typeDetail.pokemon.map(({ pokemon }) => pokemon.name);
  return await fetchPokemonDetails(pokemonByType);
};

const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  return await fetchPokemonList();
};

const filterByTypeAndSearchTerm = async (filterType: string, searchTerm: string): Promise<Pokemon[]> => {
  const typeDetail = await api.getTypeByName(filterType.toLowerCase());
  const pokemonByType = typeDetail.pokemon.map(({ pokemon }) => pokemon.name);
  const filteredPokemons = await fetchPokemonDetails(pokemonByType);
  return filteredPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
};

const filterBySearchTerm = async (searchTerm: string): Promise<Pokemon[]> => {
  const { count } = await api.listPokemons(0, 1);
  const response = await api.listPokemons(0, count);
  const filteredResults = response.results.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const pokemonNames = filteredResults.map(pokemon => pokemon.name);
  return await fetchPokemonDetails(pokemonNames);
};

export const getPokemonListWithDetails = async (config: PokemonListConfig = {}): Promise<Pokemon[] | null> => {
  try {
    if (config.searchTerm && config.filterType) {
      return await filterByTypeAndSearchTerm(config.filterType, config.searchTerm);
    } else if (config.searchTerm) {
      return await filterBySearchTerm(config.searchTerm);
    } else if (config.filterType) {
      return await filterByType(config.filterType);
    } else {
      return await fetchAllPokemons();
    }
  } catch (error) {
    console.error("Failed to fetch Pokémon list data:", error);
    throw formatApiError(error as AxiosError);
  }
}



