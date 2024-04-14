import { Pokemon } from "pokenode-ts";

export interface PokemonItem extends Pokemon {
  description: string;
}

export interface PokemonWithDescription extends Pokemon {
  description: string;
}