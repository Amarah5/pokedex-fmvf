

export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'steel', 'fairy', 'dark'
];

export const TYPE_COLORS_MAP = {
  normal: { bg: 'bg-gray-400', cardBg: 'bg-gray-200' },
  fire: { bg: 'bg-red-500', cardBg: 'bg-red-200' },
  water: { bg: 'bg-blue-500', cardBg: 'bg-blue-200' },
  grass: { bg: 'bg-green-500', cardBg: 'bg-green-200' },
  electric: { bg: 'bg-yellow-400', cardBg: 'bg-yellow-100' },
  ice: { bg: 'bg-blue-300', cardBg: 'bg-blue-100' },
  fighting: { bg: 'bg-red-700', cardBg: 'bg-orange-200' },
  poison: { bg: 'bg-purple-600', cardBg: 'bg-purple-200' },
  ground: { bg: 'bg-yellow-700', cardBg: 'bg-yellow-300' },
  flying: { bg: 'bg-indigo-400', cardBg: 'bg-indigo-100' },
  psychic: { bg: 'bg-pink-500', cardBg: 'bg-pink-100' },
  bug: { bg: 'bg-lime-500', cardBg: 'bg-lime-200' },
  rock: { bg: 'bg-yellow-800', cardBg: 'bg-yellow-400' },
  ghost: { bg: 'bg-indigo-700', cardBg: 'bg-indigo-200' },
  dragon: { bg: 'bg-indigo-900', cardBg: 'bg-purple-300' },
  steel: { bg: 'bg-gray-500', cardBg: 'bg-gray-300' },
  fairy: { bg: 'bg-pink-300', cardBg: 'bg-pink-200' },
  dark: { bg: 'bg-gray-800', cardBg: 'bg-gray-700' },
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};