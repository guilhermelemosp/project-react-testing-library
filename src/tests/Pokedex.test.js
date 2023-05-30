import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  const nextPokemonTest = 'next-pokemon';
  const pokemonName = 'pokemon-name';
  const pokemonType = 'pokemon-type';
  test(
    'Se a página contém um heading h2 com o texto Encountered Pokémon',
    () => {
      renderWithRouter(<App />);

      const pokedexText = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
      expect(pokedexText).toBeInTheDocument();
    },
  );

  test(
    'Se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado',

    () => {
      renderWithRouter(<App />);

      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);
      userEvent.click(NextPokemonBtn);
      const nextPokemonOfList = screen.getByText(/Charmander/i);
      expect(nextPokemonOfList).toBeInTheDocument();
    },
  );

  test(
    'O botão deve conter o texto Próximo Pokémon',

    () => {
      renderWithRouter(<App />);
      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);
      userEvent.click(NextPokemonBtn);
      expect(NextPokemonBtn).toHaveTextContent('Próximo Pokémon');
    },
  );

  test(
    'Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;',

    () => {
      renderWithRouter(<App />);
      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);
      const namePokemon = screen.getByTestId(pokemonName);

      userEvent.click(NextPokemonBtn);

      expect(namePokemon).toHaveTextContent('Charmander');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Caterpie');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Ekans');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Alakazam');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Mew');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Rapidash');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Snorlax');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Dragonair');
    },
  );

  test(
    'O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista',
    () => {
      renderWithRouter(<App />);
      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);
      const namePokemon = screen.getByTestId(pokemonName);

      userEvent.click(NextPokemonBtn);

      expect(namePokemon).toHaveTextContent('Charmander');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Caterpie');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Ekans');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Alakazam');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Mew');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Rapidash');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Snorlax');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Dragonair');

      userEvent.click(NextPokemonBtn);
      expect(namePokemon).toHaveTextContent('Pikachu');
    },
  );

  test(
    'Se é mostrado apenas um Pokémon por vez',
    () => {
      renderWithRouter(<App />);
      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);
      const namePokemon = screen.getAllByTestId(pokemonName);

      userEvent.click(NextPokemonBtn);

      expect(namePokemon).toHaveLength(1);
    },
  );

  test(
    'Se a Pokédex tem os botões de filtro - Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição;',

    () => {
      renderWithRouter(<App />);
      const classPokemonBtns = screen.getAllByTestId('pokemon-type-button');
      expect(classPokemonBtns.length).toBe(7);
    },
  );

  test(
    'Se a Pokédex tem os botões de filtro - A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo;',

    () => {
      renderWithRouter(<App />);
      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);
      const btnAll = screen.getByText('All');
      //   const typePokemonEletric = screen.getByText('Electric');
      const typePokemonFire = screen.getByText('Fire');
      const typePokemonBug = screen.getByText('Bug');
      //   const typePokemonPoison = screen.getByText('Poison');
      const typePokemonPsychic = screen.getByText('Psychic');
      //   const typePokemonNormal = screen.getByText('Normal');
      //   const typePokemonDragon = screen.getByText('Dragon');

      userEvent.click(typePokemonFire);

      const pokemonFire1 = screen.getByText(/Charmander/);
      expect(pokemonFire1).toBeInTheDocument();

      userEvent.click(NextPokemonBtn);

      const pokemonFire2 = screen.getByText(/Rapidash/);
      expect(pokemonFire2).toBeInTheDocument();

      userEvent.click(typePokemonPsychic);

      const pokemonPsychic1 = screen.getByText(/Alakazam/);
      expect(pokemonPsychic1).toBeInTheDocument();

      userEvent.click(NextPokemonBtn);

      const pokemonPsychic2 = screen.getByText(/Mew/);
      expect(pokemonPsychic2).toBeInTheDocument();

      userEvent.click(typePokemonBug);

      const pokemonBug1 = screen.getByText(/Caterpie/);
      expect(pokemonBug1).toBeInTheDocument();

      userEvent.click(btnAll);

      const pikachuFirstofAll = screen.getByText(/Pikachu/);
      expect(pikachuFirstofAll).toBeInTheDocument();
    },
  );

  test(
    //* ******* */
    'Se a Pokédex tem os botões de filtro - O texto do botão deve corresponder ao nome do tipo, ex. Psychic;',

    () => {
      renderWithRouter(<App />);
      const typeOfPokemon = screen.getByTestId(pokemonType);
      const typePokemonFireBtn = screen.getByText('Fire');

      userEvent.click(typePokemonFireBtn);

      expect(typeOfPokemon).toHaveTextContent('Fire');
      expect(typeOfPokemon).not.toHaveTextContent('Poison');
    },
  );

  test(
    'Se a Pokédex tem os botões de filtro - O botão All precisa estar sempre visível.',

    () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByText('All');
      expect(btnAll).toBeInTheDocument();
    },
  );

  test(
    'Se a Pokédex contém um botão para resetar o filtro - O texto do botão deve ser All',
    () => {
      renderWithRouter(<App />);
      const namePokemon = screen.getByTestId(pokemonName);

      const btnAll = screen.getByText('All');
      expect(btnAll).toHaveTextContent('All');

      userEvent.click(btnAll);
      expect(namePokemon).toHaveTextContent(/Pikachu/);
      expect(btnAll).toBeInTheDocument();
    },
  );

  test(
    'Se a Pokédex contém um botão para resetar o filtro - A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado;',
    () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByText('All');
      const NextPokemonBtn = screen.getByTestId(nextPokemonTest);

      userEvent.click(btnAll);

      const pikachuFirstofAll = screen.getByText(/Pikachu/);
      expect(pikachuFirstofAll).toBeInTheDocument();

      userEvent.click(NextPokemonBtn);

      const charmanderAlwaysTheSecondChoice = screen.getByText(/Charmander/);
      expect(charmanderAlwaysTheSecondChoice).toBeInTheDocument();
    },
  );

  test(
    'Se a Pokédex contém um botão para resetar o filtro - Ao carregar a página, o filtro selecionado deverá ser All.',
    () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByText('All');

      expect(btnAll).toBeInTheDocument();
    },
  );
});
