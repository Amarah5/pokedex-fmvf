// src/components/PokemonList.jsx
import React, { useState } from 'react'; // Nous aurons besoin de useState pour la barre de recherche
import PokeCard from './PokeCard';

function PokemonList({ pokemons }) {
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche

  // Pour l'instant, les Pokémons filtrés sont juste tous les Pokémons
  // La logique de filtrage sera ajoutée plus tard
  const filteredPokemons = pokemons; // Pour le moment, pas de filtre réel

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Ici, tu pourrais déclencher la logique de filtrage
    // Mais pour l'instant on se contente de stocker la valeur
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-xl max-w-6xl">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-2">Pokédex</h1>
      <p className="text-gray-600 text-center mb-8">Search for a Pokémon by name or using its National Pokédex number.</p>

      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input type="text" placeholder="Search name or number..." className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" value={searchTerm} onChange={handleSearchChange}/>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredPokemons.map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;