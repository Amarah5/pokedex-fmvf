import React, { useState, useEffect } from 'react';
import pokemonLogo from './assets/Logo.png'
import All from './docs/PokemonList';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0); 
  const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=8';
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const totalSteps = 100;
        let currentStep = 0;
        const interval = setInterval(() => {
          currentStep += 1;
          setLoadingProgress(currentStep);
          if (currentStep >= totalSteps) {
            clearInterval(interval);
          }
        }, 
      ); 

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Échec de la récupération des Pokémons:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };
    fetchPokemons();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-400 to-yellow-300 relative overflow-hidden">
        <div> 
          <img src={pokemonLogo} alt="Pokémon Logo" className="w-200 mb-8" /> 
        </div>
        <div className="w-3/4 max-w-md mt-10 bg-gray-300 h-4 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full transition-all duration-200 ease-out" style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <p className="mt-4 text-white text-lg font-semibold drop-shadow-md">
          Loading... ({loadingProgress}%)
        </p>
      </div>

    );
  }
  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
}

export default App;