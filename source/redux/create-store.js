import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { cities } from '../constants';

let citiesObj = {};
cities.forEach(city => {
  citiesObj[city.name] = [];
});

const initialState = {
  app: {
    loading: true,
    update: true,
    cities: citiesObj
  }
};
let store;

const Store = {
  configureStore: () => {
    const middleware = applyMiddleware(thunk, reduxPackMiddleware);
    if (__DEV__) {
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      const enhancer = composeEnhancers(middleware);
      store = createStore(reducer, initialState, enhancer);
    } else {
      store = createStore(reducer, initialState, middleware);
    }
    return store;
  },
  getState: function () {
    return store.getState();
  },
  getInitialState: function () {
    return initialState;
  },
  dispatch: function (action) {
    store.dispatch(action);
  }
};

export { Store as default };
