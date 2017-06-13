import React from 'react';
import { Provider } from 'react-redux';

import App from '.';

import store from 'redux/create-store';
const Store = store.configureStore();

export default () =>
  <Provider store={Store}>
    <App />
  </Provider>
