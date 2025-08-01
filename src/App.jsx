// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import pokemonLoadingBg from './assets/Logo.png';
import PokemonList from './docs/PokemonList';
import SearchPage from './docs/SearchPage';

function App() {
  const [pokemons, setPokemons] = useState([]); 
  const [popularPokemons, setPopularPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [currentFilterTerm, setCurrentFilterTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showAllPokemons, setShowAllPokemons] = useState(false); 

  const POPULAR_POKEMON_LIMIT = 20; 
  const ALL_POKEMON_LIMIT = 151; 


  useEffect(() => {
    const storedSearches = localStorage.getItem('recentPokemonSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentPokemonSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchPokemonDetails = useCallback(async (pokemonUrls) => {
    const detailedPokemonsPromises = pokemonUrls.map(async (pokemonUrl) => {
      const detailResponse = await fetch(pokemonUrl);
      if (!detailResponse.ok) {
        console.warn(`Could not fetch details for ${pokemonUrl}`);
        return null;
      }
      const detailData = await detailResponse.json();
      const id = detailData.id;
      return {
        name: detailData.name, 
        id: id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        types: detailData.types.map(typeInfo => typeInfo.type.name),
      };
    });
    const detailedPokemons = await Promise.all(detailedPokemonsPromises);
    return detailedPokemons.filter(p => p !== null);
  }, []); 


  useEffect(() => {
    const loadInitialData = async () => {
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

        const popularResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POPULAR_POKEMON_LIMIT}`);
        if (!popularResponse.ok) throw new Error('Failed to fetch popular pokemons');
        const popularData = await popularResponse.json();
        const popularPokemonUrls = popularData.results.map(p => p.url);
        const detailedPopularPokemons = await fetchPokemonDetails(popularPokemonUrls);
        setPopularPokemons(detailedPopularPokemons);


        const allPokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ALL_POKEMON_LIMIT}`);
        if (!allPokemonsResponse.ok) throw new Error('Failed to fetch all pokemons');
        const allPokemonsData = await allPokemonsResponse.json();
        const allPokemonUrls = allPokemonsData.results.map(p => p.url);
        const detailedAllPokemons = await fetchPokemonDetails(allPokemonUrls);
        setPokemons(detailedAllPokemons);

      } catch (error) {
        console.error("Échec de la récupération des Pokémons:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    loadInitialData();
  }, [fetchPokemonDetails]); 

  const handleOpenSearch = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);

  };

  const handleSearchSubmit = (term) => {
    setRecentSearches(prevSearches => {
      const newSearches = [term, ...prevSearches.filter(s => s !== term)].slice(0, 5);
      return newSearches;
    });

    setCurrentFilterTerm(term);
    setIsSearching(false);
    setShowAllPokemons(true); 
  };

  const handleShowAllPokemons = () => {
    setShowAllPokemons(true); 
    setCurrentFilterTerm(''); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-400 to-yellow-300 relative overflow-hidden">
        <img
          src={pokemonLoadingBg}
          alt="Pokémon Loading"
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

  if (isSearching) {
    return (
      <SearchPage
        onBackClick={handleCloseSearch}
        onSearchSubmit={handleSearchSubmit}
        recentSearches={recentSearches}
        pokemons={pokemons}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <PokemonList
        pokemons={showAllPokemons || currentFilterTerm !== '' ? pokemons : popularPokemons} 
        initialSearchTerm={currentFilterTerm}
        onSearchInputClick={handleOpenSearch}
        onShowAllClick={handleShowAllPokemons} 
        showAllOptionVisible={!showAllPokemons && currentFilterTerm === ''}
      />
    </div>
  );
}

export default App;