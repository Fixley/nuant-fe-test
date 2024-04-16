import { Pokemon } from "pokenode-ts";
import PokemonTypeBadge from "./PokemonTypeBadge";
import fallbackImage from "../../../assets/react.svg";
import {
  convertHectogramsToKilograms,
  convertDecimetersToMeters,
  mapSpriteUrls,
  mapPokemonImage,
} from "../utils/mapPokemon";

interface PokemonWithDescription extends Pokemon {
  description: string;
}

interface PokemonCardLargeProps {
  pokemon: PokemonWithDescription;
  onBack: () => void;
}

const PokemonCardLarge = ({ pokemon, onBack }: PokemonCardLargeProps) => {
  const pokemonTypes = pokemon.types.map((type) => type.type.name);
  const pokemonImage = mapPokemonImage(pokemon.sprites, fallbackImage);
  const pokemonSprites = mapSpriteUrls(pokemon.sprites);

  const pokemonWeightInKilograms = convertHectogramsToKilograms(pokemon.weight);
  const pokemonHeightInMeters = convertDecimetersToMeters(pokemon.height);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="p-4 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">#{pokemon.id}</p>
          <h2 className="text-black text-xl font-bold capitalize">
            {pokemon.name}
          </h2>
          <div className="flex mt-1">
            {pokemonTypes.map((name: string) => (
              <PokemonTypeBadge key={name} type={name} />
            ))}
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-black bg-transparent border border-gray-300 hover:bg-gray-200 rounded-lg px-4 py-2 transition-all"
          aria-label="Back to pokemons listing"
        >
          Back
        </button>
      </div>

      <div className="flex p-4">
        <p className="text-sm leading-relaxed max-w-prose text-gray-500">
          {pokemon.description}
        </p>
      </div>

      <div className="flex p-4">
        <div className="mt-4 md:mt-0 p-2 w-full flex items-center justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 xl:w-48 xl:h-48 flex items-center justify-center">
            <img
              src={pokemonImage}
              alt={`Sprite of ${pokemon.name}`}
              className="object-contain w-full h-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {pokemonSprites.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg text-black font-semibold mb-2">Sprites</h3>
          <div className="flex flex-wrap justify-start gap-4">
            {pokemonSprites.map((url, index) => (
              <div key={url} className="w-20 h-20">
                <img
                  src={url}
                  loading="lazy"
                  decoding="async"
                  alt={`Sprite ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg text-black font-semibold mb-2">Attributes</h3>
        <dl className="divide-y divide-gray-100">
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900 mr-2">
              Abilities:
            </dt>
            <dd className="text-sm text-gray-700">
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900 mr-2">
              Base Experience:
            </dt>
            <dd className="text-sm text-gray-700">{pokemon.base_experience}</dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900 mr-2">Forms:</dt>
            <dd className="text-sm text-gray-700">
              {pokemon.forms.map((form) => form.name).join(", ")}
            </dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900 mr-2">Height:</dt>
            <dd className="text-sm text-gray-700">
              {pokemonHeightInMeters} m
            </dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900 mr-2">Weight:</dt>
            <dd className="text-sm text-gray-700">
              {pokemonWeightInKilograms} kg
            </dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900 mr-2">Moves:</dt>
            <dd className="text-sm text-gray-700">
              {pokemon.moves.map((move) => move.move.name).join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PokemonCardLarge;
