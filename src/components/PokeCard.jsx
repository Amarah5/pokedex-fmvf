import React from 'react';
import { TYPE_COLORS_MAP } from '../utils/pokemonType';

function PokeCard({ pokemon }) {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const mainType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : 'normal';
  const cardBgClass = TYPE_COLORS_MAP[mainType]?.cardBg || 'bg-gray-200'; 


  return (
    <div
      className={`
        ${cardBgClass} rounded-lg shadow-md overflow-hidden
        hover:shadow-xl transition-shadow duration-300
        flex flex-col items-center justify-start p-4
        relative group cursor-pointer
        border border-transparent hover:border-blue-400
        transform hover:scale-105 transition-transform duration-300
      `}
      style={{ minHeight: '200px' }}
    >
      <div className="absolute top-2 left-3 text-gray-500 font-bold text-sm">
        #{String(pokemon.id).padStart(3, '0')}
      </div>

      <div className="absolute top-2 right-3 text-gray-400 hover:text-red-500 cursor-pointer">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Image du Pokémon */}
      <div className="w-full flex justify-center p-2 mb-2 mt-4">
        <img
          src={pokemon.imageUrl}
          alt={capitalize(pokemon.name)}
          className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Nom du Pokémon */}
      <h3 className="text-xl font-bold text-gray-800 capitalize mb-2">
        {capitalize(pokemon.name)}
      </h3>

      {/* Section des types */}
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        {pokemon.types && pokemon.types.map((type) => (
          <span
            key={type}
            className={`
              ${TYPE_COLORS_MAP[type]?.bg || 'bg-gray-500'} // Utilise la couleur BG pour la pastille
              text-white text-xs font-semibold px-2 py-0.5 rounded-full capitalize
              shadow-sm
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