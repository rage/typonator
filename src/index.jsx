import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'state/store';

import './styles';
import App from './components/app';

const store = createStore();

const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
