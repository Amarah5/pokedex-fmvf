import React from 'react';

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

      <h3 className="text-xl font-bold text-gray-800 capitalize mb-1">
        {capitalize(pokemon.name)}
      </h3>

    </div>
  );
}

export default PokemonCard;