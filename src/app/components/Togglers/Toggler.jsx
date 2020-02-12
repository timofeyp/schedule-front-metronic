import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Toggler = ({
  text,
  handleClick,
  defaultChecked,
  id,
  isButtonLeft,
  buttonProportion,
  labelProportion,
}) => {
  const buttonAlignClass = isButtonLeft ? 'kt-align-left' : 'kt-align-right';
  return (
    <Row className="form-group form-group-last form-group-xs" htmlFor={id}>
      {!isButtonLeft && (
        <Col sm={8}>
          <label className="col-form-label">{text}</label>
        </Col>
      )}
      <Col sm={4} className={buttonAlignClass}>
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
      </Col>
      {isButtonLeft && (
        <Col sm={8}>
          <label className="col-form-label">{text}</label>
        </Col>
      )}
    </Row>
  );
};

Toggler.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  handleClick: PropTypes.func,
  defaultChecked: PropTypes.bool,
  isButtonLeft: PropTypes.bool,
  buttonProportion: PropTypes.number,
  labelProportion: PropTypes.number,
};

export default Toggler;
