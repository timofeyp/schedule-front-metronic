import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const FormControl = ({
  form: { setFieldValue },
  placeholder,
  field: { name },
}) => (
  <Form.Control
    onChange={e => setFieldValue(name, e.target.value)}
    placeholder={placeholder}
  />
);

FormControl.propTypes = {
  form: PropTypes.object,
  placeholder: PropTypes.string,
  field: PropTypes.object,
};

export default FormControl;
