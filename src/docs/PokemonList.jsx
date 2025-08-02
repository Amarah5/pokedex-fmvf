import React, { useState, useMemo, useEffect } from 'react';
import PokeCard from '../components/PokeCard';
import { TYPE_COLORS_MAP, capitalize } from '../utils/pokemonType';
import { TypeIconsMap } from '../utils/typeIconsMap';

function PokemonList({
  pokemons,
  initialSearchTerm,
  onSearchInputClick,
  onShowAllClick,
  showAllOptionVisible,
  allPokemonTypes,
  onTypeFilterClick,
  selectedTypeFilter
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');

  useEffect(() => {
    setSearchTerm(initialSearchTerm || '');
  }, [initialSearchTerm]);

  const displayedPokemons = pokemons;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-500 via-orange-500 to-yellow-400 relative overflow-hidden">
      <div className="flex flex-col items-center mb-0">
        <h1 className="text-6xl font-extrabold text-white text-center mb-4 leading-tight drop-shadow-lg">Pokédex</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8 p-0 backdrop-blur-sm rounded-full">
          <span
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold
              cursor-pointer transition-all duration-200 ease-in-out
              ${selectedTypeFilter === null ? 'bg-orange-600 border-2 border-white' : 'bg-orange-400'}
              text-white
              hover:shadow-xl hover:scale-105
            `}
            onClick={() => onTypeFilterClick(null)}
            title="Show All Types"
          >
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill="currentColor" />
            </svg>
          </span>

          {allPokemonTypes.map(type => {
            const IconComponent = TypeIconsMap[type];
            return (
              <span
                key={type}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  cursor-pointer transition-all duration-200 ease-in-out
                  ${TYPE_COLORS_MAP[type]?.bg || 'bg-orange-400'}
                  ${selectedTypeFilter === type ? 'border-2 border-white shadow-xl scale-105' : 'border-2 border-transparent'}
                  hover:shadow-xl hover:scale-105
                `}
                onClick={() => onTypeFilterClick(type)}
                title={capitalize(type)}
              >
                {IconComponent ? (
                  <IconComponent className="h-6 w-6 text-white" />
                ) : (
                  <span className="text-white text-xs font-bold">{capitalize(type).charAt(0)}</span>
                )}
              </span>
            );
          })}
        </div>

        <div className="mb-8 flex justify-center w-full max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search name or number..."
              className="
                w-full p-4 pl-12 pr-4
                border-2 border-orange-300 rounded-full
                focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500
                text-xl text-gray-800
                shadow-md
              "
              value={searchTerm}
              onClick={onSearchInputClick}
              readOnly
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {displayedPokemons.length > 0 ? (
          displayedPokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="col-span-full text-center text-white text-2xl font-semibold drop-shadow">Aucun Pokémon trouvé.</p>
        )}
      </div>

      {showAllOptionVisible && (
        <div className="mt-10 text-center">
          <button
            onClick={onShowAllClick}
            className="
              bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg
              shadow-xl transition-all duration-200 ease-in-out mr-4 transform hover:scale-105
            "
          >
            Afficher tous les Pokémons ({pokemons.length})
          </button>

          <button
            onClick={onSearchInputClick}
            className="
              bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg
              shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105
            "
          >
            Rechercher un autre Pokémon
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;