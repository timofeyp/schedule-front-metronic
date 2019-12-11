import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const InfoWarning = ({ children, ...props }) => (
  <Button
    className="ml-0 mt-1 mb-1 mr-2 p-1"
    size="sm"
    variant="warning"
    {...props}
  >
    {children}
  </Button>
);

InfoWarning.propTypes = {
  children: PropTypes.string,
};

export default InfoWarning;
