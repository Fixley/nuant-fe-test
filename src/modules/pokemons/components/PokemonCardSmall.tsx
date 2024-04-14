import React from 'react';
import { Link } from "react-router-dom";
import PokemonTypeBadge from "./PokemonTypeBadge";

import placeholderImg from "../../../assets/react.svg";
import { Pokemon } from 'pokenode-ts';

interface PokemonCardSmallProps {
  pokemon: Pokemon;
  searchTerm: string;
}

const PokemonCardSmall = ({
  pokemon,
  searchTerm,
}: PokemonCardSmallProps) => {
  const pokemonTypes = pokemon.types.map(
    (type: { type: { name: string } }) => type.type.name
  );

  return (
    <Link
      to={`/pokemons/${pokemon.name}`}
      state={{ search: searchTerm }}
      className="block bg-white rounded-lg overflow-hidden bg-white rounded-lg shadow overflow-hidden sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
    >
      <div className="flex items-center p-4">
        <img
          src={pokemon.sprites.front_default ?? placeholderImg}
          alt={pokemon.name}
          className="rounded-full h-24 w-24 object-scale-down mr-4"
          width="96"
          height="96"
        />
        <div>
          <p className="text-gray-500 text-sm">#{pokemon.id}</p>
          <h2 className="font-semibold text-gray-800 capitalize text-lg mb-2 leading-6">
            {pokemon.name}
          </h2>
          <div className="flex flex-wrap">
            {pokemonTypes.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCardSmall;
