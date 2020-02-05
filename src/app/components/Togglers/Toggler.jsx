import React from 'react';
import PropTypes from 'prop-types';

const Toggler = ({ text, handleClick, defaultChecked, id }) => (
  <div className="form-group form-group-last form-group-xs row" htmlFor={id}>
    <label className="col-8 col-form-label">{text}</label>
    <div className="col-4 kt-align-right">
      <span className="kt-switch kt-switch--brand kt-switch--sm">
        <label>
          <input
            type="checkbox"
            name={id}
            id={id}
            defaultChecked={defaultChecked}
            onChange={handleClick}
          />
          <span />
        </label>
      </span>
    </div>
  </div>
);

Toggler.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  handleClick: PropTypes.func,
  defaultChecked: PropTypes.bool,
};

export default Toggler;
