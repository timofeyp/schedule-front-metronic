import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from 'app/components/Fields/styles';

const InputField = ({
  input,
  meta: { touched, error, submitError },
  dirtySinceLastSubmit,
  // eslint-disable-next-line no-unused-vars
  submitError: submitErr,
  placeholder,
}) => {
  const errorCheck = !!(touched && error);
  const submitCheck = !!(submitError && !dirtySinceLastSubmit);
  return (
    <StyledInput
      size="sm"
      type="text"
      invalid={errorCheck || submitCheck}
      placeholder={placeholder}
      {...input}
    />
  );
};

InputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  submitError: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputField;
