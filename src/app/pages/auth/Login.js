import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
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

          <Formik
            initialValues={{
              email: "admin@demo.com",
              password: "demo"
            }}
            validate={values => {
              const errors = {};

              if (!values.email) {
                // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              setTimeout(() => {
                login(values.email, values.password)
                  .then(({ data: { accessToken } }) => {
                    disableLoading();
                    props.login(accessToken);
                  })
                  .catch(() => {
                    disableLoading();
                    setSubmitting(false);
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_LOGIN"
                      })
                    );
                  });
              }, 1000);
            }}
          >
            {({
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form
                noValidate={true}
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
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
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

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Login)
);
