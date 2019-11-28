import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import validate from 'app/pages/auth/validate';
import { fetchAuthRoutine } from 'app/store/ducks/session.duck';
import Form from 'app/pages/auth/Form';

function Login(props) {
  const { intl, login, isLoading } = props;
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
            validate={values => validate(values, intl)}
            onSubmit={(values, formikActions) =>
              login({ values, formikActions, intl })
            }
          >
            {formikProps => <Form isLoading={isLoading} {...formikProps} />}
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
