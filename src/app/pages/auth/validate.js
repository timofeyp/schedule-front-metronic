const validate = ( values, intl ) => {
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
};

export default validate;

