// src/docs/PokemonList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import PokeCard from '../components/PokeCard'; 

function PokemonList({ pokemons, initialSearchTerm, onSearchInputClick, onShowAllClick, showAllOptionVisible }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');

  useEffect(() => {
    setSearchTerm(initialSearchTerm || '');
  }, [initialSearchTerm]);

  const filteredPokemons = useMemo(() => {
    if (searchTerm === '') {
      return pokemons;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return pokemons.filter(pokemon => {
      const matchesName = pokemon.name.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesId = !isNaN(lowerCaseSearchTerm) && String(pokemon.id).includes(lowerCaseSearchTerm);
      return matchesName || matchesId;
    });
  }, [pokemons, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl"> 
     
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-6xl font-extrabold text-gray-800 text-center mb-4 leading-tight">Pokédex</h1> 
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center text-white text-xs font-bold"></span>
          <span className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold"></span>
          {/* ... ajoutez d'autres couleurs de types ici si besoin */}
        </div>

        {/* Barre de Recherche principale (qui ouvre SearchPage) */}
        <div className="mb-8 flex justify-center w-full max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search name or number..."
              className="
                w-full p-4 pl-12 pr-4
                border border-gray-300 rounded-full // Bordures arrondies comme dans l'image
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-xl
              "
              value={searchTerm}
              onClick={onSearchInputClick} // Ouvre la SearchPage
              readOnly // Rend l'input non-modifiable, agit comme un bouton
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
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-xl">Aucun Pokémon trouvé.</p>
        )}
      </div>

      {/* Options "Afficher tous" et "Rechercher" */}
      {showAllOptionVisible && ( // Affiché si la condition est vraie (pas encore tous affichés, pas de filtre)
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