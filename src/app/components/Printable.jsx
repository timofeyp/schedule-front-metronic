import React from 'react';
import PropTypes from 'prop-types';

class Printable extends React.PureComponent {
  render() {
    return <>{this.props.children}</>;
  }
}

Printable.propTypes = {
  children: PropTypes.object,
};

export default Printable;
