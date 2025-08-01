import React from 'react'
function All() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-6">Mon Pokédex</h1>
      <h2 className="text-2xl font-semibold mb-4">Liste des Pokémons</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} className="bg-white rounded-lg shadow-md p-4 text-center">
            <span className="capitalize text-lg font-medium">{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default All

