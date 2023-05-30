import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test(
    'se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos',
    () => {
      renderWithRouter(<FavoritePokemon />);
      const noFavPokemons = screen.getByText(/No favorite Pokémon found/i);
      expect(noFavPokemons).toBeInTheDocument();
    },
  );

  test(
    'Teste se apenas são exibidos os Pokémon favoritados.',
    () => {
      renderWithRouter(<App />);

      const details1 = screen.getByText(/More Details/i);
      userEvent.click(details1);

      const favoritePokemonInDetails1 = screen.getByText(/Pokémon favoritado/i);
      userEvent.click(favoritePokemonInDetails1);

      const home = screen.getByText(/Home/i);
      userEvent.click(home);

      const nextPokemon = screen.getByText(/Próximo Pokémon/i);
      userEvent.click(nextPokemon);

      const details2 = screen.getByText(/More Details/i);
      userEvent.click(details2);

      const favoritePokemonInDetails2 = screen.getByText(/Pokémon favoritado/i);
      userEvent.click(favoritePokemonInDetails2);

      const pokemonFavorites = screen.getByText(/Favorite Pokémon/i);
      userEvent.click(pokemonFavorites);

      const pikachu = screen.getByText(/Pikachu/i);
      expect(pikachu).toBeInTheDocument();
      const charmander = screen.getByText(/Charmander/i);
      expect(charmander).toBeInTheDocument();
    },
  );
});
