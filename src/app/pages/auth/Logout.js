import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as auth from '../../store/ducks/auth.duck';
import { LayoutSplashScreen } from '../../../_metronic';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { hasAuthToken } = this.props;

    return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth" />;
  }
}

Logout.propTypes = {
  hasAuthToken: PropTypes.bool,
  logout: PropTypes.bool,
};

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions,
)(Logout);
