import * as types from './action-types';

import { url, apiKey } from '../../constants';

export const loadWeatherInfo = cities => ({
  type: types.WEATHER_INFO_LOAD,
  promise: fetch(
    `${url}group?id=${cities}&units=metric&APPID=${apiKey}`
  ).then(data => data.json())
});
