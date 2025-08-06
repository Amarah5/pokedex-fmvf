 import React, { useState, useEffect } from 'react';
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
  const [selectedPokemon, setSelectedPokemon] = useState(null); // <-- nouvel état

  useEffect(() => {
    setSearchTerm(initialSearchTerm || '');
  }, [initialSearchTerm]);

  const displayedPokemons = pokemons;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-red-500 via-orange-500 to-yellow-400">
      <div className="flex flex-col items-center mb-0">
        <h1 className="mb-4 text-6xl font-extrabold leading-tight text-center text-white drop-shadow-lg">Pokédex</h1>

        <div className="flex flex-wrap justify-center gap-2 p-0 mb-8 rounded-full backdrop-blur-sm">
          <span
            className={`
              w-10 h-10  bg-white-200 rounded-full flex items-center justify-center text-xs font-bold
              cursor-pointer transition-all duration-200 ease-in-out
             
              ${selectedTypeFilter === null ? 'bg-white border-2 ' : 'bg-white'}
              text-black
              hover:shadow-xl hover:scale-105
            `}
            onClick={() => onTypeFilterClick(null)}
            title="Show All Types"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
                  <IconComponent className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-xs font-bold text-white">{capitalize(type).charAt(0)}</span>
                )}
              </span>
            );
          })}
        </div>

        <div className="flex justify-center w-full max-w-xl mb-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search name or number..."
              className="w-full p-4 pl-12 pr-4 text-xl text-gray-800 border-2 border-orange-300 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500"
              value={searchTerm}
              onClick={onSearchInputClick}
              readOnly
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {displayedPokemons.length > 0 ? (
          displayedPokemons.map((pokemon) => (
            // J'ajoute le onClick ici pour ouvrir la modale
            <div key={pokemon.id} onClick={() => setSelectedPokemon(pokemon)} className="cursor-pointer">
              <PokeCard pokemon={pokemon} />
            </div>
          ))
        ) : (
          <p className="text-2xl font-semibold text-center text-white col-span-full drop-shadow">Aucun Pokémon trouvé.</p>
        )}
      </div>

      {showAllOptionVisible && (
        <div className="mt-10 text-center">
          <button
            onClick={onShowAllClick}
            className="px-6 py-3 mr-4 font-bold text-white transition-all duration-200 ease-in-out transform bg-red-600 rounded-lg shadow-xl hover:bg-red-700 hover:scale-105"
          >
            Afficher tous les Pokémons ({pokemons.length})
          </button>

          <button
            onClick={onSearchInputClick}
            className="px-6 py-3 font-bold text-white transition-all duration-200 ease-in-out transform bg-orange-500 rounded-lg shadow-xl hover:bg-orange-600 hover:scale-105"
          >
            Rechercher un autre Pokémon
          </button>
        </div>
      )}

      {/* MODALE POKEMON */}
      {selectedPokemon && (
        <div
          onClick={() => setSelectedPokemon(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer bg-opacity-70"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md p-6 bg-white rounded-lg"
          >
            <img
              src={selectedPokemon.imageUrl}
              alt={selectedPokemon.name}
              className="w-full h-auto"
            />
            <h2 className="mt-4 text-2xl font-bold capitalize">{selectedPokemon.name}</h2>

            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Stats :</h3>
              <ul>
                {selectedPokemon.stats.map((stat) => (
                  <li key={stat.name} className="mb-1">
                    <span className="capitalize">{stat.name}:</span> {stat.value}
                    <div className="w-full h-3 mt-1 bg-gray-300 rounded-full">
                      <div
                        className="h-3 bg-green-500 rounded-full"
                        style={{ width: `${(stat.value / 150) * 100}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedPokemon(null)}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
