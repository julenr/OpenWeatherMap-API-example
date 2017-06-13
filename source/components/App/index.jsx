import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { loadWeatherInfo } from 'redux/actions/app';
import { cities, TIME_INTERVAL } from '../../constants';

import Main from 'components/Main';
import { AppContent } from './styled';

class App extends Component {
  constructor(props) {
    super(props);
    const citiesStr = cities.map(city => city.id).toString();
    props.loadWeatherInfo(citiesStr);
    setInterval(() => props.loadWeatherInfo(citiesStr), TIME_INTERVAL);
  }

  render = () =>
    this.props.loading
      ? <div>LOADING</div>
      : <AppContent><Main data={this.props.cities} /></AppContent>;
}

const mapStateToProps = ({ app: { cities, loading, update } }) => ({
  cities,
  loading,
  update
});

export default connect(mapStateToProps, {
  loadWeatherInfo
})(App);
