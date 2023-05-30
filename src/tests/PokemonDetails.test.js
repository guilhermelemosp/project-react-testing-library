import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const POKEMON_FAVORITADO = 'Pokémon favoritado?';

  test(
    'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela: A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const nameDetails = screen.getByRole('heading', { name: `${namePikachuInData.name} Details`, level: 2 });
      expect(nameDetails).toBeInTheDocument();
    },
  );
  test(
    'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela: Não deve existir o link de navegação para os detalhes do Pokémon selecionado;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const detailsLink = screen.queryByText('More details');
      expect(detailsLink).not.toBeInTheDocument();
    },
  );
  test(
    'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela: A seção de detalhes deve conter um heading h2 com o texto Summary;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const summary = screen.getByRole('heading', { name: /Summary/, level: 2 });
      expect(summary).toBeInTheDocument();
    },
  );
  test(
    'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela: A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');
      const detail = namePikachuInData.summary;

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const details = screen.getByText(detail);
      expect(details).toBeInTheDocument();
    },
  );
  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon: Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const locationText = screen.getByRole('heading', { name: `Game Locations of ${namePikachuInData.name}`, level: 2 });
      expect(locationText).toBeInTheDocument();
    },
  );

  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon: Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const map = screen.getAllByRole('img', { name: `${namePikachuInData.name} location` });
      expect(map).toHaveLength(2);
    },
  );
  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon: Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const map = screen.getAllByRole('img', { name: `${namePikachuInData.name} location` });
      const location1 = screen.getByText('Kanto Viridian Forest');
      const location2 = screen.getByText('Kanto Power Plant');
      expect(map[0]).toBeInTheDocument();
      expect(map[1]).toBeInTheDocument();
      expect(location1).toBeInTheDocument();
      expect(location2).toBeInTheDocument();
    },
  );
  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon: A imagem da localização deve ter um atributo src com a URL da localização;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const map = screen.getAllByRole('img', { name: `${namePikachuInData.name} location` });
      expect(map[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
      expect(map[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    },
  );

  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon: A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const map = screen.getAllByRole('img', { name: `${namePikachuInData.name} location` });
      expect(map[0]).toHaveAttribute('alt', 'Pikachu location');
      expect(map[1]).toHaveAttribute('alt', 'Pikachu location');
    },
  );

  test(
    'Teste se o usuário pode favoritar um Pokémon através da página de detalhes: A página deve exibir um checkbox que permite favoritar o Pokémon;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });

      const favoriteCheckbox = screen.getByText(POKEMON_FAVORITADO);
      expect(favoriteCheckbox).toBeInTheDocument();
    },
  );

  test(
    'Teste se o usuário pode favoritar um Pokémon através da página de detalhes: Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });
      const favoriteCheckbox = screen.getByRole('checkbox', { name: POKEMON_FAVORITADO });

      userEvent.click(favoriteCheckbox);
      expect(favoriteCheckbox).toBeChecked();

      userEvent.click(favoriteCheckbox);
      expect(favoriteCheckbox).not.toBeChecked();
    },
  );
  test(
    'Teste se o usuário pode favoritar um Pokémon através da página de detalhes: O label do checkbox deve conter o texto Pokémon favoritado?',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePikachuInData = data.find((name) => name.name === 'Pikachu');

      act(() => {
        history.push(`/pokemon/${namePikachuInData.id}`);
      });
      const favoriteCheckbox = screen.getByLabelText(POKEMON_FAVORITADO);
      expect(favoriteCheckbox).toBeInTheDocument();
    },
  );
});
