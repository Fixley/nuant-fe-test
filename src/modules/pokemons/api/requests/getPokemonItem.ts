import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";

interface PokemonWithDescription extends Pokemon {
  description: string;
}

const extractDescription = (speciesData: {
  flavor_text_entries: { language: { name: string }; flavor_text: string }[];
}) => {
  const englishFlavorText = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  return (
    englishFlavorText?.flavor_text.replace(/[\n\f]/g, " ") ??
    "Description not available."
  );
};

const validatePokemonName = (pokemonName: string) => {
  if (!pokemonName) {
    throw new Error("Pokemon name is required.");
  }

  if (typeof pokemonName !== "string") {
    throw new Error("Pokemon name must be a string.");
  }

  if (!/^[a-zA-Z-]+$/.test(pokemonName)) {
    throw new Error("Pokemon name must only contain letters and dashes.");
  }

  if (pokemonName.length < 3) {
    throw new Error("Pokemon name must be at least 3 characters long.");
  }
}

export const api = new PokemonClient();

const getPokemonData = async (pokemonName: string) => {
  return api.getPokemonByName(pokemonName.toLowerCase());
}

const getSpeciesData = async (pokemonName: string) => {
  return api.getPokemonSpeciesByName(pokemonName.toLowerCase());
}

const handlePokemonData = async (pokemonResult: PromiseSettledResult<Pokemon>) => {
  if (pokemonResult.status === "fulfilled") {
    return pokemonResult.value;
  }
  throw new Error("Failed to fetch pokemon data.");
}

const handleSpeciesData = async (speciesResult: PromiseSettledResult<PokemonSpecies>) => {
  if (speciesResult.status === "fulfilled") {
    return extractDescription(speciesResult.value);
  }
  console.error("Failed to fetch species description:", speciesResult.reason);
  return "Description not available.";
}

export const getPokemonItemWithDetails = async (pokemonName: string): Promise<PokemonWithDescription> => { 
  validatePokemonName(pokemonName);

  try {
    const [pokemonResult, speciesResult] = await Promise.allSettled([
      getPokemonData(pokemonName),
      getSpeciesData(pokemonName),
    ]);

    const pokemonData = await handlePokemonData(pokemonResult);
    const description = await handleSpeciesData(speciesResult);

    return { ...pokemonData, description };
  } catch (error) {
    console.error(
      "An error occurred while fetching data for the Pokémon:",
      error
    );
    throw error;
  }
}