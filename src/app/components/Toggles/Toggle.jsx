import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Toggle = ({
  text,
  handleClick,
  defaultChecked,
  id,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}) => (
  <Row className="form-group form-group-last form-group-xs" htmlFor={id}>
    <Col sm={8}>
      <label className="col-form-label">{text}</label>
    </Col>
    <Col sm={4} className="kt-align-right">
      <span className="kt-switch kt-switch--brand kt-switch--sm">
        <label>
          <input
            type="checkbox"
            name={name || id}
            id={id}
            onChange={handleClick || onChange}
            onBlur={onBlur}
            value={value}
            checked={value}
            defaultChecked={defaultChecked}
            disabled={disabled}
          />
          <span />
        </label>
      </span>
    </Col>
  </Row>
);

Toggle.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  handleClick: PropTypes.func,
  defaultChecked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Toggle;
