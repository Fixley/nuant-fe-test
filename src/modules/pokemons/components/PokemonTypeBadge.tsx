import { mapTypeColors } from "../utils/typeColors";

const PokemonTypeBadge = ({ type }: { type: string }) => {
  const backgroundColor = mapTypeColors[type]?.background ?? "bg-gray-100";
  const foregroundColor = mapTypeColors[type]?.text ?? " text-gray-800";

  return (
    <span
      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 mr-2 mb-2"
      style={{ backgroundColor, color: foregroundColor }}
    >
      {type.toUpperCase()}
    </span>
  );
};

export default PokemonTypeBadge;