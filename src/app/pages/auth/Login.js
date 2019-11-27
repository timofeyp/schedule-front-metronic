import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import validate from 'app/pages/auth/validate';
import { setAuthRoutine } from 'app/store/ducks/session.duck';

function Login(props) {
  const { intl } = props;
  const [loading] = useState(false);
  const [loadingButtonStyle] = useState({
    paddingRight: '2.5rem',
  });

  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <h3>
              {/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
          </div>

          <Formik
            initialValues={{
              email: 'admin@demo.com',
              password: 'demo',
            }}
            validate={values => validate(values, intl)}
            onSubmit={props.login}
          >
            {({
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
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
                    type="email"
                    label="Логин"
                    margin="normal"
                    className="kt-width-full"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
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
                  <Button
                    id="kt_login_signin_submit"
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                      {
                        'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light': loading,
                      },
                    )}`}
                    style={loadingButtonStyle}
                    block
                  >
                    Вход
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.func,
};

const mapDispatchToProps = {
  login: setAuthRoutine.trigger,
};

export default injectIntl(connect(null, mapDispatchToProps)(Login));
