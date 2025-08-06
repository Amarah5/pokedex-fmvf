 // App.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import pokemonLoadingBg from './assets/Logo.png';
import PokemonList from './docs/PokemonList';
import SearchPage from './docs/SearchPage';
import { POKEMON_TYPES } from './utils/pokemonType';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [popularPokemons, setPopularPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [currentFilterTerm, setCurrentFilterTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
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
        types: detailData.types.map((typeInfo) => typeInfo.type.name),
        stats: detailData.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
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
          if (currentStep >= totalSteps) clearInterval(interval);
        }, 30);

        const popularResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POPULAR_POKEMON_LIMIT}`);
        if (!popularResponse.ok) throw new Error('Failed to fetch popular pokemons');
        const popularData = await popularResponse.json();
        const popularUrls = popularData.results.map(p => p.url);
        const detailedPopular = await fetchPokemonDetails(popularUrls);
        setPopularPokemons(detailedPopular);

        const allResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ALL_POKEMON_LIMIT}`);
        if (!allResponse.ok) throw new Error('Failed to fetch all pokemons');
        const allData = await allResponse.json();
        const allUrls = allData.results.map(p => p.url);
        const detailedAll = await fetchPokemonDetails(allUrls);
        setPokemons(detailedAll);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    };

    loadInitialData();
  }, [fetchPokemonDetails]);

  const handleOpenSearch = () => setIsSearching(true);
  const handleCloseSearch = () => setIsSearching(false);

  const handleSearchSubmit = (term) => {
    setRecentSearches(prev => [term, ...prev.filter(s => s !== term)].slice(0, 5));
    setCurrentFilterTerm(term);
    setIsSearching(false);
    setShowAllPokemons(true);
    setSelectedTypeFilter(null);
  };

  const handleShowAllPokemons = () => {
    setShowAllPokemons(true);
    setCurrentFilterTerm('');
    setSelectedTypeFilter(null);
  };

  const handleTypeFilterClick = (type) => {
    setSelectedTypeFilter(prev => (prev === type ? null : type));
    setShowAllPokemons(true);
    setCurrentFilterTerm('');
  };

  const displayedPokemons = useMemo(() => {
    let list = showAllPokemons || currentFilterTerm || selectedTypeFilter ? pokemons : popularPokemons;

    if (currentFilterTerm) {
      const term = currentFilterTerm.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(term) || String(p.id).includes(term));
    }

    if (selectedTypeFilter) {
      list = list.filter(p => p.types.includes(selectedTypeFilter));
    }

    return list;
  }, [pokemons, popularPokemons, showAllPokemons, currentFilterTerm, selectedTypeFilter]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-400 to-yellow-300">
        <img src={pokemonLoadingBg} alt="Pokémon Loading" className="w-1/2 max-w-sm animate-pulse" />
        <div className="w-3/4 h-4 max-w-md mt-10 overflow-hidden bg-gray-300 rounded-full">
          <div className="h-full transition-all duration-200 bg-red-500 rounded-full" style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-white">Chargement... ({loadingProgress}%)</p>
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
    <div className="min-h-screen py-8 bg-gray-100">
      <PokemonList
        pokemons={displayedPokemons}
        initialSearchTerm={currentFilterTerm}
        onSearchInputClick={handleOpenSearch}
        onShowAllClick={handleShowAllPokemons}
        showAllOptionVisible={!showAllPokemons && !currentFilterTerm && !selectedTypeFilter}
        allPokemonTypes={POKEMON_TYPES}
        onTypeFilterClick={handleTypeFilterClick}
        selectedTypeFilter={selectedTypeFilter}
      />
    </div>
  );
}

export default App;
