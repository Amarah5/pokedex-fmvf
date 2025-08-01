/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        pokemonOrange: '#FFCB05',
        pokemonRed: '#CC0000',
      },
      keyframes: {
        pokeballScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        progressBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        pokeballScale: 'pokeballScale 2s ease-in-out infinite',
        progressBar: 'progressBar 2s linear forwards',
      },
    },
  },
  plugins: [],
}