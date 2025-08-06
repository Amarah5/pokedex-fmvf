 import React from 'react';
import { TYPE_COLORS_MAP } from '../utils/pokemonType';

function PokeCard({ pokemon }) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const mainType = pokemon.types?.[0] || 'normal';
  const cardBgClass = TYPE_COLORS_MAP[mainType]?.cardBg || 'bg-gray-200';

  return (
    <div
      className={`
        ${cardBgClass} w-[350px] rounded-lg shadow-md overflow-hidden
        hover:shadow-xl transition duration-300
        flex flex-col items-center justify-start p-4
        relative group cursor-pointer border hover:border-blue-400
        transform hover:scale-105
      `}
    >
      {/* Numéro du Pokémon */}
      <div className="absolute text-sm font-bold text-gray-600 top-2 left-3">
        #{String(pokemon.id).padStart(3, '0')}
      </div>

      {/* Icône étoile */}
      <div className="absolute text-gray-400 top-2 right-3 hover:text-red-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      </div>

      {/* Image */}
      <img
        src={pokemon.imageUrl}
        alt={capitalize(pokemon.name)}
        className="mt-6 mb-4 transition-transform w-28 h-28 group-hover:scale-110"
        loading="lazy"
      />

      {/* Nom */}
      <h3 className="mb-2 text-xl font-bold text-gray-800 capitalize">
        {capitalize(pokemon.name)}
      </h3>

      {/* Types */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {pokemon.types?.map((type) => (
          <span
            key={type}
            className={`
              ${TYPE_COLORS_MAP[type]?.bg || 'bg-gray-500'}
              text-white text-xs font-semibold px-2 py-1 rounded-full capitalize shadow-sm
            `}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Statistiques (2 par ligne) */}
      <div className="grid w-full grid-cols-2 gap-2 px-2 text-sm text-gray-700">
        {pokemon.stats?.map((stat) => (
          <div key={stat.name} className="flex justify-between pb-1 border-b">
            <span className="capitalize">{stat.name}</span>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokeCard;
