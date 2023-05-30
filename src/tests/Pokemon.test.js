import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  // const nextPokemonTest = 'next-pokemon';
  const POKEMON_NAME = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const POKEMON_WEIGHT = 'pokemon-weight';
  const MORE_DETAILS = 'More details';

  test(
    'Teste se é renderizado um card com as informações de determinado Pokémon: O nome correto do Pokémon deve ser mostrado na tela;',
    () => {
      renderWithRouter(<App />);
      const name = screen.getByTestId(POKEMON_NAME);
      expect(name).toHaveTextContent('Pikachu');
    },
  );

  test(
    'Teste se é renderizado um card com as informações de determinado Pokémon: O tipo correto do Pokémon deve ser mostrado na tela;',
    () => {
      renderWithRouter(<App />);
      const type = screen.getByTestId(POKEMON_TYPE);
      expect(type).toHaveTextContent('Electric');
    },
  );

  test(
    'Teste se é renderizado um card com as informações de determinado Pokémon: O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida;',
    () => {
      renderWithRouter(<App />);
      const weight = screen.getByTestId(POKEMON_WEIGHT);
      expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    },
  );

  test(
    'Teste se é renderizado um card com as informações de determinado Pokémon: A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon.',
    () => {
      renderWithRouter(<App />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
      expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    },
  );

  test(
    'Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;',
    () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
    },
  );

  test(
    'Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(moreDetails);
      const locationPikachu = screen.getByText(/Game Locations of Pikachu/);
      expect(locationPikachu).toBeInTheDocument();
    },
  );

  test(
    'Teste se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(moreDetails);
      const title = screen.getByText(/Pikachu Details/);
      expect(title).toBeInTheDocument();
    },
  );

  test(
    'Teste se existe um ícone de estrela nos Pokémon favoritados',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(moreDetails);
      const favoritePokemonMarked = screen.getByText('Pokémon favoritado?');
      userEvent.click(favoritePokemonMarked);
      const starIconAlt = screen.getByAltText(/Pikachu is marked as favorite/);
      expect(starIconAlt).toBeInTheDocument();
      expect(starIconAlt).toHaveAttribute('src', '/star-icon.svg');
    },
  );
});
