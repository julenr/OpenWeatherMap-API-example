import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import * as appActions from 'redux/actions/app';

import Main from 'components/Main';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render = () => <Main />;
}

const mapStateToProps = ({ app: { wheatherData } }) => ({
  wheatherData
});

export default connect(mapStateToProps, {
  ...appActions
})(App);
