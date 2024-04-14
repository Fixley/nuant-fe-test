import { Pokemon } from "pokenode-ts";

interface PokemonWithDescription extends Pokemon {
  description: string;
}
export const mapPokemonItem = (pokemon: PokemonWithDescription): PokemonWithDescription => {
  return {
    ...pokemon,
  }
}