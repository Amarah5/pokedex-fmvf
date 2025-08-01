import React, { useState, useMemo } from 'react';
import pokeBall from '../assets/pokeBall.png';
import PokeCard from '../components/PokeCard'; 

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

function SearchPage({ onBackClick, onSearchSubmit, recentSearches, pokemons }) {
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  // Pour les recherches récentes, on garde la logique de filtrage par nom/ID
  const detailedRecentPokemons = useMemo(() => {
    return recentSearches
      .map(searchTerm => {
        const foundPokemon = pokemons.find(p =>
          p.name.toLowerCase() === searchTerm.toLowerCase() ||
          String(p.id) === searchTerm
        );
        if (foundPokemon) {
          return {
            id: foundPokemon.id,
            name: foundPokemon.name,
            imageUrl: foundPokemon.imageUrl
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [recentSearches, pokemons]);


  const liveFilteredPokemons = useMemo(() => {
    if (currentSearchTerm.trim() === '') {
      return []; 
    }

    const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
    
    return pokemons.filter(pokemon => {
      const matchesName = pokemon.name.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesId = String(pokemon.id).includes(lowerCaseSearchTerm); 
      return matchesName || matchesId;
    }).slice(0, 10); 

  }, [pokemons, currentSearchTerm]);


  const handleInputChange = (event) => {
    setCurrentSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentSearchTerm.trim()) {
      onSearchSubmit(currentSearchTerm.trim());
    }
  };

  const handleRecentSearchClick = (term) => {
    setCurrentSearchTerm(term);
    onSearchSubmit(term); 
  };

  const handleSuggestionClick = (pokemonName) => {
    setCurrentSearchTerm(pokemonName); 
    onSearchSubmit(pokemonName); 
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-4xl flex justify-between items-center mb-16">
        <button onClick={onBackClick} className="text-gray-400 hover:text-white transition-colors duration-200">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
      </div>

      {/* Logo Pokémon */}
      <img src={pokeBall} alt="Pokémon Logo" className="w-80 mb-16" />

      <form onSubmit={handleSubmit} className="w-full max-w-xl mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Find a Pokémon..."
            className="
              w-full p-4 pl-12 pr-16
              bg-gray-700 text-white rounded-full border-none
              focus:outline-none focus:ring-2 focus:ring-blue-500
              text-lg
            "
            value={currentSearchTerm}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#CC0000" strokeWidth="2"/>
              <path d="M2 12H22" stroke="#CC0000" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="#CC0000"/>
              <path d="M12 8L12 16" stroke="#fff" strokeWidth="2"/>
              <path d="M8 12L16 12" stroke="#fff" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </form>

      {currentSearchTerm.trim() !== '' && liveFilteredPokemons.length > 0 && (
        <div className="w-full max-w-xl bg-gray-700 rounded-lg shadow-lg overflow-hidden mb-8">
          {liveFilteredPokemons.map(pokemon => (
            <div
              key={pokemon.id}
              className="flex items-center p-3 hover:bg-gray-600 cursor-pointer border-b border-gray-600 last:border-b-0"
              onClick={() => handleSuggestionClick(pokemon.name)}
            >
              <img src={pokemon.imageUrl} alt={pokemon.name} className="w-10 h-10 object-contain mr-3" />
              <span className="text-lg capitalize">{pokemon.name}</span>
            </div>
          ))}
        </div>
      )}

      {currentSearchTerm.trim() === '' && detailedRecentPokemons.length > 0 && (
        <div className="w-full max-w-4xl text-left mt-8"> {/* Ajout de mt-8 pour l'espace */}
          <h3 className="text-xl font-semibold text-gray-300 mb-6">Recent Searches</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {detailedRecentPokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={() => handleRecentSearchClick(pokemon.name)}
              >
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <span className="text-sm font-medium capitalize">{pokemon.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;