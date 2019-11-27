import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TextField } from '@material-ui/core';
import validate from 'app/pages/auth/validate';
import { fetchAuthRoutine } from 'app/store/ducks/session.duck';
import SubmitButton from 'app/components/Buttons/FormSubmitButton';

function Login(props) {
  const { intl, login, isLoading } = props;

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await login(values);
    } catch {
      setStatus('123');
      setSubmitting(false);
    }
  };

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

          <Formik validate={values => validate(values, intl)} onSubmit={login}>
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
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    loading={isLoading}
                  />
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
  isLoading: PropTypes.bool,
};

const mapStateToProps = ({ session }) => ({
  isLoading: session.isSessionLoading,
});

const mapDispatchToProps = {
  login: fetchAuthRoutine.trigger,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
