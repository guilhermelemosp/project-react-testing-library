import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './services/RenderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test(
    'Se a página contém um heading h2 com o texto Page requested not found',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/xablau');
      });

      const textInNotFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
      expect(textInNotFound).toBeInTheDocument();
    },
  );

  test(
    'Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/xablau');
      });

      const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      const altImg = screen.getByAltText('Pikachu crying because the page requested was not found');

      expect(altImg.src).toBe(imgUrl);
    },
  );
});
