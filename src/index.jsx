import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'state/store';

import './styles';
import App from './components/app';

window.initTyponator = function () {
  document.querySelectorAll('.typonator-widget').forEach((element) => {
    const store = createStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      element,
    );
  });
};
