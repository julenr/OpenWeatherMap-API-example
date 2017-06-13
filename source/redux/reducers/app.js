import { handle } from 'redux-pack';

import * as types from '../actions/action-types';

// APP REDUCER
export function app(state = {}, payloadOriginal) {
  const { payload, type } = payloadOriginal;

  switch (type) {
    case types.WEATHER_INFO_LOAD:
      return handle(state, payloadOriginal, {
        success: prevState => {
          const newState = { ...prevState, loading: false, update: !prevState.update  };
          payload.list.forEach(
            city =>
              (newState.cities[city.name] = [
                Math.round(city.main.temp),
                ...newState.cities[city.name]
              ])
          );
          return newState;
        },
        failure: prevState => {
          throw new Error(err);
          return prevState;
        }
      });
    default:
      return state;
  }
}
