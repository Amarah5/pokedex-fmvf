// src/docs/PokemonList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import PokeCard from '../components/PokeCard';
import { TYPE_COLORS_MAP, capitalize } from '../utils/pokemonType'; 

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-6xl font-extrabold text-gray-800 text-center mb-4 leading-tight">Pokédex</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-8 p-2 bg-gray-100 rounded-full shadow-inner">
          <span
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold
              cursor-pointer transition-all duration-200 ease-in-out
              ${selectedTypeFilter === null ? 'bg-gray-400 border-2 border-blue-500' : 'bg-gray-300'}
              text-gray-800
              hover:shadow-md
            `}
            onClick={() => onTypeFilterClick(null)}
            title="Show All Types"
          >
            <svg className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </span>

          {allPokemonTypes.map(type => (
            <span
              key={type}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold capitalize
                cursor-pointer transition-all duration-200 ease-in-out
                ${TYPE_COLORS_MAP[type]?.bg || 'bg-gray-400'}
                ${selectedTypeFilter === type ? 'border-2 border-blue-500 shadow-lg' : 'border-2 border-transparent'}
                hover:shadow-md
              `}
              onClick={() => onTypeFilterClick(type)}
              title={capitalize(type)} // <--- capitalize est maintenant disponible
            >
              {/* Icône SVG ou initiales du type ici */}
            </span>
          ))}
        </div>

        {/* Barre de Recherche principale */}
        <div className="mb-8 flex justify-center w-full max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search name or number..."
              className="
                w-full p-4 pl-12 pr-4
                border border-gray-300 rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-xl
              "
              value={searchTerm}
              onClick={onSearchInputClick}
              readOnly
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des Pokémons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {displayedPokemons.length > 0 ? (
          displayedPokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-xl">Aucun Pokémon trouvé.</p>
        )}
      </div>

      {/* Options "Afficher tous" et "Rechercher" */}
      {showAllOptionVisible && (
        <div className="mt-10 text-center">
          <button
            onClick={onShowAllClick}
            className="
              bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg
              shadow-lg transition-colors duration-200 ease-in-out mr-4
            "
          >
            Afficher tous les Pokémons ({pokemons.length})
          </button>

          <button
            onClick={onSearchInputClick}
            className="
              bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg
              shadow-lg transition-colors duration-200 ease-in-out
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