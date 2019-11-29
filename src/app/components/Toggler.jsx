import React from 'react';
import PropTypes from 'prop-types';

const Toggler = ({ text, handleClick, defaultChecked, id }) => (
  <label className="toggle-btn customizer__toggle" htmlFor={id}>
    <input
      className="toggle-btn__input"
      type="checkbox"
      name={id}
      id={id}
      defaultChecked={defaultChecked}
      onClick={handleClick}
    />
    <span className="toggle-btn__input-label" style={{ background: '#eaecef' }}>
      Toggle
    </span>
    <span className="mr-4 ml-1">{text}</span>
  </label>
);

Toggler.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  handleClick: PropTypes.func,
  defaultChecked: PropTypes.bool,
};

export default Toggler;
