import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  test(
    `se o topo da aplicação contém um conjunto fixo de links de navegação: 
- O primeiro link deve possuir o texto Home
- O segundo link deve possuir o texto About;
- O terceiro link deve possuir o texto Favorite Pokémon.`,
    () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: 'Home' });
      expect(home).toBeInTheDocument();

      const about = screen.getByRole('link', { name: 'About' });
      expect(about).toBeInTheDocument();

      const pokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
      expect(pokemon).toBeInTheDocument();
    },
  );
  test(
    'Se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/');
      });

      const titleHome = screen.getByRole(
        'heading',
        { name: 'Encountered Pokémon', level: 2 },
      );
      expect(titleHome).toBeVisible();
    },
  );

  test(
    'Se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/about');
      });

      const titleAbout = screen.getByRole(
        'heading',
        { name: 'About Pokédex', level: 2 },
      );
      expect(titleAbout).toBeVisible();
    },
  );

  test(
    'Se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/favorites');
      });

      const titleFavorites = screen.getByRole(
        'heading',
        { name: 'Favorite Pokémon', level: 2 },
      );
      expect(titleFavorites).toBeVisible();
    },
  );

  test(
    'Se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/xablau');
      });

      const titleNotFound = screen.getByRole(
        'heading',
        { name: 'Page requested not found', level: 2 },
      );
      expect(titleNotFound).toBeVisible();
    },
  );
});
