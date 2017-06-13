import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { loadWeatherInfo } from 'redux/actions/app';

import Main from 'components/Main';

// const timeInterval = 3 * 60000;
const TIME_INTERVAL = 1000;

class App extends Component {
  constructor(props) {
    super(props);
    props.loadWeatherInfo();
    // setInterval(() => props.loadWeatherInfo(), TIME_INTERVAL);
    setTimeout(() => props.loadWeatherInfo(), TIME_INTERVAL);
  }

  render = () =>
    this.props.weatherData.length
      ? <Main data={this.props.weatherData} />
      : <div>LOADING</div>;
}

const mapStateToProps = ({ app: { weatherData, loading } }) => ({
  weatherData,
  loading
});

export default connect(mapStateToProps, {
  loadWeatherInfo
})(App);
