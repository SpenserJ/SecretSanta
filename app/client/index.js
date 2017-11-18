import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import SantaList from './components/SantaList';

const render = Component => ReactDOM.render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('mount'),
);

render(SantaList);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/SantaList', () => render(SantaList));
}
