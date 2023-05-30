import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { About } from '../pages';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <About.js />', () => {
  test(
    'Se a página contém as informações sobre a Pokédex;',
    () => {
      renderWithRouter(<About />);

      const pokedexInfo = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
      expect(pokedexInfo).toBeInTheDocument();
    },
  );

  test(
    'Se a página contém um heading h2 com o texto About Pokédex;',
    () => {
      renderWithRouter(<About />);
      const aboutHeading = screen.getByRole('heading', {
        name: 'About Pokédex',
        level: 2 });

      expect(aboutHeading).toBeInTheDocument();
    },
  );

  test(
    'Se a página contém dois parágrafos com texto sobre a Pokédex;',
    () => {
      renderWithRouter(<About />);

      const paragraphCount = screen.queryAllByText(/Pokémon/i);

      expect(paragraphCount).toHaveLength(2);
    },
  );

  test(
    'Se a página contém a seguinte imagem de uma Pokédex;',
    () => {
      renderWithRouter(<About />);

      const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

      const img = screen.getByRole('img');

      expect(img.src).toBe(imgLink);
    },
  );
});
