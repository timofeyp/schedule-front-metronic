import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import SubmitButton from 'app/components/Buttons/FormSubmitButton';

const Form = ({
  status,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isLoading,
}) => (
  <form
    noValidate
    autoComplete="off"
    className="kt-form"
    onSubmit={handleSubmit}
  >
    {status ? (
      <div role="alert" className="alert alert-danger">
        <div className="alert-text">{status}</div>
      </div>
    ) : (
      <div role="alert" className="alert alert-info">
        <div className="alert-text">
          Используйте ваши данные домена для входа.
        </div>
      </div>
    )}

    <div className="form-group">
      <TextField
        type="username"
        label="Логин"
        margin="normal"
        className="kt-width-full"
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        helperText={touched.username && errors.username}
        error={Boolean(touched.username && errors.username)}
      />
    </div>

    <div className="form-group">
      <TextField
        type="password"
        margin="normal"
        label="Пароль"
        className="kt-width-full"
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        helperText={touched.password && errors.password}
        error={Boolean(touched.password && errors.password)}
      />
    </div>

    <div className="kt-login__actions">
      <SubmitButton isSubmitting={isSubmitting} loading={isLoading} />
    </div>
  </form>
);

Form.propTypes = {
  status: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Form;
