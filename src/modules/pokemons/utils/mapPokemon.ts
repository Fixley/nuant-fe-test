import { PokemonSprites } from "pokenode-ts";

export const convertHectogramsToKilograms = (hectograms: number) => {
  return hectograms / 10;  // 1 hectogram = 100 grams, 10 hectograms = 1 kilogram
};

export const convertDecimetersToMeters = (decimeters: number) => {
  return decimeters / 10;  // 1 decimeter = 0.1 meters
};

export const mapSpriteUrls = (sprites: PokemonSprites) => Object.values(sprites)
  .filter((sprite) => typeof sprite === "string" && sprite)
  .map((sprite) => sprite as string);

export const mapPokemonImage = (sprites: PokemonSprites, fallbackSprite: string) => {
  return sprites.other?.["official-artwork"].front_default ?? sprites.front_default ??
    fallbackSprite ?? "";
}