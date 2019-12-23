import { FormFeedback, FormGroup, Input } from 'reactstrap';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputField from 'components/Fields/InputField';

const InputErrorField = ({
  withoutGroup,
  meta: { touched, error, submitError },
  dirtySinceLastSubmit,
  ...props
}) => {
  const Wrapper = withoutGroup ? Fragment : FormGroup;
  const tryCreateError = () => {
    if (touched && error) {
      return <FormFeedback className="text-danger">{error}</FormFeedback>;
    }
    if (submitError && !dirtySinceLastSubmit) {
      return <FormFeedback className="text-danger">{submitError}</FormFeedback>;
    }
    return null;
  };
  return (
    <InputField
      meta={{ touched, error, submitError }}
      dirtySinceLastSubmit={dirtySinceLastSubmit}
      {...props}
    />
  );
};

InputErrorField.propTypes = {
  meta: PropTypes.object,
  withoutGroup: PropTypes.bool,
  dirtySinceLastSubmit: PropTypes.bool,
};

export default InputErrorField;
