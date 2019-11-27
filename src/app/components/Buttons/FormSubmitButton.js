import React from 'react';
import { Button } from 'react-bootstrap';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const FormSubmitButton = ({ isSubmitting, loading }) => (
  <Button
    id="kt_login_signin_submit"
    type="submit"
    disabled={isSubmitting}
    className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx({
      'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light': loading,
    })}`}
    block
  >
    Вход
  </Button>
);

FormSubmitButton.propTypes = {
  isSubmitting: PropTypes.bool,
  loading: PropTypes.bool,
};

export default FormSubmitButton;
