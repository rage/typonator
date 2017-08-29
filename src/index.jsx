import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'state/store';

import './styles';
import App from './components/app';

/* eslint-disable */
try {
  require('babel-polyfill');
} catch (e) {
}
/* eslint-enable */

window.initTyponator = () => {
  document.querySelectorAll('.typonator-widget').forEach((element) => {
    const model = element.getElementsByClassName('typonator-model-source')[0].innerHTML.toString().trim();
    const template = element.getElementsByClassName('typonator-template-source')[0].innerHTML
      .toString().trim();
    const store = createStore(model, template);
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      element,
    );
  });
};
