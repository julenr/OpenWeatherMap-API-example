import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';

if (!window.Promise) {
  window.Promise = Promise;
}

import AppProvider from './components/App/AppProvider';

render(<AppProvider />, document.getElementById('root'));
