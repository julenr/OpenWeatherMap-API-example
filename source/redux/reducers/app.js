import { handle } from 'redux-pack';

import * as types from '../actions/action-types';

// APP REDUCER
export function app(state = {}, payloadOriginal) {
  const newState = { ...state };
  const { payload, type } = payloadOriginal;

  switch (type) {
    case types.WHEATHER_INFO_LOAD:
      return handle(state, payloadOriginal, {
        start: prevState => ({
          ...prevState,
          loading: true
        }),
        finish: prevState => ({
          ...prevState,
          loading: false
        }),
        success: prevState => ({
          ...prevState
        }),
        failure: prevState => {
          throw new Error(err);
          return prevState;
        }
      });
  }
  return newState;
}
