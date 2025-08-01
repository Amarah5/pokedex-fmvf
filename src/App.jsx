
import React, { useState, useEffect } from 'react';
import pokemonLoadingBg from './assets/Logo.png'; 


import PokemonList from './docs/PokemonList';


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
        }, 30); 

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();

        const pokemonsWithImages = data.results.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return {
            ...pokemon,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });

        setPokemons(pokemonsWithImages);
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
        <img src={pokemonLoadingBg} alt="Pokémon Loading"
          className="w-1/2 max-w-sm animate-pokeballScale" 
          style={{ transform: 'scale(0.8)' }} 
        />

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
    <div className="min-h-screen bg-gray-100 py-8">
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;