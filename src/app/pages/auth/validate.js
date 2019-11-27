const validate = (values, intl) => {
  const errors = {};

  if (!values.username) {
    // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
    errors.username = intl.formatMessage({
      id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    });
  } else if (!/^[A-Z0-9._%+-]{2,}$/i.test(values.username)) {
    errors.username = intl.formatMessage({
      id: 'AUTH.VALIDATION.INVALID_FIELD',
    });
  }

  if (!values.password) {
    errors.password = intl.formatMessage({
      id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    });
  }

  return errors;
};

export default validate;
