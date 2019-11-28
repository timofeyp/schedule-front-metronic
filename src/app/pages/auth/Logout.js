import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutRoutine } from 'app/store/ducks/session.duck';

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = {
  logout: logoutRoutine.trigger,
};

export default connect(null, mapDispatchToProps)(Logout);
