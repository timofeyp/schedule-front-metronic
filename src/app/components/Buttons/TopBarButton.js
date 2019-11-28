import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopBarButton = ({ children }) => (
  <Link className="align-self-center" to="/auth/login">
    <Button variant="light">
      <span style={{ color: '#6c7293' }}> {children}</span>
    </Button>
  </Link>
);

TopBarButton.propTypes = { children: PropTypes.string };

export default TopBarButton;
