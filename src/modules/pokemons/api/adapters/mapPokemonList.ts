import { Pokemon } from "pokenode-ts";

export const mapPokemonList = (list: Pokemon[]) => {
  return Array.isArray(list) ? list.map(item => item) : [];
};