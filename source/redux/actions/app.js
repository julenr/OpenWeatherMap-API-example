import * as types from './action-types';

const url = 'http://api.openweathermap.org/data/2.5/';
const apiKey = '9d583bb0803aeb5b690cbb5c531c04c5';
const cities = ['3871336', '3435910', '3936456', '3448439'];

export const loadWeatherInfo = () => ({
  type: types.WEATHER_INFO_LOAD,
  promise: fetch(
    `${url}group?id=${cities.toString()}&units=metric&APPID=${apiKey}`
  ).then(data => data.json())
});
