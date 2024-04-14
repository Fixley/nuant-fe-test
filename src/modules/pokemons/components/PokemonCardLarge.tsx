import { Pokemon } from "pokenode-ts";
import PokemonTypeBadge from "./PokemonTypeBadge";
import placeholderImg from "../../../assets/react.svg";

interface PokemonWithDescription extends Pokemon {
  description: string;
}

interface PokemonCardLargeProps {
  pokemon: PokemonWithDescription;
  onBack: () => void;
}

const PokemonCardLarge = ({
  pokemon,
  onBack,
}: PokemonCardLargeProps) => {
  const pokemonTypes: string[] = pokemon.types.map((type) => type.type.name);
  const spriteUrls = Object.values(pokemon.sprites)
    .filter((sprite) => typeof sprite === "string" && sprite)
    .map((sprite) => sprite as string);


  const pokemonImage = pokemon.sprites.other?.["official-artwork"].front_default ??
    pokemon.sprites.front_default ?? placeholderImg ?? "";
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

      {spriteUrls.length > 0 && <div className="p-4">
        <h3 className="text-lg text-black font-semibold mb-2">Gallery</h3>
        <div className="flex flex-wrap justify-start gap-4">
          {spriteUrls.map((url, index) => (
            <div key={url} className="w-20 h-20">
              <img
                src={url ?? placeholderImg}
                loading="lazy"
                decoding="async"
                alt={`Sprite ${index + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>}

      <div className="p-4">
        <h3 className="text-lg text-black font-semibold mb-2">Attributes</h3>
        <dl className="divide-y divide-gray-100">
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900">Height:</dt>
            <dd className="text-sm text-gray-700">{pokemon.height} cm</dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-sm font-medium text-gray-900">Weight:</dt>
            <dd className="text-sm text-gray-700">{pokemon.weight} kg</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PokemonCardLarge;
