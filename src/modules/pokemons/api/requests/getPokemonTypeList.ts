import { PokemonClient, NamedAPIResourceList } from "pokenode-ts";

const api = new PokemonClient();

export const getPokemonTypeList = async (): Promise<NamedAPIResourceList> => {
  try {
    return await api.listTypes();
  } catch (error) {
    console.error("Failed to fetch Pokémon type list:", error);
    throw error;
  }
};