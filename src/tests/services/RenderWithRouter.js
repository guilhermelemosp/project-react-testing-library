import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const history = createMemoryHistory();

  const allSelector = render(
    <Router history={ history }>

      {component}

    </Router>,

  );
  return { ...allSelector, history };
}

export default renderWithRouter;
