import { describe, it, expect, vi } from 'vitest';
import { api, getPokemonItemWithDetails } from './getPokemonItem';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

vi.mock('./getPokemonItemWithDetails', () => ({
  api: {
    getPokemonByName: vi.fn().mockResolvedValue({
      name: 'Pikachu',
      id: 25,
      sprites: {
        front_default: 'http://example.com/pikachu.png',
        front_shiny: 'http://example.com/pikachu-shiny.png',
        front_female: 'http://example.com/pikachu-female.png',
        front_shiny_female: 'http://example.com/pikachu-shiny-female.png',
        back_default: 'http://example.com/pikachu-back.png',
        back_shiny: 'http://example.com/pikachu-back-shiny.png',
        back_female: 'http://example.com/pikachu-back-female.png',
        back_shiny_female: 'http://example.com/pikachu-back-shiny-female.png',
        other: {
          'official-artwork': {
            front_default: 'http://example.com/pikachu-official.png',
          },
          dream_world: {
            front_default: 'http://example.com/pikachu-dream.png',
          },
          'home': {
            front_default: 'http://example.com/pikachu-home.png',
          },
          'ultra-sun-ultra-moon': {
            front_default: 'http://example.com/pikachu-ultra.png',
          },
        },
      },
    }),
  },
}));

describe('getPokemonWithDescription', () => {
  it("should return a Pokemon object with a description when given a valid Pokemon name", async () => {
    const pokemonName = "Pikachu";
    const pokemonData: DeepPartial<Pokemon> = {
      name: "Pikachu",
      id: 25,
      sprites: {
        front_default: "http://example.com/pikachu.png",
        other: {
          "official-artwork": {
            front_default: "http://example.com/pikachu-official.png",
          },
        },
      },
    };    
    
    const speciesData: Partial<PokemonSpecies> = {
      flavor_text_entries: [
        {
          language: { name: "en", url: "http://example.com/en" },
          flavor_text: "Pikachu is an electric-type Pokémon.",
        },
      ],
    };

    vi.spyOn(api, "getPokemonByName").mockResolvedValue(pokemonData as Pokemon);
    vi.spyOn(api, "getPokemonSpeciesByName").mockResolvedValue(
      speciesData as PokemonSpecies
    );

    const result = await getPokemonItemWithDetails(pokemonName);

    expect(result).toEqual({
      ...pokemonData,
      description: "Pikachu is an electric-type Pokémon.",
    });

    vi.restoreAllMocks();
  });

  it("should throw an error when given an invalid Pokemon name", async () => {
    const pokemonName = "123456789";

    vi.spyOn(api, "getPokemonByName").mockRejectedValue(
      new Error("Pokemon name must only contain letters and dashes.")
    );

    await expect(getPokemonItemWithDetails(pokemonName)).rejects.toThrow(
      "Pokemon name must only contain letters and dashes."
    );

    vi.restoreAllMocks();
  });

  it("should throw an error when an API error occurs", async () => {
    const pokemonName = "Pikachu";
    const error = new Error("Failed to fetch pokemon data.");

    vi.spyOn(api, "getPokemonByName").mockRejectedValue(error);

    await expect(getPokemonItemWithDetails(pokemonName)).rejects.toThrow(
      error
    );

    vi.restoreAllMocks();
  });
});
