import { NamedAPIResourceList } from "pokenode-ts";


export const mapPokemonTypeList = (data: NamedAPIResourceList): string[] => {
  return data.results.map(({ name }) => name).sort();
};