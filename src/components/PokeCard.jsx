
import React from 'react';
const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-700',
  dragon: 'bg-indigo-900',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
  dark: 'bg-gray-800',
};

function PokeCard({ pokemon }) {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="
        bg-white rounded-lg shadow-md overflow-hidden
        hover:shadow-xl transition-shadow duration-300
        flex flex-col items-center justify-center p-4
        relative group cursor-pointer
        border-4 border-transparent hover:border-blue-400"
    >
      <div className="absolute top-2 left-3 text-gray-400 font-bold text-sm">
        #{String(pokemon.id).padStart(3, '0')}
      </div>

      <div className="w-full flex justify-center p-2 mb-2">
        <img
          src={pokemon.imageUrl}
          alt={capitalize(pokemon.name)}
          className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Nom du Pokémon */}
      <h3 className="text-xl font-bold text-gray-800 capitalize mb-1">
        {capitalize(pokemon.name)}
      </h3>

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {pokemon.types && pokemon.types.map((type) => ( 
          <span
            key={type}
            className={`
              ${typeColors[type] || 'bg-gray-500'} // Utilise la couleur mappée, ou gris par défaut
              text-white text-xs font-semibold px-2 py-0.5 rounded-full capitalize
            `}
          >
            {type}
          </span>
        ))}
      </div>

    </div>
  );
}

export default PokeCard;