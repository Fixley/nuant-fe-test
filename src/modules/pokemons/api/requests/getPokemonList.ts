import { AxiosError } from "axios";
import { PokemonClient, Pokemon } from "pokenode-ts";

const api = new PokemonClient();

const fetchPokemonList = async () => {
  try {
    const response = await api.listPokemons();
    const pokemonPromises = response.results.map(async (result) => {
      try {
        return await api.getPokemonByName(result.name);
      } catch (error) {
        console.error(`Failed to fetch Pokémon ${result.name}:`, error);
        return null;
      }
    });
    const pokemonResults = await Promise.allSettled(pokemonPromises);
    return pokemonResults.map((result) => result.status === "fulfilled" ? result.value : null);
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    return [];
  }
};

export const getPokemonListWithDetails = async (searchTerm = "", filterType = ""): Promise<Pokemon[] | null> => {
  try {
    if (searchTerm) {
      const pokemon = await api.getPokemonByName(searchTerm.toLowerCase());
      return [pokemon];
    } else if (filterType) {
      const typeDetail = await api.getTypeByName(filterType.toLowerCase());
      const pokemonPromises = typeDetail.pokemon.map(({ pokemon }) =>
        api.getPokemonByName(pokemon.name)
      );
      const results = await Promise.allSettled(pokemonPromises);
      return results.reduce(
        (acc, result) =>
          result.status === "fulfilled"
            ? [...acc, result.value]
            : acc,
        [] as Pokemon[]
      );
    } else {
      const pokemons = await fetchPokemonList();
      return pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== null);
    }
  } catch (error: unknown) {
    const apiError: Partial<AxiosError> = {
      name: "AxiosError",
      message: (error as Error).message,
      code: (error as AxiosError)?.code,
      status: (error as AxiosError)?.response?.status,
    };
    console.error("Failed to fetch Pokémon list data:", error);
    throw apiError;
  }
}